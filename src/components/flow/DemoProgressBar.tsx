import React from 'react';
import {
  Upload,
  Cpu,
  Cctv,
  GitMerge,
  MapPin,
  Clock,
  Bot,
  FileCheck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export type DemoStepId =
  | 'case-overview'
  | 'evidence-upload'
  | 'ai-processing'
  | 'cctv-analysis'
  | 'cross-camera-tracking'
  | 'investigation-map'
  | 'evidence-timeline'
  | 'ai-assistant'
  | 'final-report';

export type DemoFlowStep = DemoStepId;

export interface DemoProgressBarProps {
  currentStep: DemoStepId;
  onNavigateStep: (step: DemoStepId) => void;
}

interface StepMeta {
  id: DemoStepId;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEMO_STEPS: StepMeta[] = [
  { id: 'evidence-upload', label: '1. Evidence Upload', shortLabel: 'Upload', icon: Upload },
  { id: 'ai-processing', label: '2. AI Analysis', shortLabel: 'Analysis', icon: Cpu },
  { id: 'cctv-analysis', label: '3. CCTV Detection', shortLabel: 'CCTV', icon: Cctv },
  { id: 'cross-camera-tracking', label: '4. Cross-Camera', shortLabel: 'Tracking', icon: GitMerge },
  { id: 'investigation-map', label: '5. Movement Map', shortLabel: 'Map', icon: MapPin },
  { id: 'evidence-timeline', label: '6. Timeline', shortLabel: 'Timeline', icon: Clock },
  { id: 'ai-assistant', label: '7. AI Assistant', shortLabel: 'AI Chat', icon: Bot },
  { id: 'final-report', label: '8. Final Report', shortLabel: 'Report', icon: FileCheck },
];

export const DemoProgressBar: React.FC<DemoProgressBarProps> = ({
  currentStep,
  onNavigateStep,
}) => {
  const currentIndex = DEMO_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="bg-[#0F151C] border border-[#26313D] rounded-[8px] p-2.5 mb-6 select-none shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-2 mb-2 border-b border-[#1C2633] text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2DD4FF] animate-pulse" />
          <span className="text-[#2DD4FF] font-bold tracking-wider uppercase">
            END-TO-END DEMO JOURNEY
          </span>
          <span className="text-[#64748B]">•</span>
          <span className="text-[#F8FAFC] font-semibold">CASE #NX-1024</span>
          <span className="text-[#94A3B8]">(White SUV • CG 10 AB 1234)</span>
        </div>

        <div className="flex items-center gap-3 text-[#64748B]">
          <span className="text-[#22C55E] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            SIH Demo Mode Active
          </span>
          <span>Click any stage to quick-jump</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 overflow-x-auto">
        {DEMO_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentIndex > idx;

          return (
            <button
              key={step.id}
              onClick={() => onNavigateStep(step.id)}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-[5px] text-[11px] font-medium transition-all text-left cursor-pointer border ${
                isActive
                  ? 'bg-[#2DD4FF]/20 border-[#2DD4FF] text-[#2DD4FF] font-bold shadow-[0_0_12px_rgba(45,212,255,0.2)]'
                  : isCompleted
                  ? 'bg-[#151D26] border-[#22C55E]/40 text-[#22C55E] hover:border-[#22C55E]'
                  : 'bg-[#0B0F14] border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#334155]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate hidden xl:inline">{step.label}</span>
              <span className="truncate xl:hidden">{step.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
