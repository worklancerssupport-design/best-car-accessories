import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import galleryData from '../data/gallery.json';
import './GalleryPage.css';
import { X, ZoomIn } from 'lucide-react';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeCategory === 'All' ? galleryData.items : galleryData.items.filter(i => i.category === activeCategory);

  const openLightbox = useCallback((item) => setLightbox(item), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Gallery' }];

  return (
    <>
      <Helmet>
        <title>Car Accessories Gallery | Best Car Accessories Chennai</title>
        <meta name="description" content="View our gallery of car accessory installations — seat covers, ambient lights, infotainment systems, fog lights, cameras, speakers and more at Best Car Accessories, NMS Road, Chennai." />
        <link rel="canonical" href={`${business.siteUrl}/gallery`} />
        <meta property="og:title" content="Gallery | Best Car Accessories Chennai" />
        <meta property="og:description" content="Car accessories and customization gallery — Best Car Accessories, NMS Road, Chennai." />
      </Helmet>

      <div className="gallery-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      {/* Hero */}
      <section className="gallery-hero section--dark">
        <div className="gallery-hero__overlay" />
        <div className="container gallery-hero__content">
          <span className="section-label">Our Work</span>
          <h1 className="gallery-hero__title">Accessories Gallery</h1>
          <p className="gallery-hero__subtitle">
            Browse our installation work — exterior accessories, interior customization, lighting, infotainment,
            audio upgrades, cameras, and more.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="section section--white gallery-filter-section">
        <div className="container">
          <div className="gallery-filters">
            {galleryData.categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`gallery-filter-btn ${activeCategory === cat ? 'gallery-filter-btn--active' : ''}`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section section--light gallery-grid-section">
        <div className="container">
          <div className="gallery-grid">
            {filtered.map(item => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => openLightbox(item)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && openLightbox(item)}
                aria-label={`View ${item.alt}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="gallery-item__img"
                  onError={e => { e.target.style.background = '#1a1a1a'; e.target.style.opacity = '0.3'; }}
                />
                <div className="gallery-item__overlay">
                  <ZoomIn size={24} />
                  <span className="gallery-item__cat">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="gallery-empty">
              <p>No items in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Image viewer">
          <button className="gallery-lightbox__close" onClick={closeLightbox} aria-label="Close image viewer">
            <X size={24} />
          </button>
          <div className="gallery-lightbox__inner" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className="gallery-lightbox__img" />
            <p className="gallery-lightbox__caption">{lightbox.alt}</p>
          </div>
        </div>
      )}

      {/* Note */}
      <section className="section section--white gallery-note">
        <div className="container">
          <p className="gallery-note__text">
            <strong>Note:</strong> Gallery images are placeholder images representing our accessory categories.
            Replace with actual installation photographs from the business for a live website.
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Follow us on Instagram{' '}
            <a href={business.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              {business.instagramHandle}
            </a>
            {' '}for latest work.
          </p>
        </div>
      </section>
    </>
  );
}
