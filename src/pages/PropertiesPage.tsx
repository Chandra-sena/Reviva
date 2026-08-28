import React, { useState, useMemo } from 'react';
import type { Property, CityInfo } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { Sparkles, Search, Filter, Building2 } from 'lucide-react';

interface PropertiesPageProps {
  properties: Property[];
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onBookVisit: (property: Property) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  onNavigate,
  onBookVisit,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Filtered Properties List
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (property.highlightTag && property.highlightTag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'New Launch' && property.status === 'New Launch') ||
        (selectedStatus === 'Under Construction' && property.status === 'Under Construction') ||
        (selectedStatus === 'Ready to Move' && property.status === 'Ready to Move');

      const matchesType =
        selectedType === 'All' ||
        (selectedType === 'Apartment' && property.type === 'Apartment') ||
        (selectedType === 'Villa' && (property.type === 'Villa' || property.type === 'Row House'));

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [properties, searchQuery, selectedStatus, selectedType]);

  return (
    <div style={{ background: '#f8fafc', color: '#111827', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Hero Banner */}
      <section 
        style={{
          position: 'relative',
          width: '100%',
          height: '420px',
          background: `linear-gradient(180deg, rgba(0, 40, 35, 0.65) 0%, rgba(0, 56, 49, 0.9) 100%), url('https://revivaprojects.com/wp-content/uploads/2024/12/reviva-vintage-valley.webp') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
          padding: '0 1.5rem',
        }}
      >
        <span style={{ color: '#e5b869', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.6rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          REVIVA PROJECTS Portfolio
        </span>
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading, "Fraunces", serif)', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 700, 
            color: '#ffffff',
            textShadow: '0 4px 24px rgba(0,0,0,0.5)',
            letterSpacing: '0.02em',
            marginBottom: '0.75rem',
          }}
        >
          All Reviva Projects
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '1.05rem', maxWidth: '640px', lineHeight: 1.6, fontWeight: 300, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          Explore our complete portfolio of eco-conscious apartments, farm villas, and premium residential landmarks across Bengaluru and Pan-India.
        </p>
      </section>

      {/* Main Filter & Grid Container */}
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '3.5rem 1.5rem 0 1.5rem' }}>
        
        {/* Search & Filter Control Bar */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            marginBottom: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '420px' }}>
            <Search size={18} color="#9E783C" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by project name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.8rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                background: '#f8fafc'
              }}
              onFocus={(e) => (e.target.style.borderColor = '#9E783C')}
              onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
            />
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Filter size={15} color="#9E783C" /> Status:
            </span>

            {['All', 'New Launch', 'Under Construction', 'Ready to Move'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                style={{
                  background: selectedStatus === status ? '#003831' : '#f1f5f9',
                  color: selectedStatus === status ? '#ffffff' : '#475569',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: selectedStatus === status ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {['All', 'Apartment', 'Villa'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                style={{
                  background: selectedType === type ? '#9E783C' : 'transparent',
                  color: selectedType === type ? '#ffffff' : '#64748b',
                  border: selectedType === type ? '1px solid #9E783C' : '1px solid #cbd5e1',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: selectedType === type ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {type === 'All' ? 'All Types' : type === 'Villa' ? 'Villas & Plots' : 'Apartments'}
              </button>
            ))}
          </div>
        </div>

        {/* Section Title & Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#9E783C', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.78rem' }}>
              <Sparkles size={15} />
              <span>CRAFTED FOR SUSTAINABLE LIVING</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginTop: '0.25rem' }}>
              Explore Available Properties
            </h2>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500, background: '#ffffff', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            Showing <strong>{filteredProperties.length}</strong> of <strong>{properties.length}</strong> Projects
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProperties.length > 0 ? (
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
              gap: '2.5rem',
            }}
          >
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onSelectProperty={(p) => onNavigate(`/project/${p.id}/`)}
                onBookVisit={onBookVisit}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#ffffff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <Building2 size={48} color="#9E783C" style={{ margin: '0 auto 1rem auto', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>No projects match your filter criteria</h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Try adjusting your search terms or clearing status filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('All');
                setSelectedType('All');
              }}
              style={{
                background: '#003831',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.35rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
