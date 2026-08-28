import { Filter, RotateCcw } from 'lucide-react';
import type { FilterState } from '../types';

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const handleSelectChange = (field: keyof FilterState, value: string | number) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div 
      className="glass-panel"
      style={{
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 20,
        padding: '1.5rem 2rem',
        borderRadius: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Filter size={18} color="var(--primary-accent)" />
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Filter Luxury Residences
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary-accent)', fontWeight: 700 }}>
            ({totalResults} Properties Found)
          </span>
        </div>

        <button 
          onClick={onResetFilters}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'color 0.2s ease'
          }}
          title="Reset Filters"
        >
          <RotateCcw size={14} />
          <span>Reset All</span>
        </button>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}
      >
        {/* Status */}
        <div>
          <label className="form-label">Construction Status</label>
          <select 
            className="form-input"
            value={filters.status}
            onChange={(e) => handleSelectChange('status', e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="form-label">Property Type</label>
          <select 
            className="form-input"
            value={filters.type}
            onChange={(e) => handleSelectChange('type', e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Row House">Row House / Townhouse</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="form-label">Micro Location</label>
          <select 
            className="form-input"
            value={filters.location}
            onChange={(e) => handleSelectChange('location', e.target.value)}
          >
            <option value="All">All Locations</option>
            <option value="East Bengaluru">East Bengaluru (Panathur, Whitefield)</option>
            <option value="North Bengaluru">North Bengaluru (Devanahalli)</option>
            <option value="South Bengaluru">South Bengaluru (Hosur Rd, E-City)</option>
            <option value="Sarjapur Road">Sarjapur Road</option>
          </select>
        </div>

        {/* BHK Config */}
        <div>
          <label className="form-label">Bedrooms (BHK)</label>
          <select 
            className="form-input"
            value={filters.bhk}
            onChange={(e) => handleSelectChange('bhk', e.target.value)}
          >
            <option value="All">Any Config</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK / Triplex</option>
          </select>
        </div>

        {/* Price Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <label className="form-label" style={{ marginBottom: 0 }}>Max Budget</label>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-accent)', fontWeight: 700 }}>
              Up to ₹ {filters.maxPrice >= 1200 ? '12+ Cr' : `${(filters.maxPrice / 100).toFixed(2)} Cr`}
            </span>
          </div>
          <input 
            type="range"
            min="100"
            max="1200"
            step="50"
            value={filters.maxPrice}
            onChange={(e) => handleSelectChange('maxPrice', Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary-accent)', cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
};
