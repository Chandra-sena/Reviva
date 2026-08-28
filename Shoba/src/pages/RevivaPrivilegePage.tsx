import React, { useState } from 'react';
import type { CityInfo } from '../types';
import { Gift, Award, Crown, UserCheck } from 'lucide-react';

interface RevivaPrivilegePageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const RevivaPrivilegePage: React.FC<RevivaPrivilegePageProps> = ({ cityInfo, onOpenEnquiry }) => {
  const [referralCount, setReferralCount] = useState(1);
  const estReward = referralCount * 75000;

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* 1. Hero Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('/media/images/eco-house-hero.jpg') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="hero-reveal" style={{ color: '#e5b869', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            EXCLUSIVE MEMBERSHIP & REFERRAL CLUB
          </span>
          <h1
            className="hero-reveal hero-reveal-delay-1 gold-shimmer-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.85))',
              letterSpacing: '1px',
            }}
          >
            Reviva Privilege
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>

        {/* Tier Cards */}
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {[
            { tier: 'Silver Privilege', badge: 'Existing Homeowners', perk: '1% Referral Reward on property value', icon: Award },
            { tier: 'Gold Privilege', badge: '2+ Properties Owned', perk: '1.5% Referral Bonus + Priority Allotment', icon: Gift },
            { tier: 'Platinum Club', badge: 'Ultra-Luxury Owners', perk: '2% Referral Cash + Concierge & Private Events', icon: Crown },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="reviva-card-hover" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <IconComp size={38} color="#9E783C" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>{item.tier}</h3>
                <div style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.3rem 0 1rem 0' }}>{item.badge}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                  {item.perk}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Referral Rewards Calculator */}
        <div className="reveal-scale" style={{ background: '#0f172a', color: '#ffffff', padding: '3.5rem 2rem', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '0.5rem', color: '#ffffff' }}>
              Calculate Your Referral Earnings
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' }}>
              Refer friends and family to Reviva projects in {cityInfo.cityName} and receive direct cash rewards.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                Number of Successful Referrals: <strong>{referralCount}</strong>
              </label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={referralCount} 
                onChange={(e) => setReferralCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#9E783C', cursor: 'pointer' }}
              />
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Referral Cash Reward</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: '#9E783C', marginTop: '0.3rem' }}>
                ₹ {estReward.toLocaleString('en-IN')}*
              </div>
            </div>

            <button
              className="btn-primary btn-magnetic"
              onClick={onOpenEnquiry}
              style={{
                padding: '0.85rem 2rem',
                background: '#9E783C',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <UserCheck size={18} />
              <span>SUBMIT A REFERRAL NOW</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
