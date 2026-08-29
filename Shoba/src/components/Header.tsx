import React, { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, ArrowRight } from 'lucide-react';
import { DoveMark, RevivaWordmark } from './RevivaLogo';

interface HeaderProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry?: () => void;
}

interface TopMenuItem {
  label: string;
  path: string;
  hasArrow: boolean;
  subItems?: { label: string; path: string }[];
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const prev = lastScrollYRef.current;

      setIsScrolled(currentScrollY > 30);

      if (currentScrollY <= 80) {
        // Near top — always show
        setIsVisible(true);
      } else if (currentScrollY > prev + 8) {
        // Scrolling DOWN — hide
        setIsVisible(false);
      } else if (currentScrollY < prev - 8) {
        // Scrolling UP — show
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    onNavigate(path);
  };

  const topMenuItems: TopMenuItem[] = [
    { label: 'PROJECTS', path: '/properties', hasArrow: true },
    {
      label: 'WHO WE ARE',
      path: '/who-we-are',
      hasArrow: true,
      subItems: [
        { label: 'Philosophy & Vision', path: '/philosophy' },
        { label: 'Reviva Journey & Showcase', path: '/showcase' },
        { label: 'Awards & Honours', path: '/awards' },
      ],
    },
    { label: 'WHAT WE DO', path: '/what-we-do', hasArrow: true },
    { label: 'CONTACT US', path: '/contact', hasArrow: false },
    { label: 'REAL ESTATE LIBRARY', path: '/blog', hasArrow: false },
  ];

  const bottomMenuItems = [
    { label: 'CAREERS', path: '/careers' },
    { label: 'MEDIA CENTRE', path: '/media-centre' },
    { label: 'SUSTAINABILITY', path: '/sustainability' },
    { label: 'REVIVA PRIVILEGE', path: '/reviva-privilege' },
  ];

  return (
    <>
      {/* Seamless Transparent Floating Overlay Header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 900,
          transform: isVisible ? 'translateY(0)' : 'translateY(-120%)',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          background: isScrolled
            ? 'rgba(11, 15, 21, 0.92)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
          height: '85px',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, background 0.3s ease, backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          className="container"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {/* Left Action: MENU Button with Frosted Glass Pill & Luxury Hover Micro-Interactions */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            style={{
              background: 'rgba(11, 15, 21, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '40px',
              color: '#ffffff',
              fontFamily: 'var(--font-accent)',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '2.5px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.45rem 1.25rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
              e.currentTarget.style.borderColor = '#9F783D';
              e.currentTarget.style.color = '#e5b869';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(159, 120, 61, 0.35)';
              const paths = e.currentTarget.querySelectorAll('path');
              paths.forEach((p) => p.setAttribute('stroke', '#e5b869'));
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
              const paths = e.currentTarget.querySelectorAll('path');
              paths.forEach((p) => p.setAttribute('stroke', '#ffffff'));
            }}
          >
            <span>MENU</span>
            <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'transform 0.3s ease' }}>
              <path d="M0 1.5H14" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" style={{ transition: 'stroke 0.3s ease' }} />
              <path d="M0 7.5H22" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" style={{ transition: 'stroke 0.3s ease' }} />
              <path d="M6 13.5H20" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" style={{ transition: 'stroke 0.3s ease' }} />
            </svg>
          </button>

          {/* Center Brand Logo Lockup with Frosted Glass Blur Backdrop */}
          <button
            onClick={() => handleNavClick('/')}
            aria-label="Reviva Projects Homepage"
            style={{
              background: 'rgba(11, 15, 21, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '40px',
              cursor: 'pointer',
              padding: '0.45rem 1.35rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-50%) translateY(-2px) scale(1.04)';
              e.currentTarget.style.borderColor = '#9F783D';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(159, 120, 61, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(-50%) translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
            }}
          >
            <DoveMark size={36} color="#e5b869" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '135px' }}>
              <RevivaWordmark height={23} color="#ffffff" />
              <div style={{ width: '115.5%', alignSelf: 'flex-end', marginTop: '3px' }}>
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.54rem', fontWeight: 500, letterSpacing: '0.34em', color: '#e5b869', textTransform: 'uppercase', display: 'block', textAlign: 'center' }}>
                  PROJECTS
                </span>
              </div>
            </div>
          </button>

          {/* Right Action: ENQUIRE Button */}
          <div>
            <button
              onClick={onOpenEnquiry}
              style={{
                background: '#9F783D',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                padding: '0.6rem 1.5rem',
                fontFamily: 'var(--font-button)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <MessageSquare size={15} />
              <span>ENQUIRE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Full Navigation Menu Drawer (Exact match to Image 3) */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Drawer Panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '420px',
              height: '100vh',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '10px 0 40px rgba(0,0,0,0.3)',
              position: 'relative',
              animation: 'slideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* TOP SECTION (White Background) */}
            <div style={{ padding: '2rem 2.25rem 1.5rem 2.25rem', background: '#ffffff', position: 'relative' }}>
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.75rem',
                  right: '1.75rem',
                  background: 'none',
                  border: 'none',
                  color: '#1e293b',
                  cursor: 'pointer',
                  padding: '0.25rem',
                }}
                aria-label="Close Menu"
              >
                <X size={26} />
              </button>

              {/* Top Navigation Links */}
              <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                {topMenuItems.map((item, idx) => {
                  const isExpanded = expandedItem === item.label;
                  return (
                    <div key={item.label} className="fade-in-up" style={{ opacity: 0, animationDelay: `${0.08 + idx * 0.06}s` }}>
                      <button
                        onClick={() =>
                          item.subItems
                            ? setExpandedItem(isExpanded ? null : item.label)
                            : handleNavClick(item.path)
                        }
                        className="btn-arrow-hover"
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '1.1rem 0',
                          borderBottom: isExpanded ? 'none' : '1px solid #f1f5f9',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          textAlign: 'left',
                          width: '100%',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            letterSpacing: '1.8px',
                            color: '#0f172a',
                            textTransform: 'uppercase',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#9F783D')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#0f172a')}
                        >
                          {item.label}
                        </span>
                        {item.hasArrow && (
                          <ArrowRight
                            size={20}
                            color="#0f172a"
                            style={{
                              transform: item.subItems && isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                          />
                        )}
                      </button>

                      {item.subItems && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: isExpanded ? `${item.subItems.length * 44}px` : '0px',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            borderBottom: '1px solid #f1f5f9',
                          }}
                        >
                          {item.subItems.map((sub) => (
                            <button
                              key={sub.label}
                              onClick={() => handleNavClick(sub.path)}
                              className="link-glow"
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: '0.6rem 0 0.6rem 1rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.82rem',
                                fontWeight: 500,
                                letterSpacing: '0.3px',
                                color: '#64748b',
                                transition: 'color 0.2s ease',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#9F783D')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BOTTOM SECTION (Soft Light Grey Background) */}
            <div
              style={{
                flex: 1,
                background: '#f4f5f7',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {bottomMenuItems.map((item, idx) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.path)}
                    className="fade-in-up"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      fontFamily: 'var(--font-accent)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      letterSpacing: '1.8px',
                      color: '#1e293b',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      opacity: 0,
                      animationDelay: `${0.32 + idx * 0.05}s`,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#9F783D')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#1e293b')}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Bottom Left Circular Brand Emblem (Bird Logo) */}
              <div style={{ marginTop: '2rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'rgba(159, 120, 61, 0.15)',
                    border: '1px solid rgba(159, 120, 61, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <DoveMark size={24} color="#9F783D" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Backdrop Header Watermark with Bird Logo */}
          <div
            style={{
              position: 'absolute',
              top: '2.5rem',
              right: '3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
            }}
          >
            <DoveMark size={38} color="#e5b869" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '176px' }}>
              <RevivaWordmark height={30} color="rgba(255, 255, 255, 0.95)" />
              <div style={{ width: '115.5%', alignSelf: 'flex-end', marginTop: '3px' }}>
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.34em', color: '#e5b869', textTransform: 'uppercase', display: 'block', textAlign: 'center' }}>
                  PROJECTS
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};
