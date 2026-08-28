import React, { useState } from 'react';
import type { CityInfo } from '../types';
import { Send, CheckCircle2, Award, Users, GraduationCap } from 'lucide-react';

interface CareersPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ cityInfo }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const jobs = [
    { title: 'Senior Structural Engineer', dept: 'Engineering & Construction', loc: cityInfo.cityName, type: 'Full-time' },
    { title: 'Luxury Real Estate Relationship Manager', dept: 'Sales & Advisory', loc: cityInfo.cityName, type: 'Full-time' },
    { title: 'Lead Architectural Designer', dept: 'Design & Precast R&D', loc: cityInfo.cityName, type: 'Full-time' },
    { title: 'Digital Performance Marketing Manager', dept: 'Marketing & PR', loc: cityInfo.cityName, type: 'Full-time' },
    { title: 'Customer Experience Executive', dept: 'CRM & Possession', loc: cityInfo.cityName, type: 'Full-time' },
  ];

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
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          JOIN THE REVIVA FAMILY
        </span>
        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', 
            fontWeight: 400, 
            letterSpacing: '1px',
            maxWidth: '900px',
          }}
        >
          Build Your Career with Industry Pioneers
        </h1>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: '3.5rem' }}>
        
        {/* Culture Highlights Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {[
            { icon: Award, title: 'Recognized Leadership', desc: 'Consistently ranked among Great Places to Work in Real Estate.' },
            { icon: GraduationCap, title: 'Reviva Academy', desc: 'In-house training institute for continuous skill development.' },
            { icon: Users, title: 'Diverse Work Culture', desc: 'Equal opportunity employer with 10,000+ professionals nationwide.' },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <IconComponent size={36} color="#9E783C" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Job Openings & Application Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3.5rem', alignItems: 'flex-start' }}>
          
          {/* Job Openings List */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>
              Current Job Openings
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {jobs.map((job, idx) => (
                <div key={idx} style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{job.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                      {job.dept} • {job.loc} • {job.type}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedRole(job.title)}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: '#0f172a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    APPLY NOW
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: '#ffffff', padding: '2.5rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              Submit Your Profile
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              {selectedRole ? `Applying for: ${selectedRole}` : "Didn't find your exact match? Send your profile to our talent team."}
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <CheckCircle2 size={48} color="#9E783C" style={{ margin: '0 auto 1rem auto' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Application Submitted!</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  Thank you for applying to Reviva. Our talent acquisition team will review your credentials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>FULL NAME</label>
                  <input type="text" required placeholder="Enter your full name" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>EMAIL ADDRESS</label>
                  <input type="email" required placeholder="name@example.com" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>PHONE NUMBER</label>
                  <input type="tel" required placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>LINK TO RESUME / PORTFOLIO</label>
                  <input type="url" required placeholder="https://linkedin.com/in/profile" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }} />
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
                  <span>SUBMIT APPLICATION</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
