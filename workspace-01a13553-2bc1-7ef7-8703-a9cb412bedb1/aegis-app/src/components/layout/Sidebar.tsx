import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  Share2,
  Smartphone,
  Network,
  AlertTriangle,
  History,
  FileBarChart,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useAegis } from '../../context/AegisContext';
import { AegisLogo } from '../common/AegisLogo';

interface SidebarProps {
  onCloseMobile?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItemConfig {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  badge?: string | number;
  exact?: boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Overview', path: '/app', icon: LayoutDashboard, exact: true },
  { label: 'Brand Profiles', path: '/app/brands', icon: Shield },
  { label: 'Social Monitoring', path: '/app/social', icon: Share2 },
  { label: 'App Monitoring', path: '/app/apps', icon: Smartphone },
  { label: 'Threat Intelligence', path: '/app/threat-intelligence', icon: Network },
  { label: 'Findings & Triage', path: '/app/findings', icon: AlertTriangle, badge: '37' },
  { label: 'Scan History', path: '/app/scan-history', icon: History },
  { label: 'Reports', path: '/app/reports', icon: FileBarChart },
  { label: 'Settings', path: '/app/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  onCloseMobile,
  collapsed = false,
  onToggleCollapse
}) => {
  const { theme, scans } = useAegis();
  const location = useLocation();

  const activeScansCount = scans.filter(s => s.status === 'running').length;

  return (
    <aside
      className={`h-[100dvh] flex flex-col justify-between select-none transition-all duration-300 relative z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      style={{
        backgroundColor: 'transparent',
        color: 'var(--text-secondary)'
      }}
    >
      {/* Subtle hairline edge separator with gentle blur behind the sidebar text */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 transition-colors duration-200"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRight: '1px solid var(--border-color)',
          background:
            theme === 'dark'
              ? 'linear-gradient(180deg, rgba(11,13,12,0.4) 0%, rgba(14,16,14,0.15) 100%)'
              : 'linear-gradient(180deg, rgba(247,238,229,0.5) 0%, rgba(241,226,212,0.2) 100%)'
        }}
      />

      {/* 1. TOP HEADER (Fixed - Never Scrolls) */}
      <div className="shrink-0 pt-5 pb-3 px-4 flex items-center justify-between">
        <NavLink
          to="/"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group overflow-hidden"
          title="AEGIS Brand Protection"
        >
          <AegisLogo size={34} showGlow={true} withContainer={false} />
          {!collapsed && (
            <div className="flex flex-col min-w-0 transition-opacity duration-200">
              <span
                className="font-bold text-base tracking-wider font-mono truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                AEGIS
              </span>
              <span
                className="text-[9px] uppercase tracking-widest font-medium truncate -mt-0.5"
                style={{ color: 'var(--primary-accent)' }}
              >
                Intelligence
              </span>
            </div>
          )}
        </NavLink>

        {/* Desktop Collapse Toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex w-6 h-6 rounded-md items-center justify-center opacity-60 hover:opacity-100 transition-opacity hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: 'var(--text-secondary)' }}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* 2. MIDDLE NAVIGATION AREA (Independently Scrollable with min-height: 0) */}
      <div className="flex-1 min-h-0 overflow-y-auto sidebar-scroll-area px-3 py-2 flex flex-col gap-1">
        {!collapsed && (
          <div className="px-2.5 pt-1 pb-1 text-[10px] font-mono uppercase tracking-wider font-semibold opacity-60" style={{ color: 'var(--text-muted)' }}>
            Navigation
          </div>
        )}

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 relative ${
                collapsed ? 'justify-center' : ''
              }`}
              style={{
                color: isActive ? 'var(--primary-accent)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--sidebar-hover-bg)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Minimal floating active pill bar on left edge */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full shadow-[0_0_8px_var(--primary-accent)]"
                  style={{ backgroundColor: 'var(--primary-accent)' }}
                />
              )}

              <Icon
                size={17}
                className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  color: isActive ? 'var(--primary-accent)' : 'inherit'
                }}
              />

              {!collapsed && (
                <span className="flex-1 truncate font-medium">
                  {item.label}
                </span>
              )}

              {!collapsed && item.badge && (
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0"
                  style={{
                    backgroundColor: isActive ? 'var(--primary-accent)' : 'var(--primary-accent-muted)',
                    color: isActive ? '#FFFFFF' : 'var(--primary-accent)'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        {/* Live System Status Radar indicator */}
        {!collapsed && (
          <div className="mt-4 pt-3 px-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Autonomous Engine
              </span>
              <span className="text-[10px]" style={{ color: 'var(--primary-accent)' }}>
                {activeScansCount > 0 ? `${activeScansCount} Active` : 'Online'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM USER / STATUS SECTION (Fixed - Never Scrolls) */}
      <div className="shrink-0 p-3 pt-2 border-t flex flex-col gap-2" style={{ borderColor: 'var(--border-color)' }}>
        {/* User Card */}
        <NavLink
          to="/app/settings"
          onClick={onCloseMobile}
          className={`flex items-center gap-2.5 p-2 rounded-xl transition-all hover:bg-black/5 dark:hover:bg-white/5 ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}
          title="Security Profile"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: 'var(--primary-accent-muted)',
                color: 'var(--primary-accent)',
                borderColor: 'var(--primary-accent)'
              }}
            >
              AC
            </div>
            {!collapsed && (
              <div className="flex flex-col text-left min-w-0">
                <span className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>Alex Carter</span>
                <span className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>Principal SecOps</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <ChevronDown size={13} style={{ color: 'var(--text-muted)' }} />
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
