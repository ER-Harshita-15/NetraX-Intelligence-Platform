import React from 'react';
import { TimelineEvent } from '../../types';
import { StatusBadge } from './StatusBadge';
import { Cctv, Video, FileText, Crosshair, MapPin, Eye } from 'lucide-react';

export interface TimelineItemProps {
  event: TimelineEvent;
  isLast?: boolean;
  onInspect?: (event: TimelineEvent) => void;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  isLast = false,
  onInspect,
}) => {
  const getConfidenceVariant = (conf: number) => {
    if (conf >= 90) return 'high_confidence';
    if (conf >= 70) return 'medium_confidence';
    return 'low_confidence';
  };

  return (
    <div className="relative flex items-start gap-4 group">
      {/* Vertical Connecting Guide Line */}
      {!isLast && (
        <div className="absolute left-[17px] top-9 bottom-0 w-[1px] bg-[#26313D] group-hover:bg-[#2DD4FF]/30 transition-colors" />
      )}

      {/* Event Node Dot / Icon */}
      <div className="w-9 h-9 rounded-[6px] bg-[#151D26] border border-[#26313D] group-hover:border-[#2DD4FF]/50 flex items-center justify-center shrink-0 z-10 transition-colors">
        {event.type === 'detection' ? (
          <Crosshair className="w-4 h-4 text-[#2DD4FF]" />
        ) : event.type === 'alert' ? (
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse" />
        ) : (
          <Cctv className="w-4 h-4 text-[#94A3B8]" />
        )}
      </div>

      {/* Main Content Card */}
      <div className="flex-1 min-w-0 rounded-[8px] bg-[#111820] border border-[#26313D] p-3.5 mb-3 group-hover:border-[#2DD4FF]/40 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#2DD4FF] font-semibold">
              {event.timeFormatted}
            </span>
            <span className="text-[11px] text-[#64748B] font-mono">• {event.timestamp}</span>
          </div>

          <StatusBadge
            variant={getConfidenceVariant(event.confidence)}
            label={`${event.confidence}% CONF`}
            size="sm"
          />
        </div>

        <h5 className="text-[14px] font-semibold text-[#F8FAFC] mt-1.5 leading-snug">
          {event.event}
        </h5>

        <div className="flex items-center gap-2 text-[12px] text-[#94A3B8] mt-1">
          <MapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
          <span className="truncate">{event.location}</span>
          <span className="text-[#64748B] font-mono">({event.source})</span>
        </div>

        {/* Optional Thumbnail & Notes Bar */}
        <div className="mt-3 pt-2.5 border-t border-[#26313D]/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Visual thumbnail chip */}
            <div className="w-12 h-8 rounded-[4px] bg-[#0B0F14] border border-[#26313D] flex items-center justify-center text-[9px] font-mono text-[#64748B] shrink-0 overflow-hidden relative group/thumb">
              <div className="absolute inset-0 bg-[#2DD4FF]/5" />
              <Video className="w-3.5 h-3.5 text-[#2DD4FF]/70" />
            </div>
            <span className="text-[11px] text-[#94A3B8] font-mono truncate max-w-xs">
              {event.thumbnailText || 'Frame extraction snippet #NX-FRM'}
            </span>
          </div>

          <button
            onClick={() => onInspect?.(event)}
            className="text-[11px] font-mono text-[#2DD4FF] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Eye className="w-3 h-3" />
            INSPECT FRAME
          </button>
        </div>
      </div>
    </div>
  );
};
