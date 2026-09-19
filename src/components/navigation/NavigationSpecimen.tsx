import React, { useState } from 'react';
import { Sidebar, NavItemId } from './Sidebar';
import { Button } from '../buttons/Button';
import { PanelLeftClose, PanelLeft, Radio, Shield } from 'lucide-react';

export const NavigationSpecimen: React.FC = () => {
  const [activeId, setActiveId] = useState<NavItemId>('surveillance');
  const [isCompact, setIsCompact] = useState(false);
  const [status, setStatus] = useState<'operational' | 'alert' | 'processing'>('operational');

  return (
    <div id="navigation-specimen" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
            Surveillance Sidebar Navigation (240px)
          </h3>
          <p className="text-[12px] text-[#64748B]">
            Reusable 240px sidebar with brand badge, system telemetry dot, navigation items with hover/active states, and encrypted node indicator.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={isCompact ? <PanelLeft className="w-3.5 h-3.5" /> : <PanelLeftClose className="w-3.5 h-3.5" />}
            onClick={() => setIsCompact(!isCompact)}
          >
            {isCompact ? 'Expand (240px)' : 'Compact (72px)'}
          </Button>

          <div className="flex items-center rounded-[6px] bg-[#111820] border border-[#26313D] p-0.5 text-[11px] font-mono">
            {(['operational', 'alert', 'processing'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatus(st)}
                className={`px-2 py-0.5 rounded capitalize transition-colors ${
                  status === st
                    ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold'
                    : 'text-[#64748B] hover:text-[#94A3B8]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Sidebar Canvas Container */}
      <div className="rounded-[8px] bg-[#0B0F14] border border-[#26313D] h-[640px] flex overflow-hidden">
        <Sidebar
          activeId={activeId}
          onSelect={(id) => setActiveId(id)}
          compact={isCompact}
          systemStatus={status}
        />

        {/* Specimen Inspection Panel on the right */}
        <div className="flex-1 p-6 flex flex-col justify-between bg-[#0B0F14] overflow-y-auto">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#2DD4FF]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>ACTIVE NAVIGATION ITEM: {activeId.toUpperCase()}</span>
            </div>

            <h4 className="text-[20px] font-semibold text-[#F8FAFC]">
              Navigation Architecture Specifications
            </h4>

            <div className="space-y-2.5 text-[13px] text-[#94A3B8]">
              <p>
                • <strong>Width:</strong> Strictly calibrated to <strong>240px</strong> in full mode; <strong>72px</strong> in compact mode.
              </p>
              <p>
                • <strong>Active State:</strong> Subtle cyan background tint (<code className="text-[#2DD4FF] font-mono">#2DD4FF / 10%</code>) with vibrant cyan icon and bold white label.
              </p>
              <p>
                • <strong>Hover State:</strong> Instant elevation to secondary surface (<code className="text-[#94A3B8] font-mono">#151D26</code>) with smoothed text contrast.
              </p>
              <p>
                • <strong>Badges:</strong> Semaphoric pills for live camera counts, unassigned cases, and AI version markers.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] text-[11px] font-mono text-[#64748B] flex items-center justify-between">
            <span>READY FOR PHASE 2 APPLICATION ROUTING INTEGRATION</span>
            <span className="text-[#22C55E]">STABLE SPECIFICATION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
