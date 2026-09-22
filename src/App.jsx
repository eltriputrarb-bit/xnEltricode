import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/loading.jsx';

import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Alamat from './pages/Alamat';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ritme simulasi jaringan server lambat / tertahan di tengah:
    const networkSteps = [
      { pct: 20, delay: 200 },   // Koneksi dimulai
      { pct: 30, delay: 600 },   // Handshake server
      { pct: 50, delay: 1200 },  // Download data awal
      { pct: 70, delay: 2000 },  // Jaringan mulai agak lambat / buffer
      { pct: 80, delay: 2800 },  // Masih memproses / tertahan di server
      { pct: 95, delay: 3500 },  // Hampir selesai (detik ke 3.5)
      { pct: 100, delay: 4750 }  // Beneran 100% pas di paling akhir! (3.75 detik)
    ];

    const timeouts = networkSteps.map(step => 
      setTimeout(() => setProgress(step.pct), step.delay)
    );

    const fetchGlobalData = async () => {
      const startTime = Date.now();

      try {
        setIsLoading(true);
        const response = await fetch('https://api.github.com/users/eltriputrarb-bit');
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.warn(`GitHub API Info (${response.status}): Menggunakan data profil bawaan.`);
        }
      } catch (error) {
        console.error("Gagal terhubung ke server:", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 3800 - elapsedTime);

        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      }
    };

    fetchGlobalData();

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  return (
    <>
      {isLoading && <Loading progress={progress} />}

      <Header />

      <Routes>
        <Route path="/" element={<Home userData={userData} />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/alamat" element={<Alamat />} />
      </Routes>
    </>
  );
}