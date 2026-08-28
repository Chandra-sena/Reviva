import React from 'react';
import type { CityInfo } from '../types';
import { Layers, ShieldCheck, Cpu, Feather } from 'lucide-react';
import { LeafAccent } from '../components/LeafAccent';

interface ManufacturingPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const ManufacturingPage: React.FC<ManufacturingPageProps> = () => {
  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(180deg, rgba(13, 22, 22, 0.9) 0%, rgba(13, 22, 22, 0.75) 100%), url("/media/images/legacy-heritage-hero.jpg") center/cover no-repeat',
          padding: '6rem 0 4rem 0',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <LeafAccent corner="top-right" size="16%" opacity={0.12} color="#3a7d6f" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="hero-reveal" style={{ color: 'var(--primary-accent)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            WHAT WE DO
          </span>
          <h1 className="hero-reveal hero-reveal-delay-1 gold-shimmer-text" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))' }}>
            Manufacturing & Interiors Division
          </h1>
          <p className="hero-reveal hero-reveal-delay-2" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#d1d5db', lineHeight: 1.6 }}>
            In-house manufacturing divisions ensuring German precision and zero-defect execution.
          </p>
        </div>
      </section>

      {/* Manufacturing Divisions */}
      <section className="reveal" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div id="interiors" className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <Layers size={38} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Reviva Interiors
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>
                India's largest woodworking and joinery factory, producing luxury doors, wardrobes, and custom cabinetry with automated German machinery.
              </p>
            </div>

            <div id="glazing-and-metal" className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <Cpu size={38} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Glazing & Metal Works
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Precision aluminum glazing, structural facade engineering, and architectural metal fabrication for weather-resistant high-rise towers.
              </p>
            </div>

            <div id="concrete-products" className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <ShieldCheck size={38} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Concrete Products
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>
                High-grade concrete paving blocks, curb stones, and pre-cast concrete elements manufactured in automated mixing plants.
              </p>
            </div>

            <div id="restoplus" className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <Feather size={38} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Reviva Restoplus
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Premium spring mattress brand engineered for orthopaedic support and five-star luxury hotel sleep comfort.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
