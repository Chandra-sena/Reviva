import React, { useState } from 'react';
import type { CityInfo } from '../types';
import { Upload, CheckCircle2, Award, HeartHandshake, Users } from 'lucide-react';
import { DoveAccent } from '../components/DoveAccent';

interface CareersPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* 1. Hero Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '360px',
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.75) 100%), url('/media/images/reviva-harmony-with-nature.jpg') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
          padding: '0 1.5rem',
          overflow: 'hidden',
        }}
      >
        <DoveAccent corner="bottom-right" size="15%" opacity={0.12} color="#3a7d6f" />
        <h1
          className="hero-reveal gold-shimmer-text"
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 700,
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.85))',
            letterSpacing: '0.5px',
            maxWidth: '900px',
            marginBottom: '0.75rem',
          }}
        >
          At Reviva, We Grow As Our People Thrive
        </h1>
        <p className="hero-reveal hero-reveal-delay-1" style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem', maxWidth: '720px' }}>
          We Aim To Deliver Impactful Solutions, Exceptional Customer Experiences, And Sustainable Value. Join Our Team To Build The Future Together.
        </p>
      </section>

      {/* Main Container */}
      <div className="container" style={{ paddingTop: '4rem' }}>

        {/* Culture & Growth Cards */}
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '4.5rem' }}>
          {[
            { icon: Award, title: 'Impactful Projects', desc: 'Craft sustainable living environments that leave a positive ecological footprint.' },
            { icon: HeartHandshake, title: 'Collaborative Environment', desc: 'Work alongside experienced engineers, architects, and real estate professionals.' },
            { icon: Users, title: 'Inclusive Culture', desc: 'Equal opportunity workplace fostering personal growth, innovation, and leadership.' },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="reviva-card-hover" style={{ background: '#fcfbf7', padding: '2.25rem', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <IconComponent size={36} color="#9F783D" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#00433D', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Job Application Form Section (Matches revivaprojects.com) */}
        <div className="reveal-scale" style={{ maxWidth: '820px', margin: '0 auto', background: '#ffffff', padding: '3.5rem 3rem', borderRadius: '16px', border: '1px solid #9F783D', boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, color: '#00433D', marginBottom: '0.5rem' }}>
              Excited To Work With Reviva Projects? Apply for Job
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
              Please fill in the form below and attach your CV. Our talent acquisition team will get in touch with you.
            </p>
          </div>

          {submitted ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(159, 120, 61, 0.1)', borderRadius: '12px', border: '1px solid #9F783D', color: '#9F783D' }}>
              <CheckCircle2 size={48} style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Application Submitted Successfully!</h3>
              <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', color: '#374151' }}>
                Thank you for your interest in joining Reviva Projects. Our recruitment team will review your application and reach out if your profile matches our active roles.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* First Name & Last Name */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>First Name *</label>
                  <input type="text" required placeholder="First Name" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Last Name *</label>
                  <input type="text" required placeholder="Last Name" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' }} />
                </div>
              </div>

              {/* Mobile Number & Email Address */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Mobile Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Email Address *</label>
                  <input type="email" required placeholder="email@example.com" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' }} />
                </div>
              </div>

              {/* File Upload: Attach Resume */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Attach Resume (PDF, DOCX) *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="file" 
                    required 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10, width: '100%', height: '100%' }} 
                  />
                  <div 
                    style={{ 
                      border: '2px dashed #9F783D', 
                      borderRadius: '8px', 
                      padding: '1.25rem', 
                      textAlign: 'center', 
                      background: '#fcfbf7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      color: '#9F783D',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                    }}
                  >
                    <Upload size={20} />
                    <span>{fileName ? `Uploaded: ${fileName}` : 'Click or Drag to Upload Resume'}</span>
                  </div>
                </div>
              </div>

              {/* Message Us Textarea */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Message Us</label>
                <textarea rows={4} placeholder="Briefly describe your experience and career goals..." style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem' }} />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary btn-magnetic"
                style={{
                  background: '#9F783D',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.9rem 3rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  alignSelf: 'center',
                  marginTop: '0.5rem',
                  boxShadow: '0 4px 14px rgba(159, 120, 61, 0.3)',
                }}
              >
                Submit Application
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
