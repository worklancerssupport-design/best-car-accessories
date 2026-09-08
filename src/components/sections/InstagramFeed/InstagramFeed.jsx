import React from 'react';
import { Instagram, ArrowRight } from 'lucide-react';
import SectionDivider from '../../ui/SectionDivider/SectionDivider';
import { business } from '../../../config/business';
import './InstagramFeed.css';

const instaPosts = [
  { img: '/images/exterior/fog-light-projector-chennai.webp', title: 'Laser Fog Projector · Mahindra XUV700' },
  { img: '/images/interior/car-ambient-light-chennai.webp', title: '18-Zone Symphony Ambient Lighting · Hyundai Creta' },
  { img: '/images/interior/premium-car-seat-cover-chennai.webp', title: 'Custom Perforated Nappa Seat Covers · Toyota Fortuner' },
  { img: '/images/exterior/led-headlight-upgrade-chennai.webp', title: 'Matrix LED Headlight Upgrade · Tata Safari' },
  { img: '/images/interior/360-car-camera-chennai.webp', title: '360° Optical Calibration · Maruti Grand Vitara' },
  { img: '/images/exterior/rear-spoiler-tail-light-chennai.webp', title: 'Aero Spoiler & Sequential Tail Lamps · Kia Seltos' },
];

const InstagramFeed = () => {
  const instaUrl = business.instagram || 'https://www.instagram.com/best_car_accessories_nms/';

  return (
    <section className="instagram-section" id="instagram">
      <SectionDivider num="09" label="LIVE FROM THE SHOP" />

      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-label">@best_car_accessories_nms</span>
          <h2 className="section-title text-white">FOLLOW THE BUILD</h2>
          <div className="divider" style={{ margin: '0.5rem auto 1rem' }} />
          <p className="section-subtitle section-subtitle--light" style={{ margin: '0 auto' }}>
            Daily updates, sound checks, lighting demos, and customer handovers straight from our Royapettah studio floor.
          </p>
        </div>

        {/* Profile Highlight Strip */}
        <div className="instagram-profile-card card-3d">
          <div className="instagram-avatar">
            <Instagram size={28} />
          </div>
          <div className="instagram-info">
            <h3 className="instagram-handle">@best_car_accessories_nms</h3>
            <p className="instagram-bio">Best Car Accessories · Royapettah, Chennai · 15+ Years</p>
          </div>
          <a href={instaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            <span>Follow on Instagram</span>
            <ArrowRight size={14} className="btn-arrow" />
          </a>
        </div>

        {/* 6 Project Tiles */}
        <div className="instagram-grid">
          {instaPosts.map((post, index) => (
            <a 
              href={instaUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={index} 
              className="instagram-tile card-3d" 
              aria-label={post.title}
              data-cursor="VIEW"
            >
              <img src={post.img} alt={post.title} loading="lazy" />
              <div className="instagram-tile-overlay">
                <Instagram size={22} color="#6DE7FF" />
                <span>{post.title}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InstagramFeed;
