import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle2, X, Building2, KeyRound } from 'lucide-react';

export default function OfficerAuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [officerId, setOfficerId] = useState('officer.nodal@mosje.gov.in');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Verification against required password
    if (password === '@KK.com112') {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPassword('');
        setError('');
        onLoginSuccess();
        onClose();
      }, 700);
    } else {
      setError('Invalid officer password! Access denied.');
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
    >
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-surface, #ffffff)',
          color: 'var(--text-main, #0f172a)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '460px',
          boxShadow: '0 25px 50px -12px rgba(234, 88, 12, 0.25), 0 10px 25px rgba(0,0,0,0.15)',
          border: '1px solid var(--border-color, #fed7aa)',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.25s ease-out'
        }}
      >
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
          padding: '1.5rem 1.75rem',
          color: '#ffffff',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={26} color="#ffffff" />
            </div>
            <div>
              <span style={{ 
                fontSize: '0.72rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.08em',
                background: 'rgba(255, 255, 255, 0.25)',
                padding: '2px 8px',
                borderRadius: '9999px',
                display: 'inline-block'
              }}>
                Official Portal
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.2rem 0 0', color: '#ffffff' }}>
                Officer Sign In
              </h2>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#ffedd5', opacity: 0.95 }}>
            State Channelizing Agency (SCA) & Ministry Command Workspace
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem' }}>
          {/* Officer ID Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.82rem', 
              fontWeight: 700, 
              marginBottom: '0.4rem',
              color: 'var(--text-main, #334155)'
            }}>
              Officer Email / Govt ID
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1.5px solid var(--border-color, #cbd5e1)',
              borderRadius: '8px',
              padding: '0.65rem 0.85rem',
              background: 'var(--bg-main, #f8fafc)',
              gap: '0.6rem'
            }}>
              <Mail size={17} color="#64748b" />
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="e.g. officer.nodal@mosje.gov.in"
                required
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.9rem',
                  color: 'var(--text-main, #0f172a)'
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ 
                fontSize: '0.82rem', 
                fontWeight: 700, 
                color: 'var(--text-main, #334155)'
              }}>
                Security Password
              </label>
              <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: 600 }}>
                Auth Key Required
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: `1.5px solid ${error ? '#ef4444' : 'var(--border-color, #cbd5e1)'}`,
              borderRadius: '8px',
              padding: '0.65rem 0.85rem',
              background: 'var(--bg-main, #f8fafc)',
              gap: '0.6rem'
            }}>
              <Lock size={17} color={error ? '#ef4444' : '#64748b'} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password..."
                autoFocus
                required
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.9rem',
                  color: 'var(--text-main, #0f172a)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  color: '#64748b'
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
              animation: 'shake 0.3s ease'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Success State */}
          {isSuccess && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#fff7ed',
              border: '1px solid #fed7aa',
              color: '#ea580c',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '1.25rem'
            }}>
              <CheckCircle2 size={16} color="#ea580c" />
              <span>✓ Access Authorized — Redirecting to Officer Dashboard...</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSuccess}
            style={{
              width: '100%',
              background: isSuccess ? '#16a34a' : 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: isSuccess ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <KeyRound size={18} />
            <span>{isSuccess ? "Verified" : "Sign In to Officer Console"}</span>
          </button>

          {/* Security Notice / Hint for Evaluation */}
          <div style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color, #e2e8f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.74rem',
            color: '#64748b'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Building2 size={14} />
              SCA Officer Access Protocol
            </span>
            <span style={{ 
              background: '#fff7ed', 
              color: '#ea580c', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontWeight: 600,
              fontFamily: 'monospace'
            }}>
              Pass: @KK.com112
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
