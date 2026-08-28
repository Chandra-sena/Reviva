import React, { useState } from 'react';
import type { Property, CityInfo } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  MapPin, Calendar, CheckCircle2, PhoneCall, Download, 
  Share2, ArrowLeft, Maximize2, ShieldCheck, Sparkles, Building, Layers, Check
} from 'lucide-react';

interface PropertyDetailPageProps {
  propertyId: string;
  properties: Property[];
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onBookVisit: (property: Property) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  propertyId,
  properties,
  cityInfo: _cityInfo,
  onNavigate,
  onBookVisit,
}) => {
  const property = properties.find((p) => p.id === propertyId) || properties[0];
  const [selectedImage, setSelectedImage] = useState<string>(property?.image || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplans' | 'amenities' | 'location'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBrochureDownloaded, setIsBrochureDownloaded] = useState(false);

  if (!property) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Property Not Found</h2>
        <button onClick={() => onNavigate('/properties')} className="btn-primary" style={{ marginTop: '1rem' }}>
          Back to Properties
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleBrochureDownload = () => {
    setIsBrochureDownloaded(true);
    setTimeout(() => setIsBrochureDownloaded(false), 3000);
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* Top Banner with Gallery */}
      <div style={{ background: 'linear-gradient(180deg, rgba(18, 24, 38, 0.95) 0%, rgba(10, 14, 23, 1) 100%)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
          
          {/* Top Actions & Breadcrumbs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Breadcrumbs 
              items={[
                { label: 'Properties', path: '/properties' },
                { label: property.name }
              ]} 
              onNavigate={onNavigate} 
            />

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={handleShare}
                className="btn-outline" 
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', gap: '0.4rem' }}
              >
                <Share2 size={14} />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button 
                onClick={() => onNavigate('/properties')}
                className="btn-outline" 
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', gap: '0.4rem' }}
              >
                <ArrowLeft size={14} />
                <span>All Projects</span>
              </button>
            </div>
          </div>

          {/* Title & Price Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-accent">{property.status}</span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-secondary)' }}>{property.type}</span>
                {property.highlightTag && (
                  <span className="badge" style={{ background: 'rgba(158, 120, 60, 0.2)', color: '#9E783C' }}>
                    <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {property.highlightTag}
                  </span>
                )}
              </div>

              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--text-primary)', margin: 0 }}>
                {property.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                <MapPin size={16} color="var(--primary-accent)" />
                <span>{property.location}</span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span style={{ fontSize: '0.85rem' }}>RERA: <strong>{property.reraNumber}</strong></span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Starting From</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', color: 'var(--primary-accent)', fontWeight: 800 }}>
                {property.priceDisplay}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Govt. charges & registration extra</div>
            </div>
          </div>

          {/* Image Showcase Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '2rem' }}>
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '420px', border: '1px solid var(--border-subtle)' }}>
              <img 
                src={selectedImage || property.image} 
                alt={property.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Maximize2 size={14} color="var(--primary-accent)" />
                <span>High Resolution Visual</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {property.gallery && property.gallery.length > 0 && (
              <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {[property.image, ...property.gallery].map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    style={{
                      width: '100px',
                      height: '70px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: (selectedImage || property.image) === imgUrl ? '2px solid var(--primary-accent)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      padding: 0,
                      background: 'none'
                    }}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Details Tabs & Sidebar Layout */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem' }}>
          
          {/* Main Content Column */}
          <div>
            {/* Tabs Header */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '2rem', overflowX: 'auto' }}>
              {[
                { key: 'overview', label: 'Overview & Highlights' },
                { key: 'floorplans', label: 'Floor Plans & Specs' },
                { key: 'amenities', label: 'Luxury Amenities' },
                { key: 'location', label: 'Location Advantage' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '1rem 0.5rem',
                    color: activeTab === tab.key ? 'var(--primary-accent)' : 'var(--text-secondary)',
                    fontWeight: activeTab === tab.key ? 700 : 500,
                    borderBottom: activeTab === tab.key ? '2px solid var(--primary-accent)' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Project Description</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
                  {property.description}
                </p>

                {/* Specs Box */}
                <div 
                  className="glass-panel" 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                    gap: '1.5rem',
                    padding: '1.5rem',
                    margin: '2rem 0'
                  }}
                >
                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Layers size={14} color="var(--primary-accent)" />
                      <span>Configurations</span>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem' }}>{property.bhk.join(', ')}</div>
                  </div>

                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Building size={14} color="var(--primary-accent)" />
                      <span>Super Built Area</span>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem' }}>{property.areaSqFt}</div>
                  </div>

                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={14} color="var(--primary-accent)" />
                      <span>Possession Date</span>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem' }}>{property.possessionDate}</div>
                  </div>

                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={14} color="var(--primary-accent)" />
                      <span>RERA Approved</span>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem' }}>{property.reraNumber}</div>
                  </div>
                </div>

                {/* Reviva Quality Standards */}
                <div style={{ marginTop: '2.5rem', marginBottom: '3rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>The Reviva Quality Assurance</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    {[
                      'In-house backward integration model ensuring 100% precision.',
                      'German technology precast construction & engineered timber doors.',
                      'Acoustic insulation double-glazed windows & custom sanitaryware.',
                      'Multi-tier 24/7 security with RFID vehicular access control.'
                    ].map((item, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', gap: '0.75rem' }}>
                        <CheckCircle2 size={18} color="var(--primary-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Map Block matching Screenshot 2 */}
                <div style={{ background: '#000000', borderRadius: '12px', padding: '2.5rem 1.5rem', textAlign: 'center', marginTop: '2rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#ffffff', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                    LOCATION
                  </h2>

                  <div 
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '380px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#7c8585',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {/* Map Vector Backdrop */}
                    <svg width="100%" height="100%" style={{ background: '#a1a8a8' }}>
                      <path d="M -50 150 Q 200 100 400 250 T 900 150" stroke="#ffffff" strokeWidth="18" fill="none" />
                      <path d="M 120 0 Q 150 200 250 450" stroke="#ffffff" strokeWidth="14" fill="none" />
                      <path d="M 600 0 Q 580 200 620 450" stroke="#ffffff" strokeWidth="12" fill="none" />
                      <ellipse cx="450" cy="180" rx="80" ry="50" fill="#7fa8b8" opacity="0.8" />
                      <text x="410" y="185" fill="#ffffff" fontSize="12" fontWeight="700">Hoskote Lake</text>
                      <circle cx="460" cy="270" r="10" fill="#9E783C" />
                    </svg>

                    {/* Top Right Category Filters matching Screenshot 2 */}
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', zIndex: 10 }}>
                      {['Education', 'Healthcare', 'Corporate', 'Leisure'].map((cat, idx) => (
                        <button
                          key={idx}
                          style={{
                            background: '#ffffff',
                            color: '#0f172a',
                            border: '1px solid #cbd5e1',
                            borderRadius: '20px',
                            padding: '0.4rem 1rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Centered Property Pin Badge matching Screenshot 2 */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#ffffff',
                        border: '1px solid #000000',
                        borderRadius: '6px',
                        padding: '0.6rem 1.2rem',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#000' }}>
                        {property.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Floorplans */}
            {activeTab === 'floorplans' && (
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Floor Plans & Layout Options</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Architecturally optimized master layouts maximizing natural light and cross ventilation.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {property.bhk.map((bhkType, index) => (
                    <div key={index} className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary-accent)', marginBottom: '0.5rem' }}>
                        {bhkType} Executive Layout
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                        Est. Area: {property.areaSqFt}
                      </div>

                      <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem 1rem', borderRadius: '8px', border: '1px dashed var(--border-subtle)', marginBottom: '1rem' }}>
                        <Layers size={36} color="var(--primary-accent)" style={{ margin: '0 auto 0.5rem', opacity: 0.7 }} />
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Interactive Architectural Floor Plan</div>
                      </div>

                      <button onClick={() => onBookVisit(property)} className="btn-outline" style={{ width: '100%', fontSize: '0.8rem' }}>
                        Request Plan Diagram PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Amenities */}
            {activeTab === 'amenities' && (
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>World-Class Amenities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(158, 120, 60, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={16} color="var(--primary-accent)" />
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Location */}
            {activeTab === 'location' && (
              <div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Location Advantage</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Strategically situated in {property.subLocation} with seamless access to major tech corridors, metro lines, and international schools.
                </p>

                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--primary-accent)' }}>IT Hubs & Tech Parks</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>Outer Ring Road / ITPL (~12 mins)</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--primary-accent)' }}>Connectivity & Metro</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>Upcoming Purple Metro Station (~5 mins)</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--primary-accent)' }}>Schools & Universities</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>Inventure & Greenwood High (~10 mins)</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Map Block Matching Screenshot 2 */}
                <div style={{ background: '#000000', borderRadius: '12px', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#ffffff', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                    LOCATION
                  </h2>

                  <div 
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '400px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#7c8585',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {/* Map Vector Graphic Backdrop */}
                    <svg width="100%" height="100%" style={{ background: '#a1a8a8' }}>
                      <path d="M -50 150 Q 200 100 400 250 T 900 150" stroke="#ffffff" strokeWidth="18" fill="none" />
                      <path d="M 120 0 Q 150 200 250 450" stroke="#ffffff" strokeWidth="14" fill="none" />
                      <path d="M 600 0 Q 580 200 620 450" stroke="#ffffff" strokeWidth="12" fill="none" />
                      <ellipse cx="450" cy="180" rx="80" ry="50" fill="#7fa8b8" opacity="0.8" />
                      <text x="410" y="185" fill="#ffffff" fontSize="12" fontWeight="700">Hoskote Lake</text>
                      <circle cx="460" cy="270" r="10" fill="#9E783C" />
                    </svg>

                    {/* Map Top Right Category Filters matching Screenshot 2 */}
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', zIndex: 10 }}>
                      {['Education', 'Healthcare', 'Corporate', 'Leisure'].map((cat, idx) => (
                        <button
                          key={idx}
                          style={{
                            background: '#ffffff',
                            color: '#0f172a',
                            border: '1px solid #cbd5e1',
                            borderRadius: '20px',
                            padding: '0.4rem 1rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Centered Property Pin Badge matching Screenshot 2 */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#ffffff',
                        border: '1px solid #000000',
                        borderRadius: '6px',
                        padding: '0.6rem 1.2rem',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#000' }}>
                        {property.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Sidebar Form / CTA Box */}
          <div>
            <div 
              className="glass-panel" 
              style={{ 
                position: 'sticky', 
                top: '100px', 
                padding: '1.75rem', 
                borderRadius: '12px',
                border: '1px solid var(--primary-accent)'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>
                Interested in {property.name}?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Connect with our Senior Relationship Executive for live video walkthroughs, pricing sheets & site visits.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  onClick={() => onBookVisit(property)} 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
                >
                  <PhoneCall size={16} />
                  <span>SCHEDULE SITE VISIT</span>
                </button>

                <button 
                  onClick={handleBrochureDownload} 
                  className="btn-outline" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
                >
                  {isBrochureDownloaded ? (
                    <>
                      <Check size={16} color="var(--primary-accent)" />
                      <span>Brochure Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      <span>DOWNLOAD BROCHURE</span>
                    </>
                  )}
                </button>

                <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Toll Free Helpline:</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-accent)', marginTop: '0.2rem' }}>
                    +91 80 4646 4500
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
