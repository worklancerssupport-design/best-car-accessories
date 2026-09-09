import SectionDivider from '../../ui/SectionDivider/SectionDivider';
import FAQ from '../../ui/FAQ/FAQ';
import faqsData from '../../../data/faqs.json';
import './FAQSection.css';

export default function FAQSection({ page = 'homepage' }) {
  const faqs = faqsData[page] || faqsData.homepage;
  return (
    <section className="hp-faq-section" id="faq">
      <SectionDivider num="11" label="FREQUENTLY ASKED QUESTIONS" />

      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">CLARITY &amp; PEACE OF MIND</span>
          <h2 className="section-title text-white">Frequently Asked Questions</h2>
          <div className="divider" style={{ margin: '0.5rem auto 1rem' }} />
          <p className="section-subtitle section-subtitle--light" style={{ margin: '0 auto var(--space-8)' }}>
            Got questions about fitment, warranty, or scheduling? Here is everything you need to know.
          </p>
        </div>

        <div className="hp-faq-wrap">
          <FAQ faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
