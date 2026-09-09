import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import reviewsData from '../../../data/reviews.json';
import './ReviewsStrip.css';

export default function ReviewsStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = reviewsData.reviews.slice(0, 3);
  const active = featured[activeIndex] || featured[0];

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };
  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % featured.length);
  };

  return (
    <section className="reviews-strip" id="reviews" aria-label="Client testimonials">
      <div className="container">

        <header className="reviews-strip__header">
          <span className="section-label">Testimonials</span>
          <h2 className="reviews-strip__title">
            What Our <span className="reviews-strip__title-accent">Clients Say</span>
          </h2>
          <p className="reviews-strip__subtitle">
            Real upgrades. Real owners. Real Chennai roads — every review below comes from a customer who drives away happier than they arrived.
          </p>
        </header>

        <div className="reviews-strip__featured">

          <blockquote className="reviews-strip__featured-text">
            {active.text}
          </blockquote>

          <div className="reviews-strip__featured-meta">
            <span className="reviews-strip__featured-name">{active.name}</span>
            <span className="reviews-strip__featured-divider" aria-hidden="true" />
            <span className="reviews-strip__featured-car">{active.car}</span>
          </div>

          <div className="reviews-strip__nav" role="group" aria-label="Cycle testimonials">
            <button
              type="button"
              className="reviews-strip__cycle-btn"
              onClick={goPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="reviews-strip__counter" aria-live="polite">
              <span className="reviews-strip__counter-current">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="reviews-strip__counter-sep" aria-hidden="true">/</span>
              <span className="reviews-strip__counter-total">
                {String(featured.length).padStart(2, '0')}
              </span>
            </span>
            <button
              type="button"
              className="reviews-strip__cycle-btn"
              onClick={goNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="reviews-strip__footer">
          <div className="reviews-strip__rating">
            <span className="reviews-strip__rating-num">{reviewsData.rating}</span>
            <span className="reviews-strip__rating-out">/5.0</span>
            <span className="reviews-strip__rating-count">{reviewsData.totalReviews} verified google reviews</span>
          </div>
          <Link to="/reviews" className="reviews-strip__cta">
            <span>Read All Reviews</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
