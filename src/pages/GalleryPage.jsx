import { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import galleryData from '../data/gallery.json';
import './GalleryPage.css';
import { X, ZoomIn, Camera, ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () => (activeCategory === 'All'
      ? galleryData.items
      : galleryData.items.filter((i) => i.category === activeCategory)),
    [activeCategory]
  );

  const counts = useMemo(() => {
    const map = { All: galleryData.items.length };
    galleryData.items.forEach((i) => {
      map[i.category] = (map[i.category] || 0) + 1;
    });
    return map;
  }, []);

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

      <section className="gallery-hero section--dark">
        <div className="gallery-hero__overlay" />
        <div className="container gallery-hero__content">
          <span className="section-label">Our Work</span>
          <h1 className="gallery-hero__title">
            Accessories <span className="gallery-hero__title-accent">Gallery</span>
          </h1>
          <p className="gallery-hero__subtitle">
            Browse our installation work — exterior accessories, interior customization,
            lighting, infotainment, audio upgrades, cameras, and more.
          </p>

          <div className="gallery-stats">
            <div className="gallery-stat">
              <span className="gallery-stat__value">{galleryData.items.length}+</span>
              <span className="gallery-stat__label">Installations</span>
            </div>
            <div className="gallery-stat">
              <span className="gallery-stat__value">{galleryData.categories.length - 1}</span>
              <span className="gallery-stat__label">Categories</span>
            </div>
            <div className="gallery-stat">
              <span className="gallery-stat__value">15+</span>
              <span className="gallery-stat__label">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-filter-section">
        <div className="container">
          <div className="gallery-filters" role="tablist" aria-label="Gallery categories">
            {galleryData.categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`gallery-filter-btn ${activeCategory === cat ? 'gallery-filter-btn--active' : ''}`}
              >
                {cat}
                <span className="gallery-filter-count">{counts[cat] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-grid-section">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="gallery-grid">
              {filtered.map((item, idx) => (
                <div
                  key={item.id}
                  className={`gallery-item ${item.featured ? 'gallery-item--featured' : ''} ${idx % 5 === 3 ? 'gallery-item--tall' : ''}`}
                  onClick={() => openLightbox(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(item)}
                  aria-label={`View ${item.alt}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="gallery-item__img"
                    onError={(e) => {
                      e.currentTarget.style.background = 'var(--bg-elevated)';
                      e.currentTarget.style.opacity = '0.3';
                    }}
                  />
                  <div className="gallery-item__overlay">
                    <span className="gallery-item__zoom" aria-hidden="true">
                      <ZoomIn size={18} />
                    </span>
                    {item.title && (
                      <h3 className="gallery-item__title">{item.title}</h3>
                    )}
                    {item.car && (
                      <span className="gallery-item__car">{item.car}</span>
                    )}
                    <span className="gallery-item__cat">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <span className="gallery-empty__icon" aria-hidden="true">
                <ImageIcon size={28} />
              </span>
              <p>No items in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close image viewer"
          >
            <X size={22} />
          </button>
          <div className="gallery-lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="gallery-lightbox__img"
            />
            <p className="gallery-lightbox__caption">
              {lightbox.title || lightbox.alt}
              {lightbox.car && <span> · {lightbox.car}</span>}
            </p>
          </div>
        </div>
      )}

      <section className="gallery-note">
        <div className="container gallery-note__inner">
          <p className="gallery-note__text">
            <strong>Note:</strong> Gallery images are placeholder images representing our accessory
            categories. Replace with actual installation photographs from the business for a live website.
          </p>
          <p className="gallery-note__meta">
            <Camera size={14} aria-hidden="true" />
            Follow us on Instagram{' '}
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-note__link"
            >
              {business.instagramHandle}
            </a>{' '}for latest work.
          </p>
        </div>
      </section>
    </>
  );
}
