import React from 'react';
import {
  FileText,
  User,
  Phone,
  Radio,
  Share2,
  Clock,
  Car,
  Cctv,
  MapPin,
  ArrowRight,
  Shield,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { EvidenceCorrelationStep } from '../../types';
import { EVIDENCE_CORRELATION_CHAIN } from '../../data/unifiedCaseData';

export interface EvidenceCorrelationPanelProps {
  steps?: EvidenceCorrelationStep[];
  onSelectStep?: (step: EvidenceCorrelationStep) => void;
  activeStep?: number;
}

export const EvidenceCorrelationPanel: React.FC<EvidenceCorrelationPanelProps> = ({
  steps = EVIDENCE_CORRELATION_CHAIN,
  onSelectStep,
  activeStep
}) => {
  const getStepIcon = (type: string) => {
    switch (type) {
      case 'fir':
        return <FileText className="w-4 h-4 text-[#F59E0B]" />;
      case 'person':
        return <User className="w-4 h-4 text-[#EF4444]" />;
      case 'phone':
        return <Phone className="w-4 h-4 text-[#A855F7]" />;
      case 'cdr':
        return <Radio className="w-4 h-4 text-[#2DD4FF]" />;
      case 'associate':
        return <Share2 className="w-4 h-4 text-[#06B6D4]" />;
      case 'history':
        return <Clock className="w-4 h-4 text-[#F59E0B]" />;
      case 'vehicle':
        return <Car className="w-4 h-4 text-[#22C55E]" />;
      case 'cctv':
        return <Cctv className="w-4 h-4 text-[#2DD4FF]" />;
      case 'map':
        return <MapPin className="w-4 h-4 text-[#EC4899]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#2DD4FF]" />;
    }
  };

  return (
    <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-5 select-none font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#26313D] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-[6px] bg-[#2DD4FF]/10 border border-[#2DD4FF]/30 text-[#2DD4FF]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
              Multi-Source Evidence Correlation Pipeline
            </h3>
            <p className="text-[12px] text-[#94A3B8]">
              Automated end-to-end evidence synthesis linking text dockets, cellular CDR, and optical CCTV.
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
          9 STAGES CORRELATED • 94.2% CONFIDENCE
        </span>
      </div>

      {/* Horizontal Flow Container */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-stretch gap-3 min-w-[960px]">
          {steps.map((item, idx) => {
            const isLast = idx === steps.length - 1;
            const isHighlighted = activeStep === item.step;

            return (
              <React.Fragment key={item.step}>
                <div
                  onClick={() => onSelectStep && onSelectStep(item)}
                  className={`flex-1 min-w-[200px] max-w-[220px] p-3.5 rounded-[8px] border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                    isHighlighted
                      ? 'bg-[#151D26] border-[#2DD4FF] shadow-[0_0_15px_rgba(45,212,255,0.15)]'
                      : 'bg-[#0F151C] border-[#26313D] hover:border-[#2DD4FF]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-[4px] bg-[#151D26] border border-[#26313D]">
                        {getStepIcon(item.iconType)}
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B]">STEP 0{item.step}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#22C55E] font-bold">
                      {item.confidence}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#2DD4FF] block tracking-wider">
                      {item.source}
                    </span>
                    <h4 className="text-[12px] font-semibold text-[#F8FAFC] line-clamp-1">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-mono text-[#CBD5E1] block mt-0.5 line-clamp-1">
                      {item.entityValue}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#94A3B8] leading-tight line-clamp-2 border-t border-[#26313D]/60 pt-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] pt-1">
                    <span>Inspect Tab</span>
                    <ExternalLink className="w-3 h-3 text-[#2DD4FF]" />
                  </div>
                </div>

                {!isLast && (
                  <div className="flex items-center text-[#26313D] shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
