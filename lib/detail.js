document.addEventListener('alpine:init', () => {
    Alpine.data('productDetail', () => ({
        product: null,
        loading: true,
        error: false,
        timer: '00:00:00',
        timerInterval: null,
        
        // Modal & Form State
        showCheckout: false, 
        customerName: '', 

        async init() {
            const params = new URLSearchParams(window.location.search);
            const productId = params.get('id');

            if (!productId) {
                this.error = true;
                this.loading = false;
                return;
            }

            try {
                // Fetch database produk (Mundur 2 folder dari /pages/product/)
                const response = await fetch('../../database/product.json');
                if (!response.ok) throw new Error('Database not found');
                
                const data = await response.json();
                this.product = data.find(p => p.id === productId);

                if (!this.product) {
                    this.error = true;
                } else {
                    // --- LOGIC DYNAMIC TITLE START ---
                    const siteName = window.ENV?.APP_NAME || "REYHANDSHOOT";
                    document.title = `${this.product.name} || ${siteName}`;
                    // --- LOGIC DYNAMIC TITLE END ---

                    // Jalankan Timer jika Flash Sale aktif
                    if (this.product.flash_sale && this.product.flash_sale_end) {
                        this.startTimer();
                    }
                    // Init Slider setelah DOM render
                    this.$nextTick(() => { this.initSwiper(); });
                }
            } catch (err) {
                console.error("Detail Init Error:", err);
                this.error = true;
            } finally {
                this.loading = false;
            }
        },

        // --- UTILS ---
        formatPrice(price) {
            if (!price) return '0';
            return new Intl.NumberFormat('id-ID').format(price);
        },

        calculateSave() {
            if (!this.product || !this.product.original_price) return '0';
            const saving = this.product.original_price - this.product.price;
            return this.formatPrice(saving);
        },

        formatPromoDate(dateString) {
            if (!dateString) return '';
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            const d = new Date(dateString);
            return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} WIB`;
        },

        // --- TIMER LOGIC ---
        startTimer() {
            this.updateTimer();
            this.timerInterval = setInterval(() => { this.updateTimer(); }, 1000);
        },

        updateTimer() {
            if (!this.product || !this.product.flash_sale_end) return;

            const end = dayjs(this.product.flash_sale_end);
            const now = dayjs();
            const diff = end.diff(now);

            if (diff <= 0) {
                this.timer = "Berakhir";
                this.product.flash_sale = false;
                if (this.timerInterval) clearInterval(this.timerInterval);
            } else {
                const dur = dayjs.duration(diff);
                const h = Math.floor(dur.asHours()).toString().padStart(2, '0');
                const m = dur.minutes().toString().padStart(2, '0');
                const s = dur.seconds().toString().padStart(2, '0');
                this.timer = `${h}:${m}:${s}`;
            }
        },

        // --- PURCHASE LOGIC ---
        buyLynk() {
            if (this.product && this.product.lynk_url) {
                window.open(this.product.lynk_url, '_blank');
                this.showCheckout = false;
            }
        },

        buyWhatsApp() {
            if (!this.product) return;
            let text = this.product.wa_text_template || "Halo Reyhan! Saya tertarik dengan produk [PRODUCT_NAME]";
            text = text.replace('[PRODUCT_NAME]', this.product.name);
            
            if (this.customerName.trim() !== '') {
                text += `\n\n*Nama Pembeli:* ${this.customerName}`;
            }

            const waUrl = `https://wa.me/${this.product.wa_number}?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
            this.showCheckout = false;
        },

        initSwiper() {
            if (typeof Swiper !== 'undefined') {
                new Swiper(".productSwiper", {
                    pagination: { el: ".swiper-pagination", dynamicBullets: true },
                    grabCursor: true
                });
            }
        }
    }));
});
