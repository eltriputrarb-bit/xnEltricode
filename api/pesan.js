import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method tidak diizinkan' });
  }

  const { nama, pesan } = req.body;

  if (!nama || !pesan) {
    return res.status(400).json({ message: 'Nama dan pesan wajib diisi!' });
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('eltri_db'); // Nama Database kamu
    const collection = db.collection('pesan');

    await collection.insertOne({
      nama,
      pesan,
      createdAt: new Date(),
    });

    await client.close();

    return res.status(200).json({ success: true, message: 'Pesan berhasil terkirim!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal koneksi ke database', error: error.message });
  }
}