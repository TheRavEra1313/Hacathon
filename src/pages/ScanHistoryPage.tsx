import React, { useState } from 'react';
import { useAegis } from '../context/AegisContext';
import { CheckCircle2, RotateCw, XCircle, RotateCcw, Filter, Sparkles } from 'lucide-react';

export const ScanHistoryPage: React.FC = () => {
  const { scans, retryScan, setIsScanWizardOpen } = useAegis();
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = scans.filter(s => filterStatus === 'all' || s.status === filterStatus);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Reconnaissance & Scan History
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Historical audit logs of threat discovery jobs, domain crawl jobs, and APK scans.
          </p>
        </div>

        <button
          onClick={() => setIsScanWizardOpen(true)}
          className="px-4 py-2 rounded-xl text-white font-semibold text-xs flex items-center gap-2 self-start sm:self-auto shadow-sm"
          style={{ backgroundColor: 'var(--primary-accent)' }}
        >
          <Sparkles size={14} />
          Launch New Scan
        </button>
      </div>

      {/* Filter Toolbar */}
      <div
        className="flex items-center justify-between p-3.5 rounded-2xl border text-xs"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--card-glow)'
        }}
      >
        <div className="flex items-center gap-2">
          <Filter size={13} style={{ color: 'var(--primary-accent)' }} />
          <span>Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-xl px-2.5 py-1 text-xs focus:outline-none"
            style={{
              backgroundColor: 'var(--card-sub-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            <option value="all">All Jobs ({scans.length})</option>
            <option value="completed">Completed</option>
            <option value="running">In Progress</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <span className="text-[11px] font-mono hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
          Telemetry synchronized
        </span>
      </div>

      {/* Scans List / Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--card-glow)'
        }}
      >
        <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
          {filtered.map((s) => (
            <div
              key={s.id}
              className="p-4 sm:p-5 hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                {/* Status Indicator */}
                <div className="shrink-0">
                  {s.status === 'completed' && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                  {s.status === 'running' && (
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 animate-spin">
                      <RotateCw size={16} />
                    </div>
                  )}
                  {s.status === 'failed' && (
                    <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                      <XCircle size={16} />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{s.brandName}</h3>
                    <span
                      className="text-[9px] uppercase font-mono px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: 'var(--card-sub-bg)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {s.scanType}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    Probed {s.targetCount} perimeter targets • {s.timeAgo}
                  </p>
                  {s.errorMessage && (
                    <p className="text-xs text-rose-500 mt-1">{s.errorMessage}</p>
                  )}
                </div>
              </div>

              {/* Progress & Stats */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                <div className="text-left md:text-right">
                  <div className="text-xs font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                    {s.findingsCount} findings {s.highPriorityCount > 0 && <span className="text-rose-500">({s.highPriorityCount} critical)</span>}
                  </div>
                  <div
                    className="w-28 h-1.5 rounded-full overflow-hidden mt-1.5"
                    style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        s.status === 'completed' ? 'bg-emerald-500' : s.status === 'running' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>

                {s.status === 'failed' && (
                  <button
                    onClick={() => retryScan(s.id)}
                    className="px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    style={{
                      backgroundColor: 'var(--card-sub-bg)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--primary-accent)'
                    }}
                  >
                    <RotateCcw size={12} /> Retry
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanHistoryPage;
