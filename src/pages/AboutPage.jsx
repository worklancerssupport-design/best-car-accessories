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
      <section className="about-hero section--dark">
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <span className="section-label">Automotive Heritage Studio</span>
          <h1 className="about-hero__title">Chennai's Trusted Car<br />Accessories Destination</h1>
          <p className="about-hero__subtitle">
            Best Car Accessories next to Woodlands Theater, Royapettah, Chennai — your one-stop destination for premium car accessories,
            interior customization, and exterior upgrades professionally installed.
          </p>
        </div>
      </section>

      {/* Main About */}
      <section className="section section--dark-2 about-main">
        <div className="container about-main__grid">
          <div className="about-main__text">
            <span className="section-label">Our Story & Heritage</span>
            <h2 className="section-title">Your Car. Your Style.<br />Our Expertise.</h2>
            <div className="divider" />
            <p>
              Best Car Accessories has been serving car owners in Chennai from our studio on Westcott Road, Royapettah for over 15 years.
              We started with a simple belief: every car owner deserves access to quality accessories
              and certified professional installation — not just premium car buyers.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Over the years we have grown to offer one of Chennai's most comprehensive ranges of car accessories,
              covering everything from exterior lighting and bumpers to full interior customization, infotainment systems,
              speakers, cameras, ambient lighting, and premium seat covers.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Our approach is simple: understand what each customer wants for their specific car,
              recommend the right accessories, and install them to a high standard with zero wire cutting.
              We work with a wide range of car models — hatchbacks, sedans, SUVs, and luxury vehicles.
            </p>
            <div className="about-features">
              {[
                { icon: <Award size={20}/>, text: '15+ Years of car accessories experience' },
                { icon: <Users size={20}/>, text: 'Over 1,000 clients served across Chennai' },
                { icon: <Car size={20}/>, text: 'Complete interior and exterior accessory range' },
                { icon: <Wrench size={20}/>, text: 'Professional installation with clean OEM couplers' },
                { icon: <CheckCircle2 size={20}/>, text: 'Lighting, audio, infotainment, cameras and more' },
                { icon: <CheckCircle2 size={20}/>, text: 'Personalized recommendations for your car' },
              ].map((f, i) => (
                <div className="about-feature" key={i}>
                  <span className="about-feature__icon">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-main__visual">
            <div className="about-stats">
              {[
                { num: `${business.stats.yearsExperience}+`, label: 'Years of Experience', desc: 'Operating in Royapettah, Chennai' },
                { num: `${business.stats.clientsServed}+`, label: 'Clients Served', desc: 'Car owners across Chennai' },
                { num: `${business.stats.accessoryCategories}+`, label: 'Accessory Categories', desc: 'Interior, exterior and custom mods' },
              ].map((s, i) => (
                <div className="about-stat bracket-box" key={i}>
                  <div className="about-stat__num">{s.num}</div>
                  <div className="about-stat__label">{s.label}</div>
                  <div className="about-stat__desc">{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="about-img-wrap bracket-box">
              <img
                src="/images/about/about-lifestyle.jpg"
                alt="Best Car Accessories Luxury Customization Studio Chennai"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Best Car Accessories */}
      <section className="section section--dark about-why-choose-page">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">Engineering Standards</span>
            <h2 className="section-title text-white">Why Choose Best Car Accessories</h2>
            <div className="divider" style={{ margin: '0.5rem auto 1.2rem' }} />
            <p className="section-subtitle section-subtitle--light" style={{ margin: '0 auto', maxWidth: 680 }}>
              Chennai’s trusted destination for precision car modification, certified plug-and-play fitment, and transparent service.
            </p>
          </div>

          <div className="about-page-features-grid">
            {whyChooseFeatures.map(feature => (
              <div key={feature.num} className="about-feature-card bracket-box">
                <div className="about-feature-card-top">
                  <span className="about-feature-card-num">{feature.num}</span>
                  <div className="about-feature-card-icon">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="about-feature-card-title">{feature.title}</h3>
                <p className="about-feature-card-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section section--dark-2 about-services">
        <div className="container">
          <span className="section-label">Core Specializations</span>
          <h2 className="section-title">Our Accessory Range</h2>
          <div className="divider" />
          <div className="about-services__grid">
            {[
              { title: 'Exterior Accessories', items: ['Fog Lights & Projectors', 'LED Headlights & DRL', 'Rear Spoilers', 'Bumpers', 'Roof Rails', 'Side Foot Steps', 'Mud Flaps', 'Door Visors & Claddings'] },
              { title: 'Interior Accessories', items: ['Premium Seat Covers', 'Ambient Lighting', 'Floor Mats', 'Steering Covers', 'Neck Pillows & Cushions', 'Roof LEDs', 'Sun Control Films', 'Dashboard Customization'] },
              { title: 'Infotainment & Audio', items: ['Infotainment Systems', 'OEM Infotainment', 'Speakers', 'Woofers & Amplifiers', 'Steering Controls', 'Dash Cameras', 'OEM & 360° Cameras', 'AI Dongles'] },
              { title: 'Lighting & Safety', items: ['Ambient Lights', 'Door Foot Lights', 'Parking Sensors', 'Reverse Camera', 'Fog Projectors', 'DRL Lights', 'Parking LEDs', 'Anti-Rat Protection'] },
            ].map((col, i) => (
              <div className="about-services__col bracket-box" key={i}>
                <h3 className="about-services__col-title">{col.title}</h3>
                <ul>
                  {col.items.map((item, j) => (
                    <li key={j} className="about-services__item">
                      <CheckCircle2 size={14} className="text-cyan" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Upgrade Your Car */}
      <ProcessJourney />

      {/* Visit Best Car Accessories & Google Maps */}
      <section className="section section--dark about-visit-page">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">Studio Directions</span>
            <h2 className="section-title text-white">Visit Best Car Accessories</h2>
            <div className="divider" style={{ margin: '0.5rem auto 1.2rem' }} />
            <p className="section-subtitle section-subtitle--light" style={{ margin: '0 auto', maxWidth: 650 }}>
              Centrally located in Royapettah, Chennai. Drive in with your car for an expert consultation and live product demonstration.
            </p>
          </div>

          <div className="about-location-grid">
            
            {/* Location Info Card */}
            <div className="about-location-card bracket-box">
              <div className="about-location-header">
                <div className="about-location-pin-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="about-location-name">Best Car Accessories</h3>
                  <span className="about-location-area">Royapettah, Chennai</span>
                </div>
              </div>

              <div className="about-location-details">
                <div className="about-loc-item">
                  <Navigation size={18} className="about-loc-icon" />
                  <div>
                    <strong>Studio Address</strong>
                    <p>{business.address}</p>
                    <span className="about-loc-landmark">Landmark: Next to Woodlands Theater</span>
                  </div>
                </div>

                <div className="about-loc-item">
                  <Clock size={18} className="about-loc-icon" />
                  <div>
                    <strong>Working Hours</strong>
                    <p>{business.hours.weekdays.days}: {business.hours.weekdays.open} – {business.hours.weekdays.close}</p>
                    <p>{business.hours.sunday.days}: {business.hours.sunday.open} – {business.hours.sunday.close}</p>
                  </div>
                </div>

                <div className="about-loc-item">
                  <Phone size={18} className="about-loc-icon" />
                  <div>
                    <strong>Direct Hotline</strong>
                    <p>{business.phone}</p>
                  </div>
                </div>
              </div>

              <div className="about-location-actions">
                <a 
                  href={business.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary about-dir-btn"
                >
                  <Navigation size={16} />
                  <span>Get Directions</span>
                  <ExternalLink size={14} className="about-ext-icon" />
                </a>
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Maps Frame */}
            <div className="about-map-wrapper bracket-box">
              <iframe
                src={business.mapUrl}
                title="Best Car Accessories Location Map"
                className="about-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="about-map-bar">
                <div className="about-map-badge">
                  <span className="about-map-live-dot" />
                  <span>LIVE STUDIO MAP · ROYAPETTAH</span>
                </div>
                <a 
                  href={business.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="about-map-view-link"
                >
                  <span>Open Full Map</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--dark-2 about-faq">
        <div className="container" style={{ maxWidth: 840 }}>
          <span className="section-label">Common Questions</span>
          <h2 className="section-title">About Best Car Accessories</h2>
          <div className="divider" />
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
