import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ScanWizardModal } from '../scans/ScanWizardModal';
import { FindingDetailDrawer } from '../findings/FindingDetailDrawer';
import { GradientWaves } from '../react-bits/GradientWaves';
import { useAegis } from '../../context/AegisContext';
import { X } from 'lucide-react';

export const AppShell: React.FC = () => {
  const { theme } = useAegis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className="flex h-[100dvh] w-full overflow-hidden transition-colors duration-200 relative"
      style={{
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Dynamic Ambient Background: GradientWaves from React Bits */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <GradientWaves
          horizonColor={theme === 'dark' ? '#0B0D0C' : '#F7EEE5'}
          waveColor={theme === 'dark' ? '#2A1F13' : '#D7B69B'}
          crestColor={theme === 'dark' ? '#E8C18B' : '#B96F4C'}
          speed={0.25}
          amplitude={1.8}
          waveScale={0.5}
          waveRatio={0.85}
          swell={25}
          turbulence={15}
          tilt={1.2}
          zoom={1.05}
          height={6.2}
          fogDepth={18}
          detail="medium"
          brightness={theme === 'dark' ? 0.75 : 0.9}
          opacity={theme === 'dark' ? 0.38 : 0.32}
          mouseInteraction={true}
          parallaxStrength={0.35}
          grain={true}
          grainIntensity={0.03}
        />
      </div>

      {/* Desktop Persistent Floating Sidebar */}
      <div className="hidden lg:block shrink-0 relative h-full z-10">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
        />
      </div>

      {/* Mobile Sidebar Overlay with Backdrop Blur */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="w-64 h-full relative border-r shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-main)',
              borderColor: 'var(--border-color)'
            }}
          >
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main App Container */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative z-10">
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Scrollable Main Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 min-h-0">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <ScanWizardModal />
      <FindingDetailDrawer />
    </div>
  );
};

export default AppShell;
