import React, { useState, useEffect } from 'react';

export default function Loading() {
  const [status, setStatus] = useState('CONNECTING TO SERVER...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulasi visual persentase berjalan
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 60);

    // Teks indikator ala terminal NERV
    const t1 = setTimeout(() => setStatus('AUTHENTICATING NETWORK...'), 200);
    const t2 = setTimeout(() => setStatus('ESTABLISHING SECURE CONNECTION...'), 400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        {/* Logo NERV Besar */}
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
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
}