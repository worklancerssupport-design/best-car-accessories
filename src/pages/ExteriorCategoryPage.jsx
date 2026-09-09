import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import exteriorData from '../data/products/exterior.json';
import business from '../data/business.json';
import faqsData from '../data/faqs.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import FAQ from '../components/ui/FAQ/FAQ';
import ServiceCard from '../components/ui/ServiceCard/ServiceCard';
import './CategoryPage.css';
import { Search } from 'lucide-react';

const CATEGORY_FAQS = faqsData.exterior;

const FILTER_TAGS = ['All', 'Lighting', 'Protection', 'Styling', 'Utility'];

// 4 Architectural Groups
const EXTERIOR_GROUPS = [
  {
    id: 'lighting',
    tag: 'GROUP 01 // LIGHTING ARCHITECTURE',
    title: 'High-Performance Lighting & Optics',
    slugs: ['fog-light-fog-projector', 'headlight-led-upgrade', 'drl-headlight-fog', 'horn-parking-leds', 'door-logo-lights', 'wiring-kits-cutouts']
  },
  {
    id: 'protection',
    tag: 'GROUP 02 // ARMOR & DEFENSE',
    title: 'Vehicle Armor & Body Protection',
    slugs: ['anti-rat-machine-rat-mesh', 'windshield-anti-glare-film', 'door-visors-side-claddings', 'mud-flaps', 'bonnet-letters-damping', 'wiper-blades']
  },
  {
    id: 'styling',
    tag: 'GROUP 03 // AERODYNAMICS',
    title: 'Aerodynamics & Exterior Styling',
    slugs: ['roof-rails-sharkfin-antenna', 'rear-spoiler-tail-light', 'front-rear-bumpers', 'side-foot-steps', 'heavy-clamp-post-covers', 'box-clamp-wheel-cups']
  },
  {
    id: 'utility',
    tag: 'GROUP 04 // ELECTRONICS & UTILITY',
    title: 'Utility, Safety & Custom Hardware',
    slugs: ['reverse-camera-sensor', 'number-plates-frames']
  }
];

export default function ExteriorCategoryPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const filteredServices = useMemo(() => {
    let list = exteriorData.items;
    if (activeTag !== 'All') {
      const group = EXTERIOR_GROUPS.find(g => g.id === activeTag.toLowerCase());
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
    { label: 'Exterior Car Accessories' },
  ];

  const pageTitle = 'Exterior Car Accessories in Chennai | Best Car Accessories NMS Road';
  const pageDescription = 'Explore all 20 exterior car accessories at Best Car Accessories, NMS Road, Chennai. High-performance fog lights, LED headlight upgrades, DRLs, aerodynamic spoilers, side foot steps, and OEM fitment.';

  const isGroupedView = activeTag === 'All' && !search.trim();

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${business.siteUrl}/exterior-car-accessories-chennai`} />
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
      <section className="cat-hero section--dark">
        <div className="cat-hero__overlay" />
        <div className="container cat-hero__content">
          <span className="section-label">3D Exterior Customization Studio</span>
          <h1 className="cat-hero__title">Exterior Car Accessories<br />in Chennai</h1>
          <p className="cat-hero__subtitle">
            Transform your vehicle's road presence with high-performance optical lighting, aerodynamic styling, rugged protection, and zero-wire-cut installation.
          </p>
          <div className="cat-hero__actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Book Fitment</Link>
            <a
              href={business.whatsapp ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hi, I am interested in exterior car accessories for my car.')}` : '#'}
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
                placeholder="Search 20 exterior upgrades (e.g., fog light, spoiler, bumper)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="cat-search-input"
                aria-label="Search exterior accessories"
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
            // Grouped Visual View (Lighting, Protection, Styling, Utility)
            EXTERIOR_GROUPS.map((group, groupIdx) => {
              const groupItems = exteriorData.items.filter(s => group.slugs.includes(s.slug));
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
                <p>No accessories found matching your criteria. <button onClick={() => { setSearch(''); setActiveTag('All'); }} className="cat-empty-reset">Reset Filters</button></p>
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
          <span className="section-label">Technical Inquiries</span>
          <h2 className="section-title">Exterior Fitment FAQ</h2>
          <div className="divider" />
          <FAQ faqs={CATEGORY_FAQS} />
        </div>
      </section>

      {/* Closing CTA */}
      <CTASection
        title="Ready to Transform Your Vehicle's Exterior?"
        subtitle="Contact our technicians with your car model for accurate compatibility and pricing."
        primaryCta={{ label: 'Book Fitment Slot', href: '/contact' }}
        whatsappMessage="Hi Best Car Accessories, I am interested in exterior car accessories for my car."
        dark={true}
      />
    </>
  );
}
