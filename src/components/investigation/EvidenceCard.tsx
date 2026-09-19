import React from 'react';
import { EvidenceItem, EvidenceType, ProcessingStatus } from '../../types';
import { StatusBadge } from '../data/StatusBadge';
import {
  Video,
  Image as ImageIcon,
  FileText,
  Volume2,
  HardDrive,
  Download,
  Eye,
  Crosshair,
  Sparkles
} from 'lucide-react';

export interface EvidenceCardProps {
  evidence: EvidenceItem;
  isSelected?: boolean;
  onSelect?: (evidence: EvidenceItem) => void;
  onAnalyze?: (evidence: EvidenceItem) => void;
  className?: string;
}

export const SAMPLE_EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'ev-01',
    title: 'Intersection Camera Clip (20:43 UTC)',
    filename: 'CAM_C17_20260914_204317.mp4',
    type: 'cctv',
    timestamp: '14 SEPT 2026 • 20:43:17',
    source: 'Camera C-17 (Sector 12)',
    fileSize: '48.2 MB',
    duration: '01:45',
    status: 'analyzed',
    detectionsCount: 3,
    confidenceScore: 94,
  },
  {
    id: 'ev-02',
    title: 'High-Res License Plate Telephoto Crop',
    filename: 'LPR_7XYZ89_RECONSTRUCTED.png',
    type: 'image',
    timestamp: '14 SEPT 2026 • 20:44:02',
    source: 'Camera C-18 Toll Sensor',
    fileSize: '4.8 MB',
    status: 'analyzed',
    detectionsCount: 1,
    confidenceScore: 97,
  },
  {
    id: 'ev-03',
    title: 'Police Dispatch Audio Transcript',
    filename: 'DISPATCH_LOG_INCIDENT_1024.wav',
    type: 'audio',
    timestamp: '14 SEPT 2026 • 20:40:15',
    source: 'Central Radio Comm Port 3',
    fileSize: '12.1 MB',
    duration: '03:12',
    status: 'analyzed',
    confidenceScore: 89,
  },
  {
    id: 'ev-04',
    title: 'Automated Forensic Timeline Extraction',
    filename: 'VEHICLE_RECONSTRUCTION_REPORT.pdf',
    type: 'document',
    timestamp: '14 SEPT 2026 • 20:50:00',
    source: 'NETRAX AI Pipeline v2',
    fileSize: '1.4 MB',
    status: 'processing',
  },
];

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  isSelected = false,
  onSelect,
  onAnalyze,
  className = '',
}) => {
  const getTypeMeta = (type: EvidenceType) => {
    switch (type) {
      case 'cctv':
        return {
          icon: <Video className="w-4 h-4 text-[#2DD4FF]" />,
          label: 'CCTV FOOTAGE',
          badgeBg: 'bg-[#2DD4FF]/10 border-[#2DD4FF]/20 text-[#2DD4FF]',
        };
      case 'image':
        return {
          icon: <ImageIcon className="w-4 h-4 text-[#22C55E]" />,
          label: 'IMAGE STILL',
          badgeBg: 'bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]',
        };
      case 'audio':
        return {
          icon: <Volume2 className="w-4 h-4 text-[#F59E0B]" />,
          label: 'AUDIO RECORDING',
          badgeBg: 'bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]',
        };
      case 'document':
        return {
          icon: <FileText className="w-4 h-4 text-[#94A3B8]" />,
          label: 'DOCUMENT / DOSSIER',
          badgeBg: 'bg-[#151D26] border-[#26313D] text-[#94A3B8]',
        };
    }
  };

  const getStatusBadge = (status: ProcessingStatus) => {
    switch (status) {
      case 'analyzed':
        return <StatusBadge variant="completed" label="AI INDEXED" size="sm" />;
      case 'processing':
        return <StatusBadge variant="processing" label="VECTORIZING" size="sm" />;
      case 'failed':
        return <StatusBadge variant="alert" label="CORRUPTED" size="sm" />;
      default:
        return <StatusBadge variant="offline" label="QUEUED" size="sm" />;
    }
  };

  const meta = getTypeMeta(evidence.type);

  return (
    <div
      onClick={() => onSelect?.(evidence)}
      className={`rounded-[8px] bg-[#111820] border p-4 transition-all group cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'border-[#2DD4FF] bg-[#151D26] shadow-[0_0_15px_rgba(45,212,255,0.08)]'
          : 'border-[#26313D] hover:border-[#26313D]/90 hover:bg-[#151D26]/40'
      } ${className}`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-medium uppercase border flex items-center gap-1.5 ${meta.badgeBg}`}
            >
              {meta.icon}
              {meta.label}
            </span>
            {evidence.duration && (
              <span className="text-[10px] font-mono text-[#64748B]">{evidence.duration}</span>
            )}
          </div>
          {getStatusBadge(evidence.status)}
        </div>

        {/* Title and Filename */}
        <div className="mt-3">
          <h5 className="text-[14px] font-semibold text-[#F8FAFC] group-hover:text-[#2DD4FF] transition-colors leading-snug">
            {evidence.title}
          </h5>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#64748B] mt-0.5 truncate">
            <HardDrive className="w-3 h-3 shrink-0" />
            <span className="truncate">{evidence.filename}</span>
            <span>({evidence.fileSize})</span>
          </div>
        </div>

        {/* Thumbnail Preview Box */}
        <div className="mt-3 h-24 rounded-[6px] bg-[#0B0F14] border border-[#26313D] relative overflow-hidden flex items-center justify-center">
          {evidence.type === 'cctv' && (
            <>
              <div className="absolute inset-0 cctv-scanlines opacity-50" />
              <div className="text-center p-2">
                <Video className="w-6 h-6 text-[#2DD4FF] mx-auto opacity-70" />
                <span className="text-[10px] font-mono text-[#2DD4FF] block mt-1">
                  PREVIEW CLAMP • 3 DETECTIONS
                </span>
              </div>
            </>
          )}

          {evidence.type === 'image' && (
            <div className="p-3 text-center">
              <div className="px-3 py-1 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] font-mono font-bold text-[14px] tracking-widest">
                7XYZ89
              </div>
              <span className="text-[9px] font-mono text-[#94A3B8] block mt-1">LPR OCR ENHANCED</span>
            </div>
          )}

          {evidence.type === 'audio' && (
            <div className="w-full px-4 flex items-center justify-center gap-1">
              {[12, 24, 38, 16, 42, 28, 18, 35, 20, 30, 14, 26, 32].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#F59E0B]/60 rounded-full"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          )}

          {evidence.type === 'document' && (
            <div className="text-center">
              <FileText className="w-6 h-6 text-[#94A3B8] mx-auto opacity-60" />
              <span className="text-[10px] font-mono text-[#94A3B8] block mt-1">FORENSIC DOSSIER</span>
            </div>
          )}

          {evidence.confidenceScore && (
            <div className="absolute top-1.5 right-2 px-1.5 py-0.2 rounded bg-[#0B0F14]/90 border border-[#26313D] text-[10px] font-mono text-[#2DD4FF]">
              {evidence.confidenceScore}% CONF
            </div>
          )}
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="mt-3 pt-2.5 border-t border-[#26313D] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
        <div className="truncate max-w-[170px]">{evidence.source}</div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAnalyze?.(evidence);
            }}
            className="text-[11px] font-mono text-[#2DD4FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            AI CORRELATE
          </button>
        </div>
      </div>
    </div>
  );
};
