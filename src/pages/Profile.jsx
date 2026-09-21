import React from 'react';
import Lightbox from '../components/Lightbox';

const educationList = [
  { logo: '/images/logo/smk-placeholder.png', label: 'SMK XXX XXX' },
  { logo: '/images/logo/smp.jpg', label: 'SLB/SMP Katolik Rajawali' },
  { logo: '/images/logo/sd.png', label: 'SLB/SD Katolik Rajawali' },
];

export default function Profile() {
  return (
    <main className="profile-main">
      <div className="profile-container">
        
        {/* Kolom Kiri */}
        <div className="profile-left">
          <div className="profile-logo">
            <img src="/images/profile.jpg" alt="Logo" />
          </div>
          
          <div className="profile-name">
            ELTRI PUTRA ROMBEBUA
          </div>
          
          <div className="profile-education-title">
            <svg className="education-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
            </svg>
            <span>Riwayat Pendidikan</span>
          </div>

          <div className="profile-education">
            <ul>
              {educationList.map((item, index) => (
                <li key={index}>
                  <div className="logo-cell">
                    <img className="school-logo" src={item.logo} alt={item.label} />
                  </div>
                  <div className="text-cell">{item.label}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="profile-right">
          {/* Jendela Kode */}
          <div className="code-window">
            <div className="code-window-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="window-badge">
                <img src="/images/favicon.svg" alt="Badge" />
              </div>
            </div>
            <div className="code-window-body">
              <pre>
                <code>
                  <span className="code-keyword">const</span> profile = {'{\n'}
                  {'  '}name: <span className="code-string">"Eltri Putra Rombebua"</span>,\n
                  {'  '}role: <span className="code-string">"Developer"</span>\n
                  {'}'};
                </code>
              </pre>
            </div>
          </div>

          {/* Kotak Foto 1 (Dapat diklik untuk Fullscreen) */}
          <Lightbox type="image" src="/images/ITS.jpg" alt="Foto 1">
            <div className="photo-card">
              <img src="/images/ITS.jpg" alt="Foto 1" />
            </div>
          </Lightbox>

        </div>

      </div>
    </main>
  );
}