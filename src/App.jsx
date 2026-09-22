import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/loading.jsx'; // Sesuaikan casing ('Loading.jsx' atau 'loading.jsx')

import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Alamat from './pages/Alamat';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const startTime = Date.now();

      try {
        setIsLoading(true);
        const response = await fetch('https://api.github.com/users/eltriputrarb-bit');
        
        // Cek apakah response sukses (status 200 OK)
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // Jika kena Rate Limit (403), pakai data default tanpa error
          console.warn(`GitHub API Info (${response.status}): Menggunakan data profil bawaan.`);
        }
      } catch (error) {
        console.error("Gagal terhubung ke server:", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const minLoadingTime = 3800; // Tepat 3.8 detik

        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      }
    };

    fetchGlobalData();
  }, []);

  return (
    <>
      {/* Overlay Loading NERV berjalan tepat 3.8 detik */}
      {isLoading && <Loading />}

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