import React, { useState } from 'react';
import { Button } from './Button';
import {
  Plus,
  UploadCloud,
  Cpu,
  Crosshair,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { ButtonVariant, ButtonSize } from '../../types';

export const ButtonSpecimen: React.FC = () => {
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

  const toggleLoading = (key: string) => {
    setLoadingState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const variants: { key: ButtonVariant; label: string; desc: string }[] = [
    { key: 'primary', label: 'Primary Button', desc: 'Main AI operations, primary system triggers, case creation' },
    { key: 'secondary', label: 'Secondary Button', desc: 'Auxiliary tools, filters, standard workflow progression' },
    { key: 'ghost', label: 'Ghost Button', desc: 'Tertiary commands, inline row actions, subtle cancellations' },
    { key: 'danger', label: 'Danger Button', desc: 'Revoking surveillance feed, closing critical alerts, deletion' },
  ];

  const sizes: { key: ButtonSize; label: string; height: string }[] = [
    { key: 'sm', label: 'Small (32px)', height: 'h-8 px-3 text-xs' },
    { key: 'md', label: 'Medium (36px)', height: 'h-9 px-4 text-sm' },
    { key: 'lg', label: 'Large (44px)', height: 'h-11 px-5 text-base' },
  ];

  return (
    <div id="button-specimen" className="space-y-10">
      {/* Header Info */}
      <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[18px] leading-[26px] font-semibold text-[#F8FAFC]">
              Surveillance System Buttons
            </h3>
            <p className="text-[13px] text-[#94A3B8] mt-1">
              Engineered with high optical contrast, instant interactive response, and loading states.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#64748B]">RADII: 6px / 8px</span>
            <span className="text-[11px] font-mono text-[#2DD4FF] px-2 py-0.5 rounded bg-[#2DD4FF]/10 border border-[#2DD4FF]/20">
              PRESS RATIO: 0.98
            </span>
          </div>
        </div>
      </div>

      {/* Real Platform Action Previews */}
      <div className="space-y-3">
        <h4 className="text-[14px] font-semibold text-[#F8FAFC] tracking-wider uppercase font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4FF]" />
          Platform Action Presets
        </h4>

        <div className="p-5 rounded-[8px] bg-[#111820] border border-[#26313D] flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            isLoading={loadingState['create-case']}
            onClick={() => toggleLoading('create-case')}
          >
            Create Case
          </Button>

          <Button
            variant="secondary"
            leftIcon={<UploadCloud className="w-4 h-4 text-[#2DD4FF]" />}
            isLoading={loadingState['upload-evidence']}
            onClick={() => toggleLoading('upload-evidence')}
          >
            Upload Evidence
          </Button>

          <Button
            variant="primary"
            leftIcon={<Cpu className="w-4 h-4" />}
            isLoading={loadingState['analyze']}
            onClick={() => toggleLoading('analyze')}
          >
            Analyze Evidence
          </Button>

          <Button
            variant="secondary"
            leftIcon={<Crosshair className="w-4 h-4 text-[#2DD4FF]" />}
            isLoading={loadingState['track-vehicle']}
            onClick={() => toggleLoading('track-vehicle')}
          >
            Track Vehicle
          </Button>

          <Button
            variant="secondary"
            leftIcon={<FileSpreadsheet className="w-4 h-4" />}
            isLoading={loadingState['gen-report']}
            onClick={() => toggleLoading('gen-report')}
          >
            Generate Report
          </Button>

          <Button
            variant="ghost"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Report
          </Button>

          <Button
            variant="danger"
            leftIcon={<AlertTriangle className="w-4 h-4" />}
          >
            Purge Alert
          </Button>
        </div>
      </div>

      {/* Variant & Size Matrix */}
      <div className="space-y-4">
        <h4 className="text-[14px] font-semibold text-[#F8FAFC] tracking-wider uppercase font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4FF]" />
          Variant & State Matrix
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {variants.map((v) => (
            <div
              key={v.key}
              className="p-5 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-[#F8FAFC]">{v.label}</span>
                  <span className="text-[11px] font-mono text-[#2DD4FF] uppercase">{v.key}</span>
                </div>
                <p className="text-[12px] text-[#94A3B8] mt-0.5">{v.desc}</p>
              </div>

              {/* Sizes Row */}
              <div className="space-y-2 pt-2 border-t border-[#26313D]">
                <span className="text-[11px] font-mono text-[#64748B]">SIZES</span>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant={v.key} size="sm">
                    Small
                  </Button>
                  <Button variant={v.key} size="md">
                    Medium
                  </Button>
                  <Button variant={v.key} size="lg">
                    Large Action
                  </Button>
                </div>
              </div>

              {/* States Row */}
              <div className="space-y-2 pt-2 border-t border-[#26313D]">
                <span className="text-[11px] font-mono text-[#64748B]">INTERACTION STATES</span>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant={v.key} size="sm">
                    Default
                  </Button>
                  <Button variant={v.key} size="sm" isLoading>
                    Loading
                  </Button>
                  <Button variant={v.key} size="sm" disabled>
                    Disabled
                  </Button>
                  <Button
                    variant={v.key}
                    size="sm"
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  >
                    With Icon
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
