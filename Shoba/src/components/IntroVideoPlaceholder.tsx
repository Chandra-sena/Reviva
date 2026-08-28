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
    </section>
  );
};
