import React from 'react';
import type { CityInfo } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface LegalPageProps {
  type: 'privacy-policy' | 'terms-and-conditions' | 'disclaimer';
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, cityInfo, onNavigate }) => {
  const titles = {
    'privacy-policy': 'Privacy Policy',
    'terms-and-conditions': 'Terms & Conditions',
    'disclaimer': 'RERA & Legal Disclaimer',
  };

  const title = titles[type];

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ background: 'linear-gradient(180deg, rgba(18, 24, 38, 0.95) 0%, rgba(10, 14, 23, 1) 100%)', borderBottom: '1px solid var(--border-subtle)', padding: '3rem 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: title }]} onNavigate={onNavigate} />
          
          <span className="badge badge-accent" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            LEGAL COMPLIANCE & TRANSPARENCY
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.75rem', color: 'var(--text-primary)' }}>
            {title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: '700px', fontSize: '1.1rem' }}>
            Last Updated: January 2026. Official statutory disclosures and legal policies for {cityInfo.developerName} operations.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3rem', maxWidth: '850px' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '16px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          
          {type === 'privacy-policy' && (
            <>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>1. Data Collection & Privacy Standards</h3>
              <p>
                Reviva Projects and its subsidiaries respect your privacy and are committed to protecting personal data collected through our official portal. Information collected via site visit registrations or brochure requests is strictly used for communication regarding property availability and site visit logistics.
              </p>

              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Data Protection & Security</h3>
              <p>
                We maintain SSL 256-bit encryption and strict organizational protocols to safeguard your personal credentials. Your phone number and email will never be sold or rented to third-party telemarketers.
              </p>
            </>
          )}

          {type === 'terms-and-conditions' && (
            <>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>1. Website Usage Terms</h3>
              <p>
                By accessing this portal, you agree to comply with all terms governing project inquiries, floor plan viewings, and digital brochure downloads. All visual renderings, 3D flythrough videos, and brand marks are intellectual property of Reviva Projects.
              </p>

              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Price & Availability Disclaimers</h3>
              <p>
                Prices, unit availability, and specifications displayed are indicative and subject to change based on real-time allotment and statutory tax revisions.
              </p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>1. RERA Statutory Disclosure</h3>
              <p>
                All residential and commercial projects listed on this website are registered under the respective State Real Estate Regulatory Authority (RERA) acts. Registration numbers, floor plan layouts, approved sanction plans, and projected completion dates are disclosed per statutory requirements.
              </p>

              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Architectural Renderings</h3>
              <p>
                Images, computerized renders, and artistic impression visuals shown on project pages are for illustrative purposes only and do not form part of any legal agreement or binding offer.
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
