const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  const client = await MongoClient.connect(uri);
  const db = client.db('eltri_db');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { nama, pesan } = req.body || {};

    if (!nama || !pesan) {
      return res.status(400).json({ success: false, message: 'Nama dan pesan wajib diisi!' });
    }

    const { db } = await connectToDatabase();

    await db.collection('pesan').insertOne({
      nama: nama.trim(),
      pesan: pesan.trim(),
      createdAt: new Date(),
    });

    return res.status(200).json({ success: true, message: 'Pesan berhasil terkirim!' });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghubungkan ke database.',
      error: error.message,
    });
  }
};