import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import interiorData from '../data/products/interior.json';
import business from '../data/business.json';
import faqsData from '../data/faqs.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import FAQ from '../components/ui/FAQ/FAQ';
import ServiceCard from '../components/ui/ServiceCard/ServiceCard';
import './CategoryPage.css';
import { Search, ChevronRight, MessageCircle } from 'lucide-react';

const CATEGORY_FAQS = faqsData.interior;
const FILTER_TAGS = interiorData.filterTags;
const INTERIOR_GROUPS = interiorData.groups;

export default function InteriorCategoryPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const filteredServices = useMemo(() => {
    let list = interiorData.items;
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
  const whatsappHref = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hi, I am interested in interior car customization for my car.')}`
    : '#';

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
      <section className="cat-hero cat-hero--interior" aria-labelledby="cat-hero-title">
        <div className="cat-hero__content">
          <span className="section-label">3D Cockpit Customization Studio</span>
          <h1 id="cat-hero-title" className="cat-hero__title">
            Interior Car <br /><span className="about-hero__title-accent">Accessories</span><br />in Chennai
          </h1>
          <p className="cat-hero__subtitle">
            Redefine your interior driving sanctuary with 18-zone ambient light choreography, cinematic touchscreen infotainment, audiophile sound stages, and bespoke tailored leather upholstery.
          </p>
          <div className="cat-hero__actions">
            <Link to="/contact" className="cat-hero__btn cat-hero__btn--primary">
              <span>Book Fitting</span>
              <ChevronRight size={16} className="cat-hero__btn-icon" />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cat-hero__btn cat-hero__btn--secondary"
            >
              <span>WhatsApp Us</span>
              <MessageCircle size={16} className="cat-hero__btn-icon" />
            </a>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="cat-filter-section" aria-label="Filter interior accessories">
        <div className="container">
          <div className="cat-filter-grid">
            <div className="cat-search-col">
              <span className="cat-filter-eyebrow">Search</span>
              <div className="cat-search-wrap">
                <Search size={16} className="cat-search-icon" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Ambient light, seat cover, infotainment…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="cat-search-input"
                  aria-label="Search interior accessories"
                />
              </div>
            </div>
            <div className="cat-tags-col">
              <span className="cat-filter-eyebrow">Filter by group</span>
              <div className="cat-tags" role="tablist" aria-label="Accessory groups">
                {FILTER_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`cat-tag ${activeTag === tag ? 'cat-tag--active' : ''}`}
                    aria-pressed={activeTag === tag}
                    role="tab"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Display */}
      <section className="cat-grid-section" aria-label="Interior accessory catalog">
        <div className="container">
          {isGroupedView ? (
            INTERIOR_GROUPS.map((group, groupIdx) => {
              const groupItems = interiorData.items.filter(s => group.slugs.includes(s.slug));
              if (groupItems.length === 0) return null;

              return (
                <div key={group.id} className="cat-group-block">
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
          ) : filteredServices.length === 0 ? (
            <div className="cat-empty" role="status">
              <p>
                No interior accessories found matching your criteria.
                <button
                  onClick={() => { setSearch(''); setActiveTag('All'); }}
                  className="cat-empty-reset"
                  aria-label="Reset search and filters"
                >
                  Reset Filters
                </button>
              </p>
            </div>
          ) : (
            <div className="cat-grid">
              {filteredServices.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx + 1} dark={true} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="cat-faq" aria-labelledby="cat-faq-title">
        <div className="container">
          <header className="cat-faq__header">
            <span className="section-label">Cabin Engineering</span>
            <h2 id="cat-faq-title" className="cat-faq__title">
              Interior Customization FAQ
            </h2>
            <p className="cat-faq__subtitle">
              Common questions about our interior customization process, materials, and warranty — answered by our Chennai technicians.
            </p>
          </header>
          <div className="cat-faq__inner">
            <FAQ faqs={CATEGORY_FAQS} />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <CTASection
        title="Ready to Upgrade Your Car's Cabin?"
        subtitle="Schedule your slot at Best Car Accessories, NMS Road, Chennai for professional consultation."
        primaryCta={{ label: 'Book Fitment Slot', href: '/contact' }}
        whatsappMessage="Hi Best Car Accessories, I am interested in interior car customization for my car."
        dark={true}
      />
    </>
  );
}
