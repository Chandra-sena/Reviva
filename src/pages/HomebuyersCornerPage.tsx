import React from 'react';
import type { CityInfo } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HomebuyersCorner } from '../components/HomebuyersCorner';

interface HomebuyersCornerPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const HomebuyersCornerPage: React.FC<HomebuyersCornerPageProps> = ({ cityInfo, onNavigate, onOpenEnquiry: _onOpenEnquiry }) => {
  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ background: 'linear-gradient(180deg, rgba(18, 24, 38, 0.95) 0%, rgba(10, 14, 23, 1) 100%)', borderBottom: '1px solid var(--border-subtle)', padding: '3rem 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Homebuyers Corner' }]} onNavigate={onNavigate} />
          
          <span className="badge badge-accent" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            BUYER ASSISTANCE & GUIDANCE
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.75rem', color: 'var(--text-primary)' }}>
            Everything You Need to Know Before Buying
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: '700px', fontSize: '1.1rem' }}>
            Comprehensive guides on home loans, legal documentation, RERA regulations, NRI property investments, and possession handover processes in {cityInfo.cityName}.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        <HomebuyersCorner />
      </div>
    </div>
  );
};
