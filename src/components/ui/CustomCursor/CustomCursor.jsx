import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target.closest('a, button, [data-cursor], .card-3d, .clickable');
      if (target) {
        setHovered(true);
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div 
      className={`custom-cursor ${hovered ? 'custom-cursor--hovered' : ''} ${cursorText ? 'custom-cursor--with-text' : ''}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }}
      ref={cursorRef}
    >
      <div className="custom-cursor__dot" />
      {cursorText && <span className="custom-cursor__text">{cursorText}</span>}
    </div>
  );
}
