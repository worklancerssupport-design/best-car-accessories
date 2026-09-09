import {
  ShoppingBag,
  MessageSquare,
  Settings,
  Wrench,
  CheckCircle,
} from 'lucide-react';
import SectionDivider from '../../ui/SectionDivider/SectionDivider';
import processSteps from '../../../data/process.json';
import './ProcessJourney.css';

const STEP_ICONS = {
  '01': ShoppingBag,
  '02': MessageSquare,
  '03': Settings,
  '04': Wrench,
  '05': CheckCircle,
};

const ProcessJourney = () => {
  return (
    <section className="process-section" id="process">
      <SectionDivider num="07" label="CUSTOMIZATION EXPERIENCE" />

      <div className="container">
        <header className="process-header">
          <span className="section-label">How We Work</span>
          <h2 className="section-title text-white">Our Process</h2>
          <p className="section-subtitle section-subtitle--light">
            From initial consultation to final diagnostic calibration, experience structured
            automotive craftsmanship in Chennai.
          </p>
        </header>

        <ol className="process-steps" aria-label="Our customization process">
          {processSteps.map((step, idx) => {
            const Icon = STEP_ICONS[step.id] || CheckCircle;
            return (
              <li key={step.id} className="process-step">
                <div className="process-step-marker" aria-hidden="true">
                  <span className="process-step-number">{step.id}</span>
                  <span className="process-step-icon">
                    <Icon size={20} />
                  </span>
                </div>

                <article className="process-step-card">
                  <span className="process-step-label">Step {idx + 1}</span>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.desc}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ProcessJourney;
