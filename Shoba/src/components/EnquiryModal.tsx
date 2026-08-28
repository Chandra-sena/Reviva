import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { Property } from '../types';

interface EnquiryModalProps {
  property?: Property | null;
  cityName: string;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  property,
  cityName,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    visitDate: '',
    preferredTime: 'Morning (10 AM - 1 PM)',
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          background: '#ffffff',
          borderRadius: '14px',
          padding: '1.4rem 1.6rem 1.35rem 1.6rem',
          position: 'relative',
          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.22)',
          border: '1px solid rgba(159, 120, 61, 0.22)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        {/* Sleek Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#f1f5f9',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.25rem 0' }}>
            <CheckCircle2 size={48} color="#9F783D" style={{ margin: '0 auto 0.85rem auto' }} />
            <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.4rem', fontWeight: 600 }}>Site Visit Request Confirmed!</h3>
            <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '1.25rem', lineHeight: 1.5, fontWeight: 400 }}>
              Thank you <strong>{formData.fullName}</strong>. Our sales advisor for {property ? property.name : cityName} will call you shortly on <strong>{formData.phone}</strong>.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.65rem', fontSize: '0.76rem', fontWeight: 600 }}>
              DONE
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '0.9rem' }}>
              <span className="badge-accent" style={{ marginBottom: '0.3rem', display: 'inline-block', fontSize: '0.62rem', padding: '0.15rem 0.55rem', fontWeight: 600 }}>
                {property ? `Enquiring for: ${property.name}` : `Reviva ${cityName} VIP Concierge`}
              </span>
              <h3 style={{ fontSize: '1.12rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.25, letterSpacing: '0.1px' }}>
                Schedule Private Site Visit
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.74rem', marginTop: '0.2rem', lineHeight: 1.35, fontWeight: 400 }}>
                Fill in your details below for instant brochure & floor plans via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <div>
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter your full name" 
                  className="form-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210" 
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">Email (Optional)</label>
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                <div>
                  <label className="form-label">Date (Optional)</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">Time Slot (Optional)</label>
                  <select 
                    className="form-input"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  >
                    <option>Morning (10 AM - 1 PM)</option>
                    <option>Afternoon (1 PM - 4 PM)</option>
                    <option>Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '0.35rem' }}>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.65rem', fontSize: '0.76rem', fontWeight: 600, letterSpacing: '0.6px' }}>
                  CONFIRM & REQUEST CALLBACK
                </button>
              </div>

              <div style={{ fontSize: '0.65rem', color: '#94a3b8', textAlign: 'center', marginTop: '0.15rem', fontWeight: 400 }}>
                🔒 Your privacy is protected. We never spam.
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
