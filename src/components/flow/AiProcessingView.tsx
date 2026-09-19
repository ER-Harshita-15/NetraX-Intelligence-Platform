import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  CircleDot,
  Circle,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Activity,
  Zap,
  Terminal,
  Clock,
  Car
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { DemoProgressBar } from './DemoProgressBar';

export interface AiProcessingViewProps {
  onViewAnalysis: () => void;
  onNavigateStep?: (step: any) => void;
}

interface PipelineStep {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending';
  detail: string;
  count?: string;
}

export const AiProcessingView: React.FC<AiProcessingViewProps> = ({
  onViewAnalysis,
  onNavigateStep,
}) => {
  const [progress, setProgress] = useState(78);
  const [framesCount, setFramesCount] = useState(14280);

  // Smoothly increment progress to ~88% to simulate real-time neural throughput
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) return 88;
        return prev + 1;
      });
      setFramesCount((prev) => prev + 140);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const pipelineSteps: PipelineStep[] = [
    {
      id: 'step-1',
      label: 'Evidence uploaded',
      status: 'completed',
      detail: '5 multi-modal assets decrypted and validated (SHA-256 ok)',
      count: '5 / 5 files',
    },
    {
      id: 'step-2',
      label: 'Video frames extracted',
      status: 'completed',
      detail: 'Temporal sampling at 30 FPS across 3 CCTV feeds',
      count: `${framesCount.toLocaleString()} frames`,
    },
    {
      id: 'step-3',
      label: 'Objects detected',
      status: 'completed',
      detail: 'Vehicles, pedestrians, and license plates segmented',
      count: '342 entities',
    },
    {
      id: 'step-4',
      label: 'Vehicle identified',
      status: 'completed',
      detail: 'Target match confirmed: White SUV • Plate CG 10 AB 1234',
      count: '94% match',
    },
    {
      id: 'step-5',
      label: 'Cross-camera matching',
      status: 'active',
      detail: 'Correlating feature embeddings across C-17, C-21, C-08, C-03',
      count: 'Processing...',
    },
    {
      id: 'step-6',
      label: 'Movement reconstruction',
      status: 'pending',
      detail: 'Interpolating velocity vectors and sector travel times',
      count: 'Queued',
    },
    {
      id: 'step-7',
      label: 'Evidence correlation',
      status: 'pending',
      detail: 'Synthesizing forensic timeline and confidence scores',
      count: 'Queued',
    },
  ];

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans select-none max-w-5xl mx-auto">
      {/* Step Navigation Bar */}
      {onNavigateStep && (
        <DemoProgressBar currentStep="ai-processing" onNavigateStep={onNavigateStep} />
      )}

      {/* Main Processing Header */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DD4FF]/15 border border-[#2DD4FF]/30 text-[#2DD4FF] text-[11px] font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>NEURAL FORENSIC ENGINE • HIGH-THROUGHPUT RUNTIME</span>
        </div>
        <h1 className="text-[32px] font-bold text-[#F8FAFC] tracking-tight">
          NetraX AI Analysis
        </h1>
        <p className="text-[14px] text-[#94A3B8] font-mono max-w-xl mx-auto">
          Correlating multi-stream surveillance evidence for Case #NX-1024 (White SUV • CG 10 AB 1234).
        </p>
      </div>

      {/* Primary Progress Card */}
      <div className="rounded-[10px] bg-[#111820] border border-[#26313D] p-6 space-y-6 shadow-xl relative overflow-hidden">
        {/* Subtle glowing ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2DD4FF]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Progress Bar & Telemetry */}
        <div className="space-y-2.5 relative">
          <div className="flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2DD4FF] animate-pulse" />
              <span className="text-[13px] font-bold text-[#F8FAFC]">
                ANALYSIS PIPELINE PROGRESS
              </span>
            </div>
            <span className="text-[20px] font-bold text-[#2DD4FF]">
              {progress}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#0B0F14] border border-[#26313D] overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-[#0284C7] via-[#2DD4FF] to-[#38BDF8] h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(45,212,255,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#64748B] pt-1">
            <span>EXTRACTING SURVEILLANCE OPTICS</span>
            <span>MODEL: NETRAX-VISION-V4 (RESNET + TRANSFORMER)</span>
            <span className="text-[#2DD4FF] font-semibold">STAGE 5 OF 7 IN PROGRESS</span>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3 rounded-[6px] bg-[#0B0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#64748B] uppercase block">PROCESSED FRAMES</span>
            <span className="text-[16px] font-bold text-[#F8FAFC]">
              {framesCount.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-[6px] bg-[#0B0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#64748B] uppercase block">TARGET MATCH</span>
            <span className="text-[16px] font-bold text-[#22C55E] flex items-center gap-1">
              <Car className="w-4 h-4" />
              CG 10 AB 1234
            </span>
          </div>

          <div className="p-3 rounded-[6px] bg-[#0B0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#64748B] uppercase block">CONFIDENCE</span>
            <span className="text-[16px] font-bold text-[#2DD4FF]">
              94.2% OPTICAL
            </span>
          </div>

          <div className="p-3 rounded-[6px] bg-[#0B0F14] border border-[#1E293B]">
            <span className="text-[10px] text-[#64748B] uppercase block">CAMERAS LINKED</span>
            <span className="text-[16px] font-bold text-[#F8FAFC]">
              4 NODES (SECTOR 12)
            </span>
          </div>
        </div>

        {/* The 7-Step Pipeline Display */}
        <div className="space-y-3 pt-2">
          <span className="text-[12px] font-mono uppercase tracking-wider text-[#94A3B8] block">
            DETECTION & CORRELATION PIPELINE
          </span>

          <div className="space-y-2.5">
            {pipelineSteps.map((step, idx) => {
              const isDone = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-[6px] border transition-all flex items-center justify-between gap-4 font-mono ${
                    isActive
                      ? 'bg-[#2DD4FF]/10 border-[#2DD4FF]/50 shadow-[0_0_15px_rgba(45,212,255,0.1)]'
                      : isDone
                      ? 'bg-[#0F151C] border-[#1E293B]'
                      : 'bg-[#0B0F14]/60 border-[#1A2330] opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Status Icon */}
                    {isDone ? (
                      <div className="w-6 h-6 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : isActive ? (
                      <div className="w-6 h-6 rounded-full bg-[#2DD4FF]/20 text-[#2DD4FF] border border-[#2DD4FF] flex items-center justify-center shrink-0 animate-pulse">
                        <CircleDot className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#151D26] text-[#64748B] border border-[#26313D] flex items-center justify-center shrink-0">
                        <Circle className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[13px] font-bold ${
                            isActive
                              ? 'text-[#2DD4FF]'
                              : isDone
                              ? 'text-[#F8FAFC]'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {step.label}
                        </span>
                        {isActive && (
                          <span className="px-1.5 py-0.2 rounded bg-[#2DD4FF]/20 text-[#2DD4FF] text-[9px] uppercase font-bold animate-pulse">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#94A3B8] block">
                        {step.detail}
                      </span>
                    </div>
                  </div>

                  {step.count && (
                    <span
                      className={`text-[11px] shrink-0 font-mono ${
                        isDone
                          ? 'text-[#22C55E]'
                          : isActive
                          ? 'text-[#2DD4FF]'
                          : 'text-[#64748B]'
                      }`}
                    >
                      {step.count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* View Analysis CTA */}
        <div className="pt-4 border-t border-[#26313D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[12px] font-mono text-[#22C55E]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              Primary vehicle recognition complete. High-confidence detections ready for review.
            </span>
          </div>

          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={onViewAnalysis}
            className="shadow-[0_0_25px_rgba(45,212,255,0.4)] px-6"
          >
            View Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};
