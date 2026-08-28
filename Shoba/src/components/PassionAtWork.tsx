import React, { useRef } from 'react';
import { LeafAccent } from './LeafAccent';
import { BirdsAccent } from './BirdsAccent';
import { gsap, useGSAP, Draggable } from '../lib/gsapSetup';

interface PassionAtWorkProps {
  onReadMore: () => void;
}

export const PassionAtWork: React.FC<PassionAtWorkProps> = ({ onReadMore }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      Draggable.create(containerRef.current, {
        type: 'x,y',
        edgeResistance: 0.5,
        cursor: 'grab',
        activeCursor: 'grabbing',
        onDragStart: function() {
          gsap.to('.drag-badge', { opacity: 0, scale: 0.8, duration: 0.25 });
        },
        onDragEnd: function () {
          gsap.to(this.target, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.55)',
            onComplete: () => {
              gsap.to('.drag-badge', { opacity: 1, scale: 1, duration: 0.25 });
            }
          });
        },
      });
    }
  }, { scope: containerRef });

  return (
    <section 
      id="passion" 
      style={{
        padding: '5rem 0',
        background: '#fcfbf7',
        color: '#111827',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <BirdsAccent corner="top-right" size="45%" opacity={0.18} />

      <LeafAccent corner="bottom-left" size="26%" opacity={0.14} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Image */}
          <div className="reveal-left" style={{ overflow: 'visible' }}>
            <div
              ref={containerRef}
              style={{
                position: 'relative',
                borderRadius: '8px',
                touchAction: 'none',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                userSelect: 'none',
              }}
            >
              <img
                src="/media/images/reviva-building-with-nature-custom.png"
                alt="Our Nature is truly down to earth - Reviva Projects building in harmony with lush greenery"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '440px',
                  display: 'block',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  pointerEvents: 'none',
                  WebkitUserDrag: 'none',
                }}
              />
              
              {/* Drag Me Indicator */}
              <div 
                className="drag-badge"
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: 'rgba(10, 13, 20, 0.75)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(159, 120, 61, 0.35)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                <span 
                  style={{ 
                    display: 'inline-block', 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    background: '#9F783D', 
                    boxShadow: '0 0 8px #9F783D'
                  }} 
                />
                DRAG ME
              </div>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="reveal-right" style={{ maxWidth: '580px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                letterSpacing: '0.5px',
                color: '#9F783D',
                marginBottom: '1.5rem',
                lineHeight: 1.2,
              }}
            >
              Our Nature is truly down to earth
            </h2>

            <p 
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: '#374151',
                marginBottom: '2.25rem',
                fontWeight: 400,
              }}
            >
              The seeds of Reviva were born out of a desire to build not just homes, but a harmonious way of life. The founders of Reviva envisioned a future where people lived as part of an interconnected community where nature wasn't just a backdrop but an integral part of everyday life
            </p>

            <button
              onClick={onReadMore}
              className="btn-primary btn-magnetic"
              style={{
                background: '#9F783D',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 2.25rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(159, 120, 61, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#b58b4b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#9F783D';
              }}
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
