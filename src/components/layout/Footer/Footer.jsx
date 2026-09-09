import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, MessageCircle, Clock, Facebook, Youtube } from 'lucide-react';
import business from '../../../data/business.json';
import './Footer.css';

export default function Footer() {
  const whatsappUrl = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hello Best Car Accessories, I would like to enquire about your car accessories and services.')}`
    : '#';
  const phoneDisplay = business.phone || '+91 98400 12345';
  const phoneHref = phoneDisplay.replace(/\s+/g, '');
  const instaUrl = business.instagram || 'https://www.instagram.com/best_car_accessories_nms/';
  const facebookUrl = business.facebook || 'https://www.facebook.com/';
  const youtubeUrl = business.youtube || 'https://www.youtube.com/';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-col">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img
                  src="/logo.png"
                  alt="Best Car Accessories"
                  className="footer-logo-img"
                />
                <span className="footer__brand-name">
                  <span className="footer__brand-name-top">Best Car</span>
                  <span className="footer__brand-name-bottom">Accessories</span>
                </span>
              </Link>
              <p className="footer-desc">
                Chennai's trusted automotive accessories and customization studio. Precision fitment, OEM-grade parts, and over 15 years of craftsmanship.
              </p>
              <div className="footer-socials" aria-label="Social media links">
                <a href={instaUrl} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                  <Instagram size={16} />
                </a>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                  <Facebook size={16} />
                </a>
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
                  <Youtube size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Explore</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/exterior-car-accessories-chennai">Exterior Accessories</Link></li>
              <li><Link to="/interior-car-accessories-chennai">Interior Customization</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/franchise">Franchise</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Popular Upgrades</h3>
            <ul className="footer-links">
              <li><Link to="/exterior-car-accessories-chennai/fog-light-fog-projector">Laser Fog Projectors</Link></li>
              <li><Link to="/exterior-car-accessories-chennai/headlight-led-upgrade">LED Headlight Conversions</Link></li>
              <li><Link to="/interior-car-accessories-chennai/ambient-lights">Ambient Lighting</Link></li>
              <li><Link to="/interior-car-accessories-chennai/infotainment-systems">Android Cockpit Screens</Link></li>
              <li><Link to="/interior-car-accessories-chennai/speakers">Audio & Damping</Link></li>
              <li><Link to="/interior-car-accessories-chennai/oem-camera-360-camera">360° Cameras</Link></li>
              <li><Link to="/interior-car-accessories-chennai/premium-car-seat-covers">Tailored Seat Covers</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Get in Touch</h3>
            <ul className="footer-contact-list">
              <li>
                <div className="footer-contact-item">
                  <span className="footer-contact-item-icon"><MapPin size={14} /></span>
                  <div className="footer-contact-item-body">
                    <span className="footer-contact-item-label">Studio</span>
                    <span className="footer-contact-item-value">NMS Road, Chennai, Tamil Nadu</span>
                  </div>
                </div>
              </li>
              <li>
                <a href={`tel:${phoneHref}`} className="footer-contact-item">
                  <span className="footer-contact-item-icon"><Phone size={14} /></span>
                  <div className="footer-contact-item-body">
                    <span className="footer-contact-item-label">Phone</span>
                    <span className="footer-contact-item-value">{phoneDisplay}</span>
                  </div>
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                  <span className="footer-contact-item-icon"><MessageCircle size={14} /></span>
                  <div className="footer-contact-item-body">
                    <span className="footer-contact-item-label">WhatsApp</span>
                    <span className="footer-contact-item-value">Chat with our fitment team</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="footer-contact-item">
                  <span className="footer-contact-item-icon"><Clock size={14} /></span>
                  <div className="footer-contact-item-body">
                    <span className="footer-contact-item-label">Hours</span>
                    <span className="footer-contact-item-value">Mon – Sat: 9:30 AM – 9:00 PM</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Best Car Accessories. All rights reserved.</p>
          <div className="footer-bottom-meta">
            <span>NMS Road, Chennai</span>
            <span className="footer-bottom-meta-sep">·</span>
            <span>Automotive Customization Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
