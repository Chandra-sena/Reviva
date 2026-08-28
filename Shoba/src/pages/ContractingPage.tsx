import React from 'react';
import type { CityInfo } from '../types';
import { Briefcase, Building, CheckCircle } from 'lucide-react';

interface ContractingPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const ContractingPage: React.FC<ContractingPageProps> = () => {
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
            Institutional & Corporate Contracting
          </h1>
          <p className="hero-reveal hero-reveal-delay-2" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#d1d5db', lineHeight: 1.6 }}>
            Delivered over 350+ turnkey corporate projects for global giants like Infosys, Taj Group, Dell, and Bosch.
          </p>
        </div>
      </section>

      {/* Business Services */}
      <section id="business" style={{ padding: '5rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: '#0a0a0a' }}>
              Contracting Business Services
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              End-to-end design-build execution for India's leading corporate campuses and institutions.
            </p>
          </div>

          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <Briefcase size={36} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Corporate Campuses</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Turnkey construction of software development centers, corporate headquarters, and high-tech campuses.
              </p>
            </div>

            <div className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <Building size={36} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Hospitality Landmarks</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Luxury hotels, resorts, and convention centers crafted to exacting global hospitality standards.
              </p>
            </div>

            <div className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <CheckCircle size={36} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Institutions & Universities</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Educational institutions, research facilities, and training centers with modern infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
