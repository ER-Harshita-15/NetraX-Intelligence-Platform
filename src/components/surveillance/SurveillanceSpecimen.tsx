import React, { useState } from 'react';
import { CctvPlayer } from './CctvPlayer';
import { CameraStatusCard, SAMPLE_CAMERAS } from './CameraStatusCard';
import { AiDetectionOverlay, SAMPLE_DETECTIONS } from './AiDetectionOverlay';
import { CameraData, DetectionBox } from '../../types';
import { Cctv, Shield, Crosshair, Sparkles } from 'lucide-react';

export const SurveillanceSpecimen: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<CameraData>(SAMPLE_CAMERAS[0]);
  const [activeDetectionType, setActiveDetectionType] = useState<'all' | 'vehicle' | 'person' | 'license_plate'>('all');

  return (
    <div id="surveillance-specimen" className="space-y-12">
      {/* 1. CCTV Surveillance Player */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Surveillance CCTV Video Player
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Realistic video player with telemetry OSD, timestamp scrubber, REC indicator, and multi-state switching.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#2DD4FF] px-2 py-0.5 rounded bg-[#2DD4FF]/10 border border-[#2DD4FF]/20">
              CCTV CORE COMPONENT
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <CctvPlayer
            cameraId={selectedCamera.name}
            location={`${selectedCamera.sector.toUpperCase()} • ${selectedCamera.location.toUpperCase()}`}
            timestamp="14 SEPT 2026 • 20:43:17"
            initialState="detection_active"
          />
        </div>
      </div>

      {/* 2. AI Detection Overlays Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              AI Detection Overlay & Bounding Boxes
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Corner-bracketed tactical target boxes with tracking IDs, confidence scores, and vector telemetry.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center rounded-[6px] bg-[#111820] border border-[#26313D] p-0.5 text-[11px] font-mono">
            {(['all', 'vehicle', 'person', 'license_plate'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveDetectionType(filter)}
                className={`px-2.5 py-1 rounded-[4px] capitalize transition-colors ${
                  activeDetectionType === filter
                    ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold'
                    : 'text-[#64748B] hover:text-[#94A3B8]'
                }`}
              >
                {filter.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Specimen Box Preview Area */}
        <div className="rounded-[8px] bg-[#0B0F14] border border-[#26313D] p-6 relative aspect-[21/9] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F14] via-[#0F151C] to-[#0B0F14]" />
          <div className="absolute inset-0 bg-[radial-gradient(#26313D_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* Bounding box demonstration */}
          <AiDetectionOverlay
            detections={SAMPLE_DETECTIONS}
            activeFilter={activeDetectionType}
            interactive={true}
          />

          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-[#64748B] flex items-center gap-2">
            <Crosshair className="w-3.5 h-3.5 text-[#2DD4FF]" />
            <span>CLICK BOUNDING BOXES TO INSPECT TARGET METADATA</span>
          </div>
        </div>
      </div>

      {/* 3. Camera Status Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Camera Status Cards
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Real-time feed health cards with live/recording/alert state, resolution tags, and detection metrics.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">SECTOR 12 HUB</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_CAMERAS.map((cam) => (
            <CameraStatusCard
              key={cam.id}
              camera={cam}
              isSelected={selectedCamera.id === cam.id}
              onSelect={(c) => setSelectedCamera(c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
