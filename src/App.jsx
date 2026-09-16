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
import Footer from './components/Footer';
import { SCHEMES_DATABASE } from './data/schemes';
import { evaluateSchemes } from './utils/ruleEngine';
import { GovernmentSchemeSyncEngine } from './utils/schemeFetcher';
import { speakText, generateVoiceSummary } from './utils/voiceGuidance';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeTab, setActiveTab] = useState('matcher');
  const [isAdminView, setIsAdminView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  // Global GIGW Accessibility & Contrast State
  const [contrastMode, setContrastMode] = useState(() => localStorage.getItem('samriddhi_contrast') || 'default');
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('samriddhi_font_size') || '100'));

  // Toggle Dark/Light Mode
  const handleToggleTheme = () => {
    const nextMode = contrastMode === 'dark' ? 'default' : 'dark';
    setContrastMode(nextMode);
    localStorage.setItem('samriddhi_contrast', nextMode);
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
    localStorage.setItem('samriddhi_contrast', contrastMode);
  }, [contrastMode]);

  // Sync Font Size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('samriddhi_font_size', fontSize.toString());
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
  const [selectedSchemeForCalc, setSelectedSchemeForCalc] = useState(null);
  const [preselectedStateForMap, setPreselectedStateForMap] = useState("All");

  // Mock Active Applications Tracker
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

  const handleSubmitApplication = (appData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      appId: `APP-SIH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      channelPartner: `${profile.state} State Channelizing Agency`,
      ...appData
    };
    setApplications(prev => [newApp, ...prev]);
    setSelectedSchemeForModal(null);
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAppStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(a => a.appId === appId || a.id === appId ? { ...a, status: newStatus } : a));
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
        onToggleView={() => setIsAdminView(!isAdminView)}
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
                    alert(`Application routed to ${partner.name} (${partner.district}). A confirmation SMS has been dispatched.`);
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
        />
      )}

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

      {/* Official Dark Navy myScheme.gov.in Footer */}
      <Footer />

    </div>
  );
}
