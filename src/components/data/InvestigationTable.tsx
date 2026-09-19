import React, { useState } from 'react';
import { CaseItem } from '../../types';
import { StatusBadge } from './StatusBadge';
import { Button } from '../buttons/Button';
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Crosshair,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export interface InvestigationTableProps {
  cases?: CaseItem[];
  onSelectCase?: (caseItem: CaseItem) => void;
  onViewCase?: (caseId: string) => void;
  isLoading?: boolean;
}

export const SAMPLE_CASES: CaseItem[] = [
  {
    id: 'case-1024',
    caseNumber: 'CASE #NX-1024',
    title: 'Silver Sedan Grand Theft Auto',
    type: 'Vehicle Theft',
    sector: 'Sector 12',
    status: 'active',
    priority: 'high',
    lastActivity: 'Vehicle detected at Camera C-17 (North Ave)',
    assignedOfficer: 'Det. Miller (ID: 442)',
    evidenceCount: 14,
    camerasInvolved: 4,
    summary: 'Silver 2022 sedan stolen at 19:40. Suspect vehicle correlated across 4 surveillance intersections.',
    updatedAt: '2 mins ago',
  },
  {
    id: 'case-1025',
    caseNumber: 'CASE #NX-1025',
    title: 'Commercial Burglary Incursion',
    type: 'Burglary',
    sector: 'Sector 04',
    status: 'active',
    priority: 'critical',
    lastActivity: 'Person of interest detected at Camera C-03',
    assignedOfficer: 'Det. Vance (ID: 109)',
    evidenceCount: 22,
    camerasInvolved: 6,
    summary: 'Forced warehouse entry. Dual suspect tracking identified with hooded apparel.',
    updatedAt: '14 mins ago',
  },
  {
    id: 'case-1022',
    caseNumber: 'CASE #NX-1022',
    title: 'Highway 101 Hit & Run Incident',
    type: 'Traffic Incident',
    sector: 'Sector 09',
    status: 'under_review',
    priority: 'medium',
    lastActivity: 'License plate partially extracted [7XYZ**]',
    assignedOfficer: 'Sgt. Kowalski (ID: 312)',
    evidenceCount: 8,
    camerasInvolved: 3,
    summary: 'Partial plate OCR completed. Awaiting AI confidence refinement across tollway cameras.',
    updatedAt: '1 hour ago',
  },
  {
    id: 'case-1018',
    caseNumber: 'CASE #NX-1018',
    title: 'Transit Terminal Perimeter Breach',
    type: 'Security Breach',
    sector: 'Sector 01',
    status: 'closed',
    priority: 'low',
    lastActivity: 'Movement reconstructed & suspect apprehended',
    assignedOfficer: 'Insp. Chen (ID: 204)',
    evidenceCount: 31,
    camerasInvolved: 8,
    summary: 'Suspect movement trajectory matched across 8 cameras. Report archived.',
    updatedAt: '4 hours ago',
  },
];

export const InvestigationTable: React.FC<InvestigationTableProps> = ({
  cases = SAMPLE_CASES,
  onSelectCase,
  onViewCase,
  isLoading = false,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['case-1024']));
  const [sortField, setSortField] = useState<'caseNumber' | 'priority' | 'updatedAt'>('updatedAt');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const toggleSelectAll = () => {
    if (selectedIds.size === cases.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cases.map((c) => c.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const getPriorityBadge = (priority: CaseItem['priority']) => {
    switch (priority) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-[10px] font-mono font-semibold uppercase">
            CRITICAL
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-[10px] font-mono font-medium uppercase">
            HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-[#2DD4FF]/10 border border-[#2DD4FF]/20 text-[#2DD4FF] text-[10px] font-mono font-medium uppercase">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-[4px] bg-[#151D26] border border-[#26313D] text-[#94A3B8] text-[10px] font-mono font-medium uppercase">
            LOW
          </span>
        );
    }
  };

  if (cases.length === 0) {
    return (
      <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-[#151D26] border border-[#26313D] flex items-center justify-center mx-auto text-[#64748B] mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h4 className="text-[16px] font-semibold text-[#F8FAFC]">No Cases Available</h4>
        <p className="text-[13px] text-[#94A3B8] max-w-sm mx-auto mt-1">
          No investigation records found in this sector query. Create a new case or adjust search criteria.
        </p>
        <Button variant="primary" size="sm" className="mt-4">
          Create Case
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-[8px] bg-[#111820] border border-[#26313D] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#26313D] bg-[#0F151C] text-[11px] font-mono uppercase text-[#64748B] tracking-wider">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={cases.length > 0 && selectedIds.size === cases.length}
                  onChange={toggleSelectAll}
                  className="rounded bg-[#151D26] border-[#26313D] text-[#2DD4FF] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#2DD4FF]"
                />
              </th>
              <th className="py-3 px-4 font-medium">Case ID</th>
              <th className="py-3 px-4 font-medium">Case & Type</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Priority</th>
              <th className="py-3 px-4 font-medium">Last Activity</th>
              <th className="py-3 px-4 font-medium text-right">Updated</th>
              <th className="py-3 px-4 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#26313D] text-[13px]">
            {cases.map((c) => {
              const isSelected = selectedIds.has(c.id);

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelectCase?.(c)}
                  className={`transition-colors cursor-pointer group ${
                    isSelected
                      ? 'bg-[#151D26] border-l-2 border-[#2DD4FF]'
                      : 'hover:bg-[#151D26]/60'
                  }`}
                >
                  {/* Select Checkbox */}
                  <td
                    className="py-3 px-4 text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelectRow(c.id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(c.id)}
                      className="rounded bg-[#151D26] border-[#26313D] text-[#2DD4FF] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#2DD4FF]"
                    />
                  </td>

                  {/* Case ID */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-mono font-semibold text-[#2DD4FF] text-[12px]">
                      {c.caseNumber}
                    </div>
                    <span className="text-[11px] text-[#64748B] font-mono">{c.sector}</span>
                  </td>

                  {/* Case & Type */}
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#F8FAFC] group-hover:text-[#2DD4FF] transition-colors">
                      {c.title}
                    </div>
                    <div className="text-[12px] text-[#94A3B8] flex items-center gap-2 mt-0.5">
                      <span>{c.type}</span>
                      <span>•</span>
                      <span className="text-[#64748B]">{c.assignedOfficer}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    {c.status === 'active' ? (
                      <StatusBadge variant="active" size="sm" />
                    ) : c.status === 'closed' ? (
                      <StatusBadge variant="completed" size="sm" />
                    ) : (
                      <StatusBadge variant="processing" label="UNDER REVIEW" size="sm" />
                    )}
                  </td>

                  {/* Priority */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    {getPriorityBadge(c.priority)}
                  </td>

                  {/* Last Activity */}
                  <td className="py-3 px-4 max-w-xs">
                    <div className="text-[12px] text-[#F8FAFC] truncate font-mono">
                      {c.lastActivity}
                    </div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 mt-0.5 font-mono">
                      <span>{c.camerasInvolved} CAMS</span>
                      <span>•</span>
                      <span>{c.evidenceCount} EVIDENCE ITEMS</span>
                    </div>
                  </td>

                  {/* Updated */}
                  <td className="py-3 px-4 text-right font-mono text-[12px] text-[#94A3B8] whitespace-nowrap">
                    {c.updatedAt}
                  </td>

                  {/* Action */}
                  <td
                    className="py-3 px-4 text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        title="View Case Details"
                        onClick={() => onViewCase?.(c.id)}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        title="Quick Track"
                      >
                        <Crosshair className="w-3.5 h-3.5 text-[#2DD4FF]" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Status Bar */}
      <div className="py-2.5 px-4 bg-[#0F151C] border-t border-[#26313D] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
        <div>
          SHOWING {cases.length} OF 12 ACTIVE INVESTIGATION FILES
        </div>
        <div className="flex items-center gap-3">
          <span>{selectedIds.size} SELECTED</span>
          <span className="text-[#2DD4FF]">SECURE VAULT ENCRYPTION ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
