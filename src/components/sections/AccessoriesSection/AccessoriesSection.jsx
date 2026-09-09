import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ServiceCard from '../../ui/ServiceCard/ServiceCard';
import exteriorData from '../../../data/products/exterior.json';
import interiorData from '../../../data/products/interior.json';
import './AccessoriesSection.css';

export default function AccessoriesSection() {
  const [activeTab, setActiveTab] = useState('exterior');

  const items = activeTab === 'exterior'
    ? exteriorData.items.slice(0, 4)
    : interiorData.items.slice(0, 4);

  return (
    <section className="accessories-section" id="accessories" aria-label="Our services">
      <div className="container">

        <header className="accessories-section__header">
          <span className="section-label">What We Offer</span>
          <h2 className="accessories-section__title">
            Our <span className="accessories-section__title-accent">Services</span>
          </h2>
          <p className="accessories-section__subtitle">
            Explore accessories designed to transform the way your car looks, feels and performs.
          </p>

          <div className="accessories-tabs" role="tablist" aria-label="Accessory categories">
            <button
              role="tab"
              aria-selected={activeTab === 'exterior'}
              className={`accessories-tab-btn ${activeTab === 'exterior' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('exterior')}
            >
              Exterior
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'interior'}
              className={`accessories-tab-btn ${activeTab === 'interior' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('interior')}
            >
              Interior
            </button>
          </div>
        </header>

        <div className="accessories-grid">
          {items.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx + 1} />
          ))}
        </div>

        <div className="accessories-action-bar">
          {activeTab === 'exterior' ? (
            <Link to="/exterior-car-accessories-chennai" className="btn btn-secondary">
              <span>View All Exterior Accessories</span>
              <ArrowRight size={16} className="btn-icon" />
            </Link>
          ) : (
            <Link to="/interior-car-accessories-chennai" className="btn btn-secondary">
              <span>View All Interior Accessories</span>
              <ArrowRight size={16} className="btn-icon" />
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}
