import React, { useState } from 'react';
import type { CityInfo } from '../types';
import { FileText, Download, Check, TrendingUp } from 'lucide-react';

interface InvestorRelationsPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const InvestorRelationsPage: React.FC<InvestorRelationsPageProps> = () => {
  const [downloadedReport, setDownloadedReport] = useState<string | null>(null);

  const reports = [
    { title: 'Annual Report FY 2025-26', size: '12.4 MB', type: 'PDF' },
    { title: 'Q3 Financial Performance Presentation', size: '4.8 MB', type: 'PDF' },
    { title: 'Shareholding Pattern (December 2025)', size: '1.2 MB', type: 'PDF' },
    { title: 'Corporate Governance Report', size: '2.9 MB', type: 'PDF' },
  ];

  const handleDownload = (name: string) => {
    setDownloadedReport(name);
    setTimeout(() => setDownloadedReport(null), 3000);
  };

  return (
    <div style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* 1. Hero Banner */}
      <section 
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          NSE: REVIVA (Illustrative Ticker)
        </span>
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 400, 
            letterSpacing: '1px',
          }}
        >
          Investor Relations
        </h1>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        
        {/* Financial Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {[
            { label: 'Stock Price (NSE)', val: '₹ 1,842.50', sub: '+3.4% Today' },
            { label: 'Market Cap', val: '₹ 17,450 Cr', sub: 'Large Cap Realty' },
            { label: 'Q3 Booking Value', val: '₹ 1,850 Cr', sub: 'Record High' },
            { label: 'Credit Rating', val: 'CRISIL A+ / Positive', sub: 'Highest Discipline' },
          ].map((stat, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: '1.75rem', textAlign: 'center', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#9E783C', margin: '0.5rem 0' }}>
                {stat.val}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                <TrendingUp size={14} />
                <span>{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Financial Filings Downloads */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '2rem' }}>
          Financial Filings & Annual Reports
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {reports.map((rep, idx) => (
            <div key={idx} style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FileText size={32} color="#9E783C" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{rep.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>{rep.type} • {rep.size}</div>
                </div>
              </div>
              
              <button 
                onClick={() => handleDownload(rep.title)}
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.6rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                {downloadedReport === rep.title ? <Check size={16} color="#9E783C" /> : <Download size={16} />}
                <span>{downloadedReport === rep.title ? 'Downloaded' : 'PDF'}</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
