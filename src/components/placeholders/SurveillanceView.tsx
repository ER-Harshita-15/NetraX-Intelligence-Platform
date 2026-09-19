import React, { useState } from 'react';
import {
  Cctv,
  Radio,
  Grid,
  Maximize2,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { CctvPlayer } from '../surveillance/CctvPlayer';
import { Button } from '../buttons/Button';

export interface SurveillanceViewProps {
  onBackToDashboard?: () => void;
}

export const SurveillanceView: React.FC<SurveillanceViewProps> = ({
  onBackToDashboard,
}) => {
  const [selectedCam, setSelectedCam] = useState('CAMERA C-17');
  const [selectedLocation, setSelectedLocation] = useState('SECTOR 12 — NORTH AVE & 4TH ST');

  const cameras = [
    { id: 'C-17', name: 'CAMERA C-17', loc: 'SECTOR 12 — NORTH AVE & 4TH ST', status: 'Online', alerts: 1 },
    { id: 'C-21', name: 'CAMERA C-21', loc: 'SECTOR 12 — JUNCTION ARTERIAL', status: 'Online', alerts: 1 },
    { id: 'C-08', name: 'CAMERA C-08', loc: 'SECTOR 09 — EXPRESSWAY ENTRY', status: 'Processing', alerts: 0 },
    { id: 'C-03', name: 'CAMERA C-03', loc: 'SECTOR 04 — MAIN COMMERCIAL PLAZA', status: 'Online', alerts: 0 },
  ];

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-5">
        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={onBackToDashboard}
            >
              Dashboard
            </Button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
              <span className="text-[11px] font-mono text-[#22C55E] uppercase tracking-wider">
                LIVE SURVEILLANCE GRID • 42 FEEDS ACTIVE
              </span>
            </div>
            <h2 className="text-[24px] font-bold text-[#F8FAFC]">
              Surveillance Grid Operations
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-[#151D26] border border-[#26313D] text-[11px] font-mono text-[#94A3B8]">
            FEED LATENCY: <strong className="text-[#22C55E]">18ms</strong>
          </span>
        </div>
      </div>

      {/* Grid Layout: Main Player + Camera Feed Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main CCTV Stream Player (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <CctvPlayer
            cameraId={selectedCam}
            location={selectedLocation}
            initialState="detection_active"
          />

          <div className="p-3 rounded-[6px] bg-[#111820] border border-[#26313D] flex items-center justify-between text-[12px] font-mono text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="text-[#F8FAFC] font-semibold">{selectedCam}</span>
              <span>— AI Multi-Object Tracking Enabled</span>
            </div>
            <span className="text-[#2DD4FF]">PHASE 4 SURVEILLANCE MODULE</span>
          </div>
        </div>

        {/* Camera Selector Sidebar (1 col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
              SECTOR 12 CAMERAS
            </span>
            <span className="text-[11px] font-mono text-[#2DD4FF]">4 NODES</span>
          </div>

          <div className="space-y-2">
            {cameras.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedCam(c.name);
                  setSelectedLocation(c.loc);
                }}
                className={`p-3 rounded-[6px] border transition-all cursor-pointer ${
                  selectedCam === c.name
                    ? 'border-[#2DD4FF] bg-[#151D26] shadow-[0_0_12px_rgba(45,212,255,0.1)]'
                    : 'border-[#26313D] bg-[#111820] hover:border-[#26313D]/90'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-mono font-bold text-[#F8FAFC]">
                    {c.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      c.status === 'Online'
                        ? 'bg-[#22C55E]/20 text-[#22C55E]'
                        : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#94A3B8] font-mono mt-1 truncate">
                  {c.loc}
                </p>
                {c.alerts > 0 && (
                  <span className="inline-block mt-2 text-[10px] font-mono text-[#2DD4FF]">
                    ● Active Target Correlation
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
