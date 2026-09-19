import React from 'react';
import { Check, Loader2, Circle, AlertCircle, Sparkles } from 'lucide-react';

export type StepStatus = 'completed' | 'in_progress' | 'pending' | 'error';

export interface ProcessingStep {
  id: string;
  label: string;
  detail?: string;
  status: StepStatus;
  elapsedTime?: string;
}

export interface AiProcessingIndicatorProps {
  steps?: ProcessingStep[];
  title?: string;
  subtitle?: string;
  overallProgress?: number;
  className?: string;
}

export const DEFAULT_AI_STEPS: ProcessingStep[] = [
  {
    id: 's1',
    label: 'Video uploaded',
    detail: '48.2 MB ingested • SHA-256 verified',
    status: 'completed',
    elapsedTime: '0.4s',
  },
  {
    id: 's2',
    label: 'Frames extracted',
    detail: '1,840 keyframes generated at 30 FPS',
    status: 'completed',
    elapsedTime: '1.2s',
  },
  {
    id: 's3',
    label: 'Objects detected',
    detail: '3 vehicles, 2 pedestrians identified (YOLO-v11)',
    status: 'completed',
    elapsedTime: '2.8s',
  },
  {
    id: 's4',
    label: 'Cross-camera matching',
    detail: 'Correlating silver sedan across Cameras C-17, C-18, C-29',
    status: 'in_progress',
    elapsedTime: '3.4s',
  },
  {
    id: 's5',
    label: 'Movement reconstruction',
    detail: 'Spatial trajectory generation & geospatial velocity mapping',
    status: 'pending',
  },
];

export const AiProcessingIndicator: React.FC<AiProcessingIndicatorProps> = ({
  steps = DEFAULT_AI_STEPS,
  title = 'AI SURVEILLANCE PIPELINE',
  subtitle = 'Neural Cross-Camera Correlation Analysis',
  overallProgress = 68,
  className = '',
}) => {
  return (
    <div
      className={`rounded-[8px] bg-[#111820] border border-[#26313D] p-5 space-y-4 select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[6px] bg-[#151D26] border border-[#2DD4FF]/30 flex items-center justify-center text-[#2DD4FF]">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#F8FAFC]">
                {title}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-[#2DD4FF] bg-[#2DD4FF]/10 border border-[#2DD4FF]/20">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#64748B] mt-0.5">{subtitle}</p>
          </div>
        </div>

        <span className="text-[13px] font-mono font-bold text-[#2DD4FF]">
          {overallProgress}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#151D26] rounded-full overflow-hidden border border-[#26313D]">
        <div
          className="h-full bg-[#2DD4FF] transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(45,212,255,0.4)]"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      {/* Step Sequence Checklist */}
      <div className="space-y-3 pt-1">
        {steps.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in_progress';
          const isError = step.status === 'error';
          const isPending = step.status === 'pending';

          return (
            <div key={step.id} className="flex items-start gap-3 group">
              {/* Step Status Icon */}
              <div className="mt-0.5 shrink-0">
                {isCompleted && (
                  <div className="w-5 h-5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                {isInProgress && (
                  <div className="w-5 h-5 rounded-full bg-[#2DD4FF]/15 border border-[#2DD4FF]/40 flex items-center justify-center text-[#2DD4FF]">
                    <Loader2 className="w-3 h-3 animate-spin" />
                  </div>
                )}
                {isPending && (
                  <div className="w-5 h-5 rounded-full bg-[#151D26] border border-[#26313D] flex items-center justify-center text-[#64748B]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#64748B]" />
                  </div>
                )}
                {isError && (
                  <div className="w-5 h-5 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444]">
                    <AlertCircle className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Label & Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[13px] font-medium leading-tight ${
                      isCompleted
                        ? 'text-[#F8FAFC]'
                        : isInProgress
                        ? 'text-[#2DD4FF] font-semibold'
                        : 'text-[#64748B]'
                    }`}
                  >
                    {step.label}
                  </span>
                  {step.elapsedTime && (
                    <span className="text-[11px] font-mono text-[#64748B]">
                      {step.elapsedTime}
                    </span>
                  )}
                </div>

                {step.detail && (
                  <p
                    className={`text-[11px] font-mono mt-0.5 truncate ${
                      isInProgress ? 'text-[#94A3B8]' : 'text-[#64748B]'
                    }`}
                  >
                    {step.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
