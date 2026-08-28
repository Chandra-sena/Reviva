import React, { useState } from 'react';
import type { CityInfo } from '../types';
import { MapPin, PhoneCall, Mail, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ cityInfo }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* 1. Hero Banner */}
      <section 
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          CONNECT WITH REVIVA
        </span>
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 400, 
            letterSpacing: '1px',
          }}
        >
          Contact Us
        </h1>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'flex-start' }}>
          
          {/* Corporate Office Info Cards */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>
              Corporate Headquarters & Regional Desks
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '1rem' }}>
                <MapPin size={26} color="#9E783C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>Reviva Corporate Office</div>
                  <div style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.25rem', lineHeight: 1.6 }}>
                    Survey No. 29 part, Shankarpally (M), Ranga Reddy District — {cityInfo.cityName} Regional Desk
                  </div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '1rem' }}>
                <PhoneCall size={26} color="#9E783C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>Toll Free Helpline</div>
                  <div style={{ color: '#9E783C', fontWeight: 800, fontSize: '1.25rem', marginTop: '0.25rem' }}>
                    +91 9986078317
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.1rem' }}>
                    Available 9:00 AM to 8:00 PM IST (Mon - Sun)
                  </div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '1rem' }}>
                <Mail size={26} color="#9E783C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>Email Inquiries</div>
                  <div style={{ color: '#475569', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    info@revivaprojects.com • www.revivaprojects.com
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              Send an Inquiry
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Our sales executive will connect with you within 15 minutes.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle2 size={48} color="#9E783C" style={{ margin: '0 auto 1rem auto' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Inquiry Submitted!</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  Thank you for reaching out to Reviva. A representative has been assigned to your query.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>FULL NAME</label>
                  <input type="text" required placeholder="Enter your full name" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>PHONE NUMBER</label>
                  <input type="tel" required placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>EMAIL ADDRESS</label>
                  <input type="email" required placeholder="name@example.com" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>MESSAGE / REQUIREMENT</label>
                  <textarea rows={4} required placeholder="Tell us about your property preferences..." style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '0.85rem',
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Send size={16} color="#9E783C" />
                  <span>SUBMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
