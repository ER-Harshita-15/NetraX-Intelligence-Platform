import React from 'react';
import { MapMarkerData, MapMarkerType } from '../../types';
import {
  Cctv,
  Car,
  User,
  AlertTriangle,
  MapPin,
  Crosshair,
  Radio
} from 'lucide-react';

export interface MapMarkerProps {
  marker: MapMarkerData;
  isSelected?: boolean;
  onClick?: (marker: MapMarkerData) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const SAMPLE_MAP_MARKERS: MapMarkerData[] = [
  {
    id: 'marker-cam-1',
    type: 'camera',
    label: 'CAM C-17',
    sublabel: 'Sector 12 • Active REC',
    coordinates: { x: 32, y: 38 },
    status: 'Online',
    confidence: 99,
  },
  {
    id: 'marker-veh-1',
    type: 'vehicle',
    label: 'TARGET V-023',
    sublabel: 'Silver Sedan • 48 km/h',
    coordinates: { x: 45, y: 46 },
    status: 'Moving East',
    confidence: 94,
    active: true,
  },
  {
    id: 'marker-pers-1',
    type: 'person',
    label: 'PERSON P-108',
    sublabel: 'Suspect Foot Contact',
    coordinates: { x: 62, y: 32 },
    status: 'Stationary',
    confidence: 88,
  },
  {
    id: 'marker-inc-1',
    type: 'incident',
    label: 'CRIME SCENE #1024',
    sublabel: 'Vehicle Theft Point of Origin',
    coordinates: { x: 22, y: 64 },
    status: '19:40 UTC',
  },
  {
    id: 'marker-lkl-1',
    type: 'last_known',
    label: 'LAST KNOWN FIX',
    sublabel: 'Highway 101 Junction 4B',
    coordinates: { x: 78, y: 58 },
    status: '20:46:11 UTC',
    confidence: 91,
    active: true,
  },
];

export const MapMarker: React.FC<MapMarkerProps> = ({
  marker,
  isSelected = false,
  onClick,
  size = 'md',
}) => {
  const getMarkerConfig = (type: MapMarkerType) => {
    switch (type) {
      case 'camera':
        return {
          icon: <Cctv className="w-3.5 h-3.5" />,
          color: 'bg-[#2DD4FF] text-[#0B0F14]',
          ringColor: 'border-[#2DD4FF]/40',
          pulseColor: 'bg-[#2DD4FF]',
          tag: 'CCTV NODE',
        };
      case 'vehicle':
        return {
          icon: <Car className="w-3.5 h-3.5" />,
          color: 'bg-[#2DD4FF] text-[#0B0F14]',
          ringColor: 'border-[#2DD4FF]/60',
          pulseColor: 'bg-[#2DD4FF]',
          tag: 'VEHICLE',
        };
      case 'person':
        return {
          icon: <User className="w-3.5 h-3.5" />,
          color: 'bg-[#22C55E] text-[#0B0F14]',
          ringColor: 'border-[#22C55E]/60',
          pulseColor: 'bg-[#22C55E]',
          tag: 'PERSON',
        };
      case 'incident':
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          color: 'bg-[#EF4444] text-white',
          ringColor: 'border-[#EF4444]/60',
          pulseColor: 'bg-[#EF4444]',
          tag: 'INCIDENT',
        };
      case 'last_known':
        return {
          icon: <Crosshair className="w-3.5 h-3.5" />,
          color: 'bg-[#F59E0B] text-[#0B0F14]',
          ringColor: 'border-[#F59E0B]/60',
          pulseColor: 'bg-[#F59E0B]',
          tag: 'LAST KNOWN',
        };
    }
  };

  const config = getMarkerConfig(marker.type);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(marker);
      }}
      className="group relative cursor-pointer flex flex-col items-center select-none"
    >
      {/* Outer Pulse Ping for Active Targets */}
      {marker.active && (
        <span
          className={`absolute -inset-1.5 rounded-full ${config.pulseColor} opacity-30 animate-ping pointer-events-none`}
        />
      )}

      {/* Center Tactical Badge Marker */}
      <div
        className={`w-7 h-7 rounded-[6px] ${config.color} border border-[#0B0F14] shadow-[0_2px_8px_rgba(0,0,0,0.6)] flex items-center justify-center transition-transform duration-150 group-hover:scale-110 z-10 ${
          isSelected ? 'ring-2 ring-white scale-110' : ''
        }`}
      >
        {config.icon}
      </div>

      {/* Target Pin Stem Arrow */}
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#0B0F14] -mt-0.5" />

      {/* Hover / Selected Info Card Tooltip */}
      <div
        className={`absolute bottom-9 left-1/2 -translate-x-1/2 min-w-max px-2.5 py-1.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] shadow-xl z-30 transition-all ${
          isSelected
            ? 'opacity-100 scale-100 pointer-events-auto border-[#2DD4FF]/60'
            : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-bold text-[#F8FAFC]">
            {marker.label}
          </span>
          <span className="text-[9px] font-mono text-[#2DD4FF] px-1 rounded bg-[#2DD4FF]/10">
            {config.tag}
          </span>
        </div>
        <div className="text-[10px] text-[#94A3B8] font-mono mt-0.5">
          {marker.sublabel}
        </div>
        {marker.confidence && (
          <div className="text-[9px] text-[#22C55E] font-mono mt-0.5">
            MATCH {marker.confidence}% CONFIDENCE
          </div>
        )}
      </div>
    </div>
  );
};

export const TacticalMapCanvas: React.FC<{
  markers?: MapMarkerData[];
  selectedId?: string | null;
  onSelectMarker?: (marker: MapMarkerData) => void;
}> = ({
  markers = SAMPLE_MAP_MARKERS,
  selectedId,
  onSelectMarker,
}) => {
  return (
    <div className="rounded-[8px] bg-[#0A0E13] border border-[#26313D] relative aspect-[21/9] overflow-hidden">
      {/* Tactical Map Vector Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#26313D15_1px,transparent_1px),linear-gradient(to_bottom,#26313D15_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Map road vector silhouettes */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1000 500"
      >
        <path d="M 50 250 Q 300 200 500 250 T 950 250" stroke="#94A3B8" strokeWidth="6" fill="none" />
        <path d="M 450 50 L 500 450" stroke="#94A3B8" strokeWidth="5" fill="none" />
        <path d="M 200 80 L 800 400" stroke="#2DD4FF" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <circle cx="500" cy="250" r="40" stroke="#26313D" strokeWidth="2" fill="none" />
      </svg>

      {/* Correlated Movement Trajectory Vector */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M 22 64 L 32 38 L 45 46 L 78 58"
          stroke="#2DD4FF"
          strokeWidth="0.6"
          strokeDasharray="1.5 1.5"
          fill="none"
          opacity="0.8"
        />
      </svg>

      {/* Map Markers Overlay */}
      {markers.map((marker) => (
        <div
          key={marker.id}
          style={{
            position: 'absolute',
            left: `${marker.coordinates.x}%`,
            top: `${marker.coordinates.y}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <MapMarker
            marker={marker}
            isSelected={selectedId === marker.id}
            onClick={onSelectMarker}
          />
        </div>
      ))}

      {/* Radar telemetry badge */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[4px] bg-[#0F151C]/90 border border-[#26313D] flex items-center gap-2 text-[10px] font-mono text-[#94A3B8]">
        <Radio className="w-3 h-3 text-[#2DD4FF] animate-pulse" />
        <span>RADAR SECTOR 12 • GIS GPS GRID ACCURACY ± 1.2M</span>
      </div>

      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#64748B]">
        COORDINATES: 40.7128° N, 74.0060° W
      </div>
    </div>
  );
};
