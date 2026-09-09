import SectionDivider from '../../ui/SectionDivider/SectionDivider';
import processSteps from '../../../data/process.json';
import './ProcessJourney.css';

const ProcessJourney = () => {
  return (
    <section className="process-section" id="process">
      <SectionDivider num="07" label="CUSTOMIZATION EXPERIENCE" />

      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">PRECISION FITMENT PROTOCOL</span>
          <h2 className="section-title text-white">How We Upgrade Your Car</h2>
          <div className="divider" style={{ margin: '0.5rem auto 1rem' }} />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From initial consultation to final diagnostic calibration, experience structured automotive craftsmanship in Chennai.
          </p>
        </div>

        <div className="process-timeline">
          <div className="process-steps-grid">
            {processSteps.map((step) => (
              <div key={step.id} className="process-card card-3d">
                <div className="process-card-top">
                  <span className="process-number">{step.id}</span>
                  <span className="process-indicator" />
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessJourney;
