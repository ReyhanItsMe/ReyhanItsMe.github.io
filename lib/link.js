// Database link dan kontak terpusat
const PAGE_LINKS = {
    // Navigasi Halaman (Path dari Root)
    home: "/index.html", 
    portfolio: "/pages/portofolio.html",
    promo: "/pages/promo.html",
    privacy: "/pages/privacy.html",
    terms: "/pages/terms-and-conditions.html",
    help: "/pages/help.html",
    contact: "/pages/contact.html",
    
    // Media Sosial
    instagram: "https://instagram.com/asreyyonly",
    whatsapp: "https://wa.me/6282117256472",
    github: "https://github.com/ReyhanItsMe",
    discord: "https://discord.gg/yourlink", // Ganti dengan link discord kamu
    
    // Info Kontak & Data Bisnis
    email: "hello@rds.web.id",
    phoneDisplay: "+62 821-1725-6472",
    address: "Bandung, Jawa Barat, Indonesia",
    
    // External Link (Linktree/Lynk)
    lynk: "https://lynk.id/reyhanshoot"
};

// Pasang di window agar bisa dibaca Alpine.js di semua halaman
window.PAGE_LINKS = PAGE_LINKS;

// 2. FUNGSI PEMANGGIL KOMPONEN (PENTING!)
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