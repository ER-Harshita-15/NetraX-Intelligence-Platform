export type BadgeVariant =
  | 'active'
  | 'processing'
  | 'completed'
  | 'offline'
  | 'high_confidence'
  | 'medium_confidence'
  | 'low_confidence'
  | 'alert';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type EvidenceType = 'cctv' | 'image' | 'document' | 'audio';
export type ProcessingStatus = 'pending' | 'processing' | 'analyzed' | 'failed';

export interface EvidenceItem {
  id: string;
  title: string;
  filename: string;
  type: EvidenceType;
  timestamp: string;
  source: string;
  fileSize: string;
  duration?: string;
  status: ProcessingStatus;
  thumbnailUrl?: string;
  detectionsCount?: number;
  confidenceScore?: number;
}

export type CaseStatus = 'active' | 'under_review' | 'closed' | 'escalated';
export type CasePriority = 'low' | 'medium' | 'high' | 'critical';

export interface CaseItem {
  id: string;
  caseNumber: string;
  title: string;
  type: string;
  sector: string;
  status: CaseStatus;
  priority: CasePriority;
  lastActivity: string;
  assignedOfficer: string;
  evidenceCount: number;
  camerasInvolved: number;
  summary: string;
  updatedAt: string;
}

export type CameraState = 'online' | 'recording' | 'processing' | 'alert' | 'offline';

export interface CameraData {
  id: string;
  name: string;
  sector: string;
  state: CameraState;
  location: string;
  lastFrameTime: string;
  fps: number;
  resolution: string;
  detectionsToday: number;
  streamUrl?: string;
}

export type DetectionType = 'vehicle' | 'person' | 'license_plate';

export interface DetectionBox {
  id: string;
  type: DetectionType;
  trackingId: string;
  label: string;
  confidence: number;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  width: number; // percentage 0 - 100
  height: number; // percentage 0 - 100
  metadata?: string;
}

export type InsightType = 'insight' | 'warning' | 'recommendation' | 'correlation';

export interface AiInsight {
  id: string;
  type: InsightType;
  title: string;
  message: string;
  confidence: number;
  source: string;
  timestamp: string;
  affectedCameras?: string[];
  actionLabel?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  timeFormatted: string;
  event: string;
  location: string;
  source: string;
  confidence: number;
  type: 'detection' | 'movement' | 'correlation' | 'alert';
  thumbnailText?: string;
  notes?: string;
}

export type MapMarkerType = 'camera' | 'vehicle' | 'person' | 'incident' | 'last_known';

export interface MapMarkerData {
  id: string;
  type: MapMarkerType;
  label: string;
  sublabel: string;
  coordinates: { x: number; y: number }; // Relative percentage for map canvas
  confidence?: number;
  status?: string;
  active?: boolean;
}

export type UploadState = 'empty' | 'dragging' | 'uploading' | 'uploaded' | 'error';

// ==========================================
// MULTI-SOURCE INVESTIGATION EXTENSIONS
// ==========================================

export type SupportedLanguage =
  | 'Hindi'
  | 'English'
  | 'Marathi'
  | 'Bengali'
  | 'Tamil'
  | 'Telugu'
  | 'Gujarati'
  | 'Punjabi'
  | 'Kannada'
  | 'Malayalam'
  | 'Odia';

export type EntityType =
  | 'person'
  | 'accused'
  | 'victim'
  | 'witness'
  | 'vehicle'
  | 'phone'
  | 'location'
  | 'date'
  | 'police_station'
  | 'section'
  | 'weapon'
  | 'case';

export interface ExtractedEntity {
  id: string;
  type: EntityType;
  value: string;
  confidence: number;
  context?: string;
  linkedRecordCount?: number;
  highlight?: boolean;
}

export interface FIRExtractedField {
  label: string;
  value: string;
  confidence: number;
  key: string;
  isEditable?: boolean;
}

export interface FIRRecord {
  id: string;
  caseId: string;
  firNumber: string;
  policeStation: string;
  district: string;
  state: string;
  date: string;
  time: string;
  incidentType: string;
  sectionsActs: string[];
  complainant: string;
  victim: string;
  accused: string;
  witnesses: string[];
  incidentLocation: string;
  incidentDescription: string;
  investigatingOfficer: string;
  additionalNotes?: string;
  languageDetected: SupportedLanguage;
  ocrConfidence: number;
  scannedDocumentName?: string;
  scannedDocumentSize?: string;
  originalText: string;
  translatedText: string;
  extractedEntities: ExtractedEntity[];
  extractedFields: FIRExtractedField[];
  status: 'draft' | 'verified' | 'linked_to_case';
  createdAt: string;
}

export interface CallRecord {
  id: string;
  callerNumber: string;
  callerName?: string;
  receiverNumber: string;
  receiverName?: string;
  dateTime: string;
  time: string;
  durationSec: number;
  durationFormatted: string;
  callType: 'incoming' | 'outgoing' | 'sms' | 'missed';
  cellTowerId: string;
  cellTowerLocation: string;
  latitude?: number;
  longitude?: number;
  isSuspicious?: boolean;
  notes?: string;
}

export interface CdrSummary {
  totalCalls: number;
  totalDurationMin: number;
  uniqueNumbers: number;
  activeTowers: number;
  dateRange: string;
  topCommunicators: {
    number: string;
    name: string;
    callsCount: number;
    durationMin: number;
  }[];
}

export interface CriminalCaseRecord {
  id: string;
  firNumber: string;
  incidentType: string;
  policeStation: string;
  date: string;
  status: 'Closed' | 'Under Investigation' | 'Charge-Sheeted' | 'Active' | 'Trial Pending';
  relationshipToCurrentCase: string;
  summary: string;
  sections: string;
}

export interface PersonProfile {
  id: string;
  name: string;
  aliases: string[];
  photoUrl?: string;
  role: 'Suspect' | 'Associate' | 'Witness' | 'Complainant' | 'Person of Interest';
  previousCasesCount: number;
  relatedFirsCount: number;
  knownLocationsCount: number;
  associatedVehiclesCount: number;
  associatedPhonesCount: number;
  networkConnectionsCount: number;
  caseHistory: CriminalCaseRecord[];
  knownAssociates: {
    id: string;
    name: string;
    relationship: string;
    phone: string;
    callCountWithSubject: number;
  }[];
  vehicles: {
    plate: string;
    makeModel: string;
    color: string;
    registeredOwner: string;
    relation: string;
  }[];
  phoneNumbers: {
    number: string;
    carrier: string;
    status: string;
    callVolume: number;
    lastActive: string;
  }[];
  locations: {
    name: string;
    type: string;
    frequency: string;
    lastSeen: string;
  }[];
  evidenceTags: string[];
  riskIndicators: {
    level: 'low' | 'medium' | 'high' | 'critical';
    factors: string[];
  };
  notes: string;
}

export type NetworkNodeType = 'person' | 'phone' | 'vehicle' | 'location' | 'case';

export interface NetworkNode {
  id: string;
  label: string;
  sublabel?: string;
  type: NetworkNodeType;
  category: string;
  callsCount?: number;
  uniqueContacts?: number;
  relatedCases?: number;
  lastActivity?: string;
  phone?: string;
  details?: Record<string, string | number>;
  x?: number;
  y?: number;
  isFocus?: boolean;
}

export type NetworkEdgeType =
  | 'call'
  | 'message'
  | 'associate'
  | 'shared_vehicle'
  | 'shared_location'
  | 'shared_case';

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: NetworkEdgeType;
  label: string;
  callCount?: number;
  weight: number;
}

export interface NetworkGraphData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

export interface EvidenceCorrelationStep {
  step: number;
  source: 'FIR' | 'PERSON' | 'PHONE' | 'CDR' | 'ASSOCIATE' | 'PREVIOUS_FIR' | 'VEHICLE' | 'CCTV' | 'TRAJECTORY';
  title: string;
  entityValue: string;
  description: string;
  confidence: number;
  iconType: 'fir' | 'person' | 'phone' | 'cdr' | 'associate' | 'history' | 'vehicle' | 'cctv' | 'map';
  targetTab?: string;
}

export interface CaseUnifiedFile {
  id: string;
  caseNumber: string;
  title: string;
  type: string;
  sector: string;
  status: CaseStatus;
  priority: CasePriority;
  assignedOfficer: string;
  createdAt: string;
  lastUpdated: string;
  synopsis: string;
  firRecord: FIRRecord;
  cdrRecords: CallRecord[];
  cdrSummary: CdrSummary;
  networkData: NetworkGraphData;
  correlationSteps: EvidenceCorrelationStep[];
  suspects: PersonProfile[];
  previousCases: CriminalCaseRecord[];
  aiInsights: AiInsight[];
}
