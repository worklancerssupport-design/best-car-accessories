import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MessageCircle, Instagram } from 'lucide-react';
import business from '../../../data/business.json';
import MobileMenu from '../MobileMenu/MobileMenu';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const whatsappMessage = encodeURIComponent("Hello Best Car Accessories, I would like to enquire about your car accessories and upgrades.");
  const whatsappUrl = business.whatsapp ? `https://wa.me/${business.whatsapp}?text=${whatsappMessage}` : '#';
  const instagramUrl = business.instagram || business.social?.instagram || '#';

  return (
    <>
      <header className={`header-wrapper ${isScrolled ? 'header-wrapper--scrolled' : ''}`}>
        <div className="header-glass-bar">
          <div className="header__container">

            <Link to="/" className="header__logo" aria-label="Best Car Accessories Home">
              <img
                src="/logo.png"
                alt="Best Car Accessories"
                className="header__logo-img"
                width="180"
                height="40"
              />
              <span className="header__brand-name">
                <span className="header__brand-name-top">Best Car</span>
                <span className="header__brand-name-bottom">Accessories</span>
              </span>
            </Link>

            <nav className="header__nav" aria-label="Main Navigation">
              <ul className="header__nav-list">
                <li>
                  <Link
                    to="/"
                    className={`header__nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/exterior-car-accessories-chennai"
                    className={`header__nav-link ${location.pathname.includes('/exterior') ? 'active' : ''}`}
                  >
                    Exterior
                  </Link>
                </li>

                <li>
                  <Link
                    to="/interior-car-accessories-chennai"
                    className={`header__nav-link ${location.pathname.includes('/interior') ? 'active' : ''}`}
                  >
                    Interior
                  </Link>
                </li>

                <li>
                  <Link
                    to="/gallery"
                    className={`header__nav-link ${location.pathname.startsWith('/gallery') ? 'active' : ''}`}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`header__nav-link ${location.pathname.startsWith('/about') ? 'active' : ''}`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/franchise"
                    className={`header__nav-link ${location.pathname.startsWith('/franchise') ? 'active' : ''}`}
                  >
                    Franchise
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={`header__nav-link ${location.pathname.startsWith('/contact') ? 'active' : ''}`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="header__actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="header__icon-btn header__icon-btn--wa"
                aria-label="Contact Best Car Accessories on WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              {instagramUrl !== '#' && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header__icon-btn header__icon-btn--ig"
                  aria-label="Best Car Accessories on Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              <Link to="/contact" className="header__cta-btn">
                <span>Get Quote</span>
              </Link>

              <button
                type="button"
                className="header__icon-btn header__mobile-toggle"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        whatsappUrl={whatsappUrl}
        instagramUrl={instagramUrl}
      />
    </>
  );
}
