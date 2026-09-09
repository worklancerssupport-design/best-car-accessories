import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ServiceCard.css';

export default function ServiceCard({ service, index = 1, dark = true }) {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  if (!service) return null;

  const isExterior = service.category === 'Exterior' || service.category === 'exterior' || service.id?.startsWith('ext-');
  const basePath = isExterior ? '/exterior-car-accessories-chennai' : '/interior-car-accessories-chennai';
  const detailUrl = `${basePath}/${service.slug}`;
  const formattedIndex = String(index).padStart(2, '0');

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth <= 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  const handleCardClick = (e) => {
    // If the click is on an anchor tag, let the browser/Router handle it
    if (e.target.closest('a')) return;
    navigate(detailUrl);
  };

  return (
    <article 
      className={`service-card ${dark ? 'service-card--dark' : 'service-card--light'} ${tilt.active ? 'is-tilting' : ''}`}
      ref={cardRef}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.active 
          ? `perspective(1000px) rotateX(${tilt.y * -10}deg) rotateY(${tilt.x * 10}deg) translateZ(4px)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      }}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(detailUrl);
      }}
      aria-label={`View details for ${service.name}`}
    >
      {/* 3D Surface Light Glare */}
      {tilt.active && (
        <div 
          className="service-card__glare"
          style={{
            background: `radial-gradient(circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, rgba(103, 232, 249, 0.22) 0%, transparent 65%)`
          }}
        />
      )}

      <div className="service-card__image-wrap">
        <img 
          src={service.image || '/images/exterior/placeholder.webp'} 
          alt={service.imageAlt || service.name} 
          className="service-card__image" 
          loading="lazy"
          onError={(e) => {
            e.target.src = '/images/exterior/placeholder.webp';
          }}
        />
        <div className="service-card__top-bar">
          <span className="service-card__index">{formattedIndex}</span>
          {service.category && (
            <span className="service-card__badge">{service.category}</span>
          )}
        </div>
      </div>

      <div className="service-card__content">
        <h3 className="service-card__title">
          <Link to={detailUrl}>{service.name}</Link>
        </h3>
        <p className="service-card__desc">{service.shortDescription}</p>
        
        <div className="service-card__footer">
          <Link to={detailUrl} className="service-card__link">
            <span>EXPLORE</span>
            <ArrowRight size={14} className="service-card__arrow" />
          </Link>
          <span className="service-card__oem-tag">OEM+ FIT</span>
        </div>
      </div>
    </article>
  );
}
