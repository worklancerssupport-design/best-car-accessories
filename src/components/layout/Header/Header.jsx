import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import business from '../../../data/business.json';
import exteriorProducts from '../../../data/products/exterior.json';
import interiorProducts from '../../../data/products/interior.json';
import MobileMenu from '../MobileMenu/MobileMenu';
import './Header.css';

const exteriorNavItems = exteriorProducts.items
  .filter(p => p.showInNav)
  .map(p => ({ name: p.navName || p.name, slug: p.slug }));

const interiorNavItems = interiorProducts.items
  .filter(p => p.showInNav)
  .map(p => ({ name: p.navName || p.name, slug: p.slug }));

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const whatsappMessage = encodeURIComponent("Hello Best Car Accessories, I would like to enquire about your car accessories and upgrades.");
  const whatsappUrl = business.whatsapp ? `https://wa.me/${business.whatsapp}?text=${whatsappMessage}` : '#';

  const isAccessoriesActive = location.pathname.includes('/exterior') || location.pathname.includes('/interior');

  return (
    <>
      <header className={`header-wrapper ${isScrolled ? 'header-wrapper--scrolled' : ''}`}>
        <div className="header-glass-bar">
          <div className="header__container">
            
            {/* Brand Logo */}
            <Link to="/" className="header__logo" aria-label="Best Car Accessories Home">
              <div className="header__logo-img-wrap">
                <img 
                  src="/images/logo.png" 
                  alt="Best Car Accessories" 
                  className="header__logo-img"
                  width="42"
                  height="42"
                />
              </div>
              <div className="header__logo-text">
                <span className="header__logo-title">BEST CAR ACCESSORIES</span>
                <span className="header__logo-tagline">
                  <span className="header__logo-dot" /> Premium Upgrades &amp; Customization · Chennai
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (Strict rule: Reviews removed entirely) */}
            <nav className="header__nav" aria-label="Main Navigation">
              <ul className="header__nav-list">
                <li>
                  <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                    Home
                  </Link>
                </li>

                {/* Accessories with Mega Dropdown */}
                <li 
                  className={`header__nav-item--dropdown ${dropdownOpen ? 'is-open' : ''}`}
                  ref={dropdownRef}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="header__dropdown-trigger">
                    <Link
                      to="/exterior-car-accessories-chennai"
                      className={`header__nav-link ${isAccessoriesActive ? 'active' : ''}`}
                    >
                      Accessories
                    </Link>
                    <button
                      className="header__chevron-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen(prev => !prev);
                      }}
                      aria-label="Toggle accessories mega menu"
                      aria-expanded={dropdownOpen}
                    >
                      <ChevronDown size={14} className={`header__chevron ${dropdownOpen ? 'rotate' : ''}`} />
                    </button>
                  </div>

                  {dropdownOpen && (
                    <div className="mega-menu" role="menu">
                      <div className="mega-menu__inner">
                        
                        {/* Exterior Column */}
                        <div className="mega-menu__col">
                          <div className="mega-menu__header">
                            <span className="mega-menu__tag">01 // EXTERIOR AERODYNAMICS</span>
                            <Link to="/exterior-car-accessories-chennai" className="mega-menu__cat-title" onClick={() => setDropdownOpen(false)}>
                              Exterior Accessories
                            </Link>
                          </div>
                          <ul className="mega-menu__list">
                            {exteriorNavItems.map(item => (
                              <li key={item.slug}>
                                <Link 
                                  to={`/exterior-car-accessories-chennai/${item.slug}`}
                                  className="mega-menu__item-link"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link 
                            to="/exterior-car-accessories-chennai" 
                            className="mega-menu__all-link"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span>EXPLORE ALL EXTERIOR</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>

                        {/* Interior Column */}
                        <div className="mega-menu__col">
                          <div className="mega-menu__header">
                            <span className="mega-menu__tag">02 // COCKPIT & CABIN</span>
                            <Link to="/interior-car-accessories-chennai" className="mega-menu__cat-title" onClick={() => setDropdownOpen(false)}>
                              Interior Customization
                            </Link>
                          </div>
                          <ul className="mega-menu__list">
                            {interiorNavItems.map(item => (
                              <li key={item.slug}>
                                <Link 
                                  to={`/interior-car-accessories-chennai/${item.slug}`}
                                  className="mega-menu__item-link"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link 
                            to="/interior-car-accessories-chennai" 
                            className="mega-menu__all-link"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span>EXPLORE ALL INTERIOR</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>

                        {/* Mega Menu Visual Card */}
                        <div className="mega-menu__promo">
                          <div className="mega-menu__promo-card">
                            <div className="mega-menu__promo-img-wrap">
                              <img 
                                src="/images/hero-car-suv.jpg" 
                                alt="Automotive Upgrade Studio" 
                                className="mega-menu__promo-img"
                              />
                              <div className="mega-menu__promo-badge">
                                <ShieldCheck size={13} />
                                <span>OEM+ COUPLER FITMENT</span>
                              </div>
                            </div>
                            <h4>Zero Wire Cutting</h4>
                            <p>Original car warranty protected. Factory finish installation by master automotive technicians.</p>
                            <Link to="/contact" className="btn btn-primary btn-sm" onClick={() => setDropdownOpen(false)}>
                              <span>Book Fitment</span>
                              <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </li>

                <li>
                  <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/franchise" className={location.pathname === '/franchise' ? 'active' : ''}>
                    Franchise
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Actions: WhatsApp + Get a Quote */}
            <div className="header__actions">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp header__wa-btn"
                aria-label="Contact Best Car Accessories on WhatsApp"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </a>
              <Link to="/contact" className="btn btn-primary header__quote-btn">
                <span>Get a Quote</span>
                <ArrowRight size={13} className="btn-arrow" />
              </Link>
              
              <button 
                className="header__mobile-toggle"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
              >
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        whatsappUrl={whatsappUrl}
      />
    </>
  );
}
