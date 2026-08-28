import React from 'react';
import type { CityInfo } from '../types';

interface CommercialPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const CommercialPage: React.FC<CommercialPageProps> = () => {
  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(180deg, rgba(13, 22, 22, 0.9) 0%, rgba(13, 22, 22, 0.75) 100%), url("/media/images/eco-house-hero.jpg") center/cover no-repeat',
          padding: '6rem 0 4rem 0',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="hero-reveal" style={{ color: 'var(--primary-accent)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-block' }}>
            WHAT WE DO
          </span>
          <h1 className="hero-reveal hero-reveal-delay-1 gold-shimmer-text" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))' }}>
            Commercial Developments & Retail
          </h1>
          <p className="hero-reveal hero-reveal-delay-2" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#d1d5db', lineHeight: 1.6 }}>
            Iconic commercial towers, modern IT parks, and luxury retail destinations across India.
          </p>
        </div>
      </section>

      {/* Commercial Showcase Section */}
      <section className="reveal" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            <div className="reviva-card-hover" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
              <div>
                <img
                  className="flip-parallax"
                  src="/media/images/eco-house-hero.jpg"
                  alt="Reviva City Mall"
                  style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <span style={{ color: '#9E783C', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Thrissur</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', margin: '0.4rem 0 0.75rem 0' }}>
                  Reviva City Mall
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Spanning over 4.5 lakh sq. ft., Reviva City Mall is Central Kerala's flagship retail and entertainment destination with luxury brands, multiplexes, and fine dining.
                </p>
              </div>
            </div>

            <div className="reviva-card-hover" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
              <div>
                <img
                  className="flip-parallax"
                  src="/media/images/commercial-tower-green.jpg"
                  alt="1 Reviva"
                  style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <span style={{ color: '#9E783C', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Bengaluru</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', margin: '0.4rem 0 0.75rem 0' }}>
                  1 Reviva
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  A futuristic commercial landmark located on St. Mark's Road, offering Grade-A corporate office suites with sustainable LEED-certified infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
