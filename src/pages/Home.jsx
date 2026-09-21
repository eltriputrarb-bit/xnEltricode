import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <main>
        <div className="domino page-anim" style={{ animationDelay: '0.05s' }}>
          <h1>Eltri Putra Rombebua</h1>
          <p>
            Mempelajari Teknik Komputer dan teknologi untuk mengembangkan keterampilan di bidang komputer, perangkat keras, jaringan, dan teknologi informasi.
          </p>
        </div>
      </main>

      <section className="about-section">
        <div className="about-photos page-anim" style={{ animationDelay: '0.1s' }}>
          <div className="about-photo-back">
            <img src="/images/html.jpg" alt="html" />
          </div>
          <div className="about-photo-front">
            <img src="/images/javascript.jpg" alt="js" />
          </div>
        </div>

        <div className="about-text page-anim" style={{ animationDelay: '0.2s' }}>
          <h2>ELTRI PUTRA ROMBEBUA</h2>
          <p>
            Mempelajari Teknik Komputer dan Jaringan (TKJ) serta mengembangkan keterampilan di bidang Web Development, seperti HTML, CSS, dan JavaScript
          </p>
          <p>
            Belajar TKJ dan Web Development untuk mengembangkan kemampuan di bidang komputer, jaringan, dan pembuatan website 💻
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-col footer-brand">
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2c-2.7 0-3.05.01-4.12.06-1.07.05-1.8.22-2.43.47-.66.26-1.22.6-1.77 1.16-.56.55-.9 1.11-1.16 1.77-.25.63-.42 1.36-.47 2.43C2 8.95 2 9.3 2 12s.01 3.05.06 4.12c.05 1.07.22 1.8.47 2.43.26.66.6 1.22 1.16 1.77.55.56 1.11.9 1.77 1.16.63.25 1.36.42 2.43.47C8.95 22 9.3 22 12 22s3.05-.01 4.12-.06c1.07-.05 1.8-.22 2.43-.47.66-.26 1.22-.6 1.77-1.16.56-.55.9-1.11 1.16-1.77.25-.63.42-1.36.47-2.43.05-1.07.06-1.42.06-4.12s-.01-3.05-.06-4.12c-.05-1.07-.22-1.8-.47-2.43a4.9 4.9 0 0 0-1.16-1.77 4.9 4.9 0 0 0-1.77-1.16c-.63-.25-1.36-.42-2.43-.47C15.05 2.01 14.7 2 12 2Zm0 1.8c2.65 0 2.96.01 4.01.06.97.04 1.5.2 1.85.34.46.18.79.4 1.14.75.35.35.57.68.75 1.14.14.35.3.88.34 1.85.05 1.05.06 1.36.06 4.01s-.01 2.96-.06 4.01c-.04.97-.2 1.5-.34 1.85-.18.46-.4.79-.75 1.14-.35.35-.68.57-1.14.75-.35.14-.88.3-1.85.34-1.05.05-1.36.06-4.01.06s-2.96-.01-4.01-.06c-.97-.04-1.5-.2-1.85-.34a3.1 3.1 0 0 1-1.14-.75 3.1 3.1 0 0 1-.75-1.14c-.14-.35-.3-.88-.34-1.85C3.81 14.96 3.8 14.65 3.8 12s.01-2.96.06-4.01c.04-.97.2-1.5.34-1.85.18-.46.4-.79.75-1.14.35-.35.68-.57 1.14-.75.35-.14.88-.3 1.85-.34C9.04 3.81 9.35 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3Zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7Zm5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.78-2.05 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z"/></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24"><path d="M18.9 2H22l-7.3 8.34L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.8-8.92L1 2h6.9l4.8 6.36L18.9 2Zm-1.2 18h1.9L7.4 4h-2L17.7 20Z"/></svg>
            </a>
          </div>

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