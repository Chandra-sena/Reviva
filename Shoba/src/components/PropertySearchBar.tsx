import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { INITIAL_PROPERTIES } from '../data/initialData';

interface PropertySearchBarProps {
  onNavigate: (path: string) => void;
}

const CITIES = [
  { id: 'bengaluru', name: 'Bengaluru' },
  { id: 'gurugram', name: 'Gurugram' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'chennai', name: 'Chennai' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'gift-city-gandhinagar', name: 'Gift City Gandhinagar' },
  { id: 'coimbatore', name: 'Coimbatore' },
  { id: 'kochi', name: 'Kochi' },
  { id: 'pune', name: 'Pune' },
];

export const PropertySearchBar: React.FC<PropertySearchBarProps> = ({ onNavigate }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  // Filter projects by city if city is selected
  const availableProjects = selectedCity
    ? INITIAL_PROPERTIES.filter(p => p.subLocation.toLowerCase().includes(selectedCity.toLowerCase()) || p.location.toLowerCase().includes(selectedCity.toLowerCase()))
    : INITIAL_PROPERTIES;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProject) {
      onNavigate(`/project/${selectedProject}/`);
    } else if (selectedCity) {
      onNavigate(`/city/${selectedCity}/`);
    } else {
      onNavigate('/properties');
    }
  };

  return (
    <div 
      style={{
        width: '100%',
        background: '#ffffff',
        padding: '1.5rem 0',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 20,
      }}
    >
      <div className="container" style={{ maxWidth: '1000px' }}>
        <form
          onSubmit={handleSearch}
          className="reveal-scale"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto',
            gap: '1rem',
            alignItems: 'center',
            background: '#ffffff',
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
          }}
        >
          {/* Select City Dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedProject('');
              }}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '6px',
                border: 'none',
                background: 'transparent',
                color: '#0f172a',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
              }}
            >
              <option value="">Select City</option>
              {CITIES.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
            <ChevronDown size={18} color="#64748b" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>

          {/* Select Project Dropdown */}
          <div style={{ position: 'relative', borderLeft: '1px solid #cbd5e1' }}>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '6px',
                border: 'none',
                background: 'transparent',
                color: '#0f172a',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
              }}
            >
              <option value="">Select Project</option>
              {availableProjects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            <ChevronDown size={18} color="#64748b" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="btn-primary btn-magnetic"
            style={{
              padding: '0.85rem 2.2rem',
              background: '#9E783C',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '1px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Search size={18} />
            <span>SEARCH</span>
          </button>
        </form>
      </div>
    </div>
  );
};
