import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { EvidenceUpload } from './EvidenceUpload';
import { Search, Filter, ShieldCheck, FileText } from 'lucide-react';

export const FormsSpecimen: React.FC = () => {
  const [searchVal, setSearchVal] = useState('Sector 12 silver sedan');
  const [emptySearchVal, setEmptySearchVal] = useState('');

  return (
    <div id="forms-specimen" className="space-y-12">
      {/* 1. Search Bar Component */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Investigation Search Bar
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Standardized query bar with ⌘K hotkey badge, instant clear action, and focus illumination ring.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#2DD4FF]">FOCUS STATE ENABLED</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Active / Populated Search Bar */}
          <div className="p-5 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-3">
            <span className="text-[11px] font-mono text-[#64748B] uppercase block">
              POPULATED SEARCH WITH FILTER ACTION
            </span>
            <SearchBar
              value={searchVal}
              onChange={setSearchVal}
              onFilterClick={() => alert('Filter drawer toggle')}
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>CURRENT QUERY: "{searchVal}"</span>
              <span className="text-[#2DD4FF]">3 MATCHING CASES FOUND</span>
            </div>
          </div>

          {/* Empty / Placeholder State */}
          <div className="p-5 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-3">
            <span className="text-[11px] font-mono text-[#64748B] uppercase block">
              DEFAULT EMPTY SEARCH (FOCUS READY)
            </span>
            <SearchBar
              value={emptySearchVal}
              onChange={setEmptySearchVal}
              placeholder="Search cases, evidence, vehicles…"
            />
            <span className="text-[11px] font-mono text-[#64748B] block">
              Instant keyboard shortcut hook enabled
            </span>
          </div>
        </div>
      </div>

      {/* 2. Drag-and-Drop Evidence Upload */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Evidence Drag-and-Drop Ingestion Component
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Forensic evidence ingestion zone supporting CCTV video, high-res photos, LPR captures, audio, and documents.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">5 PIPELINE STATES</span>
        </div>

        <div className="p-6 rounded-[8px] bg-[#0F151C] border border-[#26313D]">
          <EvidenceUpload initialState="empty" />
        </div>
      </div>
    </div>
  );
};
