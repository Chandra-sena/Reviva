import React from 'react';
import type { CityInfo } from '../types';
import { Award, Trophy, Star } from 'lucide-react';
import { BirdsAccent } from '../components/BirdsAccent';

interface ShowcasePageProps {
  cityInfo: CityInfo;
}

export const ShowcasePage: React.FC<ShowcasePageProps> = () => {
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
        <BirdsAccent corner="top-right" size="16%" opacity={0.12} color="#3a7d6f" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="hero-reveal" style={{ color: 'var(--primary-accent)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            SHOWCASE & LEGACY
          </span>
          <h1 className="hero-reveal hero-reveal-delay-1 gold-shimmer-text" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))' }}>
            The Reviva Journey & Showcase
          </h1>
          <p className="hero-reveal hero-reveal-delay-2" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#d1d5db', lineHeight: 1.6 }}>
            Decades of pioneering engineering excellence, coveted awards, and delivered landmarks.
          </p>
        </div>
      </section>

      {/* The Reviva Journey Timeline */}
      <section id="journey" style={{ padding: '5rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: '#0a0a0a' }}>
              The Reviva Journey
            </h2>
            <span className="line-draw" style={{ margin: '0.75rem auto' }} />
            <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.4rem' }}>
              Key milestones on our path to bringing meaning to life.
            </p>
          </div>

          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              { year: '1995', title: 'Foundation of Reviva', desc: 'Reviva is founded on the idea of creating spaces that embody life, growth, and harmony.' },
              { year: '2006', title: 'Growing Investor Confidence', desc: 'A milestone capital raise reflects growing confidence in Reviva\'s vision for sustainable living.' },
              { year: '2015', title: 'A Model Worth Studying', desc: 'Reviva\'s eco-conscious, community-first design approach becomes a widely referenced case study.' },
              { year: '2024+', title: 'Pan-India Expansion', desc: 'Expansion into Delhi-NCR, Mumbai, GIFT City, Hyderabad, Trivandrum, and beyond.' },
            ].map((milestone, idx) => (
              <div key={idx} className="reviva-card-hover" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#9E783C', display: 'block', marginBottom: '0.5rem' }}>
                  {milestone.year}
                </span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {milestone.title}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Honours Section */}
      <section id="awards" style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: '#0a0a0a' }}>
              Awards & Honours
            </h2>
            <span className="line-draw" style={{ margin: '0.75rem auto' }} />
            <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.4rem' }}>
              Recognised for design excellence, sustainability, and community-focused living.
            </p>
          </div>

          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="card-tilt" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
              <Trophy size={42} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Real Estate Excellence Ranking</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Recognised among the most trusted eco-conscious developers for several consecutive years.</p>
            </div>

            <div className="card-tilt" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
              <Award size={42} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Sustainable Design Awards</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Recognised for Best Residential Architecture and Safety Standards.</p>
            </div>

            <div className="card-tilt" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
              <Star size={42} color="#9E783C" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Governance Excellence Recognition</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Excellence in Corporate Governance & Operational Transparency.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
