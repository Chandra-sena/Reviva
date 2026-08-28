import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import type { FaqItem } from '../types';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <HelpCircle size={18} color="var(--primary-accent)" />
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
              Frequently Asked Questions
            </span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>
            Everything You Need To Know <span className="gold-glow-text">About Reviva</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id} 
                className="glass-panel"
                style={{ borderRadius: '10px', overflow: 'hidden', transition: 'all 0.3s ease' }}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '1.05rem',
                    fontWeight: 700
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="badge-accent" style={{ fontSize: '0.7rem' }}>{item.category}</span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown 
                    size={20} 
                    color="var(--primary-accent)" 
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} 
                  />
                </button>

                {isOpen && (
                  <div 
                    style={{
                      padding: '0 1.5rem 1.25rem 1.5rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      fontSize: '0.925rem',
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      paddingTop: '1rem'
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
