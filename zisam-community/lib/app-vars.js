/**
 * Zisam App Variables Manager (Ultimate Version)
 * Menangani Config, Dynamic Stats, Team Loop, dan Page Routing (data-page)
 */

const AppVars = {
    // Fungsi Utama Inisialisasi
    async init() {
        const paths = window.ZISAM_PATHS;

        // Cegah error jika paths.js lupa dipanggil
        if (!paths) {
            console.error("ZISAM_PATHS tidak ditemukan! Pastikan lib/paths.js dipanggil sebelum app-vars.js.");
            return;
        }

        const { database, templates } = paths;

        try {
            // 1. Ambil semua data sekaligus (Parallel Fetch)
            const [resConfig, resDynamic, resSupported, resTeam] = await Promise.all([
                fetch(database.config).catch(() => null),
                fetch(database.dynamic).catch(() => null),
                fetch(database.supported).catch(() => null),
                fetch(database.team).catch(() => null)
            ]);

            // Ekstrak JSON
            const config = resConfig ? await resConfig.json() : null;
            const dynamic = resDynamic ? await resDynamic.json() : null;
            const supportedData = resSupported ? await resSupported.json() : null;
            const teamData = resTeam ? await resTeam.json() : null;

            // 2. Render Data Statis & URL Routing (data-config & data-page)
            if (config || dynamic) {
                this.renderStatic(config, dynamic);
            }

            // 3. Render Looping Data: Dukungan / Partner
            if (supportedData && templates.supported) {
                await this.renderList(supportedData, 'supported', templates.supported);
            }

            // 4. Render Looping Data: Panitia
            if (teamData) {
                const activeTeam = teamData.filter(member => member.is_active);
                
                if (templates.team_index) {
                    await this.renderList(activeTeam, 'team_index', templates.team_index);
                }
                if (templates.team_portofolio) {
                    await this.renderList(activeTeam, 'team_portofolio', templates.team_portofolio);
                }
            }

        } catch (error) {
            console.error("AppVars Initialization Error:", error);
        }
    },

    // Fungsi Render Teks Biasa & Routing
    renderStatic(config, dynamic) {
        if (config) {
            // --- HANDLE DATA-CONFIG (Teks, Kontak & Sosmed) ---
            document.querySelectorAll('[data-config]').forEach(el => {
                const path = el.getAttribute('data-config');
                const value = this.getNestedValue(config, path);
                
                if (value) {
                    // Jika elemen adalah tag <a> dan berada di dalam kategori 'contact'
                    if (el.tagName === 'A' && path.includes('contact')) {
                        
                        // KASUS 1: Alamat (Teks dari address, Link dari maps)
                        if (path.includes('address')) {
                            const mapsUrl = this.getNestedValue(config, 'contact.maps');
                            if (mapsUrl) el.href = mapsUrl;
                            el.innerText = value; // Isi teks dengan nama jalan/alamat
                        } 
                        
                        // KASUS 2: Email (Menggunakan mailto:)
                        else if (path.includes('email')) {
                            el.href = `mailto:${value}`;
                            el.innerText = value; // Isi teks dengan alamat email
                        } 
                        
                        // KASUS 3: Sosial Media Biasa (Biasanya cuma butuh link untuk icon)
                        else {
                            if (path.includes('instagram')) el.href = `https://instagram.com/${value}`;
                            if (path.includes('whatsapp')) el.href = `https://wa.me/${value}`;
                            if (path.includes('youtube')) el.href = `https://youtube.com/@${value}`;
                            if (path.includes('tiktok')) el.href = `https://tiktok.com/@${value}`;
                        }
                    } 
                    // Jika elemen biasa (span, p, h1, div, dll)
                    else {
                        el.innerText = value;
                    }
                }
            });

            // --- HANDLE DATA-PAGE (Routing pengganti pages.js) ---
            if (config.pages) {
                document.querySelectorAll('[data-page]').forEach(link => {
                    const pageKey = link.getAttribute('data-page');
                    if (config.pages[pageKey]) {
                        link.href = config.pages[pageKey];
                    }
                });
            }
        }

        // --- HANDLE DATA-DYNAMIC (Statistik Angka) ---
        if (dynamic && dynamic.stats) {
            document.querySelectorAll('[data-dynamic]').forEach(el => {
                const key = el.getAttribute('data-dynamic');
                if (dynamic.stats[key]) el.innerText = dynamic.stats[key];
            });
        }
    },


    // Fungsi Pembantu: Membaca Object Bersarang
    getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : null, obj);
    },

    // FUNGSI RENDER LOOP UPGRADE (Support Auto-Hide & Limit)
    async renderList(dataArray, targetList, templatePath) {
        // Cari container
        const container = document.querySelector(`[data-list="${targetList}"]`);
        
        // DEBUG: Hapus ini jika sudah jalan
        // console.log(`Mencoba render ${targetList}, container ditemukan:`, !!container);

        if (!container || !dataArray || !templatePath) return;

        // Jika sudah ada isinya (bukan lagi teks memuat), jangan render ulang biar gak kedip
        if (container.children.length > 0 && !container.querySelector('.animate-pulse')) return;

        const limit = container.getAttribute('data-limit');
        const displayData = limit ? dataArray.slice(0, parseInt(limit)) : dataArray;

        try {
            const response = await fetch(templatePath);
            const templateText = await response.text();

            const finalHtml = displayData.map(item => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = templateText;

                tempDiv.querySelectorAll('[data-if]').forEach(el => {
                    const path = el.getAttribute('data-if');
                    const value = this.getNestedValue(item, path);
                    if (!value) el.remove();
                });

                let html = tempDiv.innerHTML;
                const placeholders = html.match(/\{\{([a-zA-Z0-9_.]+)\}\}/g) || [];
                [...new Set(placeholders)].forEach(match => {
                    const path = match.replace('{{', '').replace('}}', '');
                    const value = this.getNestedValue(item, path);
                    html = html.replaceAll(match, value || '');
                });
                return html;
            }).join('');

            container.innerHTML = finalHtml;
        } catch (e) {
            console.error(`Gagal render list ${targetList}:`, e);
        }
    }

};

// Eksekusi pertama saat browser selesai memuat HTML
document.addEventListener('DOMContentLoaded', () => AppVars.init());

// Observer Pintar: Mengawasi Alpine.js (Navbar/Footer)
let timeout;
const varObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            // Debounce: Jika ada banyak perubahan, tunggu sampai tenang baru eksekusi sekali
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                AppVars.init();
            }, 150); // Tambahkan sedikit biar lebih stabil
        }
    });
});
varObserver.observe(document.body, { childList: true, subtree: true });
