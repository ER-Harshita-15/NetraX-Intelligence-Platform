import React, { useState } from 'react';
import { DarkModal } from './DarkModal';
import { AiProcessingIndicator, DEFAULT_AI_STEPS, ProcessingStep } from './AiProcessingIndicator';
import { Button } from '../buttons/Button';
import {
  ShieldAlert,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const FeedbackSpecimen: React.FC = () => {
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [steps, setSteps] = useState<ProcessingStep[]>(DEFAULT_AI_STEPS);
  const [currentStepIdx, setCurrentStepIdx] = useState(3); // matching step 4 in progress

  const advanceStep = () => {
    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setSteps((prev) =>
        prev.map((s, i) => {
          if (i < nextIdx) return { ...s, status: 'completed' };
          if (i === nextIdx) return { ...s, status: 'in_progress' };
          return { ...s, status: 'pending' };
        })
      );
      setCurrentStepIdx(nextIdx);
    }
  };

  const resetSteps = () => {
    setSteps(DEFAULT_AI_STEPS);
    setCurrentStepIdx(3);
  };

  return (
    <div id="feedback-specimen" className="space-y-12">
      {/* 1. Modals Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              High-Tech Dark Modals
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Elevation layer 4 (#151D26) modals with backdrop blur, 12px radius, and standard action footers.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#2DD4FF]">MODAL DIALOGS</span>
        </div>

        <div className="p-6 rounded-[8px] bg-[#111820] border border-[#26313D] flex flex-wrap items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => setIsCaseModalOpen(true)}
          >
            Launch Case Dossier Modal
          </Button>

          <Button
            variant="danger"
            leftIcon={<AlertTriangle className="w-4 h-4" />}
            onClick={() => setIsAlertModalOpen(true)}
          >
            Launch Critical Alert Modal
          </Button>
        </div>
      </div>

      {/* 2. AI Processing Multi-Step Checklist Indicator */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              AI Pipeline Multi-Step Processing Indicator
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Structured forensic checklist tracking video extraction, computer vision detection, and spatial matching.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Play className="w-3.5 h-3.5" />}
              onClick={advanceStep}
              disabled={currentStepIdx >= steps.length - 1}
            >
              Advance Step
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={resetSteps}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="max-w-2xl">
          <AiProcessingIndicator
            steps={steps}
            overallProgress={Math.round(((currentStepIdx + 0.5) / steps.length) * 100)}
          />
        </div>
      </div>

      {/* Case Dossier Modal Instance */}
      <DarkModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        title="CASE #NX-1024 • VEHICLE THEFT DOSSIER"
        subtitle="SECTOR 12 • REGISTERED OFFICER: DET. MILLER (ID: 442)"
        primaryActionLabel="Export Court Dossier"
        onPrimaryAction={() => {
          alert('Exporting forensic case dossier');
          setIsCaseModalOpen(false);
        }}
        maxWidth="lg"
      >
        <div className="space-y-3">
          <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#94A3B8]">INCIDENT TIMESTAMP</span>
            <span className="text-[#F8FAFC]">14 SEPT 2026 • 19:40:12 UTC</span>
          </div>

          <p className="text-[13px] text-[#94A3B8] leading-relaxed">
            Victim reported a 2022 silver luxury sedan stolen from commercial plaza parking.
            Automated LPR and cross-camera matching identified matching vehicle egressing via North Ave at 20:43 UTC.
          </p>

          <div className="p-3 rounded-[6px] bg-[#2DD4FF]/10 border border-[#2DD4FF]/30 text-[#2DD4FF] text-[12px] font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>AI CONFIDENCE 94% • 4 CORRELATED CAMERAS IDENTIFIED</span>
          </div>
        </div>
      </DarkModal>

      {/* Critical Alert Modal Instance */}
      <DarkModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        title="CRITICAL PERIMETER BREACH"
        subtitle="SECTOR 09 • EXPRESSWAY GATE 2 OVERPASS"
        primaryActionLabel="Broadcast Emergency Intercept"
        onPrimaryAction={() => {
          alert('Emergency intercept dispatched to Highway Patrol Units');
          setIsAlertModalOpen(false);
        }}
        secondaryActionLabel="Dismiss Alert"
        maxWidth="md"
      >
        <div className="space-y-3">
          <div className="p-3 rounded-[6px] bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-[12px] font-mono flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Target vehicle velocity registered at 142 km/h heading toward inter-state tollway. Blindspot correlation active.
            </span>
          </div>
          <p className="text-[13px] text-[#94A3B8]">
            Authorizing this command will dispatch automated notifications to all Sector 09 highway units and activate tollway LPR barriers.
          </p>
        </div>
      </DarkModal>
    </div>
  );
};
