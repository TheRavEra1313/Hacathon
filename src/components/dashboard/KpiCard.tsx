import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useAegis } from '../../context/AegisContext';

interface KpiCardProps {
  title: string;
  value: string | number;
  changeText: string;
  isPositive?: boolean;
  icon: LucideIcon;
  sparklineData: number[];
  accentColor?: string;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  changeText,
  isPositive = true,
  icon: Icon,
  sparklineData,
  accentColor = 'var(--primary-accent)',
  onClick
}) => {
  const maxVal = Math.max(...sparklineData, 1);

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--card-glow)'
      }}
      className="p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden group flex flex-col justify-between hover:border-[var(--border-color-hover)] hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[11px] font-semibold uppercase tracking-wider font-mono opacity-80"
          style={{ color: 'var(--text-secondary)' }}
        >
          {title}
        </span>
        <div
          className="w-7 h-7 rounded-lg border flex items-center justify-center transition-transform group-hover:scale-105"
          style={{
            backgroundColor: 'var(--card-sub-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--primary-accent)'
          }}
        >
          <Icon size={14} />
        </div>
      </div>

      <div className="flex items-end justify-between pt-1">
        <div>
          <div
            className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono"
            style={{ color: 'var(--text-primary)' }}
          >
            {value}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-[11px]">
            <span
              className={`font-medium ${
                isPositive ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {changeText}
            </span>
          </div>
        </div>

        {/* Minimal Sparkline Indicator */}
        <div className="flex items-end gap-1 h-7 pb-0.5">
          {sparklineData.map((val, idx) => {
            const heightPercent = Math.max(18, (val / maxVal) * 100);
            return (
              <div
                key={idx}
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: accentColor,
                  opacity: 0.3 + (idx / sparklineData.length) * 0.7
                }}
                className="w-1.5 rounded-full transition-all group-hover:opacity-100"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
