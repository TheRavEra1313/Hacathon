import React, { useState } from 'react';
import { useAegis } from '../context/AegisContext';
import { User, Building, Bell, Key, Moon, Sun, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useAegis();
  const [activeTab, setActiveTab] = useState<'profile' | 'organization' | 'notifications' | 'api'>('profile');
  const [savedNotice, setSavedNotice] = useState(false);

  const [analystName, setAnalystName] = useState('Alex Carter');
  const [analystEmail, setAnalystEmail] = useState('alex.carter@aegis-intel.io');
  const [orgName, setOrgName] = useState('Acme Global SecOps');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {/* Header */}
      <div className="pb-2">
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Platform & SecOps Settings
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
          Manage analyst authentication, SIEM integrations, and automated takedown dispatch rules.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b pb-2 text-xs font-medium overflow-x-auto" style={{ borderColor: 'var(--border-color)' }}>
        {[
          { id: 'profile', label: 'Analyst Profile', icon: User },
          { id: 'organization', label: 'Organization & Team', icon: Building },
          { id: 'notifications', label: 'Alerting Rules', icon: Bell },
          { id: 'api', label: 'Integrations & API', icon: Key },
        ].map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all border shrink-0 text-xs"
              style={{
                backgroundColor: active ? 'var(--card-sub-bg)' : 'transparent',
                borderColor: active ? 'var(--primary-accent)' : 'transparent',
                color: active ? 'var(--primary-accent)' : 'var(--text-secondary)'
              }}
            >
              <Icon size={13} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <form
        onSubmit={handleSave}
        className="p-6 rounded-2xl border space-y-5"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--card-glow)'
        }}
      >
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3.5 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div
                className="w-12 h-12 rounded-xl font-bold text-base flex items-center justify-center border"
                style={{
                  backgroundColor: 'var(--primary-accent-muted)',
                  borderColor: 'var(--primary-accent)',
                  color: 'var(--primary-accent)'
                }}
              >
                AC
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{analystName}</h3>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Lead SecOps Analyst • Threat Recon Division</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs block mb-1 font-medium" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                <input
                  type="text"
                  value={analystName}
                  onChange={(e) => setAnalystName(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-xs focus:outline-none"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label className="text-xs block mb-1 font-medium" style={{ color: 'var(--text-secondary)' }}>Work Email</label>
                <input
                  type="email"
                  value={analystEmail}
                  onChange={(e) => setAnalystEmail(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-xs focus:outline-none"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            <div>
              <label className="text-xs block mb-1 font-medium" style={{ color: 'var(--text-secondary)' }}>Theme Mode</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-xl border text-xs flex items-center gap-2 hover:opacity-90 transition-colors"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--primary-accent)'
                  }}
                >
                  {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                  Current: {theme === 'dark' ? 'Dark Intelligence Mode' : 'Warm Terracotta Light Mode'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'organization' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs block mb-1 font-medium" style={{ color: 'var(--text-secondary)' }}>Organization Title</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full border rounded-xl px-3 py-2 text-xs focus:outline-none"
                style={{
                  backgroundColor: 'var(--card-sub-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            <div
              className="p-3 rounded-xl border text-xs space-y-1"
              style={{
                backgroundColor: 'var(--card-sub-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)'
              }}
            >
              <span className="font-semibold block mb-1" style={{ color: 'var(--text-primary)' }}>Active Team Seats (4 / 10)</span>
              <p>• Alex Carter (Principal SecOps Analyst)</p>
              <p>• Elena Rostova (Lead Interaction Architect)</p>
              <p>• Marcus Vance (Head of Legal Countermeasures)</p>
              <p>• Sarah Lin (Senior Adversary Profiler)</p>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3">
            <label className="text-xs font-bold block" style={{ color: 'var(--text-primary)' }}>Immediate Dispatch Hooks</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-xs cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                />
                <span>Send instantaneous email alerts when Critical IOCs are confirmed</span>
              </label>
              <label className="flex items-center gap-3 text-xs cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={slackAlerts}
                  onChange={(e) => setSlackAlerts(e.target.checked)}
                />
                <span>Forward webhook payload to #secops-critical-brand-alerts</span>
              </label>
              <label className="flex items-center gap-3 text-xs cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={criticalOnly}
                  onChange={(e) => setCriticalOnly(e.target.checked)}
                />
                <span>Suppress Medium & Low threat notifications during off-hours</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs block mb-1 font-medium" style={{ color: 'var(--text-secondary)' }}>AEGIS Ingestion API Token</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  readOnly
                  value="aegis_live_sec_9941a80d44b209e9f1a7"
                  className="w-full border rounded-xl px-3 py-2 text-xs font-mono"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--primary-accent)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => alert('API token copied to clipboard.')}
                  className="px-3 py-2 rounded-xl border text-xs"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Supports standard STIX/TAXII threat feeds, Splunk ES, Microsoft Sentinel, and custom SIEM webhooks.
            </p>
          </div>
        )}

        {/* Save button and status */}
        <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-white font-semibold text-xs transition-colors shadow-sm"
            style={{ backgroundColor: 'var(--primary-accent)' }}
          >
            Save Changes
          </button>

          {savedNotice && (
            <span className="text-xs text-emerald-500 flex items-center gap-1 font-medium animate-fade-in">
              <Check size={14} /> Preferences updated locally.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
