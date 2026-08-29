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
    <div 
      className="glass-panel reviva-card-hover card-tilt shimmer-hover" 
      onClick={() => {
        if (property.redirectToEnquiry) {
          onBookVisit(property);
        }
      }}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden', 
        height: '100%', 
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: property.redirectToEnquiry ? 'pointer' : 'default'
      }}
    >
      
      {/* Property Image Container */}
      <div className="img-hover-wrap" style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: '#0a0d14' }}>
        <img 
          src={property.image} 
          alt={property.name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
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
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', textShadow: '0 2px 8px rgba(0,0,0,0.8)', letterSpacing: '0.01em' }}>
            <span className="gold-glow-text">{property.priceDisplay}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Title & Location */}
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {property.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <MapPin size={15} color="var(--primary-accent)" />
            <span>{property.location}</span>
          </div>

          {/* Key Property Features Grid or Coming Soon Banner */}
          {property.bhk && property.bhk.length > 0 ? (
            <>
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '0.75rem',
                  padding: '0.85rem',
                  background: '#111827',
                  borderRadius: '8px',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(159, 120, 61, 0.35)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#ffffff', fontWeight: 400, letterSpacing: '0.02em' }}>
                  <Home size={15} color="#e5b869" />
                  <span>{property.bhk.join(', ')}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#ffffff', fontWeight: 400, letterSpacing: '0.02em' }}>
                  <Maximize size={15} color="#e5b869" />
                  <span>{property.areaSqFt}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#ffffff', fontWeight: 400, letterSpacing: '0.02em' }}>
                  <Calendar size={15} color="#e5b869" />
                  <span>{property.possessionDate}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#ffffff', fontWeight: 400, letterSpacing: '0.02em' }}>
                  <ShieldCheck size={15} color="#e5b869" />
                  <span>RERA Registered</span>
                </div>
              </div>

              {/* Amenities Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {property.amenities.slice(0, 3).map((amenity, idx) => (
                  <span key={idx} style={{ background: 'rgba(0, 67, 61, 0.08)', color: '#00433D', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '0.74rem', padding: '0.25rem 0.65rem', borderRadius: '4px', border: '1px solid rgba(0, 67, 61, 0.15)', letterSpacing: '0.02em' }}>
                    • {amenity}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.74rem', color: '#9F783D', fontWeight: 600, padding: '0.25rem' }}>
                    +{property.amenities.length - 3} More
                  </span>
                )}
              </div>
            </>
          ) : (
            <div 
              style={{ 
                padding: '2rem 1rem', 
                background: 'rgba(0, 67, 61, 0.06)', 
                borderRadius: '8px', 
                border: '1px dashed rgba(159, 120, 61, 0.35)',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#9E783C', marginBottom: '0.4rem' }}>
                Coming Soon
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {property.description || 'Register your interest for early access.'}
              </p>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: property.bhk && property.bhk.length > 0 ? '1fr 1fr' : '1fr', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {property.bhk && property.bhk.length > 0 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSelectProperty(property);
              }}
              className="btn-outline"
              style={{ padding: '0.65rem 0.5rem', fontFamily: 'var(--font-button)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1.5px', justifyContent: 'center' }}
            >
              <span>DETAILS</span>
              <ArrowRight size={14} />
            </button>
          )}

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onBookVisit(property);
            }}
            className="btn-primary"
            style={{ padding: '0.65rem 0.5rem', fontFamily: 'var(--font-button)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1.5px', justifyContent: 'center' }}
          >
            <span>ENQUIRE</span>
          </button>
        </div>

      </div>
      <style>{`
        .reviva-card-hover:hover {
          transform: translateY(-4px);
          border-color: #9E783C !important;
          box-shadow: 0 12px 30px rgba(158, 120, 60, 0.25) !important;
        }
        .reviva-card-hover:hover img {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
};
