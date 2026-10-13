import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Globe,
  MoreHorizontal,
  ArrowRight,
  Play
} from 'lucide-react';
import { useAegis } from '../../context/AegisContext';
import { SeverityBadge } from '../ui/SeverityBadge';
import { StatusBadge } from '../ui/StatusBadge';

export const RecentFindingsTable: React.FC = () => {
  const { findings, setSelectedFinding } = useAegis();

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shrink-0 font-bold text-[9px]">
            IG
          </div>
        );
      case 'tiktok':
        return (
          <div className="w-5 h-5 rounded-md bg-black border border-white/20 flex items-center justify-center text-[#25F4EE] shrink-0 font-bold text-[10px]">
            ♪
          </div>
        );
      case 'playstore':
        return (
          <div className="w-5 h-5 rounded-md bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Play size={10} fill="currentColor" />
          </div>
        );
      case 'facebook':
        return (
          <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white shrink-0 font-bold text-[10px]">
            f
          </div>
        );
      case 'web':
      default:
        return (
          <div
            className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--card-sub-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--primary-accent)'
            }}
          >
            <Globe size={11} />
          </div>
        );
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--card-glow)'
      }}
      className="p-5 sm:p-6 rounded-2xl border flex flex-col justify-between transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div>
          <h3 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Recent Incident Triage
          </h3>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            High-signal threat vectors awaiting review or takedown
          </p>
        </div>
        <NavLink
          to="/app/findings"
          className="text-xs hover:underline flex items-center gap-1 font-semibold"
          style={{ color: 'var(--primary-accent)' }}
        >
          View All ({findings.length}) <ArrowRight size={13} />
        </NavLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-1">
        <table className="w-full text-left text-xs" style={{ color: 'var(--text-secondary)' }}>
          <thead>
            <tr
              className="border-b text-[10px] font-mono uppercase tracking-wider"
              style={{
                borderColor: 'var(--border-color)',
                color: 'var(--text-muted)'
              }}
            >
              <th className="py-2.5 font-semibold pl-1">Channel</th>
              <th className="py-2.5 font-semibold">Incident / Title</th>
              <th className="py-2.5 font-semibold hidden md:table-cell">Brand</th>
              <th className="py-2.5 font-semibold text-center">Severity</th>
              <th className="py-2.5 font-semibold text-center hidden sm:table-cell">Similarity</th>
              <th className="py-2.5 font-semibold">Status</th>
              <th className="py-2.5 font-semibold text-right pr-1">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {findings.slice(0, 5).map((f) => (
              <tr
                key={f.id}
                onClick={() => setSelectedFinding(f)}
                className="hover:bg-black/5 dark:hover:bg-white/[0.03] transition-colors cursor-pointer group"
              >
                {/* Platform Icon */}
                <td className="py-3 pl-1">
                  {getPlatformIcon(f.platform)}
                </td>

                {/* Title */}
                <td className="py-3 font-medium max-w-[200px] truncate" style={{ color: 'var(--text-primary)' }}>
                  <div className="truncate font-mono group-hover:underline">{f.title}</div>
                  <span className="text-[10px] capitalize block mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {f.type} • {f.detectedTime}
                  </span>
                </td>

                {/* Brand */}
                <td className="py-3 hidden md:table-cell font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {f.associatedBrand}
                </td>

                {/* Severity */}
                <td className="py-3 text-center">
                  <SeverityBadge severity={f.risk} />
                </td>

                {/* Similarity */}
                <td className="py-3 text-center hidden sm:table-cell font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
                  {f.similarity}%
                </td>

                {/* Status */}
                <td className="py-3">
                  <StatusBadge status={f.status} />
                </td>

                {/* Action */}
                <td className="py-3 text-right pr-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFinding(f);
                    }}
                    className="p-1 rounded-md opacity-60 group-hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-opacity"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Inspect finding"
                  >
                    <MoreHorizontal size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentFindingsTable;
