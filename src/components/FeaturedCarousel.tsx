import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedItem {
  id: string;
  title: string;
  location: string;
  imageDesktop: string;
  link: string;
}

const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: 'reviva-trinity-lifescape',
    title: 'Reviva Trinity Lifescape',
    location: 'Bengaluru, Karnataka (2, 3 & 4 BHK Luxury Residences)',
    imageDesktop: '/assets/reviva-trinity-lifescape-3.jpg',
    link: '/project/reviva-trinity-lifescape',
  },
  {
    id: 'oneworld',
    title: 'Reviva OneWorld',
    location: 'Greater Whitefield, Bengaluru',
    imageDesktop: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    link: '/project/sobha-oneworld',
  },
  {
    id: 'crescent',
    title: 'Reviva Crescent',
    location: 'Sector 63A, Gurugram',
    imageDesktop: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80',
    link: '/project/sobha-crescent',
  },
  {
    id: 'rivana',
    title: 'Reviva Rivana',
    location: 'Sector 1, Greater Noida',
    imageDesktop: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    link: '/project/sobha-rivana',
  },
  {
    id: 'altair',
    title: 'Reviva Altair',
    location: 'Bengaluru',
    imageDesktop: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
    link: '/project/sobha-altair',
  },
  {
    id: 'woods',
    title: 'Reviva Woods - Whispering Hill',
    location: 'Thiruvananthapuram',
    imageDesktop: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80&sat=-20',
    link: '/project/sobha-woods',
  },
  {
    id: 'inizio',
    title: 'Reviva Inizio',
    location: 'Mumbai',
    imageDesktop: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80&sat=-20',
    link: '/project/sobha-inizio',
  },
  {
    id: 'strada',
    title: 'Reviva Strada',
    location: 'Sector 106, Gurugram',
    imageDesktop: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80&sat=-20',
    link: '/project/sobha-strada',
  },
  {
    id: 'townpark',
    title: 'Reviva Townpark',
    location: 'Bengaluru',
    imageDesktop: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80&sat=-20',
    link: '/project/sobha-townpark',
  },
  {
    id: 'infinia',
    title: 'Reviva Infinia',
    location: 'Bengaluru',
    imageDesktop: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80&sat=-20',
    link: '/project/sobha-infinia',
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
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FEATURED_ITEMS.length) % FEATURED_ITEMS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
  };

  const activeItem = FEATURED_ITEMS[currentIndex];

  return (
    <section 
      id="carousel" 
      style={{
        position: 'relative',
        background: '#0a0a0a',
        padding: '3rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ color: 'var(--primary-accent)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              FEATURED DEVELOPMENTS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#ffffff', marginTop: '0.25rem' }}>
              Iconic Banners & Residences
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={handlePrev}
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
              }}
              aria-label="Previous Project"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
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
              }}
              aria-label="Next Project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Active Banner Slide */}
        <div 
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onClick={() => onSelectProject(activeItem.link)}
        >
          <img 
            src={activeItem.imageDesktop}
            alt={activeItem.title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '520px',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.5s ease',
            }}
          />

          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2rem',
              background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <span style={{ background: 'var(--primary-accent)', color: '#000', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '3px', textTransform: 'uppercase' }}>
                FEATURED
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', margin: '0.4rem 0 0.2rem 0', fontFamily: 'var(--font-heading)' }}>
                {activeItem.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: 0 }}>
                {activeItem.location}
              </p>
            </div>

            <button 
              style={{
                background: 'var(--primary-accent)',
                color: '#000',
                border: 'none',
                padding: '0.6rem 1.25rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              EXPLORE PROJECT
            </button>
          </div>
        </div>

        {/* Indicator Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
          {FEATURED_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === currentIndex ? 'var(--primary-accent)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
