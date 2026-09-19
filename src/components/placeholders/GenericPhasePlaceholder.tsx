import React from 'react';
import {
  Shield,
  Bot,
  FileText,
  MapPin,
  Settings,
  FileCheck2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from '../buttons/Button';

export interface GenericPhasePlaceholderProps {
  title: string;
  phaseNumber: number | string;
  description: string;
  icon: 'evidence' | 'map' | 'ai' | 'reports' | 'settings';
  onNavigateToDashboard: () => void;
}

export const GenericPhasePlaceholder: React.FC<GenericPhasePlaceholderProps> = ({
  title,
  phaseNumber,
  description,
  icon,
  onNavigateToDashboard,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'evidence':
        return <FileCheck2 className="w-10 h-10 text-[#2DD4FF]" />;
      case 'map':
        return <MapPin className="w-10 h-10 text-[#2DD4FF]" />;
      case 'ai':
        return <Bot className="w-10 h-10 text-[#2DD4FF]" />;
      case 'reports':
        return <FileText className="w-10 h-10 text-[#2DD4FF]" />;
      default:
        return <Settings className="w-10 h-10 text-[#2DD4FF]" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 rounded-[12px] bg-[#111820] border border-[#26313D] text-center space-y-5 animate-fadeIn font-sans select-none">
      <div className="w-16 h-16 rounded-[12px] bg-[#151D26] border border-[#26313D] mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(45,212,255,0.08)]">
        {getIcon()}
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-mono text-[#2DD4FF] uppercase tracking-widest block font-bold">
          SCHEDULED FOR PHASE {phaseNumber}
        </span>
        <h2 className="text-[22px] font-bold text-[#F8FAFC]">{title}</h2>
        <p className="text-[14px] text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[11px] font-mono text-[#64748B] max-w-md mx-auto">
        CURRENT ACTIVE STAGE: PHASE 2 (LOGIN, DASHBOARD & CASE MANAGEMENT)
      </div>

      <div className="pt-2">
        <Button
          variant="primary"
          size="md"
          onClick={onNavigateToDashboard}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Return to Investigator Dashboard
        </Button>
      </div>
    </div>
  );
};
