import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import SectionDivider from '../../ui/SectionDivider/SectionDivider';
import galleryData from '../../../data/gallery.json';
import './Gallery.css';

export default function Gallery({ compact = false }) {
  const [activeTab, setActiveTab] = useState('All');
  const [activeItem, setActiveItem] = useState(null);

  const filtered = activeTab === 'All' 
    ? galleryData.items 
    : galleryData.items.filter(p => p.category === activeTab);

  const displayItems = compact ? galleryData.items.filter(p => p.featured) : filtered;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="gallery-section" id="gallery-preview">
      {!compact && <SectionDivider num="08" label="FEATURED WORK" />}

      <div className="container">
        
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-label">SHOWROOM BUILDS</span>
          <h2 className="section-title text-white">Recent Customer Upgrades</h2>
          <div className="divider" style={{ margin: '0.5rem auto 1rem' }} />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A glimpse into actual installations completed at our Royapettah customization studio in Chennai.
          </p>
        </div>

        {/* Filters (full mode only) */}
        {!compact && (
          <div className="gallery-filter-bar">
            {galleryData.categories.map(cat => (
              <button
                key={cat}
                className={`gallery-pill ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Asymmetric Portfolio Grid */}
        <div className={`gallery-asym-grid ${compact ? 'gallery-asym-grid--compact' : ''}`}>
          {displayItems.map(item => (
            <div 
              key={item.id} 
              className={`gallery-card card-3d ${item.featured && !compact ? 'gallery-card--featured' : ''}`}
              onClick={() => setActiveItem(item)}
              data-cursor="VIEW"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="gallery-card__img" 
                loading="lazy" 
              />
              <div className="gallery-card__overlay">
                <div className="gallery-card__meta">
                  <span className="gallery-card__cat">{item.category}</span>
                  <span className="gallery-card__car">{item.car}</span>
                </div>
                <h3 className="gallery-card__title">{item.title}</h3>
                <div className="gallery-card__zoom">
                  <ZoomIn size={15} />
                  <span>Inspect Build</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="gallery-footer-cta">
          <Link to="/gallery" className="btn btn-primary">
            <span>{compact ? 'View Full Gallery' : 'Explore Full 50+ Build Gallery'}</span>
            <ArrowRight size={16} className="btn-arrow" />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="gallery-lightbox" onClick={() => setActiveItem(null)} role="dialog" aria-modal="true">
          <button className="gallery-lightbox__close" onClick={() => setActiveItem(null)} aria-label="Close modal">
            <X size={26} />
          </button>
          <div className="gallery-lightbox__box" onClick={e => e.stopPropagation()}>
            <img src={activeItem.src} alt={activeItem.title} className="gallery-lightbox__img" />
            <div className="gallery-lightbox__info">
              <span className="tech-tag tech-tag--accent">{activeItem.category}</span>
              <h4>{activeItem.title}</h4>
              <p>Vehicle: <strong>{activeItem.car}</strong> · Upgraded by Best Car Accessories</p>
              <Link to="/contact" className="btn btn-primary btn-sm" onClick={() => setActiveItem(null)}>
                Enquire for This Setup
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
