// src/pages/api/deletepesan.js
import dbConnect from '../../lib/dbConnect'; // Sesuaikan path koneksi DB Anda
import Pesan from '../../models/Pesan';       // Sesuaikan path model Pesan Anda

export default async function handler(req, res) {
  // 1. Pastikan Method HTTP yang digunakan adalah DELETE
  if (req.method !== 'DELETE') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method tidak diizinkan! Gunakan method DELETE.' 
    });
  }

  // 2. Proteksi Keamanan: Cek Kunci Rahasia Admin dari Header
  const clientSecret = req.headers['x-admin-secret'];
  const serverSecret = process.env.ADMIN_SECRET_KEY || 'KUNCI_RAHASIA_DEFAULT_KAMU';

  if (!clientSecret || clientSecret !== serverSecret) {
    return res.status(401).json({ 
      success: false, 
      message: 'Akses ditolak! Kunci rahasia admin tidak valid.' 
    });
  }

  // 3. Ambil ID pesan dari Query Parameter (URL: /api/deletepesan?id=XXX)
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ 
      success: false, 
      message: 'ID pesan tidak ditemukan / diperlukan.' 
    });
  }

  try {
    // 4. Hubungkan ke database dan hapus pesan berdasarkan ID
    await dbConnect();
    const deletedPesan = await Pesan.findByIdAndDelete(id);

    if (!deletedPesan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pesan tidak ditemukan di database.' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Pesan berhasil dihapus.' 
    });
  } catch (error) {
    console.error('Error saat menghapus pesan:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan server saat menghapus pesan.' 
    });
  }
}