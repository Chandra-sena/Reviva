import React, { useState } from 'react';
import type { CityInfo } from '../types';
import { Calendar, Download, ExternalLink, Check } from 'lucide-react';

interface MediaCentrePageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const MediaCentrePage: React.FC<MediaCentrePageProps> = () => {
  const [pressDownloaded, setPressDownloaded] = useState(false);

  const mediaItems = [
    {
      title: 'Reviva Reports Record Sales Booking of ₹1,850 Cr in Q3',
      date: 'January 15, 2026',
      cat: 'Financial Announcement',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
      summary: 'Reviva Projects achieves peak quarterly performance driven by strong demand across Bengaluru, NCR, and GIFT City developments.'
    },
    {
      title: 'Unveiling Reviva OneWorld: Next-Gen Integrated Community in Greater Whitefield',
      date: 'December 10, 2025',
      cat: 'Project Launch',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
      summary: 'A mega integrated community featuring 80% open green space, world-class clubhouses, and eco-conscious precision.'
    },
    {
      title: 'Reviva Wins "Best Eco-Conscious Developer of the Year" at National Real Estate Awards',
      date: 'November 22, 2025',
      cat: 'Awards & Recognition',
      image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&q=80',
      summary: 'Acknowledging decades of uncompromising quality, sustainable design, and zero-defect customer handovers.'
    },
    {
      title: 'Reviva Expands Eco-Friendly Precast Construction Footprint in Bengaluru & NCR',
      date: 'October 05, 2025',
      cat: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80',
      summary: 'Pioneering sustainable precast technology reducing carbon footprint and accelerating construction delivery timelines.'
    }
  ];

  return (
    <div style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* 1. Hero Banner */}
      <section 
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          PRESS & NEWSROOM
        </span>
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 400, 
            letterSpacing: '1px',
          }}
        >
          Media Centre
        </h1>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>
              Official Press Releases & Coverage
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.3rem' }}>
              Latest corporate updates, financial statements, and editorial features.
            </p>
          </div>

          <button 
            onClick={() => { setPressDownloaded(true); setTimeout(() => setPressDownloaded(false), 3000); }} 
            style={{
              padding: '0.75rem 1.25rem',
              background: '#9E783C',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {pressDownloaded ? <Check size={16} /> : <Download size={16} />}
            <span>{pressDownloaded ? 'Press Kit Downloaded!' : 'DOWNLOAD MEDIA PRESS KIT'}</span>
          </button>
        </div>

        {/* Structured Photo + Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {mediaItems.map((news, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ background: '#f1f5f9', color: '#9E783C', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                      {news.cat}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} />
                      <span>{news.date}</span>
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {news.title}
                  </h3>

                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {news.summary}
                  </p>
                </div>
              </div>

              <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Press Release</span>
                <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
                  <span>Read Article</span>
                  <ExternalLink size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
