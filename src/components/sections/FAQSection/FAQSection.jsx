import React from 'react';
import SectionDivider from '../../ui/SectionDivider/SectionDivider';
import FAQ from '../../ui/FAQ/FAQ';
import './FAQSection.css';

const homepageFaqs = [
  {
    q: 'Will accessory installations void my new car warranty?',
    a: 'No. We strictly follow OEM coupler-to-coupler fitment with zero wire cutting or slicing. All electronic accessories are connected via dedicated plug-and-play harnesses with individual inline fuses, preserving your manufacturer electrical warranty.'
  },
  {
    q: 'How long does a typical installation take?',
    a: 'Minor upgrades (fog lamps, floor mats, dashcams) take 1 to 2 hours. Full customization packages (ambient lighting, Android infotainment, 360° camera, custom seat covers) typically require 4 to 6 hours for meticulous calibration.'
  },
  {
    q: 'Do you offer custom bucket fit seat covers for all car models?',
    a: 'Yes. We manufacture and stitch custom-fit seat covers tailored to the exact seat contour and airbag specifications of every car model, available in perforated Nappa leather, premium PU, and microfiber finishes.'
  },
  {
    q: 'Where is your showroom located in Chennai?',
    a: 'Our workshop and showroom is at Palani Murugan Building, No: 21, Westcott Rd, next to Woodlands Theater, Royapettah, Chennai, Tamil Nadu 600014. We have dedicated bay parking for customer car fitment.'
  },
  {
    q: 'How do I get a quote or book a fitment slot?',
    a: 'You can click "Get a Quote" or message us on WhatsApp with your vehicle model and required accessories. Our technicians will share detailed upgrade options and confirm an installation slot.'
  }
];

export default function FAQSection() {
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
          <FAQ faqs={homepageFaqs} />
        </div>
      </div>
    </section>
  );
}
