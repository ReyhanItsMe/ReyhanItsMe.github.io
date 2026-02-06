export default async function handler(req, res) {
  // Hanya izinkan metode POST (karena Webhook kirim data lewat POST)
  if (req.method === 'POST') {
    const data = req.body;

    // Log data ke konsol Vercel (buat kamu cek nanti)
    console.log("Data Webhook Diterima:", data);

    // Di sini kamu bisa tambah logic, misal:
    // 1. Cek apakah statusnya 'SUCCESS'
    // 2. Kirim data ke database atau email (Nanti di tahap selanjutnya)

    return res.status(200).json({ message: 'Webhook received!' });
  } else {
    // Jika ada yang iseng buka link ini di browser (GET), tolak.
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
