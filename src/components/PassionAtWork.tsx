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
        background: '#ffffff',
        color: '#111827',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column Image */}
          <div>
            <div 
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                position: 'relative',
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80" 
                alt="PASSION AT WORK - Top Real Estate Company & Builders in India"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          {/* Right Column Content */}
          <div style={{ position: 'relative' }}>
            <h3 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: '#0a0a0a',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              PASSION AT WORK
            </h3>

            <div 
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#4b5563',
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <p>
                Reviva was founded on the idea of creating spaces that embody life, growth, and harmony. This underlies our quest to deliver eco-conscious quality and meaningful craftsmanship.
              </p>
              <p>
                With decades of experience in real estate, our team combines a legacy of excellence with innovative vision, instilling a passion that transcends generations and boundaries.
              </p>
              <p>
                Our evolving portfolio speaks volumes — thoughtfully designed developments that have redefined skylines, from Bengaluru to Delhi-NCR and beyond. Our legacy of trust, reliability, and excellence is deeply etched in the landscape of India, as we expand into new horizons like Mumbai, Greater Noida, Chennai, Coimbatore, Mysuru, Pune, and many more cities on the horizon.
              </p>
              <p>
                Looking ahead, we remain steadfast in master-crafting self-sustaining, vibrant urban living spaces.
              </p>
            </div>

            <button 
              onClick={onReadMore}
              style={{
                background: 'transparent',
                border: '1.5px solid #111827',
                color: '#111827',
                padding: '0.75rem 2rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '2px',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#111827';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#111827';
              }}
            >
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
