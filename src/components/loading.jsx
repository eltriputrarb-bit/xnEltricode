import React, { useState, useEffect } from 'react';

export default function Loading({ progress = 0 }) {
  const [status, setStatus] = useState('CONNECTING TO SERVER...');

  useEffect(() => {
    // Teks menyesuaikan progress jaringan
    const t1 = setTimeout(() => setStatus('AUTHENTICATING NETWORK...'), 500);
    const t2 = setTimeout(() => setStatus('ESTABLISHING SECURE CONNECTION...'), 1000);
    const t3 = setTimeout(() => setStatus('FETCHING USER PROFILE DATA...'), 1800);
    const t4 = setTimeout(() => setStatus('SYNCHRONIZING MAGI SYSTEM...'), 2700);
    const t5 = setTimeout(() => setStatus('CONNECTION ESTABLISHED'), 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        {/* Logo NERV */}
        <img 
          src="/images/logo.png" 
          alt="NERV Logo" 
          className="nerv-logo-large" 
        />

        {/* Indikator Status & Progress Bar */}
        <div className="server-status-container">
          <p className="loading-text">{status}</p>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.4s ease-out' // Bikin gerakan bar-nya halus
              }}
            ></div>
          </div>
          <span className="progress-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
}