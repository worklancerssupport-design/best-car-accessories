import business from '../../../data/business.json';
import './CountUpStats.css';

const defaultStats = [
  { display: `${business.stats.yearsExperience}+`, label: 'Years of Mastery' },
  { display: `${business.stats.clientsServed}+`, label: 'Cars Upgraded' },
  { display: `${business.stats.accessoryCategories}+`, label: 'Accessory Categories' },
  { display: 'OEM', label: 'Coupler Fitment', accent: true },
];

export default function CountUpStats({ stats = defaultStats }) {
  return (
    <section className="stats-section" aria-label="Key statistics">
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, index) => (
            <article className="stat" key={index}>
              <div className={`stat__value ${stat.accent ? 'stat__value--accent' : ''}`}>
                {stat.display}
              </div>
              <div className="stat__label">{stat.label}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
