import React, { useState } from 'react';
import type { CityInfo } from '../types';
import { MapPin, PhoneCall, Mail, CheckCircle2 } from 'lucide-react';
import { LeafAccent } from '../components/LeafAccent';

interface ContactPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* Main Container */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>

        {/* Header Title */}
        <div className="reveal" style={{ marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
          <LeafAccent corner="top-right" size="10%" opacity={0.08} />
          <h1
            className="gold-shimmer-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
              fontWeight: 600,
              marginBottom: '0.75rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Connect with us
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '680px', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
            explore real estate opportunities, discuss your vision, or simply reach out. Let’s build something extraordinary together
          </p>
        </div>

        {/* 2-Column Section: Dark Green Address Card + Embedded Google Map */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '2.5rem', 
            alignItems: 'stretch',
            marginBottom: '4.5rem',
          }}
        >
          {/* Left Side: Dark Forest Green Card */}
          <div
            className="reveal-left card-tilt"
            style={{
              background: '#00433D',
              color: '#ffffff', 
              padding: '3rem 2.5rem', 
              borderRadius: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              gap: '2.25rem',
              boxShadow: '0 12px 32px rgba(0, 67, 61, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <MapPin size={26} color="#9F783D" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  Sy No 13, Indian Gas Godown Road, Channasandra, Kadugodi, Bengaluru, Karnataka 560067
                </div>
                <a
                  href="https://maps.app.goo.gl/iwVLu2ZQct2h94TA8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-magnetic"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#9F783D',
                    color: '#ffffff',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 12px rgba(159, 120, 61, 0.3)',
                  }}
                >
                  <MapPin size={15} />
                  <span>GET DIRECTIONS ON GOOGLE MAPS →</span>
                </a>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <PhoneCall size={24} color="#9F783D" style={{ flexShrink: 0 }} />
              <a href="tel:+919148536320" className="link-glow" style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none' }}>
                +91 91485 36320
              </a>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <Mail size={24} color="#9F783D" style={{ flexShrink: 0 }} />
              <a href="mailto:info@revivaprojects.com" className="link-glow" style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 500, textDecoration: 'none' }}>
                info@revivaprojects.com
              </a>
            </div>
          </div>

          {/* Right Side: Embedded Google Map Feature (Reviva Vintage Valley) */}
          <div className="reveal-right" style={{ borderRadius: '20px', overflow: 'hidden', minHeight: '380px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <iframe 
              title="Reviva Vintage Valley Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4414.248520803587!2d77.76903107507673!3d12.986013387330626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0fd89043e97d%3A0xfbf0cc9a4e929e5c!2sReviva%20Vintage%20Valley!5e1!3m2!1sen!2sin!4v1787563205095!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '380px', width: '100%', height: '100%' }} 
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        {/* Send Us A Message Form Section */}
        <div className="reveal-scale" style={{ maxWidth: '800px', margin: '0 auto', background: '#fcfbf7', padding: '3rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600, color: '#00433D', marginBottom: '0.5rem' }}>
            Send Us A Message
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Fill out the details below and our sales advisory team will get back to you promptly.
          </p>

          {submitted ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(0, 67, 61, 0.08)', borderRadius: '12px', border: '1px solid #00433D', color: '#00433D' }}>
              <CheckCircle2 size={44} style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Thank You for Reaching Out!</h3>
              <p style={{ fontSize: '0.95rem', marginTop: '0.4rem' }}>Your inquiry has been received. Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>FULL NAME *</label>
                  <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>MOBILE NUMBER *</label>
                  <input type="tel" required placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>EMAIL ADDRESS *</label>
                <input type="email" required placeholder="john@example.com" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>YOUR MESSAGE *</label>
                <textarea rows={4} required placeholder="Tell us about your requirements..." style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' }} />
              </div>

              <button
                type="submit"
                className="btn-primary btn-magnetic"
                style={{
                  background: '#9F783D',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.85rem 2.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  boxShadow: '0 4px 14px rgba(159, 120, 61, 0.3)',
                }}
              >
                Submit Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
