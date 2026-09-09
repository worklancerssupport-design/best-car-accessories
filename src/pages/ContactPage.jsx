import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import formsData from '../data/forms.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import './ContactPage.css';
import { MapPin, Phone, MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) errors.phone = 'Enter a valid 10-digit number';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.service) errors.service = 'Please select a service';
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', carModel: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Contact' }];

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
          body: JSON.stringify({ access_key: business.forms.web3formsKey, ...form, subject: `Enquiry from ${form.name} — ${form.service}` }),
        });
        if (!res.ok) throw new Error('Submission failed');
      } else {
        await new Promise(r => setTimeout(r, 800));
      }
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', carModel: '', service: '', message: '' });
    } catch {
      setErrors({ form: 'Submission failed. Please try WhatsApp or call us directly.' });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hello Best Car Accessories, I would like to enquire about your services.")}`
    : '#';

  return (
    <>
      <Helmet>
        <title>Contact Best Car Accessories | NMS Road, Chennai | Get a Quote</title>
        <meta name="description" content="Contact Best Car Accessories on NMS Road, Chennai. Send an enquiry, WhatsApp us, or call for car accessory installation and customization queries. 15+ years experience." />
        <link rel="canonical" href={`${business.siteUrl}/contact`} />
        <meta property="og:title" content="Contact Best Car Accessories | NMS Road Chennai" />
        <meta property="og:description" content="Get in touch with Best Car Accessories in Chennai for car accessory enquiries, quotes and customization consultations." />
      </Helmet>

      <div className="contact-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      <section className="contact-hero section--dark">
        <div className="contact-hero__overlay" />
        <div className="container contact-hero__content">
          <span className="section-label">Get in Touch</span>
          <h1 className="contact-hero__title">Let's Upgrade Your Car</h1>
          <p className="contact-hero__subtitle">
            Send us an enquiry, WhatsApp your car model, or visit our shop on NMS Road, Chennai.
            We will help you find the right accessories for your car.
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="section section--light contact-methods">
        <div className="container">
          <div className="contact-methods__grid">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-method contact-method--whatsapp"
            >
              <div className="contact-method__icon"><MessageCircle size={28} /></div>
              <h3>WhatsApp Us</h3>
              <p>{business.whatsapp || 'WhatsApp number — to be configured'}</p>
              <span className="contact-method__cta">Message Now →</span>
            </a>
            <a
              href={business.phone ? `tel:${business.phone}` : '#'}
              className="contact-method contact-method--phone"
            >
              <div className="contact-method__icon"><Phone size={28} /></div>
              <h3>Call Us</h3>
              <p>{business.phone || 'Phone number — to be configured'}</p>
              <span className="contact-method__cta">Call Now →</span>
            </a>
            <div className="contact-method contact-method--address">
              <div className="contact-method__icon"><MapPin size={28} /></div>
              <h3>Visit Us</h3>
              <p>{business.address}</p>
              {business.mapUrl && (
                <a href={business.mapUrl} target="_blank" rel="noopener noreferrer" className="contact-method__cta">
                  Get Directions →
                </a>
              )}
            </div>
            {business.email && (
              <a href={`mailto:${business.email}`} className="contact-method contact-method--email">
                <div className="contact-method__icon"><Mail size={28} /></div>
                <h3>Email Us</h3>
                <p>{business.email}</p>
                <span className="contact-method__cta">Send Email →</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section section--white contact-form-section">
        <div className="container contact-form-wrap">
          <div className="contact-form-text">
            <span className="section-label">Send an Enquiry</span>
            <h2 className="section-title">Tell Us What You Need</h2>
            <div className="divider" />
            <p>
              Fill in the form with your car model and the accessories you are interested in.
              We will get back to you with options and information.
            </p>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
              For faster response, WhatsApp your car model and requirements directly to us.
            </p>
          </div>
          <div className="contact-form-panel">
            {success ? (
              <div className="contact-form-success">
                <CheckCircle2 size={48} style={{ color: '#25d366' }} />
                <h3>Enquiry Sent!</h3>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  Also WhatsApp Us
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {errors.form && <div className="contact-form__error-banner">{errors.form}</div>}
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" />
                    {errors.name && <span className="contact-form__field-error">{errors.name}</span>}
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
                    {errors.phone && <span className="contact-form__field-error">{errors.phone}</span>}
                  </div>
                </div>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Optional" />
                    {errors.email && <span className="contact-form__field-error">{errors.email}</span>}
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="carModel">Car Model</label>
                    <input id="carModel" name="carModel" type="text" value={form.carModel} onChange={handleChange} placeholder="e.g. Maruti Swift, Hyundai Creta" />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label htmlFor="service">Service Interested In *</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select a service</option>
                    {formsData.contactServices.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <span className="contact-form__field-error">{errors.service}</span>}
                </div>
                <div className="contact-form__field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Any specific requirements, questions or details about your car..." />
                </div>
                <button type="submit" className="btn btn-primary btn-lg contact-form__submit" disabled={loading}>
                  {loading ? 'Sending...' : <><Send size={16} /> Send Enquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      {business.mapUrl && (
        <section className="contact-map">
          <iframe
            src={business.mapUrl}
            width="100%"
            height="400"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Best Car Accessories location on Google Maps"
          />
        </section>
      )}
    </>
  );
}
