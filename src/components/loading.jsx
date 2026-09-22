import React, { useState, useEffect } from 'react';

export default function Loading({ progress = 0 }) {
  const [status, setStatus] = useState('CONNECTING TO SERVER...');

  useEffect(() => {
    // Teks status yang menahan jaringan agar terasa realistis:
    const t1 = setTimeout(() => setStatus('AUTHENTICATING NETWORK...'), 600);
    const t2 = setTimeout(() => setStatus('ESTABLISHING SECURE CONNECTION...'), 1200);
    const t3 = setTimeout(() => setStatus('DOWNLOADING PROFILE DATA...'), 2000);
    const t4 = setTimeout(() => setStatus('VERIFYING ENCRYPTION KEYS...'), 2800);
    const t5 = setTimeout(() => setStatus('FINALIZING SYNCHRONIZATION...'), 3500);
    const t6 = setTimeout(() => setStatus('CONNECTION ESTABLISHED!'), 4750); // Baru muncul pas 100%

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <img 
          src="/images/logo.png" 
          alt="NERV Logo" 
          className="nerv-logo-large" 
        />

        <div className="server-status-container">
          <p className="loading-text">{status}</p>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' // Animasi pergerakan bar terasa lebih berat & alami
              }}
            ></div>
          </div>
          <span className="progress-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
}