/**
 * environment.js
 * Pusat semua data dan konfigurasi website (Single Source of Truth).
 */
window.ENV = {
    // === [ GLOBAL CONFIG ] ===
    APP_NAME: "RDS Web ID",
    DB_PRODUCTS: './database/product.json',
    PRODUCT_LIMIT_PER_PAGE: 8,

    // === [ PAGE PATHS ] ===
    PATH_HOME: "/index.html", 
    PATH_PORTFOLIO: "/pages/portofolio.html",
    PATH_PROMO: "/pages/promo.html",
    PATH_PRIVACY: "/pages/privacy.html",
    PATH_TERMS: "/pages/terms-and-conditions.html",
    PATH_HELP: "/pages/help.html",
    PATH_CONTACT: "/pages/contact.html",

    // === [ SOCIAL MEDIA & LINKS ] ===
    URL_INSTAGRAM: "https://instagram.com/asreyyonly",
    URL_WHATSAPP_LINK: "https://wa.me/6282117256472", // Link Full
    URL_WHATSAPP_NUMBER: "6282117256472",           // Angka saja untuk API
    URL_GITHUB: "https://github.com/ReyhanItsMe",
    URL_DISCORD: "https://discord.gg/yourlink",
    URL_LYNK: "https://lynk.id/reyhanshoot",

    // === [ CONTACT INFO ] ===
    CONTACT_EMAIL: "hello@rds.web.id",
    CONTACT_PHONE_DISPLAY: "+62 821-1725-6472",
    CONTACT_ADDRESS: "Bandung, Jawa Barat, Indonesia",
    WA_DEFAULT_MSG: "Halo Reyhan, saya ingin tanya tentang layanannya.",

    // === [ PRODUCT CATEGORIES ] ===
    CATEGORIES: [
        { id: 'jasa', label: 'Jasa', icon: 'bx-briefcase-alt-2' },
        { id: 'html', label: 'HTML', icon: 'bx-code-alt' },
        { id: 'template', label: 'Template', icon: 'bx-layout' },
        { id: 'bestseller', label: 'Bestseller', icon: 'bx-trending-up' },
        { id: 'model3d', label: 'Model 3D', icon: 'bx-cube' },
        { id: 'components', label: 'Components', icon: 'bx-layer' },
        { id: 'assets', label: 'Assets', icon: 'bx-package' }
    ],

    // === [ PRICE FILTER RANGES ] ===
    PRICE_RANGES: [
        { id: 'all', label: 'Semua Harga', min: 0, max: 99999999 },
        { id: 'under10', label: 'Di bawah 10rb', min: 0, max: 10000 },
        { id: '10to50', label: '10rb - 50rb', min: 10001, max: 50000 },
        { id: '51to100', label: '51rb - 100rb', min: 50001, max: 100000 },
        { id: 'above100', label: 'Di atas 100rb', min: 100001, max: 99999999 }
    ],

    // === [ PORTOFOLIO STATS ] ===
    STATS: [
        { value: "2+", label: "Tahun Belajar" },
        { value: "5+", label: "Proyek" },
        { value: "100%", label: "Otodidak" }
    ],

    // === [ SERVICES ] ===
    SERVICES: [
        { icon: 'bx-code-alt', title: 'Website Statis', desc: 'Landing page, portfolio, component, company profile dengan HTML, CSS, JavaScript, dan Tailwind.', price: 'Mulai Rp 10K' },
        { icon: 'bx-palette', title: 'UI/UX Design', desc: 'Desain antarmuka modern dan user-friendly untuk web dan mobile menggunakan Figma.', price: 'Mulai Rp 5K' },
        { icon: 'bx-layer', title: 'Template Premium', desc: 'Template siap pakai untuk berbagai kebutuhan: web, Alight Motion, Pixellab.', price: 'Mulai Rp 5K' },
        { icon: 'bx-movie-play', title: 'Preset Alight Motion', desc: 'Preset transisi, efek, dan animasi untuk editing video di Alight Motion.', price: 'Mulai Rp 2K' },
        { icon: 'bx-text', title: 'Template Pixellab', desc: 'Template typography, poster, dan desain grafis untuk Pixellab (PLP).', price: 'Mulai Rp 2K' },
        { icon: 'bx-customize', title: 'Custom Project', desc: 'Proyek khusus sesuai kebutuhan Anda. Konsultasi gratis untuk diskusi ide.', price: 'Hubungi untuk harga' }
    ],

    // === [ PROJECTS ] ===
    PROJECTS: [
        {
            title: 'ReyhanDShoot Shop',
            description: 'Toko online untuk produk digital dengan tema monokrom',
            image: '/assets/img/logo.png',
            type: 'web',
            tech: ['HTML', 'Tailwind', 'Alpine.js', 'lynk.id'],
            link: 'https://shop.rds.web.id'
        },
        {
            title: 'SevenCultures',
            description: 'Website toko fashion dan merchandise',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
            type: 'web',
            tech: ['Fashion', 'Merchandise', 'Archive'],
            link: 'https://tiktok.com/@sevencultures.archive'
        }
    ],

    // === [ SKILLS ] ===
    SKILLS: {
        languages: [
            { name: "HTML5", icon: "devicon-html5-plain colored", progress: "95%", color: "bg-orange-500" },
            { name: "CSS3", icon: "devicon-css3-plain colored", progress: "90%", color: "bg-blue-500" },
            { name: "JavaScript", icon: "devicon-javascript-plain colored", progress: "85%", color: "bg-yellow-400" },
            { name: "PHP", icon: "devicon-php-plain colored", progress: "90%", color: "bg-indigo-400" },
            { name: "Node.js", icon: "devicon-nodejs-plain colored", progress: "60%", color: "bg-green-500" }
        ],
        frameworks: [
            { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored", progress: "90%", color: "bg-cyan-400" },
            { name: "Alpine.js", icon: "devicon-alpinejs-original colored", progress: "85%", color: "bg-cyan-600" },
            { name: "Laravel", icon: "devicon-laravel-original colored", progress: "80%", color: "bg-red-500" },
            { name: "Livewire", icon: "devicon-livewire-plain colored", progress: "85%", color: "bg-pink-500" }
        ],
        database: [
            { name: "MySQL", icon: "devicon-mysql-plain colored", progress: "60%", color: "bg-blue-400" },
            { name: "MongoDB", icon: "devicon-mongodb-plain colored", progress: "45%", color: "bg-green-500" }
        ],
        tools: [
            { name: "Git", icon: "devicon-git-plain colored", progress: "70%", color: "bg-orange-500" },
            { name: "GitHub", icon: "devicon-github-original", progress: "80%", color: "bg-white" },
            { name: "Termux", icon: "bx bx-terminal", progress: "90%", color: "bg-green-400" },
            { name: "Figma", icon: "devicon-figma-plain colored", progress: "75%", color: "bg-purple-400" },
            { name: "VS Code", icon: "devicon-vscode-plain colored", progress: "85%", color: "bg-blue-500" }
        ],
        design: [
            { name: "Figma", icon: "devicon-figma-plain colored", progress: "75%", color: "bg-purple-400" },
            { name: "Pixellab", icon: "bx bx-text", progress: "95%", color: "bg-blue-400" },
            { name: "Alight Motion", icon: "bx bx-movie-play", progress: "80%", color: "bg-pink-400" },
            { name: "Canva", icon: "devicon-canva-original colored", progress: "90%", color: "bg-purple-500" }
        ]
    }
};
