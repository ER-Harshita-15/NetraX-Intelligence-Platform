import React, { useState, useRef } from 'react';
import { UploadState } from '../../types';
import { Button } from '../buttons/Button';
import {
  UploadCloud,
  FileCheck2,
  AlertCircle,
  X,
  FileVideo,
  FileText,
  FileImage,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export interface EvidenceUploadProps {
  initialState?: UploadState;
  onFilesSelected?: (files: FileList | File[]) => void;
  className?: string;
}

export const EvidenceUpload: React.FC<EvidenceUploadProps> = ({
  initialState = 'empty',
  onFilesSelected,
  className = '',
}) => {
  const [uploadState, setUploadState] = useState<UploadState>(initialState);
  const [progress, setProgress] = useState<number>(64);
  const [uploadedFileName, setUploadedFileName] = useState<string>('CAM_C17_20260914_204317.mp4');
  const [fileSize, setFileSize] = useState<string>('48.2 MB');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (uploadState !== 'uploading') {
      setUploadState('dragging');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (uploadState === 'dragging') {
      setUploadState('empty');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      triggerUploadSimulation();
      onFilesSelected?.(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      triggerUploadSimulation();
      onFilesSelected?.(e.target.files);
    }
  };

  const triggerUploadSimulation = () => {
    setUploadState('uploading');
    setProgress(15);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setUploadState('uploaded');
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const resetUpload = () => {
    setUploadState('empty');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* State Switcher for Specimen Previewing */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#64748B] uppercase">
          EVIDENCE DROPZONE STATE
        </span>
        <div className="flex items-center rounded-[6px] bg-[#0F151C] border border-[#26313D] p-0.5 text-[11px] font-mono">
          {(['empty', 'dragging', 'uploading', 'uploaded', 'error'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setUploadState(st)}
              className={`px-2 py-0.5 rounded capitalize transition-colors ${
                uploadState === st
                  ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold'
                  : 'text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Drag-Drop Target Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (uploadState === 'empty' || uploadState === 'dragging') {
            fileInputRef.current?.click();
          }
        }}
        className={`rounded-[12px] border-2 border-dashed p-8 text-center transition-all duration-150 relative overflow-hidden select-none ${
          uploadState === 'dragging'
            ? 'border-[#2DD4FF] bg-[#2DD4FF]/10 scale-[1.01]'
            : uploadState === 'error'
            ? 'border-[#EF4444]/60 bg-[#EF4444]/5'
            : uploadState === 'uploading'
            ? 'border-[#2DD4FF]/40 bg-[#111820]'
            : uploadState === 'uploaded'
            ? 'border-[#22C55E]/50 bg-[#111820]'
            : 'border-[#26313D] bg-[#111820] hover:border-[#2DD4FF]/50 hover:bg-[#151D26]/50 cursor-pointer'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept="video/*,image/*,.pdf,.doc,.docx,audio/*"
        />

        {/* 1. Empty & Dragging State */}
        {(uploadState === 'empty' || uploadState === 'dragging') && (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                uploadState === 'dragging'
                  ? 'bg-[#2DD4FF]/20 text-[#2DD4FF]'
                  : 'bg-[#151D26] border border-[#26313D] text-[#64748B] group-hover:text-[#2DD4FF]'
              }`}
            >
              <UploadCloud className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-[16px] font-semibold text-[#F8FAFC]">
                {uploadState === 'dragging' ? 'Release to Ingest Evidence' : 'Drop evidence here'}
              </h4>
              <p className="text-[12px] font-mono text-[#94A3B8] mt-1">
                CCTV footage • Images • Documents • Audio
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Browse Files
            </Button>

            <span className="text-[11px] font-mono text-[#64748B]">
              Supports MP4, AVI, MKV, JPG, PNG, WAV, PDF up to 2GB per asset
            </span>
          </div>
        )}

        {/* 2. Uploading State */}
        {uploadState === 'uploading' && (
          <div className="flex flex-col items-center justify-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#2DD4FF]/10 border border-[#2DD4FF]/30 flex items-center justify-center text-[#2DD4FF]">
              <FileVideo className="w-6 h-6 animate-pulse" />
            </div>

            <div className="w-full text-center">
              <h4 className="text-[15px] font-semibold text-[#F8FAFC] truncate">
                Uploading: {uploadedFileName}
              </h4>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] mt-1">
                <span>{fileSize}</span>
                <span className="text-[#2DD4FF]">{progress}% Complete</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#151D26] rounded-full overflow-hidden mt-2 border border-[#26313D]">
                <div
                  className="h-full bg-[#2DD4FF] transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[11px] font-mono text-[#64748B] block mt-2">
                Transferring via encrypted surveillance tunnel...
              </span>
            </div>
          </div>
        )}

        {/* 3. Uploaded State */}
        {uploadState === 'uploaded' && (
          <div className="flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
              <FileCheck2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-[15px] font-semibold text-[#F8FAFC]">
                Evidence Ingested Successfully
              </h4>
              <p className="text-[12px] font-mono text-[#94A3B8] mt-0.5">
                {uploadedFileName} ({fileSize})
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] font-mono text-[#22C55E]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SHA-256 HASH VERIFIED & READY FOR AI ANALYSIS</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button variant="primary" size="sm">
                Start AI Analysis
              </Button>
              <Button variant="ghost" size="sm" onClick={resetUpload}>
                Upload Another
              </Button>
            </div>
          </div>
        )}

        {/* 4. Error State */}
        {uploadState === 'error' && (
          <div className="flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444]">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-[15px] font-semibold text-[#EF4444]">
                Evidence Ingestion Failed
              </h4>
              <p className="text-[12px] font-mono text-[#94A3B8] mt-0.5">
                Codec mismatch: Video container corrupted or corrupted RTSP timestamp header.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="danger"
                size="sm"
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={() => triggerUploadSimulation()}
              >
                Retry Upload
              </Button>
              <Button variant="ghost" size="sm" onClick={resetUpload}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
