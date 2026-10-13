import React, { useState } from 'react';
import { useAegis } from '../context/AegisContext';
import { Plus, ExternalLink, ChevronRight, Shield, Globe, Radio } from 'lucide-react';

export const BrandProfilesPage: React.FC = () => {
  const { brands, addBrand, setIsScanWizardOpen } = useAegis();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandDomain, setNewBrandDomain] = useState('');
  const [newBrandDesc, setNewBrandDesc] = useState('');

  const handleCreateBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim() || !newBrandDomain.trim()) return;

    addBrand({
      name: newBrandName.trim(),
      domain: newBrandDomain.trim().replace(/^https?:\/\//, ''),
      description: newBrandDesc.trim() || 'Monitored brand asset.',
      socialHandles: [
        { platform: 'Twitter / X', handle: `@${newBrandName.toLowerCase().replace(/\s+/g, '')}` }
      ],
      protectedKeywords: [newBrandName.toLowerCase()]
    });

    setNewBrandName('');
    setNewBrandDomain('');
    setNewBrandDesc('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Brand Surveillance Profiles
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Monitored trademark perimeters, executive handles, and autonomous defense boundaries.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl text-white font-semibold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity self-start sm:self-auto shadow-sm"
          style={{ backgroundColor: 'var(--primary-accent)' }}
        >
          <Plus size={15} />
          Register Brand Entity
        </button>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {brands.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:border-[var(--border-color-hover)] hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--card-glow)'
            }}
          >
            <div>
              {/* Brand Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: 'var(--primary-accent-muted)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--primary-accent)'
                    }}
                  >
                    {b.logo}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{b.name}</h3>
                    <a
                      href={`https://${b.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs flex items-center gap-1 font-mono mt-0.5 hover:underline"
                      style={{ color: 'var(--primary-accent)' }}
                    >
                      {b.domain} <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                <span
                  className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-full border font-bold"
                  style={{
                    backgroundColor: b.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: b.status === 'active' ? '#10B981' : '#F59E0B',
                    borderColor: b.status === 'active' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.25)'
                  }}
                >
                  ● {b.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs mt-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {b.description}
              </p>

              {/* Metrics */}
              <div
                className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-xl border text-xs text-center"
                style={{
                  backgroundColor: 'var(--card-sub-bg)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div>
                  <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>Assets</span>
                  <div className="font-bold font-mono mt-0.5" style={{ color: 'var(--text-primary)' }}>{b.monitoredAssets}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>Risk Index</span>
                  <div className={`font-bold font-mono mt-0.5 ${b.riskScore > 70 ? 'text-rose-500' : 'text-amber-500'}`}>
                    {b.riskScore}/100
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>Findings</span>
                  <div className="font-bold font-mono mt-0.5" style={{ color: 'var(--text-primary)' }}>{b.activeFindingsCount}</div>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div
              className="flex items-center justify-between pt-4 mt-4 border-t"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>Probe: {b.lastScanTime}</span>
              <button
                onClick={() => setIsScanWizardOpen(true)}
                className="text-xs font-semibold hover:underline flex items-center gap-1"
                style={{ color: 'var(--primary-accent)' }}
              >
                Trigger Scan <ChevronRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Brand Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="border rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 backdrop-blur-xl"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
          >
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Register Brand Entity</h3>
            <form onSubmit={handleCreateBrand} className="space-y-3">
              <div>
                <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wayne Enterprises"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-xs focus:outline-none"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Primary Domain</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. wayne-enterprises.com"
                  value={newBrandDomain}
                  onChange={(e) => setNewBrandDomain(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-xs focus:outline-none"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Scope / Mission</label>
                <textarea
                  placeholder="Primary products, financial infrastructure, or consumer sectors..."
                  value={newBrandDesc}
                  onChange={(e) => setNewBrandDesc(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-xs focus:outline-none h-20"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs hover:opacity-80"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white font-semibold text-xs shadow"
                  style={{ backgroundColor: 'var(--primary-accent)' }}
                >
                  Add Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandProfilesPage;
