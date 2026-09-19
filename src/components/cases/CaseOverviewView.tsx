import React, { useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  FileCheck2,
  Cctv,
  Sparkles,
  Upload,
  Play,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  User,
  Shield,
  FileText,
  ExternalLink,
  ChevronRight,
  Phone,
  Share2,
  Layers,
  Search,
  Radio,
  Car,
  Fingerprint,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { StatusBadge } from '../data/StatusBadge';
import { UploadEvidenceModal } from '../modals/UploadEvidenceModal';
import { EvidenceCorrelationPanel } from './EvidenceCorrelationPanel';
import { FirModuleView } from '../fir/FirModuleView';
import { CdrModuleView } from '../cdr/CdrModuleView';
import { CriminalNetworkView } from '../network/CriminalNetworkView';
import { PersonProfileModal } from '../profile/PersonProfileModal';
import {
  UNIFIED_CASE_NX_1024,
  CASE_NX_1024_FIR,
  PRIMARY_SUSPECT_PROFILE,
  PREVIOUS_CASES_HISTORY,
  EVIDENCE_CORRELATION_CHAIN
} from '../../data/unifiedCaseData';
import { CaseStatus, CasePriority, FIRRecord } from '../../types';

export interface CaseOverviewProps {
  caseId?: string;
  initialTab?: string;
  onBack: () => void;
  onViewSurveillance?: () => void;
  onViewMap?: () => void;
  onOpenEvidenceUpload?: () => void;
  onStartAnalysisFlow?: () => void;
  onOpenReport?: () => void;
  onAskAi?: () => void;
}

export const CaseOverviewView: React.FC<CaseOverviewProps> = ({
  caseId = 'case-1024',
  initialTab = 'overview',
  onBack,
  onViewSurveillance,
  onViewMap,
  onOpenEvidenceUpload,
  onStartAnalysisFlow,
  onOpenReport,
  onAskAi
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [caseData, setCaseData] = useState(UNIFIED_CASE_NX_1024);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCorrelationStep, setSelectedCorrelationStep] = useState<number | undefined>(undefined);

  // Handle correlation step click
  const handleSelectCorrelationStep = (step: any) => {
    setSelectedCorrelationStep(step.step);
    if (step.targetTab) {
      setActiveTab(step.targetTab);
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn font-sans select-none max-w-7xl mx-auto">
      {/* Top Banner Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={onBack}
          >
            Dashboard
          </Button>
          <div className="h-4 w-px bg-[#26313D]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#2DD4FF] font-bold">
                {caseData.caseNumber}
              </span>
              <span className="text-[#64748B]">•</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444]">
                HIGH PRIORITY
              </span>
              <StatusBadge variant="active" label="Active" size="sm" />
            </div>
            <h2 className="text-[20px] font-bold text-[#F8FAFC]">
              {caseData.title}
            </h2>
          </div>
        </div>

        {/* Quick Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Upload className="w-3.5 h-3.5" />}
            onClick={() => (onOpenEvidenceUpload ? onOpenEvidenceUpload() : setIsUploadModalOpen(true))}
          >
            Upload Evidence
          </Button>

          {onStartAnalysisFlow && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={onStartAnalysisFlow}
              className="shadow-[0_0_15px_rgba(45,212,255,0.2)]"
            >
              Run AI Analysis
            </Button>
          )}

          {onOpenReport && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<FileText className="w-3.5 h-3.5" />}
              onClick={onOpenReport}
            >
              Dossier Report
            </Button>
          )}
        </div>
      </div>

      {/* CASE NAVIGATION TABS (All 10 user requested tabs) */}
      <div className="flex border-b border-[#26313D] gap-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: Briefcase },
          { id: 'fir', label: 'FIR & Documents', icon: FileText },
          { id: 'surveillance', label: 'Surveillance', icon: Cctv },
          { id: 'calls', label: 'Call Records', icon: Phone },
          { id: 'network', label: 'Criminal Network', icon: Share2 },
          { id: 'history', label: 'History', icon: Clock },
          { id: 'evidence', label: 'Evidence', icon: Layers },
          { id: 'ai-insights', label: 'AI Insights', icon: Sparkles },
          { id: 'timeline', label: 'Timeline', icon: Calendar },
          { id: 'report', label: 'Report', icon: FileCheck2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 text-[12px] font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-[#2DD4FF] text-[#2DD4FF] bg-[#2DD4FF]/5 font-semibold'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Evidence Correlation Chain Visualizer */}
          <EvidenceCorrelationPanel
            steps={EVIDENCE_CORRELATION_CHAIN}
            activeStep={selectedCorrelationStep}
            onSelectStep={handleSelectCorrelationStep}
          />

          {/* Grid Row 1: Case Summary + Evidence Sources Ingested */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CASE SUMMARY (2 cols) */}
            <div className="lg:col-span-2 rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#2DD4FF]" />
                  <h3 className="text-[16px] font-semibold text-[#F8FAFC]">
                    Case Dossier Summary
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#64748B]">
                  HASH: #NX-1024-BILASPUR
                </span>
              </div>

              {/* 6-grid details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">INCIDENT TYPE</span>
                  <span className="text-[13px] font-semibold text-[#F8FAFC] block mt-0.5">Vehicle Theft / Syndicate</span>
                </div>

                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">INCIDENT DATE</span>
                  <span className="text-[13px] font-semibold text-[#F8FAFC] block mt-0.5">14 September 2026</span>
                </div>

                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">LOCATION</span>
                  <span className="text-[13px] font-semibold text-[#F8FAFC] block mt-0.5">Sector 12 Plaza</span>
                </div>

                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">FIR NUMBER</span>
                  <span className="text-[13px] font-semibold text-[#2DD4FF] block mt-0.5 font-mono">102/2026 (Kotwali)</span>
                </div>

                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">INVESTIGATING OFFICER</span>
                  <span className="text-[13px] font-semibold text-[#F8FAFC] block mt-0.5">Officer Sharma (#7492)</span>
                </div>

                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">TARGET VEHICLE</span>
                  <span className="text-[13px] font-semibold text-[#22C55E] block mt-0.5 font-mono">CG 10 AB 1234 (White SUV)</span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[13px] text-[#94A3B8] leading-relaxed">
                <strong className="text-[#F8FAFC] block mb-1">Investigative Synopsis:</strong>
                {caseData.synopsis}
              </div>
            </div>

            {/* MULTI-SOURCE EVIDENCE STATUS (1 col) */}
            <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#26313D] pb-3 mb-3">
                  <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
                    Ingested Evidence Sources
                  </h3>
                  <span className="text-[11px] font-mono text-[#22C55E]">4 / 4 ACTIVE</span>
                </div>

                <div className="space-y-2.5">
                  <div
                    onClick={() => setActiveTab('fir')}
                    className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] hover:border-[#2DD4FF]/40 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#F59E0B]" />
                      <div>
                        <span className="text-[12px] font-semibold text-[#F8FAFC] block">FIR No. 102/2026</span>
                        <span className="text-[10px] text-[#64748B]">Bilingual OCR Verified • Hindi</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                  </div>

                  <div
                    onClick={() => setActiveTab('surveillance')}
                    className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] hover:border-[#2DD4FF]/40 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Cctv className="w-4 h-4 text-[#2DD4FF]" />
                      <div>
                        <span className="text-[12px] font-semibold text-[#F8FAFC] block">4 CCTV Cameras</span>
                        <span className="text-[10px] text-[#64748B]">Optical Tracking • Plate OCR 94%</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                  </div>

                  <div
                    onClick={() => setActiveTab('calls')}
                    className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] hover:border-[#2DD4FF]/40 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#A855F7]" />
                      <div>
                        <span className="text-[12px] font-semibold text-[#F8FAFC] block">23 CDR Call Logs</span>
                        <span className="text-[10px] text-[#64748B]">Cell Tower Triangulation</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                  </div>

                  <div
                    onClick={() => setActiveTab('history')}
                    className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] hover:border-[#2DD4FF]/40 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#EF4444]" />
                      <div>
                        <span className="text-[12px] font-semibold text-[#F8FAFC] block">3 Criminal Dockets</span>
                        <span className="text-[10px] text-[#64748B]">Modus Operandi Match</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#26313D]">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-center"
                  leftIcon={<Fingerprint className="w-3.5 h-3.5" />}
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  Inspect Primary Suspect Dossier
                </Button>
              </div>
            </div>
          </div>

          {/* Grid Row 2: Identified Suspect & Key Entities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Suspect Card */}
            <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#EF4444]" />
                  <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
                    Primary Suspect / Accused
                  </h3>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
                  HIGH PRIORITY
                </span>
              </div>

              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-[#F8FAFC]">Rahul Sharma</span>
                  <span className="text-[11px] font-mono text-[#64748B]">Alias: Raju</span>
                </div>
                <div className="text-[12px] text-[#94A3B8]">
                  4 Prior Cases • 7 Related FIRs • Motor Vehicle Theft Syndicate
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#2DD4FF] pt-1 border-t border-[#26313D]">
                  <Phone className="w-3 h-3" />
                  <span>+91 98271-40291 (Jio 4G)</span>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center"
                leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => setIsProfileModalOpen(true)}
              >
                View Complete Criminal Profile
              </Button>
            </div>

            {/* Key Entities 4-grid */}
            <div className="lg:col-span-2 rounded-[8px] bg-[#111820] border border-[#26313D] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2DD4FF]" />
                  <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
                    Case Telemetry & Linked Entities
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#64748B]">CROSS-REFERENCED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">TARGET VEHICLE</span>
                  <span className="text-[13px] font-bold text-[#F8FAFC] block">CG 10 AB 1234 (White SUV)</span>
                  <span className="text-[11px] text-[#22C55E] block">4 Optical Camera Matches • Plate OCR</span>
                </div>

                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">KNOWN ASSOCIATE</span>
                  <span className="text-[13px] font-bold text-[#F8FAFC] block">Vikram Singh (+91 97520-88123)</span>
                  <span className="text-[11px] text-[#2DD4FF] block">15 Synchronized CDR Calls</span>
                </div>

                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">PROBABLE DROP LOCATION</span>
                  <span className="text-[13px] font-bold text-[#F8FAFC] block">Railway Colony Yard 4</span>
                  <span className="text-[11px] text-[#F59E0B] block">Final Cell Tower Ping at 21:04</span>
                </div>

                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block">RELATED PRIOR CONVICTION</span>
                  <span className="text-[13px] font-bold text-[#F8FAFC] block">FIR #219/2025 (Civil Lines)</span>
                  <span className="text-[11px] text-[#A855F7] block">Identical Phone Number & Modus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: FIR & DOCUMENTS */}
      {/* ======================================================== */}
      {activeTab === 'fir' && (
        <FirModuleView
          initialFir={caseData.firRecord}
          onSaveToCase={(updated) => {
            setCaseData({ ...caseData, firRecord: updated });
          }}
          onNavigateTab={(tab) => setActiveTab(tab)}
          onSelectEntity={(ent) => {
            if (ent.type === 'accused' || ent.type === 'person') {
              setIsProfileModalOpen(true);
            } else if (ent.type === 'phone') {
              setActiveTab('calls');
            } else if (ent.type === 'vehicle') {
              setActiveTab('surveillance');
            }
          }}
        />
      )}

      {/* ======================================================== */}
      {/* TAB 3: SURVEILLANCE */}
      {/* ======================================================== */}
      {activeTab === 'surveillance' && (
        <div className="space-y-6">
          <div className="p-6 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#26313D] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#2DD4FF]">CCTV OPTICAL SIGHTINGS</span>
                <h3 className="text-[16px] font-semibold text-[#F8FAFC]">
                  Cross-Camera Detections for White SUV (CG 10 AB 1234)
                </h3>
              </div>

              {onViewSurveillance && (
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Cctv className="w-3.5 h-3.5" />}
                  onClick={onViewSurveillance}
                >
                  Open Full Surveillance Grid
                </Button>
              )}
            </div>

            {/* 4 Camera Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { cam: 'C-17', loc: 'North Avenue Crossing', time: '20:43 IST', speed: '54 km/h', conf: 94, plate: 'CG 10 AB 1234' },
                { cam: 'C-21', loc: 'Main Road Arterial', time: '20:47 IST', speed: '48 km/h', conf: 91, plate: 'CG 10 AB 1234' },
                { cam: 'C-08', loc: 'East Bypass Expressway', time: '20:52 IST', speed: '62 km/h', conf: 89, plate: 'CG 10 AB 1234' },
                { cam: 'C-03', loc: 'Railway Road Terminal', time: '21:03 IST', speed: '36 km/h', conf: 87, plate: 'CG 10 AB 1234' },
              ].map((c) => (
                <div key={c.cam} className="p-4 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-mono font-bold text-[#F8FAFC]">Camera {c.cam}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#22C55E]/10 text-[#22C55E] font-bold">
                      {c.conf}% match
                    </span>
                  </div>
                  <div className="text-[12px] text-[#94A3B8]">{c.loc}</div>
                  <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-[#26313D]">
                    <span className="text-[#2DD4FF]">{c.time}</span>
                    <span className="text-[#CBD5E1]">{c.speed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: CALL RECORDS */}
      {/* ======================================================== */}
      {activeTab === 'calls' && (
        <CdrModuleView
          initialRecords={caseData.cdrRecords}
          initialSummary={caseData.cdrSummary}
          onOpenNetworkView={() => setActiveTab('network')}
        />
      )}

      {/* ======================================================== */}
      {/* TAB 5: CRIMINAL NETWORK */}
      {/* ======================================================== */}
      {activeTab === 'network' && (
        <CriminalNetworkView
          initialData={caseData.networkData}
          onOpenPersonProfile={() => setIsProfileModalOpen(true)}
        />
      )}

      {/* ======================================================== */}
      {/* TAB 6: HISTORY */}
      {/* ======================================================== */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="p-6 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-4">
            <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#2DD4FF]">MODUS OPERANDI & PREVIOUS RECORDS</span>
                <h3 className="text-[16px] font-semibold text-[#F8FAFC]">
                  Previous FIR History & Criminal Registry Records
                </h3>
              </div>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<User className="w-3.5 h-3.5" />}
                onClick={() => setIsProfileModalOpen(true)}
              >
                Inspect Suspect Dossier
              </Button>
            </div>

            <div className="space-y-3">
              {PREVIOUS_CASES_HISTORY.map((c) => (
                <div key={c.id} className="p-4 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-mono font-bold text-[#F8FAFC]">{c.firNumber}</span>
                      <span className="text-[12px] text-[#64748B]">• {c.policeStation} ({c.date})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#151D26] text-[#2DD4FF]">
                      {c.status}
                    </span>
                  </div>
                  <div className="text-[13px] text-[#CBD5E1]">
                    <strong>Incident:</strong> {c.incidentType}
                  </div>
                  <div className="text-[12px] text-[#94A3B8]">
                    <strong className="text-[#2DD4FF]">Link to Current Case NX-1024:</strong> {c.relationshipToCurrentCase}
                  </div>
                  <div className="text-[11px] font-mono text-[#64748B]">
                    Penal Sections: {c.sections}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: EVIDENCE */}
      {/* ======================================================== */}
      {activeTab === 'evidence' && (
        <div className="p-6 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-4">
          <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
            <h3 className="text-[16px] font-semibold text-[#F8FAFC]">
              Unified Multi-Source Evidence Repository
            </h3>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Upload className="w-3.5 h-3.5" />}
              onClick={() => (onOpenEvidenceUpload ? onOpenEvidenceUpload() : setIsUploadModalOpen(true))}
            >
              Upload New Evidence
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[
              { title: 'Scanned FIR 102/2026 (Kotwali)', type: 'Document', date: '14 Sept 20:25', size: '3.4 MB', tag: 'OCR Verified' },
              { title: 'CCTV Camera C-17 Egress Clip', type: 'Surveillance Video', date: '14 Sept 20:43', size: '24.2 MB', tag: '94% Plate OCR' },
              { title: 'Telecom Operator CDR Dump (Tower logs)', type: 'Call Detail Record', date: '14 Sept 21:30', size: '8.1 MB', tag: '23 Calls Linked' },
              { title: 'Suspect Fingerprint & Vahan Registry', type: 'Criminal Record', date: '14 Sept 21:40', size: '1.2 MB', tag: 'State Criminal DB' },
            ].map((e, idx) => (
              <div key={idx} className="p-4 rounded-[6px] bg-[#0F151C] border border-[#26313D] flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[13px] font-semibold text-[#F8FAFC] block">{e.title}</span>
                  <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
                    <span>{e.type}</span>
                    <span>•</span>
                    <span>{e.size}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2DD4FF]/10 text-[#2DD4FF]">
                  {e.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 8: AI INSIGHTS */}
      {/* ======================================================== */}
      {activeTab === 'ai-insights' && (
        <div className="p-6 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-4">
          <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2DD4FF]" />
              <h3 className="text-[16px] font-semibold text-[#F8FAFC]">
                Synthesized Multi-Source AI Insights
              </h3>
            </div>
            {onAskAi && (
              <Button variant="secondary" size="sm" onClick={onAskAi}>
                Ask AI Assistant
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {caseData.aiInsights.map((ins) => (
              <div key={ins.id} className="p-4 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#F8FAFC]">{ins.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#22C55E]/10 text-[#22C55E] font-bold">
                    {ins.confidence}% Confidence
                  </span>
                </div>
                <p className="text-[12px] text-[#94A3B8] leading-relaxed">
                  {ins.message}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-1">
                  <span>Source: {ins.source}</span>
                  <span>{ins.timestamp} IST</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 9: TIMELINE */}
      {/* ======================================================== */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-4">
          <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
            <h3 className="text-[16px] font-semibold text-[#F8FAFC]">
              Unified Multi-Source Timeline
            </h3>
            <span className="text-[11px] font-mono text-[#64748B]">14 SEPTEMBER 2026</span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#26313D]">
            {[
              { time: '19:30', title: 'Vehicle Parked at Sector 12 North Plaza', type: 'FIR Statement', source: 'Complainant Rajesh Kumar' },
              { time: '19:42', title: 'Lookout Call from Suresh Patel to Rahul Sharma', type: 'CDR Log', source: 'Cell Tower TOW-SEC12-A' },
              { time: '20:10', title: 'Theft Discovered by Complainant', type: 'FIR Statement', source: 'Security Guard Eyewitness' },
              { time: '20:12', title: 'Accused Rahul calls Associate Vikram Singh', type: 'CDR Log', source: '3m 15s voice call during escape' },
              { time: '20:43', title: 'Camera C-17 Optical Detection (54 km/h)', type: 'CCTV Video', source: 'North Avenue Crossing • 94% match' },
              { time: '20:47', title: 'Camera C-21 Optical Detection (48 km/h)', type: 'CCTV Video', source: 'Main Road Arterial • 91% match' },
              { time: '20:52', title: 'Camera C-08 Optical Detection (62 km/h)', type: 'CCTV Video', source: 'East Bypass Expressway • 89% match' },
              { time: '21:03', title: 'Camera C-03 Optical Detection (36 km/h)', type: 'CCTV Video', source: 'Railway Road Terminal • 87% match' },
              { time: '21:04', title: 'Call from Suspect to Scrap Merchant Amit Verma', type: 'CDR Log', source: 'Tower TOW-RLW-02 Handover' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#2DD4FF] border-2 border-[#0B0F14]" />
                <div className="p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono font-bold text-[#2DD4FF]">{item.time} IST</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-[#151D26] text-[#CBD5E1]">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-[13px] font-semibold text-[#F8FAFC]">{item.title}</h4>
                  <span className="text-[11px] text-[#94A3B8] block">{item.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 10: REPORT */}
      {/* ======================================================== */}
      {activeTab === 'report' && (
        <div className="p-6 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-4 text-center py-12">
          <FileCheck2 className="w-12 h-12 text-[#2DD4FF] mx-auto" />
          <h3 className="text-[18px] font-bold text-[#F8FAFC]">
            Full Investigation Dossier Ready
          </h3>
          <p className="text-[13px] text-[#94A3B8] max-w-md mx-auto">
            Comprehensive synthesized report including FIR, CCTV, CDR, Criminal Network, and Evidence Timeline.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              leftIcon={<FileText className="w-4 h-4" />}
              onClick={() => onOpenReport && onOpenReport()}
            >
              Open Complete Dossier & Print
            </Button>
          </div>
        </div>
      )}

      {/* Person Profile Modal */}
      <PersonProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={PRIMARY_SUSPECT_PROFILE}
      />

      {/* Upload Evidence Modal */}
      <UploadEvidenceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        caseNumber={caseData.caseNumber}
        onUploaded={() => {
          setIsUploadModalOpen(false);
          setActiveTab('evidence');
        }}
      />
    </div>
  );
};
