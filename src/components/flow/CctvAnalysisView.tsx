import React, { useState } from 'react';
import {
  Cctv,
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Radio,
  Crosshair,
  Sparkles,
  ArrowRight,
  Shield,
  Car,
  Tag,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  Camera,
  Layers
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { DemoProgressBar } from './DemoProgressBar';

export interface CctvAnalysisViewProps {
  onTrackAcrossCameras: () => void;
  onNavigateStep?: (step: any) => void;
}

export const CctvAnalysisView: React.FC<CctvAnalysisViewProps> = ({
  onTrackAcrossCameras,
  onNavigateStep,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlays, setShowOverlays] = useState(true);
  const [zoomPlate, setZoomPlate] = useState(false);

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans select-none">
      {/* Step Navigation Bar */}
      {onNavigateStep && (
        <DemoProgressBar currentStep="cctv-analysis" onNavigateStep={onNavigateStep} />
      )}

      {/* Header Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono font-bold text-[#2DD4FF]">
              CASE #NX-1024
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">• FEED C-17</span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-mono font-bold">
              TARGET CONFIRMED
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-[#F8FAFC]">
            CCTV Optical Surveillance Analysis
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onTrackAcrossCameras}
            className="shadow-[0_0_20px_rgba(45,212,255,0.3)]"
          >
            Track Vehicle Across Cameras
          </Button>
        </div>
      </div>

      {/* Main Grid: Left CCTV Player + Right AI Detection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Large CCTV Video Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="rounded-[10px] bg-[#070A0E] border border-[#26313D] overflow-hidden relative shadow-2xl flex flex-col">
            {/* Top Video Header Bar */}
            <div className="bg-[#0B0F14]/90 backdrop-blur border-b border-[#1E293B] px-4 py-2.5 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-red-400 font-mono font-bold text-[12px] tracking-wider">
                    REC ●
                  </span>
                </div>
                <div className="h-4 w-px bg-[#26313D]" />
                <span className="text-[12px] font-mono font-bold text-[#F8FAFC]">
                  CAMERA C-17
                </span>
                <span className="text-[11px] font-mono text-[#64748B]">
                  • SECTOR 12 (NORTH AVENUE)
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-[#94A3B8]">
                <span className="px-2 py-0.5 rounded bg-[#151D26] text-[#2DD4FF]">
                  1080P • 30 FPS
                </span>
                <span>OPTICAL DETECTOR: ACTIVE</span>
              </div>
            </div>

            {/* Video Canvas Area */}
            <div className="relative w-full aspect-video bg-[#05070B] overflow-hidden flex items-center justify-center">
              {/* Scanline CRT overlay effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 z-10"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
                  backgroundSize: '100% 4px',
                }}
              />

              {/* Street / Surveillance Scene Graphic (SVG Simulation) */}
              <svg
                viewBox="0 0 800 450"
                className="w-full h-full object-cover"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="roadSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B1118" />
                    <stop offset="40%" stopColor="#111B24" />
                    <stop offset="100%" stopColor="#080C10" />
                  </linearGradient>
                  <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#141E28" />
                    <stop offset="100%" stopColor="#0D141C" />
                  </linearGradient>
                  <linearGradient id="whiteSuvGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#CBD5E1" />
                  </linearGradient>
                </defs>

                {/* Sky and City Silhouette */}
                <rect width="800" height="220" fill="url(#roadSky)" />
                <path
                  d="M0,220 L60,190 L90,210 L150,170 L210,210 L280,160 L340,210 L450,150 L520,200 L620,165 L700,210 L800,180 L800,230 L0,230 Z"
                  fill="#0E1620"
                  opacity="0.8"
                />

                {/* Road Perspective */}
                <polygon points="0,450 260,220 540,220 800,450" fill="url(#asphalt)" />
                {/* Sidewalks / Barriers */}
                <polygon points="0,450 0,380 240,220 260,220" fill="#1C2733" opacity="0.6" />
                <polygon points="800,450 800,380 560,220 540,220" fill="#1C2733" opacity="0.6" />

                {/* Road center dashed line */}
                <line
                  x1="400"
                  y1="220"
                  x2="400"
                  y2="450"
                  stroke="#F59E0B"
                  strokeWidth="4"
                  strokeDasharray="20,15"
                  opacity="0.5"
                />
                <line
                  x1="320"
                  y1="450"
                  x2="370"
                  y2="220"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="15,20"
                  opacity="0.3"
                />
                <line
                  x1="480"
                  y1="450"
                  x2="430"
                  y2="220"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="15,20"
                  opacity="0.3"
                />

                {/* Street Light Posts */}
                <line x1="220" y1="200" x2="220" y2="290" stroke="#334155" strokeWidth="3" />
                <circle cx="220" cy="200" r="4" fill="#FEF08A" opacity="0.6" />
                <line x1="580" y1="200" x2="580" y2="290" stroke="#334155" strokeWidth="3" />
                <circle cx="580" cy="200" r="4" fill="#FEF08A" opacity="0.6" />

                {/* Background other vehicle (distant sedan) */}
                <rect x="440" y="240" width="45" height="24" rx="4" fill="#334155" opacity="0.7" />
                <circle cx="448" cy="264" r="5" fill="#020617" />
                <circle cx="476" cy="264" r="5" fill="#020617" />
                <rect x="442" y="250" width="4" height="4" fill="#EF4444" opacity="0.8" />

                {/* TARGET VEHICLE: WHITE SUV (Central Foreground) */}
                <g id="target-white-suv" className="transition-all duration-300">
                  {/* Vehicle Shadow */}
                  <ellipse cx="370" cy="355" rx="130" ry="24" fill="#000000" opacity="0.6" />

                  {/* SUV Body Main Cabin */}
                  <path
                    d="M260,340 L270,305 L310,270 L430,270 L475,305 L490,340 Z"
                    fill="url(#whiteSuvGrad)"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                  />

                  {/* SUV Roof and Tinted Windows */}
                  <path
                    d="M312,272 L330,274 L375,274 L375,302 L290,302 Z"
                    fill="#0F172A"
                    stroke="#64748B"
                    strokeWidth="1"
                  />
                  <path
                    d="M382,274 L426,274 L460,302 L382,302 Z"
                    fill="#0F172A"
                    stroke="#64748B"
                    strokeWidth="1"
                  />

                  {/* Rear Lights (Red brake lights) */}
                  <rect x="268" y="318" width="16" height="8" rx="2" fill="#EF4444" opacity="0.9" />
                  <rect x="470" y="318" width="16" height="8" rx="2" fill="#EF4444" opacity="0.9" />

                  {/* Wheels */}
                  <circle cx="295" cy="346" r="19" fill="#0F172A" stroke="#334155" strokeWidth="4" />
                  <circle cx="295" cy="346" r="9" fill="#64748B" />
                  <circle cx="455" cy="346" r="19" fill="#0F172A" stroke="#334155" strokeWidth="4" />
                  <circle cx="455" cy="346" r="9" fill="#64748B" />

                  {/* License Plate Area */}
                  <rect
                    x="345"
                    y="322"
                    width="62"
                    height="16"
                    rx="2"
                    fill="#FFFFFF"
                    stroke="#000000"
                    strokeWidth="1"
                  />
                  <text
                    x="376"
                    y="334"
                    fill="#000000"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                    letterSpacing="1"
                  >
                    CG 10 AB 1234
                  </text>
                </g>
              </svg>

              {/* BOUNDING BOX OVERLAY AROUND THE WHITE SUV */}
              {showOverlays && (
                <div
                  className="absolute z-20 pointer-events-none transition-all duration-300"
                  style={{
                    left: '28%',
                    top: '48%',
                    width: '38%',
                    height: '38%',
                  }}
                >
                  {/* Bounding box border with high-tech bracket corners */}
                  <div className="w-full h-full border-2 border-[#2DD4FF] rounded-[2px] shadow-[0_0_20px_rgba(45,212,255,0.4)] relative">
                    {/* Corner Accent Ticks */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#2DD4FF]" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#2DD4FF]" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#2DD4FF]" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#2DD4FF]" />

                    {/* Center Crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[#2DD4FF] opacity-60">
                      <Crosshair className="w-full h-full" />
                    </div>

                    {/* TARGET LABEL TAG */}
                    <div className="absolute -top-7 left-0 bg-[#2DD4FF] text-[#0B0F14] px-2 py-0.5 rounded-[2px] font-mono font-bold text-[11px] flex items-center gap-1.5 shadow-md">
                      <span>VEHICLE</span>
                      <span className="opacity-75">•</span>
                      <span>ID: V-023</span>
                      <span className="opacity-75">•</span>
                      <span className="bg-[#0B0F14] text-[#2DD4FF] px-1 rounded text-[10px]">
                        94% CONFIDENCE
                      </span>
                    </div>

                    {/* License Plate sub-box */}
                    <div
                      className="absolute border border-emerald-400 bg-emerald-400/20 rounded-[2px]"
                      style={{
                        left: '32%',
                        top: '44%',
                        width: '36%',
                        height: '22%',
                      }}
                    >
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black/80 text-emerald-300 font-mono text-[9px] px-1 rounded whitespace-nowrap border border-emerald-500/40">
                        CG 10 AB 1234
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OSD Surveillance Telemetry (Top Left & Bottom Right) */}
              <div className="absolute top-4 left-4 z-20 font-mono text-[11px] text-[#2DD4FF] space-y-0.5 bg-[#0B0F14]/70 p-2 rounded border border-[#1E293B] backdrop-blur-sm pointer-events-none">
                <div className="font-bold tracking-wider">CAMERA C-17</div>
                <div className="text-[#94A3B8]">SECTOR 12</div>
                <div className="text-[#F8FAFC]">14 SEPT 2026</div>
                <div className="text-[#2DD4FF] font-bold">20:43:17</div>
                <div className="text-red-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  REC ●
                </div>
              </div>

              {/* Speed & Direction Telemetry (Bottom Left) */}
              <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] text-[#94A3B8] bg-[#0B0F14]/70 px-2 py-1 rounded border border-[#1E293B]">
                VELOCITY: 54 KM/H • BEARING: 084° (E) • GPS: 28.5412° N, 77.2189° E
              </div>
            </div>

            {/* Bottom Playback Controls */}
            <div className="bg-[#0B0F14] border-t border-[#1E293B] p-3 flex flex-wrap items-center justify-between gap-3 z-20 font-mono text-[12px]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded bg-[#151D26] hover:bg-[#1E293B] text-[#F8FAFC] cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded bg-[#151D26] hover:bg-[#1E293B] text-[#94A3B8] cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <div className="text-[#2DD4FF] font-bold ml-2">20:43:17</div>
                <span className="text-[#64748B]">/ 20:47:00</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowOverlays(!showOverlays)}
                  className={`px-2.5 py-1 rounded text-[11px] border cursor-pointer ${
                    showOverlays
                      ? 'bg-[#2DD4FF]/15 text-[#2DD4FF] border-[#2DD4FF]/40 font-bold'
                      : 'bg-[#151D26] text-[#94A3B8] border-[#26313D]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 inline mr-1" />
                  AI Bounding Box {showOverlays ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={() => setZoomPlate(!zoomPlate)}
                  className={`px-2.5 py-1 rounded text-[11px] border cursor-pointer ${
                    zoomPlate
                      ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/40 font-bold'
                      : 'bg-[#151D26] text-[#94A3B8] border-[#26313D]'
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5 inline mr-1" />
                  LPR Crop
                </button>
              </div>
            </div>
          </div>

          {/* License Plate Zoom Inspector Drawer if toggled */}
          {zoomPlate && (
            <div className="p-3.5 rounded-[8px] bg-[#111820] border border-[#2DD4FF]/40 flex items-center justify-between gap-4 font-mono text-[12px] animate-fadeIn">
              <div className="flex items-center gap-4">
                <div className="px-3 py-1.5 rounded bg-white text-black font-bold tracking-widest text-[16px] border-2 border-black">
                  CG 10 AB 1234
                </div>
                <div>
                  <span className="text-[#22C55E] font-bold block">
                    OCR OCR-ENGINE-V2 MATCH: 94.2%
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">
                    State: Chhattisgarh • Registered Vehicle: Mahindra XUV / White SUV
                  </span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#2DD4FF]/20 text-[#2DD4FF]">
                VERIFIED
              </span>
            </div>
          )}
        </div>

        {/* RIGHT: AI Detection Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-[10px] bg-[#111820] border border-[#26313D] p-5 space-y-5">
            {/* Panel Title */}
            <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2DD4FF]" />
                <h3 className="text-[16px] font-bold text-[#F8FAFC]">
                  AI Detection
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-mono font-bold">
                HIGH CONFIDENCE
              </span>
            </div>

            {/* Target Specification Checklist */}
            <div className="space-y-3 font-mono">
              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Vehicle:</span>
                <span className="text-[13px] font-bold text-[#F8FAFC]">
                  White SUV
                </span>
              </div>

              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#2DD4FF]/40 flex items-center justify-between shadow-[0_0_10px_rgba(45,212,255,0.1)]">
                <span className="text-[12px] text-[#94A3B8]">License Plate:</span>
                <span className="text-[13px] font-bold text-[#2DD4FF] tracking-wider">
                  CG 10 AB 1234
                </span>
              </div>

              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Vehicle Type:</span>
                <span className="text-[13px] font-semibold text-[#F8FAFC]">
                  SUV
                </span>
              </div>

              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Color:</span>
                <span className="text-[13px] font-semibold text-[#F8FAFC] flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-white border border-gray-400 inline-block" />
                  White
                </span>
              </div>

              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Confidence:</span>
                <span className="text-[14px] font-bold text-[#22C55E]">
                  94%
                </span>
              </div>
            </div>

            {/* Matching Evidence Found Banner */}
            <div className="p-3.5 rounded-[8px] bg-[#22C55E]/10 border border-[#22C55E]/30 space-y-1.5">
              <div className="flex items-center gap-2 text-[#22C55E] font-mono text-[12px] font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Matching Evidence Found</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] font-mono leading-relaxed">
                Optical biometric features match Case #NX-1024 theft bulletin. Same vehicle trajectory detected moving eastward towards Sector 12 highway junction.
              </p>
            </div>

            {/* Primary Action Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-[0_0_20px_rgba(45,212,255,0.3)]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={onTrackAcrossCameras}
            >
              Track Vehicle Across Cameras
            </Button>
          </div>

          {/* Quick Telemetry Card */}
          <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-4 text-[11px] font-mono space-y-2">
            <span className="text-[#64748B] block uppercase">OPTICAL SENSOR METADATA</span>
            <div className="flex justify-between text-[#94A3B8]">
              <span>Camera Node:</span>
              <span className="text-[#F8FAFC]">AXIS-Q6128-E 4K</span>
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>Focal Length:</span>
              <span className="text-[#F8FAFC]">32.4 mm (Telephoto)</span>
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>Incident Latency:</span>
              <span className="text-[#22C55E]">+13m post-theft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
