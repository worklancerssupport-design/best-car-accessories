import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { business } from '../../../config/business';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        
        {/* Editorial Showroom & Story */}
        <div className="about-grid">
          
          {/* LEFT: Workshop / Showroom Image */}
          <div className="about-media">
            <div className="about-image-wrapper">
              <img 
                src="/images/about/about-showroom-upgrade.jpg" 
                alt="Luxury Automotive Cockpit & Interior Customization Chennai" 
                loading="lazy"
                className="about-image"
              />
              <div className="about-media-badge">
                <ShieldCheck size={20} className="about-media-badge-icon" />
                <div>
                  <strong>OEM Fitment Standard</strong>
                  <span>Zero wire cutting guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Structured Editorial & Value Prop */}
          <div className="about-content">
            <div className="section-label">ABOUT BEST CAR ACCESSORIES</div>
            <div className="about-exp-tag">15+ YEARS OF EXPERIENCE</div>
            
            <h2 className="section-title">
              Your car deserves more than ordinary accessories.
            </h2>
            
            <div className="divider" />

            <p className="about-lead">
              We provide complete interior and exterior car accessories and customization solutions in Chennai — delivering showroom-grade aesthetics, acoustics, and driving comfort.
            </p>

            <p className="about-body">
              Located next to Woodlands Theater on Westcott Road, Royapettah, our workshop combines 15+ years of specialized craftsmanship with the latest automotive upgrades: from 18-zone ambient lights and Android infotainment to precision fog projectors, spoilers, and bespoke seat covers.
            </p>

            {/* Micro Feature Pillars */}
            <div className="about-pillars">
              <div className="about-pillar">
                <CheckCircle2 size={16} className="about-pillar-icon" />
                <span>Interior &amp; Exterior Upgrades</span>
              </div>
              <div className="about-pillar">
                <CheckCircle2 size={16} className="about-pillar-icon" />
                <span>Professional Technicians</span>
              </div>
              <div className="about-pillar">
                <CheckCircle2 size={16} className="about-pillar-icon" />
                <span>Audio, Lighting &amp; Cameras</span>
              </div>
              <div className="about-pillar">
                <CheckCircle2 size={16} className="about-pillar-icon" />
                <span>Custom Model Fitment</span>
              </div>
            </div>

            {/* Three key highlight numbers */}
            <div className="about-stats-row">
              <div className="about-stat-item">
                <span className="about-stat-val">15+</span>
                <span className="about-stat-lbl">Years Experience</span>
              </div>
              <div className="about-stat-divider" />
              <div className="about-stat-item">
                <span className="about-stat-val">1000+</span>
                <span className="about-stat-lbl">Satisfied Clients</span>
              </div>
              <div className="about-stat-divider" />
              <div className="about-stat-item">
                <span className="about-stat-val">40+</span>
                <span className="about-stat-lbl">Accessory Lines</span>
              </div>
            </div>

            <div className="about-cta-row">
              <Link to="/exterior-car-accessories-chennai" className="btn btn-primary">
                <span>Explore Our Services</span>
                <ArrowRight size={16} className="btn-arrow" />
              </Link>
              <Link to="/about" className="btn btn-outline-dark">
                <span>Read Full Story</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
