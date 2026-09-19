import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface KpiCardProps {
  label: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
    timeframe?: string;
  };
  icon?: React.ReactNode;
  accentColor?: string;
  highlight?: boolean;
  subtext?: string;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  change,
  icon,
  accentColor = '#2DD4FF',
  highlight = false,
  subtext,
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-[8px] bg-[#111820] border p-4 transition-all duration-150 group overflow-hidden ${
        highlight
          ? 'border-[#2DD4FF]/40 bg-[#151D26]/70 shadow-[0_0_15px_rgba(45,212,255,0.06)]'
          : 'border-[#26313D] hover:border-[#26313D]/90'
      } ${className}`}
    >
      {/* Subtle top indicator bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium truncate">
          {label}
        </span>
        {icon && (
          <div className="w-7 h-7 rounded-[6px] bg-[#151D26] border border-[#26313D] flex items-center justify-center text-[#94A3B8] group-hover:text-[#2DD4FF] transition-colors shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-2">
        <div className="text-[28px] leading-[34px] font-bold font-mono tracking-tight text-[#F8FAFC]">
          {value}
        </div>

        {change && (
          <div
            className={`flex items-center gap-0.5 text-[11px] font-mono font-medium ${
              change.trend === 'up'
                ? 'text-[#22C55E]'
                : change.trend === 'down'
                ? 'text-[#EF4444]'
                : 'text-[#94A3B8]'
            }`}
          >
            {change.trend === 'up' ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : change.trend === 'down' ? (
              <ArrowDownRight className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            <span>{change.value}</span>
          </div>
        )}
      </div>

      {(subtext || (change && change.timeframe)) && (
        <p className="mt-1.5 text-[11px] text-[#64748B] font-mono truncate">
          {subtext || change?.timeframe}
        </p>
      )}
    </div>
  );
};
