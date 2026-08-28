import { useState } from 'react';
import { X, Palette, Database, Download, Plus, Trash2, Check, RefreshCw, Layers } from 'lucide-react';
import type { Property, ThemeConfig, CityInfo } from '../types';
import { THEME_PRESETS } from '../data/initialData';

interface ThemeDataCustomizerProps {
  currentTheme: ThemeConfig;
  onSelectTheme: (theme: ThemeConfig) => void;
  cityInfo: CityInfo;
  onUpdateCityInfo: (info: CityInfo) => void;
  properties: Property[];
  onUpdateProperties: (props: Property[]) => void;
  onClose: () => void;
}

export const ThemeDataCustomizer: React.FC<ThemeDataCustomizerProps> = ({
  currentTheme,
  onSelectTheme,
  cityInfo,
  onUpdateCityInfo,
  properties,
  onUpdateProperties,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'data' | 'properties' | 'json'>('theme');
  const [editedCity, setEditedCity] = useState<CityInfo>({ ...cityInfo });
  const [customPrimaryColor, setCustomPrimaryColor] = useState(currentTheme.primaryAccent);
  const [jsonText, setJsonText] = useState(JSON.stringify({ cityInfo, properties, currentTheme }, null, 2));

  // Save City Info
  const handleSaveCityInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCityInfo(editedCity);
    alert('City details updated live across the website!');
  };

  // Property edit helper
  const handlePropertyChange = (index: number, field: keyof Property, value: any) => {
    const updated = [...properties];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateProperties(updated);
  };

  // Add new property
  const handleAddProperty = () => {
    const newProp: Property = {
      id: `prop-${Date.now()}`,
      name: 'Reviva Signature Residence',
      location: 'Prime Location, Bengaluru',
      subLocation: 'East Bengaluru',
      type: 'Apartment',
      status: 'Under Construction',
      price: 250,
      priceDisplay: '₹ 2.50 Cr* Onwards',
      bhk: ['3 BHK', '4 BHK'],
      areaSqFt: '1800 - 2600 Sq. Ft.',
      image: '/images/hero_banner.png',
      gallery: ['/images/hero_banner.png'],
      amenities: ['Clubhouse', 'Swimming Pool', 'Landscaping'],
      reraNumber: 'PRM/KA/RERA/NEW/001',
      possessionDate: 'Dec 2028',
      description: 'Brand new luxury residential development featuring world-class amenities.',
      featured: true,
      highlightTag: 'New Launch'
    };
    onUpdateProperties([newProp, ...properties]);
  };

  // Delete property
  const handleDeleteProperty = (id: string) => {
    if (confirm('Are you sure you want to remove this property?')) {
      onUpdateProperties(properties.filter(p => p.id !== id));
    }
  };

  // Apply custom primary color
  const handleCustomColorApply = (color: string) => {
    setCustomPrimaryColor(color);
    const customTheme: ThemeConfig = {
      ...currentTheme,
      id: 'custom-user-theme',
      name: 'Custom User Color Scheme',
      primaryAccent: color,
      primaryAccentHover: color,
      primaryAccentGradient: `linear-gradient(135deg, ${color} 0%, #775500 100%)`,
      borderSubtle: `${color}40`,
    };
    onSelectTheme(customTheme);
  };

  // Export JSON
  const handleExportJson = () => {
    const exportData = {
      theme: currentTheme,
      cityInfo,
      properties
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cityInfo.cityName.toLowerCase()}_reviva_config.json`;
    a.click();
  };

  // Apply JSON Config
  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed.cityInfo) onUpdateCityInfo(parsed.cityInfo);
      if (parsed.properties) onUpdateProperties(parsed.properties);
      if (parsed.theme) onSelectTheme(parsed.theme);
      alert('Custom configuration JSON loaded successfully!');
    } catch (err) {
      alert('Invalid JSON syntax. Please verify formatting.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0,
          borderRadius: '16px'
        }}
      >
        {/* Header Bar */}
        <div 
          style={{
            padding: '1.5rem 2rem',
            background: 'rgba(18, 24, 36, 0.95)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Palette size={22} color="var(--primary-accent)" />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Website Theme & Data Manager</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Customize colors, city data, developer branding, and properties live
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div 
          style={{
            display: 'flex',
            background: 'rgba(11, 15, 21, 0.8)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '0 1.5rem'
          }}
        >
          <button 
            onClick={() => setActiveTab('theme')}
            style={{
              padding: '1rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'theme' ? '2px solid var(--primary-accent)' : '2px solid transparent',
              color: activeTab === 'theme' ? 'var(--primary-accent)' : 'var(--text-secondary)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}
          >
            <Palette size={16} />
            Theme Colors ({THEME_PRESETS.length})
          </button>

          <button 
            onClick={() => setActiveTab('data')}
            style={{
              padding: '1rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'data' ? '2px solid var(--primary-accent)' : '2px solid transparent',
              color: activeTab === 'data' ? 'var(--primary-accent)' : 'var(--text-secondary)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}
          >
            <Database size={16} />
            City & Branding Info
          </button>

          <button 
            onClick={() => setActiveTab('properties')}
            style={{
              padding: '1rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'properties' ? '2px solid var(--primary-accent)' : '2px solid transparent',
              color: activeTab === 'properties' ? 'var(--primary-accent)' : 'var(--text-secondary)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}
          >
            <Layers size={16} />
            Properties Data ({properties.length})
          </button>

          <button 
            onClick={() => setActiveTab('json')}
            style={{
              padding: '1rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'json' ? '2px solid var(--primary-accent)' : '2px solid transparent',
              color: activeTab === 'json' ? 'var(--primary-accent)' : 'var(--text-secondary)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}
          >
            <Download size={16} />
            Import / Export JSON
          </button>
        </div>

        {/* Tab Body */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          
          {/* TAB 1: THEMES */}
          {activeTab === 'theme' && (
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Select Color Theme Preset
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {THEME_PRESETS.map((preset) => {
                  const isSelected = currentTheme.id === preset.id;
                  return (
                    <div 
                      key={preset.id}
                      onClick={() => onSelectTheme(preset)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '10px',
                        background: preset.surfaceDark,
                        border: isSelected ? `2px solid ${preset.primaryAccent}` : '1px solid rgba(255,255,255,0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      {isSelected && (
                        <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: preset.primaryAccent, color: '#000', borderRadius: '50%', padding: '2px' }}>
                          <Check size={14} />
                        </span>
                      )}
                      
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: preset.textPrimary, marginBottom: '0.75rem' }}>
                        {preset.name}
                      </div>

                      {/* Color Palette Swatches */}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: preset.primaryAccent }} title="Accent" />
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: preset.bgDark, border: '1px solid #fff' }} title="Background" />
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: preset.surfaceDark, border: '1px solid #777' }} title="Surface" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Accent Picker */}
              <div style={{ background: 'rgba(18, 24, 36, 0.6)', padding: '1.5rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Custom Primary Accent Color Picker</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input 
                    type="color" 
                    value={customPrimaryColor}
                    onChange={(e) => handleCustomColorApply(e.target.value)}
                    style={{ width: '50px', height: '40px', borderRadius: '6px', cursor: 'pointer', border: 'none' }}
                  />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Active Hex: <strong style={{ color: 'var(--primary-accent)' }}>{currentTheme.primaryAccent}</strong>
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CITY & BRANDING */}
          {activeTab === 'data' && (
            <form onSubmit={handleSaveCityInfo} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">City Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={editedCity.cityName}
                    onChange={(e) => setEditedCity({ ...editedCity, cityName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">Developer Brand Name</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={editedCity.developerName}
                    onChange={(e) => setEditedCity({ ...editedCity, developerName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Developer Tagline</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={editedCity.tagline}
                  onChange={(e) => setEditedCity({ ...editedCity, tagline: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Hero Title Headline</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={editedCity.heroTitle}
                  onChange={(e) => setEditedCity({ ...editedCity, heroTitle: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Hero Subtitle Text</label>
                <textarea 
                  rows={3}
                  className="form-input"
                  value={editedCity.heroSubtitle}
                  onChange={(e) => setEditedCity({ ...editedCity, heroSubtitle: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                SAVE & APPLY BRANDING
              </button>
            </form>
          )}

          {/* TAB 3: PROPERTIES DATA */}
          {activeTab === 'properties' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', textTransform: 'uppercase' }}>Edit Property Listings</h4>
                <button onClick={handleAddProperty} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                  <Plus size={14} />
                  ADD NEW PROPERTY
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {properties.map((prop, idx) => (
                  <div 
                    key={prop.id}
                    style={{
                      background: 'rgba(18, 24, 36, 0.7)',
                      padding: '1.25rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: 'var(--primary-accent)', fontSize: '1.05rem' }}>#{idx + 1}. {prop.name}</strong>
                      <button 
                        onClick={() => handleDeleteProperty(prop.id)}
                        style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}
                        title="Delete Property"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem' }}>
                      <input 
                        type="text" 
                        placeholder="Property Name" 
                        value={prop.name} 
                        onChange={(e) => handlePropertyChange(idx, 'name', e.target.value)} 
                        className="form-input"
                      />
                      <input 
                        type="text" 
                        placeholder="Price Display" 
                        value={prop.priceDisplay} 
                        onChange={(e) => handlePropertyChange(idx, 'priceDisplay', e.target.value)} 
                        className="form-input"
                      />
                      <select 
                        value={prop.status} 
                        onChange={(e) => handlePropertyChange(idx, 'status', e.target.value)}
                        className="form-input"
                      >
                        <option value="Under Construction">Under Construction</option>
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Upcoming">Upcoming</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <input 
                        type="text" 
                        placeholder="Location" 
                        value={prop.location} 
                        onChange={(e) => handlePropertyChange(idx, 'location', e.target.value)} 
                        className="form-input"
                      />
                      <input 
                        type="text" 
                        placeholder="Image URL" 
                        value={prop.image} 
                        onChange={(e) => handlePropertyChange(idx, 'image', e.target.value)} 
                        className="form-input"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: JSON IMPORT/EXPORT */}
          {activeTab === 'json' && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Copy your customized JSON output below to backup your data, or upload/paste a JSON object to instantly update the website state.
              </p>

              <textarea 
                rows={12}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="form-input"
                style={{ fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '1.5rem' }}
              />

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleApplyJson} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <RefreshCw size={16} />
                  APPLY JSON CONFIG
                </button>
                <button onClick={handleExportJson} className="btn-outline" style={{ padding: '0.85rem 1.5rem' }}>
                  <Download size={16} />
                  EXPORT JSON FILE
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
