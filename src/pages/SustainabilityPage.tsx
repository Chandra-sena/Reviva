import React, { useState } from 'react';
import type { CityInfo } from '../types';

interface SustainabilityPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

const TABS = [
  'SUSTAINABILITY',
  'CORPORATE SOCIAL RESPONSIBILITY',
  'QUALITY, EHS COMMITMENT',
  'SUSTAINABILITY REPORT',
  'CSR TESTIMONIALS',
  'CSR FILM',
  'ENVIRONMENTAL COMPLIANCE REPORTS',
];

export const SustainabilityPage: React.FC<SustainabilityPageProps> = () => {
  const [activeTab, setActiveTab] = useState<string>('SUSTAINABILITY');

  return (
    <div style={{ background: '#ffffff', color: '#111827', minHeight: '100vh' }}>
      
      {/* 1. Full-width Top Hero Banner Matching Screenshot 3 */}
      <section 
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%), url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', 
            fontWeight: 600, 
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          SUSTAINABILITY
        </h1>
      </section>

      {/* 2. Sub-navigation Tabs Matching Screenshot 3 */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1.5rem', whiteSpace: 'nowrap' }}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '1.25rem 0',
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 800 : 600,
                    letterSpacing: '1px',
                    color: isActive ? '#0f172a' : '#64748b',
                    borderBottom: isActive ? '3px solid #0f172a' : '3px solid transparent',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Content Area Matching Screenshot 3 */}
      <div className="container" style={{ padding: '4rem 1.5rem 6rem 1.5rem', maxWidth: '1000px' }}>
        
        {activeTab === 'SUSTAINABILITY' && (
          <div>
            <h2 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.75rem', 
                fontWeight: 700, 
                color: '#0f172a',
                textAlign: 'center',
                letterSpacing: '2px',
                marginBottom: '2.5rem',
                textTransform: 'uppercase',
              }}
            >
              SUSTAINABILITY
            </h2>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', marginBottom: '2rem' }}>
              In all spheres of activity that we undertake, we strive to uphold uncompromising business ethics by building homes and communities that are successful and sustainable in every sense.
            </p>

            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' }}>
              Our governance philosophy and strategy give primacy to the following factors:
            </p>

            <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#475569', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                the long term satisfaction of our valued customers, who have invested their substantial savings in the dream homes that we build
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                growth opportunities for our highly skilled and committed employees and workforce
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                sustainable environmental protection, rain water harvesting, and zero-discharge sewage recycling systems across all projects
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                in-house backward integrated quality control for zero-defect architectural execution
              </li>
            </ul>
          </div>
        )}

        {activeTab !== 'SUSTAINABILITY' && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {activeTab}
            </h2>
            <p style={{ color: '#64748b', marginTop: '1rem', lineHeight: 1.8 }}>
              Reviva Projects is committed to transparent ESG disclosures and environmental compliance across all operational regions. Detailed audits and downloadable reports are maintained under regulatory guidelines.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
