import React, { useState, useEffect } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { DoveMark, RevivaWordmark } from './RevivaLogo';
import { INITIAL_PROPERTIES } from '../data/initialData';

interface HeaderProps {
  onNavigate: (path: string) => void;
}

const CITIES_LIST = [
  { id: 'bengaluru', name: 'Bengaluru' },
  { id: 'chennai', name: 'Chennai' },
  { id: 'coimbatore', name: 'Coimbatore' },
  { id: 'gift-city-gandhinagar', name: 'Gift City Gandhinagar' },
  { id: 'greater-noida', name: 'Greater Noida' },
  { id: 'gurugram', name: 'Gurugram' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'kochi', name: 'Kochi' },
  { id: 'kozhikode', name: 'Kozhikode' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'mysuru', name: 'Mysuru' },
  { id: 'pune', name: 'Pune' },
  { id: 'thiruvananthapuram', name: 'Thiruvananthapuram' },
  { id: 'thrissur', name: 'Thrissur' },
];

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Default active section in left drawer is 'what-we-do' (matching Screenshot 2 reference)
  const [activeMenuSection, setActiveMenuSection] = useState<'what-we-do' | 'who-we-are'>('what-we-do');

  // Live search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    setIsSearchModalOpen(false);
    onNavigate(path);
  };

  const filteredProperties = searchQuery.trim() === ''
    ? []
    : INITIAL_PROPERTIES.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subLocation.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <>
      {/*
        Reviva Transparent / Adaptive Header Navbar
        Header is seamlessly integrated over hero section without harsh black block!
      */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000,
          background: isScrolled ? 'rgba(10, 13, 20, 0.95)' : 'linear-gradient(180deg, rgba(10, 13, 20, 0.9) 0%, rgba(10, 13, 20, 0.6) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: isScrolled ? '1px solid rgba(158, 120, 60, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none',
          height: '76px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div 
          className="container" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr auto 1fr', 
            alignItems: 'center', 
            height: '100%',
          }}
        >
          {/* Left Column: MENU Button */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => {
                setActiveMenuSection('what-we-do');
                setIsMenuOpen(true);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '2px',
                padding: '0.5rem 0',
              }}
              aria-label="Open Main Navigation Menu"
            >
              <span>MENU</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ width: '22px', height: '2px', background: '#9E783C' }} />
                <span style={{ width: '16px', height: '2px', background: '#9E783C' }} />
                <span style={{ width: '22px', height: '2px', background: '#9E783C' }} />
              </div>
            </button>
          </div>

          {/* Center Column: Reviva Logo Lockup (Bird mark + wordmark) */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => handleNavClick('/')}
              aria-label="Reviva Projects"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <DoveMark size={28} color="#ffffff" />
                <RevivaWordmark height={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '3px', color: '#94a3b8', textTransform: 'uppercase' }}>
                Projects
              </span>
            </button>
          </div>

          {/* Right Column: Search Icon */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button
              onClick={() => setIsSearchModalOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Open Property Search Modal"
            >
              <Search size={22} color="#ffffff" />
            </button>
          </div>
        </div>
      </header>

      {/* Left-Sliding Dual Panel Navigation Menu (Matching Screenshots 1 & 2) */}
      {isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
          }}
        >
          {/* Left White Panel (Width ~280px) - Screenshot 1 & 2 */}
          <div 
            style={{
              width: '280px',
              height: '100%',
              background: '#ffffff',
              color: '#0f172a',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
              overflowY: 'auto',
            }}
          >
            {/* Top Close Button matching Screenshot 1 & 2 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1.5rem 1.5rem 1rem 1.5rem' }}>
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0f172a',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Section Links with Hover & Active Highlight (Screenshots 1 & 2) */}
            <div style={{ padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* WHO WE ARE */}
              <div 
                onMouseEnter={() => setActiveMenuSection('who-we-are')}
                onClick={() => setActiveMenuSection('who-we-are')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  border: activeMenuSection === 'who-we-are' ? '1.5px solid #0f172a' : '1.5px solid transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  background: activeMenuSection === 'who-we-are' ? '#ffffff' : 'transparent',
                  boxShadow: activeMenuSection === 'who-we-are' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <span>WHO WE ARE</span>
                <ArrowRight size={18} color="#0f172a" />
              </div>

              {/* WHAT WE DO */}
              <div 
                onMouseEnter={() => setActiveMenuSection('what-we-do')}
                onClick={() => setActiveMenuSection('what-we-do')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  border: activeMenuSection === 'what-we-do' ? '1.5px solid #0f172a' : '1.5px solid transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  background: activeMenuSection === 'what-we-do' ? '#ffffff' : 'transparent',
                  boxShadow: activeMenuSection === 'what-we-do' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <span>WHAT WE DO</span>
                <ArrowRight size={18} color="#0f172a" />
              </div>

              {/* CONTACT US */}
              <div 
                onClick={() => handleNavClick('/contact')}
                style={{
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: '#475569',
                }}
              >
                <span>CONTACT US</span>
              </div>

              {/* REAL ESTATE LIBRARY */}
              <div 
                onClick={() => handleNavClick('/blog')}
                style={{
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: '#475569',
                }}
              >
                <span>REAL ESTATE LIBRARY</span>
              </div>
            </div>

            {/* Bottom Grey Section matching Screenshot 1 & 2 */}
            <div style={{ background: '#f1f5f9', padding: '1.75rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => handleNavClick('/careers')} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', color: '#475569' }}>CAREERS</button>
              <button onClick={() => handleNavClick('/media-centre')} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', color: '#475569' }}>MEDIA CENTRE</button>
              <button onClick={() => handleNavClick('/sustainability')} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', color: '#475569' }}>SUSTAINABILITY</button>
              <button onClick={() => handleNavClick('/investor-relations')} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', color: '#475569' }}>INVESTOR RELATIONS</button>
              <button onClick={() => handleNavClick('/sobha-privilege')} style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', color: '#475569' }}>REVIVA PRIVILEGE</button>
            </div>

          </div>

          {/* Middle Black Panel (Width ~300px) - Screenshot 1 & 2 */}
          <div 
            style={{
              width: '300px',
              height: '100%',
              background: '#000000',
              color: '#ffffff',
              padding: '4.5rem 2rem 2rem 2rem',
              overflowY: 'auto',
              borderRight: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* When WHAT WE DO is active (Matching Screenshot 2 reference) */}
            {activeMenuSection === 'what-we-do' && (
              <div>
                <h4 style={{ color: '#9E783C', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                  Residential
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {CITIES_LIST.map(city => (
                    <button
                      key={city.id}
                      onClick={() => handleNavClick(`/city/${city.id}/`)}
                      style={{
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        color: '#d1d5db',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>

                <h4 style={{ color: '#9E783C', fontSize: '1.1rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
                  Commercial & Industrial
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button onClick={() => handleNavClick('/commercial')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>Commercial Landmarks</button>
                  <button onClick={() => handleNavClick('/contracting')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>Contracting Services</button>
                  <button onClick={() => handleNavClick('/manufacturing')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>Manufacturing & Interiors</button>
                </div>
              </div>
            )}

            {/* When WHO WE ARE is active (Matching Screenshot 1) */}
            {activeMenuSection === 'who-we-are' && (
              <div>
                <h4 style={{ color: '#9E783C', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Philosophy
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  <button onClick={() => handleNavClick('/philosophy')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>Passion At Work</button>
                  <button onClick={() => handleNavClick('/philosophy')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>The Reviva Way</button>
                  <button onClick={() => handleNavClick('/philosophy')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>Vision & Mission</button>
                </div>

                <h4 style={{ color: '#9E783C', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Leadership
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  <button onClick={() => handleNavClick('/leadership')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>About Our Founder</button>
                  <button onClick={() => handleNavClick('/leadership')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>Chairman's Message</button>
                  <button onClick={() => handleNavClick('/leadership')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>Board Of Directors</button>
                </div>

                <h4 style={{ color: '#9E783C', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Showcase
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button onClick={() => handleNavClick('/showcase')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>The Reviva Journey</button>
                  <button onClick={() => handleNavClick('/showcase')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>Reviva Museum</button>
                  <button onClick={() => handleNavClick('/showcase')} style={{ background: 'none', border: 'none', textAlign: 'left', color: '#d1d5db', fontSize: '0.95rem', cursor: 'pointer' }}>Awards & Honours</button>
                </div>
              </div>
            )}
          </div>

          {/* Clickable Backdrop overlay to close */}
          <div 
            style={{ flex: 1, cursor: 'pointer' }}
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}

      {/* Search Modal Overlay */}
      {isSearchModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(5, 10, 15, 0.96)',
            backdropFilter: 'blur(16px)',
            color: '#ffffff',
            zIndex: 1000,
            overflowY: 'auto',
            padding: '4rem 0',
          }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            
            {/* Close Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9E783C',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                }}
              >
                <span>CLOSE</span>
                <X size={20} />
              </button>
            </div>

            {/* Title */}
            <h2 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                color: '#ffffff',
                textAlign: 'center', 
                letterSpacing: '3px',
                marginBottom: '2.5rem',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              FIND YOUR NEXT DREAM HOME
            </h2>

            {/* Search Input Pill */}
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects (e.g. Reviva OneWorld, Neopolis, Gurugram)..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '1.2rem 1.5rem 1.2rem 3.5rem',
                  borderRadius: '50px',
                  background: '#ffffff',
                  border: '2px solid #9E783C',
                  color: '#0f172a',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  outline: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              />
              <Search size={22} color="#9E783C" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Quick Search Tags */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
              {['Bengaluru', 'Gurugram', 'Mumbai', 'Reviva OneWorld', 'Reviva Neopolis', 'GIFT City'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    padding: '0.4rem 1.2rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Filtered Search Results */}
            {filteredProperties.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredProperties.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleNavClick(`/project/${p.id}/`)}
                    style={{
                      background: '#121824',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>{p.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>{p.location}</div>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#9E783C' }}>{p.priceDisplay}</div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
