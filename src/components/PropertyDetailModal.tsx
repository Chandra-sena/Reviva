import { useState } from 'react';
import { X, MapPin, Calendar, ShieldCheck, Home, Maximize, CheckCircle2, Download, PhoneCall } from 'lucide-react';
import type { Property } from '../types';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  onBookVisit: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onBookVisit,
}) => {
  const [selectedImage, setSelectedImage] = useState(property.image);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Title Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <span className="badge-status">{property.status}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>• {property.type}</span>
          </div>
          
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>{property.name}</h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            <MapPin size={16} color="var(--primary-accent)" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Main Image Gallery */}
        <div style={{ borderRadius: '10px', overflow: 'hidden', height: '380px', marginBottom: '1rem', position: 'relative' }}>
          <img 
            src={selectedImage} 
            alt={property.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '1.2rem', fontWeight: 800 }}>
            <span className="gold-glow-text">{property.priceDisplay}</span>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {property.gallery && property.gallery.length > 1 && (
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            {property.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                style={{
                  width: '80px',
                  height: '55px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: selectedImage === img ? '2px solid var(--primary-accent)' : '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}

        {/* Quick Specs Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            padding: '1.25rem',
            background: 'rgba(18, 24, 36, 0.7)',
            borderRadius: '8px',
            marginBottom: '2rem',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Configurations</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <Home size={16} color="var(--primary-accent)" />
              <span>{property.bhk.join(', ')}</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Super Built-Up Area</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <Maximize size={16} color="var(--primary-accent)" />
              <span>{property.areaSqFt}</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Possession Date</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <Calendar size={16} color="var(--primary-accent)" />
              <span>{property.possessionDate}</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>RERA Registration</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem', wordBreak: 'break-all' }}>
              <ShieldCheck size={16} color="var(--primary-accent)" />
              <span>{property.reraNumber}</span>
            </div>
          </div>
        </div>

        {/* Overview Description */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Project Overview</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {property.description}
          </p>
        </div>

        {/* Luxury Amenities */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>World-Class Amenities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
            {property.amenities.map((amenity, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.04)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                <CheckCircle2 size={16} color="var(--primary-accent)" />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
          <button 
            onClick={() => { onClose(); onBookVisit(property); }}
            className="btn-primary" 
            style={{ flex: 1, justifyContent: 'center', padding: '0.9rem' }}
          >
            <PhoneCall size={18} />
            <span>SCHEDULE EXCLUSIVE SITE VISIT</span>
          </button>
          
          <button 
            onClick={() => alert(`Brochure request initiated for ${property.name}. Check your email!`)}
            className="btn-outline" 
            style={{ padding: '0.9rem 1.5rem' }}
          >
            <Download size={18} />
            <span>DOWNLOAD BROCHURE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
