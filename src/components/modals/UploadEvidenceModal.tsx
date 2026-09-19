import React, { useState } from 'react';
import {
  Upload,
  X,
  FileVideo,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  AlertCircle,
  HardDrive
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { EvidenceUpload } from '../forms/EvidenceUpload';

export interface UploadEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseNumber: string;
  onUploaded?: (newItem: { name: string; type: string; size: string }) => void;
}

export const UploadEvidenceModal: React.FC<UploadEvidenceModalProps> = ({
  isOpen,
  onClose,
  caseNumber,
  onUploaded,
}) => {
  const [evidenceType, setEvidenceType] = useState<'cctv' | 'image' | 'document'>('cctv');
  const [sourceCamera, setSourceCamera] = useState('Camera C-17 (North Ave)');
  const [notes, setNotes] = useState('Footage capturing suspect sedan turnoff onto industrial arterial.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setUploadSuccess(true);
      onUploaded?.({
        name: `CAM-17_SEGMENT_${Date.now().toString().slice(-4)}.mp4`,
        type: evidenceType === 'cctv' ? 'CCTV Footage' : evidenceType === 'image' ? 'Image File' : 'Document',
        size: '142.8 MB',
      });
      setTimeout(() => {
        setUploadSuccess(false);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn font-sans select-none">
      <div className="w-full max-w-xl rounded-[10px] bg-[#111820] border border-[#26313D] shadow-2xl overflow-hidden relative">
        {/* Top cyan bar */}
        <div className="h-[2px] bg-[#2DD4FF] w-full" />

        {/* Modal Header */}
        <div className="p-5 border-b border-[#26313D] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-[#2DD4FF] uppercase tracking-wider block">
              EVIDENCE INGESTION • {caseNumber}
            </span>
            <h3 className="text-[18px] font-bold text-[#F8FAFC]">
              Upload Surveillance Evidence
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[6px] bg-[#151D26] border border-[#26313D] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Type Selector Tabs */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setEvidenceType('cctv')}
              className={`p-2.5 rounded-[6px] border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                evidenceType === 'cctv'
                  ? 'border-[#2DD4FF] bg-[#151D26] text-[#2DD4FF]'
                  : 'border-[#26313D] bg-[#0F151C] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <FileVideo className="w-4 h-4" />
              <span className="text-[11px] font-mono font-medium">CCTV Footage</span>
            </button>

            <button
              type="button"
              onClick={() => setEvidenceType('image')}
              className={`p-2.5 rounded-[6px] border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                evidenceType === 'image'
                  ? 'border-[#2DD4FF] bg-[#151D26] text-[#2DD4FF]'
                  : 'border-[#26313D] bg-[#0F151C] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span className="text-[11px] font-mono font-medium">Still Images</span>
            </button>

            <button
              type="button"
              onClick={() => setEvidenceType('document')}
              className={`p-2.5 rounded-[6px] border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                evidenceType === 'document'
                  ? 'border-[#2DD4FF] bg-[#151D26] text-[#2DD4FF]'
                  : 'border-[#26313D] bg-[#0F151C] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="text-[11px] font-mono font-medium">Documents</span>
            </button>
          </div>

          {/* Drag and Drop Zone using Phase 1 component */}
          <div className="border border-[#26313D] rounded-[8px] p-2 bg-[#0B0F14]">
            <EvidenceUpload
              onFilesSelected={() => {}}
            />
          </div>

          {/* Meta Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-[#94A3B8]">
                Source Feed / Origin
              </label>
              <input
                type="text"
                value={sourceCamera}
                onChange={(e) => setSourceCamera(e.target.value)}
                className="w-full h-9 px-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[12px] font-mono text-[#F8FAFC] focus:outline-none focus:border-[#2DD4FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-mono uppercase text-[#94A3B8]">
                Storage Hash
              </label>
              <div className="h-9 px-3 rounded-[6px] bg-[#0B0F14] border border-[#26313D] text-[11px] font-mono text-[#64748B] flex items-center">
                SHA-256: 8f4e2b...902a
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono uppercase text-[#94A3B8]">
              Investigative Ingestion Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-9 px-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[12px] text-[#F8FAFC] focus:outline-none focus:border-[#2DD4FF]"
            />
          </div>

          {uploadSuccess && (
            <div className="p-3 rounded-[6px] bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-[12px] font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Evidence verified & hashed into evidence chain!</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-[#26313D] flex items-center justify-between bg-[#0F151C]">
          <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-[#2DD4FF]" />
            <span>ENCRYPTED VAULT INGESTION</span>
          </span>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isProcessing}
              onClick={handleSimulateUpload}
              leftIcon={<Upload className="w-3.5 h-3.5" />}
            >
              Confirm Ingestion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
