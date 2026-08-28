import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

interface LocationCard {
  id: string;
  name: string;
  image: string;
  citySlug: string;
}

const LOCATIONS_DATA: LocationCard[] = [
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80&sat=-15',
    citySlug: 'hyderabad',
  },
  {
    id: 'thiruvananthapuram',
    name: 'Thiruvananthapuram',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80&sat=-15',
    citySlug: 'thiruvananthapuram',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80&sat=-15',
    citySlug: 'bengaluru',
  },
  {
    id: 'chennai',
    name: 'Chennai',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    citySlug: 'chennai',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80&sat=-15',
    citySlug: 'mumbai',
  },
  {
    id: 'gurugram',
    name: 'Gurugram',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80&sat=-15',
    citySlug: 'gurugram',
  },
  {
    id: 'greater-noida',
    name: 'Greater Noida',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80&sat=-15',
    citySlug: 'greater-noida',
  },
  {
    id: 'gift-city',
    name: 'GIFT City Gujarat',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80',
    citySlug: 'gift-city-gujarat',
  },
];

interface LocationsSectionProps {
  onNavigateCity: (citySlug: string) => void;
  onNavigateProject: (projectSlug: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onNavigateCity,
  onNavigateProject,
}) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProject) {
      onNavigateProject(selectedProject);
    } else if (selectedCity) {
      onNavigateCity(selectedCity);
    } else {
      onNavigateCity('bengaluru');
    }
  };

  return (
    <section 
      id="location" 
      style={{
        padding: '5rem 0',
        background: '#ffffff',
        color: '#111827',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
          <h3 
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: '#0a0a0a',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
            }}
          >
            LOCATIONS
          </h3>
          <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6 }}>
            We handpick locations that offer seamless connectivity, unmatched return on investments,
            in a neighborhood that is truly one-of-a-kind.
          </p>
        </div>

        {/* Property Search Form */}
        <div 
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '3.5rem',
            maxWidth: '900px',
            margin: '0 auto 3.5rem auto',
          }}
        >
          <h5 style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#334155', marginBottom: '1.25rem' }}>
            SEARCH PROPERTIES
          </h5>

          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                flex: '1 1 220px',
                height: '48px',
                padding: '0 1rem',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '0.9rem',
                color: '#1e293b',
                background: '#ffffff',
                outline: 'none',
              }}
            >
              <option value="">Select City</option>
              <option value="bengaluru">Bengaluru</option>
              <option value="chennai">Chennai</option>
              <option value="coimbatore">Coimbatore</option>
              <option value="gift-city-gujarat">GIFT City Gandhinagar</option>
              <option value="greater-noida">Greater Noida</option>
              <option value="gurugram">Gurugram</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="kochi">Kochi</option>
              <option value="kozhikode">Kozhikode</option>
              <option value="mumbai">Mumbai</option>
              <option value="mysuru">Mysuru</option>
              <option value="pune">Pune</option>
              <option value="thiruvananthapuram">Thiruvananthapuram</option>
              <option value="thrissur">Thrissur</option>
            </select>

            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              style={{
                flex: '1 1 220px',
                height: '48px',
                padding: '0 1rem',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '0.9rem',
                color: '#1e293b',
                background: '#ffffff',
                outline: 'none',
              }}
            >
              <option value="">Select Project</option>
              <option value="sobha-oneworld">Reviva OneWorld</option>
              <option value="sobha-altair">Reviva Altair</option>
              <option value="sobha-magnus">Reviva Magnus</option>
              <option value="sobha-townpark">Reviva Townpark</option>
              <option value="sobha-ayana">Reviva Ayana</option>
              <option value="sobha-infinia">Reviva Infinia</option>
              <option value="sobha-neopolis">Reviva Neopolis</option>
              <option value="sobha-arbor">Reviva Arbor</option>
              <option value="sobha-waterfront">Reviva Waterfront</option>
            </select>

            <button
              type="submit"
              style={{
                height: '48px',
                padding: '0 1.75rem',
                background: '#9E783C',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Search size={18} />
              <span>SEARCH</span>
            </button>
          </form>
        </div>

        {/* Location Cards Grid / Carousel */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {LOCATIONS_DATA.map((loc) => (
            <div 
              key={loc.id}
              onClick={() => onNavigateCity(loc.citySlug)}
              style={{
                background: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
              }}
            >
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={loc.image}
                  alt={loc.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div 
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h6 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  {loc.name}
                </h6>
                <ChevronRight size={18} color="#9E783C" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
