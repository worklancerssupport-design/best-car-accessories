import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './AutomotiveSystemMenu.css';

export default function AutomotiveSystemMenu({ items = [] }) {
  return (
    <nav className="auto-system-menu" aria-label="Automotive Systems Navigation" role="list">
      {items.map((item, index) => {
        const formattedIndex = String(index + 1).padStart(2, '0');
        return (
          <div className="auto-system-item" key={index} role="listitem">
            <Link to={item.href} className="auto-system-link">
              <div className="auto-system-meta">
                <span className="auto-system-num">{formattedIndex}</span>
                <span className="auto-system-label">{item.label}</span>
              </div>
              <div className="auto-system-action">
                <span className="auto-system-line" aria-hidden="true" />
                <ArrowRight size={20} className="auto-system-arrow" aria-hidden="true" />
              </div>
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
