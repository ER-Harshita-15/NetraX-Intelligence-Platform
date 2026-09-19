import React, { useState } from 'react';
import { COLOR_SWATCHES, TYPOGRAPHY_STYLES, SPACING_SYSTEM, RADIUS_SYSTEM } from './tokens';
import { Check, Copy, Shield, Sparkles } from 'lucide-react';

export const FoundationSpecimen: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div id="foundations-specimen" className="space-y-12">
      {/* Overview Banner */}
      <div className="rounded-[12px] bg-[#111820] border border-[#26313D] p-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[6px] bg-[#2DD4FF]/10 text-[#2DD4FF] text-[11px] font-medium tracking-wider uppercase border border-[#2DD4FF]/20">
                <Shield className="w-3 h-3" />
                FOUNDATION TOKEN SPECIFICATION
              </span>
              <span className="text-[12px] text-[#64748B] font-mono">NETRAX-CORE-v1.0</span>
            </div>
            <h2 className="text-[24px] leading-[32px] font-semibold text-[#F8FAFC]">
              Design Tokens & High-Tech Surveillance System Foundations
            </h2>
            <p className="text-[14px] leading-[22px] text-[#94A3B8]">
              Engineered specifically for mission-critical surveillance, intelligence analysis, and CCTV correlation.
              Strictly dark mode, calibrated contrast ratios, 8px layout rhythm, and subtle high-tech cyan accents.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end text-right border-l border-[#26313D] pl-6">
            <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-medium">Target Display</span>
            <span className="text-[16px] font-mono font-semibold text-[#F8FAFC]">1440 × 900 Desktop</span>
            <span className="text-[12px] text-[#2DD4FF] mt-1 font-mono">Dark Base #0B0F14</span>
          </div>
        </div>
      </div>

      {/* Colors Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
              Color Palette Tokens
            </h3>
            <p className="text-[12px] text-[#64748B]">
              Carefully chosen dark neutrals and tactical semaphoric colors. Click any swatch to copy HEX.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {COLOR_SWATCHES.map((swatch) => (
            <button
              key={swatch.name}
              onClick={() => copyToClipboard(swatch.hex)}
              className="text-left rounded-[8px] bg-[#111820] border border-[#26313D] p-3.5 hover:border-[#2DD4FF]/50 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-[6px] border border-white/10 shrink-0 shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: swatch.hex }}
                >
                  {copiedHex === swatch.hex && (
                    <Check className="w-5 h-5 text-white mix-blend-difference" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-[#F8FAFC] truncate">
                      {swatch.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#2DD4FF] opacity-80 group-hover:opacity-100">
                      {copiedHex === swatch.hex ? 'COPIED' : swatch.hex}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">
                    {swatch.role}
                  </p>
                  <span className="inline-block text-[10px] text-[#64748B] font-mono mt-1">
                    {swatch.contrast}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Typography Scale Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2DD4FF]" />
            Typography Scale (Inter)
          </h3>
          <p className="text-[12px] text-[#64748B]">
            Mathematical hierarchy optimized for dense surveillance interfaces, high-legibility telemetry, and clear reporting.
          </p>
        </div>

        <div className="rounded-[8px] bg-[#111820] border border-[#26313D] divide-y divide-[#26313D] overflow-hidden">
          {TYPOGRAPHY_STYLES.map((type) => (
            <div key={type.name} className="p-4 hover:bg-[#151D26]/50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="w-full lg:w-72 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-[#F8FAFC] font-mono">
                      {type.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#64748B] font-mono mt-1">
                    <span>{type.size}</span>
                    <span>•</span>
                    <span>LH {type.lineHeight}</span>
                    <span>•</span>
                    <span>{type.weight}</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-1">{type.usage}</p>
                </div>
                <div className="flex-1 min-w-0 bg-[#0B0F14] px-4 py-3 rounded-[6px] border border-[#26313D]/60 overflow-x-auto">
                  <span className={`${type.className} text-[#F8FAFC] block truncate`}>
                    {type.sample}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing & Radius Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 8px Spacing System */}
        <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[16px] leading-[24px] font-semibold text-[#F8FAFC]">
                8px Spacing Rhythm
              </h4>
              <p className="text-[12px] text-[#64748B]">Systemic increments: 4, 8, 12, 16, 24, 32, 40, 48px</p>
            </div>
            <span className="text-[11px] font-mono text-[#2DD4FF] px-2 py-0.5 rounded bg-[#2DD4FF]/10 border border-[#2DD4FF]/20">
              GRID: 8PX
            </span>
          </div>

          <div className="space-y-2.5">
            {SPACING_SYSTEM.map((s) => (
              <div key={s.token} className="flex items-center gap-3 text-[12px]">
                <span className="w-16 font-mono text-[#64748B]">{s.token}</span>
                <span className="w-12 font-mono text-[#2DD4FF] font-medium">{s.value}</span>
                <div className="flex-1 flex items-center">
                  <div
                    className="h-3 bg-[#2DD4FF]/30 border border-[#2DD4FF]/50 rounded-[2px]"
                    style={{ width: s.value }}
                  />
                </div>
                <span className="text-[11px] text-[#94A3B8] text-right hidden sm:inline">{s.usage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Radius System */}
        <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[16px] leading-[24px] font-semibold text-[#F8FAFC]">
                Border Radius Hierarchy
              </h4>
              <p className="text-[12px] text-[#64748B]">Controlled curvature avoiding excessive roundness</p>
            </div>
            <span className="text-[11px] font-mono text-[#2DD4FF] px-2 py-0.5 rounded bg-[#2DD4FF]/10 border border-[#2DD4FF]/20">
              MODERATE RADIUS
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {RADIUS_SYSTEM.map((r) => (
              <div
                key={r.token}
                className="p-3.5 bg-[#0F151C] border border-[#26313D] flex items-center justify-between"
                style={{ borderRadius: r.value }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-[#F8FAFC] font-mono">{r.token}</span>
                    <span className="text-[11px] font-mono text-[#2DD4FF]">({r.value})</span>
                  </div>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{r.usage}</p>
                </div>
                <div
                  className="w-10 h-10 border-2 border-[#2DD4FF] bg-[#2DD4FF]/10 flex items-center justify-center text-[10px] font-mono text-[#2DD4FF]"
                  style={{ borderRadius: r.value }}
                >
                  {r.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
