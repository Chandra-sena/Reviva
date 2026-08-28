import React from 'react';
import type { CityInfo } from '../types';
import { ShieldCheck, Cpu, Users, Leaf, CheckCircle2 } from 'lucide-react';
import { LeafAccent } from '../components/LeafAccent';

interface WhoWeArePageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const WhoWeArePage: React.FC<WhoWeArePageProps> = () => {
  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* 1. Hero Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.75) 100%), url('/media/images/reviva-harmony-with-nature.jpg') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
          padding: '0 1.5rem',
        }}
      >
        <span className="hero-reveal" style={{ color: '#e5b869', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          ABOUT REVIVA PROJECTS
        </span>
        <h1
          className="hero-reveal hero-reveal-delay-1 gold-shimmer-text"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            fontWeight: 700,
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.85))',
            letterSpacing: '0.5px',
            maxWidth: '900px',
          }}
        >
          Where Innovation In Design Shapes The Future Of Living
        </h1>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '4rem' }}>

        {/* Story Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '4.5rem', position: 'relative', overflow: 'hidden' }}>
          <LeafAccent corner="bottom-left" size="11%" opacity={0.07} />
          <div className="reveal-left" style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 600, color: '#9F783D', marginBottom: '1.25rem' }}>
              Our Story
            </h2>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.25rem' }}>
              The seeds of Reviva were born out of a desire to build not just homes, but a harmonious way of life. The founders of Reviva envisioned a future where people lived as part of an interconnected community where nature wasn't just a backdrop but an integral part of everyday life.
            </p>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.75rem' }}>
              Our designs enrich lives through eco-friendly architecture, energy-efficient solutions, and meaningful connections. Each project features lush landscapes, world-class amenities, and privacy-oriented layouts.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Thoughtful eco-friendly architecture & rainwater harvesting',
                'Lush verdant landscapes & private patio layouts',
                'Modern lifestyle amenities integrated into serene nature',
                'Transparent processes from introducing the project to handover'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#9F783D" />
                  <span style={{ fontSize: '0.95rem', color: '#111827', fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-right">
            <div className="card-tilt" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img
                className="flip-parallax"
                src="/media/images/eco-house-hero.jpg"
                alt="Reviva Projects Craftsmanship" 
                style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission Split Cards */}
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4.5rem' }}>
          <div className="card-tilt" style={{ background: '#00433D', color: '#ffffff', padding: '2.75rem 2.25rem', borderRadius: '16px', border: '1px solid #00433D' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: '#9F783D', marginBottom: '1rem' }}>
              Our Vision
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.9)' }}>
              To redefine modern living by creating sustainable, eco-friendly, and thoughtfully designed spaces where communities thrive and every family discovers a place to flourish.
            </p>
          </div>

          <div className="card-tilt" style={{ background: '#fcfbf7', color: '#111827', padding: '2.75rem 2.25rem', borderRadius: '16px', border: '1px solid #9F783D' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: '#00433D', marginBottom: '1rem' }}>
              Our Mission
            </h3>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#4b5563' }}>
              To deliver exceptional construction quality, pioneer innovative sustainable architecture, and build transparent, lasting relationships with every homeowner we serve.
            </p>
          </div>
        </div>

        {/* Philosophy Card */}
        <div className="reveal-scale" style={{ background: '#fcfbf7', padding: '3rem', borderRadius: '16px', border: '1px solid #e5e7eb', textAlign: 'center', marginBottom: '4.5rem' }}>
          <span style={{ color: '#9F783D', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
            REVIVA PHILOSOPHY
          </span>
          <h2 className="gold-shimmer-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}>
            Life is Beautiful
          </h2>
          <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#374151', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
            "Every home we create reflects the beauty, joy, and wonder of life. Designed to embrace laughter, dreams, and growth, our spaces are crafted to make daily living inspiring and meaningful."
          </p>
        </div>

        {/* Brand Core Values 4-Grid */}
        <div>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 600, color: '#00433D', marginBottom: '0.5rem' }}>
              Our Brand Values
            </h2>
            <span className="line-draw" style={{ margin: '0 auto' }} />
          </div>

          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: Users, title: 'Thriving Community', desc: 'Creating communities that inspire togetherness, foster relationships, and enrich lives through shared experiences.' },
              { icon: Cpu, title: 'Innovation in Design', desc: 'Blending creativity with functionality to craft spaces that elevate living and reflect modern aspirations.' },
              { icon: ShieldCheck, title: 'Holistic Well-Being', desc: 'Prioritising environments that support physical, emotional, and social wellness for balanced lifestyles.' },
              { icon: Leaf, title: 'Eco Friendly Living', desc: 'With a commitment to creating long-term value for people and the planet, we practice sustainability with integrity.' },
            ].map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="reviva-card-hover" style={{ background: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #9F783D', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                  <IconComp size={34} color="#9F783D" style={{ marginBottom: '1rem' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#00433D', marginBottom: '0.5rem' }}>{val.title}</h4>
                  <p style={{ color: '#4b5563', fontSize: '0.92rem', lineHeight: 1.6 }}>{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
