import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FloatingEnquiryButtonProps {
  onOpenEnquiry: () => void;
}

export const FloatingEnquiryButton: React.FC<FloatingEnquiryButtonProps> = ({ onOpenEnquiry }) => {
  return (
    <button
      onClick={onOpenEnquiry}
      aria-label="Enquire Now"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: 'linear-gradient(135deg, #9E783C 0%, #775500 100%)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50px',
        padding: '12px 24px',
        fontSize: '0.82rem',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(158, 120, 60, 0.4)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), boxShadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 14px 35px rgba(158, 120, 60, 0.55)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(158, 120, 60, 0.4)';
      }}
    >
      <MessageSquare size={16} />
      <span>ENQUIRE</span>
    </button>
  );
};
