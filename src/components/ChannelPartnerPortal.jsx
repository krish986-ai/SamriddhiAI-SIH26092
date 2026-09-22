import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Clock, XCircle, FileText, TrendingDown, Users, DollarSign, RefreshCw, Sparkles, Filter } from 'lucide-react';

export default function ChannelPartnerPortal({ applications, onUpdateAppStatus }) {
  const [filterScheme, setFilterScheme] = useState("All");
  const [syncing, setSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState(null);
  const [selectedDossier, setSelectedDossier] = useState(null);

  const [triageList, setTriageList] = useState([
    {
      id: "APP-SIH-8401",
      applicantName: "Sunita Devi",
      category: "SC (Woman Artisan)",
      scheme: "Mahila Samriddhi Yojana",
      amount: 120000,
      matchScore: 98,
      status: "SCA Verification",
      date: "15 Sep 2026",
      dscrRatio: "2.4x"
    },
    {
      id: "APP-SIH-8402",
      applicantName: "Ramesh Kamble",
      category: "SC",
      scheme: "NSFDC Term Loan Scheme",
      amount: 2500000,
      matchScore: 94,
      status: "Partner Review",
      date: "14 Sep 2026",
      dscrRatio: "1.9x"
    },
    {
      id: "APP-SIH-8403",
      applicantName: "Pooja Selvam",
      category: "SC (Rural)",
      scheme: "Prime Minister's Employment Gen. (PMEGP)",
      amount: 800000,
      matchScore: 96,
      status: "Sanctioned",
      date: "12 Sep 2026",
      dscrRatio: "2.8x"
    },
    {
      id: "APP-SIH-8404",
      applicantName: "Anand Prakash",
      category: "SC",
      scheme: "NSFDC Micro-Credit Finance (MCF)",
      amount: 140000,
      matchScore: 91,
      status: "Disbursed",
      date: "10 Sep 2026",
      dscrRatio: "3.1x"
    },
    {
      id: "APP-SIH-8405",
      applicantName: "Vikram Jadhav",
      category: "SC (Greenfield)",
      scheme: "Stand-Up India Scheme",
      amount: 3500000,
      matchScore: 89,
      status: "Partner Review",
      date: "16 Sep 2026",
      dscrRatio: "2.2x"
    }
  ]);

  const handleAction = (id, newStatus) => {
    setTriageList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    if (onUpdateAppStatus) {
      onUpdateAppStatus(id, newStatus);
    }
  };

  const filtered = triageList.filter(item => {
    return filterScheme === "All" || item.scheme.includes(filterScheme);
  });

  return (
    <div style={{ padding: '1rem 0' }}>
      
      {/* Top Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-orange">
              <ShieldCheck size={14} /> Official Nodal Officer View
            </span>
            <span className="badge badge-blue">
              State Channelizing Agency (SCA) & Bank Nodal Desk (SIH26092)
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', margin: 0, color: '#0f172a' }}>
            BHUSEWA Channel Partner Command & Triage Portal
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Empowering nodal officers to review pre-vetted applications, issue concessional sanctions, and monitor fund deployment.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
          <button 
            onClick={() => {
              setSyncing(true);
              setTimeout(() => {
                setSyncing(false);
                setSyncNotice("Core banking synchronization complete: 5 records updated with NSFDC central core server.");
                setTimeout(() => setSyncNotice(null), 4000);
              }, 800);
            }}
            disabled={syncing}
            className="btn btn-secondary" 
            style={{ fontSize: '0.82rem', borderColor: '#fed7aa', opacity: syncing ? 0.7 : 1 }}
          >
            <RefreshCw size={14} color="#ea580c" className={syncing ? 'spin-icon' : ''} />
            <span>{syncing ? "Syncing..." : "Sync Core Banking / SCA DB"}</span>
          </button>
          {syncNotice && (
            <div style={{ fontSize: '0.75rem', color: '#15803d', background: '#f0fdf4', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
              ✓ {syncNotice}
            </div>
          )}
        </div>
      </div>

      {/* High-Impact Ecosystem Impact Metrics */}
      <div className="grid-4" style={{ marginBottom: '1.8rem' }}>
        
        <div className="gov-card" style={{ padding: '1.25rem', borderLeft: '4px solid #ea580c', background: '#ffffff', borderTop: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Misrouted Applications</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ea580c', margin: '0.2rem 0' }}>
            -78.4%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>
            Reduced from 42% to 8.6% via BHUSEWA Logic Engine
          </div>
        </div>

        <div className="gov-card" style={{ padding: '1.25rem', borderLeft: '4px solid #1e40af', background: '#ffffff', borderTop: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Average Disbursement Time</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1e40af', margin: '0.2rem 0' }}>
            14 Days
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>
            Cut down from conventional 90-day cycle
          </div>
        </div>

        <div className="gov-card" style={{ padding: '1.25rem', borderLeft: '4px solid #c2410c', background: '#ffffff', borderTop: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Concessional Credit Disbursed</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#c2410c', margin: '0.2rem 0' }}>
            ₹48.2 Cr
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>
            Across 1,420 SC micro & small enterprises
          </div>
        </div>

        <div className="gov-card" style={{ padding: '1.25rem', borderLeft: '4px solid #0e7490', background: '#ffffff', borderTop: '1px solid #fed7aa' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Active Channel Partners</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0e7490', margin: '0.2rem 0' }}>
            540+
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>
            SCAs, PSBs, RRBs, and accredited NBFCs
          </div>
        </div>

      </div>

      {/* Application Triage Table Card */}
      <div className="gov-card" style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid #fed7aa' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', margin: 0, color: '#0f172a' }}>Incoming Applications Triage Queue</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
              Applications pre-filtered with automated rule-matching and credit viability scores.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Filter size={15} color="#ea580c" />
            <select
              value={filterScheme}
              onChange={(e) => setFilterScheme(e.target.value)}
              className="form-control"
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
            >
              <option value="All">All Schemes</option>
              <option value="Mahila">Mahila Samriddhi</option>
              <option value="NSFDC">NSFDC Schemes</option>
              <option value="PMEGP">PMEGP</option>
              <option value="Stand-Up">Stand-Up India</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', textAlign: 'left', background: '#f8fafc' }}>
                <th style={{ padding: '0.75rem 0.6rem' }}>App ID & Applicant</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>Category</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>Target Scheme</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>Amount</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>AI Match Score</th>
                <th style={{ padding: '0.75rem 0.6rem' }}>Status</th>
                <th style={{ padding: '0.75rem 0.6rem', textAlign: 'right' }}>Officer Decision</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  
                  <td style={{ padding: '0.85rem 0.6rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{row.applicantName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 600 }}>{row.id}</div>
                  </td>

                  <td style={{ padding: '0.85rem 0.6rem', color: '#475569' }}>
                    {row.category}
                  </td>

                  <td style={{ padding: '0.85rem 0.6rem', color: '#334155', fontWeight: 500 }}>
                    {row.scheme}
                  </td>

                  <td style={{ padding: '0.85rem 0.6rem', fontWeight: 700, color: '#ea580c' }}>
                    ₹{(row.amount).toLocaleString('en-IN')}
                  </td>

                  <td style={{ padding: '0.85rem 0.6rem' }}>
                    <span className="badge badge-orange" style={{ fontSize: '0.72rem' }}>
                      {row.matchScore}% Pre-Vetted
                    </span>
                  </td>

                  <td style={{ padding: '0.85rem 0.6rem' }}>
                    <span className={`badge ${
                      row.status === 'Disbursed' ? 'badge-purple' :
                      row.status === 'Sanctioned' ? 'badge-orange' :
                      row.status === 'Partner Review' ? 'badge-blue' : 'badge-orange'
                    }`} style={{ fontSize: '0.72rem' }}>
                      {row.status}
                    </span>
                  </td>

                  <td style={{ padding: '0.85rem 0.6rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      {row.status !== 'Sanctioned' && row.status !== 'Disbursed' && (
                        <button
                          onClick={() => handleAction(row.id, 'Sanctioned')}
                          className="btn btn-gov-orange"
                          style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                          title="Issue Concessional Sanction"
                        >
                          <CheckCircle2 size={13} />
                          <span>Sanction</span>
                        </button>
                      )}

                      {row.status === 'Sanctioned' && (
                        <button
                          onClick={() => handleAction(row.id, 'Disbursed')}
                          className="btn btn-gov-orange"
                          style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                          title="Direct Benefit Transfer Disbursement"
                        >
                          <DollarSign size={13} />
                          <span>Disburse</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedDossier(row)}
                        className="btn btn-secondary"
                        style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem', borderColor: '#fed7aa' }}
                        title="View Full Dossier"
                      >
                        <FileText size={13} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Dossier Modal */}
      {selectedDossier && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div className="gov-card" style={{
            maxWidth: '520px',
            width: '100%',
            padding: '1.5rem',
            background: '#ffffff',
            boxShadow: 'var(--shadow-modal)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #fed7aa', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} color="#ea580c" />
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Beneficiary Dossier — {selectedDossier.applicantName}</h3>
              </div>
              <button 
                onClick={() => setSelectedDossier(null)} 
                className="btn btn-secondary"
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Application ID:</span>
                <strong>{selectedDossier.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Beneficiary Category:</span>
                <strong>{selectedDossier.category}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Selected Scheme:</span>
                <strong>{selectedDossier.scheme}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Requested Amount:</span>
                <strong>₹{selectedDossier.amount.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>AI Match Score:</span>
                <span className="badge badge-green">{selectedDossier.matchScore}% Match</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>DSCR Viability Ratio:</span>
                <strong style={{ color: '#16a34a' }}>{selectedDossier.dscrRatio} (Bankable)</strong>
              </div>
              <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#15803d', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                  <CheckCircle2 size={15} /> DigiLocker Verified Credentials
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569' }}>
                  Digital Caste Validity Certificate & Aadhaar e-KYC cryptographically verified via State DigiLocker Gateway. No physical branch verification needed.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedDossier(null)} className="btn btn-gov-orange">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
