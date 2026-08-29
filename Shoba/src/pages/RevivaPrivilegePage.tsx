import React, { useState } from 'react';
import type { CityInfo } from '../types';
import { Gift, Award, Crown, UserCheck, X, Check, Send, Sparkles, User, Building } from 'lucide-react';

interface RevivaPrivilegePageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const RevivaPrivilegePage: React.FC<RevivaPrivilegePageProps> = ({ cityInfo }) => {
  const [referralCount, setReferralCount] = useState(1);
  const estReward = referralCount * 75000;

  // Referral Modal States
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referrerName, setReferrerName] = useState('');
  const [referrerPhone, setReferrerPhone] = useState('');
  const [referrerEmail, setReferrerEmail] = useState('');
  const [isHomeowner, setIsHomeowner] = useState('yes');
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [projectInterest, setProjectInterest] = useState('Reviva Vintage Valley (Whitefield)');

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds or keep open until user dismisses
    }, 3000);
  };

  const handleClose = () => {
    setIsReferralOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* 1. Hero Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.72) 100%), url('/media/images/reviva-privilage.jpg') center/cover no-repeat`,
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
              onClick={() => setIsReferralOpen(true)}
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

      {/* DEDICATED REFERRAL SUBMISSION MODAL */}
      {isReferralOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              color: '#111827',
              width: '100%',
              maxWidth: '560px',
              padding: '2.5rem 2rem',
              borderRadius: '16px',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
              maxHeight: '92vh',
              overflowY: 'auto'
            }}
          >
            <button
              onClick={handleClose}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
            >
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9F783D', fontWeight: 700, background: 'rgba(159, 120, 61, 0.12)', padding: '0.3rem 0.8rem', borderRadius: '50px', marginBottom: '0.6rem' }}>
                <Sparkles size={14} />
                <span>REVIVA PRIVILEGE CLUB</span>
              </div>
              <h3 style={{ fontFamily: 'serif', fontSize: '1.85rem', color: '#00433D', marginTop: '0.2rem' }}>
                Submit a Friend Referral
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.88rem', marginTop: '0.35rem', lineHeight: 1.5 }}>
                Enter your details and your referee's details to register the referral and claim your cash reward.
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <Check size={32} color="#10b981" />
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827' }}>Referral Successfully Submitted!</h4>
                <p style={{ color: '#4b5563', fontSize: '0.95rem', marginTop: '0.6rem', lineHeight: 1.6 }}>
                  Thank you, <strong>{referrerName || 'Member'}</strong>! We have registered your referral for <strong>{friendName}</strong>. Our Privilege Relationship Manager will connect with your referee shortly and keep you updated on your reward status.
                </p>
                <button
                  onClick={handleClose}
                  className="btn-primary"
                  style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', background: '#9F783D', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
                >
                  DONE
                </button>
              </div>
            ) : (
              <form onSubmit={handleReferralSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* SECTION 1: REFERRER DETAILS */}
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#9F783D', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <User size={15} />
                    <span>Your Details (Referrer)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>Your Full Name *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        placeholder="e.g. Ramesh Kumar" 
                        value={referrerName}
                        onChange={(e) => setReferrerName(e.target.value)}
                        style={{ width: '100%', background: '#ffffff', border: '1px solid #d1d5db', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>Phone Number *</label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          required 
                          placeholder="+91 98765 43210" 
                          value={referrerPhone}
                          onChange={(e) => setReferrerPhone(e.target.value)}
                          style={{ width: '100%', background: '#ffffff', border: '1px solid #d1d5db', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>Email Address *</label>
                        <input 
                          type="email" 
                          className="form-input" 
                          required 
                          placeholder="name@example.com" 
                          value={referrerEmail}
                          onChange={(e) => setReferrerEmail(e.target.value)}
                          style={{ width: '100%', background: '#ffffff', border: '1px solid #d1d5db', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>Are you an existing Reviva homeowner?</label>
                      <select 
                        value={isHomeowner} 
                        onChange={(e) => setIsHomeowner(e.target.value)}
                        style={{ width: '100%', background: '#ffffff', border: '1px solid #d1d5db', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem', color: '#111827' }}
                      >
                        <option value="yes">Yes, I own a Reviva Property</option>
                        <option value="no">No, I am a Well-Wisher / Channel Partner</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: REFEREE DETAILS */}
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#00433D', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Building size={15} />
                    <span>Friend / Referee Details</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>Friend's Full Name *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        placeholder="e.g. Anita Sharma" 
                        value={friendName}
                        onChange={(e) => setFriendName(e.target.value)}
                        style={{ width: '100%', background: '#ffffff', border: '1px solid #d1d5db', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>Friend's Phone Number *</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        required 
                        placeholder="+91 98765 00000" 
                        value={friendPhone}
                        onChange={(e) => setFriendPhone(e.target.value)}
                        style={{ width: '100%', background: '#ffffff', border: '1px solid #d1d5db', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>Preferred Project of Interest</label>
                      <select 
                        value={projectInterest} 
                        onChange={(e) => setProjectInterest(e.target.value)}
                        style={{ width: '100%', background: '#ffffff', border: '1px solid #d1d5db', padding: '0.65rem 0.85rem', borderRadius: '6px', fontSize: '0.88rem', color: '#111827' }}
                      >
                        <option value="Reviva Vintage Valley (Whitefield)">Reviva Vintage Valley (Whitefield)</option>
                        <option value="Reviva Trinity Lifescape (Bengaluru)">Reviva Trinity Lifescape (Bengaluru)</option>
                        <option value="Reviva Farms (Bengaluru Suburbs)">Reviva Farms (Bengaluru Suburbs)</option>
                        <option value="Reviva Muthanallur (Bangalore)">Reviva Muthanallur (Bangalore)</option>
                        <option value="Any Flagship Reviva Project">Any Flagship Reviva Project</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{
                    background: '#9F783D',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.9rem',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 6px 18px rgba(159, 120, 61, 0.35)'
                  }}
                >
                  <Send size={16} />
                  <span>SUBMIT REFERRAL & CLAIM REWARD</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
