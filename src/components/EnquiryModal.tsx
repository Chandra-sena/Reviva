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
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '540px',
          padding: '2.5rem',
          position: 'relative'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle2 size={60} color="var(--primary-accent)" style={{ margin: '0 auto 1.5rem auto' }} />
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>Site Visit Request Confirmed!</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Thank you <strong>{formData.fullName}</strong>. Our luxury sales advisor for {property ? property.name : cityName} will call you shortly on <strong>{formData.phone}</strong> to confirm your slot.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              DONE
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge-accent" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                {property ? `Enquiring for: ${property.name}` : `Reviva ${cityName} VIP Concierge`}
              </span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                Schedule Private Site Visit
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Fill in your details below to get instant e-brochure & floor plans via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your full name" 
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@example.com" 
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Preferred Date</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label">Time Slot</label>
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

              <div style={{ marginTop: '0.5rem' }}>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}>
                  CONFIRM & REQUEST CALLBACK
                </button>
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.5rem' }}>
                🔒 Your privacy is protected. We will never spam or share your contact details.
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
