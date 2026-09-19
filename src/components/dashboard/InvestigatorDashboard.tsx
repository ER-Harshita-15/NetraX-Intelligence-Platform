import React from 'react';
import {
  Briefcase,
  FileCheck2,
  Cctv,
  Sparkles,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  Crosshair,
  AlertTriangle,
  Radio,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
  CheckCircle2,
  RefreshCw,
  FileText,
  Phone,
  Share2,
  Layers,
  Database
} from 'lucide-react';
import { KpiCard } from '../data/KpiCard';
import { StatusBadge } from '../data/StatusBadge';
import { Button } from '../buttons/Button';
import { CaseItem } from '../../types';

export interface InvestigatorDashboardProps {
  onOpenCase: (caseId: string) => void;
  onCreateNewCase: () => void;
  onViewSurveillance: () => void;
  onOpenFir?: () => void;
  onOpenCdr?: () => void;
  onOpenNetwork?: () => void;
}

export interface DashboardCase {
  id: string;
  caseNumber: string;
  type: string;
  sector: string;
  status: 'active' | 'processing' | 'under_review' | 'closed';
  lastActivity: string;
  updatedAt: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export const DASHBOARD_CASES: DashboardCase[] = [
  {
    id: 'case-1024',
    caseNumber: 'CASE #NX-1024',
    type: 'Vehicle Theft',
    sector: 'Sector 12',
    status: 'active',
    lastActivity: 'Vehicle detected at Camera C-17',
    updatedAt: '2 min ago',
    priority: 'high',
  },
  {
    id: 'case-1021',
    caseNumber: 'CASE #NX-1021',
    type: 'Missing Person',
    sector: 'City Center',
    status: 'processing',
    lastActivity: 'Facial vector match verified at Metro Terminal',
    updatedAt: '14 min ago',
    priority: 'critical',
  },
  {
    id: 'case-1018',
    caseNumber: 'CASE #NX-1018',
    type: 'Robbery',
    sector: 'Main Market',
    status: 'active',
    lastActivity: 'Suspect egress vehicle tracked across Sector 01',
    updatedAt: '1 hour ago',
    priority: 'high',
  },
];

export interface DashboardAlert {
  id: string;
  badge: 'high_confidence' | 'alert' | 'processing';
  badgeLabel: string;
  title: string;
  detail: string;
  camera: string;
  confidence: number;
  timeAgo: string;
  relatedCaseId?: string;
}

export const DASHBOARD_ALERTS: DashboardAlert[] = [
  {
    id: 'alert-1',
    badge: 'high_confidence',
    badgeLabel: 'HIGH CONFIDENCE MATCH',
    title: 'White SUV detected',
    detail: 'Plate 7XYZ89 matched to active Grand Theft Auto broadcast.',
    camera: 'Camera C-17',
    confidence: 94,
    timeAgo: '2 minutes ago',
    relatedCaseId: 'case-1024',
  },
  {
    id: 'alert-2',
    badge: 'alert',
    badgeLabel: 'VEHICLE DETECTION',
    title: 'Possible matching vehicle',
    detail: 'Optical silhouette correlation with suspect sedan speed 52 km/h.',
    camera: 'Camera C-21',
    confidence: 89,
    timeAgo: '8 minutes ago',
    relatedCaseId: 'case-1024',
  },
  {
    id: 'alert-3',
    badge: 'processing',
    badgeLabel: 'BLIND ZONE CORRELATION',
    title: 'Trajectory Egress Estimate',
    detail: 'Predicted vector toward Industrial Expressway Overpass 4B.',
    camera: 'Camera C-08',
    confidence: 86,
    timeAgo: '16 minutes ago',
    relatedCaseId: 'case-1024',
  },
];

export interface CameraSummaryNode {
  id: string;
  name: string;
  status: 'Online' | 'Processing' | 'Offline';
  sector: string;
}

export const CAMERA_STATUS_NODES: CameraSummaryNode[] = [
  { id: 'cam-17', name: 'C-17', status: 'Online', sector: 'Sector 12' },
  { id: 'cam-21', name: 'C-21', status: 'Online', sector: 'Sector 12' },
  { id: 'cam-08', name: 'C-08', status: 'Processing', sector: 'Sector 09' },
  { id: 'cam-03', name: 'C-03', status: 'Online', sector: 'Sector 04' },
];

export const InvestigatorDashboard: React.FC<InvestigatorDashboardProps> = ({
  onOpenCase,
  onCreateNewCase,
  onViewSurveillance,
  onOpenFir,
  onOpenCdr,
  onOpenNetwork,
}) => {
  return (
    <div id="investigator-dashboard" className="space-y-8 pb-12 animate-fadeIn select-none font-sans">
      {/* 1. Top Header Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#2DD4FF] mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>OPERATIONAL DESK • SECTOR 12 COMMAND ENCLAVE</span>
          </div>
          <h2 className="text-[28px] font-bold text-[#F8FAFC] tracking-tight">
            Good morning, Investigator
          </h2>
          <p className="text-[14px] text-[#94A3B8] mt-1">
            Synthesized overview of active cases, FIR dockets, cellular intelligence, and surveillance grids.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Cctv className="w-4 h-4 text-[#2DD4FF]" />}
            onClick={onViewSurveillance}
          >
            Surveillance Grid
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={onCreateNewCase}
          >
            + New Case
          </Button>
        </div>
      </div>

      {/* 2. Expanded Multi-Source Investigation KPIs (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* ACTIVE CASES */}
        <KpiCard
          label="ACTIVE CASES"
          value="12"
          change={{ value: "+2 this week", trend: "up" }}
          icon={<Briefcase className="w-4 h-4" />}
          accentColor="#2DD4FF"
          highlight={true}
        />

        {/* FIRs INGESTED */}
        <KpiCard
          label="FIRs INGESTED"
          value="48"
          subtext="OCR Verified"
          icon={<FileText className="w-4 h-4" />}
          accentColor="#F59E0B"
        />

        {/* CDR LOGS PROCESSED */}
        <KpiCard
          label="CDR LOGS"
          value="126.4K"
          subtext="4 Operators"
          icon={<Phone className="w-4 h-4" />}
          accentColor="#A855F7"
        />

        {/* NETWORK ENTITIES */}
        <KpiCard
          label="NETWORK NODES"
          value="87"
          subtext="15 Syndicates"
          icon={<Share2 className="w-4 h-4" />}
          accentColor="#06B6D4"
        />

        {/* CAMERAS ONLINE */}
        <KpiCard
          label="CAMERAS ONLINE"
          value="42 / 48"
          subtext="87.5% Active"
          icon={<Cctv className="w-4 h-4" />}
          accentColor="#22C55E"
        />

        {/* AI CROSS MATCHES */}
        <KpiCard
          label="AI CORRELATIONS"
          value="23"
          subtext="5 High-Conf"
          icon={<Sparkles className="w-4 h-4 text-[#2DD4FF]" />}
          accentColor="#2DD4FF"
        />
      </div>

      {/* 2b. Evidence Sources Section */}
      <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#2DD4FF]" />
            <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
              Unified Evidence Sources Ingestion Pipelines
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#22C55E]">
            ALL 4 INGESTION CHANNELS ONLINE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Channel 1: FIR & Documents */}
          <div
            onClick={() => onOpenFir ? onOpenFir() : onOpenCase('case-1024')}
            className="p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] hover:border-[#F59E0B] transition-colors cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#F59E0B]">
                <FileText className="w-4 h-4" />
                <span className="text-[12px] font-mono font-bold uppercase">FIR & Legal OCR</span>
              </div>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#22C55E]/10 text-[#22C55E]">
                Active
              </span>
            </div>
            <p className="text-[12px] text-[#94A3B8] leading-tight">
              48 dockets ingested. Multilingual OCR across Hindi, Marathi, English with legal section extraction.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] pt-1">
              <span>FIR #102/2026</span>
              <span className="text-[#2DD4FF] group-hover:underline">Open OCR Scanner →</span>
            </div>
          </div>

          {/* Channel 2: Optical Surveillance */}
          <div
            onClick={onViewSurveillance}
            className="p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] hover:border-[#2DD4FF] transition-colors cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#2DD4FF]">
                <Cctv className="w-4 h-4" />
                <span className="text-[12px] font-mono font-bold uppercase">Surveillance Feeds</span>
              </div>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#22C55E]/10 text-[#22C55E]">
                42 Live
              </span>
            </div>
            <p className="text-[12px] text-[#94A3B8] leading-tight">
              Optical plate recognition, cross-camera vehicle trajectory, and blind-zone AI trajectory correlation.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] pt-1">
              <span>White SUV (CG 10 AB 1234)</span>
              <span className="text-[#2DD4FF] group-hover:underline">Track Stream →</span>
            </div>
          </div>

          {/* Channel 3: Telecom CDR Logs */}
          <div
            onClick={() => onOpenCdr ? onOpenCdr() : onOpenCase('case-1024')}
            className="p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] hover:border-[#A855F7] transition-colors cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#A855F7]">
                <Phone className="w-4 h-4" />
                <span className="text-[12px] font-mono font-bold uppercase">Call Detail Records</span>
              </div>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#22C55E]/10 text-[#22C55E]">
                Indexed
              </span>
            </div>
            <p className="text-[12px] text-[#94A3B8] leading-tight">
              126,430 logs indexed. Cellular tower triangulation, contact frequency analysis, and suspicious call bursts.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] pt-1">
              <span>23 Case #NX-1024 Calls</span>
              <span className="text-[#2DD4FF] group-hover:underline">Inspect Logs →</span>
            </div>
          </div>

          {/* Channel 4: Criminal Network & Registry */}
          <div
            onClick={() => onOpenNetwork ? onOpenNetwork() : onOpenCase('case-1024')}
            className="p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] hover:border-[#06B6D4] transition-colors cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#06B6D4]">
                <Share2 className="w-4 h-4" />
                <span className="text-[12px] font-mono font-bold uppercase">Link Analysis Graph</span>
              </div>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#22C55E]/10 text-[#22C55E]">
                Mapped
              </span>
            </div>
            <p className="text-[12px] text-[#94A3B8] leading-tight">
              Interactive topological entity map linking suspects, aliases, burner phones, stolen vehicles, and prior dockets.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] pt-1">
              <span>Suspect Rahul Sharma</span>
              <span className="text-[#2DD4FF] group-hover:underline">Explore Graph →</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Operational Grid: Active Investigations (Left) + Intelligence Feeds (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Active Investigations Section (2 Cols Wide) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              <h3 className="text-[18px] font-semibold text-[#F8FAFC]">
                Active Investigations
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[#94A3B8] bg-[#151D26] border border-[#26313D]">
                3 Priority
              </span>
            </div>

            <button
              onClick={onCreateNewCase}
              className="text-[12px] font-mono text-[#2DD4FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Investigation</span>
            </button>
          </div>

          {/* Case Cards List */}
          <div className="space-y-3.5">
            {DASHBOARD_CASES.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenCase(item.id)}
                className="rounded-[8px] bg-[#111820] border border-[#26313D] p-4 sm:p-5 hover:border-[#2DD4FF]/70 hover:bg-[#151D26]/60 transition-all duration-150 group cursor-pointer relative overflow-hidden"
              >
                {/* Accent Top Border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] ${
                    item.status === 'active'
                      ? 'bg-[#2DD4FF]'
                      : 'bg-[#F59E0B]'
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-mono font-bold text-[#2DD4FF]">
                        {item.caseNumber}
                      </span>
                      <span className="text-[12px] font-mono text-[#64748B]">
                        • {item.sector}
                      </span>
                      {item.priority === 'critical' && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono uppercase bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] font-semibold">
                          CRITICAL
                        </span>
                      )}
                    </div>

                    <h4 className="text-[16px] font-semibold text-[#F8FAFC] group-hover:text-[#2DD4FF] transition-colors">
                      {item.type}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.status === 'active' ? (
                      <StatusBadge variant="active" label="ACTIVE" size="md" />
                    ) : (
                      <StatusBadge variant="processing" label="PROCESSING" size="md" />
                    )}
                  </div>
                </div>

                {/* Sub-info line */}
                <div className="mt-4 pt-3 border-t border-[#26313D] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] font-mono text-[#94A3B8]">
                  <div className="flex items-center gap-1.5 text-[#F8FAFC]">
                    <Crosshair className="w-3.5 h-3.5 text-[#2DD4FF]" />
                    <span>Last activity:</span>
                    <span className="text-[#94A3B8]">{item.lastActivity}</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[#64748B]">Updated: {item.updatedAt}</span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCase(item.id);
                      }}
                      rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                    >
                      Open Case
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Recent AI Alerts & Surveillance Network Status (1 Col) */}
        <div className="space-y-8">
          {/* 4. Recent AI Alerts Section */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2DD4FF]" />
                <h3 className="text-[16px] font-semibold text-[#F8FAFC]">
                  Recent AI Alerts
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#2DD4FF] animate-pulse">
                REAL-TIME STREAM
              </span>
            </div>

            <div className="space-y-3">
              {DASHBOARD_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => alert.relatedCaseId && onOpenCase(alert.relatedCaseId)}
                  className="rounded-[8px] bg-[#111820] border border-[#26313D] p-3.5 hover:border-[#2DD4FF]/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <StatusBadge
                      variant={alert.badge}
                      label={alert.badgeLabel}
                      size="sm"
                    />
                    <span className="text-[11px] font-mono text-[#64748B]">
                      {alert.timeAgo}
                    </span>
                  </div>

                  <h5 className="text-[13px] font-semibold text-[#F8FAFC] group-hover:text-[#2DD4FF] transition-colors mt-2">
                    {alert.title}
                  </h5>

                  <p className="text-[11px] text-[#94A3B8] font-mono mt-0.5 line-clamp-2">
                    {alert.detail}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-[#26313D]/60 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#2DD4FF] flex items-center gap-1">
                      <Cctv className="w-3 h-3" />
                      {alert.camera}
                    </span>
                    <span className="text-[#22C55E]">
                      Confidence: {alert.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Camera Network Status Section */}
          <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cctv className="w-4 h-4 text-[#2DD4FF]" />
                <h4 className="text-[14px] font-mono font-bold uppercase tracking-wider text-[#F8FAFC]">
                  SURVEILLANCE NETWORK
                </h4>
              </div>
              <span className="text-[11px] font-mono text-[#64748B]">
                48 TOTAL CAMERAS
              </span>
            </div>

            {/* Visual Status Progress Breakdown */}
            <div className="space-y-1.5">
              <div className="w-full h-2 rounded-full bg-[#151D26] overflow-hidden flex border border-[#26313D]">
                <div
                  className="bg-[#22C55E] h-full"
                  style={{ width: `${(42 / 48) * 100}%` }}
                  title="42 Online"
                />
                <div
                  className="bg-[#F59E0B] h-full"
                  style={{ width: `${(4 / 48) * 100}%` }}
                  title="4 Processing"
                />
                <div
                  className="bg-[#EF4444] h-full"
                  style={{ width: `${(2 / 48) * 100}%` }}
                  title="2 Offline"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <span>42 Online</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span>4 Processing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <span>2 Offline</span>
                </div>
              </div>
            </div>

            {/* Specific Camera Node Status List */}
            <div className="space-y-2 pt-1 border-t border-[#26313D]">
              {CAMERA_STATUS_NODES.map((cam) => (
                <div
                  key={cam.id}
                  className="flex items-center justify-between text-[12px] font-mono p-1.5 rounded bg-[#0F151C] border border-[#26313D]/60"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        cam.status === 'Online'
                          ? 'bg-[#22C55E]'
                          : cam.status === 'Processing'
                          ? 'bg-[#F59E0B] animate-pulse'
                          : 'bg-[#EF4444]'
                      }`}
                    />
                    <span className="font-semibold text-[#F8FAFC]">{cam.name}</span>
                    <span className="text-[#64748B]">({cam.sector})</span>
                  </div>
                  <span
                    className={
                      cam.status === 'Online'
                        ? 'text-[#22C55E]'
                        : cam.status === 'Processing'
                        ? 'text-[#F59E0B]'
                        : 'text-[#EF4444]'
                    }
                  >
                    {cam.status}
                  </span>
                </div>
              ))}
            </div>

            {/* View Surveillance Button */}
            <div className="pt-2">
              <Button
                variant="secondary"
                size="md"
                onClick={onViewSurveillance}
                className="w-full justify-center"
                rightIcon={<ArrowRight className="w-4 h-4 text-[#2DD4FF]" />}
              >
                View Surveillance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
