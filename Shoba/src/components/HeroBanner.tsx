import { Award, ShieldCheck, Building2, Users, ArrowRight, Calendar } from 'lucide-react';
import type { CityInfo } from '../types';

interface HeroBannerProps {
  cityInfo: CityInfo;
  onExploreClick: () => void;
  onScheduleVisit: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  cityInfo,
  onExploreClick,
  onScheduleVisit,
}) => {
  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(180deg, rgba(11, 15, 21, 0.4) 0%, rgba(11, 15, 21, 0.95) 100%), url('/images/hero_banner.png') center/cover no-repeat`,
        borderBottom: '1px solid var(--border-subtle)',
        padding: '5rem 0 4rem 0'
      }}
    >
      {/* Background Decorative Ambient Lighting */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '350px',
          height: '350px',
          background: 'var(--primary-accent)',
          filter: 'blur(160px)',
          opacity: 0.15,
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '820px' }}>
          
          {/* Subtitle tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <span className="badge-accent">{cityInfo.tagline}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>• Premier Real Estate Developer</span>
          </div>

          {/* Main Title */}
          <h1 
            style={{ 
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: 'var(--text-primary)'
            }}
          >
            {cityInfo.heroTitle.split('Bengaluru')[0]}
            <span className="gold-glow-text">{cityInfo.cityName}</span>
          </h1>

          {/* Subtitle description */}
          <p 
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              maxWidth: '700px',
              fontWeight: 400,
              lineHeight: 1.6
            }}
          >
            {cityInfo.heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
            <button onClick={onExploreClick} className="btn-primary" style={{ padding: '1rem 2.2rem' }}>
              <span>EXPLORE RESIDENCES</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={onScheduleVisit} className="btn-outline" style={{ padding: '1rem 2.2rem' }}>
              <Calendar size={18} />
              <span>SCHEDULE SITE VISIT</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div 
            className="glass-panel" 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1.5rem',
              padding: '1.75rem',
              maxWidth: '850px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Award size={36} color="var(--primary-accent)" />
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {cityInfo.stats.legacyYears}+ Yrs
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '4px' }}>
                  Legacy of Excellence
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Building2 size={36} color="var(--primary-accent)" />
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {cityInfo.stats.deliveredSqFt}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '4px' }}>
                  Sq. Ft. Delivered
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ShieldCheck size={36} color="var(--primary-accent)" />
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {cityInfo.stats.projectsDelivered}+
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '4px' }}>
                  Completed Projects
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Users size={36} color="var(--primary-accent)" />
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {cityInfo.stats.happyFamilies}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '4px' }}>
                  Delighted Families
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
