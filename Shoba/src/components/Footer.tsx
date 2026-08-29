import React, { useState } from 'react';
import { MapPin, Mail, Phone, Globe, ChevronDown, ArrowUp, ShieldCheck, Leaf, Award, Compass } from 'lucide-react';
import { DoveMark, RevivaWordmark } from './RevivaLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [isDiscoverExpanded, setIsDiscoverExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#003831', color: '#ffffff', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>

      {/* Background Decorative Ambient Gradient */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(158, 120, 60, 0.12) 0%, rgba(0, 56, 49, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />


      <div style={{ position: 'relative', zIndex: 1, padding: '3.5rem 0 2.5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Centered Reviva Brand Header & Trust Pillars */}
          <div className="reveal-scale" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <button
              onClick={() => onNavigate('/')}
              aria-label="Reviva Projects"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '0.85rem' }}
            >
              <DoveMark size={42} color="#e5b869" />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '153px' }}>
                <RevivaWordmark height={26} color="#ffffff" />
                <div style={{ width: '115.5%', alignSelf: 'flex-end', marginTop: '3px' }}>
                  <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.34em', color: '#e5b869', textTransform: 'uppercase', display: 'block', textAlign: 'center' }}>
                    PROJECTS
                  </span>
                </div>
              </div>
            </button>

            {/* 4 Trust Pillars */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.5rem 2.5rem',
                marginTop: '1.75rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                color: '#cbd5e1'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} color="#9E783C" />
                <span>100% RERA Certified Projects</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Leaf size={16} color="#9E783C" />
                <span>Sustainable Eco Architecture</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={16} color="#9E783C" />
                <span>1+ Million Sq. Ft. Delivered</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Compass size={16} color="#9E783C" />
                <span>Prime Bengaluru Locations</span>
              </div>
            </div>
          </div>


          {/* 4-Column Footer Navigation Grid */}
          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2.5rem',
              paddingBottom: '2.5rem'
            }}
          >
            {/* Column 1: Who We Are */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.74rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2.5px', color: '#9E783C', marginBottom: '1.25rem' }}>
                Who We Are
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  { name: 'Philosophy & Vision', path: '/philosophy' },
                  { name: 'Reviva Journey & Showcase', path: '/showcase' },
                  { name: 'Awards & Honours', path: '/awards' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate(item.path)}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#c3ccd9',
                      fontSize: '0.82rem',
                      letterSpacing: '0.01em',
                      fontWeight: 400,
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e5b869';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#c3ccd9';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Our Projects */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.74rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2.5px', color: '#9E783C', marginBottom: '1.25rem' }}>
                Our Projects
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => onNavigate('/project/reviva-trinity-lifescape/')}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                >
                  <span>Reviva Trinity Lifescape</span>
                  <span style={{ fontSize: '0.58rem', background: 'linear-gradient(135deg, #9E783C 0%, #775500 100%)', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 600 }}>New</span>
                </button>

                <button
                  onClick={() => onNavigate('/project/vintage-valley/')}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#c3ccd9',
                    fontSize: '0.82rem',
                    fontWeight: 400,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#e5b869';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c3ccd9';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  Reviva Vintage Valley (Whitefield)
                </button>

                <button
                  onClick={() => onNavigate('/project/reviva-farms/')}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#c3ccd9',
                    fontSize: '0.82rem',
                    fontWeight: 400,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#e5b869';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c3ccd9';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  Reviva Farms (Eco Plots & Villas)
                </button>

                {/* More Projects Option */}
                <button
                  onClick={() => onNavigate('/properties')}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#9E783C',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    paddingTop: '0.25rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#e5b869';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9E783C';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>More</span>
                  <span style={{ fontSize: '0.85rem' }}>→</span>
                </button>
              </div>
            </div>

            {/* Column 3: Quick Navigation */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.74rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2.5px', color: '#9E783C', marginBottom: '1.25rem' }}>
                Quick Navigation
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '/who-we-are' },
                  { name: 'Projects', path: '/properties' },
                  { name: 'Eco Living', path: '/sustainability' },
                  { name: 'Careers', path: '/careers' },
                  { name: 'Blog', path: '/blog' },
                  { name: 'Contact', path: '/contact' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate(item.path)}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#c3ccd9',
                      fontSize: '0.82rem',
                      fontWeight: 400,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e5b869';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#c3ccd9';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 4: Location Focus */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.74rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2.5px', color: '#9E783C', marginBottom: '1.25rem' }}>
                Location Focus
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem' }}>
                <button
                  onClick={() => onNavigate('/city/bengaluru/')}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#e5b869')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  Bengaluru, Karnataka
                </button>
                <span style={{ color: '#9aa5b5', fontSize: '0.78rem', lineHeight: 1.6, fontWeight: 400 }}>
                  Channasandra • Kadugodi • Whitefield East Suburbs • Muthanallur • Barkai
                </span>
              </div>
            </div>

          </div>

          {/* Contact Info Row: Address, Email, Phone, Website */}
          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              paddingBottom: '2.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <MapPin size={16} color="#9E783C" style={{ marginTop: '3px', flexShrink: 0 }} />
              <a
                href="https://maps.app.goo.gl/iwVLu2ZQct2h94TA8"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.78rem', color: '#c3ccd9', lineHeight: 1.6, textDecoration: 'none', fontWeight: 400 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e5b869')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#c3ccd9')}
              >
                Sy No 13, Indian Gas Godown Road,<br />
                Channasandra, Kadugodi, Bengaluru - 560067
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Mail size={16} color="#9E783C" style={{ flexShrink: 0 }} />
              <a href="mailto:info@revivaprojects.com" style={{ fontSize: '0.78rem', color: '#c3ccd9', textDecoration: 'none', fontWeight: 400 }}>
                info@revivaprojects.com
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Phone size={16} color="#9E783C" style={{ flexShrink: 0 }} />
              <a href="tel:+919148536320" style={{ fontSize: '0.78rem', color: '#c3ccd9', textDecoration: 'none', fontWeight: 400 }}>
                +91 91485 36320
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Globe size={16} color="#9E783C" style={{ flexShrink: 0 }} />
              <a href="https://www.revivaprojects.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: '#c3ccd9', textDecoration: 'none', fontWeight: 400 }}>
                www.revivaprojects.com
              </a>
            </div>
          </div>


          {/* Expandable "Discover More" Accordion */}
          <div className="reveal" style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '1.5rem', paddingBottom: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setIsDiscoverExpanded(!isDiscoverExpanded)}
                className="btn-magnetic"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(158, 120, 60, 0.25)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.6rem 1.35rem',
                  borderRadius: '25px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#9E783C')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(158, 120, 60, 0.25)')}
              >
                <span>Discover More Real Estate Holdings</span>
                <ChevronDown
                  size={18}
                  color="#9E783C"
                  style={{
                    transform: isDiscoverExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </button>
            </div>

            {isDiscoverExpanded && (
              <div
                style={{
                  marginTop: '2rem',
                  borderTop: '1px solid rgba(158, 120, 60, 0.4)',
                  paddingTop: '2rem',
                  fontSize: '0.82rem',
                  lineHeight: 1.8,
                  animation: 'fadeInUp 0.3s ease-out',
                }}
              >
                <h5 style={{ color: '#e5b869', fontStyle: 'italic', fontWeight: 500, fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Top Trending Residential Properties in India
                </h5>

                {/* City Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem 3rem', marginBottom: '3rem' }}>

                  {/* Left Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>BENGALURU</span>
                      <span style={{ color: '#c3ccd9' }}>
                        <button onClick={() => onNavigate('/project/reviva-trinity-lifescape/')} style={{ background: 'none', border: 'none', color: '#ffffff', fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>REVIVA Trinity Lifescape</button> | <button onClick={() => onNavigate('/project/vintage-valley/')} style={{ background: 'none', border: 'none', color: '#c3ccd9', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>REVIVA Vintage Valley</button> | <button onClick={() => onNavigate('/project/reviva-farms/')} style={{ background: 'none', border: 'none', color: '#c3ccd9', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>REVIVA Farms</button> | REVIVA OneWorld | REVIVA Altair | REVIVA Magnus | REVIVA Townpark | REVIVA Ayana | REVIVA Infinia
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>CHENNAI</span>
                      <span style={{ color: '#c3ccd9' }}>REVIVA Arbor</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>GIFT CITY</span>
                      <span style={{ color: '#c3ccd9' }}>REVIVA Elysia</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>GREATER NOIDA</span>
                      <span style={{ color: '#c3ccd9' }}>REVIVA Rivana | REVIVA Aurum</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>GURGAON</span>
                      <span style={{ color: '#c3ccd9' }}>REVIVA Crescent | REVIVA Strada | REVIVA Altus</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>HYDERABAD</span>
                      <span style={{ color: '#c3ccd9' }}>REVIVA Waterfront</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>KOCHI</span>
                      <span style={{ color: '#c3ccd9' }}>REVIVA Atlantis | Marina One</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>MUMBAI</span>
                      <span style={{ color: '#c3ccd9' }}>REVIVA Inizio</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>PUNE</span>
                      <span style={{ color: '#c3ccd9' }}>REVIVA Nesara</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1rem', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#ffffff' }}>THIRUVANANTHAPURAM</span>
                      <span style={{ color: '#c3ccd9' }}>REVIVA Woods | REVIVA Ridge</span>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>


          {/* Legal Links, Copyright & Back-to-Top Action */}
          <div
            style={{
              paddingTop: '2rem',
              marginTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.25rem',
              fontSize: '0.8rem',
              color: '#9aa5b5'
            }}
          >
            <div>
              © {new Date().getFullYear()} Reviva Projects. All Rights Reserved. Bringing Meaning to Life.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <button onClick={() => onNavigate('/privacy-policy')} style={{ background: 'none', border: 'none', color: '#c3ccd9', cursor: 'pointer', fontSize: '0.78rem' }}>Privacy Policy</button>
                <button onClick={() => onNavigate('/terms-and-conditions')} style={{ background: 'none', border: 'none', color: '#c3ccd9', cursor: 'pointer', fontSize: '0.78rem' }}>Terms & Conditions</button>
                <button onClick={() => onNavigate('/disclaimer')} style={{ background: 'none', border: 'none', color: '#c3ccd9', cursor: 'pointer', fontSize: '0.78rem' }}>RERA Disclaimer</button>
              </div>

              {/* Back to Top Floating Circle Button */}
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="btn-magnetic"
                style={{
                  background: 'rgba(158, 120, 60, 0.2)',
                  border: '1px solid rgba(158, 120, 60, 0.4)',
                  color: '#e5b869',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9E783C';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(158, 120, 60, 0.2)';
                  e.currentTarget.style.color = '#e5b869';
                }}
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
