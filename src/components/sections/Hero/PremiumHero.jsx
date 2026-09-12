import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './PremiumHero.css';

export default function PremiumHero() {
  return (
    <section className="premium-hero" aria-label="Best Car Accessories NMS — Chennai's premium auto studio">
      <div className="premium-hero__bg" aria-hidden="true">
        <img
          src="/hero_car.jpg"
          alt=""
          className="premium-hero__bg-img"
          loading="eager"
          fetchpriority="high"
        />
        <div className="premium-hero__overlay" />
      </div>

      <div className="premium-hero__content">
        <article className="premium-hero__copy">
          <h1 className="premium-hero__title">
            Chennai's <br/><span className="about-hero__title-accent">Premium</span> Car Detailing &amp; Accessories
          </h1>

          <p className="premium-hero__lead">
            Chennai’s ultimate auto hub for ceramic coating, PPF, and premium accessories. From luxury car washing and deep interior cleaning to expert exterior polishing—we deliver showroom care.
          </p>

          <div className="premium-hero__actions">
            <Link to="/exterior-car-accessories-chennai" className="premium-hero__btn premium-hero__btn--primary">
              <span>Explore Accessories</span>
              <ChevronRight size={16} className="premium-hero__btn-icon" />
            </Link>
            <Link to="/contact" className="premium-hero__btn premium-hero__btn--secondary">
              <span>Get Quote</span>
            </Link>
          </div>
        </article>
      </div>

      <div className="premium-hero__brand-strip" aria-label="Car brands we service">
        <ul className="premium-hero__brands">
          <li>HYUNDAI</li>
          <li>TATA</li>
          <li>VOLKSWAGEN</li>
          <li>MARUTI</li>
          <li>MAHINDRA</li>
          <li>FORD</li>
          <li>TOYOTA</li>
          <li>KIA</li>
          <li>HONDA</li>
        </ul>
      </div>
    </section>
  );
}
