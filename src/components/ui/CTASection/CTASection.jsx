import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { business } from '../../../config/business';
import './CTASection.css';

export default function CTASection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  whatsappMessage,
  dark = true
}) {
  const whatsappUrl = business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(whatsappMessage || 'Hello Best Car Accessories, I would like to enquire about your services.')}`
    : '#';

  // Support both {label, href} and {text, link} prop shapes
  const primary = primaryCta ? {
    label: primaryCta.label || primaryCta.text || 'Get a Quote',
    href: primaryCta.href || primaryCta.link || '/contact',
  } : { label: 'Get a Quote', href: '/contact' };

  return (
    <section className={`cta-section ${dark ? 'cta-section--dark' : 'cta-section--accent'}`}>
      <div className="container">
        <div className="cta-section__content">
          <h2 className="cta-section__title">{title}</h2>
          {subtitle && <p className="cta-section__subtitle">{subtitle}</p>}
          <div className="cta-section__actions">
            <Link to={primary.href} className="btn btn-primary btn-lg">
              {primary.label} <ArrowRight size={18} />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
            {secondaryCta && (
              <Link
                to={secondaryCta.href || secondaryCta.link || '/'}
                className="btn btn-secondary btn-lg"
              >
                {secondaryCta.label || secondaryCta.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
