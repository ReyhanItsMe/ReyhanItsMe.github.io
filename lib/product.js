document.addEventListener('alpine:init', () => {
    // 1. STORE GLOBAL UNTUK SEARCH
    Alpine.store('search', {
        query: '',
    });

    Alpine.data('productApp', () => ({
        products: [],
        loading: true,
        limit: 8,
        
        showFilter: false,
        selectedCategories: ['semua'], 
        selectedPrice: 'all', 
        
        categories: [
            { id: 'jasa', label: 'Jasa', icon: 'bx-briefcase-alt-2' },
            { id: 'html', label: 'HTML', icon: 'bx-code-alt' },
            { id: 'template', label: 'Template', icon: 'bx-layout' },
            { id: 'bestseller', label: 'Bestseller', icon: 'bx-trending-up' },
            { id: 'model3d', label: 'Model 3D', icon: 'bx-cube' },
            { id: 'components', label: 'Components', icon: 'bx-layer' },
            { id: 'assets', label: 'Assets', icon: 'bx-package' }
        ],

        priceRanges: [
            { id: 'all', label: 'Semua Harga', min: 0, max: 99999999 },
            { id: 'under10', label: 'Di bawah 10rb', min: 0, max: 10000 },
            { id: '10to50', label: '10rb - 50rb', min: 10001, max: 50000 },
            { id: '51to100', label: '51rb - 100rb', min: 50001, max: 100000 },
            { id: 'above100', label: 'Di atas 100rb', min: 100001, max: 99999999 }
        ],

        async init() {
            try {
                // Gunakan path absolut / atau sesuaikan dengan lokasi json kamu
                const response = await fetch('./database/product.json');
                const data = await response.json();
                this.products = data || [];
                
                // Jalankan timer
                setInterval(() => { this.updateTimers(); }, 1000);
                
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
                this.selectedCategories = this.selectedCategories.filter(c => c !== 'semua');
                if (this.selectedCategories.includes(id)) {
                    this.selectedCategories = this.selectedCategories.filter(c => c !== id);
                    if (this.selectedCategories.length === 0) this.selectedCategories = ['semua'];
                } else {
                    this.selectedCategories.push(id);
                }
            }
            this.limit = 8;
        },

        // GETTER PRODUK UNTUK INDEX (Filtered)
        get filteredProducts() {
            if (!this.products) return [];

            const searchQuery = (Alpine.store('search').query || '').toLowerCase();
            const priceObj = this.priceRanges.find(p => p.id === this.selectedPrice) || this.priceRanges[0];
            
            let result = this.products.filter(p => {
                // 1. Search Logic
                const matchSearch = searchQuery === '' || 
                                    (p.name && p.name.toLowerCase().includes(searchQuery)) || 
                                    (p.keywords && p.keywords.some(k => k.toLowerCase().includes(searchQuery)));

                // 2. Category Logic
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

        // GETTER KHUSUS FLASH SALE (Untuk Section Flash Sale)
        get flashSaleProducts() {
            if (!this.products) return [];
            return this.products.filter(p => p.flash_sale === true || p.flash_sale === "true");
        },

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

        loadMore() { this.limit += 8; },
        formatPrice(price) { return new Intl.NumberFormat('id-ID').format(price); },
        
        updateTimers() {
            if (!this.products) return;
            this.products.forEach(p => {
                if (p.flash_sale && p.flash_sale_end) {
                    const diff = dayjs(p.flash_sale_end).diff(dayjs());
                    if (diff > 0) {
                        const dur = dayjs.duration(diff);
                        p.display_timer = `${String(Math.floor(dur.asHours())).padStart(2, '0')}:${String(dur.minutes()).padStart(2, '0')}:${String(dur.seconds()).padStart(2, '0')}`;
                    } else { 
                        p.display_timer = "Berakhir";
                        p.flash_sale = false; 
                    }
                }
            });
        }
    }));
});
