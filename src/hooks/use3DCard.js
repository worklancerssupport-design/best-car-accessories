import { useRef, useCallback, useEffect } from 'react';

export function use3DCard({ maxTilt = 4, perspective = 1000 } = {}) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    // Disable on touch / small screens
    if (window.innerWidth < 768) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }, [maxTilt, perspective]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  }, [perspective]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return cardRef;
}
