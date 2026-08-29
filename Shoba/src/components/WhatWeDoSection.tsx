import React from 'react';

interface WhatWeDoSectionProps {
  onNavigate: (path: string) => void;
}

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({ onNavigate }) => {
  const promises = [
    {
      title: 'Innovation in Design',
      desc: 'Design is at the heart of everything we create. Our thoughtfully curated spaces are a seamless blend of innovation, functionality, and aesthetics',
      img: '/media/images/reviva-innovationdesign.jpg',
      imageLeft: true,
    },
    {
      title: 'Transparency & Trust',
      desc: 'We are committed to upholding the highest standards of integrity and openness. From introducing the project to the final handover, we prioritise honest practices to foster lasting relationships',
      img: '/media/images/transparency-and-trust.jpeg',
      imageLeft: false,
    },
    {
      title: 'Redefining Elevated Living',
      desc: 'Where we live shapes how we live. Leveraging our extensive experience and refined insight, we craft spaces tailored to the unique needs enhancing spaces that embody quality and elegance',
      img: '/media/images/redefining-elevated-living.jpeg',
      imageLeft: true,
    },
  ];

  return (
    <section style={{ padding: '5rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="reveal-scale" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-accent)', fontSize: '1.85rem', fontWeight: 700, color: '#00433D', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            OUR PROMISE
          </h2>
          <div style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, #9F783D 0%, #00433D 100%)', margin: '0 auto 1.25rem auto' }} />
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 500, color: '#9F783D', maxWidth: '720px', margin: '0 auto', lineHeight: 1.45 }}>
            We transform spaces with designs with commitment to enhancing lives in every aspect
          </p>
        </div>

        {/* Promise Feature Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {promises.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '3.5rem',
                alignItems: 'center',
              }}
            >
              {/* Image Block */}
              <div className={item.imageLeft ? 'reveal-left' : 'reveal-right'} style={{ order: item.imageLeft ? 1 : 2 }}>
                <img
                  className="flip-parallax"
                  src={item.img}
                  alt={item.title}
                  style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '12px', display: 'block', background: 'transparent', boxShadow: '0 14px 32px rgba(0,0,0,0.12)' }}
                />
              </div>

              {/* Text Block */}
              <div className={item.imageLeft ? 'reveal-right' : 'reveal-left'} style={{ order: item.imageLeft ? 2 : 1, maxWidth: '520px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.01em', color: '#9F783D', marginBottom: '1rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.02rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {item.desc}
                </p>
                <button
                  onClick={() => onNavigate('/who-we-are')}
                  className="btn-outline"
                  style={{
                    background: 'transparent',
                    border: '1.5px solid #9F783D',
                    color: '#9F783D',
                    padding: '0.6rem 1.6rem',
                    fontFamily: 'var(--font-button)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    borderRadius: '50px',
                    cursor: 'pointer',
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
