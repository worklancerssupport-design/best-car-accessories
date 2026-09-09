import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Grid, Wrench } from 'lucide-react';
import business from '../../../data/business.json';
import './CountUpStats.css';

gsap.registerPlugin(ScrollTrigger);

const defaultStats = [
  { number: business.stats.yearsExperience, suffix: '+', label: 'Years of Experience', sub: 'ESTABLISHED IN CHENNAI', icon: Award },
  { number: business.stats.clientsServed, suffix: '+', label: 'Clients Served', sub: 'ACROSS TAMIL NADU', icon: Users },
  { number: business.stats.accessoryCategories, suffix: '+', label: 'Accessory Categories', sub: 'EXTERIOR & INTERIOR', icon: Grid },
  { number: null, suffix: 'OEM', label: 'Certified Fitment', sub: 'ZERO WIRE TAMPERING', icon: Wrench },
];

export default function CountUpStats({ stats = defaultStats }) {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimated) return;

    const numbers = el.querySelectorAll('.count-up__number-val');

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true, // Do not repeat on scroll
      onEnter: () => {
        setHasAnimated(true);
        numbers.forEach((numEl) => {
          const target = parseFloat(numEl.getAttribute('data-target'));
          if (isNaN(target)) return;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              numEl.textContent = Math.round(obj.val);
            }
          });
        });
      }
    });

    return () => trigger.kill();
  }, [hasAnimated]);

  return (
    <section className="count-up-section" ref={sectionRef}>
      <div className="container">
        <div className="count-up__grid">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div className="count-up__item" key={index}>
                <div className="count-up__header">
                  {IconComponent && <IconComponent size={18} className="count-up__icon" />}
                  <span className="count-up__sub">{stat.sub}</span>
                </div>
                <div className="count-up__metric">
                  {stat.number !== null ? (
                    <div className="count-up__number">
                      <span className="count-up__number-val" data-target={stat.number}>0</span>
                      <span className="count-up__suffix">{stat.suffix}</span>
                    </div>
                  ) : (
                    <div className="count-up__number count-up__number--text">
                      <span className="count-up__suffix">{stat.suffix}</span>
                    </div>
                  )}
                </div>
                <div className="count-up__label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
