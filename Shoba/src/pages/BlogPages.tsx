import React, { useState } from 'react';
import type { BlogPost, CityInfo } from '../types';
import { Building, Scale, Home, Compass, Leaf } from 'lucide-react';

interface BlogListPageProps {
  blogs: BlogPost[];
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

const CATEGORIES = [
  { id: 'Reviva', title: 'Reviva', iconStr: 'R', desc: 'Deep dive into our most sought-after projects across India' },
  { id: 'Cities', title: 'Cities', iconComp: Building, desc: 'Top areas, infrastructure, residential trends, business hubs' },
  { id: 'Legal', title: 'Legal', iconComp: Scale, desc: 'Informative guides on safe, process-driven property purchase' },
  { id: 'Real Estate', title: 'Real Estate', iconComp: Home, desc: 'Commonly used terms; industry overview in different cities' },
  { id: 'Architecture', title: 'Architecture', iconComp: Compass, desc: 'Explore diverse global themes such as Greek, Spanish, NYC, & more' },
  { id: 'Sustainability', title: 'Sustainability', iconComp: Leaf, desc: 'Green building, eco-materials, and sustainable living trends' },
];

export const BlogListPage: React.FC<BlogListPageProps> = ({ blogs, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem' }}>

      {/* Page Header */}
      <section
        style={{
          background: 'linear-gradient(180deg, rgba(13, 22, 22, 0.88) 0%, rgba(13, 22, 22, 0.72) 100%), url("/media/images/reviva-insights.jpg") center/cover no-repeat',
          padding: '7.5rem 0 4rem 0',
          color: '#ffffff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="hero-reveal" style={{ color: '#e5b869', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '0.5rem' }}>
            REAL ESTATE LIBRARY
          </span>
          <h1 className="hero-reveal hero-reveal-delay-1 gold-shimmer-text" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, marginTop: '0.4rem', letterSpacing: '0.5px' }}>
            Insights, Guides & Market Trends
          </h1>
          <p className="hero-reveal hero-reveal-delay-2" style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '650px', margin: '0.75rem auto 0 auto', fontWeight: 400 }}>
            Expert articles to guide your real estate journey and homeownership decisions.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '3.5rem' }}>

        {/* Browse By Categories - Matching Screenshot 3 */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '2rem' }}>
            Browse By Categories
          </h2>

          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {CATEGORIES.map((cat) => {
              const IconComponent = cat.iconComp;
              const isSelected = selectedCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  className="resource-btn-hover"
                  onClick={() => setSelectedCategory(isSelected ? 'All' : cat.id)}
                  style={{
                    background: isSelected ? '#f3effa' : '#ffffff',
                    border: isSelected ? '1.5px solid #9E783C' : '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '1.5rem 1rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#9E783C';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div>
                    {/* Top Icon Badge */}
                    <div 
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        background: '#f1f5f9',
                        color: '#9E783C',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem auto',
                      }}
                    >
                      {IconComponent ? <IconComponent size={20} color="#9E783C" /> : cat.iconStr}
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                      {cat.title}
                    </h4>

                    <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                      {cat.desc}
                    </p>
                  </div>

                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9E783C', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                    View all blogs →
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Browse By Interest - Matching Screenshot 3 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>
              Browse By Interest
            </h2>
            {selectedCategory !== 'All' && (
              <button 
                onClick={() => setSelectedCategory('All')}
                style={{ background: 'none', border: 'none', color: '#9E783C', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Clear Filter ({selectedCategory})
              </button>
            )}
          </div>

          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 340px))',
              justifyContent: 'center',
              gap: '2rem'
            }}
          >
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="reviva-card-hover"
                onClick={() => onNavigate(`/blog/${blog.id}`)}
                style={{
                  background: '#ffffff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image matching Screenshot 3 format */}
                <div className="img-hover-wrap" style={{ height: '220px', overflow: 'hidden' }}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        background: '#f1f5f9',
                        color: '#9E783C',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      {blog.category}
                    </span>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                      {blog.title}
                    </h3>

                    <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {blog.snippet}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <span>{blog.date}</span>
                    <span style={{ color: '#9E783C', fontWeight: 700 }}>Read Article →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export const BlogDetailPage: React.FC<{ blogId: string; blogs: BlogPost[]; cityInfo: CityInfo; onNavigate: (path: string) => void }> = ({
  blogId,
  blogs,
  onNavigate,
}) => {
  const blog = blogs.find(b => b.id === blogId) || blogs[0];

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <button
          className="link-glow"
          onClick={() => onNavigate('/blog')}
          style={{ background: 'none', border: 'none', color: '#9E783C', fontWeight: 700, cursor: 'pointer', marginBottom: '1.5rem' }}
        >
          ← Back to Real Estate Library
        </button>

        <div className="reveal">
          <span style={{ background: '#f1f5f9', color: '#9E783C', fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: '4px', textTransform: 'uppercase' }}>
            {blog.category}
          </span>

          <h1 className="gold-shimmer-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', margin: '1rem 0' }}>
            {blog.title}
          </h1>

          <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>
            <span>Published: {blog.date}</span>
            <span>Reading time: {blog.readTime}</span>
          </div>
        </div>

        <div className="reveal-scale img-hover-wrap" style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem' }}>
          <img src={blog.image} alt={blog.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <div style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '3rem', marginBottom: '3.5rem' }}>
          {blog.content.split('\n\n').map((block, idx) => {
            const trimmed = block.trim();
            if (trimmed.startsWith('### ')) {
              // Only the first line is the heading — a heading immediately followed by
              // body text on the next line (no blank-line separator) shouldn't swallow
              // that body text into the <h3> too.
              const lines = trimmed.split('\n');
              const headingText = lines[0].replace('### ', '');
              const rest = lines.slice(1).join('\n').trim();
              return (
                <React.Fragment key={idx}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading, "Fraunces", serif)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#003831',
                      marginTop: '2.5rem',
                      marginBottom: '1rem',
                      paddingLeft: '0.85rem',
                      borderLeft: '4px solid #9E783C'
                    }}
                  >
                    {headingText}
                  </h3>
                  {rest && (
                    <div style={{ marginBottom: '1.25rem', whiteSpace: 'pre-line', color: '#475569' }}>
                      {rest}
                    </div>
                  )}
                </React.Fragment>
              );
            }
            return (
              <div key={idx} style={{ marginBottom: '1.25rem', whiteSpace: 'pre-line', color: '#475569' }}>
                {trimmed}
              </div>
            );
          })}
        </div>

        {/* Related Articles Section */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.75rem' }}>
            Related Articles
          </h3>

          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
            {blogs
              .filter(b => b.id !== blog.id)
              .slice(0, 3)
              .map(related => (
                <div
                  key={related.id}
                  onClick={() => {
                    onNavigate(`/blog/${related.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="card-tilt img-hover-wrap"
                  style={{
                    background: '#ffffff',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img src={related.image} alt={related.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#9E783C', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                        {related.category}
                      </span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                        {related.title}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                      <span>{related.date}</span>
                      <span style={{ color: '#9E783C', fontWeight: 600 }}>Read →</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
