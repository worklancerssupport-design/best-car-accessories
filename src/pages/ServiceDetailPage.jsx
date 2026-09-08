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
  Layers,
  Sparkles,
  Award,
  AlertCircle,
  Home
} from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import FAQ from '../components/ui/FAQ/FAQ';
import CTASection from '../components/ui/CTASection/CTASection';
import RelatedServices from '../components/ui/RelatedServices/RelatedServices';
import { exteriorAccessories } from '../data/exteriorAccessories';
import { interiorAccessories } from '../data/interiorAccessories';
import { business } from '../config/business';
import './ServiceDetailPage.css';

export default function ServiceDetailPage({ category }) {
  const { slug } = useParams();
  const mediaRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const [selectedImage, setSelectedImage] = useState(null);

  const allServices = [...exteriorAccessories, ...interiorAccessories];
  const service = allServices.find((s) => s.slug === slug);

  // Reset selected image when navigating between services
  useEffect(() => {
    setSelectedImage(null);
  }, [slug]);

  // In-page fallback if service slug is not found (NEVER render a blank page)
  if (!service) {
    return (
      <section className="sdp-not-found section--dark">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Accessories', href: '/exterior-car-accessories-chennai' }, { label: 'Not Found' }]} />
          <div className="sdp-not-found-card bracket-box">
            <AlertCircle size={44} className="text-cyan mb-3" />
            <span className="tech-tag tech-tag--accent">SERVICE NOT FOUND</span>
            <h1 className="sdp-not-found-title">Accessory Specification Not Found</h1>
            <p className="sdp-not-found-desc">
              The requested accessory specification could not be located. Explore our 40 comprehensive exterior and interior automotive upgrades below.
            </p>
            <div className="sdp-not-found-actions">
              <Link to="/exterior-car-accessories-chennai" className="btn btn-primary">
                <span>Exterior Accessories (20)</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/interior-car-accessories-chennai" className="btn btn-secondary">
                <span>Interior Customization (20)</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/" className="btn btn-outline-dark">
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

      {/* ── 3D Mini-Product Hero Section ── */}
      <section className="sdp-hero-section section--dark">
        <div className="container">
          
          {/* Breadcrumb row */}
          <div className="sdp-breadcrumb-bar">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="sdp-hero-grid">
            
            {/* LEFT: Information, specs & CTAs */}
            <div className="sdp-hero-left">
              <div className="sdp-hero-meta">
                <span className="tech-tag tech-tag--accent">{categoryLabel}</span>
                <span className="sdp-meta-divider">/</span>
                <span className="sdp-meta-tag">NMS ROAD · CHENNAI</span>
              </div>

              <h1 className="sdp-hero-title">{service.name}</h1>
              <p className="sdp-hero-lead">{service.shortDescription}</p>

              {/* Technical Telemetry HUD Specs Strip */}
              <div className="sdp-telemetry-strip">
                <div className="sdp-telemetry-item">
                  <Cpu size={16} className="sdp-telemetry-icon" />
                  <div>
                    <span className="sdp-telemetry-lbl">FITMENT TYPE</span>
                    <strong className="sdp-telemetry-val">Plug & Play OEM+</strong>
                  </div>
                </div>
                <div className="sdp-telemetry-item">
                  <Clock size={16} className="sdp-telemetry-icon" />
                  <div>
                    <span className="sdp-telemetry-lbl">INSTALL TIME</span>
                    <strong className="sdp-telemetry-val">1 – 3 Hours</strong>
                  </div>
                </div>
                <div className="sdp-telemetry-item">
                  <ShieldCheck size={16} className="sdp-telemetry-icon" />
                  <div>
                    <span className="sdp-telemetry-lbl">FACTORY WARRANTY</span>
                    <strong className="sdp-telemetry-val">100% Intact</strong>
                  </div>
                </div>
              </div>

              {/* Quick Benefits Ticklist */}
              {service.benefits && service.benefits.length > 0 && (
                <ul className="sdp-hero-quick-list">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i}>
                      <CheckCircle size={15} className="sdp-quick-icon" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Action Buttons */}
              <div className="sdp-hero-buttons">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <span>Get Exact Quote</span>
                  <ArrowRight size={16} className="btn-arrow" />
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

              <div className="sdp-fitment-note">
                <ShieldCheck size={16} className="sdp-shield-icon" />
                <span>Zero wire cut · Heat-resistant sleeves · Tested before delivery</span>
              </div>
            </div>

            {/* RIGHT: 3D Media Box with Perspective Tilt */}
            <div className="sdp-hero-right">
              <div 
                className="sdp-media-box bracket-box"
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
                  className="sdp-media-img"
                  onError={(e) => {
                    e.target.src = '/images/exterior/placeholder.webp';
                  }}
                />
                {tilt.active && (
                  <div 
                    className="sdp-media-glare"
                    style={{
                      background: `radial-gradient(circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, rgba(103, 232, 249, 0.25) 0%, transparent 65%)`
                    }}
                  />
                )}
                <div className="sdp-media-overlay-badge">
                  <Wrench size={14} />
                  <span>Certified Automotive Fitting · NMS Road Studio</span>
                </div>
              </div>

              {/* Gallery Thumbnails (if multiple images present) */}
              {service.gallery && service.gallery.length > 1 && (
                <div className="sdp-media-thumbs" aria-label="Product Image Gallery">
                  {service.gallery.map((imgUrl, idx) => {
                    const isActive = (selectedImage || service.image) === imgUrl;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`sdp-media-thumb ${isActive ? 'sdp-media-thumb--active' : ''}`}
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

      {/* ── Detailed Technical Specifications ── */}
      <section className="sdp-content-section section--dark-2">
        <div className="container">
          <div className="sdp-content-grid">
            
            <div className="sdp-content-main">
              <span className="section-label">Engineering & Craftsmanship</span>
              <h2 className="section-title">Upgrade Specifications</h2>
              <div className="divider" />
              <p className="sdp-full-desc">{service.description}</p>

              {/* All Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="sdp-benefits-wrap">
                  <h3 className="sdp-section-heading">Key Technical Advantages</h3>
                  <div className="sdp-benefits-grid">
                    {service.benefits.map((benefit, i) => (
                      <div className="sdp-benefit-card" key={i}>
                        <div className="sdp-benefit-header">
                          <CheckCircle size={16} className="sdp-benefit-check" />
                          <span className="sdp-benefit-num">0{i + 1}</span>
                        </div>
                        <p>{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Installation & Craftsmanship */}
              {service.installation && (
                <div className="sdp-installation-box bracket-box">
                  <div className="sdp-inst-header">
                    <Wrench size={20} className="sdp-inst-icon" />
                    <h3 className="sdp-inst-title">Installation & Fitment Process</h3>
                  </div>
                  <p>{service.installation}</p>
                  <div className="sdp-inst-badges">
                    <span className="tech-tag tech-tag--accent">Zero Void Warranty</span>
                    <span className="tech-tag">Heat-Resistant Sleeving</span>
                    <span className="tech-tag">Diagnostic Tested</span>
                  </div>
                </div>
              )}

              {/* Product Options / Variants */}
              {service.options && service.options.length > 0 && (
                <div className="sdp-options-wrap">
                  <h3 className="sdp-section-heading">Available Configurations & Brands</h3>
                  <div className="sdp-options-chips">
                    {service.options.map((option, i) => {
                      const label = typeof option === 'object' && option !== null ? option.label : option;
                      const description = typeof option === 'object' && option !== null ? option.description : null;
                      return (
                        <div className="sdp-option-chip" key={i}>
                          <span className="sdp-option-bullet" />
                          <div className="sdp-option-content">
                            <strong className="sdp-option-label">{label}</strong>
                            {description && <span className="sdp-option-desc">{description}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Sticky Consultation Box */}
            <aside className="sdp-sidebar">
              <div className="sdp-sidebar-card bracket-box">
                <span className="sdp-sidebar-tag">INSTANT CONSULTATION</span>
                <h3>Customized for Your Car</h3>
                <p>Send our technicians your car model, manufacturing year, and preferred upgrades for quick pricing and slot confirmation.</p>
                
                <div className="sdp-sidebar-actions">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center' }}>
                    <MessageCircle size={16} />
                    <span>WhatsApp Inquiry</span>
                  </a>
                  <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>Book Fitment Slot</span>
                  </Link>
                </div>

                <div className="sdp-sidebar-meta">
                  <div><strong>Studio:</strong> NMS Road, Chennai</div>
                  <div><strong>Estimated Time:</strong> 1 – 3 Hours</div>
                  <div><strong>Fitment:</strong> 100% Plug & Play Couplers</div>
                  <div><strong>Testing:</strong> Handover Inspection Included</div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="sdp-faq-section section--dark">
          <div className="container" style={{ maxWidth: '840px' }}>
            <div className="text-center" style={{ marginBottom: 'var(--space-6)' }}>
              <span className="section-label">Questions & Answers</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="divider" style={{ margin: '0.5rem auto 1rem' }} />
            </div>
            <FAQ faqs={service.faqs} />
          </div>
        </section>
      )}

      {/* ── Related Services ── */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="sdp-related-section section--dark-2">
          <div className="container">
            <RelatedServices slugs={service.relatedServices} currentSlug={service.slug} />
          </div>
        </section>
      )}

      {/* ── Closing CTA ── */}
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
