import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import faqsData from '../data/faqs.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import FAQ from '../components/ui/FAQ/FAQ';
import ProcessJourney from '../components/sections/ProcessJourney/ProcessJourney';
import './AboutPage.css';
import {
  CheckCircle2,
  Award,
  Users,
  Car,
  Wrench,
  Grid3X3,
  Star,
  MapPin,
  Navigation,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

const whyChooseFeatures = [
  {
    num: "01",
    icon: <Award size={24} />,
    title: "15+ Years Experience",
    description: "Deep expertise in automotive electricals, interior upholstery, and structural accessories."
  },
  {
    num: "02",
    icon: <Users size={24} />,
    title: "1000+ Clients Served",
    description: "Trusted by car owners across Chennai, from daily hatchbacks to premium luxury SUVs."
  },
  {
    num: "03",
    icon: <Car size={24} />,
    title: "Complete Customization",
    description: "End-to-end upgrades under one roof — styling, lighting, acoustics, and electronic safety."
  },
  {
    num: "04",
    icon: <Wrench size={24} />,
    title: "Professional Installation",
    description: "Zero wire-cutting standard with OEM-grade couplers, neat conduit routing, and clean fitment."
  },
  {
    num: "05",
    icon: <Grid3X3 size={24} />,
    title: "Wide Accessory Range",
    description: "Extensive selection of verified brands, genuine fittings, and cutting-edge tech gadgets."
  },
  {
    num: "06",
    icon: <Star size={24} />,
    title: "Personalized Solutions",
    description: "Tailored accessory recommendations designed around your specific vehicle and driving needs."
  }
];

export default function AboutPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'About Us' }];
  const whatsappMessage = encodeURIComponent("Hello Best Car Accessories, I would like to visit your studio at Royapettah for car upgrades.");
  const whatsappLink = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;

  return (
    <>
      <Helmet>
        <title>About Best Car Accessories | Royapettah, Chennai | 15+ Years Experience</title>
        <meta name="description" content="Learn about Best Car Accessories in Royapettah, Chennai — 15+ years of experience serving 1000+ clients with premium car accessories, interior and exterior customization, professional installation." />
        <link rel="canonical" href={`${business.siteUrl}/about`} />
        <meta property="og:title" content="About Best Car Accessories | Royapettah, Chennai" />
        <meta property="og:description" content="Best Car Accessories — Chennai's trusted destination for premium car accessories and customization. 15+ years experience, 1000+ clients served." />
      </Helmet>

      <div className="about-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      {/* Hero */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__overlay" aria-hidden="true" />
        <div className="container about-hero__content">
          <span className="section-label">Automotive Heritage Studio</span>
          <h1 id="about-hero-title" className="about-hero__title">
            Chennai's <span className="about-hero__title-accent">Trusted</span> Car
            <br />Accessories Destination
          </h1>
          <p className="about-hero__subtitle">
            Best Car Accessories next to Woodlands Theater, Royapettah, Chennai — your one-stop destination for premium car accessories, exterior upgrades, and professional installation.
          </p>
        </div>
      </section>

      {/* Intro — Our Story & Heritage */}
      <section className="about-intro" aria-labelledby="about-intro-title">
        <div className="container about-intro__grid">
          <div className="about-intro__text">
            <span className="section-label">Our Story &amp; Heritage</span>
            <h2 id="about-intro-title" className="section-title">
              Your Car. Your Style.
              <br /><span className="section-title__accent">Our Expertise.</span>
            </h2>
            <div className="divider" aria-hidden="true" />
            <p>
              Best Car Accessories has been serving car owners in Chennai from our studio on Westcott Road, Royapettah for over 15 years. We started with a simple belief: every car owner deserves access to quality accessories and certified professional installation — not just premium car buyers.
            </p>
            <p>
              Over the years we have grown to offer one of Chennai's most comprehensive ranges of car accessories, covering everything from exterior lighting and bumpers to full interior customization, infotainment systems, speakers, cameras, ambient lighting, and premium seat covers.
            </p>
            <p>
              Our approach is simple: understand what each customer wants for their specific car, recommend the right accessories, and install them to a high standard with zero wire cutting. We work with a wide range of car models — hatchbacks, sedans, SUVs, and luxury vehicles.
            </p>

            <ul className="about-features" aria-label="Studio highlights">
              {[
                { icon: <Award size={20} />, text: '15+ Years of car accessories experience' },
                { icon: <Users size={20} />, text: 'Over 1,000 clients served across Chennai' },
                { icon: <Car size={20} />, text: 'Complete interior and exterior accessory range' },
                { icon: <Wrench size={20} />, text: 'Professional installation with clean OEM couplers' },
                { icon: <CheckCircle2 size={20} />, text: 'Lighting, audio, infotainment, cameras and more' },
                { icon: <CheckCircle2 size={20} />, text: 'Personalized recommendations for your car' },
              ].map((f, i) => (
                <li className="about-feature" key={i}>
                  <span className="about-feature__icon" aria-hidden="true">{f.icon}</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="about-intro__visual" aria-label="Studio snapshot">
            <div className="about-stats">
              {[
                { num: `${business.stats.yearsExperience}+`, label: 'Years of Experience', desc: 'Operating in Royapettah, Chennai' },
                { num: `${business.stats.clientsServed}+`, label: 'Clients Served', desc: 'Car owners across Chennai' },
                { num: `${business.stats.accessoryCategories}+`, label: 'Accessory Categories', desc: 'Interior, exterior and custom mods' },
              ].map((s, i) => (
                <div className="about-stat" key={i}>
                  <div className="about-stat__num">{s.num}</div>
                  <div className="about-stat__label">{s.label}</div>
                  <div className="about-stat__desc">{s.desc}</div>
                </div>
              ))}
            </div>

            <figure className="about-img-wrap">
              <img
                src="/images/about/about-lifestyle.jpg"
                alt="Best Car Accessories luxury customization studio in Royapettah, Chennai"
                loading="lazy"
              />
            </figure>
          </aside>
        </div>
      </section>

      {/* Why Choose Best Car Accessories */}
      <section className="about-mission" aria-labelledby="about-mission-title">
        <div className="container">
          <header className="section-header section-header--center">
            <span className="section-label">Engineering Standards</span>
            <h2 id="about-mission-title" className="section-title">
              Why Choose <span className="section-title__accent">Best Car Accessories</span>
            </h2>
            <div className="divider" aria-hidden="true" />
            <p className="section-subtitle">
              Chennai's trusted destination for precision car modification, certified plug-and-play fitment, and transparent service.
            </p>
          </header>

          <div className="about-mission__grid">
            {whyChooseFeatures.map(feature => (
              <article key={feature.num} className="about-mission-card card-accent">
                <div className="about-mission-card__top">
                  <span className="about-mission-card__num">{feature.num}</span>
                  <span className="about-mission-card__icon" aria-hidden="true">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="about-mission-card__title">{feature.title}</h3>
                <p className="about-mission-card__desc">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Accessory Range */}
      <section className="about-range" aria-labelledby="about-range-title">
        <div className="container">
          <header className="section-header section-header--left">
            <span className="section-label">Core Specializations</span>
            <h2 id="about-range-title" className="section-title">
              Our Accessory <span className="section-title__accent">Range</span>
            </h2>
            <div className="divider" aria-hidden="true" />
          </header>

          <div className="about-range__grid">
            {[
              { title: 'Exterior Accessories', items: ['Fog Lights & Projectors', 'LED Headlights & DRL', 'Rear Spoilers', 'Bumpers', 'Roof Rails', 'Side Foot Steps', 'Mud Flaps', 'Door Visors & Claddings'] },
              { title: 'Interior Accessories', items: ['Premium Seat Covers', 'Ambient Lighting', 'Floor Mats', 'Steering Covers', 'Neck Pillows & Cushions', 'Roof LEDs', 'Sun Control Films', 'Dashboard Customization'] },
              { title: 'Infotainment & Audio', items: ['Infotainment Systems', 'OEM Infotainment', 'Speakers', 'Woofers & Amplifiers', 'Steering Controls', 'Dash Cameras', 'OEM & 360° Cameras', 'AI Dongles'] },
              { title: 'Lighting & Safety', items: ['Ambient Lights', 'Door Foot Lights', 'Parking Sensors', 'Reverse Camera', 'Fog Projectors', 'DRL Lights', 'Parking LEDs', 'Anti-Rat Protection'] },
            ].map((col, i) => (
              <article className="about-range__col card-accent" key={i}>
                <h3 className="about-range__col-title">{col.title}</h3>
                <ul>
                  {col.items.map((item, j) => (
                    <li className="about-range__item" key={j}>
                      <CheckCircle2 size={14} className="about-range__item-icon" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How We Upgrade Your Car */}
      <ProcessJourney />

      {/* Visit Best Car Accessories & Maps */}
      <section className="about-visit" aria-labelledby="about-visit-title">
        <div className="container">
          <header className="section-header section-header--center">
            <span className="section-label">Studio Directions</span>
            <h2 id="about-visit-title" className="section-title">
              Visit <span className="section-title__accent">Best Car Accessories</span>
            </h2>
            <div className="divider" aria-hidden="true" />
            <p className="section-subtitle">
              Centrally located in Royapettah, Chennai. Drive in with your car for an expert consultation and live product demonstration.
            </p>
          </header>

          <div className="about-visit__grid">
            {/* Location Info Card */}
            <article className="about-location-card card-accent">
              <header className="about-location-card__header">
                <span className="about-location-card__pin" aria-hidden="true">
                  <MapPin size={24} />
                </span>
                <div>
                  <h3 className="about-location-card__name">Best Car Accessories</h3>
                  <span className="about-location-card__area">Royapettah, Chennai</span>
                </div>
              </header>

              <ul className="about-location-card__details">
                <li className="about-loc-item">
                  <Navigation size={18} className="about-loc-item__icon" aria-hidden="true" />
                  <div>
                    <strong>Studio Address</strong>
                    <p>{business.address}</p>
                    <span className="about-loc-item__landmark">Landmark: Next to Woodlands Theater</span>
                  </div>
                </li>

                <li className="about-loc-item">
                  <Clock size={18} className="about-loc-item__icon" aria-hidden="true" />
                  <div>
                    <strong>Working Hours</strong>
                    <p>{business.hours.weekdays.days}: {business.hours.weekdays.open} – {business.hours.weekdays.close}</p>
                    <p>{business.hours.sunday.days}: {business.hours.sunday.open} – {business.hours.sunday.close}</p>
                  </div>
                </li>

                <li className="about-loc-item">
                  <Phone size={18} className="about-loc-item__icon" aria-hidden="true" />
                  <div>
                    <strong>Direct Hotline</strong>
                    <p>{business.phone}</p>
                  </div>
                </li>
              </ul>

              <div className="about-location-card__actions">
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Navigation size={16} aria-hidden="true" />
                  <span>Get Directions</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </article>

            {/* Interactive Google Maps Frame */}
            <div className="about-map-wrapper card-accent">
              <iframe
                src={business.mapUrl}
                title="Best Car Accessories location map — Royapettah, Chennai"
                className="about-map-wrapper__iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="about-map-wrapper__bar">
                <span className="about-map-wrapper__badge">
                  <span className="about-map-wrapper__live-dot" aria-hidden="true" />
                  <span>Live Studio Map · Royapettah</span>
                </span>
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-map-wrapper__link"
                >
                  <span>Open Full Map</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="about-faq" aria-labelledby="about-faq-title">
        <div className="container about-faq__inner">
          <span className="section-label">Common Questions</span>
          <h2 id="about-faq-title" className="section-title">
            About <span className="section-title__accent">Best Car Accessories</span>
          </h2>
          <div className="divider" aria-hidden="true" />
          <FAQ faqs={faqsData.about} />
        </div>
      </section>

      <CTASection
        title="Visit Us in Royapettah, Chennai"
        subtitle="Come in with your car or WhatsApp your requirements and we'll help you choose the right accessories."
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        whatsappMessage="Hi Best Car Accessories, I would like to know more about your car accessories."
        dark={true}
      />
    </>
  );
}