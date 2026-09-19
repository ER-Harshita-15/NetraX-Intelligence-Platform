import { CallRecord, CdrSummary } from '../types';
import { CASE_CDR_RECORDS, CASE_CDR_SUMMARY } from '../data/unifiedCaseData';

export interface CdrFilterState {
  searchQuery: string;
  callType: 'all' | 'incoming' | 'outgoing' | 'sms' | 'missed';
  towerLocation: string;
  onlySuspicious: boolean;
  minDurationSec: number;
}

export class CdrService {
  /**
   * Simulates processing an uploaded CDR spreadsheet or dump
   */
  static async processUploadedCdr(
    filename: string,
    onProgress: (stepIndex: number, label: string) => void
  ): Promise<{ records: CallRecord[]; summary: CdrSummary }> {
    const steps = [
      'Records imported (126,430 rows parsed)',
      'Phone numbers normalized to E.164 standard',
      'Duplicate cell tower telemetry removed',
      'High-frequency contacts and aliases identified',
      'Cell tower geospatial triangulation processed',
      'Network communication graph generated'
    ];

    for (let i = 0; i < steps.length; i++) {
      onProgress(i, steps[i]);
      await new Promise((r) => setTimeout(r, 380));
    }

    return {
      records: CASE_CDR_RECORDS,
      summary: CASE_CDR_SUMMARY
    };
  }

  /**
   * Filter records based on UI criteria
   */
  static filterRecords(records: CallRecord[], filter: CdrFilterState): CallRecord[] {
    return records.filter((rec) => {
      if (filter.onlySuspicious && !rec.isSuspicious) return false;
      if (filter.callType !== 'all' && rec.callType !== filter.callType) return false;
      if (filter.towerLocation && filter.towerLocation !== 'all') {
        if (!rec.cellTowerLocation.toLowerCase().includes(filter.towerLocation.toLowerCase())) {
          return false;
        }
      }
      if (filter.minDurationSec > 0 && rec.durationSec < filter.minDurationSec) {
        return false;
      }
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        const matchCaller = rec.callerNumber.toLowerCase().includes(query) || (rec.callerName || '').toLowerCase().includes(query);
        const matchReceiver = rec.receiverNumber.toLowerCase().includes(query) || (rec.receiverName || '').toLowerCase().includes(query);
        const matchTower = rec.cellTowerLocation.toLowerCase().includes(query) || rec.cellTowerId.toLowerCase().includes(query);
        const matchNotes = (rec.notes || '').toLowerCase().includes(query);
        if (!matchCaller && !matchReceiver && !matchTower && !matchNotes) return false;
      }
      return true;
    });
  }
}
