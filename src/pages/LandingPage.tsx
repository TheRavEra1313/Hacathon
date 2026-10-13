import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Shield,
  Users,
  Smartphone,
  Globe,
  Database,
  ExternalLink,
  Eye,
  Sun,
  Moon
} from 'lucide-react';
import { RadialGlowButton } from '../components/ui/radial-glow-button';
import { SpotlightNavbar } from '../components/ui/spotlight-navbar';
import { useAegis } from '../context/AegisContext';
import GradientWaves from '../components/react-bits/GradientWaves';
import Lanyard, { DEMO_MEMBERS } from '../components/react-bits/Lanyard';
import { AegisLogo } from '../components/common/AegisLogo';

export const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useAegis();
  const [selectedMember, setSelectedMember] = useState(DEMO_MEMBERS[0]);

  return (
    <div
      className="min-h-screen selection:bg-[#B96F4C]/30 relative overflow-hidden transition-colors duration-200"
      style={{
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-primary)'
      }}
    >
      {/* 1. Header Navigation with Integrated SpotlightNavbar */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b px-6 py-3.5 transition-colors duration-200"
        style={{
          backgroundColor: 'var(--topbar-bg)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3 group shrink-0">
            <AegisLogo size={40} showGlow={true} />
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-widest font-mono" style={{ color: 'var(--text-primary)' }}>
                AEGIS
              </span>
              <span className="text-[9px] uppercase tracking-widest font-medium -mt-1" style={{ color: 'var(--primary-accent)' }}>
                Digital Risk Protection
              </span>
            </div>
          </NavLink>

          {/* Centered Dynamic Spotlight Navbar */}
          <div className="hidden md:flex flex-1 justify-center max-w-xl">
            <SpotlightNavbar
              items={[
                { label: 'Overview', href: '#overview' },
                { label: 'Features', href: '#features' },
                { label: 'Platform Preview', href: '#preview', badge: 'Live' },
                { label: 'Mission & Team', href: '#about' },
              ]}
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border transition-all hover:scale-105 cursor-pointer"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--card-sub-bg)',
                color: 'var(--primary-accent)'
              }}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <NavLink
              to="/app"
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-colors hidden sm:inline-block hover:opacity-80"
              style={{ color: 'var(--text-secondary)' }}
            >
              Sign In
            </NavLink>
            <NavLink to="/app">
              <RadialGlowButton className="!py-2 !px-4 !text-xs !min-w-[130px] !min-h-[36px]">
                Launch Platform →
              </RadialGlowButton>
            </NavLink>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Live GradientWaves Background for BOTH Dark and Light Modes */}
      <section id="overview" className="relative min-h-[90vh] flex items-center justify-center px-6 sm:px-12 py-16 overflow-hidden">
        {/* Full-width GradientWaves Background */}
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        >
          <GradientWaves
            key={theme}
            horizonColor={theme === 'dark' ? '#5227FF' : '#F58220'}
            waveColor={theme === 'dark' ? '#FF9FFC' : '#FFA866'}
            crestColor={theme === 'dark' ? '#FFFFFF' : '#FFF2E6'}
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1}
            opacity={theme === 'dark' ? 0.59 : 0.65}
            mouseInteraction
            parallaxStrength={0.5}
            grain
            grainIntensity={0.05}
          />
        </div>

        {/* Ambient center radial glow adapting to theme */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[320px] rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-300"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(82, 39, 255, 0.16)' : 'rgba(245, 130, 32, 0.2)'
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono shadow-md backdrop-blur-md"
            style={{
              backgroundColor: 'var(--card-sub-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  theme === 'dark'
                    ? 'linear-gradient(to right, #E8C18B, #F4F0E9)'
                    : 'linear-gradient(to right, #B96F4C, #39251B)'
              }}
            >
              AEGIS NEXT-GEN DIGITAL PERIMETER • 2026 INTELLIGENCE ENGINE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] font-mono" style={{ color: 'var(--text-primary)' }}>
            Autonomous Defense for Modern Brand Perimeters.
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            See threats before they become damage. AEGIS delivers autonomous brand protection across lookalike domains,
            executive social impersonation, rogue mobile store mirrors, and leaked credentials.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink to="/app">
              <RadialGlowButton className="!py-3.5 !px-8 !text-sm !min-w-[210px]">
                Launch SecOps Console →
              </RadialGlowButton>
            </NavLink>

            <a
              href="#preview"
              className="px-6 py-3.5 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2"
              style={{
                backgroundColor: 'var(--card-sub-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <Eye size={15} style={{ color: 'var(--primary-accent)' }} />
              Live Interactive Preview
            </a>
          </div>

          {/* Telemetry Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t max-w-3xl mx-auto"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: 'var(--primary-accent)' }}>99.8%</div>
              <span className="text-[11px] uppercase font-mono" style={{ color: 'var(--text-muted)' }}>Detection Accuracy</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: 'var(--primary-accent)' }}>&lt; 4.2h</div>
              <span className="text-[11px] uppercase font-mono" style={{ color: 'var(--text-muted)' }}>Median Takedown</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: 'var(--primary-accent)' }}>14.8M+</div>
              <span className="text-[11px] uppercase font-mono" style={{ color: 'var(--text-muted)' }}>Domains Analyzed</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono" style={{ color: 'var(--primary-accent)' }}>Zero</div>
              <span className="text-[11px] uppercase font-mono" style={{ color: 'var(--text-muted)' }}>False Breaches</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Miniature Dashboard Preview */}
      <section
        id="preview"
        className="px-6 sm:px-12 py-16 border-y transition-colors duration-200"
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold" style={{ color: 'var(--primary-accent)' }}>
              Autonomous Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1" style={{ color: 'var(--text-primary)' }}>
              Precision Intelligence Interface
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              The exact dashboard SecOps teams use daily to triage brand abuse.
            </p>
          </div>

          <div
            className="rounded-2xl border p-5 shadow-2xl relative group overflow-hidden"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}
          >
            <div
              className="flex items-center justify-between pb-4 border-b"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono ml-2" style={{ color: 'var(--text-muted)' }}>aegis.cloud/secops/overview</span>
              </div>
              <NavLink
                to="/app"
                className="text-xs hover:underline font-semibold flex items-center gap-1"
                style={{ color: 'var(--primary-accent)' }}
              >
                Open Full System <ExternalLink size={12} />
              </NavLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div
                className="p-3.5 rounded-xl border space-y-1"
                style={{
                  backgroundColor: 'var(--card-sub-bg)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-rose-500 font-semibold">● CRITICAL</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>4m ago</span>
                </div>
                <div className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>acme-secure-login.xyz</div>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Reverse proxy credential harvest targeting SSO.</p>
              </div>

              <div
                className="p-3.5 rounded-xl border space-y-1"
                style={{
                  backgroundColor: 'var(--card-sub-bg)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-orange-500 font-semibold">● HIGH</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>18m ago</span>
                </div>
                <div className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>@acme_official_help_bot</div>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Telegram rogue support handle soliciting passcodes.</p>
              </div>

              <div
                className="p-3.5 rounded-xl border space-y-1"
                style={{
                  backgroundColor: 'var(--card-sub-bg)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-emerald-500 font-semibold">● RESOLVED</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>1h ago</span>
                </div>
                <div className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>Acme Mobile Pro v4.9.apk</div>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Rogue mirror taken offline via domain registrar notice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Surveillance Vectors */}
      <section id="features" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-widest font-semibold" style={{ color: 'var(--primary-accent)' }}>
            Full Spectrum Surveillance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Four Vectors of Digital Defense
          </h2>
          <p className="text-xs sm:text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            Proactive sensors constantly index public, deep, and rogue surface areas for brand abuse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Globe,
              title: 'Domain & Typosquatting',
              desc: 'Identifies homoglyphs, combo-squats, punycode spoofing, and rogue MX/DNS entries the moment they register.',
              stat: '8.2k scans/day'
            },
            {
              icon: Users,
              title: 'Executive Impersonation',
              desc: 'Monitors Twitter, LinkedIn, Instagram, and Telegram for fake executive profiles and deceptive VIP support channels.',
              stat: '98.5% detection rate'
            },
            {
              icon: Smartphone,
              title: 'Rogue App Stores',
              desc: 'Monitors unofficial third-party APK mirrors and official stores for repackaged binaries and trojanized apps.',
              stat: '140+ mirror repos'
            },
            {
              icon: Database,
              title: 'Threat Graph Corroboration',
              desc: 'Correlates common SSL issuers, ASN ownership, and name-server clusters to dismantle threat actor networks.',
              stat: 'Real-time telemetry'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  boxShadow: 'var(--card-glow)'
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: 'var(--card-sub-bg)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--primary-accent)'
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
                <div
                  className="mt-6 pt-4 border-t text-[11px] font-mono flex items-center justify-between"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>Coverage Metric</span>
                  <span className="font-bold" style={{ color: 'var(--primary-accent)' }}>{item.stat}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. 3D Interactive Lanyard Section with Identity Showcase */}
      <section
        id="about"
        className="px-6 sm:px-12 py-24 border-t relative overflow-hidden transition-colors duration-200"
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Narrative */}
          <div className="max-w-xl space-y-5">
            <span
              className="text-xs uppercase font-mono tracking-widest font-semibold px-3 py-1 rounded-full border inline-block"
              style={{
                backgroundColor: 'var(--card-sub-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--primary-accent)'
              }}
            >
              Interactive Team Dossier
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Built by Specialized Intelligence Architects
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Drag, flick, and rotate the credential pass. Click to flip the badge and inspect technical clearances,
              biometric credentials, and threat response specializations.
            </p>

            {/* Team Selector Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                Select Active Operator:
              </span>
              <div className="flex flex-wrap gap-2">
                {DEMO_MEMBERS.map((m) => {
                  const active = selectedMember.id === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMember(m)}
                      className="px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all duration-200"
                      style={{
                        backgroundColor: active ? 'var(--primary-accent)' : 'var(--card-sub-bg)',
                        borderColor: active ? 'var(--primary-accent)' : 'var(--border-color)',
                        color: active ? '#FFFFFF' : 'var(--text-secondary)'
                      }}
                    >
                      {m.name} ({m.accessLevel.split('•')[0].trim()})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Operator Quick Metadata */}
            <div
              className="p-4 rounded-xl border text-xs space-y-1.5 mt-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Active Operator:</span>
                <span className="font-bold font-mono" style={{ color: 'var(--primary-accent)' }}>{selectedMember.name}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Department:</span>
                <span style={{ color: 'var(--text-primary)' }}>{selectedMember.dept}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Specialization:</span>
                <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>{selectedMember.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Interactions:</span>
                <span className="text-[11px]" style={{ color: 'var(--primary-accent)' }}>
                  Drag to rotate • Click badge to flip
                </span>
              </div>
            </div>
          </div>

          {/* Right 3D Lanyard Interactive Badge */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <Lanyard members={[selectedMember, ...DEMO_MEMBERS.filter(m => m.id !== selectedMember.id)]} onSelectMember={setSelectedMember} />
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer
        className="px-6 py-10 border-t text-xs transition-colors duration-200"
        style={{
          backgroundColor: 'var(--bg-main)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-muted)'
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <AegisLogo size={30} showGlow={false} />
            <span className="text-sm font-bold font-mono" style={{ color: 'var(--text-primary)' }}>AEGIS Brand Protection</span>
          </div>

          <div className="flex items-center gap-6" style={{ color: 'var(--text-secondary)' }}>
            <NavLink to="/app" className="hover:opacity-80">Dashboard</NavLink>
            <NavLink to="/app/findings" className="hover:opacity-80">Threat Matrix</NavLink>
            <NavLink to="/app/settings" className="hover:opacity-80">Settings</NavLink>
            <a href="#about" className="hover:opacity-80">About</a>
          </div>

          <p className="text-[11px]">
            © 2026 AEGIS Security Intelligence. Interactive Prototype Edition.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
