import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProfileWizard from './components/ProfileWizard';
import SchemeResults from './components/SchemeResults';
import SchemeDetailModal from './components/SchemeDetailModal';
import FinancialCalc from './components/FinancialCalc';
import GeoLocator from './components/GeoLocator';
import ApplicationTracker from './components/ApplicationTracker';
import ChannelPartnerPortal from './components/ChannelPartnerPortal';
import MiniAssistant from './components/MiniAssistant';
import AccessibilityWidget from './components/AccessibilityWidget';
import SchemeSyncManager from './components/SchemeSyncManager';
import OfficerAuthModal from './components/OfficerAuthModal';
import BeneficiaryApplicationModal from './components/BeneficiaryApplicationModal';
import Footer from './components/Footer';
import { SCHEMES_DATABASE } from './data/schemes';
import { evaluateSchemes } from './utils/ruleEngine';
import { GovernmentSchemeSyncEngine } from './utils/schemeFetcher';
import { speakText, generateVoiceSummary } from './utils/voiceGuidance';
import { db, collection, doc, setDoc, updateDoc, onSnapshot } from './firebase';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeTab, setActiveTab] = useState('matcher');
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Global GIGW Accessibility & Contrast State
  const [contrastMode, setContrastMode] = useState(() => localStorage.getItem('bhusewa_contrast') || 'default');
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('bhusewa_font_size') || '100'));

  // Toggle Dark/Light Mode
  const handleToggleTheme = () => {
    const nextMode = contrastMode === 'dark' ? 'default' : 'dark';
    setContrastMode(nextMode);
    localStorage.setItem('bhusewa_contrast', nextMode);
  };

  // Sync Contrast Mode with body classes
  useEffect(() => {
    const root = document.body;
    root.classList.remove('theme-dark', 'theme-yellow-black', 'theme-white-black');
    if (contrastMode === 'dark') {
      root.classList.add('theme-dark');
    } else if (contrastMode === 'high-yellow-black') {
      root.classList.add('theme-yellow-black');
    } else if (contrastMode === 'high-white-black') {
      root.classList.add('theme-white-black');
    }
    localStorage.setItem('bhusewa_contrast', contrastMode);
  }, [contrastMode]);

  // Sync Font Size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('bhusewa_font_size', fontSize.toString());
  }, [fontSize]);

  // Beneficiary Profile State
  const [profile, setProfile] = useState({
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
  });

  // Recommended Schemes Evaluated by AI Logic Engine
  const [evaluatedSchemes, setEvaluatedSchemes] = useState([]);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState(null);
  const [applicationFormScheme, setApplicationFormScheme] = useState(null);
  const [selectedSchemeForCalc, setSelectedSchemeForCalc] = useState(null);
  const [preselectedStateForMap, setPreselectedStateForMap] = useState("All");

  // Global Event Listener to access and open the application form:
  // e.g. window.dispatchEvent(new CustomEvent('open-scheme-application', { detail: { scheme } }))
  useEffect(() => {
    const handleOpenApplicationEvent = (event) => {
      const schemeToApply = event.detail?.scheme || evaluatedSchemes[0] || SCHEMES_DATABASE[0];
      setApplicationFormScheme(schemeToApply);
    };

    window.addEventListener('open-scheme-application', handleOpenApplicationEvent);
    return () => {
      window.removeEventListener('open-scheme-application', handleOpenApplicationEvent);
    };
  }, [evaluatedSchemes]);

  // Real-time Applications Tracker with Firestore synchronization
  const [applications, setApplications] = useState([
    {
      id: "app-1",
      appId: "APP-SIH-2026-8401",
      schemeId: "mahila-samriddhi",
      schemeTitle: "Mahila Samriddhi Yojana (Exclusive for SC Women)",
      applicantName: "Sunita Devi",
      casteCategory: "SC",
      requestedAmount: 120000,
      submissionDate: "15 Sep 2026",
      status: "SCA Verification",
      channelPartner: "MPBCDC Mumbai Suburban Branch"
    }
  ]);

  // Subscribe to Firestore /applications collection
  useEffect(() => {
    try {
      const appsCollectionRef = collection(db, 'applications');
      const unsubscribe = onSnapshot(appsCollectionRef, (snapshot) => {
        if (!snapshot.empty) {
          const remoteApps = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
          // Sort by creation date descending
          remoteApps.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
          setApplications(remoteApps);
        }
      }, (err) => {
        console.warn("[Firestore] Read error or fallback to local state:", err);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("[Firestore] Initialization error:", e);
    }
  }, []);

  // Run Rule Engine on Mount & Profile change
  const refreshEvaluatedSchemes = () => {
    let results = evaluateSchemes(profile);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.category.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q) ||
        (s.nodalAgency && s.nodalAgency.toLowerCase().includes(q))
      );
    }
    setEvaluatedSchemes(results);
  };

  useEffect(() => {
    refreshEvaluatedSchemes();
  }, [profile, searchQuery]);

  const handleProfileFieldChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRunMatch = () => {
    refreshEvaluatedSchemes();
    const resultsElem = document.getElementById("results-section");
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = () => {
    setActiveTab('schemes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerVoice = () => {
    const topScheme = evaluatedSchemes[0] || SCHEMES_DATABASE[0];
    const text = generateVoiceSummary(profile, topScheme, currentLang);
    speakText(text, currentLang);
  };

  const handleOpenCalculator = (scheme) => {
    setSelectedSchemeForCalc(scheme);
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGeoLocator = (scheme) => {
    setPreselectedStateForMap(profile.state || "All");
    setActiveTab('geolocator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitApplication = async (appData) => {
    const docId = `app-${Date.now()}`;
    const newApp = {
      id: docId,
      appId: `APP-SIH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      channelPartner: `${profile.state} State Channelizing Agency`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...appData
    };

    // Update local state immediately for instant feedback
    setApplications(prev => [newApp, ...prev.filter(a => a.id !== docId)]);
    setSelectedSchemeForModal(null);
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Persist to Cloud Firestore
    try {
      await setDoc(doc(db, 'applications', docId), newApp);
    } catch (err) {
      console.warn("[Firestore] Failed to save application remotely:", err);
    }
  };

  const handleUpdateAppStatus = async (appId, newStatus) => {
    setApplications(prev => prev.map(a => a.appId === appId || a.id === appId ? { ...a, status: newStatus } : a));

    try {
      const targetApp = applications.find(a => a.appId === appId || a.id === appId);
      if (targetApp && targetApp.id) {
        await updateDoc(doc(db, 'applications', targetApp.id), {
          status: newStatus,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.warn("[Firestore] Failed to update status remotely:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      
      {/* Official myScheme.gov.in Navigation & Header */}
      <Navbar
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isAdminView={isAdminView}
        onToggleView={() => {
          if (isAdminView) {
            setIsAdminView(false);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        onTriggerVoice={handleTriggerVoice}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        contrastMode={contrastMode}
        onToggleTheme={handleToggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Content Area */}
      <main id="main-content" style={{ flex: 1, paddingBottom: '3rem' }}>
        
        {/* Channel Partner / Admin Mode */}
        {isAdminView ? (
          <div className="container" style={{ paddingTop: '2rem' }}>
            <SchemeSyncManager onSyncComplete={() => refreshEvaluatedSchemes()} />
            <ChannelPartnerPortal
              applications={applications}
              onUpdateAppStatus={handleUpdateAppStatus}
            />
          </div>
        ) : (
          /* Beneficiary Mode */
          <>
            {activeTab === 'matcher' && (
              <>
                <HeroBanner
                  currentLang={currentLang}
                  onStartMatching={() => {
                    const profElem = document.getElementById("profile-wizard-section");
                    if (profElem) profElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenAssistant={() => setIsAssistantOpen(true)}
                  onOpenDossier={() => setIsDossierOpen(true)}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(catId) => setSelectedCategory(catId)}
                />

                <div className="container" id="profile-wizard-section" style={{ marginTop: '2rem' }}>
                  <ProfileWizard
                    profile={profile}
                    onProfileChange={handleProfileFieldChange}
                    onRunMatch={handleRunMatch}
                    currentLang={currentLang}
                  />

                  <div id="results-section">
                    <SchemeResults
                      schemes={evaluatedSchemes}
                      onSelectScheme={(scheme) => setSelectedSchemeForModal(scheme)}
                      onApplyDirectly={(scheme) => setApplicationFormScheme(scheme)}
                      onOpenCalculator={handleOpenCalculator}
                      onOpenGeoLocator={handleOpenGeoLocator}
                      currentLang={currentLang}
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'schemes' && (
              <div className="container" style={{ paddingTop: '2rem' }}>
                <SchemeSyncManager onSyncComplete={() => refreshEvaluatedSchemes()} />
                <SchemeResults
                  schemes={evaluatedSchemes}
                  onSelectScheme={(scheme) => setSelectedSchemeForModal(scheme)}
                  onApplyDirectly={(scheme) => setApplicationFormScheme(scheme)}
                  onOpenCalculator={handleOpenCalculator}
                  onOpenGeoLocator={handleOpenGeoLocator}
                  currentLang={currentLang}
                />
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="container" style={{ paddingTop: '2rem' }}>
                <FinancialCalc
                  defaultScheme={selectedSchemeForCalc}
                  currentLang={currentLang}
                />
              </div>
            )}

            {activeTab === 'geolocator' && (
              <div className="container" style={{ paddingTop: '2rem' }}>
                <GeoLocator
                  currentLang={currentLang}
                  preselectedState={preselectedStateForMap}
                  onRouteToPartner={(partner) => {
                    setToastMessage(`Application routed to ${partner.name} (${partner.district}). A confirmation SMS has been dispatched.`);
                  }}
                />
              </div>
            )}

            {activeTab === 'tracker' && (
              <div className="container" style={{ paddingTop: '2rem' }}>
                <ApplicationTracker
                  applications={applications}
                  onUpdateStatus={handleUpdateAppStatus}
                  currentLang={currentLang}
                />
              </div>
            )}
          </>
        )}

      </main>

      {/* Scheme Detail & Application Modal */}
      {selectedSchemeForModal && (
        <SchemeDetailModal
          scheme={selectedSchemeForModal}
          userProfile={profile}
          onClose={() => setSelectedSchemeForModal(null)}
          onSubmitApplication={handleSubmitApplication}
          onOpenApplyForm={(scheme) => {
            setSelectedSchemeForModal(null);
            setApplicationFormScheme(scheme);
          }}
        />
      )}

      {/* Official Beneficiary Direct Application Modal (Hidden by default, triggered on Apply or via window event) */}
      {applicationFormScheme && (
        <BeneficiaryApplicationModal
          isOpen={Boolean(applicationFormScheme)}
          scheme={applicationFormScheme}
          userProfile={profile}
          onClose={() => setApplicationFormScheme(null)}
          onSubmitApplication={(appData) => {
            handleSubmitApplication(appData);
            setApplicationFormScheme(null);
            setToastMessage(`Application submitted successfully! Your tracking ID has been generated.`);
          }}
        />
      )}

      {/* Official Officer Authentication Modal */}
      <OfficerAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => setIsAdminView(true)}
      />

      {/* Official Floating SchemeMitra AI Assistant Widget */}
      <MiniAssistant
        currentLang={currentLang}
        isOpen={isAssistantOpen}
        setIsOpen={setIsAssistantOpen}
        onOpenSchemeModal={(scheme) => setSelectedSchemeForModal(scheme)}
        onOpenCalculator={handleOpenCalculator}
        onOpenGeoLocator={() => {
          setActiveTab('geolocator');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Official GIGW Accessibility Menu & Floating Badge */}
      <AccessibilityWidget
        isOpen={isAccessibilityOpen}
        setIsOpen={setIsAccessibilityOpen}
        contrastMode={contrastMode}
        setContrastMode={setContrastMode}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          background: '#0f172a',
          color: '#ffffff',
          padding: '0.75rem 1.4rem',
          borderRadius: '9999px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.88rem',
          fontWeight: 500,
          border: '1px solid #fed7aa',
          maxWidth: '90vw'
        }}>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fdba74',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1,
              padding: '0 0.2rem'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Official Dark Navy myScheme.gov.in Footer */}
      <Footer />

    </div>
  );
}
