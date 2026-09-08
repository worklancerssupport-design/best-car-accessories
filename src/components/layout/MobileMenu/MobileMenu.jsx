import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { business } from '../../../config/business';
import './MobileMenu.css';

export default function MobileMenu({ isOpen, onClose, whatsappUrl }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      ref={menuRef}
    >
      <div className="mobile-menu-header">
        <Link to="/" className="mobile-menu-logo" onClick={onClose}>
          <div className="mobile-menu-logo-img-wrap">
            <img 
              src="/images/logo.png" 
              alt="Best Car Accessories" 
              className="mobile-menu-logo-img"
              width="40"
              height="40"
            />
          </div>
          <div className="mobile-menu-logo-text">
            <span className="mobile-menu-logo-badge">3D SHOWROOM</span>
            <span className="mobile-menu-logo-title">BEST CAR ACCESSORIES</span>
            <span className="mobile-menu-logo-sub">NMS ROAD · CHENNAI</span>
          </div>
        </Link>
        <button 
          className="mobile-menu-close" 
          onClick={onClose} 
          aria-label="Close mobile navigation menu"
        >
          <X size={26} />
        </button>
      </div>

      <nav className="mobile-menu-nav">
        <ul>
          <li>
            <Link to="/" onClick={onClose}>
              <span>Home</span>
              <span className="mobile-menu-index">01</span>
            </Link>
          </li>
          <li>
            <Link to="/exterior-car-accessories-chennai" onClick={onClose}>
              <span>Exterior Accessories</span>
              <span className="mobile-menu-index">02</span>
            </Link>
          </li>
          <li>
            <Link to="/interior-car-accessories-chennai" onClick={onClose}>
              <span>Interior Customization</span>
              <span className="mobile-menu-index">03</span>
            </Link>
          </li>
          <li>
            <Link to="/gallery" onClick={onClose}>
              <span>3D Gallery</span>
              <span className="mobile-menu-index">04</span>
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={onClose}>
              <span>Heritage & Team</span>
              <span className="mobile-menu-index">05</span>
            </Link>
          </li>
          <li>
            <Link to="/franchise" onClick={onClose}>
              <span>Franchise</span>
              <span className="mobile-menu-index">06</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={onClose}>
              <span>Contact & Fitment</span>
              <span className="mobile-menu-index">07</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mobile-menu-footer">
        <div className="mobile-menu-actions">
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-whatsapp" 
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={onClose}
          >
            <MessageCircle size={18} />
            <span>WhatsApp Us</span>
          </a>
          <Link 
            to="/contact" 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }} 
            onClick={onClose}
          >
            <span>Book Fitment Slot</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mobile-menu-contact-info">
          <p className="mobile-menu-location">NMS Road, Chennai, Tamil Nadu</p>
          <p className="mobile-menu-meta">15+ Years Experience · 1000+ Cars Upgraded</p>
        </div>
      </div>
    </div>
  );
}
