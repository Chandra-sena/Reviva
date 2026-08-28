import { useState } from 'react';
import { X, Briefcase, Newspaper, Leaf, TrendingUp, Award, Users, CheckCircle2, ShieldCheck, MapPin, Send } from 'lucide-react';
import type { CityInfo } from '../types';

interface PageViewsModalProps {
  pageId: string;
  cityName: string;
  cityInfo: CityInfo;
  onClose: () => void;
  onOpenEnquiry: () => void;
}

export const PageViewsModal: React.FC<PageViewsModalProps> = ({
  pageId,
  cityName,
  cityInfo,
  onClose,
  onOpenEnquiry,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* 1. CAREERS PAGE */}
        {pageId === 'careers' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Briefcase size={22} color="var(--primary-accent)" />
              <span className="badge-accent">Careers at Reviva</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Build Your Career With India’s Most Trusted Brand
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              At Reviva, passion meets purpose. We empower engineers, architects, interior designers, and real estate professionals to build iconic urban landmarks.
            </p>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Open Positions ({cityName} & Pan-India)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { title: 'Senior Project Engineer (Pre-Cast & Structural)', dept: 'Civil Engineering', loc: `${cityName}` },
                { title: 'Manager - Luxury Residential Sales', dept: 'Sales & Marketing', loc: `${cityName}` },
                { title: 'Senior Architectural Designer', dept: 'Design Studio', loc: 'Corporate HQ' },
                { title: 'Assistant Manager - Quality Assurance (QA/QC)', dept: 'Quality Control', loc: `${cityName}` },
              ].map((job, idx) => (
                <div key={idx} style={{ background: 'rgba(18, 24, 36, 0.7)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{job.title}</h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{job.dept} • {job.loc}</div>
                  </div>
                  <button onClick={() => alert(`Application opened for ${job.title}`)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                    APPLY NOW
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. MEDIA CENTRE PAGE */}
        {pageId === 'media-centre' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Newspaper size={22} color="var(--primary-accent)" />
              <span className="badge-accent">Media & Press Room</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Reviva In The News
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Stay updated with latest corporate press releases, project launch announcements, and financial news.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Reviva Reports Record Sales Revenue of ₹ 1,450 Cr in Q1 2026', date: 'Aug 2026' },
                { title: 'Unveiling Reviva OneWorld: Greater Whitefield’s Premier Township Launch', date: 'Jul 2026' },
                { title: 'Reviva Recognized as Top Eco-Conscious Developer at National Real Estate Awards', date: 'Jun 2026' },
              ].map((news, idx) => (
                <div key={idx} style={{ background: 'rgba(18, 24, 36, 0.7)', padding: '1.5rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-accent)', fontWeight: 700, marginBottom: '0.5rem' }}>{news.date}</div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.75rem' }}>{news.title}</h4>
                  <button onClick={() => alert(`Opening press release: ${news.title}`)} className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                    READ PRESS RELEASE
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SUSTAINABILITY PAGE */}
        {pageId === 'sustainability' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Leaf size={22} color="var(--primary-accent)" />
              <span className="badge-accent">ESG & Sustainability</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Building Greener Futures & Sustainable Ecosystems
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Reviva incorporates IGBC Platinum green building certifications, zero-waste water recycling, and renewable solar microgrids into every township design.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {[
                { title: '100% Rainwater Harvesting', desc: 'Pre-installed percolation wells and recharge pits across all 80+ acres of residential townships.' },
                { title: 'Solar Rooftop Grid', desc: 'Clean solar energy powering common lighting, elevators, and clubhouse amenities.' },
                { title: 'In-House Waste Management', desc: 'Organic waste converters transforming 100% organic waste into rich landscaping manure.' },
                { title: 'Low-EM structure & Native Flora', desc: 'Over 80% open landscaped greens planted with indigenous trees and butterfly gardens.' },
              ].map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(18, 24, 36, 0.7)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <CheckCircle2 size={24} color="var(--primary-accent)" style={{ marginBottom: '0.5rem' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. INVESTOR RELATIONS PAGE */}
        {pageId === 'investor-relations' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <TrendingUp size={22} color="var(--primary-accent)" />
              <span className="badge-accent">Investor Relations</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Financial Governance & Shareholder Value
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Reviva Projects (NSE: REVIVA — Illustrative Ticker) is committed to stringent corporate governance, transparent financial reporting, and consistent shareholder returns.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(18, 24, 36, 0.7)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Market Cap</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-accent)' }}>₹ 18,500+ Cr</div>
              </div>
              <div style={{ background: 'rgba(18, 24, 36, 0.7)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Debt-to-Equity Ratio</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>0.48 (Healthy)</div>
              </div>
              <div style={{ background: 'rgba(18, 24, 36, 0.7)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Credit Rating</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399' }}>ICRA A+ (Stable)</div>
              </div>
            </div>
          </div>
        )}

        {/* 5. REVIVA PRIVILEGE PAGE */}
        {pageId === 'reviva-privilege' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Award size={22} color="var(--primary-accent)" />
              <span className="badge-accent">VIP Loyalty Rewards</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Reviva Privilege Membership Program
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              An exclusive referral and rewards program for Reviva homeowners. Earn up to 2% referral rewards on every successful home booking by friends and family.
            </p>

            <div style={{ background: 'rgba(18, 24, 36, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-accent)', marginBottom: '1rem' }}>Enroll in Reviva Privilege</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Enter your Reviva Unit Number & registered mobile to claim your VIP membership card.
              </p>
              <button onClick={onOpenEnquiry} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
                CLAIM VIP PRIVILEGE LOGIN
              </button>
            </div>
          </div>
        )}

        {/* 6. REVIVA PROSPER CHANNEL PARTNERS PAGE */}
        {pageId === 'reviva-prosper' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <Users size={22} color="var(--primary-accent)" />
              <span className="badge-accent">Channel Partner Portal</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Partner With India’s No. 1 Luxury Brand
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Register as an accredited Reviva Prosper Channel Partner. Enjoy guaranteed timely payout cycles, dedicated partner desk support, and exclusive pre-launch access.
            </p>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle2 size={50} color="var(--primary-accent)" style={{ margin: '0 auto 1rem auto' }} />
                <h3>Channel Partner Application Received!</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Our channel partner manager will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" required placeholder="RERA Broker Registration No." className="form-input" />
                <input type="text" required placeholder="Agency / Firm Name" className="form-input" />
                <input type="text" required placeholder="Contact Person Name" className="form-input" />
                <input type="tel" required placeholder="Mobile Phone Number" className="form-input" />
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                  <Send size={16} />
                  <span>SUBMIT PARTNER APPLICATION</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* 7. LEGAL POLICIES (Terms, Privacy, Disclaimer, RERA) */}
        {(pageId === 'terms' || pageId === 'privacy' || pageId === 'disclaimer' || pageId === 'rera-disclaimer' || pageId === 'sitemap') && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={22} color="var(--primary-accent)" />
              <span className="badge-accent">Legal & Compliance</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'capitalize' }}>
              {pageId.replace('-', ' ')}
            </h2>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1rem' }}>
                This site is an official web application model created for {cityInfo.developerName}. All real estate project information, floor plans, images, and prices shown are protected under Real Estate Regulatory Authority (RERA) compliance rules.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                No part of this portal may be reproduced without prior written consent from {cityInfo.developerName}.
              </p>
            </div>
          </div>
        )}

        {/* 8. CITY SELECTOR VIEW */}
        {pageId.startsWith('city-') && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <MapPin size={22} color="var(--primary-accent)" />
              <span className="badge-accent">Select City Region</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>
              Reviva Developments Across India & International
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Click on any city below to switch active project portfolios:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {['Bengaluru', 'Chennai', 'Coimbatore', 'GIFT City Gandhinagar', 'Greater Noida', 'Gurugram', 'Hyderabad', 'Kochi', 'Kozhikode', 'Mumbai', 'Pune', 'Dubai (UAE)'].map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => { alert(`Switched region to ${c}`); onClose(); }}
                  className="btn-outline"
                  style={{ justifyContent: 'center', padding: '1rem' }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
