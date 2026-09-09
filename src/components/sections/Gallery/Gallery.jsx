import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import galleryData from '../../../data/gallery.json';
import './Gallery.css';

export default function Gallery({ compact = false }) {
  const [activeTab, setActiveTab] = useState('All');
  const [activeItem, setActiveItem] = useState(null);

  const filtered = activeTab === 'All'
    ? galleryData.items
    : galleryData.items.filter(p => p.category === activeTab);

  const displayItems = compact ? galleryData.items.slice(0, 4) : filtered;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="gallery-section" id="gallery-preview" aria-label="Featured builds">
      <div className="container">
        <header className="gallery-section__header">
          <span className="section-label">Gallery</span>
          <h2 className="gallery-section__title">
            Our <span className="gallery-section__title-accent">Work</span>
          </h2>
          <p className="gallery-section__subtitle">
            A glimpse into actual installations completed at our Royapettah customization studio in Chennai.
          </p>
        </header>

        {!compact && (
          <div className="gallery-filter-bar" role="tablist" aria-label="Filter by category">
            {galleryData.categories.map(cat => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeTab === cat}
                className={`gallery-pill ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className={`gallery-grid accessories-grid ${compact ? 'gallery-grid--compact' : ''}`}>
          {displayItems.map(item => (
            <article
              key={item.id}
              className="gallery-card svc-card"
              onClick={() => setActiveItem(item)}
              tabIndex={0}
              role="button"
              aria-label={`Inspect ${item.title || 'gallery item'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveItem(item);
                }
              }}
            >
              <img
                src={item.src}
                alt={item.alt || item.title || 'Gallery image'}
                className="gallery-card__img svc-card__img"
                loading="lazy"
              />
              <div className="svc-card__overlay" aria-hidden="true" />
              <div className="svc-card__bottom">
                <h3 className="gallery-card__title svc-card__title">
                  {item.title || item.category}
                </h3>
              </div>
            </article>
          ))}
        </div>

        <div className="gallery-footer-cta">
          <Link to="/gallery" className="gallery-section__cta">
            <span>{compact ? 'View Full Gallery' : 'Explore Full 50+ Build Gallery'}</span>
            <ArrowRight size={16} className="gallery-section__cta-arrow" />
          </Link>
        </div>
      </div>

      {activeItem && (
        <div
          className="gallery-lightbox"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Build details: ${activeItem.title || 'Gallery item'}`}
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={() => setActiveItem(null)}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <div className="gallery-lightbox__box" onClick={e => e.stopPropagation()}>
            <img src={activeItem.src} alt={activeItem.alt || activeItem.title} className="gallery-lightbox__img" />
            <div className="gallery-lightbox__info">
              <span className="gallery-lightbox__tag">{activeItem.category}</span>
              <h3 className="gallery-lightbox__title">{activeItem.title || 'Custom Upgrade'}</h3>
              <p className="gallery-lightbox__desc">
                {activeItem.car && (<>Vehicle: <strong>{activeItem.car}</strong> · </>)}
                Upgraded by Best Car Accessories.
              </p>
              <Link to="/contact" className="gallery-lightbox__enquire" onClick={() => setActiveItem(null)}>
                <span>Enquire for This Setup</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
