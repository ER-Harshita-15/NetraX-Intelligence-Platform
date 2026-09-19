import React, { useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Shield,
  FileCheck2,
  Calendar,
  MapPin,
  AlertTriangle,
  Info,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { Button } from '../buttons/Button';

export interface CreateCaseViewProps {
  onCancel: () => void;
  onCaseCreated: (caseData: {
    id: string;
    caseNumber: string;
    title: string;
    type: string;
    dateTime: string;
    location: string;
    priority: string;
    description: string;
  }) => void;
}

export const CreateCaseView: React.FC<CreateCaseViewProps> = ({
  onCancel,
  onCaseCreated,
}) => {
  const [caseTitle, setCaseTitle] = useState('Vehicle Theft — Sector 12');
  const [caseId] = useState('NX-1024');
  const [incidentType, setIncidentType] = useState('Vehicle Theft');
  const [dateTime, setDateTime] = useState('14 Sept 2026 • 20:30');
  const [location, setLocation] = useState('Sector 12');
  const [priority, setPriority] = useState('High');
  const [description, setDescription] = useState(
    'Vehicle reported stolen from commercial plaza parking in Sector 12. Suspect seen fleeing towards the northern arterial route. Surveillance footage from perimeter cameras C-17 and C-21 requested for automated AI tracking.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onCaseCreated({
        id: 'case-1024',
        caseNumber: `CASE #${caseId}`,
        title: caseTitle,
        type: incidentType,
        dateTime,
        location,
        priority,
        description,
      });
    }, 450);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn font-sans select-none">
      {/* Back button and page header */}
      <div className="flex items-center justify-between border-b border-[#26313D] pb-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={onCancel}
          >
            Back to Dashboard
          </Button>
          <div className="h-4 w-px bg-[#26313D]" />
          <div>
            <span className="text-[11px] font-mono uppercase text-[#2DD4FF] tracking-wider block">
              CASE INTAKE PROTOCOL
            </span>
            <h2 className="text-[24px] font-bold text-[#F8FAFC]">
              Create New Investigation
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2DD4FF] animate-pulse" />
          <span className="text-[12px] font-mono text-[#94A3B8]">AUTO-ENCRYPTED FILE</span>
        </div>
      </div>

      {/* Main Form Box */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Descriptive Tactical Banner Panel */}
        <div className="rounded-[8px] bg-[#151D26] border border-[#2DD4FF]/30 p-4 flex items-start gap-3.5 shadow-[0_0_15px_rgba(45,212,255,0.05)]">
          <div className="p-2 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[#2DD4FF] shrink-0">
            <Info className="w-5 h-5 text-[#2DD4FF]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-[14px] font-semibold text-[#F8FAFC]">
              Automated Evidence Hub
            </h4>
            <p className="text-[13px] text-[#94A3B8] leading-relaxed">
              NetraX will organize evidence, surveillance footage and AI analysis under this case.
              Once initialized, relevant camera feeds will begin background index correlation.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-6">
          {/* Row 1: Case Title & Case ID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label
                htmlFor="case-title"
                className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium"
              >
                Case Title
              </label>
              <input
                id="case-title"
                type="text"
                value={caseTitle}
                onChange={(e) => setCaseTitle(e.target.value)}
                placeholder="e.g. Vehicle Theft — Sector 12"
                className="w-full h-11 px-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[#F8FAFC] text-[14px] font-medium placeholder-[#64748B] focus:outline-none focus:border-[#2DD4FF] focus:ring-1 focus:ring-[#2DD4FF]/40 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="case-id"
                className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium"
              >
                Case ID (Auto-Generated)
              </label>
              <div className="relative flex items-center">
                <input
                  id="case-id"
                  type="text"
                  value={caseId}
                  readOnly
                  className="w-full h-11 px-3.5 rounded-[6px] bg-[#0B0F14] border border-[#26313D] text-[#2DD4FF] font-mono font-bold text-[14px] select-all cursor-not-allowed"
                />
                <Lock className="w-3.5 h-3.5 text-[#64748B] absolute right-3" />
              </div>
            </div>
          </div>

          {/* Row 2: Incident Type & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="incident-type"
                className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium"
              >
                Incident Type
              </label>
              <select
                id="incident-type"
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full h-11 px-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[#F8FAFC] text-[13px] font-medium focus:outline-none focus:border-[#2DD4FF] focus:ring-1 focus:ring-[#2DD4FF]/40 transition-all cursor-pointer"
              >
                <option value="Vehicle Theft">Vehicle Theft</option>
                <option value="Robbery">Robbery</option>
                <option value="Missing Person">Missing Person</option>
                <option value="Perimeter Breach">Perimeter Breach</option>
                <option value="Homicide">Homicide</option>
                <option value="Narcotics Interdiction">Narcotics Interdiction</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="case-priority"
                className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium"
              >
                Priority Level
              </label>
              <select
                id="case-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-11 px-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[#F8FAFC] text-[13px] font-medium focus:outline-none focus:border-[#2DD4FF] focus:ring-1 focus:ring-[#2DD4FF]/40 transition-all cursor-pointer"
              >
                <option value="Critical">Critical Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Row 3: Date & Time + Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="case-datetime"
                className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium"
              >
                Date & Time of Incident
              </label>
              <div className="relative flex items-center">
                <Calendar className="w-4 h-4 text-[#64748B] absolute left-3.5" />
                <input
                  id="case-datetime"
                  type="text"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  placeholder="e.g. 14 Sept 2026 • 20:30"
                  className="w-full h-11 pl-10 pr-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[#F8FAFC] text-[13px] font-mono placeholder-[#64748B] focus:outline-none focus:border-[#2DD4FF] focus:ring-1 focus:ring-[#2DD4FF]/40 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="case-location"
                className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium"
              >
                Incident Location / Sector
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-[#64748B] absolute left-3.5" />
                <input
                  id="case-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Sector 12"
                  className="w-full h-11 pl-10 pr-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[#F8FAFC] text-[13px] placeholder-[#64748B] focus:outline-none focus:border-[#2DD4FF] focus:ring-1 focus:ring-[#2DD4FF]/40 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 4: Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="case-description"
              className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-medium"
            >
              Incident Narrative / Description
            </label>
            <textarea
              id="case-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the circumstances, initial witnesses, target descriptions, or camera coverage..."
              className="w-full p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[#F8FAFC] text-[13px] leading-relaxed placeholder-[#64748B] focus:outline-none focus:border-[#2DD4FF] focus:ring-1 focus:ring-[#2DD4FF]/40 transition-all"
              required
            />
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              leftIcon={<Briefcase className="w-4 h-4" />}
            >
              Create Case
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
