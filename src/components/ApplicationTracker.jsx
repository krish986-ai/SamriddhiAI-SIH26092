import React, { useState } from 'react';
import { CheckCircle2, Clock, FileCheck, ArrowRight, ShieldCheck, Download, AlertCircle, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function ApplicationTracker({ applications, onUpdateStatus, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [selectedAppId, setSelectedAppId] = useState(applications[0]?.id || null);
  const [showSanctionModal, setShowSanctionModal] = useState(false);

  const [docChecks, setDocChecks] = useState({
    casteCert: true,
    incomeCert: true,
    dpr: true,
    aadhaar: true,
    quotation: false
  });

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const stages = [
    { key: "Submitted", label: t.stepSubmitted, desc: "Application lodged via SamriddhiAI" },
    { key: "SCA Verification", label: t.stepSCA, desc: "Caste & income verification by State Agency" },
    { key: "Partner Review", label: t.stepPartner, desc: "Technical & financial viability appraisal" },
    { key: "Sanctioned", label: t.stepSanction, desc: "Formal concessional sanction issued" },
    { key: "Disbursed", label: t.stepDisbursed, desc: "Funds credited to beneficiary account" }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case "Submitted": return 0;
      case "SCA Verification": return 1;
      case "Partner Review": return 2;
      case "Sanctioned": return 3;
      case "Disbursed": return 4;
      default: return 1;
    }
  };

  const currentStageIdx = getStageIndex(selectedApp?.status);

  return (
    <div style={{ padding: '1rem 0' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#eff6ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1d4ed8'
          }}>
            <FileCheck size={20} />
          </div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#0f172a' }}>{t.trackerTitle}</h2>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
          Real-time tracking of concessional credit applications across State Channelizing Agencies (SCAs) and Bank Partners.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 2fr)', gap: '1.5rem' }}>
        
        {/* Applications List */}
        <div className="gov-card" style={{ padding: '1.25rem', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#15803d' }}>
            Active Beneficiary Applications
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {applications.map((app) => {
              const isSelected = app.id === selectedApp?.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid #15803d' : '1px solid #e2e8f0',
                    background: isSelected ? '#f0fdf4' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>
                      {app.appId}
                    </span>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                      {app.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem', color: '#0f172a' }}>{app.schemeTitle}</h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
                    <span>Applicant: <strong style={{ color: '#1e293b' }}>{app.applicantName}</strong></span>
                    <span style={{ color: '#15803d', fontWeight: 700 }}>₹{(app.requestedAmount / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Application Detailed View */}
        {selectedApp && (
          <div className="gov-card" style={{ padding: '1.8rem', background: '#ffffff' }}>
            
            {/* Top Detail Card */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem', paddingBottom: '1.2rem', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>
                  {selectedApp.appId}
                </span>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.2rem', color: '#0f172a' }}>{selectedApp.schemeTitle}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Submitted on {selectedApp.submissionDate} | Channel Partner: <strong>{selectedApp.channelPartner || "Delhi DSFDC Central"}</strong>
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Sanction Amount</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803d' }}>
                  ₹{(selectedApp.requestedAmount).toLocaleString('en-IN')}
                </div>
                <button
                  onClick={() => setShowSanctionModal(true)}
                  className="btn btn-secondary"
                  style={{ marginTop: '0.5rem', padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderColor: '#cbd5e1' }}
                >
                  <Download size={13} />
                  <span>Preview Sanction Letter</span>
                </button>
              </div>
            </div>

            {/* Lifecycle Stages */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '1.2rem', color: '#15803d' }}>
                Live Milestone Tracking
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative' }}>
                {stages.map((st, idx) => {
                  const isCompleted = idx <= currentStageIdx;
                  const isCurrent = idx === currentStageIdx;

                  return (
                    <div key={st.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isCompleted ? '#15803d' : '#f1f5f9',
                        color: isCompleted ? '#ffffff' : '#64748b',
                        border: isCompleted ? 'none' : '1.5px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        flexShrink: 0
                      }}>
                        {isCompleted ? <CheckCircle2 size={18} /> : idx + 1}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: isCurrent ? 700 : 600, color: isCompleted ? '#0f172a' : '#94a3b8' }}>
                            {st.label}
                          </span>
                          {isCurrent && (
                            <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                              In Progress
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.15rem 0 0' }}>
                          {st.desc}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Document Verification Checklist */}
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <h4 style={{ fontSize: '0.92rem', color: '#15803d', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} />
                  <span>SCA Document Verification Status</span>
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 600 }}>
                  {Object.values(docChecks).filter(Boolean).length} of 5 Verified
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={docChecks.casteCert}
                    onChange={(e) => setDocChecks({ ...docChecks, casteCert: e.target.checked })}
                    style={{ accentColor: '#15803d' }}
                  />
                  <span>Scheduled Caste Validity Certificate (Digitally Verified by Revenue Dept)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={docChecks.incomeCert}
                    onChange={(e) => setDocChecks({ ...docChecks, incomeCert: e.target.checked })}
                    style={{ accentColor: '#15803d' }}
                  />
                  <span>Income Certificate (Annual household income confirmed &lt; ₹3 Lakhs)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={docChecks.dpr}
                    onChange={(e) => setDocChecks({ ...docChecks, dpr: e.target.checked })}
                    style={{ accentColor: '#15803d' }}
                  />
                  <span>Detailed Project Feasibility Report (DPR / Cashflow Projections)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={docChecks.aadhaar}
                    onChange={(e) => setDocChecks({ ...docChecks, aadhaar: e.target.checked })}
                    style={{ accentColor: '#15803d' }}
                  />
                  <span>Aadhaar & Bank Account Linkage (Aadhaar Enabled Payment System - AePS)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={docChecks.quotation}
                    onChange={(e) => setDocChecks({ ...docChecks, quotation: e.target.checked })}
                    style={{ accentColor: '#15803d' }}
                  />
                  <span>Vendor Quotations / Proforma Invoice for Equipment & Stock</span>
                </label>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* Sanction Letter Modal */}
      {showSanctionModal && selectedApp && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 3000, padding: '1.5rem'
        }}>
          <div className="gov-card" style={{ maxWidth: '620px', width: '100%', padding: '2rem', background: '#ffffff', border: '2px solid #bbf7d0' }}>
            
            <div style={{ textAlign: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.2rem' }}>
              <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>
                GOVERNMENT OF INDIA CONCESSIONAL LENDING SANCTION
              </span>
              <h3 style={{ fontSize: '1.25rem', marginTop: '0.3rem', color: '#0f172a' }}>
                Provisional In-Principle Sanction Order
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Issued via myScheme Samriddhi Platform under National Scheduled Castes Finance & Dev. Corp.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#334155', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Application Reference:</span>
                <strong style={{ color: '#15803d' }}>{selectedApp.appId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Beneficiary Name:</span>
                <strong style={{ color: '#0f172a' }}>{selectedApp.applicantName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Scheme Sanctioned:</span>
                <strong>{selectedApp.schemeTitle}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sanctioned Credit Limit:</span>
                <strong style={{ color: '#15803d' }}>₹{(selectedApp.requestedAmount).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Concessional Interest Rate:</span>
                <strong style={{ color: '#15803d' }}>5.5% p.a. (Subsidized)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Allocated Channel Partner:</span>
                <strong>State Channelizing Agency (SCA) - Nodal Branch</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setShowSanctionModal(false)} className="btn btn-secondary">
                Close
              </button>
              <button onClick={() => { alert("Official PDF download triggered!"); setShowSanctionModal(false); }} className="btn btn-gov-green">
                <Download size={15} />
                <span>Download Official Order</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
