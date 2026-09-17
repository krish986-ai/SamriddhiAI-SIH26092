import React from 'react';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Award, 
  ShieldAlert, 
  ArrowRight, 
  UserCheck, 
  CheckCircle2, 
  ChevronRight, 
  Briefcase, 
  Landmark, 
  Users, 
  Sprout, 
  GraduationCap, 
  HeartHandshake, 
  FileCheck, 
  Cpu, 
  Building2, 
  Bot, 
  MessageSquare,
  ShieldCheck,
  Zap,
  Check,
  Calculator,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function HeroBanner({ currentLang, onStartMatching, onOpenAssistant, onSelectCategory, selectedCategory }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const categories = [
    { id: 'business', title: 'Business & Entrepreneurship', count: '862 Schemes', icon: Briefcase, bg: '#fff7ed', color: '#ea580c' },
    { id: 'banking', title: 'Banking, Financial Services & Loans', count: '430 Schemes', icon: Landmark, bg: '#fef3c7', color: '#b45309' },
    { id: 'social', title: 'Social Welfare & Empowerment', count: '1,120 Schemes', icon: Users, bg: '#ede9fe', color: '#6d28d9' },
    { id: 'women', title: 'Women & Child Development', count: '380 Schemes', icon: HeartHandshake, bg: '#fce7f3', color: '#be185d' },
    { id: 'agri', title: 'Agriculture, Rural & Environment', count: '640 Schemes', icon: Sprout, bg: '#e0f2fe', color: '#0369a1' },
    { id: 'skills', title: 'Education, Skills & Higher Studies', count: '410 Schemes', icon: GraduationCap, bg: '#ffedd5', color: '#c2410c' }
  ];

  return (
    <section style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      
      {/* 1. Official BHUSEWA Main Hero Section */}
      <div style={{
        background: 'linear-gradient(180deg, #fff7ed 0%, #ffffff 100%)',
        padding: '3rem 0 2rem',
        borderBottom: '1px solid #fed7aa',
        position: 'relative'
      }}>
        <div className="container">
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            
            {/* Left Hero Column */}
            <div>
              
              {/* Hashtag strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#ea580c', background: '#ffedd5', border: '1px solid #fed7aa', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                  #SIH26092
                </span>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#1e40af', background: '#dbeafe', border: '1px solid #bfdbfe', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                  #TeamInnovision
                </span>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#c2410c', background: '#ffedd5', border: '1px solid #fed7aa', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                  #SmartAutomation
                </span>
              </div>

              {/* Prime Minister Quote Card */}
              <div className="hero-quote-card" style={{
                background: '#ffffff',
                borderLeft: '4px solid #ea580c',
                borderRadius: '0 8px 8px 0',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                boxShadow: '0 2px 8px rgba(234, 88, 12, 0.08)'
              }}>
                <div style={{ fontStyle: 'italic', color: '#475569', fontSize: '0.86rem', lineHeight: 1.5 }}>
                  “Digital India means opportunity for all, facility for all and participation of all.”
                </div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.78rem', marginTop: '0.3rem' }}>
                  — Hon'ble Prime Minister Narendra Modi
                </div>
              </div>

              {/* Primary Headline */}
              <h1 style={{ fontSize: '2.6rem', color: '#111827', lineHeight: 1.16, marginBottom: '0.85rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                AI-Driven Scheme Matching for <br />
                <span style={{ color: '#ea580c' }}>Marginalised Entrepreneurs</span>
              </h1>

              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.6, marginBottom: '1.75rem', maxWidth: '540px' }}>
                <strong>BHUSEWA</strong> connects Scheduled Caste (SC), ST, OBC, and women entrepreneurs to apex concessional credit (4%–6%), capital subsidies (up to 35%), and verified State Channelizing Agencies.
              </p>

              {/* Big Orange Pill CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button
                  onClick={onStartMatching}
                  className="btn-gov-orange"
                  style={{
                    fontSize: '1rem',
                    padding: '0.8rem 1.85rem',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)'
                  }}
                >
                  <span>Find Schemes For You</span>
                  <ChevronRight size={20} />
                </button>

                <button
                  onClick={onOpenAssistant}
                  className="btn-outline-orange"
                  style={{
                    fontSize: '0.92rem',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    border: '2px solid #ea580c',
                    fontWeight: 700
                  }}
                >
                  <Bot size={18} color="#ea580c" />
                  <span>Ask BhuSewa AI</span>
                </button>
              </div>

            </div>

            {/* Right Hero Column: Official Illustrated Banner Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="gov-card hero-right-card" style={{
                background: '#ffffff',
                padding: '1.6rem',
                maxWidth: '460px',
                width: '100%',
                borderRadius: '16px',
                border: '1.5px solid #fed7aa',
                boxShadow: '0 15px 35px -5px rgba(234, 88, 12, 0.15)',
                position: 'relative'
              }}>
                
                {/* Ribbon Tag */}
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: '#ea580c',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.85rem',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(234,88,12,0.3)'
                }}>
                  Zero Intermediary Leakage
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#111827' }}>BHUSEWA AI Triage Engine</div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Deterministic Rule Matching & Geo-Spatial Routing</div>
                  </div>
                </div>

                {/* 3 Core Highlights (From SIH26092 PDF Architecture) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  
                  <div className="hero-highlight-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', background: '#f8fafc', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                    <CheckCircle2 size={18} color="#ea580c" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.84rem', color: '#334155' }}>
                      <strong style={{ color: '#0f172a' }}>Logic-Engine Scheme Matching:</strong> Instant eligibility check across NSFDC, NBCFDC, MoSJE & Stand-Up India.
                    </div>
                  </div>

                  <div className="hero-highlight-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', background: '#f8fafc', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                    <CheckCircle2 size={18} color="#ea580c" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.84rem', color: '#334155' }}>
                      <strong style={{ color: '#0f172a' }}>Dynamic Financial Calculator:</strong> 4%–6% concessional EMI, moratorium, and 35% DBT capital subsidy computation.
                    </div>
                  </div>

                  <div className="hero-highlight-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', background: '#f8fafc', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                    <CheckCircle2 size={18} color="#ea580c" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.84rem', color: '#334155' }}>
                      <strong style={{ color: '#0f172a' }}>Geo-Spatial SCA Partner Locator:</strong> Direct interactive mapping to State Channelizing Agencies across 36 states/UTs.
                    </div>
                  </div>

                </div>

                {/* Footer status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span className="live-indicator"></span>
                    <span>AI Engine Live</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#ea580c' }}>100% Verified Schemes</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. Official 3 Orange-Gold Statistics Cards */}
      <div style={{ background: '#ffffff', padding: '1.75rem 0 1.25rem' }}>
        <div className="container">
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}>
            
            {/* Card 1: Total Schemes */}
            <div style={{
              background: '#fff7ed',
              border: '1.5px solid #fed7aa',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
            onClick={onStartMatching}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ea580c', lineHeight: 1 }}>
                  4,770+
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c2410c', marginTop: '0.35rem' }}>
                  Total Schemes
                </div>
                <div style={{ fontSize: '0.76rem', color: '#9a3412', marginTop: '0.15rem' }}>
                  Discover all central & state schemes →
                </div>
              </div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c', boxShadow: '0 2px 6px rgba(234,88,12,0.12)' }}>
                <Landmark size={24} />
              </div>
            </div>

            {/* Card 2: Central Schemes */}
            <div style={{
              background: '#fff7ed',
              border: '1.5px solid #fed7aa',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
            onClick={onStartMatching}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ea580c', lineHeight: 1 }}>
                  710+
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c2410c', marginTop: '0.35rem' }}>
                  Central Schemes
                </div>
                <div style={{ fontSize: '0.76rem', color: '#9a3412', marginTop: '0.15rem' }}>
                  NSFDC, MSME, Stand-Up India, MoSJE →
                </div>
              </div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c', boxShadow: '0 2px 6px rgba(234,88,12,0.12)' }}>
                <Building2 size={24} />
              </div>
            </div>

            {/* Card 3: States / UTs Schemes */}
            <div style={{
              background: '#fff7ed',
              border: '1.5px solid #fed7aa',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
            onClick={onStartMatching}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ea580c', lineHeight: 1 }}>
                  4,060+
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c2410c', marginTop: '0.35rem' }}>
                  States / UTs Schemes
                </div>
                <div style={{ fontSize: '0.76rem', color: '#9a3412', marginTop: '0.15rem' }}>
                  Across 36 States & Union Territories →
                </div>
              </div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c', boxShadow: '0 2px 6px rgba(234,88,12,0.12)' }}>
                <Users size={24} />
              </div>
            </div>

          </div>

          {/* 3. Official Category Navigation Bar & Grid */}
          <div style={{ marginBottom: '2.5rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827' }}>
                  Find schemes based on categories
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#6b7280' }}>
                  Explore government schemes across key entrepreneurship and development sectors
                </p>
              </div>

              {/* Tab Pills */}
              <div style={{ display: 'flex', gap: '0.35rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '9999px' }}>
                <button style={{ border: 'none', background: '#ea580c', color: '#fff', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                  Categories
                </button>
                <button style={{ border: 'none', background: 'transparent', color: '#475569', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                  States / UTs
                </button>
                <button style={{ border: 'none', background: 'transparent', color: '#475569', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                  Central Ministries
                </button>
              </div>
            </div>

            {/* 6-Column Category Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))',
              gap: '1rem'
            }}>
              {categories.map(cat => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    className={`category-card ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat.id);
                      onStartMatching();
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: cat.bg,
                      color: cat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.65rem'
                    }}>
                      <Icon size={24} />
                    </div>

                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#ea580c', marginBottom: '0.25rem' }}>
                      {cat.count}
                    </span>

                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', textAlign: 'center', lineHeight: 1.3 }}>
                      {cat.title}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* 4. "Easy steps to apply for Government Schemes" (Aligned with SIH26092 PDF Architecture) */}
          <div id="how-it-works" style={{
            background: '#f8fafc',
            border: '1px solid #fed7aa',
            borderRadius: '16px',
            padding: '2rem 1.75rem'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827', marginBottom: '0.35rem' }}>
                End-to-End Application & Matching Workflow (SIH26092)
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
                SC Beneficiary ➔ AI Logic-Engine Matching ➔ Concessional Feasibility ➔ Channel Partner / SCA Dispatch
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              
              {/* Step 1 */}
              <div className="gov-card" style={{ padding: '1.4rem', borderTop: '3px solid #ea580c' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
                    1
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ea580c' }}>
                      1. Beneficiary Registration
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Profile & Business Input</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                  Enter social category (SC/ST/OBC), annual income, gender, enterprise sector, and target capital requirement in any native Indian dialect.
                </p>
              </div>

              {/* Step 2 */}
              <div className="gov-card" style={{ padding: '1.4rem', borderTop: '3px solid #1d4ed8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
                    2
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1d4ed8' }}>
                      2. Logic-Engine Matching
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Multi-Criteria Rule Evaluation</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                  BHUSEWA evaluates criteria against NSFDC, NBCFDC, MoSJE, and Stand-Up India rules, computing 0%–100% eligibility score with zero hallucination.
                </p>
              </div>

              {/* Step 3 */}
              <div className="gov-card" style={{ padding: '1.4rem', borderTop: '3px solid #c2410c' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fed7aa', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
                    3
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#c2410c' }}>
                      3. Dynamic Calc & SCA Dispatch
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Geo-Spatial Partner Routing</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                  Simulate concessional loan EMIs at 4%–6%, compute 35% capital subsidies, and dispatch directly to local State Channelizing Agencies (SCAs).
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
