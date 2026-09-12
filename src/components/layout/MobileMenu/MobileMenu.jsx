import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, MessageCircle, Instagram } from 'lucide-react';
import './MobileMenu.css';

export default function MobileMenu({ isOpen, onClose, whatsappUrl, instagramUrl }) {
  const menuRef = useRef(null);
  const location = useLocation();

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

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { name: 'Home', path: '/', index: '01' },
    { name: 'Exterior', path: '/exterior-car-accessories-chennai', index: '02' },
    { name: 'Interior', path: '/interior-car-accessories-chennai', index: '03' },
    { name: 'Gallery', path: '/gallery', index: '04' },
    { name: 'About', path: '/about', index: '05' },
    { name: 'Contact', path: '/contact', index: '06' },
  ];

  return (
    <div
      className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      aria-hidden={!isOpen}
      ref={menuRef}
    >
      <div className="mobile-menu-header">
        <Link to="/" className="mobile-menu-logo" onClick={onClose}>
          <img
            src="/logo.png"
            alt="Best Car Accessories NMS"
            className="mobile-menu-logo-img"
          />
        </Link>
        <button
          className="mobile-menu-close"
          onClick={onClose}
          aria-label="Close mobile navigation menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="mobile-menu-nav" aria-label="Mobile Navigation">
        <span className="mobile-menu-eyebrow">Navigate</span>
        <ul>
          {navItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={isActive(item.path) ? 'active' : ''}
                onClick={onClose}
              >
                <span>{item.name}</span>
                <span className="mobile-menu-index">{item.index}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mobile-menu-footer">
        <span className="mobile-menu-eyebrow">Reach out</span>
        <div className="mobile-menu-actions">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu-icon-btn"
              aria-label="Contact Best Car Accessories NMS on WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          )}
          {instagramUrl && instagramUrl !== '#' && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu-icon-btn"
              aria-label="Best Car Accessories NMS on Instagram"
            >
              <Instagram size={18} />
            </a>
          )}
          <Link to="/contact" className="mobile-menu-cta" onClick={onClose}>
            <span>Get Quote</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
