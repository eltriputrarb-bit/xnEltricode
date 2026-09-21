import Lightbox from '../components/Lightbox';

const galleryItems = [
  { type: 'image', src: '/images/foto1.jpg', caption: 'Kota makassar' },
  { type: 'image', src: '/images/foto2.jpg', caption: 'itu saya kecil lama' },
  { type: 'image', src: '/images/sad.jpg', caption: 'bantu aku' },
];

export default function About() {
  return (
    <main className="gallery-main">
      <h1 className="gallery-title page-anim" style={{ animationDelay: '0.05s' }}>
        Gallery
      </h1>

      <div className="gallery-grid">
        {galleryItems.map((item, idx) => (
          <div className="gallery-item" key={idx}>
            <Lightbox type={item.type} src={item.src} alt={item.caption} className="media-wrap">
              {item.type === 'image' ? (
                <img src={item.src} alt={item.caption} />
              ) : (
                <video src={item.src} autoPlay muted loop playsInline />
              )}
            </Lightbox>
            <div className="gallery-caption">{item.caption}</div>
          </div>
        ))}
      </div>
    </main>
  );
}