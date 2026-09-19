import React from 'react';
import { DetectionBox, DetectionType } from '../../types';

export interface AiDetectionOverlayProps {
  detections: DetectionBox[];
  activeFilter?: 'all' | DetectionType;
  showLabels?: boolean;
  interactive?: boolean;
  selectedId?: string | null;
  onSelectDetection?: (detection: DetectionBox) => void;
}

export const SAMPLE_DETECTIONS: DetectionBox[] = [
  {
    id: 'det-v-023',
    type: 'vehicle',
    trackingId: 'ID: V-023',
    label: 'VEHICLE',
    confidence: 94,
    x: 28,
    y: 35,
    width: 32,
    height: 38,
    metadata: 'Silver Sedan • Velocity 48 km/h',
  },
  {
    id: 'det-p-108',
    type: 'person',
    trackingId: 'ID: P-108',
    label: 'PERSON',
    confidence: 88,
    x: 68,
    y: 42,
    width: 14,
    height: 44,
    metadata: 'Pedestrian • Dark Jacket',
  },
  {
    id: 'det-lpr-7xyz89',
    type: 'license_plate',
    trackingId: '7XYZ89',
    label: 'LICENSE PLATE',
    confidence: 97,
    x: 44,
    y: 56,
    width: 12,
    height: 8,
    metadata: 'State: NY • Match Confidence 97%',
  },
];

export const AiDetectionOverlay: React.FC<AiDetectionOverlayProps> = ({
  detections = SAMPLE_DETECTIONS,
  activeFilter = 'all',
  showLabels = true,
  interactive = true,
  selectedId,
  onSelectDetection,
}) => {
  const filtered = detections.filter((d) => activeFilter === 'all' || d.type === activeFilter);

  const getTypeStyles = (type: DetectionType, isSelected: boolean) => {
    switch (type) {
      case 'vehicle':
        return {
          border: isSelected ? 'border-[#2DD4FF] ring-2 ring-[#2DD4FF]/40' : 'border-[#2DD4FF]',
          bg: 'bg-[#2DD4FF]/10',
          badgeBg: 'bg-[#2DD4FF] text-[#0B0F14]',
          accentText: 'text-[#2DD4FF]',
          glow: 'shadow-[0_0_12px_rgba(45,212,255,0.3)]',
        };
      case 'person':
        return {
          border: isSelected ? 'border-[#22C55E] ring-2 ring-[#22C55E]/40' : 'border-[#22C55E]',
          bg: 'bg-[#22C55E]/10',
          badgeBg: 'bg-[#22C55E] text-[#0B0F14]',
          accentText: 'text-[#22C55E]',
          glow: 'shadow-[0_0_12px_rgba(34,197,94,0.3)]',
        };
      case 'license_plate':
        return {
          border: isSelected ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/40' : 'border-[#F59E0B]',
          bg: 'bg-[#F59E0B]/15',
          badgeBg: 'bg-[#F59E0B] text-[#0B0F14]',
          accentText: 'text-[#F59E0B]',
          glow: 'shadow-[0_0_12px_rgba(245,158,11,0.3)]',
        };
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {filtered.map((det) => {
        const isSelected = selectedId === det.id;
        const styles = getTypeStyles(det.type, isSelected);

        return (
          <div
            key={det.id}
            onClick={(e) => {
              if (interactive) {
                e.stopPropagation();
                onSelectDetection?.(det);
              }
            }}
            style={{
              left: `${det.x}%`,
              top: `${det.y}%`,
              width: `${det.width}%`,
              height: `${det.height}%`,
            }}
            className={`absolute border transition-all duration-150 ${styles.border} ${
              interactive ? 'pointer-events-auto cursor-pointer hover:bg-white/5' : ''
            } ${isSelected ? styles.glow : ''}`}
          >
            {/* Tactical Corner Brackets */}
            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-inherit" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-inherit" />
            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-inherit" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-inherit" />

            {/* Tactical Target Center Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <span className="w-2 h-[1px] bg-white" />
              <span className="h-2 w-[1px] bg-white -ml-1" />
            </div>

            {/* Detection Header Pill */}
            {showLabels && (
              <div className="absolute -top-7 left-0 flex items-center gap-1.5 whitespace-nowrap z-20">
                <span
                  className={`px-1.5 py-0.5 rounded-[3px] text-[10px] font-mono font-bold uppercase tracking-wider ${styles.badgeBg}`}
                >
                  {det.label}
                </span>
                <span className="px-1.5 py-0.5 rounded-[3px] bg-[#0B0F14]/90 border border-[#26313D] text-[10px] font-mono text-[#F8FAFC]">
                  {det.trackingId}
                </span>
                <span className={`text-[10px] font-mono font-semibold ${styles.accentText}`}>
                  {det.confidence}%
                </span>
              </div>
            )}

            {/* Optional Metadata Footer */}
            {det.metadata && isSelected && (
              <div className="absolute -bottom-6 left-0 px-2 py-0.5 rounded-[3px] bg-[#0B0F14]/95 border border-[#26313D] text-[10px] font-mono text-[#94A3B8] whitespace-nowrap z-20">
                {det.metadata}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
