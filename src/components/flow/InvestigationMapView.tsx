import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  ArrowRight,
  Cctv,
  Navigation,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  LocateFixed,
  Car,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { DemoProgressBar } from './DemoProgressBar';

export interface InvestigationMapViewProps {
  onViewTimeline: () => void;
  onNavigateStep?: (step: any) => void;
}

interface MapCameraPoint {
  id: string;
  name: string;
  time: string;
  location: string;
  confidence: number;
  x: number; // percentage in SVG coordinate
  y: number;
  speed: string;
}

const MAP_POINTS: MapCameraPoint[] = [
  {
    id: 'pt-1',
    name: 'C-17',
    time: '20:43',
    location: 'Sector 12 (North Ave)',
    confidence: 94,
    x: 160,
    y: 110,
    speed: '54 km/h',
  },
  {
    id: 'pt-2',
    name: 'C-21',
    time: '20:47',
    location: 'Main Road Junction',
    confidence: 91,
    x: 360,
    y: 170,
    speed: '48 km/h',
  },
  {
    id: 'pt-3',
    name: 'C-08',
    time: '20:52',
    location: 'East Bypass',
    confidence: 89,
    x: 520,
    y: 300,
    speed: '62 km/h',
  },
  {
    id: 'pt-4',
    name: 'C-03',
    time: '21:03',
    location: 'Railway Road',
    confidence: 87,
    x: 710,
    y: 380,
    speed: '36 km/h',
  },
];

export const InvestigationMapView: React.FC<InvestigationMapViewProps> = ({
  onViewTimeline,
  onNavigateStep,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<MapCameraPoint>(MAP_POINTS[0]);
  const [showRadar, setShowRadar] = useState(true);

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans select-none">
      {/* Step Navigation Bar */}
      {onNavigateStep && (
        <DemoProgressBar currentStep="investigation-map" onNavigateStep={onNavigateStep} />
      )}

      {/* Header Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono font-bold text-[#2DD4FF]">
              CASE #NX-1024
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">• GEOSPATIAL RECONSTRUCTION</span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-mono font-bold">
              ROUTE RESOLVED
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-[#F8FAFC]">
            Geospatial Vehicle Movement Reconstruction
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onViewTimeline}
            className="shadow-[0_0_20px_rgba(45,212,255,0.3)]"
          >
            View Evidence Timeline
          </Button>
        </div>
      </div>

      {/* Main Map Layout: Left Tactical Map View + Right Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MAP CANVAS (8 cols) */}
        <div className="lg:col-span-8 rounded-[10px] bg-[#070A0E] border border-[#26313D] overflow-hidden relative shadow-2xl flex flex-col min-h-[500px]">
          {/* Map Top Bar */}
          <div className="bg-[#0B0F14]/90 backdrop-blur border-b border-[#1E293B] px-4 py-2.5 flex items-center justify-between z-20">
            <div className="flex items-center gap-2.5 text-[12px] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF] animate-pulse" />
              <span className="text-[#F8FAFC] font-bold">
                SECTOR 12 → RAILWAY ROAD ARTERIAL MAP
              </span>
              <span className="text-[#64748B]">| 1:25,000 SCALE</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#94A3B8]">
              <span className="px-2 py-0.5 rounded bg-[#151D26] text-[#2DD4FF] border border-[#26313D]">
                GPS LIVE TOPOLOGY
              </span>
            </div>
          </div>

          {/* Interactive Vector Dark Map Canvas */}
          <div className="relative flex-1 w-full h-full bg-[#070A0E] overflow-hidden flex items-center justify-center">
            {/* Grid Pattern */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="tacticalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#26313D" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tacticalGrid)" />
            </svg>

            {/* Main City Road Vector Graphic */}
            <svg
              viewBox="0 0 850 500"
              className="w-full h-full object-contain select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Route gradient */}
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2DD4FF" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>

                {/* Glow Filter for route */}
                <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background City Blocks / Land Parcels */}
              <rect x="40" y="40" width="180" height="120" rx="6" fill="#0C121A" stroke="#16202C" strokeWidth="1.5" />
              <text x="55" y="70" fill="#334155" fontSize="10" fontFamily="monospace" fontWeight="bold">SECTOR 12 (RESIDENTIAL)</text>
              <rect x="70" y="85" width="120" height="60" rx="4" fill="#0A0F16" stroke="#1E293B" strokeWidth="0.8" />
              <text x="80" y="105" fill="#475569" fontSize="9" fontFamily="monospace">North Plaza Mall</text>
              <text x="80" y="120" fill="#EF4444" fontSize="8" fontFamily="monospace">● Theft Point (20:30)</text>

              <rect x="260" y="40" width="220" height="90" rx="6" fill="#0C121A" stroke="#16202C" strokeWidth="1.5" />
              <text x="275" y="70" fill="#334155" fontSize="10" fontFamily="monospace" fontWeight="bold">COMMERCIAL TECH HUB</text>

              <rect x="520" y="60" width="280" height="150" rx="6" fill="#0C121A" stroke="#16202C" strokeWidth="1.5" />
              <text x="540" y="90" fill="#334155" fontSize="10" fontFamily="monospace" fontWeight="bold">METROPOLITAN INDUSTRIAL ZONE</text>

              <rect x="60" y="240" width="240" height="200" rx="6" fill="#0C121A" stroke="#16202C" strokeWidth="1.5" />
              <text x="80" y="270" fill="#334155" fontSize="10" fontFamily="monospace" fontWeight="bold">SOUTH PARK & RECREATION</text>

              <rect x="340" y="260" width="180" height="180" rx="6" fill="#0C121A" stroke="#16202C" strokeWidth="1.5" />
              <text x="355" y="290" fill="#334155" fontSize="10" fontFamily="monospace" fontWeight="bold">LOGISTICS FREIGHT DEPOT</text>

              <rect x="580" y="320" width="240" height="150" rx="6" fill="#0C121A" stroke="#16202C" strokeWidth="1.5" />
              <text x="600" y="350" fill="#334155" fontSize="10" fontFamily="monospace" fontWeight="bold">CENTRAL RAILWAY DISTRICT</text>
              <text x="600" y="430" fill="#22C55E" fontSize="9" fontFamily="monospace">● Railway Station Terminal</text>

              {/* Major Roads (Dark Grey Broad Lines) */}
              {/* North Avenue */}
              <path d="M 30,110 L 420,110" stroke="#1C2733" strokeWidth="22" strokeLinecap="round" />
              <path d="M 30,110 L 420,110" stroke="#0E1620" strokeWidth="16" strokeLinecap="round" />

              {/* Main Arterial Road */}
              <path d="M 400,30 L 400,240 L 580,240" stroke="#1C2733" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 400,30 L 400,240 L 580,240" stroke="#0E1620" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />

              {/* East Bypass Expressway */}
              <path d="M 340,110 Q 420,130 520,300" stroke="#1C2733" strokeWidth="24" fill="none" />
              <path d="M 340,110 Q 420,130 520,300" stroke="#0E1620" strokeWidth="18" fill="none" />

              {/* Railway Road Connection */}
              <path d="M 520,300 L 750,400" stroke="#1C2733" strokeWidth="24" strokeLinecap="round" />
              <path d="M 520,300 L 750,400" stroke="#0E1620" strokeWidth="18" strokeLinecap="round" />

              {/* Road Markings / Labels */}
              <text x="70" y="102" fill="#64748B" fontSize="8" fontFamily="monospace">NORTH AVENUE</text>
              <text x="395" y="60" fill="#64748B" fontSize="8" fontFamily="monospace" transform="rotate(90 395 60)">MAIN ROAD ARTERIAL</text>
              <text x="440" y="200" fill="#64748B" fontSize="8" fontFamily="monospace">EAST BYPASS EXPRESSWAY</text>
              <text x="620" y="340" fill="#64748B" fontSize="8" fontFamily="monospace">RAILWAY ROAD TERMINAL</text>

              {/* HIGHLIGHTED VEHICLE MOVEMENT ROUTE (CYAN GLOWING PATH) */}
              <path
                d="M 160,110 L 360,170 Q 440,210 520,300 L 710,380"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#routeGlow)"
              />

              {/* Animated dashed movement line over the path */}
              <path
                d="M 160,110 L 360,170 Q 440,210 520,300 L 710,380"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8,8"
                className="animate-pulse"
                opacity="0.8"
              />

              {/* Directional Chevrons along route */}
              <polygon points="250,137 265,142 250,147" fill="#2DD4FF" />
              <polygon points="450,225 463,235 450,242" fill="#38BDF8" />
              <polygon points="610,338 625,345 610,352" fill="#22C55E" />

              {/* 4 CAMERA NODES ON MAP (C-17, C-21, C-08, C-03) */}
              {MAP_POINTS.map((pt, idx) => {
                const isSelected = selectedPoint.id === pt.id;

                return (
                  <g
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    {/* Pulsing halo */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? '24' : '18'}
                      fill={isSelected ? '#2DD4FF' : '#22C55E'}
                      opacity="0.2"
                      className="animate-ping"
                    />

                    {/* Outer border circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="14"
                      fill="#0B0F14"
                      stroke={isSelected ? '#2DD4FF' : '#22C55E'}
                      strokeWidth="2.5"
                      filter="drop-shadow(0 0 8px rgba(45,212,255,0.6))"
                    />

                    {/* Center Core dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="6"
                      fill={isSelected ? '#2DD4FF' : '#22C55E'}
                    />

                    {/* Camera Node Label Badge */}
                    <g transform={`translate(${pt.x - 26}, ${pt.y - 42})`}>
                      <rect
                        width="52"
                        height="20"
                        rx="4"
                        fill="#0F151C"
                        stroke={isSelected ? '#2DD4FF' : '#26313D'}
                        strokeWidth="1.2"
                      />
                      <text
                        x="26"
                        y="14"
                        fill="#F8FAFC"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {pt.name}
                      </text>
                    </g>

                    {/* Timestamp Label Badge Below */}
                    <g transform={`translate(${pt.x - 24}, ${pt.y + 20})`}>
                      <rect
                        width="48"
                        height="18"
                        rx="3"
                        fill="#151D26"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <text
                        x="24"
                        y="13"
                        fill="#2DD4FF"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {pt.time}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Moving Vehicle Marker Ping at C-03 (Last Seen) */}
              <g transform="translate(710, 380)">
                <circle r="32" fill="#EF4444" opacity="0.2" className="animate-ping" />
              </g>
            </svg>

            {/* Map Controls (Zoom / Center) */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 bg-[#0B0F14] border border-[#26313D] p-1.5 rounded-[6px]">
              <button
                className="p-1.5 rounded hover:bg-[#151D26] text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
                title="Center Target"
              >
                <LocateFixed className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded hover:bg-[#151D26] text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded hover:bg-[#151D26] text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-20 bg-[#0B0F14]/80 backdrop-blur p-2.5 rounded-[6px] border border-[#26313D] text-[11px] font-mono space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-[#2DD4FF] rounded-full inline-block" />
                <span className="text-[#F8FAFC]">Reconstructed Route (6.8 km)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] border border-white inline-block" />
                <span className="text-[#94A3B8]">Confirmed Optical Interception</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: SIDE PANEL: VEHICLE MOVEMENT (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-[10px] bg-[#111820] border border-[#26313D] p-5 space-y-5">
            {/* Side Panel Title */}
            <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#2DD4FF]" />
                <h3 className="text-[16px] font-bold text-[#F8FAFC] uppercase tracking-wider">
                  Vehicle Movement
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#2DD4FF]/15 text-[#2DD4FF] border border-[#2DD4FF]/30 text-[10px] font-mono font-bold">
                TELEMETRY
              </span>
            </div>

            {/* Movement Stats Stack (Exact requirements) */}
            <div className="space-y-3 font-mono">
              {/* First Seen */}
              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#1E293B] space-y-0.5">
                <span className="text-[10px] text-[#64748B] uppercase block">
                  First Seen
                </span>
                <span className="text-[14px] font-bold text-[#F8FAFC] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#2DD4FF]" />
                  20:43 — Sector 12
                </span>
              </div>

              {/* Last Seen */}
              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#EF4444]/40 space-y-0.5 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                <span className="text-[10px] text-[#EF4444] uppercase block font-bold">
                  Last Seen
                </span>
                <span className="text-[14px] font-bold text-[#F8FAFC] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#EF4444]" />
                  21:03 — Railway Road
                </span>
              </div>

              {/* Cameras */}
              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Cameras:</span>
                <span className="text-[16px] font-bold text-[#2DD4FF]">
                  4
                </span>
              </div>

              {/* Distance */}
              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Distance:</span>
                <span className="text-[16px] font-bold text-[#22C55E]">
                  6.8 km
                </span>
              </div>

              {/* Confidence */}
              <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#1E293B] flex items-center justify-between">
                <span className="text-[12px] text-[#94A3B8]">Confidence:</span>
                <span className="text-[16px] font-bold text-[#22C55E]">
                  91%
                </span>
              </div>
            </div>

            {/* Target Vehicle Tag */}
            <div className="p-3 rounded-[6px] bg-[#151D26] border border-[#26313D] text-[11px] font-mono space-y-1">
              <span className="text-[#64748B] block uppercase">TARGET SPECIFICATION</span>
              <div className="flex justify-between text-[#F8FAFC]">
                <span>White SUV</span>
                <span className="text-[#2DD4FF] font-bold">CG 10 AB 1234</span>
              </div>
            </div>

            {/* Selected Camera Inspector */}
            <div className="p-3.5 rounded-[8px] bg-[#0F151C] border border-[#2DD4FF]/40 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#2DD4FF] font-bold">
                  SELECTED: CAMERA {selectedPoint.name}
                </span>
                <span className="text-[#22C55E]">{selectedPoint.confidence}% Match</span>
              </div>
              <p className="text-[#94A3B8]">
                {selectedPoint.location} • Timestamp: {selectedPoint.time} • Velocity: {selectedPoint.speed}
              </p>
            </div>

            {/* Primary Button to proceed to timeline */}
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-[0_0_20px_rgba(45,212,255,0.3)]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={onViewTimeline}
            >
              View Evidence Timeline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
