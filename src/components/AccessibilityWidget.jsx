import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';

export default function AccessibilityWidget({ 
  isOpen, 
  setIsOpen,
  contrastMode = 'default',
  setContrastMode,
  fontSize = 100,
  setFontSize
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const showModal = isOpen !== undefined ? isOpen : internalOpen;
  const setShowModal = setIsOpen || setInternalOpen;

  // 12 UX4G Features State
  const [textSpacingLevel, setTextSpacingLevel] = useState(0); // 0, 1, 2
  const [lineHeightLevel, setLineHeightLevel] = useState(1); // 0, 1, 2, 3 (defaults to 1 as in reference)
  const [dyslexiaFriendly, setDyslexiaFriendly] = useState(false);
  const [adhdMode, setAdhdMode] = useState(false);
  const [adhdY, setAdhdY] = useState(300);
  const [saturationLevel, setSaturationLevel] = useState('normal'); // 'normal', 'low', 'high', 'monochrome'
  const [invertColors, setInvertColors] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // 'default', 'large'
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const [hideImages, setHideImages] = useState(false);

  // Keyboard shortcut Ctrl+F2 listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'F2') {
        e.preventDefault();
        setShowModal(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setShowModal]);

  // 1 & 2: Bigger / Smaller Text
  const handleBiggerText = () => {
    if (setFontSize) setFontSize(prev => Math.min(130, prev + 10));
  };
  const handleSmallerText = () => {
    if (setFontSize) setFontSize(prev => Math.max(80, prev - 10));
  };

  // 3. Text Spacing
  const handleToggleTextSpacing = () => {
    const next = (textSpacingLevel + 1) % 3;
    setTextSpacingLevel(next);
    if (next === 1) {
      document.body.style.letterSpacing = '0.08em';
      document.body.style.wordSpacing = '0.15em';
    } else if (next === 2) {
      document.body.style.letterSpacing = '0.15em';
      document.body.style.wordSpacing = '0.3em';
    } else {
      document.body.style.letterSpacing = 'normal';
      document.body.style.wordSpacing = 'normal';
    }
  };

  // 4. Line Height
  const handleToggleLineHeight = () => {
    const next = (lineHeightLevel + 1) % 4;
    setLineHeightLevel(next);
    if (next === 1) document.body.style.lineHeight = '1.7';
    else if (next === 2) document.body.style.lineHeight = '2.0';
    else if (next === 3) document.body.style.lineHeight = '2.4';
    else document.body.style.lineHeight = '1.5';
  };

  // 5. Dyslexia Friendly
  const handleToggleDyslexia = () => {
    const val = !dyslexiaFriendly;
    setDyslexiaFriendly(val);
    if (val) document.body.classList.add('dyslexia-font-active');
    else document.body.classList.remove('dyslexia-font-active');
  };

  // 6. ADHD Mode (Reading spotlight that follows cursor)
  const handleToggleAdhdMode = () => {
    setAdhdMode(!adhdMode);
  };

  useEffect(() => {
    if (!adhdMode) return;
    const handleMouseMove = (e) => setAdhdY(e.clientY);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [adhdMode]);

  // 7. Saturation (Normal -> High -> Monochrome -> Low)
  const handleToggleSaturation = () => {
    if (saturationLevel === 'normal') {
      setSaturationLevel('high');
      document.documentElement.style.filter = 'saturate(180%)';
    } else if (saturationLevel === 'high') {
      setSaturationLevel('monochrome');
      document.documentElement.style.filter = 'grayscale(100%)';
    } else if (saturationLevel === 'monochrome') {
      setSaturationLevel('low');
      document.documentElement.style.filter = 'saturate(50%)';
    } else {
      setSaturationLevel('normal');
      document.documentElement.style.filter = 'none';
    }
  };

  // 8. Invert Colors
  const handleToggleInvertColors = () => {
    const val = !invertColors;
    setInvertColors(val);
    if (val) {
      document.documentElement.classList.add('invert-colors-active');
    } else {
      document.documentElement.classList.remove('invert-colors-active');
    }
  };

  // 9. Highlight Links
  const handleToggleHighlightLinks = () => {
    const val = !highlightLinks;
    setHighlightLinks(val);
    if (val) document.body.classList.add('highlight-links-active');
    else document.body.classList.remove('highlight-links-active');
  };

  // 10. Cursor
  const handleToggleCursor = () => {
    if (cursorType === 'default') {
      setCursorType('large');
      document.body.classList.add('large-cursor-active');
    } else {
      setCursorType('default');
      document.body.classList.remove('large-cursor-active');
    }
  };

  // 11. Pause Animation
  const handleTogglePauseAnimation = () => {
    const val = !pauseAnimation;
    setPauseAnimation(val);
    if (val) document.body.classList.add('pause-animations-active');
    else document.body.classList.remove('pause-animations-active');
  };

  // 12. Hide Images
  const handleToggleHideImages = () => {
    const val = !hideImages;
    setHideImages(val);
    if (val) document.body.classList.add('hide-images-active');
    else document.body.classList.remove('hide-images-active');
  };

  // Reset All
  const handleResetAll = () => {
    if (setFontSize) setFontSize(100);
    if (setContrastMode) setContrastMode('default');
    setTextSpacingLevel(0);
    setLineHeightLevel(0);
    setDyslexiaFriendly(false);
    setAdhdMode(false);
    setSaturationLevel('normal');
    setInvertColors(false);
    setHighlightLinks(false);
    setCursorType('default');
    setPauseAnimation(false);
    setHideImages(false);

    document.body.style.letterSpacing = 'normal';
    document.body.style.wordSpacing = 'normal';
    document.body.style.lineHeight = '1.5';
    document.documentElement.style.filter = 'none';
    document.body.classList.remove('dyslexia-font-active', 'highlight-links-active', 'large-cursor-active', 'pause-animations-active', 'hide-images-active');
    document.documentElement.classList.remove('invert-colors-active');
  };

  // Helper check icon badge
  const renderCheckBadge = () => (
    <div style={{
      position: 'absolute',
      top: '8px',
      right: '8px',
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      background: '#5850ec',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 3px rgba(88, 80, 236, 0.4)'
    }}>
      <Check size={12} strokeWidth={3.5} />
    </div>
  );

  return (
    <>
      {/* 1. Official Floating Accessibility Trigger on Right Edge */}
      {!showModal && (
        <div style={{ position: 'fixed', right: '0', top: '50%', zIndex: 999998, transform: 'translateY(-50%)' }}>
          <button
            onClick={() => setShowModal(true)}
            title="Accessibility options (Ctrl+F2)"
            aria-label="Accessibility options"
            style={{
              background: '#5850ec',
              color: '#ffffff',
              border: 'none',
              borderRadius: '14px 0 0 14px',
              padding: '0.75rem 0.65rem 0.75rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '-2px 6px 20px rgba(88, 80, 236, 0.45)',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.paddingLeft = '1.05rem';
              e.currentTarget.style.background = '#493ecf';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.paddingLeft = '0.85rem';
              e.currentTarget.style.background = '#5850ec';
            }}
          >
            <svg 
              width="26" 
              height="26" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="4" r="2"/>
              <path d="m18 19 1-7-6 1"/>
              <path d="m5 8 3-3 5.5 3-2.36 3.5"/>
              <path d="M4.24 14.5a5 5 0 0 0 6.88 6"/>
              <path d="M13.76 17.5a5 5 0 0 0-1.76-7.5"/>
            </svg>
          </button>
        </div>
      )}

      {/* 2. ADHD Focused Reading Mask */}
      {adhdMode && (
        <div style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: `${adhdY - 50}px`,
          height: '100px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderTop: '3px solid #5850ec',
          borderBottom: '3px solid #5850ec',
          pointerEvents: 'none',
          zIndex: 999997,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65)'
        }}></div>
      )}

      {/* 3. Official UX4G Modal Flyout Window (Right aligned / modal) */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '1.25rem 2rem'
        }}>
          
          <div style={{
            background: '#ffffff',
            maxWidth: '430px',
            width: '100%',
            borderRadius: '20px',
            boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.35)',
            border: '1px solid #e0e7ff',
            overflow: 'hidden',
            maxHeight: '94vh',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            
            {/* Purple Header (Matching exact UX4G reference) */}
            <div style={{
              background: '#5850ec',
              color: '#ffffff',
              padding: '1.1rem 1.35rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  Accessibility options
                </span>
                <span style={{
                  background: '#ede9fe',
                  color: '#4338ca',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  border: '1px solid #ddd6fe'
                }}>
                  Ctrl+F2
                </span>
              </div>

              <button
                onClick={() => setShowModal(false)}
                aria-label="Close accessibility options"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                  borderRadius: '6px'
                }}
              >
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>

            {/* 12-Card Grid Body (Exact 3x4 Layout matching reference) */}
            <div style={{
              padding: '1.25rem',
              background: '#f1f5f9',
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.85rem'
            }}>
              
              {/* Tile 1: Bigger Text */}
              <div
                onClick={handleBiggerText}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: fontSize > 100 ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {fontSize > 100 && renderCheckBadge()}
                <div style={{ fontSize: '1.55rem', fontWeight: 800, color: fontSize > 100 ? '#5850ec' : '#111827', lineHeight: 1, marginBottom: '0.55rem', display: 'flex', alignItems: 'flex-start', gap: '1px' }}>
                  <span>T</span>
                  <span style={{ fontSize: '1.1rem', marginTop: '3px' }}>T</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: fontSize > 100 ? '#5850ec' : '#334155', fontWeight: fontSize > 100 ? 700 : 500, textAlign: 'center' }}>
                  Bigger Text
                </span>
              </div>

              {/* Tile 2: Smaller Text */}
              <div
                onClick={handleSmallerText}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: fontSize < 100 ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {fontSize < 100 && renderCheckBadge()}
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: fontSize < 100 ? '#5850ec' : '#64748b', lineHeight: 1, marginBottom: '0.55rem', display: 'flex', alignItems: 'flex-start', gap: '1px' }}>
                  <span>T</span>
                  <span style={{ fontSize: '0.9rem', marginTop: '3px' }}>T</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: fontSize < 100 ? '#5850ec' : '#64748b', fontWeight: fontSize < 100 ? 700 : 500, textAlign: 'center' }}>
                  Smaller Text
                </span>
              </div>

              {/* Tile 3: Text Spacing */}
              <div
                onClick={handleToggleTextSpacing}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: textSpacingLevel > 0 ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {textSpacingLevel > 0 && renderCheckBadge()}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.55rem', color: textSpacingLevel > 0 ? '#5850ec' : '#111827' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1 }}>A</span>
                  {/* Custom horizontal double-ended arrow */}
                  <svg width="22" height="8" viewBox="0 0 24 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 5h14M1 5l4-4M1 5l4 4M23 5l-4-4M23 5l-4 4"/>
                  </svg>
                </div>
                <span style={{ fontSize: '0.78rem', color: textSpacingLevel > 0 ? '#5850ec' : '#334155', fontWeight: textSpacingLevel > 0 ? 700 : 500, textAlign: 'center' }}>
                  Text Spacing
                </span>
              </div>

              {/* Tile 4: Line Height */}
              <div
                onClick={handleToggleLineHeight}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: lineHeightLevel > 0 ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {lineHeightLevel > 0 && renderCheckBadge()}
                <div style={{ color: lineHeightLevel > 0 ? '#5850ec' : '#111827', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.45rem' }}>
                  {/* Vertical up-down arrow */}
                  <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 2v16M2 6l5-4 5 4M2 14l5 4 5-4"/>
                  </svg>
                  {/* 3 horizontal lines */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ width: '13px', height: '2.5px', background: 'currentColor', borderRadius: '1px' }}></div>
                    <div style={{ width: '13px', height: '2.5px', background: 'currentColor', borderRadius: '1px' }}></div>
                    <div style={{ width: '13px', height: '2.5px', background: 'currentColor', borderRadius: '1px' }}></div>
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: lineHeightLevel > 0 ? '#5850ec' : '#334155', fontWeight: lineHeightLevel > 0 ? 700 : 500, textAlign: 'center' }}>
                  Line Height
                </span>
                {/* 4 Step bars matching reference */}
                <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                  <div style={{ width: '10px', height: '2.5px', borderRadius: '1px', background: lineHeightLevel >= 1 ? '#5850ec' : '#cbd5e1' }}></div>
                  <div style={{ width: '10px', height: '2.5px', borderRadius: '1px', background: lineHeightLevel >= 2 ? '#5850ec' : '#cbd5e1' }}></div>
                  <div style={{ width: '10px', height: '2.5px', borderRadius: '1px', background: lineHeightLevel >= 3 ? '#5850ec' : '#cbd5e1' }}></div>
                  <div style={{ width: '10px', height: '2.5px', borderRadius: '1px', background: lineHeightLevel >= 4 ? '#5850ec' : '#cbd5e1' }}></div>
                </div>
              </div>

              {/* Tile 5: Dyslexia Friendly */}
              <div
                onClick={handleToggleDyslexia}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: dyslexiaFriendly ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {dyslexiaFriendly && renderCheckBadge()}
                <div style={{ fontSize: '1.65rem', fontWeight: 700, color: dyslexiaFriendly ? '#5850ec' : '#5850ec', lineHeight: 1, marginBottom: '0.55rem', fontFamily: 'Comic Sans MS, sans-serif' }}>
                  Df
                </div>
                <span style={{ fontSize: '0.76rem', color: dyslexiaFriendly ? '#5850ec' : '#5850ec', fontWeight: dyslexiaFriendly ? 700 : 600, textAlign: 'center' }}>
                  Dyslexia Friendly
                </span>
              </div>

              {/* Tile 6: ADHD Mode */}
              <div
                onClick={handleToggleAdhdMode}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: adhdMode ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {adhdMode && renderCheckBadge()}
                {/* Sine pulse wave inside circle */}
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `2.2px solid ${adhdMode ? '#5850ec' : '#111827'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.55rem', color: adhdMode ? '#5850ec' : '#111827' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h3l3-6 4 12 4-8 2 2h2"/>
                  </svg>
                </div>
                <span style={{ fontSize: '0.78rem', color: adhdMode ? '#5850ec' : '#334155', fontWeight: adhdMode ? 700 : 500, textAlign: 'center' }}>
                  ADHD Mode
                </span>
              </div>

              {/* Tile 7: Saturation */}
              <div
                onClick={handleToggleSaturation}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: saturationLevel !== 'normal' ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {saturationLevel !== 'normal' && renderCheckBadge()}
                <div style={{ marginBottom: '0.55rem', color: saturationLevel !== 'normal' ? '#5850ec' : '#111827' }}>
                  {/* Solid water droplet */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                  </svg>
                </div>
                <span style={{ fontSize: '0.78rem', color: saturationLevel !== 'normal' ? '#5850ec' : '#334155', fontWeight: saturationLevel !== 'normal' ? 700 : 500, textAlign: 'center' }}>
                  Saturation
                </span>
              </div>

              {/* Tile 8: Invert Colors */}
              <div
                onClick={handleToggleInvertColors}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: invertColors ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {invertColors && renderCheckBadge()}
                {/* Half split black/white drop */}
                <div style={{ marginBottom: '0.55rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    <path d="M12 2.69v18.62a8 8 0 0 0 0-18.62z" fill="#111827"/>
                  </svg>
                </div>
                <span style={{ fontSize: '0.78rem', color: invertColors ? '#5850ec' : '#334155', fontWeight: invertColors ? 700 : 500, textAlign: 'center' }}>
                  Invert Colors
                </span>
              </div>

              {/* Tile 9: Highlight Links */}
              <div
                onClick={handleToggleHighlightLinks}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: highlightLinks ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {highlightLinks && renderCheckBadge()}
                <div style={{ marginBottom: '0.55rem', color: highlightLinks ? '#5850ec' : '#111827' }}>
                  {/* Link chain icon */}
                  <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </div>
                <span style={{ fontSize: '0.78rem', color: highlightLinks ? '#5850ec' : '#334155', fontWeight: highlightLinks ? 700 : 500, textAlign: 'center' }}>
                  Highlight Links
                </span>
              </div>

              {/* Tile 10: Cursor */}
              <div
                onClick={handleToggleCursor}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: cursorType !== 'default' ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {cursorType !== 'default' && renderCheckBadge()}
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `2.2px solid ${cursorType !== 'default' ? '#5850ec' : '#111827'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.55rem', color: cursorType !== 'default' ? '#5850ec' : '#111827' }}>
                  {/* Mouse cursor with curve */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l7 18 3-7 7-3L3 3z"/>
                  </svg>
                </div>
                <span style={{ fontSize: '0.78rem', color: cursorType !== 'default' ? '#5850ec' : '#334155', fontWeight: cursorType !== 'default' ? 700 : 500, textAlign: 'center' }}>
                  Cursor
                </span>
              </div>

              {/* Tile 11: Pause Animation */}
              <div
                onClick={handleTogglePauseAnimation}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: pauseAnimation ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {pauseAnimation && renderCheckBadge()}
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `2.2px solid ${pauseAnimation ? '#5850ec' : '#111827'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.55rem', color: pauseAnimation ? '#5850ec' : '#111827' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                  </svg>
                </div>
                <span style={{ fontSize: '0.78rem', color: pauseAnimation ? '#5850ec' : '#334155', fontWeight: pauseAnimation ? 700 : 500, textAlign: 'center' }}>
                  Pause Animation
                </span>
              </div>

              {/* Tile 12: Hide Images */}
              <div
                onClick={handleToggleHideImages}
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: hideImages ? '2px solid #5850ec' : '1px solid #e2e8f0',
                  padding: '1rem 0.4rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
              >
                {hideImages && renderCheckBadge()}
                <div style={{ marginBottom: '0.55rem', color: hideImages ? '#5850ec' : '#111827' }}>
                  {/* Photo frame with diagonal slash */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                    <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.5" />
                  </svg>
                </div>
                <span style={{ fontSize: '0.78rem', color: hideImages ? '#5850ec' : '#334155', fontWeight: hideImages ? 700 : 500, textAlign: 'center' }}>
                  Hide Images
                </span>
              </div>

            </div>

            {/* Footer with Reset Button & Official UX4G Branding (Exact match to reference) */}
            <div style={{
              background: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              padding: '1rem 1.35rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0
            }}>
              <button
                onClick={handleResetAll}
                style={{
                  background: '#f3e8ff',
                  border: 'none',
                  color: '#6941c6',
                  borderRadius: '8px',
                  padding: '0.55rem 1.15rem',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e9d5ff'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f3e8ff'}
              >
                <RotateCcw size={15} strokeWidth={2.5} />
                <span>Reset All Settings</span>
              </button>

              <div style={{ fontSize: '0.84rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>Created by</span>
                <span style={{ fontWeight: 900, color: '#5850ec', letterSpacing: '0.04em', fontSize: '0.96rem' }}>
                  ENGORIO
                </span>
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
}

