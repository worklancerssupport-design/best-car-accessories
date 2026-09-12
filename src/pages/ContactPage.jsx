import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import business from '../data/business.json';
import formsData from '../data/forms.json';
import Breadcrumbs from '../components/ui/Breadcrumbs/Breadcrumbs';
import CTASection from '../components/ui/CTASection/CTASection';
import './ContactPage.css';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

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

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const lines = ['Hello, I have an enquiry from the website.', ''];
      lines.push(`Name: ${form.name}`);
      lines.push(`Phone: ${form.phone}`);
      if (form.email) lines.push(`Email: ${form.email}`);
      if (form.carModel) lines.push(`Car: ${form.carModel}`);
      if (form.service) lines.push(`Service: ${form.service}`);
      if (form.message) { lines.push(''); lines.push('Message:'); lines.push(form.message); }
      const url = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
      const opened = window.open(url, '_blank');
      if (!opened) window.location.href = url;
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', carModel: '', service: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hello Best Car Accessories NMS, I would like to enquire about your services.")}`
    : '#';

  return (
    <>
      <Helmet>
        <title>Contact Best Car Accessories NMS | NMS Road, Chennai | Get a Quote</title>
        <meta name="description" content="Contact Best Car Accessories NMS on NMS Road, Chennai. Send an enquiry, WhatsApp us, or call for car accessory installation and customization queries. 15+ years experience." />
        <link rel="canonical" href={`${business.siteUrl}/contact`} />
        <meta property="og:title" content="Contact Best Car Accessories NMS | NMS Road Chennai" />
        <meta property="og:description" content="Get in touch with Best Car Accessories NMS in Chennai for car accessory enquiries, quotes and customization consultations." />
      </Helmet>

      <div className="contact-breadcrumb-wrap">
        <div className="container"><Breadcrumbs items={breadcrumbs} /></div>
      </div>

      {/* HERO — matches cat-hero pattern exactly */}
      <section className="contact-hero">
        <div className="contact-hero__content">
          <span className="section-label">Get in Touch</span>
          <h1 className="contact-hero__title">
            Let's <span className="contact-hero__title-accent">Upgrade</span><br/>Your Ride
          </h1>
          <p className="contact-hero__subtitle">
            Send us an enquiry, WhatsApp your car model, or visit our workshop on NMS Road, Chennai.
          </p>
          <div className="contact-hero__actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-hero__btn contact-hero__btn--primary"
            >
              <span>WhatsApp Us</span>
              <MessageCircle size={16} className="contact-hero__btn-icon" aria-hidden="true" />
            </a>
            <a
              href={business.phone ? `tel:${business.phone}` : '#'}
              className="contact-hero__btn contact-hero__btn--primary"
            >
              <span>Call Now</span>
              <Phone size={16} className="contact-hero__btn-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* COMBINED: Form (primary action) + Contact/Visit card (all info) */}
      <section className="section contact-main">
        <div className="container contact-main__grid">
          {/* LEFT: Form panel */}
          <div className="contact-form-panel">
            <header className="contact-form-panel__header">
              <h2 className="contact-form-panel__title">Send Us a Message</h2>
              <p className="contact-form-panel__intro">
                Share your car model and the accessories you are interested in.
                We will get back to you with options and pricing.
              </p>
            </header>

            {success ? (
              <div className="contact-form-success">
                <CheckCircle2 size={48} style={{ color: 'var(--color-success)' }} />
                <h3>WhatsApp Opened</h3>
                <p>Your enquiry has been prepared in WhatsApp. Please tap send to complete.</p>
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
                <button type="submit" className="btn btn-lg contact-form__submit" disabled={loading}>
                  {loading ? 'Sending...' : <><Send size={16} /> Send Enquiry</>}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Contact + Visit card (all info grouped) */}
          <aside className="contact-info">
            {/* Reach Us */}
            <article className="contact-info__block">
              <h3 className="contact-info__title">Reach Us Directly</h3>
              <ul className="contact-info__list">
                <li className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">
                    <Phone size={16} />
                  </span>
                  <div>
                    <span className="contact-info__label">Phone & WhatsApp</span>
                    <a href={business.phone ? `tel:${business.phone}` : '#'} className="contact-info__value">
                      {business.phone || 'Configure in business.json'}
                    </a>
                    {business.phone2 && (
                      <a href={`tel:${business.phone2.replace(/\s+/g, '')}`} className="contact-info__value">
                        {business.phone2}
                      </a>
                    )}
                  </div>
                </li>
                {business.email && (
                  <li className="contact-info__item">
                    <span className="contact-info__icon" aria-hidden="true">
                      <Mail size={16} />
                    </span>
                    <div>
                      <span className="contact-info__label">Email</span>
                      <a href={`mailto:${business.email}`} className="contact-info__value">
                        {business.email}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </article>

            {/* Visit Us */}
            <article className="contact-info__block">
              <h3 className="contact-info__title">Visit the Workshop</h3>
              <ul className="contact-info__list">
                <li className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <span className="contact-info__label">Address</span>
                    <span className="contact-info__value contact-info__value--text">{business.address}</span>
                  </div>
                </li>
                <li className="contact-info__item">
                  <span className="contact-info__icon" aria-hidden="true">
                    <Clock size={16} />
                  </span>
                  <div>
                    <span className="contact-info__label">Working Hours</span>
                    <span className="contact-info__value contact-info__value--text">
                      {business.hours.weekdays.days}: {business.hours.weekdays.open} – {business.hours.weekdays.close}
                    </span>
                    <span className="contact-info__value contact-info__value--text">
                      {business.hours.sunday.days}: {business.hours.sunday.open} – {business.hours.sunday.close}
                    </span>
                  </div>
                </li>
              </ul>
            </article>

            {/* Embedded map */}
            {business.mapUrl && (
              <div className="contact-info__map">
                <iframe
                  src={business.mapUrl}
                  title="Best Car Accessories NMS location map — Royapettah, Chennai"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            )}
          </aside>
        </div>
      </section>

      <CTASection
        title="Prefer to Talk?"
        subtitle="Call us during working hours or WhatsApp your car model and requirements — we will help you choose the right accessories."
        primaryCta={{ label: 'Call Now', href: business.phone ? `tel:${business.phone}` : '#' }}
        whatsappMessage="Hi Best Car Accessories NMS, I would like to enquire about your services."
        primaryIcon={Phone}
        dark={true}
      />
    </>
  );
}
