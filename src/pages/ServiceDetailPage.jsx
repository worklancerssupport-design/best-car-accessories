import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  CheckCircle, 
  MessageCircle, 
  ArrowRight, 
  Wrench, 
  ShieldCheck, 
  Cpu,
  Clock,
  AlertCircle,
  Home
} from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import FAQ from '../components/ui/FAQ/FAQ';
import CTASection from '../components/ui/CTASection/CTASection';
import RelatedServices from '../components/ui/RelatedServices/RelatedServices';
import exteriorData from '../data/products/exterior.json';
import interiorData from '../data/products/interior.json';
import business from '../data/business.json';
import './ServiceDetailPage.css';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const mediaRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const [selectedImage, setSelectedImage] = useState(null);

  const allServices = [...exteriorData.items, ...interiorData.items];
  const service = allServices.find((s) => s.slug === slug);

  useEffect(() => {
    setSelectedImage(null);
  }, [slug]);

  if (!service) {
    return (
      <section className="sd-not-found section--dark">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Accessories', href: '/exterior-car-accessories-chennai' }, { label: 'Not Found' }]} />
          <div className="sd-not-found__card">
            <AlertCircle size={44} className="text-accent mb-3" />
            <span className="tech-tag tech-tag--accent">SERVICE NOT FOUND</span>
            <h1 className="sd-not-found__title">Accessory Specification Not Found</h1>
            <p className="sd-not-found__desc">
              The requested accessory specification could not be located. Explore our 40 comprehensive exterior and interior automotive upgrades below.
            </p>
            <div className="sd-not-found__actions">
              <Link to="/exterior-car-accessories-chennai" className="btn btn-primary">
                <span>Exterior Accessories (20)</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/interior-car-accessories-chennai" className="btn btn-secondary">
                <span>Interior Customization (20)</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/" className="btn btn-outline">
                <Home size={15} />
                <span>Return Home</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isExterior = service.category === 'Exterior' || service.id?.startsWith('ext-');
  const categoryLabel = isExterior ? 'Exterior Accessories' : 'Interior Accessories';
  const categoryPath = isExterior ? '/exterior-car-accessories-chennai' : '/interior-car-accessories-chennai';

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: categoryLabel, href: categoryPath },
    { label: service.name, href: '' },
  ];

  const pageTitle = `${service.name} in Chennai | Best Car Accessories NMS Road`;
  const pageDescription = `${service.shortDescription} Professional installation in Chennai with 15+ years experience. Contact Best Car Accessories on NMS Road today.`;
  const canonicalUrl = `${business.siteUrl}${isExterior ? '/exterior-car-accessories-chennai' : '/interior-car-accessories-chennai'}/${service.slug}`;

  const whatsappMessage = encodeURIComponent(
    `Hello Best Car Accessories, I would like to enquire about ${service.name} installation for my car.`
  );
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;

  const handleMediaMove = (e) => {
    if (!mediaRef.current || window.innerWidth <= 768) return;
    const rect = mediaRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y, active: true });
  };

  const handleMediaLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: business.name,
      address: { 
        '@type': 'PostalAddress', 
        streetAddress: business.address,
        addressLocality: 'Chennai', 
        addressRegion: 'Tamil Nadu', 
        addressCountry: 'IN' 
      },
    },
    areaServed: 'Chennai',
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        {service.image && <meta property="og:image" content={`${business.siteUrl}${service.image}`} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <section className="sd-hero section--dark">
        <div className="container">
          <div className="sd-breadcrumb">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="sd-hero__grid">
            <div className="sd-hero__left">
              <div className="sd-hero__meta">
                <span className="tech-tag tech-tag--accent">{categoryLabel}</span>
                <span className="sd-hero__meta-divider">/</span>
                <span className="sd-hero__meta-tag">NMS ROAD · CHENNAI</span>
              </div>

              <h1 className="sd-hero__title">
                <span className="sd-hero__title-accent">{service.name.split(' ')[0]}</span>{' '}
                {service.name.split(' ').slice(1).join(' ')}
              </h1>
              <p className="sd-hero__lead">{service.shortDescription}</p>

              <div className="sd-telemetry">
                <div className="sd-telemetry__item">
                  <Cpu size={16} className="sd-telemetry__icon" />
                  <div>
                    <span className="sd-telemetry__label">FITMENT TYPE</span>
                    <strong className="sd-telemetry__value">Plug &amp; Play OEM+</strong>
                  </div>
                </div>
                <div className="sd-telemetry__item">
                  <Clock size={16} className="sd-telemetry__icon" />
                  <div>
                    <span className="sd-telemetry__label">INSTALL TIME</span>
                    <strong className="sd-telemetry__value">1 – 3 Hours</strong>
                  </div>
                </div>
                <div className="sd-telemetry__item">
                  <ShieldCheck size={16} className="sd-telemetry__icon" />
                  <div>
                    <span className="sd-telemetry__label">FACTORY WARRANTY</span>
                    <strong className="sd-telemetry__value">100% Intact</strong>
                  </div>
                </div>
              </div>

              {service.benefits && service.benefits.length > 0 && (
                <ul className="sd-quick-list">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i}>
                      <CheckCircle size={15} className="sd-quick-list__icon" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="sd-hero__actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <span>Get Exact Quote</span>
                  <ArrowRight size={16} className="btn-icon" />
                </Link>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp btn-lg"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Fitment</span>
                </a>
              </div>

              <div className="sd-fitment-note">
                <ShieldCheck size={16} className="sd-fitment-note__icon" />
                <span>Zero wire cut · Heat-resistant sleeves · Tested before delivery</span>
              </div>
            </div>

            <div className="sd-hero__right">
              <div 
                className="sd-media-box"
                ref={mediaRef}
                onMouseMove={handleMediaMove}
                onMouseLeave={handleMediaLeave}
                style={{
                  transform: tilt.active 
                    ? `perspective(1000px) rotateX(${tilt.y * -10}deg) rotateY(${tilt.x * 12}deg) translateZ(8px)` 
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                  transition: 'transform 0.12s ease-out'
                }}
              >
                <img
                  src={selectedImage || service.image || '/images/exterior/placeholder.webp'}
                  alt={service.imageAlt || service.name}
                  loading="eager"
                  className="sd-image"
                  onError={(e) => {
                    e.target.src = '/images/exterior/placeholder.webp';
                  }}
                />
                {tilt.active && (
                  <div 
                    className="sd-media-box__glare"
                    style={{
                      background: `radial-gradient(circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, rgba(230, 57, 70, 0.22) 0%, transparent 65%)`
                    }}
                  />
                )}
                <div className="sd-media-box__badge">
                  <Wrench size={14} />
                  <span>Certified Automotive Fitting · NMS Road Studio</span>
                </div>
              </div>

              {service.gallery && service.gallery.length > 1 && (
                <div className="sd-thumbs" aria-label="Product Image Gallery">
                  {service.gallery.map((imgUrl, idx) => {
                    const isActive = (selectedImage || service.image) === imgUrl;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`sd-thumbs__item ${isActive ? 'sd-thumbs__item--active' : ''}`}
                        onClick={() => setSelectedImage(imgUrl)}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img src={imgUrl} alt={`${service.name} view ${idx + 1}`} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sd-content section--dark-alt">
        <div className="container">
          <div className="sd-content__grid">
            <div className="sd-content__main">
              <span className="section-label">Engineering &amp; Craftsmanship</span>
              <h2 className="section-title">Upgrade Specifications</h2>
              <div className="divider" />
              <p className="sd-content__desc">{service.description}</p>

              {service.benefits && service.benefits.length > 0 && (
                <div className="sd-features">
                  <h3 className="sd-content__heading">Key Technical Advantages</h3>
                  <div className="sd-features__grid">
                    {service.benefits.map((benefit, i) => (
                      <div className="sd-features__card" key={i}>
                        <div className="sd-features__card-header">
                          <CheckCircle size={16} className="sd-features__icon" />
                          <span className="sd-features__num">0{i + 1}</span>
                        </div>
                        <p>{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.installation && (
                <div className="sd-installation">
                  <div className="sd-installation__header">
                    <Wrench size={20} className="sd-installation__icon" />
                    <h3 className="sd-installation__title">Installation &amp; Fitment Process</h3>
                  </div>
                  <p>{service.installation}</p>
                  <div className="sd-installation__badges">
                    <span className="tech-tag tech-tag--accent">Zero Void Warranty</span>
                    <span className="tech-tag">Heat-Resistant Sleeving</span>
                    <span className="tech-tag">Diagnostic Tested</span>
                  </div>
                </div>
              )}

              {service.options && service.options.length > 0 && (
                <div className="sd-options">
                  <h3 className="sd-content__heading">Available Configurations &amp; Brands</h3>
                  <div className="sd-options__list">
                    {service.options.map((option, i) => {
                      const label = typeof option === 'object' && option !== null ? option.label : option;
                      const description = typeof option === 'object' && option !== null ? option.description : null;
                      return (
                        <div className="sd-options__chip" key={i}>
                          <span className="sd-options__bullet" />
                          <div className="sd-options__content">
                            <strong className="sd-options__label">{label}</strong>
                            {description && <span className="sd-options__desc">{description}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <aside className="sd-sidebar">
              <div className="sd-sidebar__card">
                <span className="sd-sidebar__tag">INSTANT CONSULTATION</span>
                <h3>Customized for Your Car</h3>
                <p>Send our technicians your car model, manufacturing year, and preferred upgrades for quick pricing and slot confirmation.</p>
                
                <div className="sd-sidebar__actions">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp sd-sidebar__action">
                    <MessageCircle size={16} />
                    <span>WhatsApp Inquiry</span>
                  </a>
                  <Link to="/contact" className="btn btn-primary sd-sidebar__action">
                    <span>Book Fitment Slot</span>
                  </Link>
                </div>

                <div className="sd-sidebar__meta">
                  <div><strong>Studio:</strong> NMS Road, Chennai</div>
                  <div><strong>Estimated Time:</strong> 1 – 3 Hours</div>
                  <div><strong>Fitment:</strong> 100% Plug &amp; Play Couplers</div>
                  <div><strong>Testing:</strong> Handover Inspection Included</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {service.faqs && service.faqs.length > 0 && (
        <section className="sd-faq section--dark">
          <div className="container" style={{ maxWidth: '840px' }}>
            <div className="sd-faq__header">
              <span className="section-label">Questions &amp; Answers</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="divider sd-faq__divider" />
            </div>
            <FAQ faqs={service.faqs} />
          </div>
        </section>
      )}

      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="sd-related section--dark-alt">
          <div className="container">
            <RelatedServices slugs={service.relatedServices} currentSlug={service.slug} />
          </div>
        </section>
      )}

      <CTASection
        title={`Upgrade Your Vehicle with ${service.name}`}
        subtitle="Visit Best Car Accessories on NMS Road, Chennai for professional consultation and flawless fitment."
        primaryCta={{ label: 'Schedule Fitment', href: '/contact' }}
        whatsappMessage={`Hi, I would like to get a quote for ${service.name}.`}
        dark={true}
      />
    </>
  );
}