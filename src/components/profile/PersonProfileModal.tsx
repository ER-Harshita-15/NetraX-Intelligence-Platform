import React, { useState } from 'react';
import {
  X,
  User,
  Shield,
  Phone,
  Car,
  MapPin,
  FileText,
  AlertTriangle,
  Clock,
  Share2,
  ExternalLink,
  ChevronRight,
  Fingerprint,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { PersonProfile } from '../../types';
import { PRIMARY_SUSPECT_PROFILE } from '../../data/unifiedCaseData';
import { Button } from '../buttons/Button';

export interface PersonProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: PersonProfile;
  onOpenCase?: (caseNumber: string) => void;
}

export const PersonProfileModal: React.FC<PersonProfileModalProps> = ({
  isOpen,
  onClose,
  profile = PRIMARY_SUSPECT_PROFILE,
  onOpenCase
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'associates' | 'vehicles' | 'phones' | 'locations'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F14]/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#0F151C] border border-[#26313D] rounded-[10px] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#26313D] flex items-center justify-between bg-[#151D26]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[6px] bg-[#2DD4FF]/10 border border-[#2DD4FF]/30 text-[#2DD4FF]">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                  POLICE INTELLIGENCE DOSSIER
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444]">
                  CONFIDENTIAL
                </span>
              </div>
              <h2 className="text-[18px] font-bold text-[#F8FAFC]">
                {profile.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-[6px] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1C2633] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Officer Disclaimer Banner */}
        <div className="px-6 py-2 bg-[#111820] border-b border-[#26313D] text-[11px] font-mono text-[#94A3B8] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#2DD4FF]" />
            Associated with multiple case records. Reference to records is for official investigative verification.
          </span>
          <span className="text-[#64748B]">ID: NX-PER-4091</span>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 rounded-[6px] bg-[#151D26] border border-[#26313D]">
              <span className="text-[10px] font-mono text-[#64748B] block uppercase">PREVIOUS CASES</span>
              <span className="text-[18px] font-bold text-[#F8FAFC] font-mono">{profile.previousCasesCount}</span>
            </div>
            <div className="p-3 rounded-[6px] bg-[#151D26] border border-[#26313D]">
              <span className="text-[10px] font-mono text-[#64748B] block uppercase">RELATED FIRS</span>
              <span className="text-[18px] font-bold text-[#2DD4FF] font-mono">{profile.relatedFirsCount}</span>
            </div>
            <div className="p-3 rounded-[6px] bg-[#151D26] border border-[#26313D]">
              <span className="text-[10px] font-mono text-[#64748B] block uppercase">KNOWN LOCATIONS</span>
              <span className="text-[18px] font-bold text-[#F8FAFC] font-mono">{profile.knownLocationsCount}</span>
            </div>
            <div className="p-3 rounded-[6px] bg-[#151D26] border border-[#26313D]">
              <span className="text-[10px] font-mono text-[#64748B] block uppercase">ASSOCIATED VEHICLES</span>
              <span className="text-[18px] font-bold text-[#F8FAFC] font-mono">{profile.associatedVehiclesCount}</span>
            </div>
            <div className="p-3 rounded-[6px] bg-[#151D26] border border-[#26313D]">
              <span className="text-[10px] font-mono text-[#64748B] block uppercase">PHONES (CDR)</span>
              <span className="text-[18px] font-bold text-[#F8FAFC] font-mono">{profile.associatedPhonesCount}</span>
            </div>
            <div className="p-3 rounded-[6px] bg-[#151D26] border border-[#26313D]">
              <span className="text-[10px] font-mono text-[#64748B] block uppercase">NETWORK NODES</span>
              <span className="text-[18px] font-bold text-[#F59E0B] font-mono">{profile.networkConnectionsCount}</span>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-[#26313D] gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Summary & Modus', icon: Shield },
              { id: 'history', label: `Case History (${profile.caseHistory.length})`, icon: FileText },
              { id: 'associates', label: `Associates (${profile.knownAssociates.length})`, icon: User },
              { id: 'vehicles', label: `Vehicles (${profile.vehicles.length})`, icon: Car },
              { id: 'phones', label: `Phone Numbers (${profile.phoneNumbers.length})`, icon: Phone },
              { id: 'locations', label: `Locations (${profile.locations.length})`, icon: MapPin },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2.5 text-[12px] font-medium border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-[#2DD4FF] text-[#2DD4FF] bg-[#2DD4FF]/5'
                      : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-[8px] bg-[#151D26] border border-[#26313D] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-[#F8FAFC]">Subject Identification & Aliases</h3>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    Known Aliases: <span className="text-[#2DD4FF]">{profile.aliases.join(', ')}</span>
                  </span>
                </div>
                <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                  {profile.notes}
                </p>
              </div>

              {/* Risk Indicators */}
              <div className="p-4 rounded-[8px] bg-[#151D26] border border-[#EF4444]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#EF4444]">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-[13px] font-bold uppercase tracking-wider font-mono">
                    Investigative Priority Assessment: {profile.riskIndicators.level.toUpperCase()}
                  </span>
                </div>
                <ul className="space-y-1 pl-6 list-disc text-[12px] text-[#CBD5E1]">
                  {profile.riskIndicators.factors.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Evidence Tags */}
              <div className="p-4 rounded-[8px] bg-[#151D26] border border-[#26313D] space-y-2">
                <span className="text-[11px] font-mono uppercase text-[#64748B] block">LINKED EVIDENCE IN CURRENT DOCKET</span>
                <div className="flex flex-wrap gap-2">
                  {profile.evidenceTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-[4px] bg-[#0F151C] border border-[#2DD4FF]/40 text-[#2DD4FF] text-[11px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase text-[#64748B]">CRIMINAL REGISTER DOCKETS</span>
              {profile.caseHistory.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="p-4 rounded-[8px] bg-[#151D26] border border-[#26313D] space-y-2 hover:border-[#2DD4FF]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[#F8FAFC] font-mono">{caseItem.firNumber}</span>
                      <span className="text-[11px] text-[#64748B]">• {caseItem.policeStation}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      caseItem.status === 'Active'
                        ? 'bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E]'
                        : caseItem.status === 'Under Investigation'
                        ? 'bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B]'
                        : 'bg-[#64748B]/15 border border-[#64748B]/40 text-[#94A3B8]'
                    }`}>
                      {caseItem.status}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#94A3B8]">
                    <strong className="text-[#F8FAFC]">Incident:</strong> {caseItem.incidentType} ({caseItem.date})
                  </div>
                  <div className="text-[12px] text-[#94A3B8]">
                    <strong className="text-[#2DD4FF]">Relationship to Current Case:</strong> {caseItem.relationshipToCurrentCase}
                  </div>
                  <div className="text-[11px] font-mono text-[#64748B] pt-1">
                    Sections: {caseItem.sections}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ASSOCIATES */}
          {activeTab === 'associates' && (
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase text-[#64748B]">IDENTIFIED NETWORK ASSOCIATES</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profile.knownAssociates.map((assoc) => (
                  <div key={assoc.id} className="p-4 rounded-[8px] bg-[#151D26] border border-[#26313D] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-[#F8FAFC]">{assoc.name}</span>
                      <span className="px-2 py-0.5 rounded bg-[#2DD4FF]/10 text-[#2DD4FF] text-[10px] font-mono">
                        {assoc.callCountWithSubject} CDR Calls
                      </span>
                    </div>
                    <div className="text-[12px] text-[#94A3B8] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#2DD4FF]" />
                      <span className="font-mono text-[#F8FAFC]">{assoc.phone}</span>
                    </div>
                    <p className="text-[12px] text-[#94A3B8] pt-1 border-t border-[#26313D]/60">
                      {assoc.relationship}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VEHICLES */}
          {activeTab === 'vehicles' && (
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase text-[#64748B]">LINKED AUTOMOBILES & MOTORCYCLES</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profile.vehicles.map((v, i) => (
                  <div key={i} className="p-4 rounded-[8px] bg-[#151D26] border border-[#26313D] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-mono font-bold text-[#F8FAFC] bg-[#0F151C] px-2 py-1 rounded border border-[#26313D]">
                        {v.plate}
                      </span>
                      <span className="text-[11px] text-[#2DD4FF]">{v.color}</span>
                    </div>
                    <div className="text-[13px] font-medium text-[#F8FAFC]">{v.makeModel}</div>
                    <div className="text-[11px] text-[#64748B]">Registered To: {v.registeredOwner}</div>
                    <p className="text-[12px] text-[#94A3B8] border-t border-[#26313D]/60 pt-1">
                      {v.relation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PHONES */}
          {activeTab === 'phones' && (
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase text-[#64748B]">TELEPHONY & SIM CARDS</span>
              <div className="space-y-2">
                {profile.phoneNumbers.map((p, i) => (
                  <div key={i} className="p-3.5 rounded-[8px] bg-[#151D26] border border-[#26313D] flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-mono font-bold text-[#F8FAFC]">{p.number}</span>
                        <span className="text-[11px] text-[#64748B]">({p.carrier})</span>
                      </div>
                      <span className="text-[11px] text-[#2DD4FF] block">{p.status}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[12px] font-mono text-[#F8FAFC] block">{p.callVolume} Calls</span>
                      <span className="text-[10px] font-mono text-[#64748B]">Last: {p.lastActive}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LOCATIONS */}
          {activeTab === 'locations' && (
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase text-[#64748B]">GEO-TRACKED PLACES OF INTEREST</span>
              <div className="space-y-2">
                {profile.locations.map((loc, i) => (
                  <div key={i} className="p-3.5 rounded-[8px] bg-[#151D26] border border-[#26313D] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[13px] font-semibold text-[#F8FAFC] block">{loc.name}</span>
                      <span className="text-[11px] text-[#2DD4FF]">{loc.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-[#94A3B8] block">{loc.frequency}</span>
                      <span className="text-[10px] font-mono text-[#64748B]">Last Seen: {loc.lastSeen}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#26313D] bg-[#151D26] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#64748B]">
            NetraX Criminal Intelligence Database • Synchronized
          </span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Dossier
          </Button>
        </div>
      </div>
    </div>
  );
};
