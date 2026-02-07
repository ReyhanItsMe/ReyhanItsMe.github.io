/**
 * REYHANDSHOOT - All-in-One Component Loader
 * Gabungan fungsi ambil file dan perintah pasang komponen
 */

// 1. Fungsi Internal untuk Fetching
async function fetchComponent(elementId, filePath) {
    const target = document.getElementById(elementId);
    if (!target) return;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("Gagal ambil file");
        
        const html = await response.text();
        target.innerHTML = html;

        // Hidupkan Alpine.js setelah komponen nempel
        if (window.Alpine) {
            window.Alpine.discover();
        }
    } catch (err) {
        console.error("Error Load:", filePath, err);
    }
}

// 2. Perintah Eksekusi Otomatis saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
    // Panggil semua komponen yang kamu butuhkan di sini
    fetchComponent('navbar-placeholder', '/components/navbar.html');
    fetchComponent('footer-placeholder', '/components/footer.html');
    fetchComponent('floating-button-whatsapp-placeholder', '/components/floating-button-whatsapp.html');
    
    // Kamu bisa tambah lagi di sini kalau ada komponen lain nantinya
    // fetchComponent('contact-placeholder', '/components/contact-form.html');
});
