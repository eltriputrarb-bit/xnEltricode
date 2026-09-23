import dbConnect from '../lib/dbConnect'; // Sesuaikan path dbConnect milikmu
import Pesan from '../models/Pesan';       // Sesuaikan path model Pesan milikmu
import mongoose from 'mongoose';

export default async function handler(req, res) {
  // Hanya izinkan method DELETE
  if (req.method !== 'DELETE') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method tidak diizinkan' 
    });
  }

  // Validasi Header Rahasia Admin
  const clientSecret = req.headers['x-admin-secret'];
  const serverSecret = process.env.ADMIN_SECRET_KEY;

  if (serverSecret && clientSecret !== serverSecret) {
    return res.status(401).json({ 
      success: false, 
      message: 'Akses ditolak! Secret key tidak valid.' 
    });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ 
      success: false, 
      message: 'ID pesan diperlukan' 
    });
  }

  try {
    // Konek ke MongoDB
    await dbConnect();

    // Validasi format ID MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Format ID pesan tidak valid' 
      });
    }

    // Hapus data
    const deletedPesan = await Pesan.findByIdAndDelete(id);

    if (!deletedPesan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pesan tidak ditemukan' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Pesan berhasil dihapus' 
    });

  } catch (error) {
    console.error('Error deletepesan:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Terjadi kesalahan pada server' 
    });
  }
}