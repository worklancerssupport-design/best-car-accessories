import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero/Hero';
import CountUpStats from '../components/ui/CountUpStats/CountUpStats';
import AboutSection from '../components/sections/AboutSection/AboutSection';
import AccessoriesSection from '../components/sections/AccessoriesSection/AccessoriesSection';
import ProcessJourney from '../components/sections/ProcessJourney/ProcessJourney';
import Gallery from '../components/sections/Gallery/Gallery';
import InstagramFeed from '../components/sections/InstagramFeed/InstagramFeed';
import ReviewSection from '../components/sections/ReviewSection/ReviewSection';
import FAQSection from '../components/sections/FAQSection/FAQSection';
import ContactSection from '../components/sections/ContactSection/ContactSection';
import { business } from '../config/business';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name,
  description: 'Premium car accessories, interior customization, exterior upgrades, lighting, infotainment, cameras and professional installation in Chennai.',
  url: business.siteUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address,
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  ...(business.phone && { telephone: business.phone }),
  ...(business.email && { email: business.email }),
  sameAs: [business.instagram].filter(Boolean),
};

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Best Car Accessories Chennai | 3D Automotive Showroom &amp; Upgrades</title>
        <meta name="description" content="Best Car Accessories on NMS Road, Royapettah, Chennai — 15+ years experience, 1000+ clients. Premium car accessories, interior & exterior customization, lighting, infotainment, cameras and professional installation." />
        <link rel="canonical" href={business.siteUrl} />
        <meta property="og:title" content="Best Car Accessories Chennai | 3D Automotive Showroom & Upgrades" />
        <meta property="og:description" content="Premium car accessories and customization shop on NMS Road, Chennai. 15+ years experience, 1000+ clients served." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={business.siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      {/* 01. 3D Hero */}
      <Hero />

      {/* 02. Trust / Numbers */}
      <CountUpStats />

      {/* 03. Automotive Intro & Story */}
      <AboutSection />

      {/* 04. Accessories Catalogue & FlowingMenu */}
      <AccessoriesSection />

      {/* 07. Customization Experience (Process) */}
      <ProcessJourney />

      {/* 08. Featured Work (3D Gallery) */}
      <Gallery />

      {/* 09. Instagram Showcase */}
      <InstagramFeed />

      {/* 10. Customer Experiences (Verified Reviews Carousel) */}
      <ReviewSection />

      {/* 11. Frequently Asked Questions */}
      <FAQSection />

      {/* 12. Final Consultation & Quote CTA */}
      <ContactSection />
    </>
  );
}
