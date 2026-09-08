import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import FlowingMenu from '../../FlowingMenu/FlowingMenu';
import ServiceCard from '../../ui/ServiceCard/ServiceCard';
import SectionDivider from '../../ui/SectionDivider/SectionDivider';
import { exteriorAccessories } from '../../../data/exteriorAccessories';
import { interiorAccessories } from '../../../data/interiorAccessories';
import './AccessoriesSection.css';

const FLOWING_MENU_ITEMS = [
  { label: 'Exterior Accessories', href: '/exterior-car-accessories-chennai', image: '/images/exterior/fog-light-projector-chennai.webp' },
  { label: 'Interior Customization', href: '/interior-car-accessories-chennai', image: '/images/interior/car-ambient-light-chennai.webp' },
  { label: 'Lighting & Electrical', href: '/exterior-car-accessories-chennai#lighting', image: '/images/exterior/led-headlight-upgrade-chennai.webp' },
  { label: 'Infotainment & Audio', href: '/interior-car-accessories-chennai#entertainment', image: '/images/interior/infotainment-systems-chennai.webp' },
  { label: 'Cameras & Safety Systems', href: '/interior-car-accessories-chennai#technology', image: '/images/interior/360-car-camera-chennai.webp' },
];

export default function AccessoriesSection() {
  const [activeTab, setActiveTab] = useState('exterior');

  const featuredExterior = exteriorAccessories.slice(0, 4);
  const featuredInterior = interiorAccessories.slice(0, 4);

  return (
    <section className="accessories-section" id="accessories">
      <SectionDivider num="04" label="AUTOMOTIVE CATALOGUE" />

      <div className="container">
        
        {/* Section Header */}
        <div className="accessories-header">
          <div className="accessories-header-text">
            <span className="section-label">ACCESSORIES CATALOGUE</span>
            <h2 className="section-title text-white">ENGINEERED FOR YOUR DRIVE.</h2>
            <p className="section-subtitle section-subtitle--light">
              Explore accessories designed to transform the way your car looks, feels and performs.
            </p>
          </div>
        </div>

        {/* Centerpiece: FlowingMenu */}
        <div className="accessories-flowing-wrap">
          <FlowingMenu items={FLOWING_MENU_ITEMS} />
        </div>

        {/* Category Quick Preview Grid with Switcher */}
        <div className="accessories-preview-block">
          <div className="accessories-preview-header">
            <div className="accessories-preview-title">
              <Layers size={18} className="text-cyan" />
              <span>FEATURED UPGRADES</span>
            </div>

            <div className="accessories-tabs" role="tablist" aria-label="Accessory categories">
              <button
                role="tab"
                aria-selected={activeTab === 'exterior'}
                className={`accessories-tab-btn ${activeTab === 'exterior' ? 'active' : ''}`}
                onClick={() => setActiveTab('exterior')}
              >
                <span>Exterior (20)</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'interior'}
                className={`accessories-tab-btn ${activeTab === 'interior' ? 'active' : ''}`}
                onClick={() => setActiveTab('interior')}
              >
                <span>Interior (20)</span>
              </button>
            </div>
          </div>

          <div className="accessories-grid">
            {activeTab === 'exterior' ? (
              <>
                {featuredExterior.map((service, idx) => (
                  <ServiceCard key={service.id} service={service} index={idx + 1} dark={true} />
                ))}
              </>
            ) : (
              <>
                {featuredInterior.map((service, idx) => (
                  <ServiceCard key={service.id} service={service} index={idx + 1} dark={true} />
                ))}
              </>
            )}
          </div>

          <div className="accessories-action-bar">
            {activeTab === 'exterior' ? (
              <Link to="/exterior-car-accessories-chennai" className="btn btn-secondary">
                <span>View All 20 Exterior Accessories</span>
                <ArrowRight size={16} className="btn-arrow" />
              </Link>
            ) : (
              <Link to="/interior-car-accessories-chennai" className="btn btn-secondary">
                <span>View All 20 Interior Accessories</span>
                <ArrowRight size={16} className="btn-arrow" />
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
