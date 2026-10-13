import React from 'react';
import { useAegis } from '../context/AegisContext';
import { KpiCard } from '../components/dashboard/KpiCard';
import { RiskDistributionChart } from '../components/dashboard/RiskDistributionChart';
import { ScanActivityCard } from '../components/dashboard/ScanActivityCard';
import { RecentFindingsTable } from '../components/dashboard/RecentFindingsTable';
import { ThreatIntelligenceWidget } from '../components/dashboard/ThreatIntelligenceWidget';
import { Shield, FileText, AlertTriangle, Radio, Sparkles, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardOverview: React.FC = () => {
  const { brands, findings, scans, setIsScanWizardOpen } = useAegis();
  const navigate = useNavigate();

  const highPriorityCount = findings.filter(f => f.risk === 'critical' || f.risk === 'high').length;
  const activeScansCount = scans.filter(s => s.status === 'running').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Sleek, Minimal Welcome Header with Integrated Threat Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-mono uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border"
              style={{
                backgroundColor: 'var(--primary-accent-muted)',
                borderColor: 'var(--border-color)',
                color: 'var(--primary-accent)'
              }}
            >
              Surveillance Online
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>• Last synced 2m ago</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Threat Overview
          </h1>
          <p className="text-xs max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Real-time telemetry across {brands.length} monitored brand perimeters, rogue mobile stores, and domain name registries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsScanWizardOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{
              backgroundColor: 'var(--primary-accent)',
              color: '#FFFFFF'
            }}
          >
            <Sparkles size={14} />
            <span>Launch Targeted Scan</span>
          </button>
        </div>
      </div>

      {/* 2. Four Lightweight Floating Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Monitored Brands"
          value={brands.length > 0 ? brands.length : 12}
          changeText="↑ 2 this month"
          isPositive={true}
          icon={Shield}
          accentColor="var(--primary-accent)"
          sparklineData={[3, 5, 4, 7, 8, 10, 12]}
          onClick={() => navigate('/app/brands')}
        />
        <KpiCard
          title="Total Findings"
          value={findings.length > 0 ? 248 : 0}
          changeText="↑ 12% vs last cycle"
          isPositive={false}
          icon={FileText}
          accentColor="var(--primary-accent)"
          sparklineData={[4, 6, 8, 5, 9, 12, 15]}
          onClick={() => navigate('/app/findings')}
        />
        <KpiCard
          title="High Priority"
          value={highPriorityCount > 0 ? highPriorityCount : 37}
          changeText="5 active triaged"
          isPositive={false}
          icon={AlertTriangle}
          accentColor="#F43F5E"
          sparklineData={[2, 3, 4, 3, 5, 6, 8]}
          onClick={() => navigate('/app/findings')}
        />
        <KpiCard
          title="Active Scans"
          value={activeScansCount > 0 ? activeScansCount : 2}
          changeText="Autonomous running"
          isPositive={true}
          icon={Radio}
          accentColor="#10B981"
          sparklineData={[1, 2, 2, 3, 2, 3, 3]}
          onClick={() => navigate('/app/scan-history')}
        />
      </div>

      {/* 3. Middle Section: Risk Distribution & Live Scan Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 xl:col-span-5">
          <RiskDistributionChart onSelectSeverity={() => navigate('/app/findings')} />
        </div>
        <div className="lg:col-span-6 xl:col-span-7">
          <ScanActivityCard />
        </div>
      </div>

      {/* 4. Bottom Section: Findings Feed & Entity Topology Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 xl:col-span-8">
          <RecentFindingsTable />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <ThreatIntelligenceWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
