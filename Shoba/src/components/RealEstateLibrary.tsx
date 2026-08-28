import React from 'react';
import { BookOpen, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../types';

interface RealEstateLibraryProps {
  blogs: BlogPost[];
}

export const RealEstateLibrary: React.FC<RealEstateLibraryProps> = ({ blogs }) => {
  const handleNavigate = (path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="library" className="reveal" style={{ padding: '4rem 0', background: 'rgba(18, 24, 38, 0.4)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">

        {/* Header */}
        <div className="reveal-scale" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <BookOpen size={18} color="var(--primary-accent)" />
              <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                Knowledge & Insights
              </span>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>
              Real Estate <span className="gold-glow-text">Library</span>
            </h2>
          </div>

          <button 
            onClick={() => handleNavigate('/blog')} 
            className="btn-outline" 
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
          >
            <span>VIEW ALL GUIDES</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Blog Cards Grid */}
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="glass-panel card-tilt"
              onClick={() => handleNavigate(`/blog/${blog.id}`)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '12px'
              }}
            >
              {/* Blog Image */}
              <div className="img-hover-wrap" style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge-accent" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  {blog.category}
                </span>
              </div>

              {/* Blog Body */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                    {blog.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {blog.snippet}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-accent)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span>READ ARTICLE</span>
                  <ArrowRight size={15} />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
