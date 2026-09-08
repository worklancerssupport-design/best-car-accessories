import React from 'react';
import { Award, Users, Car, Wrench, Grid3X3, Star } from 'lucide-react';
import './WhyChooseUs.css';

const features = [
  {
    num: "01",
    icon: <Award size={26} />,
    title: "15+ Years Experience",
    description: "Deep expertise in automotive electricals, interior upholstery, and structural accessories."
  },
  {
    num: "02",
    icon: <Users size={26} />,
    title: "1000+ Clients Served",
    description: "Trusted by car owners across Chennai, from daily hatchbacks to premium luxury SUVs."
  },
  {
    num: "03",
    icon: <Car size={26} />,
    title: "Complete Customization",
    description: "End-to-end upgrades under one roof — styling, lighting, acoustics, and electronic safety."
  },
  {
    num: "04",
    icon: <Wrench size={26} />,
    title: "Professional Installation",
    description: "Zero wire-cutting standard with OEM-grade couplers, neat conduit routing, and clean fitment."
  },
  {
    num: "05",
    icon: <Grid3X3 size={26} />,
    title: "Wide Accessory Range",
    description: "Extensive selection of verified brands, genuine fittings, and cutting-edge tech gadgets."
  },
  {
    num: "06",
    icon: <Star size={26} />,
    title: "Personalized Solutions",
    description: "Tailored accessory recommendations designed around your specific vehicle and driving needs."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">Engineering & Craftsmanship</span>
          <h2 className="section-title text-white">Why Choose Best Car Accessories</h2>
          <div className="divider" style={{ margin: '0.5rem auto 1rem' }} />
          <p className="section-subtitle section-subtitle--light" style={{ margin: '0 auto' }}>
            Chennai’s destination for precision car modification, certified fitment, and transparent service.
          </p>
        </div>

        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.num} className="feature-card bracket-box">
              <div className="feature-card-top">
                <span className="feature-card-num">{feature.num}</span>
                <div className="feature-card-icon">
                  {feature.icon}
                </div>
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
