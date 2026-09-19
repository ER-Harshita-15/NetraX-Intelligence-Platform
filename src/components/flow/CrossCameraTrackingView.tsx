import React, { useState } from 'react';
import {
  GitMerge,
  ArrowRight,
  CheckCircle2,
  Cctv,
  MapPin,
  Clock,
  Sparkles,
  Shield,
  Navigation,
  Car,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { DemoProgressBar } from './DemoProgressBar';

export interface CrossCameraTrackingViewProps {
  onViewMap: () => void;
  onNavigateStep?: (step: any) => void;
}

interface CameraDetectionNode {
  id: string;
  cameraId: string;
  location: string;
  timestamp: string;
  confidence: number;
  speed: string;
  distanceFromPrev: string;
  direction: string;
  status: 'confirmed' | 'matched';
  imageType: 'c17' | 'c21' | 'c08' | 'c03';
}

const TRACKED_CAMERAS: CameraDetectionNode[] = [
  {
    id: 'node-1',
    cameraId: 'C-17',
    location: 'Sector 12 (North Ave)',
    timestamp: '20:43',
    confidence: 94,
    speed: '54 km/h',
    distanceFromPrev: '0.0 km (Origin)',
    direction: 'Eastbound',
    status: 'confirmed',
    imageType: 'c17',
  },
  {
    id: 'node-2',
    cameraId: 'C-21',
    location: 'Main Road Junction',
    timestamp: '20:47',
    confidence: 91,
    speed: '48 km/h',
    distanceFromPrev: '1.8 km',
    direction: 'Eastbound',
    status: 'matched',
    imageType: 'c21',
  },
  {
    id: 'node-3',
    cameraId: 'C-08',
    location: 'East Bypass Expressway',
    timestamp: '20:52',
    confidence: 89,
    speed: '62 km/h',
    distanceFromPrev: '2.6 km',
    direction: 'South-East',
    status: 'matched',
    imageType: 'c08',
  },
  {
    id: 'node-4',
    cameraId: 'C-03',
    location: 'Railway Road Terminal',
    timestamp: '21:03',
    confidence: 87,
    speed: '36 km/h',
    distanceFromPrev: '2.4 km',
    direction: 'Terminal Ingress',
    status: 'matched',
    imageType: 'c03',
  },
];

export const CrossCameraTrackingView: React.FC<CrossCameraTrackingViewProps> = ({
  onViewMap,
  onNavigateStep,
}) => {
  const [selectedNode, setSelectedNode] = useState<string>('node-1');

  const renderCameraThumbnail = (node: CameraDetectionNode) => {
    return (
      <div className="w-full aspect-video rounded-[6px] bg-[#070A0E] border border-[#26313D] relative overflow-hidden flex items-center justify-center">
        {/* Background scene gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#0B0F17] to-[#030712]" />

        {/* Street simulation */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-[#1E293B]/70" />
        <div className="absolute bottom-5 inset-x-0 h-0.5 border-b border-dashed border-amber-500/50" />

        {/* White SUV in varying perspective and lighting */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Bounding box */}
          <div className="p-1 rounded-[2px] border-2 border-[#2DD4FF] shadow-[0_0_12px_rgba(45,212,255,0.5)] bg-black/30">
            <div className="w-16 h-8 bg-gradient-to-r from-slate-200 via-white to-slate-300 rounded-sm relative flex items-center justify-center shadow-md">
              <div className="w-8 h-3 bg-slate-900 rounded-sm mb-1" />
              {/* Headlights/Taillights based on camera */}
              {node.cameraId === 'C-17' || node.cameraId === 'C-08' ? (
                <div className="absolute -left-1 top-2 w-1.5 h-2 bg-red-500 rounded-full blur-[1px]" />
              ) : (
                <div className="absolute -right-1 top-2 w-1.5 h-2 bg-amber-200 rounded-full blur-[1px]" />
              )}
            </div>
            <div className="text-[7px] font-mono text-center text-[#2DD4FF] font-bold mt-0.5">
              CG 10 AB 1234
            </div>
          </div>
        </div>

        {/* OSD Telemetry Stamps */}
        <div className="absolute top-1.5 left-2 text-[10px] font-mono font-bold text-[#2DD4FF] bg-black/60 px-1.5 py-0.2 rounded border border-[#26313D]">
          {node.cameraId}
        </div>

        <div className="absolute top-1.5 right-2 text-[10px] font-mono font-bold text-[#22C55E] bg-black/60 px-1.5 py-0.2 rounded border border-[#26313D]">
          {node.confidence}%
        </div>

        <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-[#F8FAFC] bg-black/60 px-1.5 py-0.2 rounded">
          {node.timestamp}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans select-none">
      {/* Step Navigation Bar */}
      {onNavigateStep && (
        <DemoProgressBar currentStep="cross-camera-tracking" onNavigateStep={onNavigateStep} />
      )}

      {/* Header Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono font-bold text-[#2DD4FF]">
              CASE #NX-1024
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">• SPATIAL CORRELATION</span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-mono font-bold">
              4 NODES MATCHED
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-[#F8FAFC]">
            Cross-Camera Vehicle Tracking
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onViewMap}
            className="shadow-[0_0_20px_rgba(45,212,255,0.3)]"
          >
            View Investigation Map
          </Button>
        </div>
      </div>

      {/* MATCH FOUND HERO NOTIFICATION PANEL */}
      <div className="rounded-[10px] bg-gradient-to-r from-[#111820] via-[#152332] to-[#111820] border-2 border-[#2DD4FF]/60 p-6 shadow-[0_0_30px_rgba(45,212,255,0.15)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#2DD4FF] uppercase tracking-wider font-bold">
                  MULTI-SENSOR RE-IDENTIFICATION
                </span>
                <h3 className="text-[22px] font-bold text-[#F8FAFC] tracking-tight">
                  MATCH FOUND: Same vehicle detected across 4 cameras
                </h3>
              </div>
            </div>
            <p className="text-[13px] text-[#94A3B8] font-mono max-w-2xl">
              NetraX deep feature embeddings matched the White SUV (Plate CG 10 AB 1234) across sequential municipal feeds from Sector 12 egress to Railway Road.
            </p>
          </div>

          {/* Overall Confidence Badge & CTA */}
          <div className="flex items-center gap-4 shrink-0 bg-[#0B0F14]/80 p-3.5 rounded-[8px] border border-[#26313D]">
            <div>
              <span className="text-[10px] font-mono text-[#64748B] uppercase block">
                OVERALL CONFIDENCE
              </span>
              <span className="text-[28px] font-bold font-mono text-[#22C55E] leading-none">
                91%
              </span>
            </div>
            <div className="h-8 w-px bg-[#26313D]" />
            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={onViewMap}
            >
              View Map
            </Button>
          </div>
        </div>

        {/* 4 Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#26313D] font-mono">
          <div className="p-3 rounded-[6px] bg-[#0B0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#64748B] uppercase block">FIRST DETECTED</span>
            <span className="text-[16px] font-bold text-[#F8FAFC] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#2DD4FF]" />
              20:43
            </span>
            <span className="text-[10px] text-[#64748B] block mt-0.5">Cam C-17 (Sector 12)</span>
          </div>

          <div className="p-3 rounded-[6px] bg-[#0B0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#64748B] uppercase block">LAST DETECTED</span>
            <span className="text-[16px] font-bold text-[#F8FAFC] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#EF4444]" />
              21:03
            </span>
            <span className="text-[10px] text-[#64748B] block mt-0.5">Cam C-03 (Railway Rd)</span>
          </div>

          <div className="p-3 rounded-[6px] bg-[#0B0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#64748B] uppercase block">CAMERAS MATCHED</span>
            <span className="text-[16px] font-bold text-[#2DD4FF] flex items-center gap-1.5">
              <Cctv className="w-3.5 h-3.5" />
              4 Cameras
            </span>
            <span className="text-[10px] text-[#64748B] block mt-0.5">100% Sequence Ingress</span>
          </div>

          <div className="p-3 rounded-[6px] bg-[#0B0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#64748B] uppercase block">ESTIMATED DISTANCE</span>
            <span className="text-[16px] font-bold text-[#22C55E] flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              6.8 km
            </span>
            <span className="text-[10px] text-[#64748B] block mt-0.5">Avg Speed 42 km/h</span>
          </div>
        </div>
      </div>

      {/* HORIZONTAL 4-CAMERA TRACKING PIPELINE (C-17 → C-21 → C-08 → C-03) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-mono uppercase tracking-wider text-[#94A3B8] block">
            CHRONOLOGICAL SURVEILLANCE INTERCEPTIONS
          </span>
          <span className="text-[11px] font-mono text-[#2DD4FF]">
            C-17 → C-21 → C-08 → C-03
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {TRACKED_CAMERAS.map((node, index) => {
            const isSelected = selectedNode === node.id;

            return (
              <div key={node.id} className="relative flex flex-col">
                {/* Connecting arrow line on desktop between cards */}
                {index < TRACKED_CAMERAS.length - 1 && (
                  <div className="hidden md:flex items-center justify-center absolute -right-3 top-20 z-20 w-6 h-6 rounded-full bg-[#151D26] border border-[#2DD4FF]/60 text-[#2DD4FF] shadow-lg animate-pulse">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* CCTV Card */}
                <div
                  onClick={() => setSelectedNode(node.id)}
                  className={`rounded-[8px] bg-[#111820] border p-4 space-y-3 transition-all cursor-pointer flex-1 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2DD4FF] shadow-[0_0_15px_rgba(45,212,255,0.2)] bg-[#141E28]'
                      : 'border-[#26313D] hover:border-[#38BDF8]/60 hover:bg-[#151D26]'
                  }`}
                >
                  {/* Card Header: Camera & Time */}
                  <div className="flex items-center justify-between font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#F8FAFC]">
                        {node.cameraId}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] px-1.5 py-0.2 rounded bg-[#0B0F14] border border-[#26313D]">
                        #{index + 1}
                      </span>
                    </div>
                    <span className="text-[13px] font-bold text-[#2DD4FF]">
                      {node.timestamp}
                    </span>
                  </div>

                  {/* Thumbnail Video Graphic */}
                  {renderCameraThumbnail(node)}

                  {/* Details */}
                  <div className="space-y-1.5 font-mono text-[11px] pt-1">
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Location:</span>
                      <span className="text-[#F8FAFC] font-medium truncate max-w-[130px]" title={node.location}>
                        {node.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Confidence:</span>
                      <span className="text-[#22C55E] font-bold">
                        {node.confidence}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Velocity:</span>
                      <span className="text-[#94A3B8]">
                        {node.speed}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B]">Leg Distance:</span>
                      <span className="text-[#94A3B8]">
                        +{node.distanceFromPrev}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="pt-2 border-t border-[#1F2937] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#2DD4FF] font-semibold">
                      {node.direction}
                    </span>
                    <span className="text-[#22C55E] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      MATCH
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Correlation Breakdown Card */}
      <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-5 space-y-3 font-mono text-[12px]">
        <div className="flex items-center gap-2 border-b border-[#26313D] pb-3">
          <Sparkles className="w-4 h-4 text-[#2DD4FF]" />
          <h4 className="text-[14px] font-bold text-[#F8FAFC]">
            Kinematic Trajectory Consistency Verification
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#94A3B8]">
          <div className="space-y-1">
            <span className="text-[#64748B] block text-[10px] uppercase">TEMPORAL LOGIC</span>
            <p className="text-[#F8FAFC]">
              20:43 → 20:47 → 20:52 → 21:03 (+20 min total span). Completely matches urban corridor traffic modeling.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[#64748B] block text-[10px] uppercase">LICENSE PLATE OCR</span>
            <p className="text-[#F8FAFC]">
              Consistent plate signature <span className="text-[#2DD4FF] font-bold">CG 10 AB 1234</span> confirmed at C-17 and C-03.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[#64748B] block text-[10px] uppercase">EGRESS VECTOR</span>
            <p className="text-[#F8FAFC]">
              Suspect vehicle departed Sector 12 eastbound, navigated Bypass 08, and terminated near Railway Road Station.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
