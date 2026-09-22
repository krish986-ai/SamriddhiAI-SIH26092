import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Image, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Check, 
  Eye, 
  Trash2, 
  FileCheck,
  Building,
  CreditCard,
  User,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * BeneficiaryApplicationModal
 * React-based modal form triggered on clicking "Apply Now" or via global event:
 * window.dispatchEvent(new CustomEvent('open-scheme-application', { detail: { scheme } }))
 */
export default function BeneficiaryApplicationModal({
  isOpen,
  scheme,
  userProfile = {},
  onClose,
  onSubmitApplication
}) {
  const fileInputIncomeRef = useRef(null);
  const fileInputCasteRef = useRef(null);
  const fileInputPhotoRef = useRef(null);
  const fileInputIdRef = useRef(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: userProfile.fullName || '',
    phone: '9876543210',
    email: '',
    gender: userProfile.gender || 'Female',
    casteCategory: userProfile.casteCategory || 'SC',
    annualIncome: userProfile.annualIncome || 180000,
    incomeSource: 'Agriculture / Micro-Enterprise',
    loanAmount: userProfile.loanRequired || scheme?.maxLoanAmount || 200000,
    tenureYears: scheme?.tenureYears || 5,
    businessPurpose: userProfile.businessSector || 'Micro-Enterprise Expansion',
    state: userProfile.state || 'Madhya Pradesh',
    district: 'Bhopal',
    pincode: '462001',
    // Identity Proof Selection
    idType: 'aadhaar', // 'aadhaar' | 'voter' | 'ration' | 'jamin_rashid' | 'pan'
    idNumber: '',
    // Document Upload Files State (simulated client files with metadata)
    incomeDoc: null,
    casteDoc: null,
    photoDoc: null,
    identityDoc: null
  });

  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1); // 1: Personal & Income, 2: Upload Required Documents, 3: Review & Submit

  // Sync with scheme & profile when modal opens
  useEffect(() => {
    if (scheme) {
      setFormData(prev => ({
        ...prev,
        fullName: userProfile.fullName || prev.fullName || 'Sunita Devi',
        casteCategory: userProfile.casteCategory || prev.casteCategory || 'SC',
        annualIncome: userProfile.annualIncome || prev.annualIncome || 180000,
        loanAmount: userProfile.loanRequired || scheme.maxLoanAmount || 200000,
        tenureYears: scheme.tenureYears || 5,
        businessPurpose: userProfile.businessSector || 'Agro-processing & Handloom'
      }));
    }
  }, [scheme, userProfile]);

  if (!isOpen || !scheme) return null;

  // File Upload Handlers (Handles both click upload and drag-and-drop)
  const handleFileUpload = (field, file) => {
    if (!file) return;

    // Check size limit (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }

    const fileMeta = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      type: file.type,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setFormData(prev => ({
      ...prev,
      [field]: fileMeta
    }));

    // Clear error for this field
    setFormErrors(prev => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const handleRemoveFile = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: null
    }));
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = "Full name as per Aadhaar is required.";
      if (!formData.annualIncome || formData.annualIncome <= 0) errors.annualIncome = "Please provide valid annual income.";
      if (!formData.loanAmount || formData.loanAmount <= 0) errors.loanAmount = "Valid loan amount is required.";
      if (!formData.idNumber.trim()) errors.idNumber = "Identity proof number is required.";
    } else if (step === 2) {
      if (!formData.incomeDoc) errors.incomeDoc = "Income Certificate or ITR/Affidavit PDF is required.";
      if (!formData.casteDoc && formData.casteCategory !== 'General') errors.casteDoc = "Caste Validity Certificate is required for concessional lending.";
      if (!formData.photoDoc) errors.photoDoc = "Passport size photograph is required.";
      if (!formData.identityDoc) errors.identityDoc = "Official identity document upload is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setActiveStep(prev => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!declarationAccepted) {
      setFormErrors(prev => ({ ...prev, declaration: "Please accept the statutory declaration." }));
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      const submissionPayload = {
        schemeId: scheme.id,
        schemeTitle: scheme.title,
        applicantName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        casteCategory: formData.casteCategory,
        annualIncome: Number(formData.annualIncome),
        requestedAmount: Number(formData.loanAmount),
        tenureYears: formData.tenureYears,
        businessPurpose: formData.businessPurpose,
        state: formData.state,
        idType: formData.idType,
        idNumber: formData.idNumber,
        uploadedDocuments: {
          incomeDoc: formData.incomeDoc?.name || "Income_Certificate_2026.pdf",
          casteDoc: formData.casteDoc?.name || `${formData.casteCategory}_Certificate.pdf`,
          photoDoc: formData.photoDoc?.name || "Applicant_Passport_Photo.jpg",
          identityDoc: formData.identityDoc?.name || `${formData.idType.toUpperCase()}_Document.pdf`
        },
        submissionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: "SCA Verification"
      };

      onSubmitApplication(submissionPayload);
      setSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      padding: '1rem'
    }}>
      <div className="gov-card" style={{
        maxWidth: '820px',
        width: '100%',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1.5px solid #fed7aa'
      }}>
        
        {/* Modal Header */}
        <div style={{
          background: '#0f172a',
          color: '#ffffff',
          padding: '1.1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '3px solid #ea580c'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="badge" style={{ background: '#ea580c', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800 }}>
                DIRECT BENEFIT LENDING FORM
              </span>
              <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                Form Ref: MO-SCA-2026/BEN
              </span>
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.3rem 0 0 0', color: '#ffffff' }}>
              Apply for {scheme.title}
            </h2>
            <div style={{ fontSize: '0.78rem', color: '#fed7aa', marginTop: '0.15rem' }}>
              Nodal Agency: {scheme.nodalAgency} • Concessional Rate: {scheme.concessionalRate}% p.a.
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div style={{
          display: 'flex',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.75rem 1.5rem',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          {[
            { step: 1, title: "1. Personal & Income Details" },
            { step: 2, title: "2. Upload Verified Documents" },
            { step: 3, title: "3. Review & SCA Submission" }
          ].map((s) => {
            const isCompleted = activeStep > s.step;
            const isCurrent = activeStep === s.step;
            return (
              <div 
                key={s.step} 
                style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  color: isCurrent ? '#ea580c' : isCompleted ? '#16a34a' : '#94a3b8',
                  fontWeight: isCurrent || isCompleted ? 700 : 500,
                  fontSize: '0.82rem'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: isCurrent ? '#ea580c' : isCompleted ? '#16a34a' : '#e2e8f0',
                  color: isCurrent || isCompleted ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem'
                }}>
                  {isCompleted ? <Check size={14} /> : s.step}
                </div>
                <span>{s.title}</span>
              </div>
            );
          })}
        </div>

        {/* Form Body Container */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, fontSize: '0.86rem' }}>
          
          {/* STEP 1: PERSONAL & INCOME DETAILS */}
          {activeStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              <div style={{
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                padding: '0.8rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <ShieldCheck size={20} color="#ea580c" />
                <span style={{ fontSize: '0.8rem', color: '#9a3412' }}>
                  Statutory MoSJE Compliance: All caste eligibility and income ceilings are validated against official gazetted criteria.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.35rem', color: '#1e293b' }}>
                    Full Name (as in Aadhaar/Bank) *
                  </label>
                  <input
                    type="text"
                    className="gov-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                  />
                  {formErrors.fullName && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.2rem' }}>{formErrors.fullName}</div>}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.35rem', color: '#1e293b' }}>
                    Mobile Number (linked to Aadhaar) *
                  </label>
                  <input
                    type="tel"
                    className="gov-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.35rem', color: '#1e293b' }}>
                    Social Category / Caste *
                  </label>
                  <select
                    className="gov-input"
                    value={formData.casteCategory}
                    onChange={(e) => setFormData({ ...formData, casteCategory: e.target.value })}
                  >
                    <option value="SC">Scheduled Caste (SC)</option>
                    <option value="ST">Scheduled Tribe (ST)</option>
                    <option value="OBC">Other Backward Classes (OBC)</option>
                    <option value="General">General (EWS / Safai Karamchari)</option>
                  </select>
                </div>
              </div>

              {/* Income & Loan Details */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CreditCard size={16} color="#ea580c" />
                  <span>Annual Income & Loan Request Parameters</span>
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.35rem', color: '#1e293b' }}>
                      Annual Family Income (₹) *
                    </label>
                    <input
                      type="number"
                      className="gov-input"
                      value={formData.annualIncome}
                      onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                      placeholder="e.g. 180000"
                    />
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Must match your uploaded Income Certificate</span>
                    {formErrors.annualIncome && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.2rem' }}>{formErrors.annualIncome}</div>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.35rem', color: '#1e293b' }}>
                      Primary Income Source *
                    </label>
                    <select
                      className="gov-input"
                      value={formData.incomeSource}
                      onChange={(e) => setFormData({ ...formData, incomeSource: e.target.value })}
                    >
                      <option value="Agriculture / Allied">Agriculture / Allied Farming</option>
                      <option value="Artisan / Handloom">Artisan / Handloom Craft</option>
                      <option value="Small Retail / Shop">Small Retail / Grocery</option>
                      <option value="Daily Wage / Informal Labor">Daily Wage / Informal Labor</option>
                      <option value="Micro-Manufacturing">Micro-Manufacturing Unit</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.35rem', color: '#1e293b' }}>
                      Requested Concessional Loan (₹) *
                    </label>
                    <input
                      type="number"
                      className="gov-input"
                      value={formData.loanAmount}
                      max={scheme.maxLoanAmount}
                      onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                    />
                    <span style={{ fontSize: '0.72rem', color: '#15803d' }}>
                      Max eligible under scheme: ₹{Number(scheme.maxLoanAmount).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Identity Proof Selection */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                  Identity Card Selection (Aadhaar / Voter / Ration / Jamin Rashid)
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.35rem', color: '#1e293b' }}>
                      Choose Primary ID Document *
                    </label>
                    <select
                      className="gov-input"
                      value={formData.idType}
                      onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                    >
                      <option value="aadhaar">Aadhaar Card (12-Digit UIDAI)</option>
                      <option value="voter">Voter ID Card (Election EPIC No.)</option>
                      <option value="ration">Ration Card (NFSA / BPL / AAY)</option>
                      <option value="jamin_rashid">Jamin Rashid (Land Tax / Revenue Receipt)</option>
                      <option value="pan">PAN Card (Income Tax)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.35rem', color: '#1e293b' }}>
                      Document ID / Certificate Number *
                    </label>
                    <input
                      type="text"
                      className="gov-input"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      placeholder={
                        formData.idType === 'aadhaar' ? "e.g. 5432-8765-1092" :
                        formData.idType === 'voter' ? "e.g. WBD4392810" :
                        formData.idType === 'ration' ? "e.g. RAT-NFSA-94021" :
                        formData.idType === 'jamin_rashid' ? "e.g. Khasra/Receipt #948/2025" : "e.g. ABCDE1234F"
                      }
                    />
                    {formErrors.idNumber && <div style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.2rem' }}>{formErrors.idNumber}</div>}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: UPLOAD REQUIRED DOCUMENTS (INCOME PDF, CASTE CERTIFICATE, PHOTO, ID) */}
          {activeStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '0.8rem 1rem',
                fontSize: '0.82rem',
                color: '#1e40af'
              }}>
                📄 <strong>Upload Specifications:</strong> Please upload official digital copies or clear camera scans. Supported formats: <strong>PDF, JPG, PNG</strong> (Max size: 10MB per file). These files will be stored in your encrypted application dossier for SCA verification.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.2rem' }}>
                
                {/* 1. INCOME DETAIL UPLOAD (PDF) */}
                <div style={{
                  border: formErrors.incomeDoc ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '1rem',
                  background: '#f8fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <FileText size={16} color="#ea580c" />
                      <span>1. Income Certificate / ITR / Affidavit (PDF) *</span>
                    </div>
                    {formData.incomeDoc && <span className="badge badge-green">Uploaded</span>}
                  </div>
                  <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.76rem', color: '#64748b' }}>
                    Issued by Tehsildar / SDO / Employer or Form 16 / ITR acknowledgment.
                  </p>

                  <input
                    type="file"
                    ref={fileInputIncomeRef}
                    accept=".pdf,.png,.jpg,.jpeg"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload('incomeDoc', e.target.files[0])}
                  />

                  {formData.incomeDoc ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                        <FileCheck size={18} color="#16a34a" />
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#166534', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {formData.incomeDoc.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#15803d' }}>{formData.incomeDoc.size} • Verified</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile('incomeDoc')}
                        style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer' }}
                        title="Remove file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputIncomeRef.current?.click()}
                      style={{
                        width: '100%',
                        border: '1.5px dashed #94a3b8',
                        borderRadius: '8px',
                        padding: '1rem',
                        background: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Upload size={20} color="#ea580c" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                        Click to Upload Income PDF
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>PDF or Image up to 10MB</span>
                    </button>
                  )}
                  {formErrors.incomeDoc && <div style={{ color: '#dc2626', fontSize: '0.74rem', marginTop: '0.35rem' }}>{formErrors.incomeDoc}</div>}
                </div>

                {/* 2. CASTE CERTIFICATE UPLOAD */}
                <div style={{
                  border: formErrors.casteDoc ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '1rem',
                  background: '#f8fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <FileCheck size={16} color="#ea580c" />
                      <span>2. Caste Validity Certificate (PDF / Image) *</span>
                    </div>
                    {formData.casteDoc && <span className="badge badge-green">Uploaded</span>}
                  </div>
                  <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.76rem', color: '#64748b' }}>
                    Required for SC/ST/OBC apex concessional loan rates under MoSJE.
                  </p>

                  <input
                    type="file"
                    ref={fileInputCasteRef}
                    accept=".pdf,.png,.jpg,.jpeg"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload('casteDoc', e.target.files[0])}
                  />

                  {formData.casteDoc ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                        <CheckCircle2 size={18} color="#16a34a" />
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#166534', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {formData.casteDoc.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#15803d' }}>{formData.casteDoc.size} • Verified</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile('casteDoc')}
                        style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer' }}
                        title="Remove file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputCasteRef.current?.click()}
                      style={{
                        width: '100%',
                        border: '1.5px dashed #94a3b8',
                        borderRadius: '8px',
                        padding: '1rem',
                        background: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Upload size={20} color="#ea580c" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                        Click to Upload Caste Certificate
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>PDF or Image scan</span>
                    </button>
                  )}
                  {formErrors.casteDoc && <div style={{ color: '#dc2626', fontSize: '0.74rem', marginTop: '0.35rem' }}>{formErrors.casteDoc}</div>}
                </div>

                {/* 3. PASSPORT SIZE PHOTO UPLOAD */}
                <div style={{
                  border: formErrors.photoDoc ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '1rem',
                  background: '#f8fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Image size={16} color="#ea580c" />
                      <span>3. Passport Size Photograph *</span>
                    </div>
                    {formData.photoDoc && <span className="badge badge-green">Uploaded</span>}
                  </div>
                  <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.76rem', color: '#64748b' }}>
                    Recent front-facing color photo on light background.
                  </p>

                  <input
                    type="file"
                    ref={fileInputPhotoRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload('photoDoc', e.target.files[0])}
                  />

                  {formData.photoDoc ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        {formData.photoDoc.previewUrl ? (
                          <img 
                            src={formData.photoDoc.previewUrl} 
                            alt="Applicant" 
                            style={{ width: '38px', height: '44px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #86efac' }} 
                          />
                        ) : (
                          <User size={24} color="#16a34a" />
                        )}
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#166534' }}>
                            {formData.photoDoc.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#15803d' }}>{formData.photoDoc.size}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile('photoDoc')}
                        style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer' }}
                        title="Remove file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputPhotoRef.current?.click()}
                      style={{
                        width: '100%',
                        border: '1.5px dashed #94a3b8',
                        borderRadius: '8px',
                        padding: '1rem',
                        background: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Upload size={20} color="#ea580c" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                        Click to Upload Passport Photo
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>JPG or PNG (Max 5MB)</span>
                    </button>
                  )}
                  {formErrors.photoDoc && <div style={{ color: '#dc2626', fontSize: '0.74rem', marginTop: '0.35rem' }}>{formErrors.photoDoc}</div>}
                </div>

                {/* 4. IDENTITY CARD UPLOAD (AADHAAR / VOTER / RATION / JAMIN RASHID) */}
                <div style={{
                  border: formErrors.identityDoc ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '1rem',
                  background: '#f8fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CreditCard size={16} color="#ea580c" />
                      <span>4. {formData.idType.toUpperCase()} Document (PDF / Image) *</span>
                    </div>
                    {formData.identityDoc && <span className="badge badge-green">Uploaded</span>}
                  </div>
                  <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.76rem', color: '#64748b' }}>
                    Upload scan of {formData.idType === 'jamin_rashid' ? 'Jamin Rashid (Land Receipt)' : formData.idType.toUpperCase()} showing name and number ({formData.idNumber || 'selected above'}).
                  </p>

                  <input
                    type="file"
                    ref={fileInputIdRef}
                    accept=".pdf,.png,.jpg,.jpeg"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload('identityDoc', e.target.files[0])}
                  />

                  {formData.identityDoc ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                        <FileCheck size={18} color="#16a34a" />
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#166534', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {formData.identityDoc.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#15803d' }}>{formData.identityDoc.size} • Verified</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile('identityDoc')}
                        style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer' }}
                        title="Remove file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputIdRef.current?.click()}
                      style={{
                        width: '100%',
                        border: '1.5px dashed #94a3b8',
                        borderRadius: '8px',
                        padding: '1rem',
                        background: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Upload size={20} color="#ea580c" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                        Click to Upload {formData.idType.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>PDF, Aadhaar scan, or Jamin Rashid</span>
                    </button>
                  )}
                  {formErrors.identityDoc && <div style={{ color: '#dc2626', fontSize: '0.74rem', marginTop: '0.35rem' }}>{formErrors.identityDoc}</div>}
                </div>

              </div>

            </div>
          )}

          {/* STEP 3: REVIEW & SCA SUBMISSION */}
          {activeStep === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '0.8rem 1rem',
                fontSize: '0.82rem',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle2 size={18} />
                <span>All 4 mandatory documents uploaded. Your application dossier is complete and ready for SCA triage.</span>
              </div>

              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '1rem'
              }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.92rem', color: '#0f172a', fontWeight: 800 }}>
                  Dossier Summary
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Applicant Name</span>
                    <strong>{formData.fullName}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Caste & Category</span>
                    <strong>{formData.casteCategory}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Annual Income</span>
                    <strong style={{ color: '#ea580c' }}>₹{Number(formData.annualIncome).toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Requested Loan</span>
                    <strong style={{ color: '#16a34a' }}>₹{Number(formData.loanAmount).toLocaleString('en-IN')} @ {scheme.concessionalRate}%</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Identity Document</span>
                    <strong>{formData.idType.toUpperCase()} ({formData.idNumber})</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Designated SCA Partner</span>
                    <strong>{formData.state} State Channelizing Agency</strong>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '0.8rem', paddingTop: '0.8rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    Uploaded Documents Attached:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem' }}>
                    <span className="badge badge-orange">Income PDF: {formData.incomeDoc?.name || "Uploaded"}</span>
                    <span className="badge badge-orange">Caste Cert: {formData.casteDoc?.name || "Uploaded"}</span>
                    <span className="badge badge-orange">Photo: {formData.photoDoc?.name || "Uploaded"}</span>
                    <span className="badge badge-orange">{formData.idType.toUpperCase()}: {formData.identityDoc?.name || "Uploaded"}</span>
                  </div>
                </div>
              </div>

              {/* Statutory Declaration */}
              <div style={{
                background: '#ffffff',
                border: formErrors.declaration ? '1.5px solid #dc2626' : '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '0.85rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', fontSize: '0.8rem', color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={declarationAccepted}
                    onChange={(e) => {
                      setDeclarationAccepted(e.target.checked);
                      if (e.target.checked) {
                        setFormErrors(prev => {
                          const u = { ...prev };
                          delete u.declaration;
                          return u;
                        });
                      }
                    }}
                    style={{ accentColor: '#ea580c', marginTop: '3px' }}
                  />
                  <span>
                    I hereby solemnly declare that all information, income certificates, caste validity documents, and identity cards provided are genuine. I understand that misrepresentation of caste or income to claim apex government credit is punishable under law.
                  </span>
                </label>
                {formErrors.declaration && <div style={{ color: '#dc2626', fontSize: '0.74rem', marginTop: '0.35rem' }}>{formErrors.declaration}</div>}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div style={{
          background: '#f8fafc',
          padding: '1rem 1.5rem',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            {activeStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
              >
                Back
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
            >
              Cancel
            </button>

            {activeStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-gov-orange"
                style={{ padding: '0.5rem 1.4rem', fontSize: '0.84rem' }}
              >
                <span>Continue to Documents</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalSubmit}
                className="btn btn-gov-orange"
                style={{ padding: '0.5rem 1.6rem', fontSize: '0.84rem', fontWeight: 800 }}
              >
                <ShieldCheck size={16} />
                <span>{submitting ? "Submitting Application..." : "Submit to SCA & Get Tracking ID"}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
