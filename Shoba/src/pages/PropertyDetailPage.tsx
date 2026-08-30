import React, { useState, useEffect } from 'react';
import type { Property, CityInfo } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TrinityLifescapeScrollHero } from '../components/TrinityLifescapeScrollHero';
import { VintageValleyScrollHero } from '../components/VintageValleyScrollHero';
import {
  MapPin, Download, Share2, ArrowLeft, Check,
  FileText, LayoutGrid, Map, X, Send, Sparkles, Navigation, ChevronLeft, ChevronRight
} from 'lucide-react';

interface PropertyDetailPageProps {
  propertyId: string;
  properties: Property[];
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onBookVisit: (property: Property) => void;
}

const RESOURCE_LABELS: Record<'brochure' | 'masterplan' | 'floorplan', string> = {
  brochure: 'Brochure',
  masterplan: 'Master Plan',
  floorplan: 'Floor Plan',
};

interface GallerySlideInfo {
  tag: string;
  title: string;
  description: string;
  highlights: { label: string; value: string }[];
}

const PROPERTY_GALLERY_INFO: Record<string, GallerySlideInfo[]> = {
  'vintage-valley': [
    {
      tag: 'MASTER ELEVATION',
      title: 'The Grace of Classic Living',
      description: 'Vintage Valley seamlessly merges classical charm with modern design, offering a refined and sophisticated living experience in Channasandra, Whitefield.',
      highlights: [],
    },
    {
      tag: 'ROOFTOP RETREAT',
      title: 'Rooftop Pool & Lounge',
      description: 'A spacious rooftop retreat complete with a swimming pool, landscaped patios, an outdoor café, gazebos, and cozy seating nooks — crafted for relaxation and connection.',
      highlights: [],
    },
    {
      tag: 'SURROUNDED BY GREEN',
      title: "Whitefield's Nature-Wrapped Address",
      description: 'Set on Indian Gas Godown Road in Channasandra, Kadugodi, with open farmland and mature tree cover at the doorstep, keeping residents close to nature yet minutes from Whitefield.',
      highlights: [],
    },
    {
      tag: 'CLASSICAL FAÇADE',
      title: 'Timeless Elegance, After Dark',
      description: 'Vintage Valley reimagines timeless elegance with a contemporary touch, inspired by the rich architectural legacy of classical forms.',
      highlights: [
        { label: 'Configurations', value: '2.5 & 3 BHK Homes' },
        { label: 'Super Built-up', value: '1280 - 1750 Sq. Ft.' },
        { label: 'Location', value: 'Channasandra, Whitefield' },
      ],
    },
  ],
  'reviva-trinity-lifescape': [
    {
      tag: 'ICONIC TOWER ELEVATION',
      title: 'Residences Overlooking Tree Corridors',
      description: 'Every home at Reviva Trinity Lifescape is positioned to overlook landscaped courts and lush tree corridors, ensuring an intimate visual connection with nature.',
      highlights: [
        { label: 'Development', value: 'High-Rise Eco Towers' },
        { label: 'Unit Sizes', value: '1100 - 2900 Sq. Ft.' },
        { label: 'Bedrooms', value: '2, 3 & 4 BHK Luxury' },
      ],
    },
    {
      tag: 'SUSTAINABLE FAÇADE',
      title: 'Aerodynamic & Biophilic Architecture',
      description: 'Architectural fins and lush balcony planters reduce solar heat gain while creating an inviting microclimate for residents throughout the year.',
      highlights: [
        { label: 'Green Envelope', value: 'Vertical Gardens' },
        { label: 'Daylight', value: 'Optimal Sun Penetration' },
        { label: 'Status', value: 'Yet to be Launched' },
      ],
    },
    {
      tag: 'WORLD-CLASS AMENITIES',
      title: 'Modern Clubhouse & Grand Pool',
      description: 'Features a contemporary clubhouse, wellness gymnasium, Olympic-length pool, children’s play courts, and 24/7 security surveillance.',
      highlights: [
        { label: 'Clubhouse', value: 'Multi-level Lifestyle' },
        { label: 'Security', value: '24/7 Monitored Access' },
        { label: 'Possession', value: 'Dec 2028' },
      ],
    },
  ],
  'reviva-farms': [
    {
      tag: 'SELF-SUSTAINING LIFESTYLES',
      title: 'Eco Farm Houses & Luxury Plots',
      description: 'Sprawling farm houses and residential plots designed around organic farming, private orchards, and solar-powered independent infrastructure.',
      highlights: [
        { label: 'Plot Areas', value: '2400 - 5000 Sq. Ft.' },
        { label: 'Typology', value: 'Villas & Farm Plots' },
        { label: 'Status', value: 'Coming Soon' },
      ],
    },
    {
      tag: 'URBAN FARMING',
      title: 'Harvest Your Own Organic Living',
      description: 'Dedicated farming plots with rich fertile soil, drip irrigation, and community agricultural experts supporting self-sustaining harvests.',
      highlights: [
        { label: 'Living Concept', value: 'Farm-to-Table' },
        { label: 'Water System', value: 'Dedicated Harvesting' },
        { label: 'Suburbs', value: 'Off Bengaluru' },
      ],
    },
  ],
};

const getSlideInfo = (propId: string, idx: number, prop: Property): GallerySlideInfo => {
  const propInfo = PROPERTY_GALLERY_INFO[propId];
  if (propInfo && propInfo[idx]) {
    return propInfo[idx];
  }
  const defaultTags = ['PROJECT ARCHITECTURE', 'LIFESTYLE & LEISURE', 'SUSTAINABILITY & LIVING', 'INTERIOR REFINEMENT', 'COMMUNITY SPACES'];
  const defaultTitles = [
    `${prop.name} Architectural Elevation`,
    'Curated World-Class Amenities',
    'Eco-Conscious Sustainable Living',
    'Spacious & Sunlit Living Spaces',
    'Community & Nature Connections',
  ];
  const defaultDescs = [
    `Thoughtfully designed with focus on sustainability, ventilation, and connection with nature in ${prop.location}.`,
    `Premium lifestyle amenities crafted for relaxation, fitness, and family leisure.`,
    `Sustainable architecture incorporating green infrastructure, natural lighting, and open spaces.`,
    `Refined residence layouts with expansive floor plans ranging from ${prop.areaSqFt || '1100 - 2900 Sq. Ft.'}.`,
    `Vibrant community atmosphere nestled amidst verdant landscaped corridors.`,
  ];
  return {
    tag: defaultTags[idx % defaultTags.length],
    title: defaultTitles[idx % defaultTitles.length],
    description: prop.description || defaultDescs[idx % defaultDescs.length],
    highlights: [
      { label: 'Project', value: prop.name },
      { label: 'Location', value: prop.location || 'Bengaluru' },
      { label: 'Possession', value: prop.possessionDate || 'Coming Soon' },
    ],
  };
};

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
  const [copiedLink, setCopiedLink] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Modal states for Master Plan, Floor Plan & Brochure
  const [modalMode, setModalMode] = useState<'brochure' | 'masterplan' | 'floorplan' | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [pendingResource, setPendingResource] = useState<'brochure' | 'masterplan' | 'floorplan' | null>(null);

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
  ].filter((src, idx, arr) => arr.indexOf(src) === idx);

  const heroImage = galleryImages[2] ?? galleryImages[0];

  // Warm the browser cache for every gallery image so prev/next feels instant instead of re-fetching on click
  useEffect(() => {
    galleryImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property.id]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const downloadFile = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'download.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResourceClick = (mode: 'brochure' | 'masterplan' | 'floorplan') => {
    setPendingResource(mode);
    setIsEnquiryOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
    const targetResource = pendingResource;
    setTimeout(() => {
      setEnquirySubmitted(false);
      setIsEnquiryOpen(false);
      if (targetResource) {
        const url = targetResource === 'brochure'
          ? (property.brochureUrl || '/media/documents/reviva-vintage-valley-digital-brochure.pdf')
          : targetResource === 'masterplan'
          ? (property.masterPlanUrl || '/media/documents/masterplan-my.pdf')
          : (property.floorPlanUrl || '/media/documents/floorplan-my.pdf');

        if (url) {
          downloadFile(url);
        }
        setPendingResource(null);
      }
    }, 1800);
  };

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '4rem' }}>

      {/* 1. HERO SECTION: CINEMATIC SCROLL HERO FOR TRINITY LIFESCAPE / VINTAGE VALLEY OR STANDARD HERO */}
      {property.id === 'reviva-trinity-lifescape' ? (
        <TrinityLifescapeScrollHero
          property={property}
          onNavigate={onNavigate}
          onEnquireClick={() => setIsEnquiryOpen(true)}
        />
      ) : property.id === 'vintage-valley' ? (
        <VintageValleyScrollHero
          property={property}
          onNavigate={onNavigate}
          onEnquireClick={() => setIsEnquiryOpen(true)}
        />
      ) : (
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '82vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: '#ffffff',
            padding: '100px 1.5rem 3rem 1.5rem',
            overflow: 'hidden',
            background: '#090d14'
          }}
        >
          {/* Ambient Blur Layer + Full Crisp Image Layer — crossfades across the project's images */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(180deg, rgba(9,13,20,0.25) 0%, rgba(9,13,20,0.65) 100%), url('${heroImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

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
      )}

      {/* 2. OVERVIEW & BRAND LOGO SECTION (Reviva Project Overview & Leaf Logo Branding) */}
      {property.id !== 'reviva-farms' && (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left: Brand Logo Graphic Box */}
          {property.id === 'vintage-valley' ? (
            <div className="reveal-left card-tilt" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0, 67, 61, 0.25)' }}>
              <img
                src="/media/images/reviva-vintage-valley-brand-cover.jpg"
                alt="Reviva Vintage Valley brand cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ) : property.id === 'reviva-trinity-lifescape' ? (
            <div className="reveal-left card-tilt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0, 67, 61, 0.25)' }}>
              <img
                src="/media/images/reviva-trinity-lifescape-2.jpg"
                alt="Reviva Trinity Lifescape"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <img
                src="/media/images/reviva-trinity-lifescape-3.jpg"
                alt="Reviva Trinity Lifescape"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ) : (
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
          )}

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
      )}

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

      {/* 4. PROJECT PHOTO GALLERY */}
      <div className="container" style={{ padding: property.id === 'reviva-farms' ? '4rem 1.5rem 4rem 1.5rem' : '0 1.5rem 4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9F783D', fontWeight: 700 }}>
            ARCHITECTURE & RENDERS
          </span>
          <h2 style={{ fontFamily: 'serif', fontSize: '2.25rem', color: '#111827', marginTop: '0.3rem' }}>
            Project Photo Gallery
          </h2>
        </div>

        {/* Split panel: full image (left, never cropped) + curated slide details (right) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            background: '#0a0f14',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(159, 120, 61, 0.3)',
            boxShadow: '0 20px 48px rgba(0,0,0,0.18)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
          }}
        >
          {/* Full image, sized to its own natural aspect ratio — never cropped, never letterboxed */}
          <div style={{ position: 'relative', background: '#0a0f14', alignSelf: 'start' }}>
            <img
              src={galleryImages[currentSlideIndex]}
              alt={`${property.name} — view ${currentSlideIndex + 1}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevSlide}
                  aria-label="Previous image"
                  className="btn-magnetic"
                  style={{
                    position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.75)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)',
                    width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', zIndex: 20,
                  }}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={handleNextSlide}
                  aria-label="Next image"
                  className="btn-magnetic"
                  style={{
                    position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.75)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.25)',
                    width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', zIndex: 20,
                  }}
                >
                  <ChevronRight size={22} />
                </button>
                <div
                  style={{
                    position: 'absolute', bottom: '1rem', left: '1rem',
                    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(159, 120, 61, 0.4)', color: '#e5b869',
                    fontFamily: 'var(--font-accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.5px',
                    padding: '0.35rem 0.85rem', borderRadius: '50px', zIndex: 10, backdropFilter: 'blur(6px)',
                  }}
                >
                  {currentSlideIndex + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>

          {/* Curated slide details */}
          <div
            style={{
              position: 'relative', zIndex: 3, padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between', background: 'linear-gradient(160deg, rgba(15, 23, 34, 0.96) 0%, rgba(9, 14, 20, 0.98) 100%)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block', fontFamily: 'var(--font-accent)', fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase', color: '#e5b869', background: 'rgba(159, 120, 61, 0.15)',
                  border: '1px solid rgba(159, 120, 61, 0.35)', padding: '0.3rem 0.75rem', borderRadius: '4px', marginBottom: '1rem',
                }}
              >
                {getSlideInfo(property.id, currentSlideIndex, property).tag}
              </span>

              <h3
                key={`title-${currentSlideIndex}`}
                className="fade-in-up"
                style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 2vw, 1.85rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.3, marginBottom: '1rem' }}
              >
                {getSlideInfo(property.id, currentSlideIndex, property).title}
              </h3>

              <p
                key={`desc-${currentSlideIndex}`}
                className="fade-in-up"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.75, marginBottom: '1.75rem' }}
              >
                {getSlideInfo(property.id, currentSlideIndex, property).description}
              </p>

              {getSlideInfo(property.id, currentSlideIndex, property).highlights.length > 0 && (
                <div
                  key={`chips-${currentSlideIndex}`}
                  className="fade-in-up"
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}
                >
                  {getSlideInfo(property.id, currentSlideIndex, property).highlights.map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(159, 120, 61, 0.25)', padding: '0.75rem 0.85rem', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#e5b869' }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="btn-primary"
                style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.5px', borderRadius: '6px', cursor: 'pointer', background: '#9F783D', color: '#ffffff', border: 'none' }}
              >
                ENQUIRE NOW
              </button>
              <button
                onClick={() => handleResourceClick('brochure')}
                className="btn-outline"
                style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.5px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #9F783D', color: '#e5b869', background: 'transparent' }}
              >
                BROCHURE
              </button>
            </div>
          </div>
        </div>

        {galleryImages.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
                style={{
                  width: currentSlideIndex === idx ? '24px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  background: currentSlideIndex === idx ? '#9F783D' : '#d1d5db',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 5. LOCATION ADVANTAGE & INTERACTIVE MAP SECTION */}
      {property.id !== 'reviva-farms' && (
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
                {property.id === 'reviva-trinity-lifescape' && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: '#6b7280' }}>Huskur Metro Station</span>
                      <span style={{ fontWeight: 700, color: '#111827' }}>2.5 km</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: '#6b7280' }}>Hebbagodi Metro Station</span>
                      <span style={{ fontWeight: 700, color: '#111827' }}>3 km</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <a
              className="btn-arrow-hover"
              href={property.id === 'reviva-trinity-lifescape' ? "https://www.google.com/maps/search/?api=1&query=12.84013,77.69746" : "https://maps.app.goo.gl/iwVLu2ZQct2h94TA8"}
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
                  ? "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5328.556283578539!2d77.69745999999999!3d12.840130000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDUwJzI0LjUiTiA3N8KwNDEnNTAuOSJF!5e1!3m2!1sen!2sin!4v1787916025801!5m2!1sen!2sin"
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
      )}

      {/* POPUP MODALS: BROCHURE, MASTER PLAN, FLOOR PLAN */}
      {modalMode && (
        <div className="modal-overlay" onClick={() => setModalMode(null)}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              color: '#111827',
              width: '95%',
              maxWidth: modalMode === 'masterplan' || modalMode === 'floorplan' ? '1020px' : '700px',
              padding: modalMode === 'masterplan' || modalMode === 'floorplan' ? '1.5rem' : '2rem',
              borderRadius: '16px',
              position: 'relative',
              boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
              maxHeight: '92vh',
              overflowY: 'auto'
            }}
          >
            <button 
              onClick={() => setModalMode(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#374151', zIndex: 10 }}
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
                  <img className="flip-parallax" src={galleryImages[0]} alt="Brochure Cover" style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', objectPosition: property.id === 'reviva-trinity-lifescape' ? 'top' : 'center', borderRadius: '8px', marginBottom: '1rem' }} />
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

            {/* Modal Content: Master Plan PDF Viewer */}
            {modalMode === 'masterplan' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: '2.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9F783D', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                      <LayoutGrid size={16} />
                      <span>{property.name}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 700, color: '#111827', marginTop: '0.2rem' }}>
                      Official Master Plan
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <a
                      href={property.masterPlanUrl || '/media/documents/masterplan-my.pdf'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem',
                        borderRadius: '6px',
                        border: '1px solid #9F783D',
                        color: '#9F783D',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontWeight: 600
                      }}
                    >
                      <span>Open in New Tab</span>
                    </a>

                    <button
                      onClick={() => downloadFile(property.masterPlanUrl || '/media/documents/masterplan-my.pdf')}
                      className="btn-primary"
                      style={{
                        padding: '0.5rem 1.15rem',
                        fontSize: '0.8rem',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontWeight: 600
                      }}
                    >
                      <Download size={15} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                <div style={{ width: '100%', height: '65vh', minHeight: '480px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#0a0d14' }}>
                  <iframe
                    src={`${property.masterPlanUrl || '/media/documents/masterplan-my.pdf'}#toolbar=1&navpanes=0`}
                    title={`${property.name} Master Plan`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* Modal Content: Floor Plan PDF Viewer */}
            {modalMode === 'floorplan' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: '2.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9F783D', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                      <Map size={16} />
                      <span>{property.name}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 700, color: '#111827', marginTop: '0.2rem' }}>
                      Architectural Floor Plans (Block A, B, C)
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <a
                      href={property.floorPlanUrl || '/media/documents/floorplan-my.pdf'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem',
                        borderRadius: '6px',
                        border: '1px solid #9F783D',
                        color: '#9F783D',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontWeight: 600
                      }}
                    >
                      <span>Open in New Tab</span>
                    </a>

                    <button
                      onClick={() => downloadFile(property.floorPlanUrl || '/media/documents/floorplan-my.pdf')}
                      className="btn-primary"
                      style={{
                        padding: '0.5rem 1.15rem',
                        fontSize: '0.8rem',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontWeight: 600
                      }}
                    >
                      <Download size={15} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                <div style={{ width: '100%', height: '65vh', minHeight: '480px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#0a0d14' }}>
                  <iframe
                    src={`${property.floorPlanUrl || '/media/documents/floorplan-my.pdf'}#toolbar=1&navpanes=0`}
                    title={`${property.name} Floor Plan`}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ENQUIRY POPUP FORM MODAL (Exact match to revivaprojects.com Elementor Enquiry Popup) */}
      {isEnquiryOpen && (
        <div className="modal-overlay" onClick={() => { setIsEnquiryOpen(false); setPendingResource(null); }}>
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
              onClick={() => { setIsEnquiryOpen(false); setPendingResource(null); }}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
            >
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9F783D', fontWeight: 700 }}>
                REVIVA PROJECTS
              </div>
              <h3 style={{ fontFamily: 'serif', fontSize: '1.75rem', color: '#00433D', marginTop: '0.25rem' }}>
                {pendingResource ? `Get the ${RESOURCE_LABELS[pendingResource]}` : `Enquire About ${property.name}`}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {pendingResource
                  ? `Fill this form to download the ${RESOURCE_LABELS[pendingResource]} for ${property.name}.`
                  : 'Leave your details below and our team will connect with you shortly.'}
              </p>
            </div>

            {enquirySubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <Check size={28} color="#10b981" />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>Thank You!</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {pendingResource
                    ? `Your ${RESOURCE_LABELS[pendingResource]} download will start shortly. Our sales executive will also call you soon.`
                    : 'Your enquiry has been received. Our sales executive will call you soon.'}
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
                  <span>{pendingResource ? `DOWNLOAD ${RESOURCE_LABELS[pendingResource].toUpperCase()}` : 'SEND ENQUIRY'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
