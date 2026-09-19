import React, { useState } from 'react';
import {
  Upload,
  ArrowLeft,
  Sparkles,
  FileVideo,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  CircleDot,
  Trash2,
  Plus,
  Shield,
  HardDrive,
  Info,
  Check
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { DemoProgressBar } from './DemoProgressBar';

export interface EvidenceUploadViewProps {
  onBackToCase?: () => void;
  onAnalyzeEvidence?: () => void;
  onRunAiAnalysis?: () => void;
  onNavigateStep?: (step: any) => void;
}

interface EvidenceFile {
  id: string;
  name: string;
  type: 'cctv' | 'image' | 'pdf';
  size: string;
  duration?: string;
  resolution?: string;
  timestamp: string;
  source: string;
  status: 'uploaded' | 'processing' | 'pending';
  thumbnailSvgType: 'cctv_c17' | 'cctv_main' | 'cctv_parking' | 'car_photo' | 'pdf_doc';
}

const INITIAL_FILES: EvidenceFile[] = [
  {
    id: 'ev-1',
    name: 'CCTV_Camera_17.mp4',
    type: 'cctv',
    size: '148.2 MB',
    duration: '04:12',
    resolution: '1080p @ 30fps',
    timestamp: '14 Sept 2026 • 20:43',
    source: 'Cam C-17 (Sector 12)',
    status: 'uploaded',
    thumbnailSvgType: 'cctv_c17',
  },
  {
    id: 'ev-2',
    name: 'CCTV_MainRoad.mp4',
    type: 'cctv',
    size: '192.0 MB',
    duration: '05:30',
    resolution: '1080p @ 30fps',
    timestamp: '14 Sept 2026 • 20:47',
    source: 'Cam C-21 (Main Arterial)',
    status: 'uploaded',
    thumbnailSvgType: 'cctv_main',
  },
  {
    id: 'ev-3',
    name: 'CCTV_Parking.mp4',
    type: 'cctv',
    size: '84.6 MB',
    duration: '02:45',
    resolution: '720p @ 25fps',
    timestamp: '14 Sept 2026 • 20:28',
    source: 'Cam P-04 (Commercial Mall)',
    status: 'processing',
    thumbnailSvgType: 'cctv_parking',
  },
  {
    id: 'ev-4',
    name: 'Vehicle_Image.jpg',
    type: 'image',
    size: '3.4 MB',
    resolution: '3840 x 2160',
    timestamp: '14 Sept 2026 • 20:31',
    source: 'Owner Submission / Witness',
    status: 'uploaded',
    thumbnailSvgType: 'car_photo',
  },
  {
    id: 'ev-5',
    name: 'Incident_Report.pdf',
    type: 'pdf',
    size: '1.2 MB',
    timestamp: '14 Sept 2026 • 20:35',
    source: 'Dispatch First Responder',
    status: 'pending',
    thumbnailSvgType: 'pdf_doc',
  },
];

export const EvidenceUploadView: React.FC<EvidenceUploadViewProps> = ({
  onBackToCase,
  onAnalyzeEvidence,
  onRunAiAnalysis,
  onNavigateStep,
}) => {
  const triggerAnalysis = onRunAiAnalysis || onAnalyzeEvidence || (() => onNavigateStep && onNavigateStep('ai-processing'));
  const triggerBack = onBackToCase || (() => onNavigateStep && onNavigateStep('case-overview'));
  const [files, setFiles] = useState<EvidenceFile[]>(INITIAL_FILES);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const handleSimulateDrop = () => {
    const newFile: EvidenceFile = {
      id: `ev-${Date.now()}`,
      name: `CCTV_Egress_Cam08_${Date.now().toString().slice(-4)}.mp4`,
      type: 'cctv',
      size: '112.4 MB',
      duration: '03:18',
      resolution: '1080p @ 30fps',
      timestamp: '14 Sept 2026 • 20:52',
      source: 'Cam C-08 (East Bypass)',
      status: 'uploaded',
      thumbnailSvgType: 'cctv_main',
    };
    setFiles((prev) => [newFile, ...prev]);
    setUploadNotice(`Successfully ingested ${newFile.name}`);
    setTimeout(() => setUploadNotice(null), 3500);
  };

  const renderThumbnail = (item: EvidenceFile) => {
    switch (item.thumbnailSvgType) {
      case 'cctv_c17':
        return (
          <div className="w-24 h-16 rounded-[4px] bg-[#070A0E] border border-[#26313D] relative overflow-hidden flex items-center justify-center shrink-0">
            {/* Surveillance scene representation */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#0F172A] to-[#0B0F17] opacity-80" />
            <div className="absolute bottom-1 left-2 right-2 h-3 bg-[#1E293B] rounded-sm transform skew-x-6" />
            {/* White SUV block */}
            <div className="absolute bottom-2 left-6 w-8 h-4 bg-white/90 rounded-sm border border-cyan-400/80 shadow-[0_0_6px_rgba(45,212,255,0.6)]" />
            <div className="absolute top-1 left-1.5 text-[8px] font-mono text-[#2DD4FF] bg-black/60 px-1 rounded">
              C-17
            </div>
            <div className="absolute bottom-1 right-1 text-[7px] font-mono text-[#94A3B8] bg-black/60 px-1 rounded">
              20:43
            </div>
          </div>
        );
      case 'cctv_main':
        return (
          <div className="w-24 h-16 rounded-[4px] bg-[#070A0E] border border-[#26313D] relative overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#151D26] to-[#0B0F14]" />
            <div className="absolute bottom-0 inset-x-0 h-4 bg-[#1E293B]" />
            <div className="absolute bottom-2 right-5 w-9 h-4 bg-white/80 rounded-sm border border-cyan-400/60" />
            <div className="absolute top-1 left-1.5 text-[8px] font-mono text-[#2DD4FF] bg-black/60 px-1 rounded">
              C-21
            </div>
            <div className="absolute bottom-1 right-1 text-[7px] font-mono text-[#94A3B8] bg-black/60 px-1 rounded">
              20:47
            </div>
          </div>
        );
      case 'cctv_parking':
        return (
          <div className="w-24 h-16 rounded-[4px] bg-[#070A0E] border border-[#26313D] relative overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] to-[#1E293B]" />
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin opacity-70" />
            <div className="absolute top-1 left-1.5 text-[8px] font-mono text-[#F59E0B] bg-black/60 px-1 rounded">
              P-04
            </div>
            <div className="absolute bottom-1 right-1 text-[7px] font-mono text-[#F59E0B] bg-black/60 px-1 rounded">
              DECODING
            </div>
          </div>
        );
      case 'car_photo':
        return (
          <div className="w-24 h-16 rounded-[4px] bg-[#0F172A] border border-[#26313D] relative overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617]" />
            <div className="w-12 h-6 bg-slate-100 rounded shadow-md border border-slate-300 relative flex items-center justify-center">
              <span className="text-[7px] font-mono text-slate-800 font-bold">SUV</span>
            </div>
            <div className="absolute top-1 left-1.5 text-[8px] font-mono text-[#22C55E] bg-black/60 px-1 rounded">
              STILL
            </div>
            <div className="absolute bottom-1 right-1 text-[7px] font-mono text-[#2DD4FF] bg-black/60 px-1 rounded">
              CG 10
            </div>
          </div>
        );
      case 'pdf_doc':
      default:
        return (
          <div className="w-24 h-16 rounded-[4px] bg-[#0B0F14] border border-[#26313D] relative overflow-hidden flex flex-col items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-[#94A3B8]" />
            <span className="text-[8px] font-mono text-[#64748B] mt-0.5">PDF DOC</span>
          </div>
        );
    }
  };

  const renderStatusBadge = (status: EvidenceFile['status']) => {
    switch (status) {
      case 'uploaded':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[11px] font-mono font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Uploaded
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#2DD4FF]/15 text-[#2DD4FF] border border-[#2DD4FF]/30 text-[11px] font-mono font-medium animate-pulse">
            <CircleDot className="w-3.5 h-3.5" />
            Processing
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#64748B]/15 text-[#94A3B8] border border-[#64748B]/30 text-[11px] font-mono font-medium">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans select-none">
      {/* Step Navigation Bar */}
      {onNavigateStep && (
        <DemoProgressBar currentStep="evidence-upload" onNavigateStep={onNavigateStep} />
      )}

      {/* Top Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={triggerBack}
          >
            Case Overview
          </Button>
          <div className="h-4 w-px bg-[#26313D]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-mono font-bold text-[#2DD4FF]">
                CASE #NX-1024
              </span>
              <span className="text-[11px] font-mono text-[#64748B]">• Sector 12</span>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 text-[10px] font-mono font-bold">
                HIGH PRIORITY
              </span>
            </div>
            <h2 className="text-[24px] font-bold text-[#F8FAFC]">
              Evidence Ingestion & Repository
            </h2>
          </div>
        </div>

        {/* Primary Action Button: Analyze Evidence */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleSimulateDrop}
          >
            Add Sample File
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Sparkles className="w-4 h-4 text-[#0B0F14]" />}
            onClick={triggerAnalysis}
            className="shadow-[0_0_20px_rgba(45,212,255,0.3)]"
          >
            Analyze Evidence
          </Button>
        </div>
      </div>

      {/* Success Notification if dropped */}
      {uploadNotice && (
        <div className="p-3 rounded-[6px] bg-[#22C55E]/10 border border-[#22C55E]/40 text-[#22C55E] text-[12px] font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{uploadNotice}</span>
          </div>
          <span className="text-[11px] text-[#94A3B8]">Hash SHA-256 verified</span>
        </div>
      )}

      {/* Target Details Strip */}
      <div className="p-4 rounded-[8px] bg-[#111820] border border-[#26313D] flex flex-wrap items-center justify-between gap-4 text-[12px] font-mono">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[#64748B] block text-[10px] uppercase">TARGET VEHICLE</span>
            <span className="text-[#F8FAFC] font-bold">White SUV</span>
          </div>
          <div className="h-6 w-px bg-[#26313D]" />
          <div>
            <span className="text-[#64748B] block text-[10px] uppercase">LICENSE PLATE</span>
            <span className="text-[#2DD4FF] font-bold tracking-wider">CG 10 AB 1234</span>
          </div>
          <div className="h-6 w-px bg-[#26313D]" />
          <div>
            <span className="text-[#64748B] block text-[10px] uppercase">INCIDENT TIME</span>
            <span className="text-[#F8FAFC]">14 Sept 2026 • 20:30 hrs</span>
          </div>
          <div className="h-6 w-px bg-[#26313D]" />
          <div>
            <span className="text-[#64748B] block text-[10px] uppercase">SECTOR</span>
            <span className="text-[#F8FAFC]">Sector 12 (North Gate)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#94A3B8]">
          <HardDrive className="w-4 h-4 text-[#2DD4FF]" />
          <span>5 Files Loaded (429.4 MB Total)</span>
        </div>
      </div>

      {/* DRAG AND DROP ZONE */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleSimulateDrop();
        }}
        onClick={handleSimulateDrop}
        className={`border-2 border-dashed rounded-[8px] p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-[#2DD4FF] bg-[#2DD4FF]/10 scale-[1.005]'
            : 'border-[#26313D] bg-[#0F151C] hover:border-[#2DD4FF]/50 hover:bg-[#151D26]'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#151D26] border border-[#2DD4FF]/40 text-[#2DD4FF] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(45,212,255,0.15)]">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#F8FAFC]">
              Drag and drop CCTV footage, image stills, or dispatch files
            </p>
            <p className="text-[12px] text-[#94A3B8] mt-1 font-mono">
              Supports .mp4, .avi, .mkv, .jpg, .png, .pdf (Up to 2 GB per stream)
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#111820] border border-[#26313D] text-[11px] font-mono text-[#2DD4FF]">
            <span>Click anywhere or drop file to simulate ingest</span>
          </div>
        </div>
      </div>

      {/* UPLOADED EVIDENCE LIST */}
      <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
          <div className="flex items-center gap-2">
            <FileVideo className="w-4 h-4 text-[#2DD4FF]" />
            <h3 className="text-[16px] font-semibold text-[#F8FAFC]">
              Ingested Evidence Files ({files.length})
            </h3>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              Uploaded (3)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF] animate-pulse" />
              Processing (1)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#64748B]" />
              Pending (1)
            </span>
          </div>
        </div>

        {/* Evidence Table / Cards */}
        <div className="divide-y divide-[#1F2937]">
          {files.map((file) => (
            <div
              key={file.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#151D26]/50 px-2 rounded-[6px] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                {/* Thumbnail */}
                {renderThumbnail(file)}

                {/* File info */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#F8FAFC] font-mono">
                      {file.name}
                    </span>
                    {file.duration && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1F2937] text-[#94A3B8]">
                        {file.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#64748B] font-mono">
                    Source: {file.source} • {file.size} {file.resolution ? `• ${file.resolution}` : ''}
                  </p>
                  <p className="text-[10px] text-[#94A3B8] font-mono">
                    Timestamp: {file.timestamp}
                  </p>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex items-center gap-4 self-end sm:self-center">
                {renderStatusBadge(file.status)}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Action prompt */}
        <div className="pt-4 border-t border-[#26313D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[12px] text-[#94A3B8] font-mono">
            <Info className="w-4 h-4 text-[#2DD4FF] shrink-0" />
            <span>
              All video streams decoded. Neural frame extractor is primed for optical plate matching.
            </span>
          </div>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Sparkles className="w-4 h-4 text-[#0B0F14]" />}
            onClick={triggerAnalysis}
            className="shadow-[0_0_20px_rgba(45,212,255,0.3)]"
          >
            Analyze Evidence
          </Button>
        </div>
      </div>
    </div>
  );
};
