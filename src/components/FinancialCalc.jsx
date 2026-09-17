import React, { useState } from 'react';
import { Calculator, TrendingDown, DollarSign, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { compareLendingOptions } from '../utils/emiCalculator';
import { TRANSLATIONS } from '../data/translations';

export default function FinancialCalc({ defaultScheme, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [principal, setPrincipal] = useState(defaultScheme ? defaultScheme.maxLoanAmount / 2 : 1000000);
  const [tenureYears, setTenureYears] = useState(defaultScheme ? defaultScheme.tenureYears : 5);
  const [concessionalRate, setConcessionalRate] = useState(defaultScheme ? defaultScheme.concessionalRate : 6.0);
  const [commercialRate, setCommercialRate] = useState(12.5);
  const [subsidyPercent, setSubsidyPercent] = useState(defaultScheme ? defaultScheme.subsidyPercentage : 20);

  const comparison = compareLendingOptions(
    principal,
    concessionalRate,
    commercialRate,
    tenureYears,
    subsidyPercent
  );

  return (
    <div style={{ padding: '1rem 0' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#fff7ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ea580c'
          }}>
            <Calculator size={20} />
          </div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#0f172a' }}>{t.calcTitle}</h2>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
          {t.calcSubtitle}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(400px, 1.3fr)', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Sliders and Controls */}
        <div className="gov-card" style={{ padding: '1.6rem', background: '#ffffff', border: '1px solid #fed7aa' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: '#ea580c', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Loan & Scheme Parameters</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {/* Principal Amount */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">{t.calcLoanAmount}</label>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#ea580c' }}>
                  ₹{(principal).toLocaleString('en-IN')} ({(principal / 100000).toFixed(1)} Lakhs)
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={principal}
                onChange={(e) => setPrincipal(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#ea580c' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' }}>
                <span>₹50,000 (Micro)</span>
                <span>₹25 Lakhs</span>
                <span>₹50 Lakhs (Max)</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">{t.calcTenure}</label>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e40af' }}>
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#1e40af' }}
              />
            </div>

            {/* Concessional Interest Rate */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label" style={{ color: '#ea580c' }}>
                  {t.concessionalRateLabel}
                </label>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ea580c' }}>
                  {concessionalRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="9.0"
                step="0.5"
                value={concessionalRate}
                onChange={(e) => setConcessionalRate(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#ea580c' }}
              />
            </div>

            {/* Commercial Interest Rate */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">
                  {t.commercialRate}
                </label>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#dc2626' }}>
                  {commercialRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="10.0"
                max="16.0"
                step="0.5"
                value={commercialRate}
                onChange={(e) => setCommercialRate(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#dc2626' }}
              />
            </div>

            {/* Capital Subsidy */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Government Capital Subsidy / Margin Support</label>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#c2410c' }}>
                  {subsidyPercent}% (₹{(comparison.subsidyAmount).toLocaleString('en-IN')})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="5"
                value={subsidyPercent}
                onChange={(e) => setSubsidyPercent(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#c2410c' }}
              />
            </div>

          </div>
        </div>

        {/* Results & Comparative Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {/* Big Savings Card */}
          <div className="gov-card" style={{
            padding: '1.8rem',
            background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
            border: '2px solid #fed7aa',
            boxShadow: '0 4px 14px rgba(234, 88, 12, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Sparkles size={18} color="#ea580c" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#ea580c', letterSpacing: '0.04em' }}>
                Total Financial Benefit for Entrepreneur
              </span>
            </div>

            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ea580c', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              ₹{(comparison.totalFinancialBenefit).toLocaleString('en-IN')}
            </div>

            <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>
              Saved in reduced interest payments and non-refundable government capital subsidy over {tenureYears} years.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid-2">
            
            {/* Commercial Option */}
            <div className="gov-card" style={{ padding: '1.25rem', border: '1px solid #fecaca', background: '#fff' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Commercial Bank Loan
              </div>
              
              <div style={{ marginBottom: '0.8rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.monthlyEmiCommercial}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dc2626' }}>
                  ₹{(comparison.commercial.monthlyEmi).toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div>Interest Rate: <strong>{commercialRate}%</strong></div>
                <div>Total Interest: <strong>₹{(comparison.commercial.totalInterest).toLocaleString('en-IN')}</strong></div>
                <div>Subsidy: <strong>None (0%)</strong></div>
              </div>
            </div>

            {/* Concessional Option */}
            <div className="gov-card" style={{ padding: '1.25rem', border: '1px solid #fed7aa', background: '#fff7ed' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Concessional Gov. Scheme
              </div>
              
              <div style={{ marginBottom: '0.8rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.monthlyEmiConcessional}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ea580c' }}>
                  ₹{(comparison.concessional.monthlyEmi).toLocaleString('en-IN')}
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div>Subsidized Rate: <strong>{concessionalRate}%</strong></div>
                <div>Total Interest: <strong>₹{(comparison.concessional.totalInterest).toLocaleString('en-IN')}</strong></div>
                <div>Subsidy: <strong style={{ color: '#c2410c' }}>₹{(comparison.subsidyAmount).toLocaleString('en-IN')}</strong></div>
              </div>
            </div>

          </div>

          {/* Monthly Savings Bar */}
          <div className="gov-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem', background: '#ffffff', border: '1px solid #fed7aa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
                <TrendingDown size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.monthlySavings}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ea580c' }}>
                  +₹{(comparison.monthlySavings).toLocaleString('en-IN')} / month
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontSize: '0.78rem' }}>
              <CheckCircle2 size={14} color="#ea580c" />
              <span>Debt Service Coverage Ratio (DSCR) &gt; 2.1</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
