import React, { useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  LogOut,
  User,
  Shield,
  Radio,
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { SearchBar } from '../forms/SearchBar';
import { Button } from '../buttons/Button';
import { GlobalSearchModal } from '../search/GlobalSearchModal';

export interface AppHeaderProps {
  currentViewTitle?: string;
  officerName: string;
  officerBadge: string;
  onLogout: () => void;
  onCreateNewCase: () => void;
  isSpecimenMode: boolean;
  onToggleSpecimenMode: () => void;
  onNavigateSearchResult?: (category: string, id: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentViewTitle = 'Dashboard',
  officerName,
  officerBadge,
  onLogout,
  onCreateNewCase,
  isSpecimenMode,
  onToggleSpecimenMode,
  onNavigateSearchResult,
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'High Confidence Match: White SUV',
      desc: 'Camera C-17 detected plate 7XYZ89 (94% confidence).',
      time: '2m ago',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Trajectory Vector Updated',
      desc: 'Blind zone correlation predicts northern egress route.',
      time: '8m ago',
      unread: true,
    },
    {
      id: 'n3',
      title: 'Surveillance Node Re-synced',
      desc: 'Camera C-08 buffer restored to 60 FPS stream.',
      time: '24m ago',
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 border-b border-[#26313D] bg-[#0F151C]/95 backdrop-blur-md px-6 flex items-center justify-between gap-4 sticky top-0 z-30 select-none">
      {/* Left: View breadcrumbs / Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-[12px] font-mono">
          <span className="text-[#64748B]">NETRAX</span>
          <span className="text-[#26313D]">/</span>
          <span className="text-[#2DD4FF] font-semibold tracking-wide">
            {currentViewTitle.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div
        className="hidden md:flex flex-1 max-w-md mx-4 cursor-pointer"
        onClick={() => setIsSearchModalOpen(true)}
      >
        <div className="w-full pointer-events-none">
          <SearchBar
            value={searchVal}
            onChange={setSearchVal}
            placeholder="Global search: FIRs, vehicles, CDR, suspects (Press Cmd+K)..."
          />
        </div>
      </div>

      {/* Right: Actions, Notifications, Specimen Switcher, User Profile */}
      <div className="flex items-center gap-3">
        {/* Toggle Phase 1 Component Library Specimen */}
        <button
          type="button"
          onClick={onToggleSpecimenMode}
          className={`px-2.5 py-1.5 rounded-[6px] border text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
            isSpecimenMode
              ? 'bg-[#2DD4FF] text-[#0B0F14] border-[#2DD4FF] font-bold shadow-[0_0_12px_rgba(45,212,255,0.2)]'
              : 'bg-[#151D26] text-[#94A3B8] border-[#26313D] hover:text-[#F8FAFC]'
          }`}
          title="Toggle Phase 1 Design System Specimen"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {isSpecimenMode ? 'Phase 1 Specimen Active' : 'Phase 1 Specimen'}
          </span>
        </button>

        {/* Quick + New Case Button */}
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-3.5 h-3.5" />}
          onClick={onCreateNewCase}
          className="hidden sm:flex"
        >
          New Case
        </Button>

        {/* Notification Bell with Counter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-[6px] bg-[#151D26] border border-[#26313D] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors relative cursor-pointer"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-[9px] font-mono font-bold text-[#F8FAFC] flex items-center justify-center border border-[#0B0F14]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-[8px] bg-[#151D26] border border-[#26313D] shadow-2xl p-3 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#26313D]">
                <span className="text-[11px] font-mono font-bold text-[#F8FAFC] uppercase">
                  Investigation Alerts ({notifications.length})
                </span>
                <button
                  onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))}
                  className="text-[10px] font-mono text-[#2DD4FF] hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-[6px] border text-[11px] font-mono transition-colors ${
                      item.unread
                        ? 'bg-[#111820] border-[#2DD4FF]/40 text-[#F8FAFC]'
                        : 'bg-[#0F151C] border-[#26313D] text-[#94A3B8]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-semibold text-[#F8FAFC] line-clamp-1">
                        {item.title}
                      </span>
                      <span className="text-[9px] text-[#64748B] shrink-0">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-1 font-sans leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#26313D]">
          <div className="relative">
            <div className="w-8 h-8 rounded-[6px] bg-[#151D26] border border-[#26313D] flex items-center justify-center text-[#2DD4FF] font-mono font-bold text-[12px]">
              OS
            </div>
            <span className="w-2 h-2 rounded-full bg-[#22C55E] absolute -bottom-0.5 -right-0.5 border border-[#0B0F14]" />
          </div>

          <div className="hidden lg:block text-left leading-tight">
            <span className="text-[12px] font-semibold text-[#F8FAFC] block truncate">
              {officerName}
            </span>
            <span className="text-[10px] font-mono text-[#64748B] block truncate">
              {officerBadge} • Sector 12
            </span>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="w-8 h-8 rounded-[6px] bg-[#151D26] border border-[#26313D] flex items-center justify-center text-[#64748B] hover:text-[#EF4444] hover:border-[#EF4444]/40 transition-colors ml-1 cursor-pointer"
            title="Secure Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Global Cross-Module Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectResult={(res) => {
          setIsSearchModalOpen(false);
          if (onNavigateSearchResult) {
            onNavigateSearchResult(res.category, res.id);
          }
        }}
      />
    </header>
  );
};
