import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, MessageCircle, ArrowRight, Shield, Clock } from 'lucide-react';
import { business } from '../../../config/business';
import './Footer.css';

export default function Footer() {
  const whatsappUrl = business.whatsapp 
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hello Best Car Accessories, I would like to enquire about your car accessories and services.')}` 
    : '#';
  const phoneDisplay = business.phone || '+91 98400 12345';
  const instaUrl = business.instagram || 'https://www.instagram.com/best_car_accessories_nms/';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1 - Brand & Identity */}
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-badge">3D SHOWROOM & FITMENT STUDIO</span>
              <span className="footer-logo-title">BEST CAR ACCESSORIES</span>
              <span className="footer-logo-sub">NMS ROAD · CHENNAI</span>
            </Link>
            <p className="footer-desc">
              Chennai's premier automotive accessories and custom cockpit studio. 15+ years of precision craftsmanship, OEM coupler fitment, and over 1,000 satisfied car owners.
            </p>
            <div className="footer-meta-pill">
              <span className="footer-dot" /> 15+ YEARS OF PRECISION FITMENT
            </div>
          </div>

          {/* Column 2 - Explore (Strictly no Reviews link!) */}
          <div className="footer-col">
            <h3 className="footer-col-title">EXPLORE</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/exterior-car-accessories-chennai">Exterior Accessories</Link></li>
              <li><Link to="/interior-car-accessories-chennai">Interior Customization</Link></li>
              <li><Link to="/gallery">3D Gallery</Link></li>
              <li><Link to="/about">About Studio</Link></li>
              <li><Link to="/franchise">Franchise Opportunities</Link></li>
              <li><Link to="/contact">Contact & Fitment</Link></li>
            </ul>
          </div>

          {/* Column 3 - Featured Upgrades */}
          <div className="footer-col">
            <h3 className="footer-col-title">CORE UPGRADES</h3>
            <ul className="footer-links">
              <li><Link to="/exterior-car-accessories-chennai/fog-light-fog-projector">Laser Fog Projectors</Link></li>
              <li><Link to="/exterior-car-accessories-chennai/headlight-led-upgrade">LED Headlight Conversions</Link></li>
              <li><Link to="/interior-car-accessories-chennai/ambient-lights">18-Zone Ambient Lighting</Link></li>
              <li><Link to="/interior-car-accessories-chennai/infotainment-systems">Android Cockpit Screens</Link></li>
              <li><Link to="/interior-car-accessories-chennai/speakers">Acoustic Audio & Damping</Link></li>
              <li><Link to="/interior-car-accessories-chennai/oem-camera-360-camera">360° Bird-Eye Cameras</Link></li>
              <li><Link to="/interior-car-accessories-chennai/premium-car-seat-covers">Tailored Seat Covers</Link></li>
            </ul>
          </div>

          {/* Column 4 - Connect */}
          <div className="footer-col">
            <h3 className="footer-col-title">STUDIO CONNECT</h3>
            <ul className="footer-contact-list">
              <li>
                <a href={instaUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                  <Instagram size={16} className="footer-contact-icon" />
                  <span>@best_car_accessories_nms</span>
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                  <MessageCircle size={16} className="footer-contact-icon" />
                  <span>WhatsApp Fitment Hotline</span>
                </a>
              </li>
              <li>
                <a href={`tel:${phoneDisplay.replace(/\s+/g, '')}`} className="footer-contact-link">
                  <Phone size={16} className="footer-contact-icon" />
                  <span>{phoneDisplay}</span>
                </a>
              </li>
              <li className="footer-location-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span>NMS Road, Chennai, Tamil Nadu</span>
              </li>
              <li className="footer-hours-item">
                <Clock size={16} className="footer-contact-icon" />
                <span>Mon – Sat: 9:30 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Best Car Accessories. All Rights Reserved.</p>
          <div className="footer-bottom-meta">
            <span>NMS Road, Chennai</span>
            <span className="footer-sep">·</span>
            <span>Automotive Customization & Performance Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
