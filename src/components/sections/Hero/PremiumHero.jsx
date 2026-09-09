import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, RotateCcw, ZoomIn, ZoomOut, Play, Pause, Palette } from 'lucide-react';
import business from '../../../data/business.json';
import './PremiumHero.css';

// Automotive Studio Custom Wrap Finishes
const PAINT_FINISHES = [
  { id: 'titanium', name: 'Titanium Slate', filter: 'none', glow: 'rgba(109, 231, 255, 0.22)' },
  { id: 'cyber', name: 'Cyber Electric Blue', filter: 'hue-rotate(170deg) saturate(1.3)', glow: 'rgba(56, 189, 248, 0.3)' },
  { id: 'emerald', name: 'Emerald Forest', filter: 'hue-rotate(85deg) saturate(1.2)', glow: 'rgba(52, 211, 153, 0.25)' },
  { id: 'stealth', name: 'Stealth Carbon', filter: 'brightness(0.85) contrast(1.15) saturate(0.2)', glow: 'rgba(148, 163, 184, 0.2)' },
];

export default function PremiumHero() {
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [sheen, setSheen] = useState({ x: 45, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [turntableActive, setTurntableActive] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);

  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, initialY: 0, initialX: 0 });

  const carImage = '/images/hero/hero-car-tata-sierra.jpg';
  const currentColor = PAINT_FINISHES[colorIndex];

  const whatsappMessage = encodeURIComponent(
    'Hi Best Car Accessories, I would like to inquire about accessories and customization for my Tata Sierra / car.'
  );
  const whatsappLink = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;

  // 360° Cinematic Auto-Turntable Orbit Animation
  useEffect(() => {
    if (!turntableActive || isDragging) return;
    let animId;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = (now - startTime) * 0.001;
      // Smooth continuous oscillation across 3/4 perspective
      const autoY = Math.sin(elapsed * 0.7) * 18;
      const autoX = Math.cos(elapsed * 0.7) * 3.5;
      setRotY(autoY);
      setRotX(autoX);

      // Specular sheen travels along with the turntable
      setSheen({
        x: Math.round(45 + Math.sin(elapsed * 0.7) * 30),
        y: Math.round(38 + Math.cos(elapsed * 0.7) * 12),
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [turntableActive, isDragging]);

  // Smooth mouse-tracked 3D perspective when turntable is paused
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    setSheen({ x: Math.round(relX * 100), y: Math.round(relY * 100) });

    if (!dragRef.current.active && !turntableActive && window.innerWidth >= 1024) {
      const normX = (relX - 0.5) * 2;
      const normY = (relY - 0.5) * 2;
      setRotY(normX * 10);
      setRotX(-normY * 6);
    }
  }, [turntableActive]);

  // Interactive mouse drag to rotate 3D view
  const onMouseDown = useCallback((e) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      initialY: rotY,
      initialX: rotX,
    };
    setIsDragging(true);
  }, [rotY, rotX]);

  const onGlobalMouseMove = useCallback((e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setRotY(Math.max(-28, Math.min(28, dragRef.current.initialY + dx * 0.18)));
    setRotX(Math.max(-14, Math.min(14, dragRef.current.initialX - dy * 0.12)));
  }, []);

  const onGlobalMouseUp = useCallback(() => {
    dragRef.current.active = false;
    setIsDragging(false);
  }, []);

  // Touch drag for mobile / tablet
  const onTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      dragRef.current = {
        active: true,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        initialY: rotY,
        initialX: rotX,
      };
      setIsDragging(true);
    }
  }, [rotY, rotX]);

  const onTouchMove = useCallback((e) => {
    if (!dragRef.current.active || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragRef.current.startX;
    const dy = e.touches[0].clientY - dragRef.current.startY;
    setRotY(Math.max(-28, Math.min(28, dragRef.current.initialY + dx * 0.22)));
    setRotX(Math.max(-14, Math.min(14, dragRef.current.initialX - dy * 0.14)));
  }, []);

  const onTouchEnd = useCallback(() => {
    dragRef.current.active = false;
    setIsDragging(false);
  }, []);

  // Mouse wheel interactive zoom
  const onWheel = useCallback((e) => {
    e.preventDefault();
    setZoom((prev) => Math.max(0.85, Math.min(1.5, prev - e.deltaY * 0.0012)));
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (el) {
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [onWheel]);

  useEffect(() => {
    window.addEventListener('mousemove', onGlobalMouseMove);
    window.addEventListener('mouseup', onGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', onGlobalMouseMove);
      window.removeEventListener('mouseup', onGlobalMouseUp);
    };
  }, [onGlobalMouseMove, onGlobalMouseUp]);

  const handleReset = () => {
    setRotY(0);
    setRotX(0);
    setZoom(1);
    setColorIndex(0);
    setTurntableActive(false);
  };

  const handleZoomIn = () => setZoom((z) => Math.min(1.5, z + 0.12));
  const handleZoomOut = () => setZoom((z) => Math.max(0.85, z - 0.12));
  const toggleTurntable = () => setTurntableActive((prev) => !prev);
  const cyclePaintFinish = () => setColorIndex((prev) => (prev + 1) % PAINT_FINISHES.length);

  return (
    <section 
      className="hero-section"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (!dragRef.current.active && !turntableActive) {
          setRotY(0);
          setRotX(0);
        }
      }}
      aria-label="Best Car Accessories Showcase"
    >
      {/* Subtle Studio Backdrop Lighting */}
      <div className="hero-backdrop-gradient" />
      <div 
        className="hero-backdrop-glow"
        style={{
          background: `radial-gradient(ellipse 65% 50% at 72% 48%, ${currentColor.glow} 0%, transparent 68%)`
        }}
      />
      <div className="hero-subtle-floor-grid" />

      {/* Main Container */}
      <div className="hero-container">

        {/* ── LEFT: Formatted Editorial & Clear Shop Tagline ── */}
        <div className="hero-intro">
          
          {/* Shop Tagline / Location Eyebrow */}
          <div className="hero-tagline-badge">
            <span className="hero-tagline-dot" />
            <span className="hero-tagline-text">
              BEST CAR ACCESSORIES · ROYAPETTAH, CHENNAI
            </span>
          </div>

          {/* Clean, Bold Headline */}
          <h1 className="hero-heading">
            ELEVATE YOUR DRIVE.<br />
            <span className="hero-heading-highlight">PREMIUM CAR ACCESSORIES</span><br />
            &amp; CUSTOM UPGRADES.
          </h1>

          {/* Clear, Engaging Shop Tagline Intro */}
          <p className="hero-subheading">
            Chennai's premier automotive styling studio since 2009. We specialize in high-precision LED lighting, laser fog projectors, 18-zone ambient cabins, Android infotainment, and bespoke interiors — all with <strong>100% coupler-to-coupler fitment</strong> and <strong>zero wire cutting</strong> to preserve your original factory warranty.
          </p>

          {/* Core CTAs */}
          <div className="hero-cta-group">
            <Link to="/exterior-car-accessories-chennai" className="hero-btn hero-btn--primary">
              <span>Explore Accessories</span>
              <ArrowRight size={15} className="hero-btn-arrow" />
            </Link>

            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-btn hero-btn--whatsapp"
              aria-label="WhatsApp Studio Consultation"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Consultation</span>
            </a>

            <Link to="/contact" className="hero-btn hero-btn--ghost">
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Clean Shop Trust Metrics */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-number">15+</span>
              <span className="trust-label">Years of Mastery</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-number">1,000+</span>
              <span className="trust-label">Cars Upgraded</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-number">100%</span>
              <span className="trust-label">Coupler Fitment</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-number">0</span>
              <span className="trust-label">Wire Cutting</span>
            </div>
          </div>

        </div>

        {/* ── RIGHT: Highly Interactive 3D Car Visual Stage ── */}
        <div 
          className={`hero-visual-stage ${isDragging ? 'is-dragging' : ''}`}
          ref={stageRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          title="Drag to rotate view, scroll to zoom"
        >
          {/* 3D Vehicle Stage Rig with Dynamic Multi-axis Tilt & Zoom */}
          <div 
            className="hero-car-rig"
            style={{
              transform: `perspective(1400px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${zoom})`,
            }}
          >
            {/* Soft Contact Shadow on Studio Ground */}
            <div className="hero-car-shadow" />

            {/* Complete, Realistic 3D SUV Image (Tata Sierra in 3/4 Perspective) */}
            <div className="hero-car-wrapper">
              <img 
                src={carImage} 
                alt="Tata Sierra Modern 3D SUV Showcase — Best Car Accessories Chennai" 
                className="hero-car-image"
                draggable="false"
                loading="eager"
                style={{
                  filter: currentColor.filter,
                }}
              />

              {/* Dynamic Clearcoat Specular Sheen (Real-time tracking of cursor) */}
              <div 
                className="hero-car-sheen" 
                style={{
                  background: `radial-gradient(circle 380px at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, 0.18) 0%, rgba(109, 231, 255, 0.06) 45%, transparent 75%)`
                }}
              />
            </div>
          </div>

          {/* Interactive Floating 3D Controls Dock */}
          <div className="hero-interactive-dock">
            {/* 3D Turntable Auto-Orbit Mode */}
            <button 
              type="button" 
              className={`interactive-tool-btn ${turntableActive ? 'is-active' : ''}`} 
              onClick={toggleTurntable}
              title={turntableActive ? "Pause 3D Turntable" : "Start 3D Turntable Auto-Orbit"}
              aria-label="Toggle 3D Turntable"
            >
              {turntableActive ? <Pause size={13} /> : <Play size={13} />}
              <span>{turntableActive ? '3D Turntable: ON' : '3D Turntable: PAUSED'}</span>
            </button>

            <div className="dock-separator" />

            {/* Paint Finish / Wrap Customizer */}
            <button
              type="button"
              className="interactive-tool-btn"
              onClick={cyclePaintFinish}
              title="Change Custom Paint / Wrap Finish"
              aria-label="Change Paint Finish"
            >
              <Palette size={13} />
              <span>Wrap: {currentColor.name}</span>
            </button>

            <div className="dock-separator" />

            {/* Zoom Controls */}
            <button 
              type="button" 
              className="interactive-tool-btn" 
              onClick={handleZoomIn}
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn size={14} />
            </button>

            <button 
              type="button" 
              className="interactive-tool-btn" 
              onClick={handleZoomOut}
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>

            <button 
              type="button" 
              className="interactive-tool-btn" 
              onClick={handleReset}
              title="Reset 3D View"
              aria-label="Reset 3D View"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>

          {/* Subtle Interaction Instruction */}
          <div className="hero-drag-hint">
            <RotateCcw size={11} className="drag-hint-icon" />
            <span>DRAG TO ORBIT 3D · SCROLL TO ZOOM · CLICK WRAP TO CUSTOMIZE</span>
          </div>

        </div>

      </div>
    </section>
  );
}