import { MongoClient } from 'mongodb';

// Mengambil variabel koneksi dari Vercel Environment Variables
const uri = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

// Fungsi pembantu untuk menghemat koneksi database (Re-use connection)
async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error('MONGODB_URI belum dipasang pada Environment Variables Vercel.');
  }

  const client = await MongoClient.connect(uri);
  const db = client.db('db_portfolio'); // Nama database kamu

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  // 1. Mengizinkan hanya metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method Not Allowed. Gunakan metode POST.' 
    });
  }

  // 2. Ambil data dari body request
  const { nama, pesan } = req.body || {};

  // Validasi input sederhana
  if (!nama || !pesan) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nama dan pesan tidak boleh kosong.' 
    });
  }

  try {
    // 3. Hubungkan ke Database
    const { db } = await connectToDatabase();

    // 4. Simpan pesan ke koleksi 'pesan'
    const result = await db.collection('pesan').insertOne({
      nama: nama.trim(),
      pesan: pesan.trim(),
      createdAt: new Date(),
    });

    // 5. Kirim respon sukses ke frontend
    return res.status(200).json({
      success: true,
      message: 'Pesan berhasil disimpan!',
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal terhubung ke database server.',
      error: error.message,
    });
  }
}