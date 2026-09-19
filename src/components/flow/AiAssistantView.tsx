import React, { useState } from 'react';
import {
  Bot,
  User,
  Send,
  Sparkles,
  FileCheck,
  ArrowRight,
  Shield,
  HelpCircle,
  Clock,
  Car,
  CheckCircle2,
  CornerDownLeft
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { DemoProgressBar } from './DemoProgressBar';

export interface AiAssistantViewProps {
  onGenerateReport: () => void;
  onNavigateStep?: (step: any) => void;
}

interface ChatMessage {
  id: string;
  sender: 'investigator' | 'ai';
  text: string;
  time: string;
  badge?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'investigator',
    text: 'Where was the stolen vehicle last detected?',
    time: '21:16:04',
  },
  {
    id: 'msg-2',
    sender: 'ai',
    text: 'The vehicle was last detected at Camera C-03 on Railway Road at 21:03, with an 87% detection confidence.',
    time: '21:16:05',
    badge: 'CONFIRMED TELEMETRY',
  },
  {
    id: 'msg-3',
    sender: 'investigator',
    text: 'Which cameras confirmed the vehicle?',
    time: '21:16:32',
  },
  {
    id: 'msg-4',
    sender: 'ai',
    text: 'The same vehicle was identified across C-17, C-21, C-08 and C-03 with an overall confidence of 91%.',
    time: '21:16:33',
    badge: 'MULTI-CAMERA CORRELATION',
  },
];

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({
  onGenerateReport,
  onNavigateStep,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');

  const handleSuggestedPrompt = (prompt: string) => {
    if (prompt === 'Generate report') {
      onGenerateReport();
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    let replyText = '';
    let badge = 'CASE INTELLIGENCE';

    const pLower = prompt.toLowerCase();

    if (pLower.includes('fir') || pLower.includes('complainant') || pLower.includes('legal')) {
      replyText =
        'FIR #102/2026 registered at Sector 12 Police Station under IPC Section 379 (Theft of Motor Vehicle) on 14 September 2026 at 20:30 IST. Complainant: Vikram Mehra (98100 23411). Stolen property: White SUV, Model Scorpio-N, Plate CG 10 AB 1234. Multilingual OCR verified in original Hindi and translated English with 98.4% legal entity extraction accuracy.';
      badge = 'FIR DOCKET VERIFIED';
    } else if (pLower.includes('cdr') || pLower.includes('call') || pLower.includes('tower') || pLower.includes('phone')) {
      replyText =
        'Telecom CDR Analysis (23 records linked to case timeframe 20:30–21:10):\n• Primary Suspect MSISDN: +91 98110 44921 (Burner SIM registered under alias "R. Kumar")\n• 20:41 — 142s incoming call from +91 94221 00912 (Vikas Patel) at Tower TWR-S12-04 (Sector 12, correlates with CCTV C-17)\n• 20:49 — 45s call at Tower TWR-S09-02 (Sector 9 bypass)\n• 21:04 — 180s call at Tower TWR-RLW-01 (Railway Road, correlates with CCTV C-03)\nTelecom handovers align directly with CCTV optical track timestamps within 120 seconds.';
      badge = 'CDR TRIANGULATION';
    } else if (pLower.includes('network') || pLower.includes('suspect') || pLower.includes('syndicate') || pLower.includes('rahul')) {
      replyText =
        'Criminal Link Analysis Report:\n• Prime Suspect: Rahul Sharma (Alias: "Bullet", Age: 31). Associated with 3 prior auto-theft cases (FIR-2023-412, FIR-2024-089).\n• Key Associate: Vikas "Chhotu" Patel (Driver / Lookout). 14 calls exchanged during operation window.\n• Receiver / Chop-Shop Node: Ramesh Yadav (Highway Salvage Yard, Sector 04). Egress trajectory points toward this node.\n• Modus Operandi: Electronic relay attack on vehicle keyless entry, rapid transit along arterial roads to highway dismantling yards.';
      badge = 'SYNDICATE TOPOLOGY';
    } else if (prompt === 'Summarize the case') {
      replyText =
        'Case #NX-1024 involves the theft of a White SUV (License Plate: CG 10 AB 1234) registered under FIR #102/2026 at Sector 12. Across 4 sequential cameras (C-17 → C-21 → C-08 → C-03), NetraX reconstructed a 6.8 km route terminating at Railway Road with 91% aggregate optical confidence. Movement is corroborated by 23 cellular tower handovers and correlates with prime suspect Rahul Sharma ("Bullet") of the Mewat auto-theft ring.';
      badge = 'INCIDENT DOSSIER';
    } else if (prompt === 'Show vehicle movement') {
      replyText =
        'Vehicle egress progression:\n1. 20:43 — Sector 12 (North Ave) via C-17 (54 km/h, 94% optical match, Cell Tower S12-04)\n2. 20:47 — Main Road Arterial via C-21 (48 km/h, 91% match)\n3. 20:52 — East Bypass Expressway via C-08 (62 km/h, 89% match, Cell Tower S09-02)\n4. 21:03 — Railway Road Terminal via C-03 (36 km/h, 87% match, Cell Tower RLW-01)\nTotal route spanned 6.8 km over 20 minutes before entering dead-zone near salvage yards.';
      badge = 'KINEMATICS';
    } else if (prompt === 'Find strongest evidence') {
      replyText =
        'The strongest single optical evidence is Camera C-17 footage at 20:43 (North Avenue), with a 94% optical match score and verified plate OCR of "CG 10 AB 1234". The strongest telecommunication evidence is the 142s call burst on suspect burner +91 98110 44921 originating from Tower TWR-S12-04 at 20:41, placing suspect within 350m of crime scene.';
      badge = 'CRITICAL EVIDENCE';
    } else {
      replyText = `Cross-referencing NetraX unified intelligence repository for "${prompt}":\n• Matching FIR: FIR #102/2026 (Sector 12 PS, IPC 379)\n• Matching Vehicle: White SUV (CG 10 AB 1234)\n• Matching CDR: 23 call transactions on suspect MSISDN +91 98110 44921\n• Matching Network: Rahul Sharma ("Bullet") linked with 92% confidence.`;
    }

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'investigator',
      text: prompt,
      time: timeStr,
    };

    const aiMsg: ChatMessage = {
      id: `msg-${Date.now()}-ai`,
      sender: 'ai',
      text: replyText,
      time: timeStr,
      badge,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  const handleSendCustom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;
    handleSuggestedPrompt(inputVal.trim());
    setInputVal('');
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans select-none max-w-5xl mx-auto">
      {/* Step Navigation Bar */}
      {onNavigateStep && (
        <DemoProgressBar currentStep="ai-assistant" onNavigateStep={onNavigateStep} />
      )}

      {/* Header Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono font-bold text-[#2DD4FF]">
              CASE #NX-1024
            </span>
            <span className="text-[11px] font-mono text-[#64748B]">• NEURAL INVESTIGATOR</span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#2DD4FF]/15 text-[#2DD4FF] border border-[#2DD4FF]/30 text-[10px] font-mono font-bold">
              KNOWLEDGE BASE ACTIVE
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-[#F8FAFC]">
            NetraX AI Assistant
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            rightIcon={<FileCheck className="w-4 h-4" />}
            onClick={onGenerateReport}
            className="shadow-[0_0_20px_rgba(45,212,255,0.3)]"
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="rounded-[10px] bg-[#111820] border border-[#26313D] shadow-xl flex flex-col h-[560px] overflow-hidden">
        {/* Chat Top Banner */}
        <div className="p-3.5 bg-[#0F151C] border-b border-[#1E293B] flex items-center justify-between font-mono text-[12px]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#2DD4FF]/20 text-[#2DD4FF] flex items-center justify-center">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-[#F8FAFC]">
              NetraX Forensic Dialogue Engine
            </span>
            <span className="text-[#64748B]">| Sector 12 Context Grounded</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#22C55E]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span>Ready (Latency &lt;120ms)</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-mono text-[13px]">
          {messages.map((msg) => {
            const isInvestigator = msg.sender === 'investigator';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${
                  isInvestigator ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                    isInvestigator
                      ? 'bg-[#151D26] text-[#2DD4FF] border-[#2DD4FF]/40'
                      : 'bg-[#2DD4FF]/20 text-[#2DD4FF] border-[#2DD4FF]'
                  }`}
                >
                  {isInvestigator ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] text-[#64748B]">
                    <span className="font-bold text-[#94A3B8]">
                      {isInvestigator ? 'INVESTIGATOR' : 'NETRAX AI'}
                    </span>
                    <span>{msg.time}</span>
                    {msg.badge && (
                      <span className="px-1.5 py-0.2 rounded bg-[#2DD4FF]/10 text-[#2DD4FF] border border-[#2DD4FF]/20 font-bold">
                        {msg.badge}
                      </span>
                    )}
                  </div>

                  <div
                    className={`p-3.5 rounded-[8px] leading-relaxed whitespace-pre-line border ${
                      isInvestigator
                        ? 'bg-[#151D26] text-[#F8FAFC] border-[#2DD4FF]/30'
                        : 'bg-[#0F151C] text-[#E2E8F0] border-[#1E293B] shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggested Question Pills (Required Buttons) */}
        <div className="p-3 bg-[#0B0F14] border-t border-[#1E293B]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 min-w-max">
            <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-[#2DD4FF]" />
              Suggested:
            </span>

            <button
              onClick={() => handleSuggestedPrompt('Summarize the case')}
              className="px-3 py-1.5 rounded-[6px] bg-[#151D26] hover:bg-[#1E293B] border border-[#26313D] text-[11px] font-mono text-[#F8FAFC] hover:text-[#2DD4FF] transition-colors cursor-pointer"
            >
              “Summarize the case”
            </button>

            <button
              onClick={() => handleSuggestedPrompt('What does the FIR state?')}
              className="px-3 py-1.5 rounded-[6px] bg-[#151D26] hover:bg-[#1E293B] border border-[#26313D] text-[11px] font-mono text-[#F59E0B] hover:text-[#FBBF24] transition-colors cursor-pointer"
            >
              “What does FIR state?”
            </button>

            <button
              onClick={() => handleSuggestedPrompt('Check phone records / CDR')}
              className="px-3 py-1.5 rounded-[6px] bg-[#151D26] hover:bg-[#1E293B] border border-[#26313D] text-[11px] font-mono text-[#A855F7] hover:text-[#C084FC] transition-colors cursor-pointer"
            >
              “Check CDR phone records”
            </button>

            <button
              onClick={() => handleSuggestedPrompt('Show criminal syndicate links')}
              className="px-3 py-1.5 rounded-[6px] bg-[#151D26] hover:bg-[#1E293B] border border-[#26313D] text-[11px] font-mono text-[#06B6D4] hover:text-[#22D3EE] transition-colors cursor-pointer"
            >
              “Criminal syndicate links”
            </button>

            <button
              onClick={() => handleSuggestedPrompt('Show vehicle movement')}
              className="px-3 py-1.5 rounded-[6px] bg-[#151D26] hover:bg-[#1E293B] border border-[#26313D] text-[11px] font-mono text-[#F8FAFC] hover:text-[#2DD4FF] transition-colors cursor-pointer"
            >
              “Show vehicle movement”
            </button>

            <button
              onClick={() => handleSuggestedPrompt('Find strongest evidence')}
              className="px-3 py-1.5 rounded-[6px] bg-[#151D26] hover:bg-[#1E293B] border border-[#26313D] text-[11px] font-mono text-[#F8FAFC] hover:text-[#2DD4FF] transition-colors cursor-pointer"
            >
              “Find strongest evidence”
            </button>

            <button
              onClick={() => handleSuggestedPrompt('Generate report')}
              className="px-3 py-1.5 rounded-[6px] bg-[#2DD4FF]/15 hover:bg-[#2DD4FF]/25 border border-[#2DD4FF]/40 text-[11px] font-mono font-bold text-[#2DD4FF] transition-colors cursor-pointer shadow-[0_0_12px_rgba(45,212,255,0.2)] flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" />
              “Generate report”
            </button>
          </div>
        </div>

        {/* Custom Question Input Form */}
        <form
          onSubmit={handleSendCustom}
          className="p-3 bg-[#0F151C] border-t border-[#1E293B] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask NetraX AI about vehicle trajectory, witnesses, cameras, or plates..."
            className="flex-1 bg-[#0B0F14] border border-[#26313D] focus:border-[#2DD4FF] rounded-[6px] px-3.5 py-2 text-[13px] font-mono text-[#F8FAFC] placeholder:text-[#64748B] outline-none"
          />

          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="px-4 py-2 rounded-[6px] bg-[#2DD4FF] hover:bg-[#2DD4FF]/80 disabled:opacity-40 text-[#0B0F14] font-mono font-bold text-[12px] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Ask</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
