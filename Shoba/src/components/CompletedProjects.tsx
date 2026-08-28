import { useState } from 'react';
import { Award, CheckCircle2, Building } from 'lucide-react';
import type { DeliveredProject } from '../types';

interface CompletedProjectsProps {
  projects: DeliveredProject[];
}

export const CompletedProjects: React.FC<CompletedProjectsProps> = ({ projects }) => {
  const [activeTab, setActiveTab] = useState<'Residential' | 'Commercial'>('Residential');

  const filtered = projects.filter(p => p.type === activeTab);

  return (
    <section id="delivered" className="reveal" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">

        {/* Header */}
        <div className="reveal-scale" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Award size={18} color="var(--primary-accent)" />
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
              Track Record & Legacy
            </span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Delivered & Commercial <span className="gold-glow-text">Landmarks</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Explore completed luxury townships and commercial spaces delivered on-time with zero compromise.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button
            onClick={() => setActiveTab('Residential')}
            className={`tab-pill-hover ${activeTab === 'Residential' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.75rem 2rem' }}
          >
            <CheckCircle2 size={16} />
            <span>DELIVERED RESIDENTIAL ({projects.filter(p => p.type === 'Residential').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('Commercial')}
            className={`tab-pill-hover ${activeTab === 'Commercial' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.75rem 2rem' }}
          >
            <Building size={16} />
            <span>COMMERCIAL LANDMARKS ({projects.filter(p => p.type === 'Commercial').length})</span>
          </button>
        </div>

        {/* Grid Showcase */}
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {filtered.map((item) => (
            <div key={item.id} className="glass-panel card-tilt" style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div className="img-hover-wrap" style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="badge-accent" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  Delivered {item.yearDelivered}
                </span>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.3rem' }}>{item.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{item.location}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-accent)', fontWeight: 600 }}>{item.totalUnits} • {item.tagline}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
