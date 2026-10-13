import React, { useState } from 'react';
import { useAegis } from '../context/AegisContext';
import { SeverityBadge } from '../components/ui/SeverityBadge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Share2, ExternalLink } from 'lucide-react';

export const SocialMonitoringPage: React.FC = () => {
  const { findings, setSelectedFinding } = useAegis();
  const [platformFilter, setPlatformFilter] = useState('all');

  const socialFindings = findings.filter(f => f.type === 'social');
  const filtered = socialFindings.filter(f => platformFilter === 'all' || f.platform === platformFilter);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Social Channel Surveillance
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Continuous identification of impersonating profiles, executive spoofing, and rogue customer service handles.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="border rounded-xl px-3 py-1.5 text-xs focus:outline-none"
            style={{
              backgroundColor: 'var(--card-sub-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            <option value="all">All Networks ({socialFindings.length})</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedFinding(item)}
            className="p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:border-[var(--border-color-hover)] hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--card-glow)'
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {item.platform}
                </span>
                <SeverityBadge severity={item.risk} />
              </div>

              <div className="flex items-center gap-3 my-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0"
                  style={{ backgroundColor: 'var(--primary-accent)' }}
                >
                  {item.title.charAt(1).toUpperCase()}
                </div>
                <div className="truncate">
                  <h3 className="font-semibold text-xs group-hover:underline transition-colors truncate" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <span className="text-[11px] block" style={{ color: 'var(--text-secondary)' }}>
                    Target: {item.associatedBrand}
                  </span>
                </div>
              </div>

              <div
                className="mt-3.5 p-2.5 rounded-xl border space-y-1.5 text-xs"
                style={{
                  backgroundColor: 'var(--card-sub-bg)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Similarity:</span>
                  <span className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{item.similarity}%</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                  <StatusBadge status={item.status} />
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Observed:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.detectedTime}</span>
                </div>
              </div>

              {item.notes && item.notes[0] && (
                <p className="text-[11px] mt-2.5 line-clamp-2 italic" style={{ color: 'var(--text-muted)' }}>
                  "{item.notes[0]}"
                </p>
              )}
            </div>

            <div
              className="pt-3.5 mt-3.5 border-t flex items-center justify-between text-xs"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <span className="group-hover:underline font-semibold text-[11px]" style={{ color: 'var(--primary-accent)' }}>
                Inspect Evidence →
              </span>
              <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>ID: {item.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMonitoringPage;
