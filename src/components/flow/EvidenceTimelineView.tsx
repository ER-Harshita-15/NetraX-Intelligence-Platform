import React, { useState } from 'react';
import {
  Clock,
  ArrowRight,
  Cctv,
  Sparkles,
  Bot,
  AlertTriangle,
  CheckCircle2,
  FileText,
  MapPin,
  Car,
  ChevronRight
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { DemoProgressBar } from './DemoProgressBar';

export interface EvidenceTimelineViewProps {
  onOpenAiAssistant: () => void;
  onNavigateStep?: (step: any) => void;
}

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  subhead: string;
  confidence?: number;
  type: 'report' | 'cctv' | 'ai_completed';
  cameraId?: string;
  location: string;
  description: string;
  thumbnailType?: 'theft_report' | 'c17' | 'c21' | 'c08' | 'c03' | 'ai_done';
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-1',
    time: '20:30',
    title: 'Vehicle theft reported',
    subhead: 'Sector 12',
    type: 'report',
    location: 'North Plaza Commercial Parking',
    description: 'Complainant reported stolen White SUV (Plate: CG 10 AB 1234). Dispatched bulletin NX-1024 issued to sector surveillance grid.',
    thumbnailType: 'theft_report',
  },
  {
    id: 'evt-2',
    time: '20:43',
    title: 'Vehicle detected',
    subhead: 'Camera C-17',
    confidence: 94,
    type: 'cctv',
    cameraId: 'C-17',
    location: 'North Avenue & 4th Street',
    description: 'Optical detection of target vehicle traveling eastbound at 54 km/h. License plate OCR recognized CG 10 AB 1234.',
    thumbnailType: 'c17',
  },
  {
    id: 'evt-3',
    time: '20:47',
    title: 'Vehicle detected',
    subhead: 'Camera C-21',
    confidence: 91,
    type: 'cctv',
    cameraId: 'C-21',
    location: 'Main Road Arterial Junction',
    description: 'Vehicle crossed arterial intersection under Camera C-21. Speed logged at 48 km/h heading toward bypass egress.',
    thumbnailType: 'c21',
  },
  {
    id: 'evt-4',
    time: '20:52',
    title: 'Vehicle detected',
    subhead: 'Camera C-08',
    confidence: 89,
    type: 'cctv',
    cameraId: 'C-08',
    location: 'East Bypass Expressway',
    description: 'High-speed transit confirmed along East Bypass corridor at 62 km/h. Optical match score 89%.',
    thumbnailType: 'c08',
  },
  {
    id: 'evt-5',
    time: '21:03',
    title: 'Last detection',
    subhead: 'Camera C-03',
    confidence: 87,
    type: 'cctv',
    cameraId: 'C-03',
    location: 'Railway Road Terminal Perimeter',
    description: 'Vehicle entered Railway Road station perimeter parking. Velocity slowed to 36 km/h. Stationary search perimeter established.',
    thumbnailType: 'c03',
  },
  {
    id: 'evt-6',
    time: '21:15',
    title: 'AI evidence correlation completed',
    subhead: 'NetraX Neural Engine',
    type: 'ai_completed',
    location: 'NetraX Intelligence Platform',
    description: 'Full multi-camera temporal tracking validated. 6.8 km vehicle egress path resolved with 91% aggregate confidence score.',
    thumbnailType: 'ai_done',
  },
];

export const EvidenceTimelineView: React.FC<EvidenceTimelineViewProps> = ({
  onOpenAiAssistant,
  onNavigateStep,
}) => {
  const renderThumbnail = (type?: TimelineEvent['thumbnailType'], cameraId?: string) => {
    switch (type) {
      case 'theft_report':
        return (
          <div className="w-20 h-14 rounded-[4px] bg-[#111820] border border-[#26313D] flex flex-col items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-red-400" />
            <span className="text-[8px] font-mono text-[#94A3B8] mt-1">THEFT INCIDENT</span>
          </div>
        );
      case 'c17':
      case 'c21':
      case 'c08':
      case 'c03':
        return (
          <div className="w-24 h-16 rounded-[4px] bg-[#070A0E] border border-[#26313D] relative overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#111827] to-[#0B0F17]" />
            <div className="absolute bottom-1 inset-x-1 h-3 bg-[#1E293B]" />
            {/* White SUV representation */}
            <div className="absolute bottom-2 left-6 w-9 h-4 bg-white rounded-sm border border-[#2DD4FF]" />
            <div className="absolute top-1 left-1 text-[8px] font-mono font-bold text-[#2DD4FF] bg-black/70 px-1 rounded">
              {cameraId}
            </div>
            <div className="absolute bottom-1 right-1 text-[7px] font-mono text-[#22C55E] bg-black/70 px-1 rounded">
              SUV
            </div>
          </div>
        );
      case 'ai_done':
      default:
        return (
          <div className="w-20 h-14 rounded-[4px] bg-[#111820] border border-[#22C55E]/40 flex flex-col items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
            <Sparkles className="w-5 h-5 text-[#22C55E]" />
            <span className="text-[8px] font-mono text-[#22C55E] font-bold mt-1">91% MATCH</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans select-none max-w-5xl mx-auto">
      {/* Step Navigation Bar */}
      {onNavigateStep && (
        <DemoProgressBar currentStep="evidence-timeline" onNavigateStep={onNavigateStep} />
      )}

      {/* Header Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono font-bold text-[#2DD4FF]">
              CASE #NX-1024
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">• CHRONOLOGICAL RECONSTRUCTION</span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-mono font-bold">
              6 VERIFIED EVENTS
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-[#F8FAFC]">
            Chronological Evidence Timeline
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            rightIcon={<Bot className="w-4 h-4" />}
            onClick={onOpenAiAssistant}
            className="shadow-[0_0_20px_rgba(45,212,255,0.3)]"
          >
            Consult AI Assistant
          </Button>
        </div>
      </div>

      {/* Quick Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-3 rounded-[6px] bg-[#111820] border border-[#26313D]">
          <span className="text-[10px] text-[#64748B] uppercase block">TIMELINE SPAN</span>
          <span className="text-[16px] font-bold text-[#F8FAFC]">
            20:30 – 21:15 (45m)
          </span>
        </div>

        <div className="p-3 rounded-[6px] bg-[#111820] border border-[#26313D]">
          <span className="text-[10px] text-[#64748B] uppercase block">TARGET ENTITY</span>
          <span className="text-[16px] font-bold text-[#2DD4FF]">
            White SUV (CG 10)
          </span>
        </div>

        <div className="p-3 rounded-[6px] bg-[#111820] border border-[#26313D]">
          <span className="text-[10px] text-[#64748B] uppercase block">CCTV INTERCEPTIONS</span>
          <span className="text-[16px] font-bold text-[#22C55E]">
            4 Cameras Verified
          </span>
        </div>

        <div className="p-3 rounded-[6px] bg-[#111820] border border-[#26313D]">
          <span className="text-[10px] text-[#64748B] uppercase block">CHAIN OF CUSTODY</span>
          <span className="text-[16px] font-bold text-[#F8FAFC]">
            SHA-256 Intact
          </span>
        </div>
      </div>

      {/* VERTICAL TIMELINE STACK */}
      <div className="rounded-[10px] bg-[#111820] border border-[#26313D] p-6 space-y-6">
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#26313D]">
          {TIMELINE_EVENTS.map((evt, idx) => {
            const isLast = idx === TIMELINE_EVENTS.length - 1;
            const isFirst = idx === 0;

            return (
              <div key={evt.id} className="relative group">
                {/* Timeline Marker Dot */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    evt.type === 'report'
                      ? 'bg-red-500/20 text-red-400 border-red-500'
                      : evt.type === 'ai_completed'
                      ? 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E] shadow-[0_0_12px_rgba(34,197,94,0.5)]'
                      : 'bg-[#2DD4FF]/20 text-[#2DD4FF] border-[#2DD4FF]'
                  }`}
                >
                  {evt.type === 'report' ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : evt.type === 'ai_completed' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Cctv className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Event Card */}
                <div className="p-4 rounded-[8px] bg-[#0F151C] border border-[#1E293B] hover:border-[#2DD4FF]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    {/* CCTV / Evidence Thumbnail */}
                    {renderThumbnail(evt.thumbnailType, evt.cameraId)}

                    {/* Content Details */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[13px] font-mono font-bold text-[#2DD4FF] bg-[#151D26] px-2 py-0.5 rounded border border-[#26313D]">
                          {evt.time}
                        </span>
                        <h4 className="text-[15px] font-bold text-[#F8FAFC]">
                          {evt.title}
                        </h4>
                        <span className="text-[12px] font-mono text-[#94A3B8]">
                          • {evt.subhead}
                        </span>

                        {evt.confidence && (
                          <span className="px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-mono font-bold">
                            {evt.confidence}% CONFIDENCE
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-mono text-[#64748B] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#2DD4FF]" />
                        {evt.location}
                      </div>

                      <p className="text-[12px] text-[#94A3B8] font-mono leading-relaxed pt-0.5">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation to AI Assistant */}
        <div className="pt-4 border-t border-[#26313D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[12px] font-mono text-[#2DD4FF]">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>
              All 6 chronological milestones confirmed and cross-indexed in the investigation vector database.
            </span>
          </div>

          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onOpenAiAssistant}
            className="shadow-[0_0_20px_rgba(45,212,255,0.3)]"
          >
            Open NetraX AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
};
