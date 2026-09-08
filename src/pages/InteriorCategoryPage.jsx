import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { interiorAccessories } from '../data/interiorAccessories';
import { business } from '../config/business';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import FAQ from '../components/ui/FAQ/FAQ';
import ServiceCard from '../components/ui/ServiceCard/ServiceCard';
import './CategoryPage.css';
import { Search, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const CATEGORY_FAQS = [
  { q: 'Can interior accessories be added to any car?', a: 'Most interior accessories are engineered with vehicle-specific frames and harnesses. We verify exact compatibility before recommending upgrades.' },
  { q: 'Do you offer bespoke custom seat cover stitching?', a: 'Yes. We provide bespoke tailoring with custom colour accents, diamond or honeycomb quilting, perforation, and OEM bucket styling.' },
  { q: 'Will infotainment upgrades void my car’s factory warranty?', a: 'No. All our touchscreen infotainment systems use 100% plug-and-play vehicle-specific wiring couplers with zero wire cutting.' },
  { q: 'How does 18-zone ambient lighting work?', a: 'Our symphony ambient lighting kits run through factory concealed channels, controlled seamlessly via smartphone app or dashboard controls with 64+ colors and rhythm modes.' },
  { q: 'Can I get a sound damping and audio upgrade together?', a: 'Yes, multi-layer acoustic door damping combined with component speakers significantly eliminates road noise and elevates bass punch.' },
];

const FILTER_TAGS = ['All', 'Lighting', 'Infotainment', 'Vision', 'Comfort', 'Upholstery'];

// 5 Architectural Groups
const INTERIOR_GROUPS = [
  {
    id: 'lighting',
    tag: 'GROUP 01 // LIGHTING ARCHITECTURE',
    title: '18-Zone Ambient Lighting & Illumination',
    slugs: ['ambient-lights', 'roof-led-vip-light', 'mobile-holder-door-foot-lights', 'foot-step-patti']
  },
  {
    id: 'infotainment',
    tag: 'GROUP 02 // COCKPIT & ACOUSTICS',
    title: 'Touchscreen Infotainment, DSP & Audio',
    slugs: ['infotainment-systems', 'speakers', 'woofers-amplifiers', 'oem-infotainment', 'steering-covers-controls']
  },
  {
    id: 'vision',
    tag: 'GROUP 03 // VISION & DRIVER ASSISTANCE',
    title: '360° Cameras & AI Dashcam Systems',
    slugs: ['oem-camera-360-camera', 'dash-cameras-ai-dongles']
  },
  {
    id: 'comfort',
    tag: 'GROUP 04 // CABIN ERGONOMICS',
    title: 'Comfort, 7D Mats & Sun Protection',
    slugs: ['floor-mats', 'neck-pillows-seat-cushions', 'center-seat-arm-rest', 'curtains-air-fresheners', 'sun-control-films']
  },
  {
    id: 'upholstery',
    tag: 'GROUP 05 // BESPOKE CRAFTSMANSHIP',
    title: 'Custom Leather Upholstery & Cabin Styling',
    slugs: ['premium-car-seat-covers', 'dashboard-door-pad-customization', 'parcel-trays']
  }
];

export default function InteriorCategoryPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const filteredServices = useMemo(() => {
    let list = interiorAccessories;
    if (activeTag !== 'All') {
      const group = INTERIOR_GROUPS.find(g => g.id === activeTag.toLowerCase());
      if (group) {
        list = list.filter(s => group.slugs.includes(s.slug));
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeTag]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Interior Car Accessories' },
  ];

  const pageTitle = 'Interior Car Accessories in Chennai | Best Car Accessories NMS Road';
  const pageDescription = 'Explore all 20 interior car customization options at Best Car Accessories, NMS Road, Chennai. 18-zone ambient lighting, custom seat covers, touchscreen infotainment, component audio, 360 cameras, and 7D mats.';

  const isGroupedView = activeTag === 'All' && !search.trim();

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${business.siteUrl}/interior-car-accessories-chennai`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="cat-breadcrumb-wrap">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Hero */}
      <section className="cat-hero cat-hero--interior section--dark">
        <div className="cat-hero__overlay" />
        <div className="container cat-hero__content">
          <span className="section-label">3D Cockpit Customization Studio</span>
          <h1 className="cat-hero__title">Interior Car Accessories<br />in Chennai</h1>
          <p className="cat-hero__subtitle">
            Redefine your interior driving sanctuary with 18-zone ambient light choreography, cinematic touchscreen infotainment, audiophile sound stages, and bespoke tailored leather upholstery.
          </p>
          <div className="cat-hero__actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Book Interior Fitting</Link>
            <a
              href={business.whatsapp ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hi, I am interested in interior car customization for my car.')}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="cat-filter-section">
        <div className="container">
          <div className="cat-search-row">
            <div className="cat-search-wrap">
              <Search size={18} className="cat-search-icon" />
              <input
                type="search"
                placeholder="Search 20 interior upgrades (e.g., ambient light, seat cover, infotainment)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="cat-search-input"
                aria-label="Search interior accessories"
              />
            </div>
          </div>
          <div className="cat-tags">
            {FILTER_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`cat-tag ${activeTag === tag ? 'cat-tag--active' : ''}`}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Display */}
      <section className="cat-grid-section">
        <div className="container">
          
          {isGroupedView ? (
            // Grouped Visual View (5 Groups)
            INTERIOR_GROUPS.map((group) => {
              const groupItems = interiorAccessories.filter(s => group.slugs.includes(s.slug));
              if (groupItems.length === 0) return null;

              return (
                <div key={group.id} className="cat-group-block" style={{ marginBottom: 'var(--space-10)' }}>
                  <div className="cat-group-header">
                    <div>
                      <span className="cat-group-tag">{group.tag}</span>
                      <h2 className="cat-group-title">{group.title}</h2>
                    </div>
                    <span className="cat-group-count">{groupItems.length} UPGRADES</span>
                  </div>

                  <div className="cat-grid">
                    {groupItems.map((service, idx) => (
                      <ServiceCard key={service.id} service={service} index={idx + 1} dark={true} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Filtered or Search View
            filteredServices.length === 0 ? (
              <div className="cat-empty">
                <p>No interior accessories found matching your criteria. <button onClick={() => { setSearch(''); setActiveTag('All'); }} className="cat-empty-reset">Reset Filters</button></p>
              </div>
            ) : (
              <div className="cat-grid">
                {filteredServices.map((service, idx) => (
                  <ServiceCard key={service.id} service={service} index={idx + 1} dark={true} />
                ))}
              </div>
            )
          )}

        </div>
      </section>

      {/* FAQ */}
      <section className="cat-faq">
        <div className="container cat-faq__inner">
          <span className="section-label">Cabin Engineering</span>
          <h2 className="section-title">Interior Customization FAQ</h2>
          <div className="divider" />
          <FAQ faqs={CATEGORY_FAQS} />
        </div>
      </section>

      {/* Closing CTA */}
      <CTASection
        title="Ready to Upgrade Your Car's Cabin?"
        subtitle="Schedule your slot at Best Car Accessories, NMS Road, Chennai for professional consultation."
        primaryCta={{ label: 'Schedule Consultation', href: '/contact' }}
        whatsappMessage="Hi Best Car Accessories, I am interested in interior car customization for my car."
        dark={true}
      />
    </>
  );
}
