import React from 'react';
import { ShieldCheck, Award, Factory, Users } from 'lucide-react';
import { LeafAccent } from './LeafAccent';
import { CountUp } from './CountUp';

export const MoreAboutSection: React.FC = () => {
  return (
    <section style={{ background: '#ffffff', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      <LeafAccent corner="top-right" size="18%" opacity={0.1} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        <div className="reveal-scale" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            ABOUT REVIVA PROJECTS
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0f172a', marginTop: '0.5rem' }}>
            MORE ABOUT REVIVA
          </h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginTop: '1rem' }}>
            Reviva was founded on the idea of creating spaces that embody life, growth, and harmony. With decades of experience in real estate, our team combines a legacy of excellence with innovative vision, delivering thoughtfully designed residential and commercial spaces across multiple major cities.
          </p>
        </div>

        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          <div className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <ShieldCheck size={36} color="#9E783C" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              Backward Integration
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>
              In-house factories for woodworking, glazing, metal works, and precast concrete ensuring zero-defect quality control.
            </p>
          </div>

          <div className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <Award size={36} color="#9E783C" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              <CountUp end={500} suffix="+" /> Industry Awards
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Consistently recognized as India’s Most Trusted Real Estate Brand by independent industry audits.
            </p>
          </div>

          <div className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <Factory size={36} color="#9E783C" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              German Engineering
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Advanced automated machinery and international construction protocols imported directly from Germany.
            </p>
          </div>

          <div className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <Users size={36} color="#9E783C" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              <CountUp end={40000} suffix="+" /> Happy Families
            </h4>
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>
              A thriving community of satisfied homeowners across Bangalore, NCR, Mumbai, Chennai, and Hyderabad.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
