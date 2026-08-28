import React from 'react';
import type { CityInfo } from '../types';
import { Home, Building, Sparkles, Wrench, ArrowRight } from 'lucide-react';
import { LeafAccent } from '../components/LeafAccent';

const residentialImage = '/media/images/residential-towers.jpeg';
const commercialImage = '/media/images/commercial-business-park.jpeg';
const contractingImage = '/media/images/contracting-site.jpeg';
const manufacturingImage = '/media/images/manufacturing-facility.jpeg';

interface WhatWeDoPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const WhatWeDoPage: React.FC<WhatWeDoPageProps> = ({ onNavigate }) => {
  const verticals = [
    {
      icon: Home,
      title: 'Residential Real Estate',
      desc: 'Ultra-luxury high-rise apartments, row houses, golf-theme villas, and integrated luxury townships in prime corridors.',
      features: ['Reviva Neopolis', 'Reviva Crystal Meadows', 'Reviva Townpark', 'Reviva OneWorld'],
      actionPath: '/properties',
      image: residentialImage,
    },
    {
      icon: Building,
      title: 'Commercial Landmarks',
      desc: 'Grade-A tech parks, retail gallerias, corporate headquarters, and LEED-certified commercial office complexes.',
      features: ['Reviva Tech Park Whitefield', 'Reviva City Mall', 'Reviva Commercial Hub'],
      actionPath: '/commercial',
      image: commercialImage,
    },
    {
      icon: Wrench,
      title: 'Contracting Services',
      desc: 'Landmark institutional facilities built for technology campuses, corporate headquarters, academic institutions, and hospitality chains.',
      features: ['Corporate Tech Campuses', 'Hospitality Suites', 'R&D Centers'],
      actionPath: '/contracting',
      image: contractingImage,
    },
    {
      icon: Sparkles,
      title: 'Manufacturing & Interiors',
      desc: 'Backward-integrated manufacturing units for timber joinery, aluminum glazing facades, precast concrete, and eco-conscious interior finishes.',
      features: ['Reviva Interiors', 'Glazing & Metal Works', 'Reviva Restoplus Mattresses'],
      actionPath: '/manufacturing',
      image: manufacturingImage,
    }
  ];

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* 1. Hero Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('${residentialImage}') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <LeafAccent corner="bottom-right" size="15%" opacity={0.12} color="#e5b869" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="hero-reveal" style={{ color: '#e5b869', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            PORTFOLIO & VERTICALS
          </span>
          <h1
            className="hero-reveal hero-reveal-delay-1 gold-shimmer-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.85))',
              letterSpacing: '1px',
            }}
          >
            What We Do
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {verticals.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="reviva-card-hover"
                style={{
                  background: '#ffffff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div className="img-hover-wrap" style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                      <IconComponent size={20} color="#9E783C" />
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {item.desc}
                    </p>
                    
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', color: '#9E783C', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700, letterSpacing: '1px' }}>
                        Key Highlights:
                      </div>
                      {item.features.map((feat, idx) => (
                        <div key={idx} style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ color: '#9E783C' }}>•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem' }}>
                  <button
                    className="btn-primary btn-arrow-hover"
                    onClick={() => onNavigate(item.actionPath)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#0f172a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>EXPLORE PORTFOLIO</span>
                    <ArrowRight size={16} color="#9E783C" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
