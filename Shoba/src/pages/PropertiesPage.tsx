import React, { useState, useMemo, useRef } from 'react';
import type { Property, CityInfo } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { Sparkles, Search, Filter, Building2 } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsapSetup';

interface PropertiesPageProps {
  properties: Property[];
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onBookVisit: (property: Property) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  onNavigate,
  onBookVisit,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const heroRef = useRef<HTMLElement>(null);
  const heroParallaxRef = useRef<HTMLDivElement>(null);

  // GSAP-scrubbed parallax: hero background drifts slower than the page as you scroll past it
  useGSAP(
    () => {
      gsap.fromTo(
        heroParallaxRef.current,
        { y: -25 },
        {
          y: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { scope: heroRef }
  );

  const gridRef = useRef<HTMLDivElement>(null);

  // Filtered Properties List
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (property.highlightTag && property.highlightTag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'New Launch' && property.status === 'New Launch') ||
        (selectedStatus === 'Under Construction' && property.status === 'Under Construction') ||
        (selectedStatus === 'Ready to Move' && property.status === 'Ready to Move');

      const matchesType =
        selectedType === 'All' ||
        (selectedType === 'Apartment' && property.type === 'Apartment') ||
        (selectedType === 'Villa' && (property.type === 'Villa' || property.type === 'Row House'));

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [properties, searchQuery, selectedStatus, selectedType]);

  // Masonry scroll-in: each card scales/rotates into place as it enters the
  // viewport, alternating rotation direction by column. Re-scans whenever the
  // filtered set changes (unlike the shared useScrollReveal hook, which only
  // re-scans on route change) so newly-filtered-in cards always animate in
  // rather than staying stuck invisible.
  useGSAP(
    () => {
      const cards = gridRef.current ? Array.from(gridRef.current.children) as HTMLElement[] : [];
      cards.forEach((card, i) => {
        const side = i % 2 === 0 ? 1 : -1;
        const amp = Math.ceil(((i % 8) + 1) / 2);
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.85, rotation: side * 5 * amp, transformOrigin: 'center bottom' },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              once: true,
            },
          }
        );
      });
    },
    { dependencies: [filteredProperties], scope: gridRef, revertOnUpdate: true }
  );

  return (
    <div className="page-enter" style={{ background: '#f8fafc', color: '#111827', minHeight: '100vh', paddingBottom: '6rem' }}>

      {/* Hero Banner */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '420px',
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
        {/* Parallax layer (GSAP-driven translateY) — oversized 25px top/bottom so it never exposes edges */}
        <div
          ref={heroParallaxRef}
          style={{
            position: 'absolute',
            top: '-25px',
            left: 0,
            right: 0,
            bottom: '-25px',
            backgroundImage: `url('/media/images/reviva-vintage-valley.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Static gradient overlay for legibility (kept off the parallax layer so it never drifts) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0, 40, 35, 0.65) 0%, rgba(0, 56, 49, 0.9) 100%)',
          }}
        />

        <span className="hero-reveal" style={{ position: 'relative', zIndex: 1, color: '#e5b869', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.6rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          REVIVA PROJECTS Portfolio
        </span>
        <h1
          className="hero-reveal hero-reveal-delay-1 gold-shimmer-text"
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-heading, "Fraunces", serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.85))',
            letterSpacing: '0.02em',
            marginBottom: '0.75rem',
          }}
        >
          All Reviva Projects
        </h1>
        <p className="hero-reveal hero-reveal-delay-2" style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.92)', fontSize: '1.05rem', maxWidth: '640px', lineHeight: 1.6, fontWeight: 300, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          Explore our complete portfolio of eco-conscious apartments, farm villas, and premium residential landmarks across Bengaluru and Pan-India.
        </p>
      </section>

      {/* Main Filter & Grid Container */}
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '3.5rem 1.5rem 0 1.5rem' }}>

        {/* Search & Filter Control Bar */}
        <div
          className="reveal"
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            marginBottom: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '420px' }}>
            <Search size={18} color="#9E783C" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by project name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.8rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                background: '#f8fafc'
              }}
              onFocus={(e) => (e.target.style.borderColor = '#9E783C')}
              onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
            />
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Filter size={15} color="#9E783C" /> Status:
            </span>

            {['All', 'New Launch', 'Under Construction', 'Ready to Move'].map((status) => (
              <button
                key={status}
                className="tab-pill-hover"
                onClick={() => setSelectedStatus(status)}
                style={{
                  background: selectedStatus === status ? '#003831' : '#f1f5f9',
                  color: selectedStatus === status ? '#ffffff' : '#475569',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: selectedStatus === status ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {['All', 'Apartment', 'Villa'].map((type) => (
              <button
                key={type}
                className="tab-pill-hover"
                onClick={() => setSelectedType(type)}
                style={{
                  background: selectedType === type ? '#9E783C' : 'transparent',
                  color: selectedType === type ? '#ffffff' : '#64748b',
                  border: selectedType === type ? '1px solid #9E783C' : '1px solid #cbd5e1',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: selectedType === type ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {type === 'All' ? 'All Types' : type === 'Villa' ? 'Villas & Plots' : 'Apartments'}
              </button>
            ))}
          </div>
        </div>

        {/* Section Title & Counter */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9E783C', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.78rem' }}>
              <Sparkles size={15} />
              <span>CRAFTED FOR SUSTAINABLE LIVING</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginTop: '0.25rem' }}>
              Explore Available Properties
            </h2>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500, background: '#ffffff', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            Showing <strong>{filteredProperties.length}</strong> of <strong>{properties.length}</strong> Projects
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProperties.length > 0 ? (
          <div
            ref={gridRef}
            className="masonry-reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onSelectProperty={(p) => onNavigate(`/project/${p.id}/`)}
                onBookVisit={onBookVisit}
              />
            ))}
          </div>
        ) : (
          <div className="reveal-scale" style={{ textAlign: 'center', padding: '4rem 2rem', background: '#ffffff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <Building2 size={48} color="#9E783C" style={{ margin: '0 auto 1rem auto', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>No projects match your filter criteria</h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Try adjusting your search terms or clearing status filters.</p>
            <button
              className="btn-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('All');
                setSelectedType('All');
              }}
              style={{
                background: '#003831',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.35rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
