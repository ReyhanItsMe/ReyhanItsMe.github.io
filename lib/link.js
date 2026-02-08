// LINK.JS
const PAGE_LINKS = {
    // Navigasi Halaman
    home: window.ENV.PATH_HOME, 
    portfolio: window.ENV.PATH_PORTFOLIO,
    promo: window.ENV.PATH_PROMO,
    privacy: window.ENV.PATH_PRIVACY,
    terms: window.ENV.PATH_TERMS,
    help: window.ENV.PATH_HELP,
    contact: window.ENV.PATH_CONTACT,
    
    // Media Sosial
    instagram: window.ENV.URL_INSTAGRAM,
    whatsapp: window.ENV.URL_WHATSAPP,
    github: window.ENV.URL_GITHUB,
    discord: window.ENV.URL_DISCORD,
    
    // Info Kontak & Data Bisnis
    email: window.ENV.CONTACT_EMAIL,
    phoneDisplay: window.ENV.CONTACT_PHONE_DISPLAY,
    address: window.ENV.CONTACT_ADDRESS,
    
    // External Link
    lynk: window.ENV.URL_LYNK
};

window.PAGE_LINKS = PAGE_LINKS;

// FUNGSI PEMANGGIL KOMPONEN
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("File not found: " + filePath);
        
        const html = await response.text();
        const target = document.getElementById(elementId);
        
        if (target) {
            target.innerHTML = html;
            
            // Re-scan Alpine.js supaya tombol mobile menu berfungsi
            if (window.Alpine) {
                // Alpine v3 method untuk inisialisasi elemen baru
                Alpine.initTree(target); 
            }
        }
    } catch (err) {
        console.error("Gagal memuat komponen:", err);
    }
}