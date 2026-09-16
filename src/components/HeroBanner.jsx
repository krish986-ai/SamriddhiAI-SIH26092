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
  Check
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function HeroBanner({ currentLang, onStartMatching, onOpenAssistant, onSelectCategory, selectedCategory }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const categories = [
    { id: 'business', title: 'Business & Entrepreneurship', count: '862 Schemes', icon: Briefcase, bg: '#dcfce7', color: '#15803d' },
    { id: 'banking', title: 'Banking, Financial Services & Insurance', count: '430 Schemes', icon: Landmark, bg: '#fef3c7', color: '#b45309' },
    { id: 'social', title: 'Social Welfare & Empowerment', count: '1,120 Schemes', icon: Users, bg: '#ede9fe', color: '#6d28d9' },
    { id: 'women', title: 'Women and Child', count: '380 Schemes', icon: HeartHandshake, bg: '#fce7f3', color: '#be185d' },
    { id: 'agri', title: 'Agriculture, Rural & Environment', count: '640 Schemes', icon: Sprout, bg: '#e0f2fe', color: '#0369a1' },
    { id: 'skills', title: 'Skills & Employment', count: '410 Schemes', icon: GraduationCap, bg: '#ffedd5', color: '#c2410c' }
  ];

  return (
    <section style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
      
      {/* 1. Official myScheme Main Hero Section */}
      <div style={{
        background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
        padding: '3rem 0 2rem',
        borderBottom: '1px solid #e5e7eb',
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
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#136f38', background: '#dcfce7', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                  #GovtSchemesForYou
                </span>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#1e40af', background: '#dbeafe', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                  #MarginalisedEntrepreneurs
                </span>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#c2410c', background: '#ffedd5', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
                  #DigitalIndia
                </span>
              </div>

              {/* Prime Minister Quote Card */}
              <div className="hero-quote-card" style={{
                background: '#ffffff',
                borderLeft: '4px solid #f97316',
                borderRadius: '0 8px 8px 0',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
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
                Find schemes based on <br />
                <span style={{ color: '#136f38' }}>eligibility</span>
              </h1>

              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.6, marginBottom: '1.75rem', maxWidth: '540px' }}>
                Discover central & state government schemes tailored for Scheduled Caste (SC), ST, OBC, and marginalized entrepreneurs with direct channel partner routing.
              </p>

              {/* Big Green Pill CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button
                  onClick={onStartMatching}
                  className="btn-gov-green"
                  style={{
                    fontSize: '1rem',
                    padding: '0.8rem 1.85rem',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(19, 111, 56, 0.35)'
                  }}
                >
                  <span>Find Schemes For You</span>
                  <ChevronRight size={20} />
                </button>

                <button
                  onClick={onOpenAssistant}
                  className="btn-outline-green"
                  style={{
                    fontSize: '0.92rem',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    border: '2px solid #136f38',
                    fontWeight: 700
                  }}
                >
                  <Bot size={18} color="#136f38" />
                  <span>Ask SchemeMitra AI</span>
                </button>
              </div>

            </div>

            {/* Right Hero Column: Official Illustrated Banner Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="gov-card hero-right-card" style={{
                background: '#ffffff',
                padding: '1.6rem',
                maxWidth: '450px',
                width: '100%',
                borderRadius: '16px',
                border: '1.5px solid #bbf7d0',
                boxShadow: '0 15px 35px -5px rgba(19, 111, 56, 0.12)',
                position: 'relative'
              }}>
                
                {/* Ribbon Tag */}
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: '#136f38',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.85rem',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(19,111,56,0.3)'
                }}>
                  Zero Commission Fees
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#136f38' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#111827' }}>SamriddhiAI Triage Engine</div>
                    <div style={{ fontSize: '0.76rem', color: '#6b7280' }}>National Apex Corporation Verification</div>
                  </div>
                </div>

                {/* 3 Core Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  
                  <div className="hero-highlight-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', background: '#f8fafc', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <CheckCircle2 size={18} color="#136f38" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.84rem', color: '#334155' }}>
                      <strong style={{ color: '#0f172a' }}>4% - 6% Concessional Lending:</strong> Up to ₹50 Lakhs project loan directly through NSFDC & NBCFDC.
                    </div>
                  </div>

                  <div className="hero-highlight-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', background: '#f8fafc', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <CheckCircle2 size={18} color="#136f38" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.84rem', color: '#334155' }}>
                      <strong style={{ color: '#0f172a' }}>Up to 35% Capital Subsidy:</strong> Direct Benefit Transfer (DBT) capital grants under PMEGP.
                    </div>
                  </div>

                  <div className="hero-highlight-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', background: '#f8fafc', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <CheckCircle2 size={18} color="#136f38" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.84rem', color: '#334155' }}>
                      <strong style={{ color: '#0f172a' }}>Pre-vetted SCA Routing:</strong> Direct connection to State Channelizing Agencies with zero rejections.
                    </div>
                  </div>

                </div>

                {/* Footer status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span className="live-indicator"></span>
                    <span>AI Engine Active</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#136f38' }}>100% Verified Schemes</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. Official 3 Mint-Green Statistics Cards */}
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
              background: '#e8f5e9',
              border: '1.5px solid #c8e6c9',
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
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#136f38', lineHeight: 1 }}>
                  4,770+
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0e5a2c', marginTop: '0.35rem' }}>
                  Total Schemes
                </div>
                <div style={{ fontSize: '0.76rem', color: '#2e7d32', marginTop: '0.15rem' }}>
                  Discover all central & state schemes →
                </div>
              </div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#136f38', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                <Landmark size={24} />
              </div>
            </div>

            {/* Card 2: Central Schemes */}
            <div style={{
              background: '#e8f5e9',
              border: '1.5px solid #c8e6c9',
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
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#136f38', lineHeight: 1 }}>
                  710+
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0e5a2c', marginTop: '0.35rem' }}>
                  Central Schemes
                </div>
                <div style={{ fontSize: '0.76rem', color: '#2e7d32', marginTop: '0.15rem' }}>
                  NSFDC, MSME, Stand-Up India →
                </div>
              </div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#136f38', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                <Building2 size={24} />
              </div>
            </div>

            {/* Card 3: States / UTs Schemes */}
            <div style={{
              background: '#e8f5e9',
              border: '1.5px solid #c8e6c9',
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
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#136f38', lineHeight: 1 }}>
                  4,060+
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0e5a2c', marginTop: '0.35rem' }}>
                  States / UTs Schemes
                </div>
                <div style={{ fontSize: '0.76rem', color: '#2e7d32', marginTop: '0.15rem' }}>
                  Across 36 States & Union Territories →
                </div>
              </div>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#136f38', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
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
                <button style={{ border: 'none', background: '#136f38', color: '#fff', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
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

                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#136f38', marginBottom: '0.25rem' }}>
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

          {/* 4. "Easy steps to apply for Government Schemes" */}
          <div id="how-it-works" style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '2rem 1.75rem'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827', marginBottom: '0.35rem' }}>
                Easy steps to apply for Government Schemes
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
                Follow 3 simple AI-assisted steps to find, evaluate, and route your application
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              
              {/* Step 1 */}
              <div className="gov-card" style={{ padding: '1.4rem', borderTop: '3px solid #136f38' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#dcfce7', color: '#136f38', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
                    1
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#136f38' }}>
                      1. Enter Details
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Citizen Profile</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                  Enter your social category (SC/ST/OBC), annual income, gender, state, and target enterprise budget.
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
                      2. Search & Match
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>AI Rule Matching</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                  Our AI engine matches you against NSFDC, Stand-Up India & PMEGP rules, scoring eligibility from 0 to 100%.
                </p>
              </div>

              {/* Step 3 */}
              <div className="gov-card" style={{ padding: '1.4rem', borderTop: '3px solid #b45309' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>
                    3
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#b45309' }}>
                      3. Select & Apply
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Direct SCA Dispatch</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                  Select the optimal concessional scheme and dispatch your application directly to your local State Channelizing Agency.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
