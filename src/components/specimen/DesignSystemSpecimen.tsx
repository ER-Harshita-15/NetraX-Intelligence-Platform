import React, { useState } from 'react';
import { FoundationSpecimen } from '../foundations/FoundationSpecimen';
import { NavigationSpecimen } from '../navigation/NavigationSpecimen';
import { ButtonSpecimen } from '../buttons/ButtonSpecimen';
import { DataSpecimen } from '../data/DataSpecimen';
import { SurveillanceSpecimen } from '../surveillance/SurveillanceSpecimen';
import { InvestigationSpecimen } from '../investigation/InvestigationSpecimen';
import { FormsSpecimen } from '../forms/FormsSpecimen';
import { FeedbackSpecimen } from '../feedback/FeedbackSpecimen';

import {
  Shield,
  Layers,
  Compass,
  MousePointerClick,
  Database,
  Cctv,
  SearchCode,
  FileText,
  Sliders,
  CheckCircle2,
  Sparkles,
  Terminal,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../buttons/Button';

type ComponentCategory =
  | 'all'
  | 'foundations'
  | 'navigation'
  | 'buttons'
  | 'data'
  | 'surveillance'
  | 'investigation'
  | 'forms'
  | 'feedback';

interface CategoryTab {
  id: ComponentCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  description: string;
}

const CATEGORIES: CategoryTab[] = [
  {
    id: 'all',
    label: 'All Components',
    icon: Layers,
    badge: '16 Items',
    description: 'Complete specimen catalog across the entire NETRAX UI system',
  },
  {
    id: 'foundations',
    label: 'Foundations',
    icon: Sliders,
    badge: 'Tokens',
    description: 'Color palette (#0B0F14 base), Inter typography scale, 8px rhythm & radii',
  },
  {
    id: 'navigation',
    label: 'Navigation',
    icon: Compass,
    badge: '240px',
    description: 'Standardized 240px intelligence sidebar with hover/active states',
  },
  {
    id: 'buttons',
    label: 'Buttons',
    icon: MousePointerClick,
    badge: '4 Variants',
    description: 'Primary, Secondary, Ghost, Danger with Small, Medium, Large & loading states',
  },
  {
    id: 'data',
    label: 'Data',
    icon: Database,
    badge: '4 Modules',
    description: 'Status badges, 28px KPI cards, high-density case table & investigation timeline',
  },
  {
    id: 'surveillance',
    label: 'Surveillance',
    icon: Cctv,
    badge: 'CCTV Core',
    description: 'Realistic CCTV video player, AI bounding-box target overlays & camera cards',
  },
  {
    id: 'investigation',
    label: 'Investigation',
    icon: SearchCode,
    badge: 'Dossier',
    description: 'Case cards (compact/expanded), multi-modal evidence cards, AI insights & map markers',
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: FileText,
    badge: 'Ingest',
    description: 'Standardized search bar with ⌘K hotkey & drag-and-drop evidence upload dropzone',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: CheckCircle2,
    badge: 'Modals/AI',
    description: 'Reusable dark modals and 5-step AI forensic processing checklist',
  },
];

export interface DesignSystemSpecimenProps {
  onReturnToDashboard?: () => void;
}

export const DesignSystemSpecimen: React.FC<DesignSystemSpecimenProps> = ({
  onReturnToDashboard,
}) => {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>('all');

  return (
    <div className="space-y-8 animate-fadeIn font-sans select-none">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-[8px] bg-[#111820] border border-[#26313D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-[4px] bg-[#2DD4FF]/15 text-[#2DD4FF] border border-[#2DD4FF]/30 text-[10px] font-mono font-bold">
              PHASE 1 SPECIMEN ARCHIVE
            </span>
            <span className="text-[13px] font-bold text-[#F8FAFC]">
              NETRAX UI Design System & Component Specimen Library
            </span>
          </div>
          <p className="text-[12px] text-[#94A3B8] mt-1 font-mono">
            Interactive reference catalog of all foundational tokens and 16 surveillance-grade UI components.
          </p>
        </div>

        {onReturnToDashboard && (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            onClick={onReturnToDashboard}
          >
            Return to Dashboard
          </Button>
        )}
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-[#0F151C] border border-[#26313D] rounded-[8px] p-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-[12px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2DD4FF]/15 text-[#2DD4FF] border border-[#2DD4FF]/30 font-semibold shadow-sm'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D26] border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-[#2DD4FF]/20 text-[#2DD4FF]' : 'bg-[#151D26] text-[#64748B]'
                  }`}
                >
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Specimen Sections */}
      <div className="space-y-16">
        {/* Active Category Header */}
        {activeCategory !== 'all' && (
          <div className="border-b border-[#26313D] pb-5">
            {CATEGORIES.filter((c) => c.id === activeCategory).map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#2DD4FF]">
                    MODULE SPECIFICATION
                  </span>
                  <span className="text-[#64748B] font-mono text-[11px]">• {cat.badge}</span>
                </div>
                <h2 className="text-[28px] font-bold text-[#F8FAFC] tracking-tight">
                  {cat.label}
                </h2>
                <p className="text-[14px] text-[#94A3B8]">{cat.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* 1. FOUNDATIONS */}
        {(activeCategory === 'all' || activeCategory === 'foundations') && (
          <section id="spec-foundations" className="space-y-6">
            {activeCategory === 'all' && (
              <div className="border-b border-[#26313D] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[20px] font-bold font-mono tracking-tight text-[#F8FAFC] flex items-center gap-2">
                    <span className="text-[#2DD4FF]">01</span> FOUNDATIONS
                  </h3>
                  <p className="text-[12px] text-[#64748B]">
                    Core design tokens: colors, Inter typography hierarchy, 8px rhythm & radius system.
                  </p>
                </div>
              </div>
            )}
            <FoundationSpecimen />
          </section>
        )}

        {/* 2. NAVIGATION */}
        {(activeCategory === 'all' || activeCategory === 'navigation') && (
          <section id="spec-navigation" className="space-y-6">
            {activeCategory === 'all' && (
              <div className="border-b border-[#26313D] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[20px] font-bold font-mono tracking-tight text-[#F8FAFC] flex items-center gap-2">
                    <span className="text-[#2DD4FF]">02</span> NAVIGATION (240px SIDEBAR)
                  </h3>
                  <p className="text-[12px] text-[#64748B]">
                    Tactical surveillance sidebar with state transitions, telemetry indicators, and collapsible compact mode.
                  </p>
                </div>
              </div>
            )}
            <NavigationSpecimen />
          </section>
        )}

        {/* 3. BUTTONS */}
        {(activeCategory === 'all' || activeCategory === 'buttons') && (
          <section id="spec-buttons" className="space-y-6">
            {activeCategory === 'all' && (
              <div className="border-b border-[#26313D] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[20px] font-bold font-mono tracking-tight text-[#F8FAFC] flex items-center gap-2">
                    <span className="text-[#2DD4FF]">03</span> BUTTONS & ACTIONS
                  </h3>
                  <p className="text-[12px] text-[#64748B]">
                    Interactive button matrix: Primary, Secondary, Ghost, Danger across Small, Medium, and Large with loading spinners.
                  </p>
                </div>
              </div>
            )}
            <ButtonSpecimen />
          </section>
        )}

        {/* 4. DATA */}
        {(activeCategory === 'all' || activeCategory === 'data') && (
          <section id="spec-data" className="space-y-6">
            {activeCategory === 'all' && (
              <div className="border-b border-[#26313D] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[20px] font-bold font-mono tracking-tight text-[#F8FAFC] flex items-center gap-2">
                    <span className="text-[#2DD4FF]">04</span> DATA COMPONENTS
                  </h3>
                  <p className="text-[12px] text-[#64748B]">
                    Status badges (8 variants), 28px KPI cards, interactive investigation records table, and chronological timeline items.
                  </p>
                </div>
              </div>
            )}
            <DataSpecimen />
          </section>
        )}

        {/* 5. SURVEILLANCE */}
        {(activeCategory === 'all' || activeCategory === 'surveillance') && (
          <section id="spec-surveillance" className="space-y-6">
            {activeCategory === 'all' && (
              <div className="border-b border-[#26313D] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[20px] font-bold font-mono tracking-tight text-[#F8FAFC] flex items-center gap-2">
                    <span className="text-[#2DD4FF]">05</span> SURVEILLANCE COMPONENTS
                  </h3>
                  <p className="text-[12px] text-[#64748B]">
                    Surveillance CCTV player with scanlines, OSD telemetry, AI detection overlays (vehicle, person, license plate), and camera health cards.
                  </p>
                </div>
              </div>
            )}
            <SurveillanceSpecimen />
          </section>
        )}

        {/* 6. INVESTIGATION */}
        {(activeCategory === 'all' || activeCategory === 'investigation') && (
          <section id="spec-investigation" className="space-y-6">
            {activeCategory === 'all' && (
              <div className="border-b border-[#26313D] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[20px] font-bold font-mono tracking-tight text-[#F8FAFC] flex items-center gap-2">
                    <span className="text-[#2DD4FF]">06</span> INVESTIGATION COMPONENTS
                  </h3>
                  <p className="text-[12px] text-[#64748B]">
                    Case cards (compact and expanded), multi-modal evidence cards (CCTV, image, document, audio), AI insights, and geospatial map markers.
                  </p>
                </div>
              </div>
            )}
            <InvestigationSpecimen />
          </section>
        )}

        {/* 7. FORMS */}
        {(activeCategory === 'all' || activeCategory === 'forms') && (
          <section id="spec-forms" className="space-y-6">
            {activeCategory === 'all' && (
              <div className="border-b border-[#26313D] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[20px] font-bold font-mono tracking-tight text-[#F8FAFC] flex items-center gap-2">
                    <span className="text-[#2DD4FF]">07</span> FORMS & INGESTION
                  </h3>
                  <p className="text-[12px] text-[#64748B]">
                    Standard investigation search bar with focus ring & ⌘K badge, and forensic drag-and-drop evidence dropzone.
                  </p>
                </div>
              </div>
            )}
            <FormsSpecimen />
          </section>
        )}

        {/* 8. FEEDBACK */}
        {(activeCategory === 'all' || activeCategory === 'feedback') && (
          <section id="spec-feedback" className="space-y-6">
            {activeCategory === 'all' && (
              <div className="border-b border-[#26313D] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[20px] font-bold font-mono tracking-tight text-[#F8FAFC] flex items-center gap-2">
                    <span className="text-[#2DD4FF]">08</span> FEEDBACK & PROCESSING
                  </h3>
                  <p className="text-[12px] text-[#64748B]">
                    Elevation layer 4 dark modals and interactive 5-step AI forensic processing indicator checklist.
                  </p>
                </div>
              </div>
            )}
            <FeedbackSpecimen />
          </section>
        )}
      </div>
    </div>
  );
};
