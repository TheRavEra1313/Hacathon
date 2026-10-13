import React, { useState } from 'react';
import {
  Shield,
  Search,
  Globe,
  Radio,
  X,
  Play,
  RotateCw
} from 'lucide-react';
import { useAegis } from '../../context/AegisContext';

export const ScanWizardModal: React.FC = () => {
  const { isScanWizardOpen, setIsScanWizardOpen, brands, runNewScan } = useAegis();
  const [selectedBrandId, setSelectedBrandId] = useState(brands[0]?.id || '');
  const [scanType, setScanType] = useState('full');
  const [depth, setDepth] = useState<'standard' | 'deep' | 'exhaustive'>('deep');
  const [isScanning, setIsScanning] = useState(false);

  if (!isScanWizardOpen) return null;

  const handleStartScan = async () => {
    setIsScanning(true);
    await runNewScan(selectedBrandId, ['domains', 'social', 'apps'], scanType);
    setIsScanning(false);
    setIsScanWizardOpen(false);
  };

  const scanTypes = [
    { type: 'full', label: 'Omni-Surface Scan', desc: 'Comprehensive domain, social handle, and mobile repository analysis', icon: Globe },
    { type: 'domain', label: 'Domain & Typosquatting', desc: 'Discovers punycode permutations, DNS variations, and parked assets', icon: Search },
    { type: 'social', label: 'Social Impersonation', desc: 'Crawls Twitter, LinkedIn, Instagram, and Telegram for spoofed entities', icon: Radio },
    { type: 'app', label: 'Rogue App Stores', desc: 'Monitors unofficial APK mirrors, Google Play, and iOS mirrors for repackaged builds', icon: Shield }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className="border rounded-2xl w-full max-w-lg p-6 shadow-2xl relative flex flex-col gap-5 transition-colors duration-200"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Shield size={18} style={{ color: 'var(--primary-accent)' }} />
              Run Targeted Brand Scan
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Launch real-time intelligence probing across public surfaces.
            </p>
          </div>
          <button
            onClick={() => setIsScanWizardOpen(false)}
            className="p-1.5 rounded-lg hover:opacity-80 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Brand Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider font-mono" style={{ color: 'var(--text-secondary)' }}>
            Target Organization / Brand
          </label>
          <select
            value={selectedBrandId}
            onChange={(e) => setSelectedBrandId(e.target.value)}
            className="w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
            style={{
              backgroundColor: 'var(--card-sub-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            {brands.map((b) => (
              <option key={b.id} value={b.id} style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}>
                {b.name} ({b.domain})
              </option>
            ))}
          </select>
        </div>

        {/* Scan Type Grid */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider font-mono" style={{ color: 'var(--text-secondary)' }}>
            Surface Focus & Methodology
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {scanTypes.map((t) => {
              const active = scanType === t.type;
              const Icon = t.icon;
              return (
                <div
                  key={t.type}
                  onClick={() => setScanType(t.type)}
                  className="p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between"
                  style={{
                    backgroundColor: active ? 'var(--primary-accent-muted)' : 'var(--card-sub-bg)',
                    borderColor: active ? 'var(--primary-accent)' : 'var(--border-color)'
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon size={16} style={{ color: active ? 'var(--primary-accent)' : 'var(--text-muted)' }} />
                    <div
                      className="w-3.5 h-3.5 rounded-full border flex items-center justify-center"
                      style={{
                        borderColor: active ? 'var(--primary-accent)' : 'var(--border-color)',
                        backgroundColor: active ? 'var(--primary-accent)' : 'transparent'
                      }}
                    >
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-semibold block" style={{ color: active ? 'var(--primary-accent)' : 'var(--text-primary)' }}>
                      {t.label}
                    </span>
                    <p className="text-[10px] leading-tight mt-0.5" style={{ color: 'var(--text-secondary)' }}>{t.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scan Depth / Heuristics */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider font-mono" style={{ color: 'var(--text-secondary)' }}>
            Execution Depth Profile
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'standard', name: 'Rapid (5s)', time: 'High-signal only' },
              { id: 'deep', name: 'Deep (15s)', time: 'Permutations & DNS' },
              { id: 'exhaustive', name: 'Exhaustive (30s)', time: 'Full archive & mirrors' }
            ].map((p) => {
              const active = depth === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setDepth(p.id as any)}
                  className="p-2.5 rounded-xl border text-center transition-colors"
                  style={{
                    backgroundColor: active ? 'var(--primary-accent-muted)' : 'var(--card-sub-bg)',
                    borderColor: active ? 'var(--primary-accent)' : 'var(--border-color)',
                    color: active ? 'var(--primary-accent)' : 'var(--text-secondary)'
                  }}
                >
                  <div className="text-xs font-semibold" style={{ color: active ? 'var(--primary-accent)' : 'var(--text-primary)' }}>{p.name}</div>
                  <div className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{p.time}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => setIsScanWizardOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-medium hover:opacity-80 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            disabled={isScanning}
          >
            Cancel
          </button>
          <button
            onClick={handleStartScan}
            disabled={isScanning}
            className="px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            style={{
              backgroundColor: 'var(--primary-accent)',
              color: '#FFFFFF'
            }}
          >
            {isScanning ? (
              <>
                <RotateCw size={14} className="animate-spin" />
                Executing Neural Scan...
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" />
                Initialize Threat Probe
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanWizardModal;
