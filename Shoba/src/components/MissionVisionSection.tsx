import React from 'react';
import { Compass, Award } from 'lucide-react';

const visionImage = '/media/images/our-vision-dove.jpg';
const missionImage = '/media/images/our-mission-building.jpg';

export const MissionVisionSection: React.FC = () => {
  return (
    <section id="vision" style={{ padding: '5rem 0', background: '#f8fafc' }}>
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
  );
};
