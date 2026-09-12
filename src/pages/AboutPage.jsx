import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import faqsData from '../data/faqs.json';
import aboutData from '../data/about.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import FAQ from '../components/ui/FAQ/FAQ';
import ProcessJourney from '../components/sections/ProcessJourney/ProcessJourney';
import './AboutPage.css';
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

const standards = aboutData.standards;
const rangeGroups = aboutData.rangeGroups;

export default function AboutPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'About Us' }];
  const whatsappMessage = encodeURIComponent(
    "Hello Best Car Accessories NMS, I would like to visit your studio at Royapettah for car upgrades."
  );
  const whatsappLink = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;

  return (
    <>
      <Helmet>
        <title>About Best Car Accessories NMS | Royapettah, Chennai | 15+ Years Experience</title>
        <meta name="description" content="Learn about Best Car Accessories NMS in Royapettah, Chennai — 15+ years of experience serving 1000+ clients with premium car accessories, interior and exterior customization, professional installation." />
        <link rel="canonical" href={`${business.siteUrl}/about`} />
        <meta property="og:title" content="About Best Car Accessories NMS | Royapettah, Chennai" />
        <meta property="og:description" content="Best Car Accessories NMS — Chennai's trusted destination for premium car accessories and customization. 15+ years experience, 1000+ clients served." />
      </Helmet>

      <div className="about-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      {/* HERO — matches .cat-hero pattern */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__content">
          <span className="section-label">Automotive Heritage Studio</span>
          <h1 id="about-hero-title" className="about-hero__title">
            Chennai's<br/><span className="about-hero__title-accent">Trusted </span>Car<br/>Accessories<br/>Destination
          </h1>
          <p className="about-hero__subtitle">
            Best Car Accessories NMS next to Woodlands Theater, Royapettah, Chennai — premium car
            accessories, exterior upgrades, and certified professional installation.
          </p>
        </div>
      </section>

      {/* STORY + STATS — centered header + 2-col content */}
      <section className="about-story" aria-labelledby="about-story-title">
        <div className="container">
          <header className="about-story__header">
            <span className="section-label">Our Story &amp; Heritage</span>
            <h2 id="about-story-title" className="about-story__title">
              Your Car.
              <br />
              Our Expertise.
            </h2>
          </header>

          <div className="about-story__grid">
            <div className="about-story__text">
              <p>
                Best Car Accessories NMS has been serving car owners in Chennai from our studio on
                Westcott Road, Royapettah for over 15 years. We started with a simple belief:
                every car owner deserves access to quality accessories and certified professional
                installation — not just premium car buyers.
              </p>
              <p>
                Today we offer one of Chennai's most comprehensive accessory ranges — exterior
                lighting, bumpers, interior customization, infotainment, audio, ambient lighting,
                and premium seat covers. We work with a wide range of car models, from hatchbacks
                and sedans to SUVs and luxury vehicles, and we install every accessory to a high
                standard with zero wire cutting.
              </p>
            </div>

            <div className="about-story__stats">
              {[
                { num: `${business.stats.yearsExperience}+`, label: 'Years of Experience' },
                { num: `${business.stats.clientsServed}+`, label: 'Clients Served' },
                { num: `${business.stats.accessoryCategories}+`, label: 'Accessory Categories' },
              ].map((s, i) => (
                <div className="about-story__stat" key={i}>
                  <span className="about-story__stat-num">{s.num}</span>
                  <span className="about-story__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STANDARDS — centered header + 3-col grid */}
      <section className="about-standards" aria-labelledby="about-standards-title">
        <div className="container">
          <header className="about-standards__header">
            <span className="section-label">Engineering Standards</span>
            <h2 id="about-standards-title" className="about-standards__title">
              Why Choose Us?
            </h2>
            <p className="about-standards__subtitle">
              Chennai's trusted destination for precision car modification, certified
              plug-and-play fitment, and transparent service.
            </p>
          </header>

          <div className="about-standards__grid">
            {standards.map((item) => (
              <article className="about-standards__card" key={item.num}>
                <span className="about-standards__num">{item.num}</span>
                <h3 className="about-standards__card-title">{item.title}</h3>
                <p className="about-standards__card-desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RANGE — centered header + 4-col grid */}
      <section className="about-range" aria-labelledby="about-range-title">
        <div className="container">
          <header className="about-range__header">
            <span className="section-label">Core Specializations</span>
            <h2 id="about-range-title" className="about-range__title">
              Our Accessory Range
            </h2>
          </header>

          <div className="about-range__grid">
            {rangeGroups.map((group, i) => (
              <article className="about-range__group" key={i}>
                <h3 className="about-range__group-title">{group.title}</h3>
                <ul className="about-range__list">
                  {group.items.map((item, j) => (
                    <li className="about-range__item" key={j}>
                      <span className="about-range__dot" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — shared component, untouched */}
      <ProcessJourney />

      {/* VISIT — centered header + 2-col (location + map) */}
      <section className="about-visit" aria-labelledby="about-visit-title">
        <div className="container">
          <header className="about-visit__header">
            <span className="section-label">Studio Directions</span>
            <h2 id="about-visit-title" className="about-visit__title">
              Visit Us
            </h2>
            <p className="about-visit__subtitle">
              Centrally located in Royapettah, Chennai. Drive in for an expert consultation
              and live product demonstration.
            </p>
          </header>

          <div className="about-visit__grid">
            <article className="about-visit__card">
              <header className="about-visit__card-header">
                <span className="about-visit__pin" aria-hidden="true">
                  <MapPin size={22} />
                </span>
                <div>
                  <h3 className="about-visit__name">Best Car Accessories NMS</h3>
                  <span className="about-visit__area">Royapettah, Chennai</span>
                </div>
              </header>

              <ul className="about-visit__details">
                <li className="about-visit__detail">
                  <Navigation size={16} className="about-visit__detail-icon" aria-hidden="true" />
                  <div>
                    <span className="about-visit__detail-label">Studio Address</span>
                    <p>{business.address}</p>
                    <span className="about-visit__detail-meta">Landmark: Next to Woodlands Theater</span>
                  </div>
                </li>
                <li className="about-visit__detail">
                  <Clock size={16} className="about-visit__detail-icon" aria-hidden="true" />
                  <div>
                    <span className="about-visit__detail-label">Working Hours</span>
                    <p>{business.hours.weekdays.days}: {business.hours.weekdays.open} – {business.hours.weekdays.close}</p>
                    <p>{business.hours.sunday.days}: {business.hours.sunday.open} – {business.hours.sunday.close}</p>
                  </div>
                </li>
                <li className="about-visit__detail">
                  <Phone size={16} className="about-visit__detail-icon" aria-hidden="true" />
                  <div>
                    <span className="about-visit__detail-label">Direct Hotline</span>
                    <p>{business.phone}</p>
                    {business.phone2 && <p>{business.phone2}</p>}
                  </div>
                </li>
              </ul>

              <div className="about-visit__actions">
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-visit__btn"
                >
                  <span>Get Directions</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-visit__btn"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </article>

            <div className="about-visit__map">
              <iframe
                src={business.mapUrl}
                title="Best Car Accessories NMS location map — Royapettah, Chennai"
                className="about-visit__map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — centered, narrow column */}
      <section className="about-faq" aria-labelledby="about-faq-title">
        <div className="container">
          <header className="about-faq__header">
            <span className="section-label">Common Questions</span>
            <h2 id="about-faq-title" className="about-faq__title">
              About Best Car Accessories NMS
            </h2>
          </header>
          <div className="about-faq__wrap">
            <FAQ faqs={faqsData.about} />
          </div>
        </div>
      </section>

      <CTASection
        title="Visit Us in Royapettah, Chennai"
        subtitle="Come in with your car or WhatsApp your requirements and we'll help you choose the right accessories."
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        whatsappMessage="Hi Best Car Accessories NMS, I would like to know more about your car accessories."
        dark={true}
      />
    </>
  );
}
