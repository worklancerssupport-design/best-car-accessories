import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import formsData from '../data/forms.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import './FranchisePage.css';
import { Send, CheckCircle2, Users, TrendingUp, Award, MapPin } from 'lucide-react';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.phone.trim()) errors.phone = 'Phone is required';
  if (!form.city.trim()) errors.city = 'City is required';
  if (!form.state.trim()) errors.state = 'State is required';
  return errors;
}

export default function FranchisePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', state: '', investment: '', existingBusiness: '', experience: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Franchise' }];

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      if (business.forms.web3formsKey) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_key: business.forms.web3formsKey, ...form, subject: `Franchise Enquiry from ${form.name} — ${form.city}, ${form.state}` }),
        });
        if (!res.ok) throw new Error('Failed');
      } else {
        await new Promise(r => setTimeout(r, 800));
      }
      setSuccess(true);
    } catch {
      setErrors({ form: 'Submission failed. Please WhatsApp us directly.' });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hello, I am interested in a franchise opportunity with Best Car Accessories.')}`
    : '#';

  return (
    <>
      <Helmet>
        <title>Franchise Opportunity | Partner With Best Car Accessories Chennai</title>
        <meta name="description" content="Interested in partnering with Best Car Accessories, NMS Road, Chennai? Submit your franchise enquiry and we'll get in touch to discuss the opportunity." />
        <link rel="canonical" href={`${business.siteUrl}/franchise`} />
        <meta property="og:title" content="Franchise | Best Car Accessories Chennai" />
        <meta property="og:description" content="Partner with Best Car Accessories, Chennai's trusted car accessories and customization shop with 15+ years of experience." />
      </Helmet>

      <div className="franchise-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      <section className="franchise-hero section--dark">
        <div className="franchise-hero__overlay" />
        <div className="container franchise-hero__content">
          <span className="section-label">Business Opportunity</span>
          <h1 className="franchise-hero__title">
            Partner With <span className="franchise-hero__title-accent">Best Car Accessories</span>
          </h1>
          <p className="franchise-hero__subtitle">
            We are open to exploring partnership opportunities with entrepreneurs who share our passion
            for quality car accessories and professional service.
          </p>
        </div>
      </section>

      <section className="section franchise-why">
        <div className="container">
          <div className="franchise-why__header">
            <span className="section-label">Why Partner With Us</span>
            <h2 className="section-title">What We Bring</h2>
            <div className="divider" />
          </div>
          <div className="franchise-why__grid">
            {[
              { icon: <Award size={28} />, title: '15+ Years of Experience', desc: 'Over 15 years of car accessories business experience in Chennai.' },
              { icon: <Users size={28} />, title: '1000+ Client Track Record', desc: 'A demonstrated ability to serve car owners and build long-term customer relationships.' },
              { icon: <TrendingUp size={28} />, title: 'Growing Market', desc: 'Car accessory and customization is a growing market across India.' },
              { icon: <MapPin size={28} />, title: 'Chennai Base', desc: 'Established brand and operations on NMS Road, Chennai as a reference point.' },
            ].map((item, i) => (
              <div className="franchise-why__card" key={i}>
                <div className="franchise-why__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="franchise-why__note">
            * Specific partnership terms, investment details, and support structure will be discussed
            directly after reviewing your enquiry. We do not publish specific investment figures or promises.
          </p>
        </div>
      </section>

      <section className="section franchise-form-section">
        <div className="container franchise-form-wrap">
          <div className="franchise-form-text">
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Submit Your Enquiry</h2>
            <div className="divider" />
            <p>
              Fill in the form with your details and we will review your enquiry.
              All discussions are completely confidential.
            </p>
            <p className="franchise-form-hint">
              You can also WhatsApp us directly to start a conversation.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp franchise-whatsapp-cta">
              WhatsApp Us Directly
            </a>
          </div>
          <div className="franchise-form-panel">
            {success ? (
              <div className="franchise-success">
                <CheckCircle2 size={48} style={{ color: 'var(--color-success)' }} />
                <h3>Enquiry Received!</h3>
                <p>Thank you for your interest. We will review your details and contact you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="franchise-form" noValidate>
                {errors.form && <div className="franchise-form__error-banner">{errors.form}</div>}
                <div className="franchise-form__row">
                  <div className="franchise-form__field">
                    <label htmlFor="f-name">Full Name *</label>
                    <input id="f-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" />
                    {errors.name && <span className="franchise-form__field-error">{errors.name}</span>}
                  </div>
                  <div className="franchise-form__field">
                    <label htmlFor="f-phone">Phone Number *</label>
                    <input id="f-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Mobile number" />
                    {errors.phone && <span className="franchise-form__field-error">{errors.phone}</span>}
                  </div>
                </div>
                <div className="franchise-form__field">
                  <label htmlFor="f-email">Email Address</label>
                  <input id="f-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Optional" />
                </div>
                <div className="franchise-form__row">
                  <div className="franchise-form__field">
                    <label htmlFor="f-city">City *</label>
                    <input id="f-city" name="city" type="text" value={form.city} onChange={handleChange} placeholder="Your city" />
                    {errors.city && <span className="franchise-form__field-error">{errors.city}</span>}
                  </div>
                  <div className="franchise-form__field">
                    <label htmlFor="f-state">State *</label>
                    <input id="f-state" name="state" type="text" value={form.state} onChange={handleChange} placeholder="Your state" />
                    {errors.state && <span className="franchise-form__field-error">{errors.state}</span>}
                  </div>
                </div>
                <div className="franchise-form__field">
                  <label htmlFor="f-investment">Investment Interest</label>
                  <select id="f-investment" name="investment" value={form.investment} onChange={handleChange}>
                    <option value="">Select an option</option>
                    {formsData.franchiseInvestments.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="franchise-form__field">
                  <label htmlFor="f-existing">Do you have an existing business?</label>
                  <input id="f-existing" name="existingBusiness" type="text" value={form.existingBusiness} onChange={handleChange} placeholder="e.g. Auto accessories retail, General retail, No" />
                </div>
                <div className="franchise-form__field">
                  <label htmlFor="f-experience">Relevant Experience</label>
                  <input id="f-experience" name="experience" type="text" value={form.experience} onChange={handleChange} placeholder="e.g. 5 years in auto parts, Sales background" />
                </div>
                <div className="franchise-form__field">
                  <label htmlFor="f-message">Additional Message</label>
                  <textarea id="f-message" name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Any other details you would like to share..." />
                </div>
                <button type="submit" className="btn btn-primary btn-lg franchise-form__submit" disabled={loading}>
                  {loading ? 'Sending...' : <><Send size={16} /> Submit Franchise Enquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}