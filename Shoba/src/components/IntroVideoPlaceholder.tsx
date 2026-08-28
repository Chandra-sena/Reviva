import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsapSetup';

interface IntroVideoPlaceholderProps {
  onExplore: () => void;
}

export const IntroVideoPlaceholder: React.FC<IntroVideoPlaceholderProps> = ({ onExplore }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // GSAP-scrubbed parallax: background drifts slower than the page as you scroll past the hero
  useGSAP(
    () => {
      gsap.fromTo(
        parallaxRef.current,
        { y: -30 },
        {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="home-hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        maxHeight: '1080px',
        overflow: 'hidden',
        background: '#111827',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
      }}
    >
      {/* Background Project Showcase Video */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Parallax layer (GSAP-driven translateY) — oversized 60px top/bottom so it never exposes edges */}
        <div ref={parallaxRef} style={{ position: 'absolute', top: '-60px', left: 0, right: 0, bottom: '-60px' }}>
          {/* Ken Burns layer (CSS-driven ambient scale) — kept on its own node so the two transforms never fight */}
          <div className="ken-burns" style={{ position: 'absolute', inset: 0 }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/media/images/home-hero-poster.jpg"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.9)',
              }}
            >
              <source src="/media/videos/home-hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Glassmorphic Box Overlay on Right */}
      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'flex-end' }}>
        <div
          style={{
            background: 'rgba(0, 67, 61, 0.55)',
            backdropFilter: 'blur(9px)',
            WebkitBackdropFilter: 'blur(9px)',
            borderRadius: '20px',
            padding: '3rem 2.5rem',
            maxWidth: '520px',
            color: '#ffffff',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h1
            className="hero-reveal gold-shimmer-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 600,
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
            }}
          >
            Designing A Future Where Life Truly Flourishes
          </h1>

          <p
            className="hero-reveal hero-reveal-delay-1"
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2rem',
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            We build spaces to evolve along your lifestyle
          </p>

          <button
            onClick={onExplore}
            className="btn-primary btn-magnetic hero-reveal hero-reveal-delay-2"
            style={{
              background: '#9F783D',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50px',
              padding: '0.85rem 2.25rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '1px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#b58b4b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#9F783D';
            }}
          >
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};
