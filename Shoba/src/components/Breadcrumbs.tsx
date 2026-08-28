import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; path?: string }[];
  onNavigate: (path: string) => void;
  lightText?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate, lightText = true }) => {
  const textColor = lightText ? 'rgba(255, 255, 255, 0.9)' : '#4b5563';
  const activeColor = lightText ? '#e5b869' : '#9F783D';

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        color: textColor,
        padding: '0.5rem 0',
        flexWrap: 'wrap'
      }}
    >
      <button
        onClick={() => onNavigate('/')}
        className="link-glow"
        style={{
          background: 'none',
          border: 'none',
          color: textColor,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.85rem',
          padding: 0,
          fontWeight: 500,
        }}
      >
        <Home size={14} color={activeColor} />
        <span>Home</span>
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={13} color={lightText ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)'} />
          {item.path ? (
            <button
              onClick={() => onNavigate(item.path!)}
              className="link-glow"
              style={{
                background: 'none',
                border: 'none',
                color: textColor,
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: 0,
                fontWeight: 500,
              }}
            >
              {item.label}
            </button>
          ) : (
            <span style={{ color: activeColor, fontWeight: 600 }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
