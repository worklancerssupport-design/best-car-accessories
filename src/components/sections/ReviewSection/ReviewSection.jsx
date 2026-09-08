import React, { useRef } from 'react';
import { Star, CheckCircle, ExternalLink, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionDivider from '../../ui/SectionDivider/SectionDivider';
import { business } from '../../../config/business';
import './ReviewSection.css';

const reviewsData = [
  { 
    id: 1, 
    name: "Rajesh K.", 
    car: "Hyundai Creta", 
    mod: "18-Zone Ambient Lighting & Audio Damping",
    text: "Got ambient lighting and complete door damping done. The craftsmanship is top-notch with zero wire cutting. Completely changed the night driving feel.", 
    rating: 5, 
    initial: "R" 
  },
  { 
    id: 2, 
    name: "Priya S.", 
    car: "Kia Seltos", 
    mod: "Custom Leather Seat Covers & 7D Mats",
    text: "The bucket fitment of the seat covers feels like OEM factory finish. Very polite team on Westcott Road who explained the material differences patiently.", 
    rating: 5, 
    initial: "P" 
  },
  { 
    id: 3, 
    name: "Arjun M.", 
    car: "Mahindra Scorpio-N", 
    mod: "Bi-LED Projector Fog Lamps Upgrade",
    text: "Highway visibility at night was a challenge before this upgrade. The fog projector throw is razor sharp with clean cutoff lines. Worth every rupee.", 
    rating: 5, 
    initial: "A" 
  },
  { 
    id: 4, 
    name: "Karthik V.", 
    car: "Tata Nexon", 
    mod: "Android Infotainment & 360° Camera",
    text: "Installed 360 camera and touchscreen system. Calibration in narrow Chennai streets is spot on. Neat coupler-to-coupler harness.", 
    rating: 5, 
    initial: "K" 
  },
  { 
    id: 5, 
    name: "Lakshmi R.", 
    car: "Toyota Innova Crysta", 
    mod: "Roof Rails, Side Steps & Armrest",
    text: "Solid heavy-duty side foot steps installed for family convenience. Sturdy fitment with zero rattle over rough roads. Highly recommend.", 
    rating: 5, 
    initial: "L" 
  },
  { 
    id: 6, 
    name: "Suresh N.", 
    car: "Honda City", 
    mod: "Component Audio & Sun Control Film",
    text: "Audio staging and heat rejection film installation was clean. The workshop is well organized and delivery was on time.", 
    rating: 5, 
    initial: "S" 
  },
];

const ReviewSection = () => {
  const scrollRef = useRef(null);
  const hasReviewsUrl = Boolean(business.googleReviewsUrl);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="review-section" id="reviews">
      <SectionDivider num="10" label="CUSTOMER EXPERIENCES" />

      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-label">VERIFIED EXPERIENCES</span>
          <h2 className="section-title text-white">DRIVEN BY TRUST.</h2>
          <div className="divider" style={{ margin: '0.5rem auto 1rem' }} />
          <p className="section-subtitle section-subtitle--light" style={{ margin: '0 auto var(--space-4)' }}>
            Real experiences from customers who upgraded their cars with us at Best Car Accessories, Chennai.
          </p>

          {/* Rating Summary HUD Capsule */}
          <div className="reviews-summary-capsule">
            <div className="reviews-summary-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <span className="reviews-summary-score">4.9 / 5.0</span>
            <span className="reviews-summary-sep">·</span>
            <span className="reviews-summary-count">1,000+ UPGRADES DELIVERED</span>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="reviews-carousel-ctrls">
          <button 
            className="reviews-nav-btn" 
            onClick={() => scroll('left')} 
            aria-label="Previous review"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="reviews-nav-btn" 
            onClick={() => scroll('right')} 
            aria-label="Next review"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Horizontal Review Carousel Track */}
        <div className="reviews-carousel-track" ref={scrollRef}>
          {reviewsData.map((review) => (
            <div key={review.id} className="review-card card-3d">
              <div className="review-card__header">
                <div className="review-card__avatar">
                  {review.initial}
                </div>
                <div className="review-card__author">
                  <div className="review-card__name-row">
                    <h4 className="review-card__name">{review.name}</h4>
                    <CheckCircle size={14} className="review-card__verified" title="Verified Customer" />
                  </div>
                  <span className="review-card__car">{review.car} · {review.mod}</span>
                </div>
              </div>

              <div className="review-card__stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>

              <p className="review-card__text">"{review.text}"</p>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="reviews-action">
          {hasReviewsUrl && (
            <a 
              href={business.googleReviewsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary btn-sm"
            >
              <span>View Verified Reviews</span>
              <ExternalLink size={14} />
            </a>
          )}
          <span className="reviews-meta-note">
            <ShieldCheck size={14} className="text-cyan" />
            Verified customer reviews based on actual installations in Chennai.
          </span>
        </div>

      </div>
    </section>
  );
};

export default ReviewSection;
