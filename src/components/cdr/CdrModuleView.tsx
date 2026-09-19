import React, { useState } from 'react';
import {
  Phone,
  Upload,
  Sparkles,
  CheckCircle2,
  Filter,
  Search,
  Radio,
  Clock,
  MapPin,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  MessageSquare,
  PhoneMissed,
  Share2,
  Download,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { CallRecord, CdrSummary } from '../../types';
import { CASE_CDR_RECORDS, CASE_CDR_SUMMARY } from '../../data/unifiedCaseData';
import { CdrService, CdrFilterState } from '../../services/cdrService';

export interface CdrModuleViewProps {
  initialRecords?: CallRecord[];
  initialSummary?: CdrSummary;
  onOpenNetworkView?: () => void;
  onSelectPerson?: (phone: string) => void;
}

export const CdrModuleView: React.FC<CdrModuleViewProps> = ({
  initialRecords = CASE_CDR_RECORDS,
  initialSummary = CASE_CDR_SUMMARY,
  onOpenNetworkView,
  onSelectPerson
}) => {
  const [records, setRecords] = useState<CallRecord[]>(initialRecords);
  const [summary, setSummary] = useState<CdrSummary>(initialSummary);
  const [activeTab, setActiveTab] = useState<'records' | 'timeline' | 'upload'>('records');

  // Processing checklist state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Filter State
  const [filters, setFilters] = useState<CdrFilterState>({
    searchQuery: '',
    callType: 'all',
    towerLocation: 'all',
    onlySuspicious: false,
    minDurationSec: 0
  });

  const handleUploadSampleCdr = async () => {
    setIsProcessing(true);
    setCompletedSteps([]);

    const result = await CdrService.processUploadedCdr('CDR_TOW_SEC12_14092026.csv', (stepIndex) => {
      setCompletedSteps((prev) => [...prev, stepIndex]);
    });

    setRecords(result.records);
    setSummary(result.summary);
    setIsProcessing(false);
    setActiveTab('records');
  };

  const filteredRecords = CdrService.filterRecords(records, filters);

  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case 'outgoing':
        return <ArrowUpRight className="w-3.5 h-3.5 text-[#2DD4FF]" />;
      case 'incoming':
        return <ArrowDownLeft className="w-3.5 h-3.5 text-[#22C55E]" />;
      case 'sms':
        return <MessageSquare className="w-3.5 h-3.5 text-[#F59E0B]" />;
      case 'missed':
        return <PhoneMissed className="w-3.5 h-3.5 text-[#EF4444]" />;
      default:
        return <Phone className="w-3.5 h-3.5 text-[#94A3B8]" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-[6px] bg-[#2DD4FF]/10 border border-[#2DD4FF]/30 text-[#2DD4FF]">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#2DD4FF] tracking-wider block">
              TELECOMMUNICATIONS INTELLIGENCE
            </span>
            <h2 className="text-[18px] font-bold text-[#F8FAFC]">
              Call Detail Records (CDR) & Tower Analysis
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 rounded-[6px] bg-[#151D26] border border-[#26313D]">
            <button
              onClick={() => setActiveTab('records')}
              className={`px-3 py-1.5 rounded-[4px] text-[12px] font-mono transition-colors cursor-pointer ${
                activeTab === 'records' ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              CDR Records Grid
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-[4px] text-[12px] font-mono transition-colors cursor-pointer ${
                activeTab === 'timeline' ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Communication Timeline
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 rounded-[4px] text-[12px] font-mono transition-colors cursor-pointer ${
                activeTab === 'upload' ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Upload / Ingest
            </button>
          </div>

          {onOpenNetworkView && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Share2 className="w-3.5 h-3.5" />}
              onClick={onOpenNetworkView}
            >
              View Network Graph
            </Button>
          )}
        </div>
      </div>

      {/* KPI Cards Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-[8px] bg-[#111820] border border-[#26313D]">
          <span className="text-[10px] font-mono text-[#64748B] block uppercase">TOTAL LOGGED CALLS</span>
          <span className="text-[20px] font-bold text-[#F8FAFC] font-mono">{summary.totalCalls}</span>
          <span className="text-[10px] text-[#22C55E] block mt-0.5">14 Sept incident window</span>
        </div>

        <div className="p-3.5 rounded-[8px] bg-[#111820] border border-[#26313D]">
          <span className="text-[10px] font-mono text-[#64748B] block uppercase">UNIQUE NUMBERS</span>
          <span className="text-[20px] font-bold text-[#2DD4FF] font-mono">{summary.uniqueNumbers}</span>
          <span className="text-[10px] text-[#94A3B8] block mt-0.5">3 syndicate contacts</span>
        </div>

        <div className="p-3.5 rounded-[8px] bg-[#111820] border border-[#26313D]">
          <span className="text-[10px] font-mono text-[#64748B] block uppercase">ACTIVE CELL TOWERS</span>
          <span className="text-[20px] font-bold text-[#F59E0B] font-mono">{summary.activeTowers}</span>
          <span className="text-[10px] text-[#94A3B8] block mt-0.5">Sector 12 → Railway Colony</span>
        </div>

        <div className="p-3.5 rounded-[8px] bg-[#111820] border border-[#26313D]">
          <span className="text-[10px] font-mono text-[#64748B] block uppercase">CALL DURATION (MIN)</span>
          <span className="text-[20px] font-bold text-[#F8FAFC] font-mono">{summary.totalDurationMin}</span>
          <span className="text-[10px] text-[#EF4444] block mt-0.5">High frequency pre-theft</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB: UPLOAD / INGESTION WITH ANIMATED CHECKLIST */}
      {/* ======================================================== */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div className="p-6 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-4">
            <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
              <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
                CDR File Ingestion (CSV / XLSX / PDF)
              </h3>
              <span className="text-[11px] font-mono text-[#64748B]">TELECOM PROVIDER INTERFACE</span>
            </div>

            <div className="border-2 border-dashed border-[#26313D] hover:border-[#2DD4FF]/60 rounded-[8px] p-8 text-center bg-[#0F151C]/60 flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#151D26] border border-[#26313D] flex items-center justify-center text-[#2DD4FF]">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[14px] font-medium text-[#F8FAFC] block">
                  Drop telecom operator CDR dump here
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Format supports Airtel, Jio, Vi, BSNL tower logs with IMEI, IMSI & Cell ID coordinates.
                </span>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={handleUploadSampleCdr}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing CDR Logs...' : 'Ingest & Process Sample CDR'}
                </Button>
              </div>
            </div>

            {/* CDR Processing Checklist */}
            <div className="p-5 rounded-[8px] bg-[#151D26] border border-[#26313D] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-mono uppercase font-bold text-[#F8FAFC]">
                  CDR PROCESSING ENGINE CHECKLIST
                </span>
                <span className="text-[10px] font-mono text-[#2DD4FF]">
                  {completedSteps.length} / 6 PROTOCOLS VERIFIED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {[
                  'Records imported (126,430 rows)',
                  'Phone numbers normalized (E.164)',
                  'Duplicate records removed',
                  'Contacts & aliases identified',
                  'Location data & cell towers processed',
                  'Network communication graph generated'
                ].map((step, idx) => {
                  const isDone = completedSteps.includes(idx) || completedSteps.length === 6 || !isProcessing;
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-[6px] border text-[11px] font-mono flex items-center gap-2.5 transition-colors ${
                        isDone
                          ? 'bg-[#22C55E]/10 border-[#22C55E]/40 text-[#22C55E]'
                          : 'bg-[#0F151C] border-[#26313D] text-[#64748B]'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-[#22C55E]' : 'text-[#64748B]'}`} />
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB: CDR RECORDS GRID & FILTERING */}
      {/* ======================================================== */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-[8px] bg-[#111820] border border-[#26313D] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Filter by caller, receiver, phone number, tower..."
                className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-1.5 text-[12px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Call Type Dropdown */}
              <select
                value={filters.callType}
                onChange={(e) => setFilters({ ...filters, callType: e.target.value as any })}
                className="bg-[#0F151C] border border-[#26313D] rounded-[6px] px-2.5 py-1.5 text-[11px] font-mono text-[#F8FAFC] outline-none"
              >
                <option value="all">All Types</option>
                <option value="outgoing">Outgoing</option>
                <option value="incoming">Incoming</option>
                <option value="sms">SMS</option>
                <option value="missed">Missed</option>
              </select>

              {/* Tower Filter */}
              <select
                value={filters.towerLocation}
                onChange={(e) => setFilters({ ...filters, towerLocation: e.target.value })}
                className="bg-[#0F151C] border border-[#26313D] rounded-[6px] px-2.5 py-1.5 text-[11px] font-mono text-[#F8FAFC] outline-none"
              >
                <option value="all">All Cell Towers</option>
                <option value="Sector 12">Sector 12 Plaza Tower</option>
                <option value="North Avenue">North Avenue Crossing</option>
                <option value="Industrial">Industrial Expressway</option>
                <option value="Railway">Railway Colony Tower</option>
              </select>

              {/* Suspicious Toggle */}
              <button
                onClick={() => setFilters({ ...filters, onlySuspicious: !filters.onlySuspicious })}
                className={`px-2.5 py-1.5 rounded-[6px] border text-[11px] font-mono flex items-center gap-1.5 cursor-pointer ${
                  filters.onlySuspicious
                    ? 'bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444] font-bold'
                    : 'bg-[#0F151C] border-[#26313D] text-[#94A3B8]'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Flagged Calls Only
              </button>
            </div>
          </div>

          {/* Records Table */}
          <div className="rounded-[8px] bg-[#111820] border border-[#26313D] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#151D26] border-b border-[#26313D] text-[10px] font-mono uppercase text-[#64748B]">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Caller</th>
                    <th className="px-4 py-3">Receiver</th>
                    <th className="px-4 py-3">Duration</th>
                    <th className="px-4 py-3">Cell Tower & Location</th>
                    <th className="px-4 py-3">Investigative Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#26313D]">
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className={`hover:bg-[#151D26]/60 transition-colors ${
                        record.isSuspicious ? 'bg-[#EF4444]/5' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          {getCallTypeIcon(record.callType)}
                          <span className="capitalize">{record.callType}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-[#CBD5E1]">
                        {record.dateTime}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-mono text-[#F8FAFC] font-medium">{record.callerNumber}</div>
                        {record.callerName && (
                          <span className="text-[10px] text-[#2DD4FF] block">{record.callerName}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-mono text-[#F8FAFC] font-medium">{record.receiverNumber}</div>
                        {record.receiverName && (
                          <span className="text-[10px] text-[#F59E0B] block">{record.receiverName}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-[#CBD5E1]">
                        {record.durationFormatted}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-[#F8FAFC]">
                          <MapPin className="w-3 h-3 text-[#2DD4FF]" />
                          <span>{record.cellTowerLocation}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#64748B] block">
                          ID: {record.cellTowerId}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {record.notes && (
                          <span className="text-[11px] text-[#94A3B8] italic">
                            {record.notes}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-[#151D26] border-t border-[#26313D] text-[11px] font-mono text-[#64748B] flex items-center justify-between">
              <span>Showing {filteredRecords.length} of {records.length} records</span>
              <span>Cell Tower Coordinates Mapped to Sector 12 Grid</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB: CHRONOLOGICAL COMMUNICATION TIMELINE */}
      {/* ======================================================== */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-6">
          <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2DD4FF]" />
              <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
                Chronological Communication Sequence (14 Sept 2026)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#64748B]">THEFT TIME-WINDOW SYNCHRONIZED</span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#26313D]">
            {records.map((rec) => (
              <div key={rec.id} className="relative group">
                {/* Node dot */}
                <div className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#0B0F14] ${
                  rec.isSuspicious ? 'bg-[#EF4444]' : 'bg-[#2DD4FF]'
                }`} />

                <div className="p-4 rounded-[6px] bg-[#0F151C] border border-[#26313D] group-hover:border-[#2DD4FF]/40 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-[13px] font-bold text-[#2DD4FF]">{rec.time} IST</span>
                      <span className="text-[#64748B]">•</span>
                      <span className="text-[12px] text-[#F8FAFC]">{rec.cellTowerLocation}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#151D26] text-[#CBD5E1]">
                      Duration: {rec.durationFormatted}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[12px]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#64748B] uppercase block">CALLER</span>
                      <span className="font-mono font-bold text-[#F8FAFC]">{rec.callerName || rec.callerNumber}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[#64748B] uppercase block">RECEIVER</span>
                      <span className="font-mono font-bold text-[#F59E0B]">{rec.receiverName || rec.receiverNumber}</span>
                    </div>
                  </div>

                  {rec.notes && (
                    <div className="text-[11px] text-[#94A3B8] pt-1.5 border-t border-[#26313D]/60 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />
                      <span>{rec.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
