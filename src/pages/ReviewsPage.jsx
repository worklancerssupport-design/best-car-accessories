import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import reviewsData from '../data/reviews.json';
import './ReviewsPage.css';
import { Star, ExternalLink } from 'lucide-react';

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={16} fill={i <= rating ? '#f5b400' : 'none'} stroke={i <= rating ? '#f5b400' : '#ccc'} />
      ))}
    </div>
  );
}

const AVATAR_COLORS = ['#c8102e', '#1a3a5c', '#2d6a4f', '#6b2d8b', '#c45b00', '#1a5c5c'];

export default function ReviewsPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Reviews' }];

  return (
    <>
      <Helmet>
        <title>Customer Reviews | Best Car Accessories Chennai | NMS Road</title>
        <meta name="description" content="See what customers say about Best Car Accessories, NMS Road, Chennai. 15+ years of serving car owners with quality accessories and professional installation." />
        <link rel="canonical" href={`${business.siteUrl}/reviews`} />
        <meta property="og:title" content="Reviews | Best Car Accessories Chennai" />
        <meta property="og:description" content="Customer reviews for Best Car Accessories, NMS Road, Chennai." />
      </Helmet>

      <div className="reviews-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      <section className="reviews-hero section--dark">
        <div className="reviews-hero__overlay" />
        <div className="container reviews-hero__content">
          <span className="section-label">Customer Feedback</span>
          <h1 className="reviews-hero__title">What Our Customers Say</h1>
          <p className="reviews-hero__subtitle">
            We have been serving car owners in Chennai for over 15 years.
            Here is what some of our customers have shared about their experience.
          </p>
        </div>
      </section>

      {/* Placeholder note */}
      <div className="reviews-dev-note">
        <div className="container">
          <p>
            <strong>Developer Note:</strong> The reviews shown below are illustrative placeholders.
            Connect the Google Reviews API or manually enter verified customer reviews before going live.
            The component structure is ready for real data.
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <section className="section section--light reviews-grid-section">
        <div className="container">
          <div className="reviews-grid">
            {reviewsData.reviews.map((review, i) => (
              <article className="review-card" key={review.id || i}>
                <div className="review-card__header">
                  <div
                    className="review-card__avatar"
                    style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                    aria-hidden="true"
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div className="review-card__name">{review.name}</div>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="review-card__text">{review.text}</p>
              </article>
            ))}
          </div>

          {/* Google Reviews CTA */}
          <div className="reviews-google-cta">
            {business.googleReviewsUrl ? (
              <a
                href={business.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark btn-lg"
              >
                <ExternalLink size={18} />
                View Our Google Reviews
              </a>
            ) : (
              <p className="reviews-google-cta__placeholder">
                Configure <code>googleReviewsUrl</code> in <code>src/config/business.js</code> to add a link to your Google Business reviews.
              </p>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Experience Our Service?"
        subtitle="Visit us at NMS Road, Chennai or WhatsApp your requirements."
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        whatsappMessage="Hello Best Car Accessories, I would like to enquire about your car accessories."
        dark={true}
      />
    </>
  );
}
