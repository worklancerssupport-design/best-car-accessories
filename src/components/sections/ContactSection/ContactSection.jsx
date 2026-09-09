import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import business from '../../../data/business.json';
import formsData from '../../../data/forms.json';
import './ContactSection.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', carModel: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', phone: '', carModel: '', service: '', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    }, 1000);
  };

  const whatsappMessage = encodeURIComponent("Hello Best Car Accessories, I would like to get a quote for my car.");
  const whatsappLink = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;
  const phoneCallLink = `tel:${business.phone.replace(/\s+/g, '')}`;

  return (
    <section className="contact-preview-section" id="contact">
      {/* Subtle Automotive Backdrop */}
      <div className="contact-backdrop" />

      <div className="container contact-container">
        <div className="contact-grid">
          
          {/* Left Column: Heading, Context & Action Buttons */}
          <div className="contact-info-col">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title text-white">Ready to Upgrade Your Car?</h2>
            
            <p className="contact-desc">
              Tell us what you're looking for and our team can help you explore the right accessories for your car.
            </p>

            <div className="contact-direct-actions">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </a>
              <a href={phoneCallLink} className="btn btn-secondary">
                <Phone size={18} />
                <span>Call Now ({business.phone})</span>
              </a>
            </div>

            {/* Shop Location Details */}
            <div className="contact-meta-cards">
              <div className="contact-meta-card">
                <div className="contact-meta-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4>Visit Our Chennai Store</h4>
                  <p>NMS Road, Chennai, Tamil Nadu</p>
                  <span>Mon – Sat: 9:30 AM – 8:30 PM</span>
                </div>
              </div>

              <div className="contact-meta-card">
                <div className="contact-meta-icon">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4>Certified Installation Guarantee</h4>
                  <p>OEM couplers, high-temp wiring sleeves, and flawless fitment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Consultation Form */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="enquiry-form bracket-box">
              <div className="enquiry-form-header">
                <h3>Quick Enquiry & Quote</h3>
                <p>We'll respond within 30 minutes on WhatsApp or Phone.</p>
              </div>

              <div className="form-group">
                <label htmlFor="hp-name">Your Name *</label>
                <input 
                  type="text" 
                  id="hp-name" 
                  name="name" 
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="hp-phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="hp-phone" 
                    name="phone" 
                    placeholder="e.g. 98400 12345"
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hp-car">Car Model & Year</label>
                  <input 
                    type="text" 
                    id="hp-car" 
                    name="carModel" 
                    placeholder="e.g. Creta 2024"
                    value={formData.carModel} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hp-service">Service / Accessory Interested In</label>
                <select id="hp-service" name="service" value={formData.service} onChange={handleChange}>
                  <option value="">Select an upgrade...</option>
                  {formsData.quickEnquiryServices.map((s, i) => (
                    <option key={i} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="hp-message">Message / Specific Requirements</label>
                <textarea 
                  id="hp-message" 
                  name="message" 
                  rows="2" 
                  placeholder="Tell us what you'd like to customize..."
                  value={formData.message} 
                  onChange={handleChange} 
                />
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                <span>{loading ? 'Sending Request...' : 'Get a Quote'}</span>
                <ArrowRight size={16} className="btn-arrow" />
              </button>

              {success && (
                <div className="form-success">
                  ✓ Thank you! We received your request and will reach out shortly.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
