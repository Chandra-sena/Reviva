import React from 'react';
import type { CityInfo } from '../types';
import { Leaf, Sun, Droplets, Recycle, ShieldCheck, Package } from 'lucide-react';

interface SustainabilityPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = () => {
  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* Hero Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('/media/images/cultivating-tomorrow.webp') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
          padding: '0 1.5rem',
          overflow: 'hidden',
        }}
      >
        <span className="hero-reveal" style={{ position: 'relative', zIndex: 1, color: '#e5b869', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          REVIVA ECO LIVING
        </span>
        <h1
          className="hero-reveal hero-reveal-delay-1 gold-shimmer-text"
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.85))',
            letterSpacing: '1px',
            marginBottom: '0.5rem',
          }}
        >
          Sustainability Redefined
        </h1>
        <p className="hero-reveal hero-reveal-delay-2" style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.92)', fontSize: '1.1rem', maxWidth: '650px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          Discover Reviva’s commitment to eco-friendly designs, green spaces, and innovative sustainability solutions for a healthier tomorrow.
        </p>
      </section>

      {/* Feature 1: Cultivating Tomorrow */}
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          <div className="reveal-left">
            <img
              className="flip-parallax"
              src="/media/images/cultivating-tomorrow.webp"
              alt="Cultivating Tomorrow - Reviva Eco Living"
              style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
            />
          </div>

          <div className="reveal-right">
            <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              SUSTAINABLE COMMUNITIES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: '#0f172a', margin: '0.5rem 0 1.5rem 0' }}>
              Cultivating Tomorrow
            </h2>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              Our communities feature urban farming plots, lush patio gardens, and expansive green open zones. Residents experience the joy of living in harmony with nature while enjoying modern luxury comforts.
            </p>

            <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Leaf color="#9E783C" size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Urban Organic Farms</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Droplets color="#9E783C" size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Rainwater Recycling</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2: Smart Sustainability */}
      <div style={{ background: '#f8fafc', padding: '5rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div className="reveal-left">
              <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                INNOVATIVE TECHNOLOGY
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: '#0f172a', margin: '0.5rem 0 1.5rem 0' }}>
                Smart Sustainability
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                Our approach combines innovative technology and thoughtful design for a greener tomorrow. Every Reviva development incorporates solar power grid integration, energy-efficient lighting, and zero-waste composting units.
              </p>

              <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Sun color="#9E783C" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Solar Rooftop Grid:</strong> Powering common lighting, elevators, and EV charging stations.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Recycle color="#9E783C" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>Zero Waste Management:</strong> On-site organic waste convertors generating natural fertilizer.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <ShieldCheck color="#9E783C" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#0f172a' }}>IGBC Green Building Certified:</strong> Designed for optimal thermal insulation and natural daylighting.
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right">
              <img
                className="flip-parallax"
                src="/media/images/smart-sustainability.webp"
                alt="Smart Sustainability - Reviva Projects"
                style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3: Eco-Conscious Design */}
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          <div className="reveal-left">
            <img
              className="flip-parallax"
              src="/media/images/reviva-eco.jpg"
              alt="Eco-Conscious Design - Reviva Projects"
              style={{ width: '100%', height: 'auto', maxHeight: '420px', objectFit: 'cover', display: 'block', margin: '0 auto', borderRadius: '12px' }}
            />
          </div>

          <div className="reveal-right">
            <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              GREEN BUILDING PRINCIPLES
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: '#0f172a', margin: '0.5rem 0 1.5rem 0' }}>
              Eco-Conscious Design
            </h2>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              From energy-efficient designs and water conservation systems to the use of sustainable materials that reduce carbon footprint, our designs are built with the environment in mind.
            </p>

            <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Sun color="#9E783C" size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Energy-Efficient Design</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Droplets color="#9E783C" size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Water Conservation</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Package color="#9E783C" size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Sustainable Materials</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
