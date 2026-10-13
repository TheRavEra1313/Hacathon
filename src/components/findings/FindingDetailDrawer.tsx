import React from 'react';
import {
  X,
  Shield,
  ExternalLink,
  Server,
  UserCheck,
  Send,
  Clock
} from 'lucide-react';
import { useAegis } from '../../context/AegisContext';
import { SeverityBadge } from '../ui/SeverityBadge';
import { StatusBadge } from '../ui/StatusBadge';
import { FindingStatus } from '../../types';

export const FindingDetailDrawer: React.FC = () => {
  const { selectedFinding, setSelectedFinding, updateFindingStatus, theme } = useAegis();
  const [newNote, setNewNote] = React.useState('');

  if (!selectedFinding) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const notes = selectedFinding.notes || [];
    selectedFinding.notes = [...notes, `[Analyst - Just now]: ${newNote}`];
    setNewNote('');
    updateFindingStatus(selectedFinding.id, selectedFinding.status);
  };

  const statusOptions: { label: string; value: FindingStatus }[] = [
    { label: 'New', value: 'new' },
    { label: 'Under Review', value: 'under_review' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Escalated', value: 'escalated' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="flex-1"
        onClick={() => setSelectedFinding(null)}
      />
      <div
        className="w-full max-w-xl h-full border-l p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-slide-left transition-colors duration-200"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <SeverityBadge severity={selectedFinding.risk} showDot />
                <StatusBadge status={selectedFinding.status} />
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  {selectedFinding.id}
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight break-all" style={{ color: 'var(--text-primary)' }}>
                {selectedFinding.title}
              </h2>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Target Brand: <span className="font-semibold" style={{ color: 'var(--primary-accent)' }}>{selectedFinding.associatedBrand}</span>
              </p>
            </div>
            <button
              onClick={() => setSelectedFinding(null)}
              className="p-1.5 rounded-lg hover:opacity-80 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div
              className="p-3 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-sub-bg)',
                borderColor: 'var(--border-color)'
              }}
            >
              <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>Similarity Score</span>
              <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--primary-accent)' }}>{selectedFinding.similarity}%</p>
            </div>
            <div
              className="p-3 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-sub-bg)',
                borderColor: 'var(--border-color)'
              }}
            >
              <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>Platform</span>
              <p className="text-sm font-semibold capitalize mt-1" style={{ color: 'var(--text-primary)' }}>{selectedFinding.platform}</p>
            </div>
            <div
              className="p-3 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-sub-bg)',
                borderColor: 'var(--border-color)'
              }}
            >
              <span className="text-[10px] uppercase font-mono block" style={{ color: 'var(--text-muted)' }}>Detected</span>
              <p className="text-xs font-semibold mt-1.5" style={{ color: 'var(--text-secondary)' }}>{selectedFinding.detectedTime}</p>
            </div>
          </div>

          {/* Technical Telemetry */}
          <div
            className="p-4 rounded-xl border space-y-2.5"
            style={{
              backgroundColor: 'var(--card-sub-bg)',
              borderColor: 'var(--border-color)'
            }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center gap-2"
              style={{ color: 'var(--primary-accent)' }}
            >
              <Server size={14} /> Technical Forensics
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>Resolved IP</span>
                <span className="font-mono" style={{ color: 'var(--text-primary)' }}>{selectedFinding.ipAddress || '198.51.100.42'}</span>
              </div>
              <div>
                <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>DNS Host</span>
                <span className="font-mono truncate block" style={{ color: 'var(--text-primary)' }}>{selectedFinding.dnsHost || 'ns1.threat-edge.net'}</span>
              </div>
              <div>
                <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>Registrar</span>
                <span style={{ color: 'var(--text-secondary)' }}>{selectedFinding.registrar || 'NameCheap Inc.'}</span>
              </div>
              <div>
                <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>Autonomous System (ASN)</span>
                <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>{selectedFinding.asn || 'AS13335'}</span>
              </div>
            </div>

            {selectedFinding.targetUrl && (
              <div className="pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>Target URI</span>
                <a
                  href={selectedFinding.targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs hover:underline flex items-center gap-1 font-mono break-all mt-0.5"
                  style={{ color: 'var(--primary-accent)' }}
                >
                  {selectedFinding.targetUrl}
                  <ExternalLink size={12} className="shrink-0" />
                </a>
              </div>
            )}
          </div>

          {/* Investigation History / Notes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider font-mono" style={{ color: 'var(--text-primary)' }}>
                Investigation Notes & Audit
              </span>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                Assigned: <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{selectedFinding.assignedAnalyst || 'Alex Carter'}</span>
              </span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {selectedFinding.notes && selectedFinding.notes.length > 0 ? (
                selectedFinding.notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border text-xs"
                    style={{
                      backgroundColor: 'var(--card-sub-bg)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {note}
                  </div>
                ))
              ) : (
                <div className="text-xs italic" style={{ color: 'var(--text-muted)' }}>No analyst notes recorded yet.</div>
              )}
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Log internal triage note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 border rounded-xl px-3 py-2 text-xs focus:outline-none"
                style={{
                  backgroundColor: 'var(--card-sub-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1 hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: 'var(--primary-accent-muted)',
                  borderColor: 'var(--primary-accent)',
                  color: 'var(--primary-accent)'
                }}
              >
                <Send size={12} /> Post
              </button>
            </form>
          </div>

          {/* Status Mutation Controls */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono block" style={{ color: 'var(--text-muted)' }}>
              Update Lifecycle Status
            </span>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map((opt) => {
                const active = selectedFinding.status === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => updateFindingStatus(selectedFinding.id, opt.value)}
                    className="py-2 px-3 rounded-xl border text-xs font-medium transition-all"
                    style={{
                      backgroundColor: active ? 'var(--primary-accent-muted)' : 'var(--card-sub-bg)',
                      borderColor: active ? 'var(--primary-accent)' : 'var(--border-color)',
                      color: active ? 'var(--primary-accent)' : 'var(--text-secondary)'
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Actions */}
        <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => setSelectedFinding(null)}
            className="py-2.5 px-4 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors"
            style={{
              backgroundColor: 'var(--card-sub-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            Close Dossier
          </button>
          <a
            href={`mailto:abuse@domain-registrar.com?subject=Takedown%20Request%20for%20${selectedFinding.title}`}
            className="py-2.5 px-4 rounded-xl font-medium text-xs flex items-center gap-1.5 shadow-md hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: 'var(--primary-accent)',
              color: '#FFFFFF'
            }}
          >
            <UserCheck size={14} /> Generate Abuse Takedown
          </a>
        </div>
      </div>
    </div>
  );
};

export default FindingDetailDrawer;
