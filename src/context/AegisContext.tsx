import React, { createContext, useContext, useEffect, useState } from 'react';
import { Finding, Brand, Scan, Severity, FindingStatus } from '../types';
import { INITIAL_BRANDS, INITIAL_FINDINGS, INITIAL_SCANS } from '../data/mockData';

interface AegisContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  brands: Brand[];
  findings: Finding[];
  scans: Scan[];
  selectedFinding: Finding | null;
  setSelectedFinding: (f: Finding | null) => void;
  isScanWizardOpen: boolean;
  setIsScanWizardOpen: (open: boolean) => void;
  runNewScan: (brandId: string, targets: string[], scanType: string) => Promise<void>;
  updateFindingStatus: (id: string, status: FindingStatus) => void;
  addBrand: (brand: Partial<Brand>) => void;
  retryScan: (scanId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AegisContext = createContext<AegisContextType | undefined>(undefined);

export const AegisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('aegis-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const [brands, setBrands] = useState<Brand[]>(() => {
    const saved = localStorage.getItem('aegis-brands');
    return saved ? JSON.parse(saved) : INITIAL_BRANDS;
  });

  const [findings, setFindings] = useState<Finding[]>(() => {
    const saved = localStorage.getItem('aegis-findings');
    return saved ? JSON.parse(saved) : INITIAL_FINDINGS;
  });

  const [scans, setScans] = useState<Scan[]>(() => {
    const saved = localStorage.getItem('aegis-scans');
    return saved ? JSON.parse(saved) : INITIAL_SCANS;
  });

  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [isScanWizardOpen, setIsScanWizardOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('aegis-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('aegis-brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('aegis-findings', JSON.stringify(findings));
  }, [findings]);

  useEffect(() => {
    localStorage.setItem('aegis-scans', JSON.stringify(scans));
  }, [scans]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateFindingStatus = (id: string, status: FindingStatus) => {
    setFindings(prev =>
      prev.map(f => (f.id === id ? { ...f, status } : f))
    );
    if (selectedFinding && selectedFinding.id === id) {
      setSelectedFinding(prev => (prev ? { ...prev, status } : null));
    }
  };

  const addBrand = (newB: Partial<Brand>) => {
    const brand: Brand = {
      id: `brand-${Date.now()}`,
      name: newB.name || 'New Monitored Brand',
      domain: newB.domain || 'example.com',
      logo: (newB.name || 'B').charAt(0).toUpperCase(),
      status: 'active',
      monitoredAssets: 12,
      riskScore: 35,
      lastScanTime: 'Just now',
      activeFindingsCount: 1,
      description: newB.description || 'Newly monitored organizational brand asset.',
      socialHandles: newB.socialHandles || [],
      protectedKeywords: newB.protectedKeywords || [newB.name?.toLowerCase() || 'asset']
    };
    setBrands(prev => [brand, ...prev]);
  };

  const runNewScan = async (brandId: string, targets: string[], scanType: string) => {
    const brand = brands.find(b => b.id === brandId) || brands[0];
    const newScanId = `scan-${Date.now()}`;
    const newScan: Scan = {
      id: newScanId,
      brandName: brand.name,
      brandId: brand.id,
      status: 'running',
      progress: 15,
      findingsCount: 0,
      highPriorityCount: 0,
      timeAgo: 'Just now',
      timestamp: Date.now(),
      targetCount: targets.length * 120 + 350,
      scanType: (scanType as any) || 'comprehensive'
    };

    setScans(prev => [newScan, ...prev]);

    // Simulate scan progression
    setTimeout(() => {
      setScans(prev =>
        prev.map(s => (s.id === newScanId ? { ...s, progress: 65, findingsCount: 4 } : s))
      );
    }, 1500);

    setTimeout(() => {
      const generatedFinding: Finding = {
        id: `find-${Date.now()}`,
        type: targets.includes('social') ? 'social' : 'domain',
        title: targets.includes('social')
          ? `@${brand.name.toLowerCase().replace(/[^a-z0-9]/g, '')}_rewards_official`
          : `${brand.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-login-verify.site`,
        targetUrl: targets.includes('social')
          ? `https://instagram.com/${brand.name.toLowerCase().replace(/[^a-z0-9]/g, '')}_rewards_official`
          : `https://${brand.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-login-verify.site`,
        associatedBrand: brand.name,
        brandId: brand.id,
        risk: 'high',
        similarity: 91,
        status: 'new',
        detectedTime: 'Just now',
        detectedTimestamp: Date.now(),
        platform: targets.includes('social') ? 'instagram' : 'web',
        dnsHost: 'cloudflare-gateway.protection.net',
        ipAddress: '104.21.55.91',
        registrar: 'Dynadot LLC',
        asn: 'AS13335 Cloudflare',
        assignedAnalyst: 'Alex Carter',
        notes: [
          `Simulated discovery from newly launched ${scanType} scan.`,
          'Pattern similarity match against primary trademark keywords.'
        ]
      };

      setFindings(prev => [generatedFinding, ...prev]);

      setScans(prev =>
        prev.map(s =>
          s.id === newScanId
            ? { ...s, status: 'completed', progress: 100, findingsCount: 6, highPriorityCount: 2 }
            : s
        )
      );
    }, 3200);
  };

  const retryScan = (scanId: string) => {
    setScans(prev =>
      prev.map(s =>
        s.id === scanId
          ? { ...s, status: 'running', progress: 20, errorMessage: undefined, timeAgo: 'Retrying...' }
          : s
      )
    );
    setTimeout(() => {
      setScans(prev =>
        prev.map(s =>
          s.id === scanId
            ? { ...s, status: 'completed', progress: 100, findingsCount: 8, timeAgo: 'Just now' }
            : s
        )
      );
    }, 2000);
  };

  return (
    <AegisContext.Provider
      value={{
        theme,
        toggleTheme,
        brands,
        findings,
        scans,
        selectedFinding,
        setSelectedFinding,
        isScanWizardOpen,
        setIsScanWizardOpen,
        runNewScan,
        updateFindingStatus,
        addBrand,
        retryScan,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AegisContext.Provider>
  );
};

export const useAegis = () => {
  const context = useContext(AegisContext);
  if (!context) {
    throw new Error('useAegis must be used within an AegisProvider');
  }
  return context;
};
