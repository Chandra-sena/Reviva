import React from 'react';
import type { CityInfo } from '../types';
import { Award, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { LeafAccent } from '../components/LeafAccent';

const lifeIsBeautifulImage = '/media/images/life-is-beautiful.jpg';
const visionImage = '/media/images/our-vision-dove.jpg';
const missionImage = '/media/images/our-mission-building.jpg';
const creatorImage = '/media/images/modern-interior-design.jpg';
const caregiverImage = '/media/images/plant-atrium-corridor.jpg';
const explorerImage = '/media/images/property-gallery-3.jpg';

interface PhilosophyPageProps {
  cityInfo: CityInfo;
  onOpenEnquiry: () => void;
}

export const PhilosophyPage: React.FC<PhilosophyPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(180deg, rgba(13, 22, 22, 0.9) 0%, rgba(13, 22, 22, 0.7) 100%), url("/media/images/luxury-villa-pool.jpg") center/cover no-repeat',
          padding: '6rem 0 4rem 0',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <LeafAccent corner="top-left" size="18%" opacity={0.12} color="#3a7d6f" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="hero-reveal" style={{ color: 'var(--primary-accent)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            WHO WE ARE
          </span>
          <h1 className="hero-reveal hero-reveal-delay-1 gold-shimmer-text" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))' }}>
            Our Philosophy
          </h1>
          <p className="font-script hero-reveal hero-reveal-delay-2 gold-shimmer-text" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '2rem', lineHeight: 1.4 }}>
            Life is Beautiful
          </p>
        </div>
      </section>

      {/* Passion at Work Section */}
      <section id="passions" style={{ padding: '5rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div
              className="reveal-scale card-tilt img-zoom-hover"
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                minHeight: '360px',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <img
                src={lifeIsBeautifulImage}
                alt="Reviva community garden, resident life amid landscaped greenery"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Bottom-anchored scrim: keeps the photo legible while guaranteeing text contrast */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 12, 10, 0.88) 0%, rgba(10, 12, 10, 0.45) 42%, rgba(10, 12, 10, 0) 72%)',
                }}
              />
              <div style={{ position: 'relative', zIndex: 1, padding: '2.5rem', width: '100%' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: 'var(--letter-spacing-caps)',
                    textTransform: 'uppercase',
                    color: 'var(--primary-accent)',
                    marginBottom: '0.6rem',
                  }}
                >
                  Our Philosophy
                </span>
                <p
                  className="font-editorial-quote"
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#ffffff', margin: 0, textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
                >
                  Life is Beautiful
                </p>
              </div>
            </div>

            <div className="reveal-right">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '1.5rem' }}>
                BRAND PHILOSOPHY
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.25rem' }}>
                Our philosophy is more than just a phrase — it's a belief. Every home we create reflects the beauty, joy, and wonder of life.
              </p>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                Designed to embrace laughter, dreams, and growth, our spaces are crafted to make daily living inspiring and meaningful, because a beautiful life deserves a beautiful place to unfold.
              </p>
              <button
                className="btn-primary btn-magnetic"
                onClick={onOpenEnquiry}
                style={{ background: '#9E783C', color: '#fff', border: 'none', padding: '0.8rem 2rem', fontWeight: 700, borderRadius: '4px', cursor: 'pointer' }}
              >
                CONNECT WITH US
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Reviva Way Section */}
      <section id="way" style={{ padding: '5rem 0', background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, color: '#0a0a0a' }}>
              The Reviva Way
            </h2>
            <span className="line-draw" style={{ margin: '0.75rem auto' }} />
            <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              A brand personality shaped by three archetypes: the Creator, the Caregiver, and the Explorer.
            </p>
          </div>

          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div className="reviva-card-hover" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <img src={creatorImage} alt="The Creator - innovative architectural design" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '2rem' }}>
                <ShieldCheck size={36} color="#9E783C" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>The Creator</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  As visionaries, we create spaces that inspire connection and transformation through innovative design and timeless aesthetics.
                </p>
              </div>
            </div>

            <div className="reviva-card-hover" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <img src={caregiverImage} alt="The Caregiver - sustainable green spaces" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '2rem' }}>
                <HeartHandshake size={36} color="#9E783C" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>The Caregiver</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Committed to sustainability and community, we nurture environments where people and nature thrive together.
                </p>
              </div>
            </div>

            <div className="reviva-card-hover" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <img src={explorerImage} alt="The Explorer - future-ready living spaces" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '2rem' }}>
                <Award size={36} color="#9E783C" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>The Explorer</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Reviva redefines modern living with thoughtful, future-ready spaces in pursuit of beauty, purpose, and possibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div
              className="card-tilt"
              style={{
                position: 'relative',
                overflow: 'hidden',
                color: '#fff',
                padding: '3rem 2.5rem',
                borderRadius: '12px',
                background: `linear-gradient(180deg, rgba(13, 22, 22, 0.88) 0%, rgba(13, 22, 22, 0.94) 100%), url(${visionImage}) center/cover no-repeat`,
              }}
            >
              <Compass size={40} color="var(--primary-accent)" style={{ marginBottom: '1.25rem' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>
                Our Vision
              </h3>
              <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Reviva aims to transform the real estate market, redefining modern living by creating spaces that inspire beauty, promote harmony, and enhance lifestyles. We blend creativity, sustainability, and innovation to shape a promising future.
              </p>
            </div>

            <div
              className="card-tilt"
              style={{
                position: 'relative',
                overflow: 'hidden',
                color: '#fff',
                padding: '3rem 2.5rem',
                borderRadius: '12px',
                background: `linear-gradient(180deg, rgba(13, 22, 22, 0.88) 0%, rgba(13, 22, 22, 0.94) 100%), url(${missionImage}) center/cover no-repeat`,
              }}
            >
              <Award size={40} color="var(--primary-accent)" style={{ marginBottom: '1.25rem' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff', marginBottom: '1rem' }}>
                Our Mission
              </h3>
              <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.05rem' }}>
                We are committed to designing thoughtfully curated, eco-conscious spaces that enhance the quality of life. By passionately embracing forward-thinking design and creativity, we aim to transform living environments into experiences that reflect elegance, sustainability, and purposeful living.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
