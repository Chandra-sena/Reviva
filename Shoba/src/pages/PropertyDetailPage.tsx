import React, { useState } from 'react';
import type { Property, CityInfo } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LeafAccent } from '../components/LeafAccent';
import { 
  MapPin, Download, Share2, ArrowLeft, Maximize2, Check,
  FileText, LayoutGrid, Map, ChevronLeft, ChevronRight, X, Send, Sparkles, Navigation
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
  onBookVisit: _onBookVisit,
}) => {
  const property = properties.find((p) => p.id === propertyId) || properties[0];
  
  // State variables for Reviva project details interaction
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'rera'>('overview');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Modal states for Master Plan, Floor Plan & Brochure
  const [modalMode, setModalMode] = useState<'brochure' | 'masterplan' | 'floorplan' | 'lightbox' | null>(null);
  const [activeFloorPlanBhk, setActiveFloorPlanBhk] = useState<'2.5 BHK' | '3 BHK'>('2.5 BHK');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

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

  const galleryImages = [
    property.image,
    ...(property.gallery && property.gallery.length > 0 ? property.gallery : [
      '/media/images/eco-house-hero.jpg',
      '/media/images/property-gallery-2.jpg',
      '/media/images/property-gallery-3.jpg',
      '/media/images/property-gallery-4.jpg'
    ])
  ];

  const downloadFile = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'download.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResourceClick = (mode: 'brochure' | 'masterplan' | 'floorplan') => {
    const url = mode === 'brochure' ? property.brochureUrl : mode === 'masterplan' ? property.masterPlanUrl : property.floorPlanUrl;
    if (url) {
      downloadFile(url);
    } else {
      setModalMode(mode);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
    setTimeout(() => {
      setEnquirySubmitted(false);
      setIsEnquiryOpen(false);
    }, 2500);
  };

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '4rem' }}>

      {/* 1. REVIVA HERO BANNER SECTION (Exact match to www.revivaprojects.com/projects/vintage-valley/) */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%), url('${galleryImages[0]}') center/cover no-repeat`,
          color: '#ffffff',
          padding: '100px 1.5rem 3rem 1.5rem',
          overflow: 'hidden'
        }}
      >
        <LeafAccent corner="top-left" size="11%" opacity={0.1} color="#3a7d6f" />

        {/* Top Breadcrumb & Share Actions Bar */}
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Breadcrumbs 
            items={[
              { label: 'Projects', path: '/properties' },
              { label: property.name }
            ]} 
            onNavigate={onNavigate} 
          />

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={handleShare}
              style={{ 
                background: 'rgba(0,0,0,0.5)', 
                border: '1px solid rgba(255,255,255,0.4)', 
                color: '#fff', 
                padding: '0.45rem 1rem', 
                borderRadius: '50px', 
                fontSize: '0.8rem', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backdropFilter: 'blur(6px)'
              }}
            >
              <Share2 size={14} />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button 
              onClick={() => onNavigate('/properties')}
              style={{ 
                background: 'rgba(0,0,0,0.5)', 
                border: '1px solid rgba(255,255,255,0.4)', 
                color: '#fff', 
                padding: '0.45rem 1rem', 
                borderRadius: '50px', 
                fontSize: '0.8rem', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backdropFilter: 'blur(6px)'
              }}
            >
              <ArrowLeft size={14} />
              <span>All Projects</span>
            </button>
          </div>
        </div>

        {/* Center Hero Overlay Headline */}
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', margin: '2.5rem auto' }}>
          <h1
            className="hero-reveal gold-shimmer-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              lineHeight: 1.2,
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.9))'
            }}
          >
            WHERE LIFE BLOOMS IN EVERY CORNER
          </h1>
        </div>

        {/* Bottom Hero Info & Floating ENQUIRE Pill Button */}
        <div className="container hero-reveal hero-reveal-delay-1" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          {property.id === 'reviva-trinity-lifescape' && (
            <div className="desktop-only" style={{ maxWidth: '380px', fontFamily: 'serif', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', lineHeight: 1.35, color: '#ffffff', opacity: 0.75, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Residences are positioned to overlook garden
            </div>
          )}

          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 600, fontFamily: 'var(--font-heading)', letterSpacing: '0.5px', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              The Grace of Classic Living
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: '#ffffff', marginTop: '0.25rem', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              <MapPin size={16} color="#e5b869" />
              <span>{property.location || 'Channasandra, Whitefield, Bangalore'}</span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', marginTop: '0.25rem', color: '#e5b869', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
              {property.bhk ? property.bhk.join(' • ') : '2.5 BHK • 3 BHK'}
            </div>
          </div>

          <button
            className="btn-primary btn-magnetic"
            onClick={() => setIsEnquiryOpen(true)}
            style={{
              background: '#9F783D',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50px',
              padding: '0.75rem 2rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(159, 120, 61, 0.4)',
            }}
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>

      {/* 2. OVERVIEW & BRAND LOGO SECTION (Reviva Project Overview & Leaf Logo Branding) */}
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left: Green Brand Logo Graphic Box */}
          <div
            className="reveal-left card-tilt"
            style={{
              background: '#00433D',
              borderRadius: '16px', 
              padding: '3.5rem 2rem', 
              textAlign: 'center', 
              color: '#ffffff',
              boxShadow: '0 20px 40px rgba(0, 67, 61, 0.25)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, background: 'radial-gradient(circle, #ffffff 10%, transparent 10%) center/20px 20px' }} />
            <div style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#9F783D', fontWeight: 700 }}>
              REVIVA
            </div>
            <h2 style={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 400, letterSpacing: '2px', margin: '0.5rem 0 1rem 0' }}>
              {property.name.toLowerCase()}
            </h2>
            <div style={{ width: '40px', height: '2px', background: '#9F783D', margin: '0 auto' }} />
          </div>

          {/* Right: Overview Description */}
          <div className="reveal-right">
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9F783D', fontWeight: 700 }}>
              ABOUT {property.name.toUpperCase()}
            </span>
            <h2 style={{ fontFamily: 'serif', fontSize: '2.25rem', color: '#111827', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
              Timeless Elegance & Contemporary Luxury
            </h2>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1rem' }}>
              {property.description || `${property.name} seamlessly merges classical charm with modern design, offering a refined and sophisticated living experience in ${property.location}.`}
            </p>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1rem' }}>
              At its heart lies a spacious rooftop retreat, complete with a swimming pool, landscaped patios, outdoor cafés, gazebos, and cozy nooks—perfectly crafted for relaxation and connection.
            </p>
          </div>

        </div>
      </div>

      {/* 3. TABBED SPECIFICATIONS & PROJECT RESOURCES BOX (Exact Match to Reviva Details Page) */}
      {property.id !== 'reviva-farms' && (
      <div className="container" style={{ padding: '0 1.5rem 4rem 1.5rem' }}>
        <div
          className="reveal-scale"
          style={{
            border: '2px solid #9F783D',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#ffffff',
            boxShadow: '0 12px 36px rgba(0,0,0,0.06)'
          }}
        >
          {/* Tabs Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <button
              className="tab-pill-hover"
              onClick={() => setActiveTab('overview')}
              style={{
                padding: '1.25rem 1rem',
                border: 'none',
                background: activeTab === 'overview' ? '#9F783D' : 'transparent',
                color: activeTab === 'overview' ? '#ffffff' : '#4b5563',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              PROJECT OVERVIEW
            </button>

            <button
              className="tab-pill-hover"
              onClick={() => setActiveTab('amenities')}
              style={{
                padding: '1.25rem 1rem',
                border: 'none',
                background: activeTab === 'amenities' ? '#9F783D' : 'transparent',
                color: activeTab === 'amenities' ? '#ffffff' : '#4b5563',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              AMENITIES
            </button>

            <button
              className="tab-pill-hover"
              onClick={() => setActiveTab('rera')}
              style={{
                padding: '1.25rem 1rem',
                border: 'none',
                background: activeTab === 'rera' ? '#9F783D' : 'transparent',
                color: activeTab === 'rera' ? '#ffffff' : '#4b5563',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              RERA NUMBERS
            </button>
          </div>

          {/* Active Tab Body */}
          <div style={{ padding: '2.5rem 2rem', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            {activeTab === 'overview' && (
              <p style={{ color: '#374151', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '800px', margin: 0 }}>
                {property.name} reimagines timeless elegance with a contemporary touch. Features premium construction, high-ceiling apartments, cross-ventilation, and custom interior finishes.
              </p>
            )}

            {activeTab === 'amenities' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                {property.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="badge-accent"
                    style={{
                      background: 'rgba(159, 120, 61, 0.1)',
                      color: '#9F783D',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '50px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Sparkles size={14} />
                    {amenity}
                  </span>
                ))}
              </div>
            )}

            {activeTab === 'rera' && (
              <div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                  Karnataka RERA Registration Number
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00433D', letterSpacing: '1px' }}>
                  {property.reraNumber || 'PRM/KA/RERA/1251/446/PR/140525/007741'}
                </div>
              </div>
            )}
          </div>

          {/* PROJECT RESOURCES BAR (Brochure, Master Plan, Floor Plan Triggers) */}
          <div style={{ borderTop: '1px solid #e5e7eb', padding: '2rem 1.5rem', background: '#fafafa', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#6b7280', fontWeight: 700, marginBottom: '1.5rem' }}>
              PROJECT RESOURCES
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', maxWidth: '750px', margin: '0 auto' }}>
              {/* Resource 1: Brochure */}
              <button
                onClick={() => handleResourceClick('brochure')}
                className="resource-btn-hover"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '1.25rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                }}
              >
                <FileText size={32} color="#9F783D" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>Brochure</span>
              </button>

              {/* Resource 2: Master Plan */}
              <button
                onClick={() => handleResourceClick('masterplan')}
                className="resource-btn-hover"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '1.25rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                }}
              >
                <LayoutGrid size={32} color="#9F783D" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>Master Plan</span>
              </button>

              {/* Resource 3: Floor Plan */}
              <button
                onClick={() => handleResourceClick('floorplan')}
                className="resource-btn-hover"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '1.25rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                }}
              >
                <Map size={32} color="#9F783D" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>Floor Plan</span>
              </button>
            </div>
          </div>

        </div>
      </div>
      )}

      {/* 4. PHOTO GALLERY CAROUSEL SECTION */}
      <div className="container reveal" style={{ padding: '0 1.5rem 4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9F783D', fontWeight: 700 }}>
            ARCHITECTURE & RENDERS
          </span>
          <h2 style={{ fontFamily: 'serif', fontSize: '2.25rem', color: '#111827', marginTop: '0.3rem' }}>
            Project Photo Gallery
          </h2>
        </div>

        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', background: '#000000' }}>
          <img
            src={galleryImages[currentSlideIndex]}
            alt={`Slide ${currentSlideIndex + 1}`}
            style={{ width: '100%', maxHeight: '550px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
          />

          {/* Carousel Left/Right Buttons */}
          <button 
            onClick={handlePrevSlide}
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '1rem', 
              transform: 'translateY(-50%)', 
              background: 'rgba(0,0,0,0.6)', 
              color: '#ffffff', 
              border: 'none', 
              width: '44px', 
              height: '44px', 
              borderRadius: '50%', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)'
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={handleNextSlide}
            style={{ 
              position: 'absolute', 
              top: '50%', 
              right: '1rem', 
              transform: 'translateY(-50%)', 
              background: 'rgba(0,0,0,0.6)', 
              color: '#ffffff', 
              border: 'none', 
              width: '44px', 
              height: '44px', 
              borderRadius: '50%', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)'
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Lightbox Expand Icon */}
          <button
            onClick={() => setModalMode('lightbox')}
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              background: 'rgba(0,0,0,0.7)',
              color: '#ffffff',
              border: 'none',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Maximize2 size={14} color="#9F783D" />
            <span>Full Screen View</span>
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              style={{
                width: currentSlideIndex === idx ? '24px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: currentSlideIndex === idx ? '#9F783D' : '#d1d5db',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* 5. LOCATION ADVANTAGE & INTERACTIVE MAP SECTION */}
      <div className="container" style={{ padding: '0 1.5rem 4rem 1.5rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9F783D', fontWeight: 700 }}>
            LOCATION & CONNECTIVITY
          </span>
          <h2 style={{ fontFamily: 'serif', fontSize: '2.25rem', color: '#111827', marginTop: '0.3rem' }}>
            Interactive Location Map & Specs
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>

          {/* Location Address & Distance Metrics */}
          <div className="reveal-left" style={{ background: '#f9fafb', padding: '2rem', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00433D', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                <MapPin size={20} color="#9F783D" />
                <span>Project Address</span>
              </div>
              <p style={{ color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Sy No 13, Indian Gas Godown Road, Channasandra, Kadugodi, Bengaluru, Karnataka – 560067
              </p>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#6b7280' }}>Tech Parks (ORR / Whitefield)</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>~ 10-15 Mins</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#6b7280' }}>Purple Line Metro Station</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>~ 5 Mins</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#6b7280' }}>Greenwood High / Inventure</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>~ 12 Mins</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#6b7280' }}>Kempegowda Int. Airport</span>
                  <span style={{ fontWeight: 700, color: '#111827' }}>~ 45 Mins</span>
                </div>
              </div>
            </div>

            <a
              className="btn-arrow-hover"
              href={property.id === 'reviva-trinity-lifescape' ? "https://www.google.com/maps/search/?api=1&query=12.840172,77.694883" : "https://maps.app.goo.gl/iwVLu2ZQct2h94TA8"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: '#00433D',
                color: '#ffffff',
                padding: '0.85rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginTop: '2rem'
              }}
            >
              <Navigation size={16} />
              <span>GET DIRECTIONS ON GOOGLE MAPS</span>
            </a>
          </div>

          <div className="reveal-right" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', height: '380px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <iframe
              title={`${property.name} Google Map`}
              width="100%"
              height="100%"
              src={
                property.id === 'reviva-trinity-lifescape'
                  ? "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4416.825383235035!2d77.69488307507419!3d12.840171987463268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDUwJzI0LjYiTiA3N8KwNDEnNTAuOSJF!5e1!3m2!1sen!2sin!4v1787563523177!5m2!1sen!2sin"
                  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4414.248520803587!2d77.76903107507673!3d12.986013387330626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0fd89043e97d%3A0xfbf0cc9a4e929e5c!2sReviva%20Vintage%20Valley!5e1!3m2!1sen!2sin!4v1787563205095!5m2!1sen!2sin"
              }
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

        </div>
      </div>



      {/* POPUP MODALS: BROCHURE, MASTER PLAN, FLOOR PLAN */}
      {modalMode && (
        <div className="modal-overlay" onClick={() => setModalMode(null)}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              color: '#111827',
              width: '100%',
              maxWidth: modalMode === 'lightbox' ? '950px' : '700px',
              padding: '2rem',
              borderRadius: '16px',
              position: 'relative',
              boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <button 
              onClick={() => setModalMode(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
            >
              <X size={24} />
            </button>

            {/* Modal Content: Brochure */}
            {modalMode === 'brochure' && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <FileText size={48} color="#9F783D" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontFamily: 'serif', fontSize: '1.75rem', color: '#111827', marginBottom: '0.5rem' }}>
                  {property.name} Official Digital Brochure
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Complete architectural overview, floor plan specs, pricing matrix, and eco-living amenities.
                </p>

                <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2rem', background: '#f9fafb', marginBottom: '2rem' }}>
                  <img className="flip-parallax" src={galleryImages[0]} alt="Brochure Cover" style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Reviva Digital Brochure (PDF format)</div>
                </div>

                <button
                  onClick={() => property.brochureUrl ? downloadFile(property.brochureUrl) : alert('Downloading official Reviva Digital Brochure...')}
                  style={{
                    background: '#9F783D',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.85rem 2.5rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  <Download size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  DOWNLOAD BROCHURE NOW (PDF)
                </button>
              </div>
            )}

            {/* Modal Content: Master Plan */}
            {modalMode === 'masterplan' && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <LayoutGrid size={48} color="#9F783D" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontFamily: 'serif', fontSize: '1.75rem', color: '#111827', marginBottom: '0.5rem' }}>
                  {property.name} Master Plan Diagram
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Site layout diagram detailing residential blocks, rooftop pool, gazebos, and green patio.
                </p>

                <div style={{ background: '#0a0d14', padding: '1.5rem', borderRadius: '12px', border: '1px solid #9F783D', marginBottom: '1.5rem' }}>
                  <svg width="100%" height="280" viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="500" height="280" fill="#0b0f17" rx="8" />
                    <rect x="15" y="15" width="470" height="250" stroke="#9E783C" strokeWidth="2" rx="4" />
                    
                    <rect x="40" y="40" width="130" height="90" fill="rgba(158, 120, 60, 0.3)" stroke="#9E783C" strokeWidth="2" />
                    <text x="65" y="90" fill="#ffffff" fontSize="13" fontWeight="700">TOWER A (2.5 BHK)</text>

                    <rect x="330" y="40" width="130" height="90" fill="rgba(158, 120, 60, 0.3)" stroke="#9E783C" strokeWidth="2" />
                    <text x="355" y="90" fill="#ffffff" fontSize="13" fontWeight="700">TOWER B (3 BHK)</text>

                    <circle cx="250" cy="140" r="60" fill="rgba(0, 67, 61, 0.4)" stroke="#00433D" strokeWidth="2" />
                    <text x="200" y="140" fill="#9F783D" fontSize="12" fontWeight="700">Rooftop Swimming Pool</text>
                    <text x="215" y="155" fill="#e2e8f0" fontSize="10">& Landscaped Patios</text>

                    <rect x="40" y="160" width="130" height="80" fill="rgba(255,255,255,0.06)" stroke="#64748b" strokeWidth="2" />
                    <text x="65" y="205" fill="#e2e8f0" fontSize="12" fontWeight="600">Outdoor Cafe & Gazebo</text>
                  </svg>
                </div>
              </div>
            )}

            {/* Modal Content: Floor Plan Selector */}
            {modalMode === 'floorplan' && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <Map size={48} color="#9F783D" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontFamily: 'serif', fontSize: '1.75rem', color: '#111827', marginBottom: '0.5rem' }}>
                  Architectural Floor Plans
                </h3>
                
                {/* BHK selector tabs */}
                <div style={{ display: 'inline-flex', gap: '0.5rem', background: '#f3f4f6', padding: '0.35rem', borderRadius: '50px', marginBottom: '1.5rem' }}>
                  {(['2.5 BHK', '3 BHK'] as const).map((bhkOption) => (
                    <button
                      key={bhkOption}
                      onClick={() => setActiveFloorPlanBhk(bhkOption)}
                      style={{
                        border: 'none',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '50px',
                        background: activeFloorPlanBhk === bhkOption ? '#9F783D' : 'transparent',
                        color: activeFloorPlanBhk === bhkOption ? '#ffffff' : '#374151',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {bhkOption} Layout
                    </button>
                  ))}
                </div>

                <div style={{ background: '#0a0d14', padding: '1.5rem', borderRadius: '12px', border: '1px stroke #9F783D', marginBottom: '1.5rem' }}>
                  <svg width="100%" height="220" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="220" fill="#0f172a" rx="6" />
                    <rect x="20" y="20" width="160" height="110" stroke="#9E783C" strokeWidth="2" fill="rgba(158, 120, 60, 0.1)" strokeDasharray="4 4" />
                    <text x="35" y="70" fill="#e2e8f0" fontSize="13" fontWeight="600">Master Bedroom ({activeFloorPlanBhk})</text>
                    <text x="45" y="90" fill="#94a3b8" fontSize="11">15'0" x 13'0"</text>

                    <rect x="200" y="20" width="180" height="110" stroke="#9E783C" strokeWidth="2" fill="rgba(158, 120, 60, 0.1)" strokeDasharray="4 4" />
                    <text x="220" y="70" fill="#e2e8f0" fontSize="13" fontWeight="600">Living / Dining Hall</text>
                    <text x="235" y="90" fill="#94a3b8" fontSize="11">20'0" x 15'0"</text>

                    <rect x="20" y="140" width="160" height="60" stroke="#9E783C" strokeWidth="2" fill="rgba(158, 120, 60, 0.2)" />
                    <text x="40" y="175" fill="#9E783C" fontSize="12" fontWeight="700">Landscaped Patio Balcony</text>
                  </svg>
                </div>
              </div>
            )}

            {/* Modal Content: Full Lightbox */}
            {modalMode === 'lightbox' && (
              <div>
                <img
                  src={galleryImages[currentSlideIndex]}
                  alt="Full view render"
                  style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '8px' }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ENQUIRY POPUP FORM MODAL (Exact match to revivaprojects.com Elementor Enquiry Popup) */}
      {isEnquiryOpen && (
        <div className="modal-overlay" onClick={() => setIsEnquiryOpen(false)}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              color: '#111827',
              width: '100%',
              maxWidth: '480px',
              padding: '2.5rem 2rem',
              borderRadius: '16px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
            }}
          >
            <button 
              onClick={() => setIsEnquiryOpen(false)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
            >
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9F783D', fontWeight: 700 }}>
                REVIVA PROJECTS
              </div>
              <h3 style={{ fontFamily: 'serif', fontSize: '1.75rem', color: '#00433D', marginTop: '0.25rem' }}>
                Enquire About {property.name}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Leave your details below and our team will connect with you shortly.
              </p>
            </div>

            {enquirySubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <Check size={28} color="#10b981" />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>Thank You!</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Your enquiry has been received. Our sales executive will call you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Full Name *</label>
                  <input type="text" className="form-input" style={{ background: '#f9fafb', color: '#111827', border: '1px solid #d1d5db' }} required placeholder="Enter your full name" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Phone Number *</label>
                  <input type="tel" className="form-input" style={{ background: '#f9fafb', color: '#111827', border: '1px solid #d1d5db' }} required placeholder="+91 Phone number" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Email Address *</label>
                  <input type="email" className="form-input" style={{ background: '#f9fafb', color: '#111827', border: '1px solid #d1d5db' }} required placeholder="name@example.com" />
                </div>

                <button 
                  type="submit" 
                  style={{
                    background: '#9F783D',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Send size={16} />
                  <span>SEND ENQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
