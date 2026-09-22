import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/loading.jsx';

export default function Home({ userData }) {
  const preventMediaAction = (e) => e.preventDefault();

  return (
    <>
      <main>
        <div className="domino page-anim" style={{ animationDelay: '0.05s' }}>
          <h1>{userData?.name || 'Eltri Putra Rombebua'}</h1>
          <p>
            {userData?.bio || 'Mempelajari Teknik Komputer dan teknologi untuk mengembangkan keterampilan di bidang komputer, perangkat keras, jaringan, dan teknologi informasi.'}
          </p>
        </div>
      </main>

      <section className="about-section">
        <div className="about-photos page-anim" style={{ animationDelay: '0.1s' }}>
          <div className="about-photo-back">
            <img 
              src="/images/html.jpg" 
              alt="html" 
              onContextMenu={preventMediaAction}
              onDragStart={preventMediaAction}
            />
          </div>
          <div className="about-photo-front">
            <img 
              src="/images/javascript.jpg" 
              alt="js" 
              onContextMenu={preventMediaAction}
              onDragStart={preventMediaAction}
            />
          </div>
        </div>

        <div className="about-text page-anim" style={{ animationDelay: '0.2s' }}>
          <h2>ELTRI PUTRA ROMBEBUA</h2>
          <p>
            Mempelajari Teknik Komputer dan Jaringan (TKJ) serta mengembangkan keterampilan di bidang Web Development, seperti HTML, CSS, dan JavaScript.
          </p>
          <p>
            Belajar TKJ dan Web Development untuk mengembangkan kemampuan di bidang komputer, jaringan, dan pembuatan website 💻
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-col footer-brand">
          <p className="footer-address">
            JI.XXXXXXXX II NO.30<br />
            Makassar, Sulawesi Selatan
          </p>
          <p className="footer-contact">eltriputrarb@email.com</p>
          <p className="footer-contact">(+62) 853-9740-0903</p>
        </div>

        <div className="footer-col">
          <h4>MENU</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/alamat">Alamat</Link>
        </div>
      </footer>
    </>
  );
}