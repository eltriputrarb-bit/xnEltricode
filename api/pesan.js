import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  // 1. Header CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return res.status(500).json({
      success: false,
      message: 'MONGODB_URI belum diset di Environment Variables Vercel!',
    });
  }

  let client;

  try {
    const { nama, pesan } = req.body || {};

    if (!nama || !pesan) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nama dan pesan tidak boleh kosong.' 
      });
    }

    // Connect ke MongoDB Atlas
    client = new MongoClient(uri);
    await client.connect();

    const db = client.db('eltri_db');
    await db.collection('pesan').insertOne({
      nama: nama.trim(),
      pesan: pesan.trim(),
      createdAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: 'Pesan berhasil terkirim!',
    });
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghubungkan ke database.',
      error: error.message,
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}