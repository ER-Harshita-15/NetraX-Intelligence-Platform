import React from 'react';
import { AiInsight, InsightType } from '../../types';
import { StatusBadge } from '../data/StatusBadge';
import { Button } from '../buttons/Button';
import {
  Sparkles,
  AlertTriangle,
  Lightbulb,
  GitMerge,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export interface AiInsightCardProps {
  insight: AiInsight;
  onAction?: (insight: AiInsight) => void;
  className?: string;
}

export const SAMPLE_INSIGHTS: AiInsight[] = [
  {
    id: 'ins-01',
    type: 'correlation',
    title: 'EVIDENCE CORRELATION DETECTED',
    message: 'Vehicle detected across 4 connected surveillance cameras along North Ave corridor.',
    confidence: 91,
    source: 'Cross-Camera Spatial Graph Reconstructor',
    timestamp: '2 mins ago',
    affectedCameras: ['C-17', 'C-18', 'C-22', 'C-29'],
    actionLabel: 'View Reconstructed Trajectory',
  },
  {
    id: 'ins-02',
    type: 'insight',
    title: 'AI PATTERN INSIGHT',
    message: 'Suspect vehicle license plate matches active BOLO reported in Sector 09 3 hours prior.',
    confidence: 94,
    source: 'National Plate Registry Correlator',
    timestamp: '5 mins ago',
    actionLabel: 'Link to Case #NX-1022',
  },
  {
    id: 'ins-03',
    type: 'warning',
    title: 'SURVEILLANCE GAP WARNING',
    message: 'Target vehicle entered unmonitored blind zone between 4th Ave and Industrial Bypass.',
    confidence: 88,
    source: 'Blindspot Prediction Vector Engine',
    timestamp: '8 mins ago',
    actionLabel: 'Dispatch Patrol Ping',
  },
  {
    id: 'ins-04',
    type: 'recommendation',
    title: 'TACTICAL RECOMMENDATION',
    message: 'Prioritize checkpoint surveillance at Highway 101 On-Ramp. Predicted arrival in 3.4 mins.',
    confidence: 86,
    source: 'Predictive Routing Network',
    timestamp: '11 mins ago',
    actionLabel: 'Notify Highway Intercept Unit',
  },
];

export const AiInsightCard: React.FC<AiInsightCardProps> = ({
  insight,
  onAction,
  className = '',
}) => {
  const getStyleConfig = (type: InsightType) => {
    switch (type) {
      case 'correlation':
        return {
          icon: <GitMerge className="w-4 h-4 text-[#2DD4FF]" />,
          border: 'border-[#2DD4FF]/40',
          bg: 'bg-[#111820]',
          indicator: 'bg-[#2DD4FF]',
          badgeText: 'text-[#2DD4FF]',
          badgeBorder: 'border-[#2DD4FF]/30',
          badgeBg: 'bg-[#2DD4FF]/10',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />,
          border: 'border-[#F59E0B]/40',
          bg: 'bg-[#111820]',
          indicator: 'bg-[#F59E0B]',
          badgeText: 'text-[#F59E0B]',
          badgeBorder: 'border-[#F59E0B]/30',
          badgeBg: 'bg-[#F59E0B]/10',
        };
      case 'recommendation':
        return {
          icon: <Lightbulb className="w-4 h-4 text-[#22C55E]" />,
          border: 'border-[#22C55E]/40',
          bg: 'bg-[#111820]',
          indicator: 'bg-[#22C55E]',
          badgeText: 'text-[#22C55E]',
          badgeBorder: 'border-[#22C55E]/30',
          badgeBg: 'bg-[#22C55E]/10',
        };
      default:
        return {
          icon: <Sparkles className="w-4 h-4 text-[#2DD4FF]" />,
          border: 'border-[#2DD4FF]/30',
          bg: 'bg-[#111820]',
          indicator: 'bg-[#2DD4FF]',
          badgeText: 'text-[#2DD4FF]',
          badgeBorder: 'border-[#2DD4FF]/20',
          badgeBg: 'bg-[#2DD4FF]/10',
        };
    }
  };

  const style = getStyleConfig(insight.type);

  return (
    <div
      className={`rounded-[8px] ${style.bg} border ${style.border} p-4 relative overflow-hidden transition-all duration-150 hover:border-opacity-100 flex flex-col justify-between ${className}`}
    >
      {/* Subtle top indicator highlight */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${style.indicator}`} />

      <div>
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[6px] bg-[#151D26] border border-[#26313D] flex items-center justify-center shrink-0">
              {style.icon}
            </div>
            <div>
              <span className={`text-[11px] font-mono font-bold tracking-wider uppercase block ${style.badgeText}`}>
                {insight.title}
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{insight.source}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#151D26] border border-[#26313D]">
            <Cpu className="w-3 h-3 text-[#2DD4FF]" />
            <span className="text-[11px] font-mono font-semibold text-[#F8FAFC]">
              {insight.confidence}%
            </span>
          </div>
        </div>

        {/* Insight Message */}
        <p className="mt-3 text-[13px] leading-[20px] font-medium text-[#F8FAFC]">
          “{insight.message}”
        </p>

        {/* Affected Cameras Tags */}
        {insight.affectedCameras && (
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-[#64748B]">CORRELATED NODES:</span>
            {insight.affectedCameras.map((cam) => (
              <span
                key={cam}
                className="px-1.5 py-0.5 rounded-[3px] bg-[#151D26] border border-[#26313D] text-[10px] font-mono text-[#2DD4FF]"
              >
                {cam}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-2.5 border-t border-[#26313D] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
        <span>{insight.timestamp}</span>

        {insight.actionLabel && (
          <button
            onClick={() => onAction?.(insight)}
            className="text-[11px] font-mono text-[#2DD4FF] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
          >
            <span>{insight.actionLabel}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
