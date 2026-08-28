import type { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { Building2, Sparkles } from 'lucide-react';

interface PropertyListProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onBookVisit: (property: Property) => void;
  cityName: string;
}

export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  onSelectProperty,
  onBookVisit,
  cityName,
}) => {
  if (properties.length === 0) {
    return (
      <div
        className="glass-panel reveal-scale"
        style={{ padding: '4rem 2rem', textAlign: 'center', margin: '3rem 0' }}
      >
        <Building2 size={48} color="var(--primary-accent)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Residences Match Your Selected Filters</h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          Try resetting your price range or clearing micro-location selections to view all luxury developments in {cityName}.
        </p>
      </div>
    );
  }

  const featured = properties.filter(p => p.featured);
  const standard = properties.filter(p => !p.featured);

  return (
    <section id="properties" style={{ padding: '4rem 0' }}>
      
      {/* Featured Luxury Signature Showcase */}
      {featured.length > 0 && (
        <div className="reveal-left" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={18} color="var(--primary-accent)" />
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
              Flagship Collection
            </span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '2rem' }}>
            Featured Residences in <span className="gold-glow-text">{cityName}</span>
          </h2>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem' 
            }}
          >
            {featured.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onSelectProperty={onSelectProperty}
                onBookVisit={onBookVisit}
              />
            ))}
          </div>
        </div>
      )}

      {/* All / Additional Developments */}
      {standard.length > 0 && (
        <div className="reveal-right">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Building2 size={18} color="var(--primary-accent)" />
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
              Prime Portfolio
            </span>
          </div>

          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '2rem' }}>
            All Luxury Developments ({properties.length})
          </h2>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem' 
            }}
          >
            {standard.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onSelectProperty={onSelectProperty}
                onBookVisit={onBookVisit}
              />
            ))}
          </div>
        </div>
      )}

    </section>
  );
};
