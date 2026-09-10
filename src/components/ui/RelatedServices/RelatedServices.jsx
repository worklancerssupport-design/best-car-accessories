import { Link } from 'react-router-dom';
import { ChevronRight, Wrench } from 'lucide-react';
import exteriorData from '../../../data/products/exterior.json';
import interiorData from '../../../data/products/interior.json';
import './RelatedServices.css';

export default function RelatedServices({
  slugs = [],
  services: servicesProp,
  currentSlug,
  title = 'Related Accessories',
  label = 'You May Also Like',
  hideHeader = false,
}) {
  const allServices = [...exteriorData.items, ...interiorData.items];

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
      {!hideHeader && label && <span className="related-services__label">{label}</span>}
      {!hideHeader && <h2 className="related-services__title">{title}</h2>}

      <ul className="related-services__list">
        {services.map((service) => (
          <li key={service.id} className="related-services__item">
            <Link
              to={`/${service.category === 'exterior' ? 'exterior' : 'interior'}-car-accessories-chennai/${service.slug}`}
              className="related-services__link"
            >
              <span className="related-services__icon" aria-hidden="true">
                <Wrench size={14} />
              </span>
              <span className="related-services__name">{service.name}</span>
              <ChevronRight size={14} className="related-services__arrow" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/services" className="related-services__cta">
        View All Services
        <ChevronRight size={16} className="related-services__cta-icon" />
      </Link>
    </section>
  );
}
