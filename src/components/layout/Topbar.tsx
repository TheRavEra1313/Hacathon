import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, Command, X, ShieldAlert, Menu, Sparkles } from 'lucide-react';
import { useAegis } from '../../context/AegisContext';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const { theme, toggleTheme, searchQuery, setSearchQuery, findings, brands, setIsScanWizardOpen } = useAegis();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const filteredFindings = searchQuery.trim()
    ? findings.filter(
        f =>
          f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.associatedBrand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredBrands = searchQuery.trim()
    ? brands.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <header
      className="h-16 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 transition-colors duration-200 border-b shrink-0"
      style={{
        backgroundColor: 'var(--topbar-bg)',
        borderColor: 'var(--border-color)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Search Bar / Quick Trigger */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full">
          <div
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border text-xs cursor-pointer transition-all w-full group"
            style={{
              backgroundColor: 'var(--card-sub-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            <Search size={14} style={{ color: 'var(--primary-accent)' }} />
            <span className="flex-1 text-left truncate opacity-80 group-hover:opacity-100">
              Search brands, threats, IOCs, domains...
            </span>
            <kbd
              className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] rounded border font-mono opacity-70"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'rgba(0,0,0,0.04)'
              }}
            >
              <Command size={10} /> K
            </kbd>
          </div>
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Scan Initiation Button */}
        <button
          onClick={() => setIsScanWizardOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{
            backgroundColor: 'var(--primary-accent)',
            color: '#FFFFFF'
          }}
        >
          <Sparkles size={13} />
          <span>New Probe</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-2xl border p-4 shadow-2xl z-50 text-xs backdrop-blur-xl"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <div
                className="flex items-center justify-between pb-3 border-b mb-3"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Alerts & Telemetry</span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold"
                  style={{
                    backgroundColor: 'var(--primary-accent-muted)',
                    color: 'var(--primary-accent)'
                  }}
                >
                  3 unread
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 cursor-pointer hover:bg-rose-500/15 transition-colors">
                  <p className="text-rose-500 font-semibold text-xs">Critical App Impersonation</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>Acme Banking Pro detected on unauthorized mirror repo.</p>
                  <span className="text-[9px] mt-1 block opacity-60" style={{ color: 'var(--text-muted)' }}>15 min ago</span>
                </div>
                <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 cursor-pointer hover:bg-orange-500/15 transition-colors">
                  <p className="text-orange-500 font-semibold text-xs">Reverse Proxy Credential Harvest</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>acme-corp-secure.com active with valid SSL cert.</p>
                  <span className="text-[9px] mt-1 block opacity-60" style={{ color: 'var(--text-muted)' }}>2 hours ago</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/15 transition-colors">
                  <p className="text-emerald-500 font-semibold text-xs">Automated Takedown Success</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>Fake Globex Careers Facebook group removed.</p>
                  <span className="text-[9px] mt-1 block opacity-60" style={{ color: 'var(--text-muted)' }}>5 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border transition-all hover:scale-105"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--card-sub-bg)',
            color: 'var(--primary-accent)'
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Global Search Dialog Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
          <div
            className="border rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl backdrop-blur-xl animate-fade-in"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
          >
            <div
              className="p-3.5 border-b flex items-center gap-3"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <Search size={18} style={{ color: 'var(--primary-accent)' }} />
              <input
                type="text"
                autoFocus
                placeholder="Search threats, brands, URLs, IOCs, or analysts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm flex-1"
                style={{ color: 'var(--text-primary)' }}
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 rounded-lg hover:opacity-80"
                style={{ color: 'var(--text-secondary)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Results */}
            <div className="max-h-96 overflow-y-auto p-3 text-xs flex flex-col gap-3">
              {searchQuery.trim() === '' ? (
                <div className="p-6 text-center" style={{ color: 'var(--text-secondary)' }}>
                  <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Intelligence Index</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Type an organization name, keyword, or threat finding title.</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <span className="px-2 py-1 rounded border font-mono text-[10px]" style={{ borderColor: 'var(--border-color)' }}>Acme</span>
                    <span className="px-2 py-1 rounded border font-mono text-[10px]" style={{ borderColor: 'var(--border-color)' }}>Globex</span>
                    <span className="px-2 py-1 rounded border font-mono text-[10px]" style={{ borderColor: 'var(--border-color)' }}>Banking</span>
                  </div>
                </div>
              ) : (
                <>
                  {filteredBrands.length > 0 && (
                    <div>
                      <div
                        className="text-[10px] uppercase font-mono tracking-wider mb-1.5 px-2 font-bold"
                        style={{ color: 'var(--primary-accent)' }}
                      >
                        Brands
                      </div>
                      {filteredBrands.map(b => (
                        <div
                          key={b.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            navigate('/app/brands');
                          }}
                          className="flex items-center justify-between p-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs"
                              style={{
                                backgroundColor: 'var(--primary-accent-muted)',
                                color: 'var(--primary-accent)'
                              }}
                            >
                              {b.logo}
                            </span>
                            <span style={{ color: 'var(--text-primary)' }}>{b.name}</span>
                          </div>
                          <span className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>{b.domain}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredFindings.length > 0 && (
                    <div>
                      <div
                        className="text-[10px] uppercase font-mono tracking-wider mb-1.5 px-2 font-bold"
                        style={{ color: 'var(--primary-accent)' }}
                      >
                        Findings
                      </div>
                      {filteredFindings.map(f => (
                        <div
                          key={f.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            navigate('/app/findings');
                          }}
                          className="flex items-center justify-between p-2 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <ShieldAlert size={14} className="text-rose-500 shrink-0" />
                            <span className="truncate" style={{ color: 'var(--text-primary)' }}>{f.title}</span>
                          </div>
                          <span className="text-[10px] uppercase shrink-0 font-mono font-bold" style={{ color: 'var(--text-secondary)' }}>
                            {f.risk}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
