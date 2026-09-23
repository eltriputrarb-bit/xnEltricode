import React, { useState, useEffect } from 'react';

export default function LoginPesan() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pesanList, setPesanList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fungsi Fetch Daftar Pesan
  const fetchPesan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/getpesan');
      const result = await res.json();
      if (res.ok && result.success) {
        setPesanList(result.data);
      } else {
        setErrorMsg('Gagal mengambil history pesan.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Kesalahan jaringan saat memuat pesan.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/loginpesan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoggedIn(true);
        fetchPesan(); // Panggil data pesan setelah login
      } else {
        setErrorMsg(data.message || 'Username atau password salah.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Terjadi kesalahan koneksi.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setPesanList([]);
  };

  // TAMPILAN DASHBOARD HISTORY PESAN (Jika sudah Login)
  if (isLoggedIn) {
    return (
      <div style={styles.container}>
        <div style={styles.dashboardCard}>
          <div style={styles.header}>
            <h2>History Pesan Masuk</h2>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>

          {loading ? (
            <p style={{ color: '#fff' }}>Memuat pesan...</p>
          ) : pesanList.length === 0 ? (
            <p style={{ color: '#ccc' }}>Belum ada pesan yang masuk.</p>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>No</th>
                    <th style={styles.th}>Tanggal</th>
                    <th style={styles.th}>Nama</th>
                    <th style={styles.th}>Pesan</th>
                  </tr>
                </thead>
                <tbody>
                  {pesanList.map((item, index) => (
                    <tr key={item._id || index}>
                      <td style={styles.td}>{index + 1}</td>
                      <td style={styles.td}>
                        {item.createdAt ? new Date(item.createdAt).toLocaleString('id-ID') : '-'}
                      </td>
                      <td style={styles.td}><strong>{item.nama}</strong></td>
                      <td style={styles.td}>{item.pesan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // TAMPILAN FORM LOGIN (Jika belum Login)
  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2 style={styles.title}>Login Admin Pesan</h2>

        {errorMsg && <p style={styles.error}>{errorMsg}</p>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Memproses...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '20px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '30px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '380px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  dashboardCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '24px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '800px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    color: '#fff',
  },
  title: { color: '#fff', textAlign: 'center', marginBottom: '8px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: '#ccc', fontSize: '0.85rem' },
  input: {
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(0, 0, 0, 0.2)',
    color: '#fff',
    outline: 'none',
  },
  button: {
    padding: '10px',
    marginTop: '10px',
    background: '#ff3333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  logoutBtn: {
    padding: '6px 14px',
    background: '#333',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: { color: '#ff3333', fontSize: '0.85rem', textAlign: 'center', margin: '0' },
  tableContainer: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', color: '#fff', marginTop: '10px' },
  th: { borderBottom: '2px solid rgba(255,255,255,0.2)', padding: '10px', textAlign: 'left' },
  td: { borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '10px' },
};