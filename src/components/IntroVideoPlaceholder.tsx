import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface IntroVideoPlaceholderProps {
  onExplore: () => void;
}

export const IntroVideoPlaceholder: React.FC<IntroVideoPlaceholderProps> = () => {
  return (
    <section 
      id="home-video"
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 76px)',
        minHeight: '520px',
        maxHeight: '1080px',
        overflow: 'hidden',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Poster Image */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(180deg, rgba(10, 10, 10, 0.4) 0%, rgba(10, 10, 10, 0.8) 100%), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.9)',
          transform: 'scale(1.02)',
        }}
      />

      {/* Ambient Gradient Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(158, 120, 60, 0.2) 0%, rgba(10, 10, 10, 0.85) 75%)',
          pointerEvents: 'none',
        }}
      />

      {/* Video Overlay Badge & Text */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '900px',
        }}
      >
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.2rem',
            borderRadius: '30px',
            background: 'rgba(19, 36, 36, 0.85)',
            border: '1px solid var(--primary-accent)',
            color: 'var(--primary-accent)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <Sparkles size={14} />
          <span>REVIVA PROJECTS • BRINGING MEANING TO LIFE</span>
        </div>

        <h1 
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '1px',
            marginBottom: '1.25rem',
            textShadow: '0 4px 24px rgba(0,0,0,0.8)',
          }}
        >
          Crafting Masterpieces <br />
          <span style={{ color: 'var(--primary-accent)', fontWeight: 300, fontStyle: 'italic' }}>Across India</span>
        </h1>

        <p 
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '1rem',
            fontWeight: 300,
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Uncompromising quality, backward integration, and legendary precision defining modern luxury living.
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.75rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        <span>SCROLL DOWN</span>
        <ChevronDown size={18} color="var(--primary-accent)" style={{ animation: 'bounce 2s infinite' }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(6px); }
          60% { transform: translateY(3px); }
        }
      `}</style>
    </section>
  );
};
