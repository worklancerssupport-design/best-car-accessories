import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import SectionDivider from '../../ui/SectionDivider/SectionDivider';
import './Gallery.css';

const categories = ['All', 'Exterior', 'Interior', 'Lighting', 'Infotainment', 'Audio', 'Cameras', 'Seat Covers'];

const galleryProjects = [
  { 
    id: 1, 
    category: 'Lighting', 
    title: 'Dual LED Projector Fog Lamps', 
    car: 'Mahindra XUV700',
    img: '/images/exterior/fog-light-projector-chennai.webp',
    featured: true
  },
  { 
    id: 2, 
    category: 'Interior', 
    title: '18-Zone App Controlled Ambient Lighting', 
    car: 'Hyundai Creta',
    img: '/images/interior/car-ambient-light-chennai.webp',
    featured: false
  },
  { 
    id: 3, 
    category: 'Seat Covers', 
    title: 'Custom Perforated Nappa Leather Seats', 
    car: 'Toyota Fortuner',
    img: '/images/interior/premium-car-seat-cover-chennai.webp',
    featured: false
  },
  { 
    id: 4, 
    category: 'Exterior', 
    title: 'Aero Spoiler & High-Power Matrix Headlamps', 
    car: 'Tata Safari',
    img: '/images/exterior/led-headlight-upgrade-chennai.webp',
    featured: true
  },
  { 
    id: 5, 
    category: 'Infotainment', 
    title: '10.25" IPS Android Touchscreen Infotainment', 
    car: 'Kia Seltos',
    img: '/images/interior/infotainment-systems-chennai.webp',
    featured: false
  },
  { 
    id: 6, 
    category: 'Cameras', 
    title: '360° Surround View Optical Calibration', 
    car: 'Maruti Grand Vitara',
    img: '/images/interior/360-car-camera-chennai.webp',
    featured: false
  },
  { 
    id: 7, 
    category: 'Audio', 
    title: 'Hi-Res Component Speakers & Subwoofer', 
    car: 'Honda City',
    img: '/images/interior/woofers-amplifiers-chennai.webp',
    featured: false
  },
  { 
    id: 8, 
    category: 'Exterior', 
    title: 'Aerodynamic Roof Rails & Shark Fin', 
    car: 'Tata Nexon',
    img: '/images/exterior/roof-rails-sharkfin-antenna-chennai.webp',
    featured: false
  },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeItem, setActiveItem] = useState(null);

  const filtered = activeTab === 'All' 
    ? galleryProjects 
    : galleryProjects.filter(p => p.category === activeTab);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="gallery-section" id="gallery-preview">
      <SectionDivider num="08" label="FEATURED WORK" />

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

        {/* Filters */}
        <div className="gallery-filter-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`gallery-pill ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Portfolio Grid */}
        <div className="gallery-asym-grid">
          {filtered.map(item => (
            <div 
              key={item.id} 
              className={`gallery-card card-3d ${item.featured ? 'gallery-card--featured' : ''}`}
              onClick={() => setActiveItem(item)}
              data-cursor="VIEW"
            >
              <img 
                src={item.img} 
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
            <span>Explore Full 50+ Build Gallery</span>
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
            <img src={activeItem.img} alt={activeItem.title} className="gallery-lightbox__img" />
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
