import {
  CaseUnifiedFile,
  FIRRecord,
  CallRecord,
  CdrSummary,
  PersonProfile,
  CriminalCaseRecord,
  EvidenceCorrelationStep,
  NetworkGraphData,
  AiInsight
} from '../types';

export const CASE_NX_1024_FIR: FIRRecord = {
  id: 'fir-102-2026',
  caseId: 'case-1024',
  firNumber: '102/2026',
  policeStation: 'City Kotwali',
  district: 'Bilaspur',
  state: 'Chhattisgarh',
  date: '14/09/2026',
  time: '20:15 IST',
  incidentType: 'Vehicle Theft / Criminal Conspiracy',
  sectionsActs: ['Section 379 IPC (Theft)', 'Section 120B IPC (Criminal Conspiracy)', 'Section 411 IPC (Stolen Property)'],
  complainant: 'Rajesh Kumar S/o M. L. Kumar (R/o Sector 12, Bilaspur)',
  victim: 'Rajesh Kumar',
  accused: 'Unknown (Suspect identified as Rahul Sharma alias Raju in subsequent inquiry)',
  witnesses: ['Sunil Verma (Security Guard, North Plaza)', 'Deepak Sahu (Shopkeeper, Shop #14)'],
  incidentLocation: 'Commercial North Plaza Parking, Sector 12, Bilaspur',
  incidentDescription:
    'Complainant parked his White SUV (Registration No. CG 10 AB 1234) in North Plaza open parking at approximately 19:30 hours. Upon returning at 20:10 hours, vehicle was found missing. CCTV footage at exit booth showed an unidentified male in black jacket driving away towards Market Road.',
  investigatingOfficer: 'Inspector A. K. Sharma (Badge #7492)',
  additionalNotes:
    'Vehicle fitted with RFID toll pass. Vehicle matches description of prior thefts reported in Civil Lines jurisdiction.',
  languageDetected: 'Hindi',
  ocrConfidence: 98.4,
  scannedDocumentName: 'FIR_102_2026_Kotwali_Bilingual.pdf',
  scannedDocumentSize: '3.4 MB',
  originalText: `प्रथम सूचना विवरण (अन्तर्गत धारा 154 दं.प्र.सं.)
थाना: नगर कोतवाली, जिला: बिलासपुर (छ.ग.)
प्र.सू.रि. क्रमांक: 102/2026
दिनांक व समय: 14/09/2026, समय 20:15 बजे
घटना का स्थान: सेक्टर 12, कमर्शियल नॉर्थ प्लाजा पार्किंग, बिलासपुर
वादी: राजेश कुमार आत्मज एम.एल. कुमार, निवासी सेक्टर 12, बिलासपुर (मो. 98261-09482)
अभियुक्त: अज्ञात (सफेद एसयूवी वाहन क्रमांक CG 10 AB 1234 चोरी कर ले जाने वाला)
धाराएं: धारा 379, 120-बी, 411 भा.दं.वि. (IPC)

विवरण: प्रार्थी राजेश कुमार ने उपस्थित थाना आकर लिखित आवेदन पेश किया कि आज दिनांक 14/09/2026 को समय लगभग 19:30 बजे अपना चार पहिया वाहन सफेद एसयूवी (रजिस्ट्रेशन CG 10 AB 1234) को सेक्टर 12 नॉर्थ प्लाजा पार्किंग में खड़ा किया था। समय करीब 20:10 बजे वापस आने पर वाहन मौके पर नहीं मिला। आसपास तलाश किया, सुरक्षा गार्ड सुनील वर्मा से पूछताछ पर ज्ञात हुआ कि एक अज्ञात व्यक्ति काले रंग की जैकेट पहने उक्त वाहन को मुख्य मार्ग की ओर तेजी से ले गया। प्राधिकृत सीसीटीवी कैमरा जांच व विधिक कार्यवाही हेतु रिपोर्ट दर्ज की जाती है।`,
  translatedText: `FIRST INFORMATION REPORT (Under Section 154 Cr.P.C.)
Police Station: City Kotwali, District: Bilaspur (C.G.)
FIR Number: 102/2026
Date & Time: 14/09/2026 at 20:15 IST
Place of Incident: Commercial North Plaza Parking, Sector 12, Bilaspur
Complainant: Rajesh Kumar S/o M. L. Kumar, R/o Sector 12, Bilaspur (Mobile: +91 98261-09482)
Accused: Unknown (Perpetrator involved in theft of White SUV bearing Registration CG 10 AB 1234)
Applicable Sections: Sections 379, 120-B, 411 Indian Penal Code (IPC)

Narrative Summary: Complainant Rajesh Kumar presented in person at the police station stating that on 14/09/2026 at approx 19:30 hrs, he parked his four-wheeled vehicle (White SUV, Registration No. CG 10 AB 1234) at Sector 12 North Plaza open parking. Upon return at 20:10 hrs, the vehicle was missing. Inquiries with on-duty security guard Sunil Verma revealed an unidentified male in a black jacket drove the vehicle away at high speed towards Market Road Arterial. Recorded for optical surveillance scanning and legal prosecution.`,
  extractedFields: [
    { label: 'FIR Number', value: '102/2026', confidence: 99.2, key: 'firNumber', isEditable: true },
    { label: 'Police Station', value: 'City Kotwali', confidence: 98.6, key: 'policeStation', isEditable: true },
    { label: 'District', value: 'Bilaspur', confidence: 99.0, key: 'district', isEditable: true },
    { label: 'Date of Incident', value: '14/09/2026', confidence: 98.8, key: 'date', isEditable: true },
    { label: 'Time of Incident', value: '19:30 - 20:10 IST', confidence: 96.5, key: 'time', isEditable: true },
    { label: 'Complainant', value: 'Rajesh Kumar', confidence: 97.8, key: 'complainant', isEditable: true },
    { label: 'Accused (Initial)', value: 'Unknown', confidence: 94.2, key: 'accused', isEditable: true },
    { label: 'Identified Suspect', value: 'Rahul Sharma (alias Raju)', confidence: 92.4, key: 'suspect', isEditable: true },
    { label: 'Sections / Acts', value: '379, 120B, 411 IPC', confidence: 98.1, key: 'sections', isEditable: true },
    { label: 'Vehicle Stolen', value: 'White SUV (CG 10 AB 1234)', confidence: 99.4, key: 'vehicle', isEditable: true },
    { label: 'Location', value: 'North Plaza Parking, Sector 12', confidence: 97.2, key: 'location', isEditable: true },
  ],
  extractedEntities: [
    { id: 'ent-1', type: 'person', value: 'Rajesh Kumar', confidence: 98, context: 'Complainant / Registered Owner', linkedRecordCount: 1 },
    { id: 'ent-2', type: 'accused', value: 'Rahul Sharma (alias Raju)', confidence: 93, context: 'Identified Suspect / Prior Vehicle Offender', linkedRecordCount: 4, highlight: true },
    { id: 'ent-3', type: 'witness', value: 'Sunil Verma', confidence: 95, context: 'Security Guard eyewitness', linkedRecordCount: 1 },
    { id: 'ent-4', type: 'vehicle', value: 'CG 10 AB 1234 (White SUV)', confidence: 99, context: 'Stolen Target Vehicle', linkedRecordCount: 4, highlight: true },
    { id: 'ent-5', type: 'phone', value: '+91 98271-40291', confidence: 94, context: 'Primary active phone of suspect', linkedRecordCount: 23, highlight: true },
    { id: 'ent-6', type: 'phone', value: '+91 97520-88123', confidence: 91, context: 'Associate (Vikram Singh) contact', linkedRecordCount: 15, highlight: true },
    { id: 'ent-7', type: 'location', value: 'Sector 12 North Plaza', confidence: 98, context: 'Point of theft occurrence', linkedRecordCount: 3 },
    { id: 'ent-8', type: 'location', value: 'Market Road Arterial', confidence: 95, context: 'Egress passage observed by guard', linkedRecordCount: 5 },
    { id: 'ent-9', type: 'police_station', value: 'City Kotwali Police Station', confidence: 99, context: 'Jurisdiction of Registration', linkedRecordCount: 48 },
    { id: 'ent-10', type: 'section', value: '379 IPC, 120B IPC, 411 IPC', confidence: 98, context: 'Indian Penal Code Penal Provisions', linkedRecordCount: 12 },
    { id: 'ent-11', type: 'case', value: 'FIR 102/2026', confidence: 99, context: 'Current investigation reference', linkedRecordCount: 8, highlight: true }
  ],
  status: 'verified',
  createdAt: '14 Sept 2026, 20:25'
};

export const PREVIOUS_CASES_HISTORY: CriminalCaseRecord[] = [
  {
    id: 'prev-1',
    firNumber: 'FIR #084/2024',
    incidentType: 'Vehicle Theft (Motorcycle & Sedan)',
    policeStation: 'City Kotwali',
    date: '18 March 2024',
    status: 'Closed',
    relationshipToCurrentCase: 'Same accused (Rahul Sharma) convicted of vehicle lifting in Sector 12 commercial zone; released on bail Jan 2025.',
    summary: 'Subject operated duplicate key electronic bypass tools to steal vehicles from unguarded commercial parking lots.',
    sections: '379, 411 IPC'
  },
  {
    id: 'prev-2',
    firNumber: 'FIR #219/2025',
    incidentType: 'Armed Robbery & Vehicle Hijacking',
    policeStation: 'Civil Lines',
    date: '22 November 2025',
    status: 'Under Investigation',
    relationshipToCurrentCase: 'Same phone number (+91 98271-40291) intercepted in tower CDR communications with associate Vikram Singh.',
    summary: 'Organized syndicate intercepted transport vehicle. Escaped in getaway vehicle with counterfeit registration plates.',
    sections: '392, 397, 120B IPC'
  },
  {
    id: 'prev-3',
    firNumber: 'FIR #102/2026',
    incidentType: 'Vehicle Theft / Organized Syndicate',
    policeStation: 'City Kotwali',
    date: '14 September 2026',
    status: 'Active',
    relationshipToCurrentCase: 'Current Active Investigation. Optical OCR match on White SUV and phone cell tower synchronization.',
    summary: 'Target vehicle CG 10 AB 1234 stolen from Sector 12 and tracked through 4 optical surveillance checkpoints.',
    sections: '379, 120B, 411 IPC'
  }
];

export const PRIMARY_SUSPECT_PROFILE: PersonProfile = {
  id: 'person-rahul-sharma',
  name: 'Rahul Sharma',
  aliases: ['Rahul', 'Raju Loha', 'R.K.'],
  role: 'Suspect',
  previousCasesCount: 4,
  relatedFirsCount: 7,
  knownLocationsCount: 3,
  associatedVehiclesCount: 2,
  associatedPhonesCount: 4,
  networkConnectionsCount: 12,
  caseHistory: PREVIOUS_CASES_HISTORY,
  knownAssociates: [
    {
      id: 'assoc-1',
      name: 'Vikram Singh (alias Vicky)',
      relationship: 'Frequent CDR communicant (15 calls during incident window)',
      phone: '+91 97520-88123',
      callCountWithSubject: 15
    },
    {
      id: 'assoc-2',
      name: 'Amit Verma (alias Sonu)',
      relationship: 'Receiver of stolen auto parts / Scrap yard owner',
      phone: '+91 91310-55442',
      callCountWithSubject: 8
    },
    {
      id: 'assoc-3',
      name: 'Suresh Patel',
      relationship: 'Driver / Lookout identified in Sector 12 CCTV vicinity',
      phone: '+91 98934-22019',
      callCountWithSubject: 6
    }
  ],
  vehicles: [
    {
      plate: 'CG 10 AB 1234',
      makeModel: 'White SUV (Target)',
      color: 'Pearl White',
      registeredOwner: 'Rajesh Kumar (Reported Stolen)',
      relation: 'Subject observed driving vehicle on CCTV Cam C-17 at 20:43 hrs'
    },
    {
      plate: 'CG 04 MZ 7721',
      makeModel: 'Black Pulsar 220',
      color: 'Midnight Black',
      registeredOwner: 'Rahul Sharma',
      relation: 'Used for surveillance and reconnaissance of parking lots'
    }
  ],
  phoneNumbers: [
    {
      number: '+91 98271-40291',
      carrier: 'Jio Telecom Bilaspur',
      status: 'Active (Tower Sector 12 → Railway Rd)',
      callVolume: 23,
      lastActive: '14 Sept 2026, 21:18'
    },
    {
      number: '+91 94062-11849',
      carrier: 'BSNL Chhattisgarh',
      status: 'Secondary SIM (IMEI bound)',
      callVolume: 5,
      lastActive: '12 Sept 2026, 14:02'
    },
    {
      number: '+91 70001-99234',
      carrier: 'Airtel',
      status: 'Inactive (Previous Case #084/2024)',
      callVolume: 42,
      lastActive: '18 March 2024'
    }
  ],
  locations: [
    {
      name: 'Commercial Plaza Sector 12',
      type: 'Incident Area',
      frequency: 'High (3 visits in 48 hrs)',
      lastSeen: '14 Sept 2026, 20:08'
    },
    {
      name: 'Railway Colony Road, Yard 4',
      type: 'Stash / Safehouse Area',
      frequency: 'Frequent night pings',
      lastSeen: '14 Sept 2026, 21:05'
    },
    {
      name: 'Industrial Zone Bypass Overpass',
      type: 'Transit Route',
      frequency: 'Escape trajectory',
      lastSeen: '14 Sept 2026, 20:54'
    }
  ],
  evidenceTags: ['CCTV Optical Match 94%', 'Plate OCR 96.8%', 'CDR Tower Correlation', 'Prior Conviction Records'],
  riskIndicators: {
    level: 'high',
    factors: [
      'Multiple repeat motor vehicle lifting convictions in Bilaspur & Raipur',
      'Coordinated communication with organized chop-shop syndicate',
      'Possession of electronic OBD scanning / key duplication instruments'
    ]
  },
  notes:
    'Subject appears in criminal database under Modus Operandi "Commercial Lot Vehicle Theft". Reference to records is based on corroborating optical match and simultaneous cell-tower handover telemetry.'
};

export const CASE_CDR_RECORDS: CallRecord[] = [
  {
    id: 'cdr-1',
    callerNumber: '+91 98271-40291',
    callerName: 'Rahul Sharma (Suspect)',
    receiverNumber: '+91 97520-88123',
    receiverName: 'Vikram Singh (Associate)',
    dateTime: '14/09/2026 19:15:20',
    time: '19:15',
    durationSec: 142,
    durationFormatted: '02:22',
    callType: 'outgoing',
    cellTowerId: 'TOW-SEC12-A',
    cellTowerLocation: 'Sector 12 Plaza Tower',
    isSuspicious: true,
    notes: 'Pre-theft reconnaissance call'
  },
  {
    id: 'cdr-2',
    callerNumber: '+91 98934-22019',
    callerName: 'Suresh Patel (Lookout)',
    receiverNumber: '+91 98271-40291',
    receiverName: 'Rahul Sharma (Suspect)',
    dateTime: '14/09/2026 19:42:10',
    time: '19:42',
    durationSec: 38,
    durationFormatted: '00:38',
    callType: 'incoming',
    cellTowerId: 'TOW-SEC12-A',
    cellTowerLocation: 'Sector 12 Plaza Tower',
    isSuspicious: true,
    notes: 'Lookout confirmation: Target parked'
  },
  {
    id: 'cdr-3',
    callerNumber: '+91 98271-40291',
    callerName: 'Rahul Sharma (Suspect)',
    receiverNumber: '+91 97520-88123',
    receiverName: 'Vikram Singh (Associate)',
    dateTime: '14/09/2026 20:12:44',
    time: '20:12',
    durationSec: 195,
    durationFormatted: '03:15',
    callType: 'outgoing',
    cellTowerId: 'TOW-SEC12-B',
    cellTowerLocation: 'North Avenue Crossing',
    isSuspicious: true,
    notes: 'Vehicle accessed; initiating movement'
  },
  {
    id: 'cdr-4',
    callerNumber: '+91 97520-88123',
    callerName: 'Vikram Singh (Associate)',
    receiverNumber: '+91 91310-55442',
    receiverName: 'Amit Verma (Scrap/Receiver)',
    dateTime: '14/09/2026 20:28:15',
    time: '20:28',
    durationSec: 102,
    durationFormatted: '01:42',
    callType: 'outgoing',
    cellTowerId: 'TOW-MKT-03',
    cellTowerLocation: 'Main Market Road Tower',
    isSuspicious: true,
    notes: 'Secondary coordination to receiver'
  },
  {
    id: 'cdr-5',
    callerNumber: '+91 98271-40291',
    callerName: 'Rahul Sharma (Suspect)',
    receiverNumber: '+91 97520-88123',
    receiverName: 'Vikram Singh (Associate)',
    dateTime: '14/09/2026 20:44:02',
    time: '20:44',
    durationSec: 432,
    durationFormatted: '07:12',
    callType: 'outgoing',
    cellTowerId: 'TOW-IND-09',
    cellTowerLocation: 'Industrial Expressway Tower',
    isSuspicious: true,
    notes: 'Synchronized with Camera C-17 optical detection'
  },
  {
    id: 'cdr-6',
    callerNumber: '+91 98271-40291',
    callerName: 'Rahul Sharma (Suspect)',
    receiverNumber: '+91 91310-55442',
    receiverName: 'Amit Verma (Scrap/Receiver)',
    dateTime: '14/09/2026 21:04:55',
    time: '21:04',
    durationSec: 88,
    durationFormatted: '01:28',
    callType: 'outgoing',
    cellTowerId: 'TOW-RLW-02',
    cellTowerLocation: 'Railway Colony Tower',
    isSuspicious: true,
    notes: 'Arrival at safe staging facility'
  },
  {
    id: 'cdr-7',
    callerNumber: '+91 98271-40291',
    callerName: 'Rahul Sharma (Suspect)',
    receiverNumber: '+91 98261-09482',
    receiverName: 'Unknown (Incoming ping)',
    dateTime: '14/09/2026 21:18:00',
    time: '21:18',
    durationSec: 0,
    durationFormatted: 'Missed',
    callType: 'missed',
    cellTowerId: 'TOW-RLW-02',
    cellTowerLocation: 'Railway Colony Tower',
    isSuspicious: false,
    notes: 'Unanswered incoming attempt'
  }
];

export const CASE_CDR_SUMMARY: CdrSummary = {
  totalCalls: 23,
  totalDurationMin: 48.6,
  uniqueNumbers: 5,
  activeTowers: 4,
  dateRange: '14 Sept 2026 (18:00 - 22:00 IST)',
  topCommunicators: [
    { number: '+91 98271-40291', name: 'Rahul Sharma (Suspect)', callsCount: 14, durationMin: 29.4 },
    { number: '+91 97520-88123', name: 'Vikram Singh (Associate)', callsCount: 12, durationMin: 22.8 },
    { number: '+91 91310-55442', name: 'Amit Verma (Receiver)', callsCount: 5, durationMin: 8.2 },
    { number: '+91 98934-22019', name: 'Suresh Patel (Lookout)', callsCount: 4, durationMin: 4.5 }
  ]
};

export const CASE_NETWORK_DATA: NetworkGraphData = {
  nodes: [
    {
      id: 'node-rahul',
      label: 'Rahul Sharma',
      sublabel: 'Primary Suspect',
      type: 'person',
      category: 'Accused',
      callsCount: 23,
      uniqueContacts: 7,
      relatedCases: 4,
      lastActivity: '14 Sept 2026, 21:04',
      phone: '+91 98271-40291',
      x: 350,
      y: 220,
      isFocus: true,
      details: {
        Aliases: 'Rahul / Raju',
        'Previous FIRs': 4,
        'Risk Level': 'HIGH'
      }
    },
    {
      id: 'node-vikram',
      label: 'Vikram Singh',
      sublabel: 'Associate / Coordinator',
      type: 'person',
      category: 'Associate',
      callsCount: 15,
      uniqueContacts: 4,
      relatedCases: 2,
      lastActivity: '14 Sept 2026, 20:44',
      phone: '+91 97520-88123',
      x: 180,
      y: 130,
      details: {
        Role: 'Route Coordinator',
        'Calls with Subject': 12
      }
    },
    {
      id: 'node-amit',
      label: 'Amit Verma',
      sublabel: 'Receiver / Scrap Dealer',
      type: 'person',
      category: 'Receiver',
      callsCount: 8,
      uniqueContacts: 3,
      relatedCases: 3,
      lastActivity: '14 Sept 2026, 21:05',
      phone: '+91 91310-55442',
      x: 520,
      y: 120,
      details: {
        Business: 'Bilaspur Auto Salvage',
        'Linked FIRs': 'FIR 219/2025'
      }
    },
    {
      id: 'node-suresh',
      label: 'Suresh Patel',
      sublabel: 'Lookout Eyewitness Area',
      type: 'person',
      category: 'Associate',
      callsCount: 6,
      uniqueContacts: 2,
      relatedCases: 1,
      lastActivity: '14 Sept 2026, 19:42',
      phone: '+91 98934-22019',
      x: 160,
      y: 330,
      details: {
        Location: 'Sector 12 Plaza',
        Role: 'Target Spotter'
      }
    },
    {
      id: 'node-vehicle',
      label: 'CG 10 AB 1234',
      sublabel: 'White SUV (Stolen)',
      type: 'vehicle',
      category: 'Stolen Asset',
      x: 350,
      y: 370,
      details: {
        Make: 'White SUV',
        'Registered To': 'Rajesh Kumar',
        'CCTV Matches': '4 Cameras'
      }
    },
    {
      id: 'node-phone-primary',
      label: '+91 98271-40291',
      sublabel: 'Primary Subject Phone',
      type: 'phone',
      category: 'Telephony',
      x: 490,
      y: 280,
      details: {
        Tower: 'Sector 12 → Railway Rd',
        SIM: 'Jio 4G'
      }
    },
    {
      id: 'node-case-prev',
      label: 'FIR #219/2025',
      sublabel: 'Civil Lines Robbery',
      type: 'case',
      category: 'Prior Case',
      x: 540,
      y: 400,
      details: {
        Status: 'Under Investigation',
        Modus: 'Vehicle hijacking'
      }
    },
    {
      id: 'node-location',
      label: 'Railway Colony Yard',
      sublabel: 'Stash Location',
      type: 'location',
      category: 'Geospatial',
      x: 350,
      y: 70,
      details: {
        Coordinates: '22.0797° N, 82.1409° E',
        'Tower ID': 'TOW-RLW-02'
      }
    }
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-rahul',
      target: 'node-vikram',
      type: 'call',
      label: '12 Calls (24m)',
      callCount: 12,
      weight: 4
    },
    {
      id: 'edge-2',
      source: 'node-rahul',
      target: 'node-amit',
      type: 'call',
      label: '5 Calls (8m)',
      callCount: 5,
      weight: 3
    },
    {
      id: 'edge-3',
      source: 'node-rahul',
      target: 'node-suresh',
      type: 'call',
      label: '4 Calls (4m)',
      callCount: 4,
      weight: 2
    },
    {
      id: 'edge-4',
      source: 'node-vikram',
      target: 'node-amit',
      type: 'call',
      label: '3 Calls (5m)',
      callCount: 3,
      weight: 2
    },
    {
      id: 'edge-5',
      source: 'node-rahul',
      target: 'node-vehicle',
      type: 'shared_vehicle',
      label: 'Driver (CCTV Optical Match 94%)',
      weight: 5
    },
    {
      id: 'edge-6',
      source: 'node-rahul',
      target: 'node-phone-primary',
      type: 'shared_vehicle',
      label: 'Registered Subscriber',
      weight: 4
    },
    {
      id: 'edge-7',
      source: 'node-phone-primary',
      target: 'node-case-prev',
      type: 'shared_case',
      label: 'Intercepted in CDR of FIR #219/2025',
      weight: 3
    },
    {
      id: 'edge-8',
      source: 'node-rahul',
      target: 'node-location',
      type: 'shared_location',
      label: 'Final CDR Tower Handover (21:05)',
      weight: 3
    }
  ]
};

export const EVIDENCE_CORRELATION_CHAIN: EvidenceCorrelationStep[] = [
  {
    step: 1,
    source: 'FIR',
    title: 'Incident Registration & Details',
    entityValue: 'FIR No. 102/2026 (City Kotwali)',
    description: 'Complainant Rajesh Kumar reports theft of White SUV from Sector 12 North Plaza open parking.',
    confidence: 99,
    iconType: 'fir',
    targetTab: 'fir'
  },
  {
    step: 2,
    source: 'PERSON',
    title: 'Accused Modus Match',
    entityValue: 'Rahul Sharma (alias Raju)',
    description: 'Known auto-lifter profile flagged by system based on parking lot electronic bypass modus operandi.',
    confidence: 93,
    iconType: 'person',
    targetTab: 'history'
  },
  {
    step: 3,
    source: 'PHONE',
    title: 'Primary Phone Extracted',
    entityValue: '+91 98271-40291 (Jio 4G)',
    description: 'Subscriber number tied to suspect IMEI extracted from police intelligence registry.',
    confidence: 96,
    iconType: 'phone',
    targetTab: 'calls'
  },
  {
    step: 4,
    source: 'CDR',
    title: 'CDR Tower Handover Analyzed',
    entityValue: '23 Communications (Sector 12 → Industrial Bypass)',
    description: 'Tower records establish active voice calls during theft time window with tower pings tracking northeastward.',
    confidence: 95,
    iconType: 'cdr',
    targetTab: 'calls'
  },
  {
    step: 5,
    source: 'ASSOCIATE',
    title: 'Network Associate Discovered',
    entityValue: 'Vikram Singh (+91 97520-88123)',
    description: '15 rapid bidirectional calls intercepted immediately preceding and succeeding vehicle disappearance.',
    confidence: 92,
    iconType: 'associate',
    targetTab: 'network'
  },
  {
    step: 6,
    source: 'PREVIOUS_FIR',
    title: 'Prior Conviction Link Established',
    entityValue: 'FIR #219/2025 (Civil Lines)',
    description: 'Cross-matching reveals identical communication pattern in prior highway hijacking syndicate docket.',
    confidence: 94,
    iconType: 'history',
    targetTab: 'history'
  },
  {
    step: 7,
    source: 'VEHICLE',
    title: 'Target Vehicle Verified',
    entityValue: 'CG 10 AB 1234 (White SUV)',
    description: 'Registration OCR confirmed against Vahan portal; RFID toll tag disabled near Bypass Toll Booth 3.',
    confidence: 99,
    iconType: 'vehicle',
    targetTab: 'surveillance'
  },
  {
    step: 8,
    source: 'CCTV',
    title: 'Optical CCTV Correlation',
    entityValue: '4 Cameras Confirmed (C-17, C-21, C-08, C-03)',
    description: 'YOLOv9 visual model verifies White SUV exiting Sector 12 with 94% optical match and plate OCR read.',
    confidence: 94,
    iconType: 'cctv',
    targetTab: 'surveillance'
  },
  {
    step: 9,
    source: 'TRAJECTORY',
    title: 'Geospatial Egress Reconstructed',
    entityValue: 'Sector 12 → Railway Colony Road (6.8 km)',
    description: 'Unified time-space model plots trajectory at avg 48 km/h, isolating Railway Colony Yard 4 as probable drop site.',
    confidence: 91,
    iconType: 'map',
    targetTab: 'surveillance'
  }
];

export const CASE_AI_INSIGHTS: AiInsight[] = [
  {
    id: 'ins-1',
    type: 'correlation',
    title: 'Multi-Source Evidence Cross-Validation Complete',
    message:
      'Optical detection of White SUV at Camera C-17 (20:43) is temporally synchronized with Cell Tower TOW-IND-09 outgoing voice call (+91 98271-40291) with 94.2% multi-source confidence.',
    confidence: 94,
    source: 'NetraX Cross-Source Correlation Engine',
    timestamp: '20:50:12',
    actionLabel: 'View Correlation Chain'
  },
  {
    id: 'ins-2',
    type: 'warning',
    title: 'Modus Operandi Similarity to FIR #219/2025',
    message:
      'Vehicle bypass technique and rapid call handoffs with Vikram Singh mirror the sequence documented in Civil Lines FIR #219/2025. Recommend issuing Section 41A CrPC notice to scrap merchant Amit Verma.',
    confidence: 91,
    source: 'Criminal History Pattern Analyzer',
    timestamp: '20:52:45',
    actionLabel: 'Compare Prior Docket'
  },
  {
    id: 'ins-3',
    type: 'recommendation',
    title: 'Suspect Stash Site Isolation',
    message:
      'CDR tower termination at Railway Colony Road Tower C (21:04) coincides with blind-zone camera exit on Railway Road. High probability vehicle is concealed in unmonitored warehouse sector.',
    confidence: 88,
    source: 'Geospatial Kinematics Model',
    timestamp: '21:08:30',
    actionLabel: 'Dispatch Field Verification'
  }
];

export const UNIFIED_CASE_NX_1024: CaseUnifiedFile = {
  id: 'case-1024',
  caseNumber: 'CASE #NX-1024',
  title: 'Vehicle Theft / Organized Auto-Lifting Syndicate',
  type: 'Grand Vehicle Theft (Sec 379 IPC)',
  sector: 'Sector 12 Command Enclave',
  status: 'active',
  priority: 'high',
  assignedOfficer: 'Officer Sharma (Badge #7492)',
  createdAt: '14 Sept 2026, 20:25',
  lastUpdated: 'Just now',
  synopsis:
    'Target vehicle White SUV (Registration No. CG 10 AB 1234) stolen from Sector 12 North Plaza commercial open parking. Multi-source investigation integrates FIR 102/2026 (City Kotwali), 4 optical CCTV camera detections, CDR telephony analysis across 23 calls, and prior conviction criminal docket correlation identifying suspect Rahul Sharma and associate Vikram Singh.',
  firRecord: CASE_NX_1024_FIR,
  cdrRecords: CASE_CDR_RECORDS,
  cdrSummary: CASE_CDR_SUMMARY,
  networkData: CASE_NETWORK_DATA,
  correlationSteps: EVIDENCE_CORRELATION_CHAIN,
  suspects: [PRIMARY_SUSPECT_PROFILE],
  previousCases: PREVIOUS_CASES_HISTORY,
  aiInsights: CASE_AI_INSIGHTS
};
