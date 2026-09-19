export interface SearchResultItem {
  id: string;
  category: 'case' | 'fir' | 'person' | 'vehicle' | 'phone' | 'cctv' | 'location';
  title: string;
  subtitle: string;
  badge: string;
  linkAction: {
    view: string;
    tab?: string;
    entityId?: string;
  };
}

const GLOBAL_SEARCH_REGISTRY: SearchResultItem[] = [
  {
    id: 's-case-1024',
    category: 'case',
    title: 'CASE #NX-1024 — Vehicle Theft',
    subtitle: 'Sector 12 • White SUV • Active High Priority',
    badge: 'ACTIVE CASE',
    linkAction: { view: 'case-overview', tab: 'overview' }
  },
  {
    id: 's-fir-102',
    category: 'fir',
    title: 'FIR No. 102/2026',
    subtitle: 'PS City Kotwali, Bilaspur • Sec 379, 120B IPC',
    badge: 'FIR DOCUMENT',
    linkAction: { view: 'case-overview', tab: 'fir' }
  },
  {
    id: 's-fir-219',
    category: 'fir',
    title: 'FIR No. 219/2025',
    subtitle: 'PS Civil Lines • Armed Robbery / Hijacking',
    badge: 'PREVIOUS DOCKET',
    linkAction: { view: 'case-overview', tab: 'history' }
  },
  {
    id: 's-person-rahul',
    category: 'person',
    title: 'Rahul Sharma (alias Raju)',
    subtitle: 'Primary Suspect • 4 Prior Cases • 7 Related FIRs',
    badge: 'CRIMINAL RECORD',
    linkAction: { view: 'case-overview', tab: 'history', entityId: 'person-rahul-sharma' }
  },
  {
    id: 's-person-vikram',
    category: 'person',
    title: 'Vikram Singh (alias Vicky)',
    subtitle: 'Associate • 15 Calls in CDR • Route Coordinator',
    badge: 'ASSOCIATE',
    linkAction: { view: 'case-overview', tab: 'network', entityId: 'assoc-1' }
  },
  {
    id: 's-person-amit',
    category: 'person',
    title: 'Amit Verma (alias Sonu)',
    subtitle: 'Scrap Yard Owner • Bilaspur Auto Salvage',
    badge: 'RECEIVER',
    linkAction: { view: 'case-overview', tab: 'network', entityId: 'assoc-2' }
  },
  {
    id: 's-veh-cg10',
    category: 'vehicle',
    title: 'CG 10 AB 1234',
    subtitle: 'White SUV • Reported Stolen • 4 Optical Detections',
    badge: 'TARGET VEHICLE',
    linkAction: { view: 'case-overview', tab: 'surveillance' }
  },
  {
    id: 's-phone-rahul',
    category: 'phone',
    title: '+91 98271-40291',
    subtitle: 'Jio 4G • 23 Calls • Sector 12 Tower to Railway Rd',
    badge: 'CDR INTERCEPT',
    linkAction: { view: 'case-overview', tab: 'calls' }
  },
  {
    id: 's-phone-vikram',
    category: 'phone',
    title: '+91 97520-88123',
    subtitle: 'Airtel Chhattisgarh • 15 Calls With Suspect',
    badge: 'CDR INTERCEPT',
    linkAction: { view: 'case-overview', tab: 'calls' }
  },
  {
    id: 's-cam-17',
    category: 'cctv',
    title: 'Camera C-17 — North Avenue',
    subtitle: '94% Plate OCR Match • 20:43 Speed 54 km/h',
    badge: 'CCTV NODE',
    linkAction: { view: 'case-overview', tab: 'surveillance' }
  },
  {
    id: 's-loc-sec12',
    category: 'location',
    title: 'Sector 12 North Plaza Parking',
    subtitle: 'Incident Point of Occurrence • Camera C-04 Coverage',
    badge: 'CRIME SCENE',
    linkAction: { view: 'case-overview', tab: 'overview' }
  }
];

export class SearchService {
  static search(query: string): SearchResultItem[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return GLOBAL_SEARCH_REGISTRY.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
    });
  }
}
