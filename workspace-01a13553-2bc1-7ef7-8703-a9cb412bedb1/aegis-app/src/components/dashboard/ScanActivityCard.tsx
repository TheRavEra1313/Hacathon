import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, RotateCw, XCircle, ArrowRight } from 'lucide-react';
import { useAegis } from '../../context/AegisContext';

export const ScanActivityCard: React.FC = () => {
  const { scans, retryScan } = useAegis();

  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--card-glow)'
      }}
      className="p-5 sm:p-6 rounded-2xl border flex flex-col justify-between h-full transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div>
          <h3 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Perimeter Surveillance Activity
          </h3>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Scheduled and on-demand brand reconnaissance jobs
          </p>
        </div>
        <NavLink
          to="/app/scan-history"
          className="text-xs hover:underline flex items-center gap-1 font-semibold"
          style={{ color: 'var(--primary-accent)' }}
        >
          View All <ArrowRight size={13} />
        </NavLink>
      </div>

      {/* Activity List */}
      <div className="flex flex-col gap-2.5 my-auto py-3">
        {scans.slice(0, 4).map((scan) => {
          const isCompleted = scan.status === 'completed';
          const isRunning = scan.status === 'running';
          const isFailed = scan.status === 'failed';

          return (
            <div
              key={scan.id}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent"
            >
              {/* Status Icon & Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0">
                  {isCompleted && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 size={15} />
                    </div>
                  )}
                  {isRunning && (
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 animate-spin">
                      <RotateCw size={14} />
                    </div>
                  )}
                  {isFailed && (
                    <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                      <XCircle size={15} />
                    </div>
                  )}
                </div>

                <div className="truncate">
                  <div
                    className="text-xs font-semibold truncate flex items-center gap-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span>{scan.brandName}</span>
                    <span
                      className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded border"
                      style={{
                        backgroundColor: 'var(--card-sub-bg)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {scan.scanType}
                    </span>
                  </div>
                  <div className="text-[11px] flex items-center gap-1.5 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    {isCompleted && <span>{scan.findingsCount} findings discovered</span>}
                    {isRunning && <span>Crawling deep sources • {scan.progress}%</span>}
                    {isFailed && <span className="text-rose-500 font-medium">Registry timeout</span>}
                  </div>
                </div>
              </div>

              {/* Progress Bar & Time */}
              <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{scan.timeAgo}</span>
                <div
                  className="w-24 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted
                        ? 'bg-emerald-500 w-full'
                        : isRunning
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${scan.progress}%` }}
                  />
                </div>
                {isFailed && (
                  <button
                    onClick={() => retryScan(scan.id)}
                    className="text-[9px] font-semibold hover:underline"
                    style={{ color: 'var(--primary-accent)' }}
                  >
                    Retry Job
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScanActivityCard;
