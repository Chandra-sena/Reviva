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
              We are committed to building eco-conscious spaces to enhance the quality of life.
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
              We aim to embrace progressive design thought processes with purpose that elevates living.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
