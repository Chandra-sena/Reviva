import { useState } from 'react';
import { Calculator } from 'lucide-react';

export const EmiCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(20000000); // 2 Cr
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // Calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  const monthlyEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  return (
    <section id="calculator" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Calculator size={18} color="var(--primary-accent)" />
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
              Financial Planning
            </span>
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Home Loan <span className="gold-glow-text">EMI Calculator</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Estimate your monthly home loan repayments, down payment requirement, and interest breakdown for your luxury home.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          
          {/* Controls Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Property Price */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label className="form-label">Property Value</label>
                <span style={{ fontWeight: 700, color: 'var(--primary-accent)' }}>{formatCurrency(propertyPrice)}</span>
              </div>
              <input 
                type="range" 
                min="5000000" 
                max="150000000" 
                step="2500000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-accent)', cursor: 'pointer' }}
              />
            </div>

            {/* Down Payment Percent */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label className="form-label">Down Payment ({downPaymentPercent}%)</label>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(downPaymentAmount)}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="60" 
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-accent)', cursor: 'pointer' }}
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label className="form-label">Interest Rate (% p.a.)</label>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{interestRate}%</span>
              </div>
              <input 
                type="range" 
                min="7.0" 
                max="12.0" 
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-accent)', cursor: 'pointer' }}
              />
            </div>

            {/* Tenure */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label className="form-label">Loan Tenure (Years)</label>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tenureYears} Years</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-accent)', cursor: 'pointer' }}
              />
            </div>

          </div>

          {/* Results Summary Column */}
          <div 
            style={{
              background: '#111827',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid rgba(159, 120, 61, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Estimated Monthly EMI
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0 1.5rem 0' }}>
                <span className="gold-glow-text">₹ {monthlyEmi.toLocaleString('en-IN')}</span>
                <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}> / month</span>
              </div>

              {/* Progress visual bar */}
              <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden', display: 'flex', marginBottom: '1.5rem' }}>
                <div style={{ width: `${(loanAmount / totalPayment) * 100}%`, background: 'var(--primary-accent)' }} title="Principal" />
                <div style={{ width: `${(totalInterest / totalPayment) * 100}%`, background: '#38bdf8' }} title="Interest" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', background: 'var(--primary-accent)', borderRadius: '50%' }}></span>
                    Principal Loan Amount:
                  </span>
                  <strong style={{ color: '#ffffff' }}>{formatCurrency(loanAmount)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', background: '#38bdf8', borderRadius: '50%' }}></span>
                    Total Payable Interest:
                  </span>
                  <strong style={{ color: '#ffffff' }}>{formatCurrency(totalInterest)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <span style={{ color: '#cbd5e1' }}>Total Amount Payable:</span>
                  <strong style={{ color: '#e5b869', fontSize: '1.05rem' }}>{formatCurrency(totalPayment)}</strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button 
                onClick={() => alert(`Pre-approved loan consultation request submitted for loan amount ${formatCurrency(loanAmount)}`)}
                className="btn-outline" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                CHECK LOAN ELIGIBILITY
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
