import { MapPin, Home, Maximize, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  onBookVisit: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  onBookVisit,
}) => {
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
      
      {/* Property Image Container */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img 
          src={property.image} 
          alt={property.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="card-image-hover"
        />
        
        {/* Dark Vignette Gradient */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(11,15,21,0.85) 100%)'
          }}
        />

        {/* Top Status & Highlight Badges */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="badge-status">
            {property.status}
          </span>
          {property.highlightTag && (
            <span className="badge-accent">
              {property.highlightTag}
            </span>
          )}
        </div>

        {/* Bottom Price Overlay */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            <span className="gold-glow-text">{property.priceDisplay}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Title & Location */}
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
            {property.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <MapPin size={15} color="var(--primary-accent)" />
            <span>{property.location}</span>
          </div>

          {/* Key Property Features Grid */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.75rem',
              padding: '0.85rem',
              background: 'rgba(18, 24, 36, 0.6)',
              borderRadius: '8px',
              marginBottom: '1.25rem',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Home size={15} color="var(--primary-accent)" />
              <span>{property.bhk.join(', ')}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Maximize size={15} color="var(--primary-accent)" />
              <span>{property.areaSqFt}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Calendar size={15} color="var(--primary-accent)" />
              <span>{property.possessionDate}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={15} color="var(--primary-accent)" />
              <span>RERA Registered</span>
            </div>
          </div>

          {/* Amenities Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                • {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span style={{ fontSize: '0.72rem', color: 'var(--primary-accent)', fontWeight: 600, padding: '0.2rem' }}>
                +{property.amenities.length - 3} More
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button 
            onClick={() => onSelectProperty(property)}
            className="btn-outline"
            style={{ padding: '0.65rem 0.5rem', fontSize: '0.75rem', justifyContent: 'center' }}
          >
            <span>DETAILS</span>
            <ArrowRight size={14} />
          </button>

          <button 
            onClick={() => onBookVisit(property)}
            className="btn-primary"
            style={{ padding: '0.65rem 0.5rem', fontSize: '0.75rem', justifyContent: 'center' }}
          >
            <span>ENQUIRE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
