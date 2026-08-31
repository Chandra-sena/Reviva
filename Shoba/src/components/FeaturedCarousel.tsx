import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HighlightItem {
  label: string;
  value: string;
}

interface FeaturedItem {
  id: string;
  tag: string;
  title: string;
  location: string;
  description: string;
  highlights: HighlightItem[];
  imageDesktop: string;
  link: string;
}

const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: 'reviva-trinity-lifescape',
    tag: 'ICONIC TOWER ELEVATION',
    title: 'Reviva Trinity Lifescape',
    location: 'Bengaluru, Karnataka',
    description: 'Every home at Reviva Trinity Lifescape is positioned to overlook landscaped courts and lush tree corridors, ensuring an intimate visual connection with nature.',
    highlights: [
      { label: 'DEVELOPMENT', value: 'High-Rise Eco Towers' },
      { label: 'UNIT SIZES', value: '1100 - 2900 Sq. Ft.' },
      { label: 'BEDROOMS', value: '2, 3 & 4 BHK Luxury' },
    ],
    imageDesktop: '/media/images/reviva-trinity-lifescape-3.jpg',
    link: '/project/reviva-trinity-lifescape',
  },
  {
    id: 'vintage-valley',
    tag: 'CLASSICAL CONTEMPORARY',
    title: 'Reviva Vintage Valley',
    location: 'Channasandra, Whitefield, Bengaluru',
    description: 'Vintage Valley reimagines timeless elegance with a contemporary touch, inspired by the rich architectural legacy of classical forms in the heart of Whitefield.',
    highlights: [
      { label: 'DEVELOPMENT', value: 'Boutique Luxury' },
      { label: 'UNIT SIZES', value: '1280 - 1750 Sq. Ft.' },
      { label: 'BEDROOMS', value: '2.5 & 3 BHK Homes' },
    ],
    imageDesktop: '/media/images/reviva-vintage-valley.jpg',
    link: '/project/vintage-valley',
  },
  {
    id: 'reviva-farms',
    tag: 'MANAGED ECO-ESTATES',
    title: 'Reviva Farms',
    location: 'Bengaluru Suburbs',
    description: 'Immerse yourself in regenerative agroforestry and pristine managed farmland estates, crafted for holistic wellness and peaceful rural retreats.',
    highlights: [],
    imageDesktop: '/media/images/reviva-farms.jpg',
    link: '/project/reviva-farms',
  },
];

interface FeaturedCarouselProps {
  onSelectProject: (link: string) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ onSelectProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + FEATURED_ITEMS.length) % FEATURED_ITEMS.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
  };

  const activeItem = FEATURED_ITEMS[currentIndex];

  return (
    <section 
      id="carousel" 
      style={{
        position: 'relative',
        background: '#003831',
        padding: '4rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
      }}
    >
      <div className="container reveal" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--primary-accent)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              FEATURED DEVELOPMENTS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 600, color: '#ffffff', marginTop: '0.25rem' }}>
              Iconic Banners & Residences
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handlePrev}
              className="btn-magnetic"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label="Previous Project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="btn-magnetic"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label="Next Project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Split Panel: Image (Left, natural ratio without crop) + Curated Details (Right) */}
        <div
          className="featured-split-card card-tilt"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            background: '#0a0f14',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(159, 120, 61, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          }}
        >
          {/* Left: Natural Aspect Ratio Image Container */}
          <div 
            style={{ 
              position: 'relative', 
              background: '#0a0f14', 
              alignSelf: 'stretch',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              key={activeItem.imageDesktop}
              src={activeItem.imageDesktop}
              alt={activeItem.title}
              style={{ 
                width: '100%', 
                height: '100%', 
                minHeight: '380px',
                objectFit: 'cover', 
                display: 'block' 
              }}
            />

            {/* In-Image Navigation Buttons */}
            <button
              onClick={handlePrev}
              aria-label="Previous project image"
              className="btn-magnetic"
              style={{
                position: 'absolute',
                top: '50%',
                left: '1rem',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.75)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                zIndex: 20,
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next project image"
              className="btn-magnetic"
              style={{
                position: 'absolute',
                top: '50%',
                right: '1rem',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.75)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                zIndex: 20,
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Counter Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                background: 'rgba(0,0,0,0.75)',
                border: '1px solid rgba(159, 120, 61, 0.4)',
                color: '#e5b869',
                fontFamily: 'var(--font-accent)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                padding: '0.35rem 0.85rem',
                borderRadius: '50px',
                zIndex: 10,
                backdropFilter: 'blur(6px)',
              }}
            >
              {currentIndex + 1} / {FEATURED_ITEMS.length}
            </div>
          </div>

          {/* Right: Curated Project Details Panel */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              padding: '2.25rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(160deg, rgba(15, 23, 34, 0.96) 0%, rgba(9, 14, 20, 0.98) 100%)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#e5b869',
                  background: 'rgba(159, 120, 61, 0.15)',
                  border: '1px solid rgba(159, 120, 61, 0.35)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                }}
              >
                {activeItem.tag}
              </span>

              <h3
                key={`title-${currentIndex}`}
                className="fade-in-up"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.4rem, 2vw, 1.85rem)',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: 1.3,
                  marginBottom: '0.4rem',
                }}
              >
                {activeItem.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '1rem',
                  letterSpacing: '0.5px',
                }}
              >
                {activeItem.location}
              </p>

              <p
                key={`desc-${currentIndex}`}
                className="fade-in-up"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  color: '#cbd5e1',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}
              >
                {activeItem.description}
              </p>

              {/* Metric Highlight Chips (if any) */}
              {activeItem.highlights.length > 0 && (
                <div
                  key={`chips-${currentIndex}`}
                  className="fade-in-up"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {activeItem.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(159, 120, 61, 0.25)',
                        padding: '0.7rem 0.8rem',
                        borderRadius: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.68rem',
                          color: '#94a3b8',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          marginBottom: '0.2rem',
                          fontFamily: 'var(--font-accent)',
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#e5b869',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <button
                onClick={() => onSelectProject(activeItem.link)}
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: '0.7rem 1rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: 'var(--primary-accent)',
                  color: '#ffffff',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-button)',
                }}
              >
                EXPLORE PROJECT
              </button>
              <button
                onClick={() => onSelectProject(activeItem.link)}
                className="btn-outline"
                style={{
                  flex: 1,
                  padding: '0.7rem 1rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: '1px solid var(--primary-accent)',
                  color: '#e5b869',
                  background: 'transparent',
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-button)',
                }}
              >
                VIEW DETAILS
              </button>
            </div>
          </div>
        </div>

        {/* Indicator Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          {FEATURED_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === currentIndex ? 'var(--primary-accent)' : 'rgba(255,255,255,0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .featured-split-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

