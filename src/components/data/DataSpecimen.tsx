import React from 'react';
import { StatusBadge } from './StatusBadge';
import { KpiCard } from './KpiCard';
import { InvestigationTable, SAMPLE_CASES } from './InvestigationTable';
import { TimelineItem } from './TimelineItem';
import { BadgeVariant, TimelineEvent } from '../../types';
import {
  Briefcase,
  FileCheck2,
  Cctv,
  Cpu,
  ShieldAlert,
  Clock,
  Sparkles
} from 'lucide-react';

export const DataSpecimen: React.FC = () => {
  const allBadges: { variant: BadgeVariant; desc: string }[] = [
    { variant: 'active', desc: 'Case or camera live and monitored' },
    { variant: 'processing', desc: 'Active AI computer vision extraction' },
    { variant: 'completed', desc: 'Analysis completed or archived' },
    { variant: 'offline', desc: 'Disconnected CCTV or unmonitored node' },
    { variant: 'high_confidence', desc: 'AI correlation > 85%' },
    { variant: 'medium_confidence', desc: 'AI correlation 60% - 84%' },
    { variant: 'low_confidence', desc: 'AI correlation < 60%' },
    { variant: 'alert', desc: 'Urgent detection or perimeter breach' },
  ];

  const sampleTimelineEvents: TimelineEvent[] = [
    {
      id: 'evt-1',
      timestamp: '14 SEPT 2026 • 20:43:17',
      timeFormatted: '20:43:17',
      event: 'Vehicle Detected at Camera C-17 (North Ave Intersection)',
      location: 'Sector 12, North Ave & 4th Street',
      source: 'Camera C-17',
      confidence: 94,
      type: 'detection',
      thumbnailText: 'C-17_FRM_204317_V023.jpg',
    },
    {
      id: 'evt-2',
      timestamp: '14 SEPT 2026 • 20:44:02',
      timeFormatted: '20:44:02',
      event: 'License Plate OCR Extracted: 7XYZ89 (Match 97%)',
      location: 'Sector 12, Gas Station Feed C-18',
      source: 'Camera C-18',
      confidence: 97,
      type: 'correlation',
      thumbnailText: 'C-18_LPR_7XYZ89.jpg',
    },
    {
      id: 'evt-3',
      timestamp: '14 SEPT 2026 • 20:46:11',
      timeFormatted: '20:46:11',
      event: 'High Velocity Evasion Alert — Heading Toward Highway 101 On-Ramp',
      location: 'Sector 09, Expressway Gate 2',
      source: 'Camera C-29',
      confidence: 89,
      type: 'alert',
      thumbnailText: 'C-29_HIGH_SPEED.jpg',
    },
  ];

  return (
    <div id="data-specimen" className="space-y-12">
      {/* 1. Status Badges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Status Badges
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Semaphoric badges for case lifecycles, streaming states, confidence ratings, and tactical alerts.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">8 CANONICAL BADGES</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {allBadges.map((b) => (
            <div
              key={b.variant}
              className="p-3.5 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-2 flex flex-col justify-between"
            >
              <div>
                <StatusBadge variant={b.variant} />
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-tight">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              KPI Metric Cards
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Telemetry counters with large 28px/Bold mono values, delta indicators, and subtle top accent bars.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#2DD4FF]">LIVE TELEMETRY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="ACTIVE CASES"
            value="12"
            change={{ value: '+2 vs yesterday', trend: 'up' }}
            icon={<Briefcase className="w-4 h-4 text-[#2DD4FF]" />}
            accentColor="#2DD4FF"
            highlight
            subtext="4 prioritized high-severity"
          />

          <KpiCard
            label="EVIDENCE ITEMS"
            value="86"
            change={{ value: '+14 newly ingested', trend: 'up' }}
            icon={<FileCheck2 className="w-4 h-4 text-[#22C55E]" />}
            accentColor="#22C55E"
            subtext="CCTV clips, LPR captures, docs"
          />

          <KpiCard
            label="CAMERAS"
            value="48"
            change={{ value: '47 online / 1 offline', trend: 'neutral' }}
            icon={<Cctv className="w-4 h-4 text-[#F59E0B]" />}
            accentColor="#F59E0B"
            subtext="Sector 12 & Expressway network"
          />

          <KpiCard
            label="AI MATCHES"
            value="23"
            change={{ value: '+91% avg confidence', trend: 'up' }}
            icon={<Cpu className="w-4 h-4 text-[#2DD4FF]" />}
            accentColor="#2DD4FF"
            highlight
            subtext="Cross-camera correlation engine"
          />
        </div>
      </div>

      {/* 3. Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Investigation Records Table
            </h3>
            <p className="text-[12px] text-[#64748B]">
              High-density table with multi-select checkboxes, status indicators, priority tags, and row actions.
            </p>
          </div>
        </div>

        <InvestigationTable cases={SAMPLE_CASES} />
      </div>

      {/* 4. Timeline Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Investigation Timeline Items
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Chronological surveillance reconstruction events with camera timestamps, confidence scores, and frame clips.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">SECTOR 12 RECONSTRUCTION</span>
        </div>

        <div className="p-5 rounded-[8px] bg-[#0F151C] border border-[#26313D] max-w-3xl">
          {sampleTimelineEvents.map((evt, idx) => (
            <TimelineItem
              key={evt.id}
              event={evt}
              isLast={idx === sampleTimelineEvents.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
