import React from 'react';
import { Home, Building2, HardHat, Factory, ArrowRight } from 'lucide-react';

interface WhatWeDoSectionProps {
  onNavigate: (path: string) => void;
}

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({ onNavigate }) => {
  const categories = [
    {
      title: 'RESIDENTIAL',
      subtitle: 'Luxury Apartments, Villas & Townhouses',
      desc: 'Crafted with precision, offering world-class amenities and 80% open green spaces in prime metro corridors.',
      icon: Home,
      link: '/residential',
      img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
    },
    {
      title: 'Transparency & Trust',
      subtitle: 'Integrity in every step',
      desc: 'We are committed to upholding the highest standards of integrity and openness. From introducing the project to the final handover, we prioritise honest practices to foster lasting relationships',
      icon: Home,
      link: '/transparency',
      img: '/assets/transparency-and-trust.jpeg',
    },
    {
      title: 'Redefining Elevated Living',
      subtitle: 'Crafting quality and elegance',
      desc: 'Where we live shapes how we live. Leveraging our extensive experience and refined insight, we craft spaces tailored to the unique needs enhancing spaces that embody quality and elegance',
      icon: Home,
      link: '/elevated-living',
      img: '/assets/redefining-elevated-living.jpeg',
    },
    {
      title: 'COMMERCIAL',
      subtitle: 'Grade-A Office Hubs & Retail Promenades',
      desc: 'Iconic commercial complexes and shopping malls engineered for global tech giants and luxury retailers.',
      icon: Building2,
      link: '/commercial',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'CONTRACTING',
      subtitle: 'Institutional & Corporate Campuses',
      desc: 'Turnkey institutional contracting services for tech campuses, hospitality landmarks, and convention centers.',
      icon: HardHat,
      link: '/contracting',
      img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'MANUFACTURING',
      subtitle: 'Interiors, Glazing & Concrete Products',
      desc: 'India’s largest backward integrated manufacturing units for timber joinery, aluminum facades, and precast concrete.',
      icon: Factory,
      link: '/manufacturing',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section style={{ background: '#f8fafc', padding: '5rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            PORTFOLIO OVERVIEW
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0f172a', marginTop: '0.5rem' }}>
            WHAT WE DO
          </h2>
          <div style={{ width: '60px', height: '3px', background: '#9E783C', margin: '1rem auto 0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(cat.link)}
                style={{
                  background: '#ffffff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <IconComponent size={20} color="#9E783C" />
                  </div>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                      {cat.title}
                    </h3>
                    <div style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                      {cat.subtitle}
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {cat.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 700, fontSize: '0.85rem', marginTop: '1.5rem' }}>
                    <span>EXPLORE PORTFOLIO</span>
                    <ArrowRight size={16} color="#9E783C" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
