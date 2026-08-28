import React from 'react';
import type { CityInfo } from '../types';

interface LeadershipPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = () => {
  return (
    <div style={{ background: '#ffffff', color: '#111827' }}>
      {/* Hero Banner */}
      <section 
        style={{
          background: 'linear-gradient(180deg, rgba(13, 22, 22, 0.9) 0%, rgba(13, 22, 22, 0.75) 100%), url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80") center/cover no-repeat',
          padding: '6rem 0 4rem 0',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span style={{ color: 'var(--primary-accent)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            LEADERSHIP & VISION
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1rem' }}>
            Board & Executive Leadership
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#d1d5db', lineHeight: 1.6 }}>
            Steered by visionary leadership, ethical principles, and decades of real estate mastery.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" style={{ padding: '5rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', background: 'linear-gradient(135deg, #9E783C 0%, #4A381C 100%)', minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-script)', fontSize: '3rem', color: '#ffffff' }}>Reviva</span>
              </div>
            </div>

            <div>
              <span style={{ color: '#9E783C', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                FOUNDER — THE CREATOR
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 700, color: '#0a0a0a', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
                Our Founder
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Our founder set out with a visionary belief: that a home should be more than four walls — it should embody life, growth, and harmony. That conviction became the seed of Reviva.
              </p>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                Reviva was built on the idea of blending decades of real estate expertise with an artist's eye for design, pairing a legacy of excellence with an innovative, future-ready vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman's Message */}
      <section id="message" style={{ padding: '5rem 0', background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '3.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#0a0a0a', marginBottom: '1.5rem', textAlign: 'center' }}>
              Chairman's Message
            </h3>
            <blockquote style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#334155', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              "At Reviva, we believe life is beautiful — and every home we build should reflect that belief. As caregivers of the communities we shape, our quest is to nurture spaces where people and nature thrive together, for generations to come."
            </blockquote>
            <div style={{ textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
              — Chairman, Reviva Projects
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors Grid */}
      <section id="leader" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: '#0a0a0a' }}>
              Board of Directors
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.4rem' }}>
              Distinguished leaders driving governance and growth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Founder', role: 'Founder Emeritus — The Creator' },
              { name: 'Chairman', role: 'Chairman — The Caregiver' },
              { name: 'Managing Director', role: 'Managing Director — The Explorer' },
              { name: 'Whole-time Director', role: 'Whole-time Director & CFO' },
            ].map((member, idx) => (
              <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#9E783C', color: '#fff', fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>
                  {member.name}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
