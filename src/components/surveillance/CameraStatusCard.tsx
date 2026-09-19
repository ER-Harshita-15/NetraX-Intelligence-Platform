import React from 'react';
import { CameraData, CameraState } from '../../types';
import { StatusBadge } from '../data/StatusBadge';
import { Cctv, Signal, Activity, AlertTriangle, Eye, Video } from 'lucide-react';

export interface CameraStatusCardProps {
  camera: CameraData;
  isSelected?: boolean;
  onSelect?: (camera: CameraData) => void;
  onViewFeed?: (camera: CameraData) => void;
  className?: string;
}

export const SAMPLE_CAMERAS: CameraData[] = [
  {
    id: 'cam-c17',
    name: 'CAMERA C-17',
    sector: 'Sector 12',
    state: 'recording',
    location: 'North Ave & 4th Street Intersection',
    lastFrameTime: '2s ago • 20:43:17 UTC',
    fps: 30,
    resolution: '4K (3840×2160)',
    detectionsToday: 142,
  },
  {
    id: 'cam-c18',
    name: 'CAMERA C-18',
    sector: 'Sector 12',
    state: 'processing',
    location: 'Gas Station & Commercial Plaza East',
    lastFrameTime: '1s ago • 20:43:18 UTC',
    fps: 30,
    resolution: '1080p (1920×1080)',
    detectionsToday: 98,
  },
  {
    id: 'cam-c29',
    name: 'CAMERA C-29',
    sector: 'Sector 09',
    state: 'alert',
    location: 'Expressway Gate 2 Overpass',
    lastFrameTime: 'Live • 20:43:19 UTC',
    fps: 60,
    resolution: '4K (3840×2160)',
    detectionsToday: 312,
  },
  {
    id: 'cam-c04',
    name: 'CAMERA C-04',
    sector: 'Sector 03',
    state: 'offline',
    location: 'Underground Parking Level B2',
    lastFrameTime: 'Offline for 42m',
    fps: 0,
    resolution: '1080p',
    detectionsToday: 14,
  },
];

export const CameraStatusCard: React.FC<CameraStatusCardProps> = ({
  camera,
  isSelected = false,
  onSelect,
  onViewFeed,
  className = '',
}) => {
  const getBadgeVariant = (state: CameraState) => {
    switch (state) {
      case 'recording':
        return 'active';
      case 'processing':
        return 'processing';
      case 'alert':
        return 'alert';
      case 'offline':
        return 'offline';
      default:
        return 'completed';
    }
  };

  const getStateLabel = (state: CameraState) => {
    switch (state) {
      case 'recording':
        return 'RECORDING';
      case 'processing':
        return 'AI TRACKING';
      case 'alert':
        return 'ALERT ACTIVE';
      case 'offline':
        return 'OFFLINE';
      default:
        return 'ONLINE';
    }
  };

  return (
    <div
      onClick={() => onSelect?.(camera)}
      className={`rounded-[8px] bg-[#111820] border p-4 transition-all duration-150 group cursor-pointer relative overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-[#2DD4FF] bg-[#151D26] shadow-[0_0_15px_rgba(45,212,255,0.1)]'
          : 'border-[#26313D] hover:border-[#26313D]/90 hover:bg-[#151D26]/50'
      } ${className}`}
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[6px] bg-[#0F151C] border border-[#26313D] flex items-center justify-center text-[#2DD4FF] group-hover:scale-105 transition-transform">
              <Cctv className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-mono font-bold text-[#F8FAFC]">
                  {camera.name}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#64748B]">{camera.sector}</span>
            </div>
          </div>

          <StatusBadge
            variant={getBadgeVariant(camera.state)}
            label={getStateLabel(camera.state)}
            size="sm"
          />
        </div>

        {/* Location & Details */}
        <p className="mt-3 text-[12px] text-[#94A3B8] line-clamp-1">
          {camera.location}
        </p>

        {/* Camera Thumbnail / Signal Preview */}
        <div className="mt-3 aspect-[16/9] w-full rounded-[6px] bg-[#0B0F14] border border-[#26313D] relative overflow-hidden flex items-center justify-center">
          {camera.state === 'offline' ? (
            <div className="text-center p-2">
              <AlertTriangle className="w-5 h-5 text-[#EF4444] mx-auto opacity-70" />
              <span className="text-[10px] font-mono text-[#EF4444] block mt-1">NO SIGNAL</span>
            </div>
          ) : (
            <>
              {/* Surveillance scanline and grid */}
              <div className="absolute inset-0 cctv-scanlines opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              {/* Mini tactical indicators */}
              <div className="absolute top-1.5 left-2 text-[9px] font-mono text-[#2DD4FF]">
                {camera.resolution}
              </div>
              <div className="absolute top-1.5 right-2 text-[9px] font-mono text-[#22C55E]">
                {camera.fps} FPS
              </div>
              <div className="text-[10px] font-mono text-[#94A3B8] flex items-center gap-1 opacity-60">
                <Video className="w-3 h-3" />
                <span>RTSP STREAM</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-2.5 border-t border-[#26313D] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-[#2DD4FF]" />
          <span>{camera.detectionsToday} DETECTIONS</span>
        </div>
        <span className="truncate max-w-[120px] text-right">{camera.lastFrameTime}</span>
      </div>
    </div>
  );
};
