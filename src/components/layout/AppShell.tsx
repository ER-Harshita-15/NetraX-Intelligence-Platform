import React from 'react';
import { Sidebar, NavItemId } from '../navigation/Sidebar';
import { AppHeader } from './AppHeader';

export interface AppShellProps {
  activeNavId: NavItemId;
  onSelectNav: (id: NavItemId) => void;
  currentViewTitle: string;
  officerName: string;
  officerBadge: string;
  onLogout: () => void;
  onCreateNewCase: () => void;
  isSpecimenMode: boolean;
  onToggleSpecimenMode: () => void;
  onNavigateSearchResult?: (category: string, id: string) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeNavId,
  onSelectNav,
  currentViewTitle,
  officerName,
  officerBadge,
  onLogout,
  onCreateNewCase,
  isSpecimenMode,
  onToggleSpecimenMode,
  onNavigateSearchResult,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F8FAFC] flex flex-row antialiased select-none font-sans overflow-x-hidden">
      {/* 240px Fixed Left Sidebar from Phase 1 */}
      <Sidebar
        activeId={activeNavId}
        onSelect={onSelectNav}
        systemStatus="operational"
        className="shrink-0"
      />

      {/* Main Right View Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <AppHeader
          currentViewTitle={currentViewTitle}
          officerName={officerName}
          officerBadge={officerBadge}
          onLogout={onLogout}
          onCreateNewCase={onCreateNewCase}
          isSpecimenMode={isSpecimenMode}
          onToggleSpecimenMode={onToggleSpecimenMode}
          onNavigateSearchResult={onNavigateSearchResult}
        />

        {/* Content Container (Desktop-First, 1440x900 optimized) */}
        <main className="flex-1 p-6 md:p-8 max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
