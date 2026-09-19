import React from 'react';
import { CaseItem } from '../../types';
import { StatusBadge } from '../data/StatusBadge';
import { Button } from '../buttons/Button';
import { SAMPLE_CASES } from '../data/InvestigationTable';
export { SAMPLE_CASES };
import {
  Briefcase,
  Crosshair,
  FileText,
  Clock,
  ChevronRight,
  Shield,
  Cctv,
  User
} from 'lucide-react';

export interface CaseCardProps {
  caseItem: CaseItem;
  variant?: 'compact' | 'expanded';
  isSelected?: boolean;
  onSelect?: (caseItem: CaseItem) => void;
  onView?: (caseId: string) => void;
  className?: string;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  caseItem,
  variant = 'compact',
  isSelected = false,
  onSelect,
  onView,
  className = '',
}) => {
  const getPriorityColor = (priority: CaseItem['priority']) => {
    switch (priority) {
      case 'critical':
        return 'text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/15';
      case 'high':
        return 'text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/15';
      case 'medium':
        return 'text-[#2DD4FF] border-[#2DD4FF]/20 bg-[#2DD4FF]/10';
      default:
        return 'text-[#94A3B8] border-[#26313D] bg-[#151D26]';
    }
  };

  // COMPACT VARIANT
  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelect?.(caseItem)}
        className={`rounded-[8px] bg-[#111820] border p-3.5 transition-all group cursor-pointer ${
          isSelected
            ? 'border-[#2DD4FF] bg-[#151D26] shadow-[0_0_12px_rgba(45,212,255,0.08)]'
            : 'border-[#26313D] hover:border-[#26313D]/90 hover:bg-[#151D26]/50'
        } ${className}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-mono font-bold text-[#2DD4FF]">
                {caseItem.caseNumber}
              </span>
              <span className="text-[11px] font-mono text-[#64748B]">• {caseItem.sector}</span>
            </div>
            <h5 className="text-[14px] font-semibold text-[#F8FAFC] mt-0.5 group-hover:text-[#2DD4FF] transition-colors line-clamp-1">
              {caseItem.type}
            </h5>
          </div>
          <StatusBadge variant="active" size="sm" />
        </div>

        <div className="mt-2.5 pt-2 border-t border-[#26313D]/60 flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#94A3B8] truncate max-w-[200px]">
            Last activity: {caseItem.lastActivity}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#2DD4FF] shrink-0" />
        </div>
      </div>
    );
  }

  // EXPANDED VARIANT
  return (
    <div
      onClick={() => onSelect?.(caseItem)}
      className={`rounded-[8px] bg-[#111820] border p-5 transition-all group cursor-pointer ${
        isSelected
          ? 'border-[#2DD4FF] bg-[#151D26] shadow-[0_0_15px_rgba(45,212,255,0.1)]'
          : 'border-[#26313D] hover:border-[#26313D]/90'
      } ${className}`}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#26313D] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[6px] bg-[#151D26] border border-[#26313D] flex items-center justify-center text-[#2DD4FF]">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-mono font-bold text-[#2DD4FF]">
                {caseItem.caseNumber}
              </span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-mono uppercase font-semibold border ${getPriorityColor(
                  caseItem.priority
                )}`}
              >
                {caseItem.priority} PRIORITY
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#64748B]">{caseItem.sector}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge variant="active" />
          <span className="text-[11px] font-mono text-[#64748B]">Updated {caseItem.updatedAt}</span>
        </div>
      </div>

      {/* Case Details Body */}
      <div className="py-3.5 space-y-2.5">
        <h4 className="text-[16px] font-semibold text-[#F8FAFC] leading-snug">
          {caseItem.title}
        </h4>
        <p className="text-[13px] text-[#94A3B8] leading-relaxed">
          {caseItem.summary}
        </p>

        {/* Telemetry chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
          <div className="p-2 rounded-[6px] bg-[#0F151C] border border-[#26313D] flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#64748B]" />
            <div className="truncate">
              <span className="text-[10px] text-[#64748B] block font-mono">LEAD DETECTIVE</span>
              <span className="text-[11px] text-[#F8FAFC] font-medium truncate block">
                {caseItem.assignedOfficer}
              </span>
            </div>
          </div>

          <div className="p-2 rounded-[6px] bg-[#0F151C] border border-[#26313D] flex items-center gap-2">
            <Cctv className="w-3.5 h-3.5 text-[#2DD4FF]" />
            <div>
              <span className="text-[10px] text-[#64748B] block font-mono">CAMERAS LINKED</span>
              <span className="text-[11px] text-[#F8FAFC] font-medium block">
                {caseItem.camerasInvolved} Surveillance Feeds
              </span>
            </div>
          </div>

          <div className="p-2 rounded-[6px] bg-[#0F151C] border border-[#26313D] flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#22C55E]" />
            <div>
              <span className="text-[10px] text-[#64748B] block font-mono">EVIDENCE DOSSIER</span>
              <span className="text-[11px] text-[#F8FAFC] font-medium block">
                {caseItem.evidenceCount} Tagged Assets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="pt-3 border-t border-[#26313D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[12px] font-mono text-[#F8FAFC]">
          <Crosshair className="w-4 h-4 text-[#2DD4FF] shrink-0" />
          <span className="truncate">
            <strong className="text-[#94A3B8]">Last activity:</strong> {caseItem.lastActivity}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onView?.(caseItem.id);
            }}
          >
            Review Dossier
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Track Incident
          </Button>
        </div>
      </div>
    </div>
  );
};
