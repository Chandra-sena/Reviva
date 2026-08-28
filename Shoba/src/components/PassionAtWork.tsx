import React from 'react';

interface PassionAtWorkProps {
  onReadMore: () => void;
}

export const PassionAtWork: React.FC<PassionAtWorkProps> = ({ onReadMore }) => {
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
          <div className="reveal-left">
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <img
                className="flip-parallax"
                src="/media/images/reviva-building-with-nature.jpg"
                alt="Our Nature is truly down to earth - Reviva Projects building in harmony with lush greenery"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '440px',
                  display: 'block',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
              />
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
