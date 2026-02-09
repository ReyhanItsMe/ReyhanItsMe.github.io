        function helpPage() {
            return {
                mobileMenu: false,
                searchOpen: false,
                searchQuery: '',
                faqFilter: 'semua',
                faqs: [
                    // Pembelian
                    { q: 'Bagaimana cara membeli produk di DEVACODE?', a: 'Pilih produk → Klik "Beli Sekarang" → Review pesanan → Lanjutkan ke WhatsApp → Bayar → Terima produk via email/WA. Proses sangat mudah dan cepat!', category: 'pembelian', open: false },
                    { q: 'Metode pembayaran apa saja yang tersedia?', a: 'Kami menerima <strong>Transfer Bank</strong> (BCA, BNI, BRI, Mandiri), <strong>E-Wallet</strong> (DANA, OVO, GoPay, ShopeePay), <strong>QRIS</strong>, dan <strong>PayPal</strong> untuk pembeli internasional.', category: 'pembelian', open: false },
                    { q: 'Apakah ada biaya tambahan selain harga produk?', a: 'Ya, ada <strong>biaya admin pembayaran</strong> yang bervariasi tergantung metode pembayaran yang dipilih. Biaya akan diinformasikan sebelum Anda melakukan pembayaran.', category: 'pembelian', open: false },
                    { q: 'Berapa lama proses konfirmasi pembayaran?', a: 'Untuk <strong>e-wallet/QRIS</strong>: Instan (1-5 menit). Untuk <strong>transfer bank</strong>: Maksimal 1x24 jam (biasanya lebih cepat pada jam kerja).', category: 'pembelian', open: false },
                    { q: 'Apakah bisa bayar dengan cicilan?', a: 'Saat ini kami belum menyediakan opsi cicilan. Semua pembayaran dilakukan secara penuh di muka.', category: 'pembelian', open: false },
                    
                    // Produk
                    { q: 'Produk apa saja yang dijual di DEVACODE?', a: 'Kami menjual berbagai produk digital: <strong>Template Web HTML</strong>, <strong>Preset Alight Motion</strong>, <strong>Template Pixellab/PLP</strong>, <strong>Komponen HTML</strong>, <strong>Website Siap Online</strong>, dan layanan <strong>Custom Project</strong>.', category: 'produk', open: false },
                    { q: 'Apakah produk bisa di-preview sebelum beli?', a: 'Ya! Setiap produk memiliki <strong>gambar preview</strong> dan beberapa produk juga memiliki <strong>live demo</strong> yang bisa Anda lihat sebelum membeli.', category: 'produk', open: false },
                    { q: 'Apakah produk mendapat update gratis?', a: 'Ya, semua produk mendapat <strong>update gratis selamanya</strong>. Anda akan mendapat notifikasi jika ada update dan bisa download versi terbaru.', category: 'produk', open: false },
                    { q: 'Apa perbedaan lisensi Personal dan Komersial?', a: '<strong>Personal</strong>: Untuk 1 proyek pribadi, tidak untuk klien. <strong>Komersial</strong>: Unlimited proyek termasuk untuk klien, namun tidak untuk dijual ulang.', category: 'produk', open: false },
                    { q: 'Apakah bisa request custom produk?', a: 'Tentu! Hubungi kami via WhatsApp atau halaman Contact untuk mendiskusikan kebutuhan custom Anda. Kami akan memberikan penawaran harga sesuai scope project.', category: 'produk', open: false },
                    
                    // Teknis
                    { q: 'Format file apa yang akan saya terima?', a: 'Tergantung jenis produk: <strong>Web HTML</strong> (.zip berisi HTML/CSS/JS), <strong>Alight Motion</strong> (.alight), <strong>Pixellab</strong> (.plp), <strong>Assets</strong> (.png/.svg/.jpg).', category: 'teknis', open: false },
                    { q: 'Bagaimana cara menggunakan template web HTML?', a: 'Extract file ZIP → Buka dengan code editor (VS Code, dll) → Edit konten sesuai kebutuhan → Preview di browser → Upload ke hosting. Dokumentasi lengkap disertakan dalam setiap produk.', category: 'teknis', open: false },
                    { q: 'Apakah template web sudah responsive?', a: 'Ya, semua template web kami sudah <strong>100% responsive</strong> dan dioptimasi untuk semua device (mobile, tablet, desktop).', category: 'teknis', open: false },
                    { q: 'Bagaimana cara import preset Alight Motion?', a: 'Download file .alight → Buka app Alight Motion → Tap menu titik 3 → Pilih Import → Cari dan pilih file preset → Selesai! Preset siap digunakan.', category: 'teknis', open: false },
                    { q: 'Software apa yang dibutuhkan untuk edit template?', a: 'Untuk <strong>Web HTML</strong>: VS Code, Sublime Text, atau code editor apapun. Untuk <strong>Alight Motion</strong>: App Alight Motion. Untuk <strong>Pixellab</strong>: App Pixellab.', category: 'teknis', open: false },
                    { q: 'Apakah perlu skill coding untuk menggunakan template?', a: 'Untuk modifikasi dasar (teks, gambar, warna), skill HTML/CSS dasar sudah cukup. Untuk modifikasi lanjutan, diperlukan pemahaman JavaScript. Kami sertakan dokumentasi di setiap produk.', category: 'teknis', open: false },
                    
                    // Lainnya
                    { q: 'Apakah bisa refund jika tidak puas?', a: 'Refund hanya diberikan jika produk <strong>tidak sesuai deskripsi</strong> atau <strong>file rusak</strong>. Refund tidak berlaku jika Anda berubah pikiran setelah download. Pengajuan maksimal 7 hari setelah pembelian.', category: 'lainnya', open: false },
                    { q: 'Bagaimana jika file yang diterima rusak/corrupt?', a: 'Segera hubungi kami via WhatsApp dengan menyertakan bukti (screenshot error). Kami akan mengirim ulang file atau melakukan refund jika tidak bisa diperbaiki.', category: 'lainnya', open: false },
                    { q: 'Apakah ada garansi untuk produk yang dibeli?', a: 'Ya, kami memberikan garansi <strong>support seumur hidup</strong> untuk semua produk. Jika ada pertanyaan atau kendala, tim kami siap membantu.', category: 'lainnya', open: false },
                    { q: 'Bagaimana cara menghubungi customer support?', a: 'Anda bisa menghubungi kami via <strong>WhatsApp</strong> (respon tercepat), <strong>Email</strong>, <strong>Instagram DM</strong>, atau <strong>Discord</strong>. Tim kami aktif 09:00-21:00 WIB.', category: 'lainnya', open: false },
                    { q: 'Apakah ada diskon untuk pembelian bulk?', a: 'Ya! Hubungi kami via WhatsApp untuk negosiasi harga jika Anda ingin membeli beberapa produk sekaligus atau berlangganan.', category: 'lainnya', open: false },
                    { q: 'Bagaimana cara menjadi affiliate DEVACODE?', a: 'Saat ini kami belum membuka program affiliate. Ikuti social media kami untuk update terbaru seputar program-program menarik.', category: 'lainnya', open: false },
                    { q: 'Apakah DEVACODE menerima jasa pembuatan website?', a: 'Ya! Selain menjual template, kami juga menerima <strong>jasa pembuatan website custom</strong>. Hubungi kami untuk konsultasi dan penawaran harga.', category: 'lainnya', open: false },
                ],
                
                get filteredFaqs() {
                    let result = this.faqs;
                    
                    // Filter by category
                    if (this.faqFilter !== 'semua') {
                        result = result.filter(faq => faq.category === this.faqFilter);
                    }
                    
                    // Filter by search
                    if (this.searchQuery.trim() !== '') {
                        const query = this.searchQuery.toLowerCase();
                        result = result.filter(faq => 
                            faq.q.toLowerCase().includes(query) || 
                            faq.a.toLowerCase().includes(query)
                        );
                    }
                    
                    return result;
                },
                
                filterFAQ() {
                    // Reset all FAQ open states when searching
                    if (this.searchQuery.trim() !== '') {
                        this.faqs.forEach(faq => faq.open = false);
                    }
                }
            }
        }