import { Link } from 'react-router-dom';
import exteriorData from '../../../data/products/exterior.json';
import interiorData from '../../../data/products/interior.json';
import './RelatedServices.css';

// Accepts slugs array OR full service objects array
export default function RelatedServices({ slugs = [], services: servicesProp, currentSlug, title = 'Related Accessories' }) {
  const allServices = [...exteriorData.items, ...interiorData.items];

  // If slugs provided, look up service objects
  let services = servicesProp;
  if (!services && slugs.length > 0) {
    services = slugs
      .filter(slug => slug !== currentSlug)
      .map(slug => allServices.find(s => s.slug === slug))
      .filter(Boolean)
      .slice(0, 4);
  }

  if (!services || services.length === 0) return null;

  return (
    <section className="related-services">
      <span className="section-label">You May Also Like</span>
      <h2 className="section-title related-services__title">{title}</h2>
      <div className="divider" />
      <div className="related-services__grid">
        {services.map((service) => (
          <article className="related-card" key={service.id}>
            <div className="related-card__img-wrap">
              <img
                src={service.image || '/images/exterior/placeholder.webp'}
                alt={service.imageAlt || service.name}
                loading="lazy"
                className="related-card__img"
              />
            </div>
            <div className="related-card__body">
              <h3 className="related-card__name">{service.name}</h3>
              <p className="related-card__desc">{service.shortDescription}</p>
              <Link
                to={`/${service.category === 'exterior' ? 'exterior' : 'interior'}-car-accessories-chennai/${service.slug}`}
                className="related-card__link"
              >
                Learn More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
