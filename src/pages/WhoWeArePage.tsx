import React from 'react';
import type { CityInfo } from '../types';
import { Award, ShieldCheck, Cpu, Users, Building2, CheckCircle2, Leaf } from 'lucide-react';
import { DoveMark } from '../components/RevivaLogo';

interface WhoWeArePageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const WhoWeArePage: React.FC<WhoWeArePageProps> = ({ cityInfo }) => {
  return (
    <div style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* 1. Hero Banner */}
      <section 
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          BRINGING MEANING TO LIFE
        </span>
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 400, 
            letterSpacing: '1px',
          }}
        >
          Who We Are
        </h1>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        
        {/* Statistics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {[
            { icon: Award, label: 'Years of Excellence', value: `${cityInfo.stats.legacyYears}+ Years` },
            { icon: Building2, label: 'Delivered Area', value: cityInfo.stats.deliveredSqFt },
            { icon: Cpu, label: 'Projects Completed', value: `${cityInfo.stats.projectsDelivered}+ Projects` },
            { icon: Users, label: 'Happy Families', value: cityInfo.stats.happyFamilies },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} style={{ background: '#f8fafc', padding: '2rem', textAlign: 'center', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <IconComponent size={36} color="#9E783C" style={{ margin: '0 auto 0.75rem auto' }} />
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#9E783C' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Brand Story Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <span style={{ color: '#9E783C', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              OUR STORY
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#0f172a', margin: '0.5rem 0 1.25rem 0' }}>
              A Story of Sustainable Living
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1rem' }}>
              Reviva was founded on the idea of creating spaces that embody life, growth, and harmony. With decades of experience in real estate, our team combines a legacy of excellence with innovative vision.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1rem' }}>
              Our designs enrich lives through eco-friendly architecture, energy-efficient solutions, and meaningful connections. Each project features lush landscapes, world-class amenities, and privacy-oriented layouts, all reflecting our commitment to quality of life.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Eco-friendly architecture & energy-efficient solutions',
                'Lush landscapes and privacy-oriented layouts',
                'World-class amenities designed for daily life',
                'Every home is a story of sustainable living and vibrant community'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#9E783C" />
                  <span style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#0f172a', color: '#ffffff', padding: '2.5rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#9E783C', marginBottom: '1rem' }}>
              The Reviva Philosophy
            </h3>
            <p className="font-script" style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.75rem' }}>
              Life is Beautiful
            </p>
            <blockquote style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#e2e8f0', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              "Every home we create reflects the beauty, joy, and wonder of life. Designed to embrace laughter, dreams, and growth, our spaces are crafted to make daily living inspiring and meaningful — because a beautiful life deserves a beautiful place to unfold."
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ShieldCheck size={36} color="#9E783C" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff' }}>Reviva Projects</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Bringing Meaning to Life</div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Values Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ color: '#9E783C', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              WHAT WE STAND FOR
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#0f172a', margin: '0.5rem 0 0 0' }}>
              Our Brand Values
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
            {[
              { icon: Users, title: 'Thriving Community', desc: 'Creating communities that inspire togetherness, foster relationships, and enrich lives through shared experiences.' },
              { icon: Cpu, title: 'Innovation in Design', desc: 'Blending creativity with functionality to craft spaces that elevate living and reflect modern aspirations.' },
              { icon: ShieldCheck, title: 'Holistic Well-Being', desc: 'Prioritising environments that support physical, emotional, and social wellness for balanced, fulfilling lifestyles.' },
              { icon: Leaf, title: 'Eco Friendly Living', desc: 'With a commitment to creating long-term value for people and the planet, we practice sustainability with integrity and accountability.' },
            ].map((value, idx) => {
              const IconComp = value.icon;
              return (
                <div key={idx} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <IconComp size={32} color="#9E783C" style={{ marginBottom: '0.85rem' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>{value.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Personality Strip */}
        <div style={{ marginTop: '3.5rem', background: 'linear-gradient(135deg, #9E783C 0%, #4A381C 100%)', color: '#ffffff', padding: '3rem 2.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
          <DoveMark size={44} color="#ffffff" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.8, color: '#e9e2f7' }}>
            As visionaries, we create spaces that inspire connection and transformation through innovative design and timeless aesthetics. Committed to sustainability and community, we nurture environments where people and nature thrive. Reviva redefines modern living with thoughtful, future-ready spaces that balance beauty, purpose, and possibility.
          </p>
        </div>

      </div>
    </div>
  );
};
