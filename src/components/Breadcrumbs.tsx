import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; path?: string }[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        padding: '1rem 0',
        flexWrap: 'wrap'
      }}
    >
      <button
        onClick={() => onNavigate('/')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.85rem',
          padding: 0
        }}
      >
        <Home size={14} color="var(--primary-accent)" />
        <span>Home</span>
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={13} color="rgba(255,255,255,0.3)" />
          {item.path ? (
            <button
              onClick={() => onNavigate(item.path!)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: 0
              }}
            >
              {item.label}
            </button>
          ) : (
            <span style={{ color: 'var(--primary-accent)', fontWeight: 600 }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
