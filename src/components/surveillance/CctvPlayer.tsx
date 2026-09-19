import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Radio,
  Crosshair,
  Camera,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { AiDetectionOverlay, SAMPLE_DETECTIONS } from './AiDetectionOverlay';
import { DetectionBox } from '../../types';

export type CctvPlayerState = 'normal' | 'detection_active' | 'processing' | 'offline';

export interface CctvPlayerProps {
  cameraId?: string;
  location?: string;
  timestamp?: string;
  initialState?: CctvPlayerState;
  onSnapshot?: () => void;
  className?: string;
}

export const CctvPlayer: React.FC<CctvPlayerProps> = ({
  cameraId = 'CAMERA C-17',
  location = 'SECTOR 12 — NORTH AVE & 4TH ST',
  timestamp = '14 SEPT 2026 • 20:43:17',
  initialState = 'detection_active',
  onSnapshot,
  className = '',
}) => {
  const [playerState, setPlayerState] = useState<CctvPlayerState>(initialState);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(76);
  const [selectedDetection, setSelectedDetection] = useState<DetectionBox | null>(
    SAMPLE_DETECTIONS[0]
  );
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1x');
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState<string>('20:43:17');
  const containerRef = useRef<HTMLDivElement>(null);

  // Clock tick simulator
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setCurrentTimeDisplay(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      id="cctv-surveillance-player"
      className={`rounded-[8px] bg-[#0B0F14] border border-[#26313D] overflow-hidden flex flex-col select-none relative ${className}`}
    >
      {/* 1. Header Bar: Camera ID, Location & REC Indicator */}
      <div className="h-10 px-3.5 bg-[#0F151C] border-b border-[#26313D] flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#111820] border border-[#26313D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4FF]" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#F8FAFC]">
              {cameraId}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#64748B] hidden sm:inline truncate max-w-xs">
            {location}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Mode Badge */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            {playerState === 'offline' ? (
              <span className="px-2 py-0.5 rounded bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444]">
                FEED LOST
              </span>
            ) : isLive ? (
              <div className="flex items-center gap-1.5 text-[#22C55E]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span className="font-semibold">LIVE</span>
              </div>
            ) : (
              <span className="text-[#F59E0B]">ARCHIVE PLAYBACK</span>
            )}
          </div>

          {/* REC indicator */}
          {playerState !== 'offline' && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-[10px] font-mono font-bold">
              <span>REC</span>
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
            </div>
          )}
        </div>
      </div>

      {/* 2. CCTV Video Display Area */}
      <div className="relative aspect-[16/9] w-full bg-[#05080C] overflow-hidden group/screen flex items-center justify-center">
        {/* Realistic Night Vision / Street Surveillance Mock Visual Canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d14] via-[#05090f] to-[#04060a]">
          {/* Simulated CCTV Camera Lens Perspective / Street Silhouette */}
          <svg
            className="w-full h-full opacity-35"
            viewBox="0 0 800 450"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Horizon and road perspective */}
            <path d="M 0 320 L 800 320" stroke="#26313D" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 120 450 L 360 320" stroke="#1E293B" strokeWidth="1.5" />
            <path d="M 680 450 L 440 320" stroke="#1E293B" strokeWidth="1.5" />
            <path d="M 400 320 L 400 450" stroke="#2DD4FF" strokeWidth="1" strokeDasharray="8 8" opacity="0.4" />
            
            {/* Buildings silhouettes */}
            <rect x="40" y="160" width="120" height="160" fill="#0D131A" stroke="#1E293B" strokeWidth="1" />
            <rect x="620" y="140" width="140" height="180" fill="#0D131A" stroke="#1E293B" strokeWidth="1" />
            <rect x="180" y="210" width="90" height="110" fill="#0A0E14" stroke="#1E293B" strokeWidth="1" />
            <rect x="520" y="190" width="80" height="130" fill="#0A0E14" stroke="#1E293B" strokeWidth="1" />
            
            {/* Street lamp light cone */}
            <polygon points="280,180 240,360 340,360" fill="url(#lampGlow)" opacity="0.08" />
            <polygon points="560,180 500,360 620,360" fill="url(#lampGlow)" opacity="0.08" />

            <defs>
              <linearGradient id="lampGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4FF" />
                <stop offset="100%" stopColor="#2DD4FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Grid overlay for tactical coordinates */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#26313D08_1px,transparent_1px),linear-gradient(to_bottom,#26313D08_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Subtle surveillance scanlines */}
          <div className="absolute inset-0 cctv-scanlines opacity-75" />
        </div>

        {/* State 1: Offline Overlay */}
        {playerState === 'offline' && (
          <div className="absolute inset-0 bg-[#0B0F14]/90 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-12 h-12 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444] mb-3 animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-[16px] font-semibold text-[#F8FAFC]">SURVEILLANCE FEED DISCONNECTED</h4>
            <p className="text-[12px] text-[#94A3B8] max-w-sm mt-1 font-mono">
              Signal loss detected on RTSP stream port 554. Attempting automatic telemetry handshake.
            </p>
            <button
              onClick={() => setPlayerState('normal')}
              className="mt-4 px-3 py-1.5 rounded-[6px] bg-[#151D26] border border-[#26313D] text-[12px] font-mono text-[#2DD4FF] hover:bg-[#1E293B]"
            >
              RE-ESTABLISH STREAM
            </button>
          </div>
        )}

        {/* State 2: Processing AI Scanner Overlay */}
        {playerState === 'processing' && (
          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0B0F14]/80 border border-[#2DD4FF]/40 text-[#2DD4FF] text-[11px] font-mono w-max backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>AI FRAME VECTOR EXTRACTION IN PROGRESS • 60 FPS</span>
            </div>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#2DD4FF] to-transparent animate-pulse" />
          </div>
        )}

        {/* State 3: Detection Active (Bounding Boxes Overlay) */}
        {playerState === 'detection_active' && (
          <AiDetectionOverlay
            detections={SAMPLE_DETECTIONS}
            selectedId={selectedDetection?.id}
            onSelectDetection={(d) => setSelectedDetection(d)}
          />
        )}

        {/* Tactical On-Screen Display (OSD) Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 text-[11px] font-mono text-[#F8FAFC] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none z-10">
          <span className="text-[#2DD4FF] font-semibold">{cameraId}</span>
          <span className="text-[10px] text-[#94A3B8]">{location}</span>
          <span className="text-[#22C55E]">FPS: 30.0 • BITRATE: 4096 kbps</span>
        </div>

        <div className="absolute top-3 right-3 text-right font-mono text-[11px] text-[#F8FAFC] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none z-10">
          <div className="text-[12px] font-bold text-[#F8FAFC] tracking-wider">
            {currentTimeDisplay} UTC
          </div>
          <div className="text-[10px] text-[#94A3B8]">{timestamp.split('•')[0]}</div>
          <div className="text-[10px] text-[#2DD4FF]">FOV: 84° • LENS: 4.2mm</div>
        </div>

        {/* Center Target HUD Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-16 h-16 border border-[#2DD4FF] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-[#2DD4FF] rounded-full" />
          </div>
        </div>
      </div>

      {/* 3. Scrubber Timeline Bar */}
      <div className="px-3.5 pt-2 pb-1 bg-[#0F151C] border-t border-[#26313D] flex items-center gap-3">
        <span className="text-[11px] font-mono text-[#64748B] w-12">
          {Math.floor((progress * 36) / 60)}:
          {String((progress * 36) % 60).padStart(2, '0')}
        </span>

        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
            setProgress(pct);
            setIsLive(pct > 95);
          }}
          className="flex-1 h-2 bg-[#151D26] rounded-full relative cursor-pointer group"
        >
          {/* Motion detection highlight zones */}
          <span className="absolute left-[20%] w-[15%] h-full bg-[#F59E0B]/40 rounded-sm" title="Motion Event" />
          <span className="absolute left-[65%] w-[25%] h-full bg-[#2DD4FF]/40 rounded-sm" title="Vehicle Detected" />

          {/* Active progress fill */}
          <div
            className="h-full bg-[#2DD4FF] rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="w-3 h-3 rounded-full bg-[#F8FAFC] border-2 border-[#2DD4FF] absolute right-0 top-1/2 -translate-y-1/2 shadow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <span className="text-[11px] font-mono text-[#94A3B8] w-12 text-right">
          {currentTimeDisplay}
        </span>
      </div>

      {/* 4. Controls Toolbar */}
      <div className="h-12 px-3.5 bg-[#0F151C] flex items-center justify-between gap-3">
        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-[6px] bg-[#151D26] hover:bg-[#1E293B] border border-[#26313D] text-[#F8FAFC] hover:text-[#2DD4FF] flex items-center justify-center transition-colors cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={() => setProgress((p) => Math.max(0, p - 5))}
            className="w-8 h-8 rounded-[6px] hover:bg-[#151D26] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center transition-colors cursor-pointer"
            title="Step Backward (5s)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setProgress((p) => Math.min(100, p + 5))}
            className="w-8 h-8 rounded-[6px] hover:bg-[#151D26] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center transition-colors cursor-pointer"
            title="Step Forward (5s)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setProgress(100);
              setIsLive(true);
            }}
            className={`px-2 py-1 rounded-[4px] text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ml-1 ${
              isLive
                ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 font-bold'
                : 'text-[#64748B] hover:text-[#F8FAFC]'
            }`}
          >
            LIVE
          </button>

          {/* Speed selector */}
          <div className="flex items-center rounded-[4px] bg-[#111820] border border-[#26313D] p-0.5 ml-2">
            {['1x', '2x', '4x'].map((s) => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                className={`px-1.5 py-0.5 text-[10px] font-mono rounded-[2px] transition-colors ${
                  playbackSpeed === s
                    ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold'
                    : 'text-[#64748B] hover:text-[#94A3B8]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* State Switcher & Tools */}
        <div className="flex items-center gap-1.5">
          {/* Mode Switcher Buttons */}
          <div className="hidden sm:flex items-center rounded-[6px] bg-[#111820] border border-[#26313D] p-0.5">
            <button
              onClick={() => setPlayerState('normal')}
              className={`px-2 py-1 rounded-[4px] text-[11px] font-mono transition-colors ${
                playerState === 'normal'
                  ? 'bg-[#151D26] text-[#F8FAFC] font-medium'
                  : 'text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setPlayerState('detection_active')}
              className={`px-2 py-1 rounded-[4px] text-[11px] font-mono transition-colors flex items-center gap-1 ${
                playerState === 'detection_active'
                  ? 'bg-[#2DD4FF]/20 text-[#2DD4FF] font-semibold'
                  : 'text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              <Crosshair className="w-3 h-3" />
              AI Detections
            </button>
            <button
              onClick={() => setPlayerState('processing')}
              className={`px-2 py-1 rounded-[4px] text-[11px] font-mono transition-colors ${
                playerState === 'processing'
                  ? 'bg-[#2DD4FF]/20 text-[#2DD4FF] font-semibold'
                  : 'text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              Scanning
            </button>
            <button
              onClick={() => setPlayerState('offline')}
              className={`px-2 py-1 rounded-[4px] text-[11px] font-mono transition-colors ${
                playerState === 'offline'
                  ? 'bg-[#EF4444]/20 text-[#EF4444] font-semibold'
                  : 'text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              Offline
            </button>
          </div>

          <button
            onClick={() => onSnapshot?.()}
            className="w-8 h-8 rounded-[6px] hover:bg-[#151D26] text-[#94A3B8] hover:text-[#2DD4FF] flex items-center justify-center transition-colors cursor-pointer"
            title="Extract Keyframe Snapshot"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-8 h-8 rounded-[6px] hover:bg-[#151D26] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-[6px] hover:bg-[#151D26] text-[#94A3B8] hover:text-[#F8FAFC] flex items-center justify-center transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
