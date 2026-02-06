export default async function handler(req, res) {
    // 1. Validasi: Cek apakah yang masuk itu POST (cara Lynk kirim data)
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Harus pake POST ya!' });
    }

    // 2. Ambil Merchant Key dari Environment Variable Vercel
    const MERCHANT_KEY = process.env.LYNK_MERCHANT_KEY;

    try {
        // 3. Tangkap data yang dikirim Lynk.id
        const payload = req.body;

        // LOGGING: Ini penting buat kita liat struktur datanya nanti di dashboard Vercel
        console.log("--- WEBHOOK DITERIMA ---");
        console.log("Headers:", req.headers);
        console.log("Data:", JSON.stringify(payload, null, 2));

        // 4. Verifikasi Sederhana (Cek apakah Merchant Key ada/cocok)
        // Catatan: Nama header bisa bervariasi, kita cek log dulu nanti
        const incomingKey = req.headers['x-merchant-key'] || req.headers['authorization'];
        
        if (MERCHANT_KEY && incomingKey !== MERCHANT_KEY) {
            console.warn("⚠️ Kunci gak cocok! Ada penyusup?");
            // Sementara kita biarkan lewat dulu buat testing, 
            // nanti kalau udah stabil kita ketatin jadi return 401.
        }

        // 5. Kirim respon balik ke Lynk.id (PENTING: Harus kasih status 200)
        return res.status(200).json({ 
            status: 'success', 
            message: 'Data diterima Reyhan!' 
        });

    } catch (error) {
        console.error("Error Webhook:", error);
        return res.status(500).json({ error: 'Aduh, ada yang error di server.' });
    }
}
