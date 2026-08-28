import React, { useRef, useState } from 'react';
import type { CityInfo } from '../types';
import { MapPin, PhoneCall, Mail, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  cityInfo: CityInfo;
  onNavigate: (path: string) => void;
}

/* Generic camera-outline glyph in lucide's stroke style — lucide-react 1.28 ships no brand icons */
const InstagramGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

interface WatermarkIcon {
  icon: React.ReactNode;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
}

/* Purely decorative background pattern of comms/social glyphs — Contact page only */
const CONTACT_WATERMARKS: WatermarkIcon[] = [
  { icon: <MessageCircle size={90} />, top: '6%', left: '3%', rotate: -12 },
  { icon: <Mail size={110} />, top: '16%', right: '5%', rotate: 10 },
  { icon: <InstagramGlyph size={80} />, top: '42%', left: '2%', rotate: 8 },
  { icon: <Send size={100} />, top: '52%', right: '4%', rotate: -10 },
  { icon: <PhoneCall size={90} />, top: '74%', left: '6%', rotate: 14 },
  { icon: <InstagramGlyph size={120} />, top: '90%', right: '8%', rotate: -6 },
];

const ContactWatermarks: React.FC = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    {CONTACT_WATERMARKS.map((w, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: w.top,
          left: w.left,
          right: w.right,
          color: '#9F783D',
          opacity: 0.07,
          transform: `rotate(${w.rotate}deg)`,
        }}
      >
        {w.icon}
      </div>
    ))}
  </div>
);

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

type FieldName = keyof ContactFormData;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s-]{7,15}$/;

const validateField = (name: FieldName, value: string): string => {
  const trimmed = value.trim();
  switch (name) {
    case 'fullName':
      return trimmed ? '' : 'Please enter your full name';
    case 'phone':
      if (!trimmed) return 'Please enter your mobile number';
      return PHONE_PATTERN.test(trimmed) ? '' : 'Enter a valid mobile number';
    case 'email':
      if (!trimmed) return 'Please enter your email address';
      return EMAIL_PATTERN.test(trimmed) ? '' : 'Enter a valid email address';
    case 'message':
      return trimmed ? '' : 'Tell us a little about your requirement';
    default:
      return '';
  }
};

const FIELD_LABELS: Record<FieldName, string> = {
  fullName: 'Full name',
  phone: 'Mobile number',
  email: 'Email address',
  message: 'Your message',
};

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({ fullName: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement>>>({});

  const handleChange = (name: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: FieldName) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, formData[name]) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: Partial<Record<FieldName, string>> = {};
    (Object.keys(formData) as FieldName[]).forEach((name) => {
      nextErrors[name] = validateField(name, formData[name]);
    });

    const firstInvalid = (Object.keys(nextErrors) as FieldName[]).find((name) => nextErrors[name]);

    setErrors(nextErrors);
    setTouched({ fullName: true, phone: true, email: true, message: true });

    if (firstInvalid) {
      errorSummaryRef.current?.focus();
      return;
    }

    setSubmitted(true);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const invalidFields = (Object.keys(errors) as FieldName[]).filter((name) => errors[name]);

  return (
    <div className="page-enter" style={{ background: '#ffffff', color: '#111827', minHeight: '100vh', paddingBottom: '5rem', position: 'relative' }}>
      <ContactWatermarks />

      {/* Main Container */}
      <div className="container" style={{ paddingTop: '7rem', position: 'relative', zIndex: 1 }}>

        {/* Header Title */}
        <div className="reveal" style={{ marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
          <h1
            className="gold-shimmer-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
              fontWeight: 600,
              marginBottom: '0.75rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Connect with us
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '680px', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
            Explore real estate opportunities, discuss your vision, or simply reach out. Let's build something extraordinary together.
          </p>
        </div>

        {/* 2-Column Section: Dark Green Address Card + Embedded Google Map */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
            marginBottom: '4.5rem',
          }}
        >
          {/* Left Side: Dark Forest Green Card */}
          <div
            className="reveal-left card-tilt"
            style={{
              background: '#00433D',
              color: '#ffffff',
              padding: '3rem 2.5rem',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '2.25rem',
              boxShadow: '0 12px 32px rgba(0, 67, 61, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <MapPin size={26} color="#9F783D" aria-hidden="true" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  Sy No 13, Indian Gas Godown Road, Channasandra, Kadugodi, Bengaluru, Karnataka 560067
                </div>
                <a
                  href="https://maps.app.goo.gl/iwVLu2ZQct2h94TA8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-magnetic"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#9F783D',
                    color: '#ffffff',
                    padding: '0.5rem 1.1rem',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 12px rgba(159, 120, 61, 0.3)',
                  }}
                >
                  <MapPin size={15} aria-hidden="true" />
                  <span>GET DIRECTIONS ON GOOGLE MAPS →</span>
                </a>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <PhoneCall size={24} color="#9F783D" aria-hidden="true" style={{ flexShrink: 0 }} />
              <a href="tel:+919148536320" className="link-glow" style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none' }}>
                +91 91485 36320
              </a>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <Mail size={24} color="#9F783D" aria-hidden="true" style={{ flexShrink: 0 }} />
              <a href="mailto:info@revivaprojects.com" className="link-glow" style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 500, textDecoration: 'none' }}>
                info@revivaprojects.com
              </a>
            </div>
          </div>

          {/* Right Side: Embedded Google Map Feature (Reviva Vintage Valley) */}
          <div className="reveal-right" style={{ borderRadius: '20px', overflow: 'hidden', minHeight: '380px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <iframe
              title="Reviva Vintage Valley Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4414.248520803587!2d77.76903107507673!3d12.986013387330626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0fd89043e97d%3A0xfbf0cc9a4e929e5c!2sReviva%20Vintage%20Valley!5e1!3m2!1sen!2sin!4v1787563205095!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', width: '100%', height: '100%' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        {/* Send Us A Message Form Section */}
        <div className="reveal-scale" style={{ maxWidth: '800px', margin: '0 auto', background: '#fcfbf7', padding: '3rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600, color: '#00433D', marginBottom: '0.5rem' }}>
            Send Us A Message
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Fill out the details below and our sales advisory team will get back to you promptly.
          </p>

          {submitted ? (
            <div
              ref={successRef}
              role="status"
              aria-live="polite"
              tabIndex={-1}
              style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(0, 67, 61, 0.08)', borderRadius: '12px', border: '1px solid #00433D', color: '#00433D', outline: 'none' }}
            >
              <CheckCircle2 size={44} aria-hidden="true" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Thank You for Reaching Out!</h3>
              <p style={{ fontSize: '0.95rem', marginTop: '0.4rem' }}>Your inquiry has been received. Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {invalidFields.length > 0 && (
                <div
                  ref={errorSummaryRef}
                  role="alert"
                  tabIndex={-1}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.65rem',
                    background: 'rgba(185, 28, 28, 0.06)',
                    border: '1px solid rgba(185, 28, 28, 0.3)',
                    borderRadius: '10px',
                    padding: '1rem 1.15rem',
                    outline: 'none',
                  }}
                >
                  <AlertCircle size={20} color="#b91c1c" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 id="contact-error-title" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#b91c1c', marginBottom: '0.35rem' }}>
                      Please fix the following before submitting:
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#b91c1c', fontSize: '0.85rem', lineHeight: 1.7 }}>
                      {invalidFields.map((name) => (
                        <li key={name}>
                          <a
                            href={`#contact-${name}`}
                            style={{ color: '#b91c1c', textDecoration: 'underline' }}
                            onClick={(e) => {
                              e.preventDefault();
                              fieldRefs.current[name]?.focus();
                            }}
                          >
                            {FIELD_LABELS[name]}: {errors[name]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="contact-fullName" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem', letterSpacing: 'var(--letter-spacing-caps)', textTransform: 'uppercase' }}>
                    Full Name *
                  </label>
                  <input
                    id="contact-fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    ref={(el) => { fieldRefs.current.fullName = el ?? undefined; }}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'contact-fullName-error' : undefined}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: `1px solid ${errors.fullName ? '#b91c1c' : '#d1d5db'}`,
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                    className="contact-form-input"
                  />
                  {errors.fullName && (
                    <p id="contact-fullName-error" role="alert" style={{ color: '#b91c1c', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-phone" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem', letterSpacing: 'var(--letter-spacing-caps)', textTransform: 'uppercase' }}>
                    Mobile Number *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    ref={(el) => { fieldRefs.current.phone = el ?? undefined; }}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: `1px solid ${errors.phone ? '#b91c1c' : '#d1d5db'}`,
                      fontSize: '1rem',
                      outline: 'none',
                    }}
                    className="contact-form-input"
                  />
                  {errors.phone && (
                    <p id="contact-phone-error" role="alert" style={{ color: '#b91c1c', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem', letterSpacing: 'var(--letter-spacing-caps)', textTransform: 'uppercase' }}>
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  ref={(el) => { fieldRefs.current.email = el ?? undefined; }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    border: `1px solid ${errors.email ? '#b91c1c' : '#d1d5db'}`,
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                  className="contact-form-input"
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" style={{ color: '#b91c1c', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem', letterSpacing: 'var(--letter-spacing-caps)', textTransform: 'uppercase' }}>
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  ref={(el) => { fieldRefs.current.message = el ?? undefined; }}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    border: `1px solid ${errors.message ? '#b91c1c' : '#d1d5db'}`,
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                  className="contact-form-input"
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" style={{ color: '#b91c1c', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary btn-magnetic"
                style={{
                  background: '#9F783D',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.85rem 2.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  boxShadow: '0 4px 14px rgba(159, 120, 61, 0.3)',
                }}
              >
                Submit Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
