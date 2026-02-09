/**
 * Global Alpine.js Data Components
 * Organized & Optimized
 */

// 1. Home / Product Listing Component
function productApp() {
    return {
        links: window.PAGE_LINKS || {},
        mobileMenu: false,
        searchOpen: false,
        
        // Deadlines Configuration
        deadlines: {
            timer1: "2026-02-10T23:59:59",
            timer2: "2026-02-12T12:00:00",
            timer3: "2026-02-15T00:00:00"
        },
        
        // Display State
        displayTimers: {
            timer1: '00:00:00',
            timer2: '00:00:00',
            timer3: '00:00:00'
        },

        init() {
            // Timer Logic
            this.updateTimers();
            setInterval(() => this.updateTimers(), 1000);

            // UI Animations
            this.initScrollAnimations();
        },

        updateTimers() {
            const now = dayjs();
            for (let key in this.deadlines) {
                const target = dayjs(this.deadlines[key]);
                const diff = target.diff(now);

                if (diff > 0) {
                    const dur = dayjs.duration(diff);
                    const h = Math.floor(dur.asHours()); // Supports > 24h
                    const m = dur.minutes();
                    const s = dur.seconds();
                    
                    this.displayTimers[key] = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
                } else {
                    this.displayTimers[key] = "PROMO HABIS";
                }
            }
        },

        initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeInUp');
                        entry.target.style.opacity = '1';
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.card-hover').forEach((el, index) => {
                el.style.opacity = '0';
                el.style.animationDelay = `${index * 0.1}s`;
                observer.observe(el);
            });
        }
    };
}

// 2. About & Portfolio Page Component
function aboutPage() {
    return {
        mobileMenu: false,
        skillTab: 'languages',
        portfolioFilter: 'all',
        
        // Data Mapping from External Source
        stats: window.portofolioData?.stats || [],
        services: window.portofolioData?.services || [],
        portfolio: window.portofolioData?.projects || [],            
        skills: window.portofolioData?.skills || {},
        contact: window.portofolioData?.contact || {},
        
        get whatsappLink() {
            const msg = encodeURIComponent(this.contact.message || '');
            return `https://wa.me/${this.contact.whatsapp}?text=${msg}`;
        },
        
        get filteredPortfolio() {
            if (this.portfolioFilter === 'all') return this.portfolio;
            return this.portfolio.filter(item => item.type === this.portfolioFilter);
        }
    };
}

// 3. Contact Form Component
function contactPage() {
    return {
        mobileMenu: false,
        isSubmitting: false,
        showSuccess: false,
    };
}

// 4. Product Detail & Checkout Component
function productDetail() {
    return {
        mobileMenu: false,
        showCheckout: false,
        timer: '00:00:00',
        timerSeconds: (2 * 3600) + (45 * 60) + 30, // Default 02:45:30
        
        product: {
            title: 'Landing Page Starter Pack - 5 Template Premium',
            category: 'Web HTML',
            description: 'Paket lengkap 5 template landing page premium dengan desain modern dan clean. Cocok untuk berbagai kebutuhan bisnis, personal branding, hingga portfolio. Semua template sudah responsive dan SEO friendly.',
            price: 75000,
            originalPrice: 150000,
            discountPercent: 50,
            hasDiscount: true,
            features: [
                '5 Template landing page dengan desain berbeda',
                'Fully responsive di semua device',
                'Clean & modern design',
                'Well commented code untuk kemudahan edit',
                'Free update selamanya',
                'Support via WhatsApp/Email'
            ],
            includes: [
                { name: '5 Template', desc: 'File HTML/CSS/JS', icon: 'bx-file' },
                { name: 'Dokumentasi', desc: 'Panduan lengkap', icon: 'bx-book-open' },
                { name: 'Assets', desc: 'Icons & Images', icon: 'bx-image' },
                { name: 'Free Support', desc: '24/7 via WA', icon: 'bx-support' }
            ],
            instructions: [
                { title: 'Download & Extract', desc: 'Setelah pembayaran, download file ZIP dan extract ke folder pilihan Anda.' },
                { title: 'Edit dengan Code Editor', desc: 'Buka file dengan VS Code, atau code editor favorit Anda.' },
                { title: 'Kustomisasi Konten', desc: 'Edit teks, gambar, dan warna sesuai kebutuhan.' },
                { title: 'Upload ke Hosting', desc: 'Upload file ke hosting atau gunakan platform seperti Netlify/GitHub Pages.' }
            ]
        },

        init() {
            this.initSwiper();
            this.startCountdown();
        },

        initSwiper() {
            this.$nextTick(() => {
                const swiper = new Swiper('.productSwiper', {
                    loop: true,
                    grabCursor: true,
                    spaceBetween: 0,
                    pagination: { el: '.swiper-pagination', clickable: true },
                    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                });
                
                const thumbBtns = document.querySelectorAll('.thumb-btn');
                
                // Click to slide
                thumbBtns.forEach((btn, index) => {
                    btn.addEventListener('click', () => {
                        swiper.slideTo(index + 1);
                    });
                });
                
                // Sync thumbnails with slide change
                swiper.on('slideChange', () => {
                    const activeIdx = swiper.realIndex;
                    thumbBtns.forEach((btn, i) => {
                        btn.classList.toggle('border-white', i === activeIdx);
                        btn.classList.toggle('border-transparent', i !== activeIdx);
                    });
                });
            });
        },

        startCountdown() {
            if (!this.product.hasDiscount) return;

            setInterval(() => {
                if (this.timerSeconds > 0) {
                    this.timerSeconds--;
                    const h = Math.floor(this.timerSeconds / 3600);
                    const m = Math.floor((this.timerSeconds % 3600) / 60);
                    const s = this.timerSeconds % 60;
                    this.timer = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
                } else {
                    this.timer = "PROMO BERAKHIR";
                }
            }, 1000);
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil Konfigurasi
    const siteName = window.ENV?.APP_NAME || "REYHANDSHOOT";
    const slogan = window.ENV?.APP_SLOGAN || "Official Store";

    // 2. Daftar Nama Halaman (Mapping)
    // Format: "nama_file" : "Judul Keren"
    const pageTitles = {
        "index": "Home",
        "portofolio": "Portofolio",
        "privacy": "Privacy Policy",
        "terms-and-conditions": "Terms & Conditions",
        "help": "Help",
        "contact": "Contact"
    };

    // 3. Deteksi Halaman Saat Ini
    const path = window.location.pathname;
    // Ambil nama file terakhir (misal: /pages/contact.html -> contact)
    let currentPage = path.split("/").pop().replace(".html", "");
    
    // Jika kosong (root domain), anggap sebagai index
    if (currentPage === "") currentPage = "index";

    // 4. Eksekusi Perubahan Judul
    if (currentPage === "index") {
        // Khusus Home: "REYHANDSHOOT - Digital Creative Store"
        document.title = `${siteName} - ${slogan}`;
    } else if (pageTitles[currentPage]) {
        // Halaman Lain: "Hubungi Kami || REYHANDSHOOT"
        document.title = `${pageTitles[currentPage]} || ${siteName}`;
    }

    // 5. Helper Function (Untuk Halaman Produk / Dinamis)
    // Bisa dipanggil dari Alpine.js: window.setPageTitle("Nama Produk")
    window.setPageTitle = (customTitle) => {
        if (customTitle) {
            document.title = `${customTitle} || ${siteName}`;
        }
    };
});

