import React from 'react';
import { Sliders, Sparkles, User, DollarSign, Briefcase, MapPin, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function ProfileWizard({
  profile,
  onProfileChange,
  onRunMatch,
  currentLang
}) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // 1-Click Judge Demo Presets
  const demoPersonas = [
    {
      name: "Sunita Devi (SC Woman Artisan)",
      badge: "Micro Credit / 4% Rate",
      data: {
        fullName: "Sunita Devi",
        casteCategory: "SC",
        gender: "Female",
        age: 32,
        annualIncome: 180000,
        businessSector: "Artisan/Handicraft",
        loanRequired: 120000,
        state: "Maharashtra",
        education: "10th Pass",
        hasCasteCertificate: true,
        isRural: true
      }
    },
    {
      name: "Ramesh Kamble (SC Manufacturer)",
      badge: "₹25L Term Loan / Greenfield",
      data: {
        fullName: "Ramesh Kamble",
        casteCategory: "SC",
        gender: "Male",
        age: 38,
        annualIncome: 280000,
        businessSector: "Manufacturing",
        loanRequired: 2500000,
        state: "Delhi",
        education: "Graduate",
        hasCasteCertificate: true,
        isRural: false
      }
    },
    {
      name: "Pooja Selvam (SC Tech Services)",
      badge: "PMEGP / 35% Subsidy",
      data: {
        fullName: "Pooja Selvam",
        casteCategory: "SC",
        gender: "Female",
        age: 26,
        annualIncome: 220000,
        businessSector: "Services",
        loanRequired: 800000,
        state: "Tamil Nadu",
        education: "Diploma / Degree",
        hasCasteCertificate: true,
        isRural: true
      }
    }
  ];

  const handleApplyPreset = (presetData) => {
    Object.keys(presetData).forEach((key) => {
      onProfileChange(key, presetData[key]);
    });
  };

  return (
    <div className="gov-card" style={{ padding: '1.8rem 1.6rem', background: '#ffffff', borderColor: '#fed7aa' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem', flexWrap: 'wrap', gap: '0.8rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#fff7ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ea580c'
          }}>
            <Sliders size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', margin: 0, color: '#0f172a' }}>{t.profileTitle}</h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
              {t.profileDesc}
            </p>
          </div>
        </div>

        {/* 1-Click Judge Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
            Test Personas:
          </span>
          {demoPersonas.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleApplyPreset(p.data)}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderRadius: '9999px', borderColor: '#fed7aa' }}
              title={`Load profile for ${p.name}`}
            >
              <Award size={13} color="#ea580c" />
              <span>{p.name.split(' ')[0]} ({p.badge})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid-3" style={{ gap: '1.2rem', marginBottom: '1.5rem' }}>
        
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">{t.fullName}</label>
          <input
            type="text"
            value={profile.fullName || ""}
            onChange={(e) => onProfileChange("fullName", e.target.value)}
            placeholder="e.g. Ramesh Kamble"
            className="form-control"
            style={{ width: '100%' }}
          />
        </div>

        {/* Social Category (Caste) */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t.casteCategory}</span>
            <span style={{ color: '#ea580c', fontSize: '0.75rem', fontWeight: 600 }}>*SC Concessional Focus</span>
          </label>
          <select
            value={profile.casteCategory}
            onChange={(e) => onProfileChange("casteCategory", e.target.value)}
            className="form-control"
            style={{ width: '100%', borderColor: profile.casteCategory === "SC" ? '#ea580c' : '#cbd5e1' }}
          >
            <option value="SC">Scheduled Caste (SC) - Primary Focus</option>
            <option value="ST">Scheduled Tribe (ST)</option>
            <option value="OBC">Other Backward Class (OBC)</option>
            <option value="General">General / Other</option>
          </select>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="form-label">{t.gender}</label>
          <select
            value={profile.gender}
            onChange={(e) => onProfileChange("gender", e.target.value)}
            className="form-control"
            style={{ width: '100%' }}
          >
            <option value="Male">Male</option>
            <option value="Female">Female (Special 4% Subsidies)</option>
            <option value="Other">Other / Transgender</option>
          </select>
        </div>

        {/* Age */}
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label className="form-label">{t.age}</label>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ea580c' }}>{profile.age} Years</span>
          </div>
          <input
            type="range"
            min="18"
            max="65"
            value={profile.age}
            onChange={(e) => onProfileChange("age", parseInt(e.target.value))}
            style={{ width: '100%', marginTop: '0.5rem', accentColor: '#ea580c' }}
          />
        </div>

        {/* Annual Household Income */}
        <div className="form-group">
          <label className="form-label">{t.annualIncome}</label>
          <input
            type="number"
            step="10000"
            value={profile.annualIncome}
            onChange={(e) => onProfileChange("annualIncome", parseInt(e.target.value) || 0)}
            className="form-control"
            style={{ width: '100%' }}
          />
          <span style={{ fontSize: '0.74rem', color: profile.annualIncome <= 300000 ? '#ea580c' : '#b45309', fontWeight: 500 }}>
            {profile.annualIncome <= 300000 
              ? "✓ Under ₹3L ceiling (Qualifies for NSFDC & Mahila Samriddhi)" 
              : "Above ₹3L (Stand-Up India & PMEGP eligible)"}
          </span>
        </div>

        {/* Enterprise Sector */}
        <div className="form-group">
          <label className="form-label">{t.businessSector}</label>
          <select
            value={profile.businessSector}
            onChange={(e) => onProfileChange("businessSector", e.target.value)}
            className="form-control"
            style={{ width: '100%' }}
          >
            <option value="Manufacturing">Manufacturing (Units, Food Processing, Garments)</option>
            <option value="Services">Services (Tech, Repair, Salon, Logistics, Laundry)</option>
            <option value="Trading">Trading & Retail (Kirana, Wholesale, Supplies)</option>
            <option value="Artisan/Handicraft">Artisan / Handloom / Handicrafts</option>
            <option value="Agri-allied">Agri-Allied (Dairy, Poultry, Fishery)</option>
          </select>
        </div>

        {/* Required Loan Amount */}
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label className="form-label">{t.loanRequired}</label>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ea580c' }}>
              ₹{(profile.loanRequired).toLocaleString('en-IN')}
              {profile.loanRequired >= 100000 && ` (${(profile.loanRequired / 100000).toFixed(1)} Lakhs)`}
            </span>
          </div>
          <input
            type="range"
            min="20000"
            max="5000000"
            step="20000"
            value={profile.loanRequired}
            onChange={(e) => onProfileChange("loanRequired", parseInt(e.target.value))}
            style={{ width: '100%', marginTop: '0.5rem', accentColor: '#ea580c' }}
          />
        </div>

        {/* State / UT */}
        <div className="form-group">
          <label className="form-label">{t.state}</label>
          <select
            value={profile.state}
            onChange={(e) => onProfileChange("state", e.target.value)}
            className="form-control"
            style={{ width: '100%' }}
          >
            <option value="Maharashtra">Maharashtra (MPBCDC)</option>
            <option value="Delhi">Delhi (DSFDC)</option>
            <option value="Tamil Nadu">Tamil Nadu (TAHDCO)</option>
            <option value="Karnataka">Karnataka (Dr. Ambedkar Dev Corp)</option>
            <option value="Uttar Pradesh">Uttar Pradesh (UPSFDC)</option>
            <option value="Punjab">Punjab (PSCLDFC)</option>
            <option value="West Bengal">West Bengal (WBSCSTDFC)</option>
            <option value="Madhya Pradesh">Madhya Pradesh (Sant Ravidas Corp)</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
        </div>

        {/* Caste Certificate Toggle & Rural Checkbox */}
        <div className="form-group" style={{ justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.6rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#1e293b' }}>
              <input
                type="checkbox"
                checked={profile.hasCasteCertificate}
                onChange={(e) => onProfileChange("hasCasteCertificate", e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#ea580c' }}
              />
              <span>{t.hasCasteCertificate}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#1e293b' }}>
              <input
                type="checkbox"
                checked={profile.isRural}
                onChange={(e) => onProfileChange("isRural", e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#ea580c' }}
              />
              <span>Rural Enterprise (Eligible for 35% PMEGP subsidy)</span>
            </label>
          </div>
        </div>

      </div>

      {/* Submit Matcher Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '1.2rem' }}>
        <button
          type="button"
          onClick={onRunMatch}
          className="btn btn-gov-orange"
          style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}
        >
          <Sparkles size={18} />
          <span>{t.findSchemesBtn}</span>
          <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}
