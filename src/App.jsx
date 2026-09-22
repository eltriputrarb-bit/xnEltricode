import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/loading.jsx'; // Sesuaikan casing ('loading' atau 'Loading') jika perlu

import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Alamat from './pages/Alamat';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        setIsLoading(true);
        // Mengambil data server asli dari GitHub API
        const response = await fetch('https://api.github.com/users/eltriputrarb-bit ');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Gagal terhubung ke server:", error);
      } finally {
        // Loading dimatikan HANYA setelah server merespons
        setIsLoading(false);
      }
    };

    fetchGlobalData();
  }, []);

  return (
    <>
      {/* Tampilkan overlay NERV jika masih loading data dari server */}
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