import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPesan() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

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
        // Simpan status login di localStorage jika perlu
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login Berhasil!');
        // Arahkan ke halaman utama/dashboard pesan
        navigate('/');
      } else {
        setErrorMsg(data.message || 'Username atau password salah.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setErrorMsg('Terjadi kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

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

// Inline Style sederhana (bisa kamu atur lagi di style.css)
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
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '8px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    color: '#ccc',
    fontSize: '0.85rem',
  },
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
  error: {
    color: '#ff3333',
    fontSize: '0.85rem',
    textAlign: 'center',
    margin: '0',
  },
};