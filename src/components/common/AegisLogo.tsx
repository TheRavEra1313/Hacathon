import React from 'react';
import { useAegis } from '../../context/AegisContext';

interface AegisLogoProps {
  className?: string;
  size?: number | string;
  showGlow?: boolean;
  withContainer?: boolean;
}

export const AegisLogo: React.FC<AegisLogoProps> = ({
  className = '',
  size = 36,
  showGlow = true,
  withContainer = true
}) => {
  const { theme } = useAegis();
  const numericSize = typeof size === 'number' ? size : 36;

  // The custom shield emblem with folded cyan/teal layers
  const emblem = (
    <img
      src="/aegis-logo.png"
      alt="AEGIS Shield Logo"
      className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,229,255,0.25)] transition-transform duration-200 group-hover:scale-105"
      style={{
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    />
  );

  if (!withContainer) {
    return (
      <div
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {emblem}
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-xl flex items-center justify-center p-1.5 transition-all duration-200 border ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: theme === 'dark' ? '#141E24' : '#F1E2D4',
        borderColor: theme === 'dark' ? 'rgba(0, 229, 255, 0.25)' : 'var(--border-color)',
        boxShadow: showGlow
          ? theme === 'dark'
            ? '0 0 16px rgba(0, 210, 235, 0.22), inset 0 0 10px rgba(0, 229, 255, 0.1)'
            : '0 2px 10px rgba(185, 111, 76, 0.15)'
          : 'none'
      }}
    >
      {emblem}
    </div>
  );
};

export default AegisLogo;
