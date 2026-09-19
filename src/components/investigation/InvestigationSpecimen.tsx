import React, { useState } from 'react';
import { CaseCard } from './CaseCard';
import { SAMPLE_CASES } from '../data/InvestigationTable';
import { EvidenceCard, SAMPLE_EVIDENCE_ITEMS } from './EvidenceCard';
import { AiInsightCard, SAMPLE_INSIGHTS } from './AiInsightCard';
import { TacticalMapCanvas, SAMPLE_MAP_MARKERS } from './MapMarkers';
import { MapMarkerData, CaseItem, EvidenceItem, AiInsight } from '../../types';
import { Briefcase, FileCheck2, Sparkles, MapPin } from 'lucide-react';

export const InvestigationSpecimen: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseItem>(SAMPLE_CASES[0]);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem>(SAMPLE_EVIDENCE_ITEMS[0]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerData | null>(SAMPLE_MAP_MARKERS[1]);

  return (
    <div id="investigation-specimen" className="space-y-12">
      {/* 1. Case Cards (Compact and Expanded) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Case Cards (Compact & Expanded)
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Standardized incident cards with case IDs, sectors, active statuses, evidence counts, and priority tags.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#2DD4FF]">DUAL VARIANTS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Expanded Case Card */}
          <div className="lg:col-span-2">
            <span className="text-[11px] font-mono text-[#64748B] uppercase block mb-2">
              EXPANDED DOSSIER VARIANT
            </span>
            <CaseCard
              caseItem={selectedCase}
              variant="expanded"
              isSelected={true}
              onSelect={(c) => setSelectedCase(c)}
            />
          </div>

          {/* Compact Case Cards List */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono text-[#64748B] uppercase block mb-2">
              COMPACT QUEUE VARIANTS
            </span>
            {SAMPLE_CASES.slice(0, 3).map((item) => (
              <CaseCard
                key={item.id}
                caseItem={item}
                variant="compact"
                isSelected={selectedCase.id === item.id}
                onSelect={(c) => setSelectedCase(c)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Evidence Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Evidence Asset Cards
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Multi-modal evidence cards supporting CCTV Video, Still Images / LPR crops, Audio Dispatches, and Forensics Documents.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">4 EVIDENCE MODALITIES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_EVIDENCE_ITEMS.map((ev) => (
            <EvidenceCard
              key={ev.id}
              evidence={ev}
              isSelected={selectedEvidence.id === ev.id}
              onSelect={(e) => setSelectedEvidence(e)}
            />
          ))}
        </div>
      </div>

      {/* 3. AI Insight Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              AI Insight & Correlation Cards
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Synthesized intelligence cards for Cross-Camera Correlation, Pattern Insights, Surveillance Warnings, and Tactical Recommendations.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#2DD4FF]">CONFIDENCE CALIBRATED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_INSIGHTS.map((insight) => (
            <AiInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

      {/* 4. Tactical Map Markers & Geospatial Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Tactical Map Markers & Incident Geofence
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Pins and telemetry chips for Camera, Vehicle, Person, Incident Point, and Last Known Location. Click markers to inspect.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">5 MARKER ARCHETYPES</span>
        </div>

        <TacticalMapCanvas
          markers={SAMPLE_MAP_MARKERS}
          selectedId={selectedMarker?.id}
          onSelectMarker={(m) => setSelectedMarker(m)}
        />
      </div>
    </div>
  );
};
