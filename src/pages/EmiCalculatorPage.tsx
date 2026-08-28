import React from 'react';
import type { CityInfo } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EmiCalculator } from '../components/EmiCalculator';

interface EmiCalculatorPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const EmiCalculatorPage: React.FC<EmiCalculatorPageProps> = ({ cityInfo: _cityInfo, onNavigate }) => {
  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ background: 'linear-gradient(180deg, rgba(18, 24, 38, 0.95) 0%, rgba(10, 14, 23, 1) 100%)', borderBottom: '1px solid var(--border-subtle)', padding: '3rem 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home Loan EMI Calculator' }]} onNavigate={onNavigate} />
          
          <span className="badge badge-accent" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            FINANCIAL PLANNING SUITE
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.75rem', color: 'var(--text-primary)' }}>
            Mortgage & EMI Estimator
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: '700px', fontSize: '1.1rem' }}>
            Plan your home investment with accurate interest rate calculations, tenure breakdowns, and instant principal vs interest distribution.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        <EmiCalculator />
      </div>
    </div>
  );
};
