import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, Database, Globe, ArrowDownCircle, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { GovernmentSchemeSyncEngine } from '../utils/schemeFetcher';

export default function SchemeSyncManager({ onSyncComplete }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [autoSync, setAutoSync] = useState(true);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      const result = await GovernmentSchemeSyncEngine.fetchLatestGovernmentSchemes({ forceRefresh: true });
      setIsSyncing(false);
      setSyncStatus(result);
      setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      if (onSyncComplete) {
        onSyncComplete(result);
      }
    } catch (e) {
      setIsSyncing(false);
      setSyncStatus({ success: false, error: "Failed to connect to Government Data API" });
    }
  };

  return (
    <div className="gov-card" style={{
      background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
      border: '1.5px solid #fed7aa',
      padding: '1.25rem 1.5rem',
      borderRadius: '12px',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Left: Engine Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#ffedd5',
            color: '#ea580c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Database size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                BHUSEWA Live Government Scheme Ingestion Pipeline
              </h3>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#ea580c', background: '#ffedd5', border: '1px solid #fed7aa', padding: '1px 6px', borderRadius: '4px' }}>
                LIVE FEED ACTIVE
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#4b5563', margin: '0.15rem 0 0' }}>
              Automatically synchronizing central apex guidelines (NSFDC, NBCFDC, Stand-Up India, MoSJE) & data.gov.in open datasets.
            </p>
          </div>
        </div>

        {/* Right: Sync Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          
          <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'right' }}>
            <div>Last Synced: <strong>{lastSync}</strong></div>
            <div style={{ color: '#ea580c', fontWeight: 600 }}>Auto-Sync: Daily 00:00 UTC</div>
          </div>

          <button
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className="btn-gov-orange"
            style={{
              padding: '0.5rem 1.15rem',
              fontSize: '0.82rem',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: isSyncing ? 'not-allowed' : 'pointer'
            }}
          >
            <RefreshCw size={14} className={isSyncing ? "spin-animate" : ""} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isSyncing ? "Fetching Gov Schemes..." : "Sync with Government API"}</span>
          </button>

        </div>

      </div>

      {/* Sync Result Banner */}
      {syncStatus && (
        <div style={{
          marginTop: '0.85rem',
          padding: '0.65rem 0.95rem',
          borderRadius: '8px',
          background: syncStatus.success ? '#fff7ed' : '#fef2f2',
          border: syncStatus.success ? '1px solid #fed7aa' : '1px solid #fecaca',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: syncStatus.success ? '#ea580c' : '#dc2626'
        }}>
          {syncStatus.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>
            {syncStatus.success 
              ? `Success! Ingested ${syncStatus.newSchemesCount} schemes from myScheme/data.gov.in. Next-gen schemes (PM-AJAY 4.5% grants & NBCFDC Green Business 4% loans) are now active.` 
              : syncStatus.error}
          </span>
        </div>
      )}

    </div>
  );
}
