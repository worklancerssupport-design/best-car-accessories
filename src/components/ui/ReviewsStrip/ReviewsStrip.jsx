import { Link } from 'react-router-dom';
import { Star, ArrowRight, Quote } from 'lucide-react';
import reviewsData from '../../../data/reviews.json';
import './ReviewsStrip.css';

export default function ReviewsStrip() {
  return (
    <section className="reviews-strip" id="reviews">
      <div className="container">
        <div className="reviews-strip__inner">
          {/* Left: Rating summary */}
          <div className="reviews-strip__summary">
            <div className="reviews-strip__stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <div className="reviews-strip__score">{reviewsData.rating} / 5.0</div>
            <div className="reviews-strip__count">{reviewsData.totalReviews} {reviewsData.totalReviewsLabel}</div>
          </div>

          {/* Center: 3 testimonial quotes */}
          <div className="reviews-strip__quotes">
            {reviewsData.highlights.map((r, i) => (
              <div key={i} className="reviews-strip__quote">
                <Quote size={14} className="reviews-strip__quote-icon" />
                <p className="reviews-strip__text">{r.text}</p>
                <span className="reviews-strip__author">{r.name} · {r.car}</span>
              </div>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="reviews-strip__cta">
            <Link to="/reviews" className="btn btn-secondary btn-sm">
              <span>Read All Reviews</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
