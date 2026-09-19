import React from 'react';
import { BadgeVariant } from '../../types';

export interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

interface BadgeConfig {
  defaultLabel: string;
  dotColor: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  pulseDefault?: boolean;
}

const BADGE_CONFIGS: Record<BadgeVariant, BadgeConfig> = {
  active: {
    defaultLabel: 'ACTIVE',
    dotColor: 'bg-[#22C55E]',
    textColor: 'text-[#22C55E]',
    bgColor: 'bg-[#22C55E]/10',
    borderColor: 'border-[#22C55E]/25',
  },
  processing: {
    defaultLabel: 'PROCESSING',
    dotColor: 'bg-[#2DD4FF]',
    textColor: 'text-[#2DD4FF]',
    bgColor: 'bg-[#2DD4FF]/10',
    borderColor: 'border-[#2DD4FF]/25',
    pulseDefault: true,
  },
  completed: {
    defaultLabel: 'COMPLETED',
    dotColor: 'bg-[#94A3B8]',
    textColor: 'text-[#94A3B8]',
    bgColor: 'bg-[#151D26]',
    borderColor: 'border-[#26313D]',
  },
  offline: {
    defaultLabel: 'OFFLINE',
    dotColor: 'bg-[#64748B]',
    textColor: 'text-[#64748B]',
    bgColor: 'bg-[#111820]',
    borderColor: 'border-[#26313D]/60',
  },
  high_confidence: {
    defaultLabel: 'HIGH CONFIDENCE',
    dotColor: 'bg-[#22C55E]',
    textColor: 'text-[#22C55E]',
    bgColor: 'bg-[#22C55E]/10',
    borderColor: 'border-[#22C55E]/25',
  },
  medium_confidence: {
    defaultLabel: 'MEDIUM CONFIDENCE',
    dotColor: 'bg-[#F59E0B]',
    textColor: 'text-[#F59E0B]',
    bgColor: 'bg-[#F59E0B]/10',
    borderColor: 'border-[#F59E0B]/25',
  },
  low_confidence: {
    defaultLabel: 'LOW CONFIDENCE',
    dotColor: 'bg-[#EF4444]',
    textColor: 'text-[#EF4444]',
    bgColor: 'bg-[#EF4444]/10',
    borderColor: 'border-[#EF4444]/25',
  },
  alert: {
    defaultLabel: 'ALERT',
    dotColor: 'bg-[#EF4444]',
    textColor: 'text-[#EF4444]',
    bgColor: 'bg-[#EF4444]/15',
    borderColor: 'border-[#EF4444]/40',
    pulseDefault: true,
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  label,
  size = 'md',
  pulse,
  className = '',
}) => {
  const config = BADGE_CONFIGS[variant] || BADGE_CONFIGS.active;
  const isPulsing = pulse !== undefined ? pulse : config.pulseDefault;
  const text = label || config.defaultLabel;

  const sizeClasses =
    size === 'sm'
      ? 'text-[10px] leading-[14px] px-2 py-0.5 rounded-[4px] gap-1.5'
      : 'text-[11px] leading-[16px] px-2.5 py-1 rounded-[6px] gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-mono font-medium tracking-wider uppercase border select-none whitespace-nowrap ${sizeClasses} ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {isPulsing && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dotColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.dotColor}`} />
      </span>
      <span>{text}</span>
    </span>
  );
};
