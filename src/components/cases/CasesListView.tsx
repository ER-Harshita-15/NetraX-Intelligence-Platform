import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Shield,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { InvestigationTable, SAMPLE_CASES } from '../data/InvestigationTable';
import { SearchBar } from '../forms/SearchBar';
import { CaseItem } from '../../types';

export interface CasesListViewProps {
  onOpenCase: (caseId: string) => void;
  onCreateNewCase: () => void;
}

export const CasesListView: React.FC<CasesListViewProps> = ({
  onOpenCase,
  onCreateNewCase,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'under_review' | 'closed'>('all');

  const filteredCases = SAMPLE_CASES.filter((c) => {
    const matchesSearch =
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5">
        <div>
          <span className="text-[11px] font-mono uppercase text-[#2DD4FF] tracking-wider block">
            CENTRAL DOSSIER REPOSITORY
          </span>
          <h2 className="text-[24px] font-bold text-[#F8FAFC]">
            Case Investigations Directory
          </h2>
          <p className="text-[13px] text-[#94A3B8] mt-1">
            Browse, monitor, and manage active law-enforcement and surveillance files.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={onCreateNewCase}
        >
          + New Case
        </Button>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by case #, suspect vehicle, sector..."
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {(['all', 'active', 'under_review', 'closed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-[6px] text-[12px] font-mono uppercase transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold'
                  : 'bg-[#151D26] border border-[#26313D] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {st === 'all' ? 'All Cases' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-[8px] bg-[#111820] border border-[#26313D] overflow-hidden">
        <InvestigationTable
          cases={filteredCases}
          onSelectCase={(c) => onOpenCase(c.id)}
          onViewCase={(id) => onOpenCase(id)}
        />
      </div>
    </div>
  );
};
