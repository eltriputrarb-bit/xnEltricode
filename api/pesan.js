import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error('MONGODB_URI tidak ditemukan di Environment Variables Vercel.');
  }

  const client = await MongoClient.connect(uri);
  // Nama database diambil secara otomatis dari MONGODB_URI atau default 'eltri_db'
  const db = client.db('eltri_db');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  // 1. Header CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { nama, pesan } = req.body || {};

    if (!nama || !pesan) {
      return res.status(400).json({
        success: false,
        message: 'Nama dan pesan tidak boleh kosong.',
      });
    }

    const { db } = await connectToDatabase();

    // 2. Simpan pesan ke collection 'pesan'
    const result = await db.collection('pesan').insertOne({
      nama: nama.trim(),
      pesan: pesan.trim(),
      createdAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: 'Pesan berhasil terkirim!',
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error('Serverless Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghubungkan ke database server.',
      error: error.message,
    });
  }
}