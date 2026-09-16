import React, { useState } from 'react';
import { Volume2, ShieldCheck, UserCheck, Layers, MapPin, Calculator, FileText, Globe, Sparkles, Search, ChevronRight, Moon, Sun, ArrowRight, Bot, Eye } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function Navbar({ 
  currentLang, 
  onLangChange, 
  activeTab, 
  onTabChange, 
  isAdminView, 
  onToggleView, 
  onTriggerVoice,
  onOpenAssistant,
  onOpenAccessibility,
  contrastMode = 'default',
  onToggleTheme,
  searchQuery,
  onSearchChange,
  onSearchSubmit
}) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const isDarkMode = contrastMode === 'dark' || contrastMode === 'high-yellow-black' || contrastMode === 'high-white-black';

  const navItems = [
    { id: 'matcher', label: 'Home / Discovery', icon: Sparkles },
    { id: 'schemes', label: 'All Schemes (4,770+)', icon: Layers },
    { id: 'calculator', label: 'Concessional EMI Calculator', icon: Calculator },
    { id: 'geolocator', label: 'SCA Partner Locator', icon: MapPin },
    { id: 'tracker', label: 'Track Application', icon: FileText }
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', borderBottom: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      
      {/* 1. Official Top Accessibility & Ministry Bar */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #edf2f7', padding: '0.35rem 0', fontSize: '0.74rem', color: '#475569' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          
          {/* Ministry Text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontWeight: 700, color: '#111827' }}>भारत सरकार | Government of India</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontWeight: 500 }}>Ministry of Social Justice and Empowerment</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ color: '#15803d', fontWeight: 700 }}>Smart India Hackathon 2026</span>
          </div>

          {/* Accessibility & Voice Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            
            {/* Accessibility Button */}
            <button 
              onClick={onOpenAccessibility} 
              title="Accessibility Options (GIGW 3.0)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: '#eff6ff',
                color: '#1e40af',
                border: '1px solid #bfdbfe',
                borderRadius: '4px',
                padding: '0.15rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Eye size={13} />
              <span>Accessibility</span>
            </button>

            {/* AI Assistant Quick Trigger in Top Bar */}
            <button 
              onClick={onOpenAssistant} 
              title="Open SchemeMitra AI Assistant"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: '#f0fdf4',
                color: '#136f38',
                border: '1px solid #86efac',
                borderRadius: '4px',
                padding: '0.15rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Bot size={13} />
              <span>Ask AI</span>
            </button>

            {/* Voice Guidance */}
            <button 
              onClick={onTriggerVoice} 
              title="Listen in selected language"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: '#e8f5e9',
                color: '#136f38',
                border: '1px solid #c8e6c9',
                borderRadius: '4px',
                padding: '0.15rem 0.5rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Volume2 size={13} />
              <span>Voice Guide</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. Official Brand Navbar with Exact CDN Logos */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem', gap: '1.25rem' }}>
        
        {/* Left Logos: Emblem + myScheme + Digital India */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', flexShrink: 0 }} onClick={() => onTabChange('matcher')}>
          
          {/* Ashoka Lion Emblem */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img 
              src="https://cdn.myscheme.in/images/logos/emblem-black.svg" 
              alt="National Emblem of India" 
              style={{ height: '46px', width: 'auto', display: 'block' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div style={{ height: '36px', width: '1.5px', background: '#e2e8f0' }}></div>
          </div>

          {/* Official myScheme Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span className="brand-logo-text" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', fontFamily: 'var(--font-display)' }}>
                  my<span style={{ color: '#15803d' }}>Scheme</span>
                </span>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#ea580c', background: '#fff7ed', border: '1px solid #fed7aa', padding: '1px 6px', borderRadius: '4px', letterSpacing: '0.04em' }}>
                  SAMRIDDHI
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: 500, letterSpacing: '0.02em', marginTop: '-3px' }}>
                Ministry of Social Justice and Empowerment
              </span>
            </div>
          </div>

          <div style={{ height: '36px', width: '1.5px', background: '#e2e8f0', margin: '0 0.2rem' }}></div>

          {/* Digital India Official Logo */}
          <img 
            src="https://cdn.myscheme.in/images/logos/digital-india-black.svg" 
            alt="Digital India" 
            style={{ height: '30px', width: 'auto', display: 'block' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />

        </div>

        {/* Center: Global Search Bar */}
        {!isAdminView && (
          <div style={{ flex: 1, maxWidth: '440px', minWidth: '220px', position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '9999px',
              padding: '0.25rem 0.35rem 0.25rem 0.95rem',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#15803d'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
            >
              <Search size={16} color="#64748b" style={{ marginRight: '0.45rem' }} />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && onSearchSubmit) onSearchSubmit(); }}
                placeholder="Enter scheme name to search..."
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '0.84rem',
                  color: '#111827'
                }}
              />
              <button
                onClick={onSearchSubmit}
                style={{
                  background: '#15803d',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <span>Search</span>
              </button>
            </div>
          </div>
        )}

        {/* Right: Language Dropdown, Dark Mode, & Sign In Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          
          {/* Language Selector in Green Circle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#15803d',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Globe size={16} />
            </div>
            <select
              value={currentLang}
              onChange={(e) => onLangChange(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: '#15803d',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>

          {/* Theme Toggle (Navy box like myScheme) */}
          <div style={{
            background: isDarkMode ? '#15803d' : '#2f2b45',
            borderRadius: '6px',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onClick={onToggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={17} color="#ffffff" /> : <Moon size={17} color="#ffffff" />}
          </div>

          {/* Officer Portal / Sign In Button */}
          <button
            onClick={onToggleView}
            className={`btn ${isAdminView ? 'btn-secondary' : 'btn-gov-green'}`}
            style={{ 
              padding: '0.55rem 1.25rem', 
              fontSize: '0.84rem',
              borderRadius: '6px',
              fontWeight: 700
            }}
          >
            {isAdminView ? (
              <>
                <UserCheck size={15} />
                <span>Citizen View</span>
              </>
            ) : (
              <>
                <ShieldCheck size={15} />
                <span>Officer Sign In</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>

        </div>

      </div>

      {/* 3. Official Green Sub-Navigation Bar */}
      {!isAdminView && (
        <div style={{ background: '#136f38', color: '#ffffff', borderTop: '1px solid #0e5a2c' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', padding: '0 1.25rem' }}>
            <nav style={{ display: 'flex', gap: '0.25rem' }}>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.7rem 0.95rem',
                      border: 'none',
                      background: isActive ? '#0e5a2c' : 'transparent',
                      color: '#ffffff',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      borderBottom: isActive ? '3px solid #f97316' : '3px solid transparent',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Icon size={15} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.76rem', color: '#dcfce7', flexShrink: 0 }}>
              <button
                onClick={onOpenAssistant}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Bot size={13} />
                <span>Ask SchemeMitra</span>
              </button>
              <span className="live-indicator"></span>
              <span>4,770+ Verified Schemes</span>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
