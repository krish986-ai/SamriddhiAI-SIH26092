import React, { useState } from 'react';
import { Award, CheckCircle, AlertCircle, Percent, ArrowRight, ShieldCheck, MapPin, Calculator, FileText, ExternalLink, Filter, RotateCcw, ChevronDown, Check, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function SchemeResults({
  schemes,
  onSelectScheme,
  onOpenCalculator,
  onOpenGeoLocator,
  currentLang
}) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Local Filter States
  const [selectedType, setSelectedType] = useState('all'); // all, central, state
  const [casteFilter, setCasteFilter] = useState('all');
  const [sortBy, setSortBy] = useState('score'); // score, rate, maxAmount

  // Filter schemes
  let filteredSchemes = [...schemes];

  if (selectedType === 'central') {
    filteredSchemes = filteredSchemes.filter(s => s.nodalAgency && (s.nodalAgency.includes('National') || s.nodalAgency.includes('Ministry') || s.nodalAgency.includes('Central')));
  } else if (selectedType === 'state') {
    filteredSchemes = filteredSchemes.filter(s => s.nodalAgency && !s.nodalAgency.includes('Central') && !s.nodalAgency.includes('National'));
  }

  if (casteFilter !== 'all') {
    filteredSchemes = filteredSchemes.filter(s => s.category.includes(casteFilter) || s.category.includes('All') || s.targetBeneficiaries?.includes(casteFilter));
  }

  if (sortBy === 'rate') {
    filteredSchemes.sort((a, b) => a.concessionalRate - b.concessionalRate);
  } else if (sortBy === 'maxAmount') {
    filteredSchemes.sort((a, b) => b.maxLoanAmount - a.maxLoanAmount);
  } else {
    filteredSchemes.sort((a, b) => b.matchScore - a.matchScore);
  }

  const handleResetFilters = () => {
    setSelectedType('all');
    setCasteFilter('all');
    setSortBy('score');
  };

  return (
    <div style={{ marginTop: '2.5rem' }}>
      
      {/* 2-Column Discovery Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 280px) 1fr', gap: '1.75rem', alignItems: 'start' }}>
        
        {/* Left Column: Sticky Sidebar Filter */}
        <aside className="gov-card" style={{ padding: '1.25rem', position: 'sticky', top: '90px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800, fontSize: '0.98rem', color: '#111827' }}>
              <Filter size={18} color="#ea580c" />
              <span>Filter By</span>
            </div>

            <button
              onClick={handleResetFilters}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#ea580c',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <RotateCcw size={12} />
              <span>Reset All</span>
            </button>
          </div>

          {/* Filter 1: Scheme Jurisdiction */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
              Jurisdiction
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { id: 'all', label: 'All Schemes (4,770+)' },
                { id: 'central', label: 'Central Ministries & Apex (NSFDC/MoSJE)' },
                { id: 'state', label: 'State Channelizing Agencies (SCAs)' }
              ].map(item => (
                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#4b5563', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="jurisdiction"
                    checked={selectedType === item.id}
                    onChange={() => setSelectedType(item.id)}
                    style={{ accentColor: '#ea580c' }}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 2: Target Caste Focus */}
          <div style={{ marginBottom: '1.25rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
              Target Social Category
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'SC', label: 'Scheduled Caste (SC)' },
                { id: 'ST', label: 'Scheduled Tribe (ST)' },
                { id: 'OBC', label: 'Other Backward Class (OBC)' },
                { id: 'Women', label: 'Women Entrepreneurs' }
              ].map(item => (
                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#4b5563', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="caste"
                    checked={casteFilter === item.id}
                    onChange={() => setCasteFilter(item.id)}
                    style={{ accentColor: '#ea580c' }}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Verification Guarantee badge */}
          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '8px', padding: '0.75rem', marginTop: '1.5rem', fontSize: '0.75rem', color: '#ea580c', lineHeight: 1.4 }}>
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
              <ShieldCheck size={14} />
              <span>Official SIH26092 Assurance</span>
            </div>
            100% verified against MoSJE & NSFDC statutory guidelines with zero intermediary commission fees.
          </div>

        </aside>

        {/* Right Column: Scheme Results Listing */}
        <div>
          
          {/* Top Results Bar with Tabs and Sort */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.85rem' }}>
            
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Matching Government Schemes</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ea580c', background: '#ffedd5', border: '1px solid #fed7aa', padding: '0.15rem 0.55rem', borderRadius: '9999px' }}>
                  {filteredSchemes.length} Available
                </span>
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>
                Pre-vetted by BHUSEWA AI Logic Engine based on your profile & budget
              </p>
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  background: '#ffffff',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="score">AI Match Score (Highest)</option>
                <option value="rate">Interest Rate (Lowest %)</option>
                <option value="maxAmount">Max Funding (Highest ₹)</option>
              </select>
            </div>

          </div>

          {/* Schemes Cards Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredSchemes.map((scheme) => {
              const isHigh = scheme.matchScore >= 80;
              const scoreColor = isHigh ? "#ea580c" : scheme.matchScore >= 60 ? "#f97316" : "#6b7280";
              const scoreBg = isHigh ? "#fff7ed" : scheme.matchScore >= 60 ? "#fffbeb" : "#f3f4f6";

              return (
                <div
                  key={scheme.id}
                  className="gov-card"
                  style={{
                    padding: '1.5rem',
                    borderLeft: `4px solid ${scoreColor}`,
                    position: 'relative'
                  }}
                >
                  
                  {/* Top Ministry Badge & Match Score */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '0.75rem' }}>
                    
                    <div style={{ flex: 1, minWidth: '260px' }}>
                      
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                        {scheme.nodalAgency || "Ministry of Social Justice and Empowerment"}
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                        {scheme.title}
                      </h3>

                      {/* Tag Badges */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                        <span className="badge badge-orange">
                          {scheme.category}
                        </span>
                        {scheme.isHighlyRecommended && (
                          <span className="badge badge-orange" style={{ background: '#ea580c', color: '#ffffff', border: 'none' }}>
                            ★ Recommended Match
                          </span>
                        )}
                        <span className="badge badge-blue">
                          Concessional {scheme.concessionalRate}% p.a.
                        </span>
                        {scheme.subsidyPercentage > 0 && (
                          <span className="badge badge-orange">
                            {scheme.subsidyPercentage}% Capital Grant
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: '0.86rem', color: '#4b5563', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                        {scheme.description}
                      </p>

                    </div>

                    {/* Score Badge */}
                    <div style={{
                      background: scoreBg,
                      border: `1.5px solid ${scoreColor}40`,
                      borderRadius: '12px',
                      padding: '0.65rem 1rem',
                      textAlign: 'center',
                      minWidth: '105px'
                    }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
                        {scheme.matchScore}%
                      </div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: scoreColor, marginTop: '0.2rem' }}>
                        {isHigh ? "Eligible Match" : "Match Score"}
                      </div>
                    </div>

                  </div>

                  {/* 4 Key Benefits Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '0.75rem',
                    background: '#f8fafc',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #fed7aa',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>Concessional Rate</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ea580c' }}>
                        {scheme.concessionalRate}% p.a.
                        <span style={{ fontSize: '0.72rem', color: '#9ca3af', marginLeft: '5px', textDecoration: 'line-through' }}>
                          {scheme.commercialMarketRate}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>Max Funding Limit</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e40af' }}>
                        ₹{(scheme.maxLoanAmount / 100000).toFixed(1)} Lakhs
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>Capital Subsidy</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#c2410c' }}>
                        {scheme.subsidyPercentage > 0 ? `${scheme.subsidyPercentage}% Subsidy` : "Collateral-Free"}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>Repayment Tenure</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#374151' }}>
                        Up to {scheme.tenureYears} Years
                      </div>
                    </div>
                  </div>

                  {/* Why You Qualify Strip */}
                  <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: '0.75rem 0.9rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', fontWeight: 700, color: '#ea580c', marginBottom: '0.3rem' }}>
                      <CheckCircle size={14} />
                      <span>Why your profile matches:</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#374151', display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem' }}>
                      {scheme.qualificationReasons?.slice(0, 2).map((r, idx) => (
                        <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          • {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem' }}>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => onOpenCalculator(scheme)}
                        className="btn-secondary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                      >
                        <Calculator size={14} color="#ea580c" />
                        <span>Calculate EMI Savings</span>
                      </button>

                      <button
                        onClick={() => onOpenGeoLocator(scheme)}
                        className="btn-secondary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                      >
                        <MapPin size={14} color="#1e40af" />
                        <span>Find SCA Partner</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="btn-gov-orange"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.84rem' }}
                    >
                      <span>View Details & Apply</span>
                      <ArrowRight size={15} />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
