import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Cctv,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  Car,
  Tag,
  Hash,
  Share2,
  Check,
  Phone,
  Radio,
  Layers,
  Database
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { DemoProgressBar } from './DemoProgressBar';

export interface FinalReportViewProps {
  onBackToCase: () => void;
  onNavigateStep?: (step: any) => void;
}

export const FinalReportView: React.FC<FinalReportViewProps> = ({
  onBackToCase,
  onNavigateStep,
}) => {
  const [isExported, setIsExported] = useState(false);

  const handleExportPdf = () => {
    setIsExported(true);
    // Trigger standard print / PDF save
    setTimeout(() => {
      window.print();
    }, 300);
    setTimeout(() => {
      setIsExported(false);
    }, 5000);
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn font-sans select-none max-w-4xl mx-auto">
      {/* Step Navigation Bar */}
      {onNavigateStep && (
        <DemoProgressBar currentStep="final-report" onNavigateStep={onNavigateStep} />
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5 print:hidden">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={onBackToCase}
          >
            Back to Case
          </Button>
          <div className="h-4 w-px bg-[#26313D]" />
          <div>
            <span className="text-[11px] font-mono text-[#2DD4FF] font-bold">
              DOSSIER READY • CASE #NX-1024
            </span>
            <h2 className="text-[20px] font-bold text-[#F8FAFC]">
              Investigation Dossier Preview
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Printer className="w-4 h-4" />}
            onClick={handleExportPdf}
          >
            Print
          </Button>

          <Button
            variant="primary"
            size="md"
            leftIcon={isExported ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            onClick={handleExportPdf}
            className="shadow-[0_0_20px_rgba(45,212,255,0.3)]"
          >
            {isExported ? 'PDF Exported' : 'Export PDF'}
          </Button>
        </div>
      </div>

      {/* Success Notification if exported */}
      {isExported && (
        <div className="p-3 rounded-[6px] bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-[12px] font-mono flex items-center justify-between animate-fadeIn print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Investigation Report PDF generated with cryptographic SHA-256 seal.</span>
          </div>
          <span className="text-[11px] text-[#94A3B8]">Document ID: NX-DOC-20260914-7492</span>
        </div>
      )}

      {/* THE OFFICIAL REPORT DOCUMENT CONTAINER */}
      <div className="rounded-[10px] bg-[#0D131A] border border-[#26313D] p-8 space-y-8 shadow-2xl relative overflow-hidden text-[#E2E8F0] print:border-none print:shadow-none print:p-0">
        {/* Subtle Watermark Badge in Background */}
        <div className="absolute right-6 top-8 opacity-5 pointer-events-none select-none text-[120px] font-bold font-mono">
          NETRAX
        </div>

        {/* 1. REPORT HEADER */}
        <div className="border-b-2 border-[#2DD4FF]/40 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#2DD4FF]/20 text-[#2DD4FF] text-[10px] font-mono font-bold tracking-widest uppercase">
                CONFIDENTIAL • LAW ENFORCEMENT INTELLIGENCE
              </span>
            </div>
            <h1 className="text-[26px] font-extrabold tracking-tight text-[#F8FAFC]">
              NETRAX
            </h1>
            <h2 className="text-[16px] font-mono font-bold text-[#2DD4FF] tracking-wider">
              AI-ASSISTED INVESTIGATION REPORT
            </h2>
          </div>

          <div className="text-right font-mono text-[12px] space-y-0.5">
            <div className="text-[#2DD4FF] font-bold text-[15px]">
              CASE #NX-1024
            </div>
            <div className="text-[#F8FAFC] font-bold">
              VEHICLE THEFT
            </div>
            <div className="text-[#94A3B8] text-[11px]">
              Generated: 14 Sept 2026 • 21:18 hrs
            </div>
            <div className="text-[#64748B] text-[10px]">
              Investigator: Officer Sharma (Badge #7492)
            </div>
          </div>
        </div>

        {/* 2. CASE SUMMARY SECTION */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 font-mono">
            <FileText className="w-4 h-4 text-[#2DD4FF]" />
            <h3 className="text-[14px] font-bold text-[#F8FAFC] uppercase tracking-wider">
              Case Summary
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[12px]">
            <div className="p-3 rounded-[6px] bg-[#070A0E] border border-[#1E293B]">
              <span className="text-[10px] text-[#64748B] uppercase block">Incident:</span>
              <span className="text-[14px] font-bold text-[#F8FAFC]">Vehicle Theft</span>
            </div>

            <div className="p-3 rounded-[6px] bg-[#070A0E] border border-[#1E293B]">
              <span className="text-[10px] text-[#64748B] uppercase block">Location:</span>
              <span className="text-[14px] font-bold text-[#F8FAFC]">Sector 12</span>
            </div>

            <div className="p-3 rounded-[6px] bg-[#070A0E] border border-[#1E293B]">
              <span className="text-[10px] text-[#64748B] uppercase block">Date:</span>
              <span className="text-[14px] font-bold text-[#F8FAFC]">14 September 2026</span>
            </div>

            <div className="p-3 rounded-[6px] bg-[#070A0E] border border-[#1E293B]">
              <span className="text-[10px] text-[#64748B] uppercase block">Priority:</span>
              <span className="text-[14px] font-bold text-[#EF4444]">High</span>
            </div>
          </div>
        </div>

        {/* 3. IDENTIFIED VEHICLE SECTION */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 font-mono">
            <Car className="w-4 h-4 text-[#2DD4FF]" />
            <h3 className="text-[14px] font-bold text-[#F8FAFC] uppercase tracking-wider">
              Identified Vehicle
            </h3>
          </div>

          <div className="p-4 rounded-[6px] bg-[#070A0E] border border-[#1E293B] flex flex-wrap items-center justify-between gap-4 font-mono text-[13px]">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-[10px] text-[#64748B] uppercase block">TARGET VEHICLE</span>
                <span className="text-[16px] font-bold text-[#F8FAFC]">White SUV</span>
              </div>

              <div className="h-8 w-px bg-[#1E293B]" />

              <div>
                <span className="text-[10px] text-[#64748B] uppercase block">LICENSE PLATE</span>
                <span className="text-[18px] font-bold text-[#2DD4FF] tracking-wider">
                  CG 10 AB 1234
                </span>
              </div>

              <div className="h-8 w-px bg-[#1E293B]" />

              <div>
                <span className="text-[10px] text-[#64748B] uppercase block">CONFIDENCE</span>
                <span className="text-[16px] font-bold text-[#22C55E]">94%</span>
              </div>
            </div>

            <div className="px-3 py-1 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[11px] font-bold">
              VERIFIED BIOMETRIC & OCR MATCH
            </div>
          </div>
        </div>

        {/* 4. SURVEILLANCE FINDINGS & MOVEMENT SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Surveillance Findings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 font-mono">
              <Cctv className="w-4 h-4 text-[#2DD4FF]" />
              <h3 className="text-[14px] font-bold text-[#F8FAFC] uppercase tracking-wider">
                Surveillance Findings
              </h3>
            </div>

            <div className="p-4 rounded-[6px] bg-[#070A0E] border border-[#1E293B] space-y-2.5 font-mono text-[13px]">
              <div className="flex items-center justify-between p-2 rounded bg-[#0F151C] border border-[#1E293B]">
                <span className="font-bold text-[#F8FAFC]">C-17</span>
                <span className="text-[#2DD4FF]">→ 20:43</span>
                <span className="text-[#22C55E] text-[11px]">94% Match</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#0F151C] border border-[#1E293B]">
                <span className="font-bold text-[#F8FAFC]">C-21</span>
                <span className="text-[#2DD4FF]">→ 20:47</span>
                <span className="text-[#22C55E] text-[11px]">91% Match</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#0F151C] border border-[#1E293B]">
                <span className="font-bold text-[#F8FAFC]">C-08</span>
                <span className="text-[#2DD4FF]">→ 20:52</span>
                <span className="text-[#22C55E] text-[11px]">89% Match</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#0F151C] border border-[#1E293B]">
                <span className="font-bold text-[#F8FAFC]">C-03</span>
                <span className="text-[#2DD4FF]">→ 21:03</span>
                <span className="text-[#22C55E] text-[11px]">87% Match</span>
              </div>
            </div>
          </div>

          {/* Movement Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 font-mono">
              <Clock className="w-4 h-4 text-[#2DD4FF]" />
              <h3 className="text-[14px] font-bold text-[#F8FAFC] uppercase tracking-wider">
                Movement Summary
              </h3>
            </div>

            <div className="p-4 rounded-[6px] bg-[#070A0E] border border-[#1E293B] space-y-3 font-mono text-[12px]">
              <div className="flex justify-between border-b border-[#1E293B] pb-2">
                <span className="text-[#64748B]">First detected:</span>
                <span className="text-[#F8FAFC] font-bold">20:43</span>
              </div>

              <div className="flex justify-between border-b border-[#1E293B] pb-2">
                <span className="text-[#64748B]">Last detected:</span>
                <span className="text-[#EF4444] font-bold">21:03</span>
              </div>

              <div className="flex justify-between border-b border-[#1E293B] pb-2">
                <span className="text-[#64748B]">Cameras matched:</span>
                <span className="text-[#2DD4FF] font-bold">4</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#64748B]">Distance:</span>
                <span className="text-[#22C55E] font-bold">6.8 km</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. MULTI-SOURCE INTELLIGENCE TRIANGULATION (FIR, CDR, NETWORK) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 font-mono">
            <Database className="w-4 h-4 text-[#2DD4FF]" />
            <h3 className="text-[14px] font-bold text-[#F8FAFC] uppercase tracking-wider">
              Cross-Source Evidence Triangulation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[12px]">
            {/* FIR Record Card */}
            <div className="p-4 rounded-[6px] bg-[#070A0E] border border-[#1E293B] space-y-2.5">
              <div className="flex items-center justify-between text-[#F59E0B]">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="font-bold">FIR #102/2026</span>
                </div>
                <span className="text-[10px] text-[#22C55E]">IPC 379</span>
              </div>
              <div className="space-y-1 text-[#94A3B8] text-[11px]">
                <div><span className="text-[#64748B]">Station:</span> Sector 12 PS</div>
                <div><span className="text-[#64748B]">Complainant:</span> Vikram Mehra</div>
                <div><span className="text-[#64748B]">Stolen Time:</span> 14 Sep, 20:30 IST</div>
                <div><span className="text-[#64748B]">OCR Language:</span> Hindi / English bilingual</div>
              </div>
              <div className="p-2 rounded bg-[#0F151C] border border-[#1E293B] text-[10px] text-[#2DD4FF]">
                Plate "CG 10 AB 1234" extracted with 98.4% OCR precision.
              </div>
            </div>

            {/* CDR Telephony Card */}
            <div className="p-4 rounded-[6px] bg-[#070A0E] border border-[#1E293B] space-y-2.5">
              <div className="flex items-center justify-between text-[#A855F7]">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="font-bold">CDR Telemetry</span>
                </div>
                <span className="text-[10px] text-[#22C55E]">23 Logs Linked</span>
              </div>
              <div className="space-y-1 text-[#94A3B8] text-[11px]">
                <div><span className="text-[#64748B]">Suspect MSISDN:</span> +91 98110 44921</div>
                <div><span className="text-[#64748B]">Tower Handover:</span> TWR-S12-04 (20:41)</div>
                <div><span className="text-[#64748B]">Burst Contact:</span> 142s to Associate #1</div>
                <div><span className="text-[#64748B]">Cell Egress:</span> TWR-RLW-01 (21:04)</div>
              </div>
              <div className="p-2 rounded bg-[#0F151C] border border-[#1E293B] text-[10px] text-[#A855F7]">
                Tower handover correlates within 120s of CCTV optical hits.
              </div>
            </div>

            {/* Syndicate Topology Card */}
            <div className="p-4 rounded-[6px] bg-[#070A0E] border border-[#1E293B] space-y-2.5">
              <div className="flex items-center justify-between text-[#06B6D4]">
                <div className="flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="font-bold">Link Analysis</span>
                </div>
                <span className="text-[10px] text-[#EF4444]">High Risk</span>
              </div>
              <div className="space-y-1 text-[#94A3B8] text-[11px]">
                <div><span className="text-[#64748B]">Prime Entity:</span> Rahul Sharma ("Bullet")</div>
                <div><span className="text-[#64748B]">Prior Dockets:</span> 3 (FIR-2023-412, FIR-2024-089)</div>
                <div><span className="text-[#64748B]">Receiver Node:</span> Ramesh Yadav (Highway Yard)</div>
                <div><span className="text-[#64748B]">Modus Operandi:</span> Relay theft to dismantled parts</div>
              </div>
              <div className="p-2 rounded bg-[#0F151C] border border-[#1E293B] text-[10px] text-[#06B6D4]">
                Direct telecom edge verified between suspect & receiver yard.
              </div>
            </div>
          </div>
        </div>

        {/* 6. AI INSIGHT SECTION */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-[#1E293B] pb-2 font-mono">
            <Sparkles className="w-4 h-4 text-[#2DD4FF]" />
            <h3 className="text-[14px] font-bold text-[#F8FAFC] uppercase tracking-wider">
              AI Multi-Intelligence Synthesis Insight
            </h3>
          </div>

          <div className="p-4 rounded-[6px] bg-[#070A0E] border border-[#2DD4FF]/40 relative">
            <blockquote className="text-[14px] font-mono text-[#F8FAFC] leading-relaxed italic">
              “The identified White SUV (CG 10 AB 1234) registered in FIR #102/2026 was detected across four consecutive surveillance cameras (C-17 → C-21 → C-08 → C-03). Geospatial movement is strongly corroborated by cell tower handovers from Sector 12 to Railway Road on suspect burner phone (+91 98110 44921). Link analysis associates the suspect with the Mewat Vehicle Theft Syndicate with 92% confidence.”
            </blockquote>
          </div>
        </div>

        {/* 6. EVIDENCE STRIP WITH CCTV THUMBNAILS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 font-mono">
            <span className="text-[14px] font-bold text-[#F8FAFC] uppercase tracking-wider">
              Forensic Evidence Strip (CCTV Captures)
            </span>
            <span className="text-[11px] text-[#64748B]">4 Nodes Synchronized</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* C-17 Still */}
            <div className="rounded-[6px] bg-[#070A0E] border border-[#26313D] p-2 space-y-1.5 font-mono text-[10px]">
              <div className="w-full aspect-video rounded-[4px] bg-[#111827] relative overflow-hidden flex items-center justify-center">
                <div className="w-12 h-6 bg-white rounded-sm border border-cyan-400" />
                <span className="absolute top-1 left-1 bg-black/80 text-[#2DD4FF] px-1 rounded text-[8px]">
                  C-17
                </span>
                <span className="absolute bottom-1 right-1 bg-black/80 text-white px-1 rounded text-[8px]">
                  20:43
                </span>
              </div>
              <div className="text-[#F8FAFC] font-bold truncate">Cam C-17 (Sector 12)</div>
              <div className="text-[#22C55E]">Conf: 94%</div>
            </div>

            {/* C-21 Still */}
            <div className="rounded-[6px] bg-[#070A0E] border border-[#26313D] p-2 space-y-1.5 font-mono text-[10px]">
              <div className="w-full aspect-video rounded-[4px] bg-[#111827] relative overflow-hidden flex items-center justify-center">
                <div className="w-12 h-6 bg-white rounded-sm border border-cyan-400" />
                <span className="absolute top-1 left-1 bg-black/80 text-[#2DD4FF] px-1 rounded text-[8px]">
                  C-21
                </span>
                <span className="absolute bottom-1 right-1 bg-black/80 text-white px-1 rounded text-[8px]">
                  20:47
                </span>
              </div>
              <div className="text-[#F8FAFC] font-bold truncate">Cam C-21 (Main Rd)</div>
              <div className="text-[#22C55E]">Conf: 91%</div>
            </div>

            {/* C-08 Still */}
            <div className="rounded-[6px] bg-[#070A0E] border border-[#26313D] p-2 space-y-1.5 font-mono text-[10px]">
              <div className="w-full aspect-video rounded-[4px] bg-[#111827] relative overflow-hidden flex items-center justify-center">
                <div className="w-12 h-6 bg-white rounded-sm border border-cyan-400" />
                <span className="absolute top-1 left-1 bg-black/80 text-[#2DD4FF] px-1 rounded text-[8px]">
                  C-08
                </span>
                <span className="absolute bottom-1 right-1 bg-black/80 text-white px-1 rounded text-[8px]">
                  20:52
                </span>
              </div>
              <div className="text-[#F8FAFC] font-bold truncate">Cam C-08 (Bypass)</div>
              <div className="text-[#22C55E]">Conf: 89%</div>
            </div>

            {/* C-03 Still */}
            <div className="rounded-[6px] bg-[#070A0E] border border-[#26313D] p-2 space-y-1.5 font-mono text-[10px]">
              <div className="w-full aspect-video rounded-[4px] bg-[#111827] relative overflow-hidden flex items-center justify-center">
                <div className="w-12 h-6 bg-white rounded-sm border border-cyan-400" />
                <span className="absolute top-1 left-1 bg-black/80 text-[#2DD4FF] px-1 rounded text-[8px]">
                  C-03
                </span>
                <span className="absolute bottom-1 right-1 bg-black/80 text-white px-1 rounded text-[8px]">
                  21:03
                </span>
              </div>
              <div className="text-[#F8FAFC] font-bold truncate">Cam C-03 (Railway)</div>
              <div className="text-[#22C55E]">Conf: 87%</div>
            </div>
          </div>
        </div>

        {/* 7. CERTIFICATION SEAL FOOTER */}
        <div className="pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono text-[#64748B]">
          <div className="space-y-0.5">
            <div className="text-[#94A3B8]">
              Cryptographic Digest: <span className="text-[#2DD4FF]">SHA-256 e8b329f9c7a109e230b429...</span>
            </div>
            <div>Audited by: NetraX Forensic Subsystem • Node IND-S12</div>
          </div>

          <div className="text-right">
            <span className="px-2 py-1 rounded bg-[#151D26] text-[#22C55E] border border-[#22C55E]/30 font-bold inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              AUTHENTICATED FORENSIC DOSSIER
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM BUTTONS (EXACT REQUIREMENTS): "Export PDF" and "Back to Case" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 print:hidden">
        <Button
          variant="secondary"
          size="lg"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBackToCase}
        >
          Back to Case
        </Button>

        <Button
          variant="primary"
          size="lg"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExportPdf}
          className="shadow-[0_0_25px_rgba(45,212,255,0.4)]"
        >
          Export PDF
        </Button>
      </div>
    </div>
  );
};
