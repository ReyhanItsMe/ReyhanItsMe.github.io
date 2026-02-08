/**
 * lib/product.js
 * Logic utama untuk Filter, Search, dan Fetch Produk.
 * Terhubung dengan environment.js
 */

document.addEventListener('alpine:init', () => {
    // 1. STORE GLOBAL UNTUK SEARCH (Bisa diakses dari Navbar manapun)
    Alpine.store('search', {
        query: '',
    });

    Alpine.data('productApp', () => ({
        products: [],
        loading: true,
        limit: window.ENV.PRODUCT_LIMIT_PER_PAGE || 8,
        
        showFilter: false,
        selectedCategories: ['semua'], 
        selectedPrice: 'all', 
        
        // Mengambil data statis dari environment.js
        categories: window.ENV.CATEGORIES || [],
        priceRanges: window.ENV.PRICE_RANGES || [],

        async init() {
            try {
                // Mengambil path database dari environment.js
                const response = await fetch(window.ENV.DB_PRODUCTS || './database/product.json');
                const data = await response.json();
                this.products = data || [];
                
                // Jalankan timer untuk Flash Sale setiap detik
                setInterval(() => { 
                    this.updateTimers(); 
                }, 1000);
                
                this.loading = false;
            } catch (error) { 
                console.error("Gagal load produk:", error); 
                this.loading = false; 
            }
        },

        toggleCategory(id) {
            if (id === 'semua') {
                this.selectedCategories = ['semua'];
            } else {
                // Hapus 'semua' jika kategori lain dipilih
                this.selectedCategories = this.selectedCategories.filter(c => c !== 'semua');
                
                if (this.selectedCategories.includes(id)) {
                    // Jika sudah ada, hapus (uncheck)
                    this.selectedCategories = this.selectedCategories.filter(c => c !== id);
                    // Jika kosong, balikkan ke 'semua'
                    if (this.selectedCategories.length === 0) this.selectedCategories = ['semua'];
                } else {
                    // Tambah kategori baru ke array
                    this.selectedCategories.push(id);
                }
            }
            // Reset limit saat filter berubah
            this.limit = window.ENV.PRODUCT_LIMIT_PER_PAGE || 8;
        },

        // GETTER PRODUK UNTUK GRID UTAMA (Filtered & Limited)
        get filteredProducts() {
            if (!this.products) return [];

            const searchQuery = (Alpine.store('search').query || '').toLowerCase();
            const priceObj = this.priceRanges.find(p => p.id === this.selectedPrice) || this.priceRanges[0];
            
            let result = this.products.filter(p => {
                // 1. Search Logic (Cek Nama & Keywords)
                const matchSearch = searchQuery === '' || 
                                    (p.name && p.name.toLowerCase().includes(searchQuery)) || 
                                    (p.keywords && p.keywords.some(k => k.toLowerCase().includes(searchQuery)));

                // 2. Category Logic (Support string tunggal maupun array kategori di JSON)
                const matchCat = this.selectedCategories.includes('semua') || 
                                 (Array.isArray(p.type) 
                                    ? p.type.some(t => this.selectedCategories.includes(t)) 
                                    : this.selectedCategories.includes(p.type));
                
                // 3. Price Logic
                const matchPrice = p.price >= priceObj.min && p.price <= priceObj.max;
                
                return matchSearch && matchCat && matchPrice;
            });

            return result.slice(0, this.limit);
        },

        // GETTER KHUSUS FLASH SALE
        get flashSaleProducts() {
            if (!this.products) return [];
            return this.products.filter(p => p.flash_sale === true || p.flash_sale === "true");
        },

        // LOGIKA LOAD MORE
        get hasMore() {
            if (!this.products) return false;
            const priceObj = this.priceRanges.find(p => p.id === this.selectedPrice) || this.priceRanges[0];
            const searchQuery = (Alpine.store('search').query || '').toLowerCase();

            const totalFiltered = this.products.filter(p => {
                const matchSearch = searchQuery === '' || (p.name && p.name.toLowerCase().includes(searchQuery));
                const matchCat = this.selectedCategories.includes('semua') || 
                                 (Array.isArray(p.type) ? p.type.some(t => this.selectedCategories.includes(t)) : this.selectedCategories.includes(p.type));
                const matchPrice = p.price >= priceObj.min && p.price <= priceObj.max;
                return matchSearch && matchCat && matchPrice;
            }).length;

            return this.limit < totalFiltered;
        },

        loadMore() { 
            this.limit += window.ENV.PRODUCT_LIMIT_PER_PAGE || 8; 
        },

        // FORMATTER MATA UANG
        formatPrice(price) { 
            return new Intl.NumberFormat('id-ID').format(price); 
        },
        
        // LOGIKA COUNTDOWN FLASH SALE
        updateTimers() {
            if (!this.products) return;
            this.products.forEach(p => {
                if (p.flash_sale && p.flash_sale_end) {
                    const diff = dayjs(p.flash_sale_end).diff(dayjs());
                    if (diff > 0) {
                        const dur = dayjs.duration(diff);
                        const hours = Math.floor(dur.asHours());
                        const minutes = dur.minutes();
                        const seconds = dur.seconds();
                        
                        p.display_timer = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                    } else { 
                        p.display_timer = "Berakhir";
                        p.flash_sale = false; 
                    }
                }
            });
        }
    }));
});
