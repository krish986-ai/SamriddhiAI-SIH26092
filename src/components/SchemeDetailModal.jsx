import React from 'react';
import { X, CheckCircle2, FileText, Building2, Percent, Clock, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SchemeDetailModal({
  scheme,
  userProfile,
  onClose,
  onSubmitApplication
}) {
  if (!scheme) return null;

  const handleApply = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onSubmitApplication({
      schemeId: scheme.id,
      schemeTitle: scheme.title,
      applicantName: userProfile.fullName || "Beneficiary Entrepreneur",
      casteCategory: userProfile.casteCategory,
      requestedAmount: userProfile.loanRequired,
      submissionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "SCA Verification"
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1.5rem'
    }}>
      <div className="gov-card" style={{
        maxWidth: '750px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative',
        background: '#ffffff',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            border: 'none',
            color: '#64748b',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-blue">{scheme.category}</span>
            <span className="badge badge-green">Concessional {scheme.concessionalRate}% p.a.</span>
            {scheme.subsidyPercentage > 0 && (
              <span className="badge badge-amber">{scheme.subsidyPercentage}% Subsidy</span>
            )}
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.4rem', color: '#0f172a' }}>{scheme.title}</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Administered by {scheme.nodalAgency} | {scheme.ministry}
          </p>
        </div>

        {/* Key Highlights Grid */}
        <div className="grid-3" style={{ gap: '0.85rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Eligible Categories</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>
              {scheme.targetBeneficiaries.join(', ')} ({scheme.targetGenders.join('/')})
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Max Project Cost</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#15803d', marginTop: '2px' }}>
              ₹{(scheme.maxLoanAmount / 100000).toFixed(1)} Lakhs
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tenure & Moratorium</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e40af', marginTop: '2px' }}>
              Up to {scheme.tenureYears} Years
            </div>
          </div>
        </div>

        {/* Detailed Benefits */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.6rem', color: '#15803d' }}>Key Scheme Benefits</h4>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: '#334155' }}>
            {scheme.keyBenefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* Required Documents Checklist */}
        <div style={{ marginBottom: '1.5rem', background: '#f0fdf4', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#15803d' }}>
            <FileText size={16} />
            <span>Mandatory Document Checklist for SCA Verification</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {scheme.requiredDocuments.map((doc, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#1e293b' }}>
                <CheckCircle2 size={14} color="#15803d" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Authorized Channel Partners */}
        <div style={{ marginBottom: '1.8rem' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Building2 size={16} />
            <span>Approved Channel Partners & Routing</span>
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.5rem' }}>
            Applications are submitted through verified State Channelizing Agencies (SCAs) to prevent misrouting:
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {scheme.channelPartners.map((cp, idx) => (
              <span key={idx} className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                {cp}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.85rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.2rem' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleApply} className="btn btn-gov-green" style={{ padding: '0.65rem 1.4rem' }}>
            <ShieldCheck size={16} />
            <span>Submit Application & Generate Tracking ID</span>
          </button>
        </div>

      </div>
    </div>
  );
}
