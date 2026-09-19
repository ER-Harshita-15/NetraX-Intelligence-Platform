import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  Cctv,
  MapPin,
  Bot,
  FileText,
  Settings,
  HelpCircle,
  Shield,
  Radio,
  ChevronRight,
  Phone,
  Share2
} from 'lucide-react';

export type NavItemId =
  | 'dashboard'
  | 'cases'
  | 'fir'
  | 'surveillance'
  | 'calls'
  | 'network'
  | 'evidence'
  | 'map'
  | 'ai-assistant'
  | 'reports'
  | 'settings'
  | 'help';

export interface NavItemConfig {
  id: NavItemId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeType?: 'accent' | 'warning' | 'default';
  isAi?: boolean;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cases', label: 'Cases', icon: Briefcase, badge: '12', badgeType: 'accent' },
  { id: 'fir', label: 'FIR & Documents', icon: FileText, badge: 'OCR', badgeType: 'accent' },
  { id: 'surveillance', label: 'Surveillance', icon: Cctv, badge: 'LIVE', badgeType: 'warning' },
  { id: 'calls', label: 'Call Records', icon: Phone, badge: 'CDR', badgeType: 'accent' },
  { id: 'network', label: 'Criminal Network', icon: Share2 },
  { id: 'evidence', label: 'Evidence', icon: FileCheck2, badge: '86' },
  { id: 'map', label: 'Investigation Map', icon: MapPin },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, isAi: true, badge: 'GEN-2', badgeType: 'accent' },
  { id: 'reports', label: 'Reports', icon: FileText },
];

export const BOTTOM_NAV_ITEMS: NavItemConfig[] = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Docs', icon: HelpCircle },
];

export interface SidebarProps {
  activeId?: NavItemId;
  onSelect?: (id: NavItemId) => void;
  className?: string;
  compact?: boolean;
  systemStatus?: 'operational' | 'alert' | 'processing';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeId = 'surveillance',
  onSelect,
  className = '',
  compact = false,
  systemStatus = 'operational',
}) => {
  return (
    <aside
      id="netrax-sidebar"
      style={{ width: compact ? '72px' : '240px' }}
      className={`h-full bg-[#0F151C] border-r border-[#26313D] flex flex-col justify-between select-none transition-all duration-200 shrink-0 ${className}`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#26313D]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-[6px] bg-[#151D26] border border-[#2DD4FF]/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(45,212,255,0.15)]">
              <Shield className="w-4 h-4 text-[#2DD4FF]" />
            </div>
            {!compact && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold tracking-wider text-[15px] text-[#F8FAFC]">
                    NETRA<span className="text-[#2DD4FF]">X</span>
                  </span>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#2DD4FF]/15 text-[#2DD4FF] border border-[#2DD4FF]/30">
                    INTEL
                  </span>
                </div>
                <span className="text-[10px] text-[#64748B] font-mono leading-none">
                  SURVEILLANCE CORE
                </span>
              </div>
            )}
          </div>

          {!compact && (
            <div className="flex items-center gap-1.5" title="System Operational">
              <span className="relative flex h-2 w-2">
                {systemStatus === 'operational' && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    systemStatus === 'operational'
                      ? 'bg-[#22C55E]'
                      : systemStatus === 'alert'
                      ? 'bg-[#EF4444]'
                      : 'bg-[#2DD4FF]'
                  }`}
                />
              </span>
            </div>
          )}
        </div>

        {/* Primary Navigation List */}
        <div className="p-3 space-y-1">
          {!compact && (
            <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#64748B]">
              INVESTIGATION NAV
            </div>
          )}

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => onSelect?.(item.id)}
                title={compact ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-[6px] text-[13px] font-medium transition-all group relative text-left ${
                  isActive
                    ? 'bg-[#2DD4FF]/10 text-[#F8FAFC] font-semibold border-l-2 border-[#2DD4FF] pl-2.5'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D26] border-l-2 border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#2DD4FF]' : 'text-[#64748B] group-hover:text-[#94A3B8]'
                  }`}
                />

                {!compact && (
                  <span className="truncate flex-1 flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] leading-none ${
                          item.badgeType === 'accent'
                            ? 'bg-[#2DD4FF]/15 text-[#2DD4FF] border border-[#2DD4FF]/30'
                            : item.badgeType === 'warning'
                            ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                            : 'bg-[#151D26] text-[#64748B] border border-[#26313D]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation & Security Status */}
      <div className="p-3 border-t border-[#26313D] space-y-2">
        <div className="space-y-1">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => onSelect?.(item.id)}
                title={compact ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-[6px] text-[13px] font-medium transition-all group text-left ${
                  isActive
                    ? 'bg-[#2DD4FF]/10 text-[#2DD4FF]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D26]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#2DD4FF]' : 'text-[#64748B] group-hover:text-[#94A3B8]'
                  }`}
                />
                {!compact && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Node Telemetry Capsule */}
        {!compact && (
          <div className="p-2.5 rounded-[6px] bg-[#111820] border border-[#26313D] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#2DD4FF] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-[#F8FAFC]">SEC-NODE-04</span>
                <span className="text-[10px] text-[#64748B] font-mono">ENCRYPTED 256</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#22C55E]">ONLINE</span>
          </div>
        )}
      </div>
    </aside>
  );
};
