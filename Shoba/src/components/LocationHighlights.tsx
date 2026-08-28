import React from 'react';
import { Plane, Train, GraduationCap, Stethoscope, Briefcase, MapPin } from 'lucide-react';

interface LocationHighlightsProps {
  cityName: string;
}

export const LocationHighlights: React.FC<LocationHighlightsProps> = ({ cityName }) => {
  const highlights = [
    {
      icon: <Briefcase size={24} color="var(--primary-accent)" />,
      title: 'IT & Business Hubs',
      description: 'Minutes away from Manyata Tech Park, ITPL Whitefield, Electronic City, and Embassy TechVillage.'
    },
    {
      icon: <Train size={24} color="var(--primary-accent)" />,
      title: 'Metro Connectivity',
      description: 'Rapid access to Namma Metro Purple & Yellow Line stations connecting East, West & South Bengaluru.'
    },
    {
      icon: <Plane size={24} color="var(--primary-accent)" />,
      title: 'Airport Expressway',
      description: 'Seamless signal-free corridor to Kempegowda International Airport (BLR) via Bellary Road & STRR.'
    },
    {
      icon: <GraduationCap size={24} color="var(--primary-accent)" />,
      title: 'Top Educational Institutions',
      description: 'Proximity to Indus International, Delhi Public School, Greenwood High, and IISc Bengaluru.'
    },
    {
      icon: <Stethoscope size={24} color="var(--primary-accent)" />,
      title: 'Healthcare Infrastructure',
      description: 'World-class healthcare centers including Manipal Hospital, Aster CMI, and Sakra World Hospital.'
    },
    {
      icon: <MapPin size={24} color="var(--primary-accent)" />,
      title: 'High Capital Growth',
      description: `${cityName}'s prime real estate corridors consistently yield premium rental returns & long-term appreciation.`
    }
  ];

  return (
    <section id="location" className="reveal" style={{ padding: '4rem 0', background: 'rgba(18, 24, 36, 0.4)' }}>
      <div className="container">

        <div className="reveal-scale" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
            Connectivity & Infrastructure
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '0.5rem' }}>
            Prime Location Advantage in <span className="gold-glow-text">{cityName}</span>
          </h2>
        </div>

        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {highlights.map((item, idx) => (
            <div key={idx} className="glass-panel card-tilt" style={{ padding: '1.75rem' }}>
              <div style={{ marginBottom: '1rem', background: 'rgba(158, 120, 60, 0.1)', width: '50px', height: '50px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
