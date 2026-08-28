import React from 'react';
import type { CityInfo } from '../types';
import { Home, Building, Sparkles, Wrench, ArrowRight } from 'lucide-react';

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
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
    },
    {
      icon: Building,
      title: 'Commercial Landmarks',
      desc: 'Grade-A tech parks, retail gallerias, corporate headquarters, and LEED-certified commercial office complexes.',
      features: ['Reviva Tech Park Whitefield', 'Reviva City Mall', 'Reviva Commercial Hub'],
      actionPath: '/commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: Wrench,
      title: 'Contracting Services',
      desc: 'Landmark institutional facilities built for technology campuses, corporate headquarters, academic institutions, and hospitality chains.',
      features: ['Corporate Tech Campuses', 'Hospitality Suites', 'R&D Centers'],
      actionPath: '/contracting',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: Sparkles,
      title: 'Manufacturing & Interiors',
      desc: 'Backward-integrated manufacturing units for timber joinery, aluminum glazing facades, precast concrete, and eco-conscious interior finishes.',
      features: ['Reviva Interiors', 'Glazing & Metal Works', 'Reviva Restoplus Mattresses'],
      actionPath: '/manufacturing',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    }
  ];

  return (
    <div style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* 1. Hero Banner */}
      <section 
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          PORTFOLIO & VERTICALS
        </span>
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 400, 
            letterSpacing: '1px',
          }}
        >
          What We Do
        </h1>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {verticals.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
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
                  <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
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
