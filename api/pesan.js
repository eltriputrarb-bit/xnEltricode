import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error('MONGODB_URI tidak ditemukan di Environment Variables');
  }

  const client = await MongoClient.connect(uri);
  // Mengambil database 'eltri_db'
  const db = client.db('eltri_db');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { nama, pesan } = req.body || {};

  if (!nama || !pesan) {
    return res.status(400).json({ success: false, message: 'Nama dan pesan wajib diisi!' });
  }

  try {
    const { db } = await connectToDatabase();

    await db.collection('pesan').insertOne({
      nama: nama.trim(),
      pesan: pesan.trim(),
      createdAt: new Date(),
    });

    return res.status(200).json({ success: true, message: 'Pesan berhasil terkirim!' });
  } catch (error) {
    console.error('Error MongoDB:', error);
    return res.status(500).json({ success: false, message: 'Gagal menghubungkan ke database', error: error.message });
  }
}