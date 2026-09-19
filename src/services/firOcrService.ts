import { FIRRecord, FIRExtractedField, ExtractedEntity, SupportedLanguage } from '../types';

export interface OcrProcessingStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed';
}

export interface FirSamplePreset {
  id: string;
  title: string;
  language: SupportedLanguage;
  policeStation: string;
  firNumber: string;
  previewSnippet: string;
  filename: string;
  fileSize: string;
  originalText: string;
  translatedText: string;
  fields: FIRExtractedField[];
  entities: ExtractedEntity[];
}

export const SAMPLE_FIR_PRESETS: FirSamplePreset[] = [
  {
    id: 'fir-preset-hindi',
    title: 'City Kotwali — Vehicle Theft (Bilaspur)',
    language: 'Hindi',
    policeStation: 'City Kotwali',
    firNumber: '102/2026',
    previewSnippet: 'प्रथम सूचना विवरण: प्रार्थी राजेश कुमार, सफेद एसयूवी CG 10 AB 1234 चोरी...',
    filename: 'FIR_102_2026_CityKotwali_Hindi.pdf',
    fileSize: '3.4 MB',
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
    fields: [
      { label: 'FIR Number', value: '102/2026', confidence: 99.2, key: 'firNumber', isEditable: true },
      { label: 'Police Station', value: 'City Kotwali', confidence: 98.6, key: 'policeStation', isEditable: true },
      { label: 'District', value: 'Bilaspur', confidence: 99.0, key: 'district', isEditable: true },
      { label: 'Date of Incident', value: '14/09/2026', confidence: 98.8, key: 'date', isEditable: true },
      { label: 'Time of Incident', value: '19:30 - 20:10 IST', confidence: 96.5, key: 'time', isEditable: true },
      { label: 'Complainant', value: 'Rajesh Kumar', confidence: 97.8, key: 'complainant', isEditable: true },
      { label: 'Accused (Initial)', value: 'Unknown', confidence: 94.2, key: 'accused', isEditable: true },
      { label: 'Sections / Acts', value: '379, 120B, 411 IPC', confidence: 98.1, key: 'sections', isEditable: true },
      { label: 'Vehicle Stolen', value: 'White SUV (CG 10 AB 1234)', confidence: 99.4, key: 'vehicle', isEditable: true },
      { label: 'Location', value: 'North Plaza Parking, Sector 12', confidence: 97.2, key: 'location', isEditable: true },
    ],
    entities: [
      { id: 'e-1', type: 'person', value: 'Rajesh Kumar', confidence: 98, context: 'Complainant' },
      { id: 'e-2', type: 'vehicle', value: 'CG 10 AB 1234 (White SUV)', confidence: 99, context: 'Target Vehicle', highlight: true },
      { id: 'e-3', type: 'phone', value: '+91 98261-09482', confidence: 95, context: 'Complainant Contact' },
      { id: 'e-4', type: 'location', value: 'Sector 12 North Plaza', confidence: 98, context: 'Point of Theft' },
      { id: 'e-5', type: 'police_station', value: 'City Kotwali', confidence: 99, context: 'Jurisdiction' },
      { id: 'e-6', type: 'section', value: '379, 120B, 411 IPC', confidence: 98, context: 'Offence Categories' },
      { id: 'e-7', type: 'case', value: 'FIR 102/2026', confidence: 99, context: 'Case Reference' }
    ]
  },
  {
    id: 'fir-preset-marathi',
    title: 'Pune Cantonment — Interstate Gang Interception',
    language: 'Marathi',
    policeStation: 'Cantonment PS, Pune',
    firNumber: '241/2026',
    previewSnippet: 'प्रथम खबरी अहवाल: संशयित टोळी, बनावट नंबर प्लेट्स व अवैध शस्त्र...',
    filename: 'FIR_241_2026_Pune_Marathi.pdf',
    fileSize: '4.1 MB',
    originalText: `प्रथम खबरी अहवाल (कलम १५४ फौजदारी प्रक्रिया संहिता)
पोलीस ठाणे: लष्कर / छावणी, पुणे शहर
गुन्हा रजिस्टर क्र.: २४१/२०२६
दिनांक व वेळ: ०९/०९/२०२६, वेळ २२:३० वा.
फिर्यादी: पोलीस उपनिरीक्षक प्रमोद कदम, गुन्हे शाखा
आरोपी: राहुल शर्मा व इतर ३ साथीदार
कलमे: कलम ३७९, ४६८, ४७१, १२०-ब भा.दं.वि. (IPC)

तपशील: गुप्त बातमीदाराकडून मिळालेल्या खात्रीशीर माहितीनुसार पुणे-सोलापूर महामार्गावर संशयित पांढऱ्या रंगाच्या वाहनाची तपासणी केली असता बनावट नंबर प्लेट व बनावट आरसी बुक आढळून आले. चौकशीदरम्यान आंतरराज्य वाहन चोरी टोळीशी संबंध असल्याचे निष्पन्न झाले आहे. पुढील तपासासाठी वाहन जप्त करण्यात आले आहे.`,
    translatedText: `FIRST INFORMATION REPORT (Section 154 Cr.P.C.)
Police Station: Cantonment, Pune City
Crime Register No.: 241/2026
Date & Time: 09/09/2026 at 22:30 IST
Complainant: Police Sub-Inspector Pramod Kadam, Crime Branch
Accused: Rahul Sharma and 3 other associates
Applicable Sections: Sections 379, 468, 471, 120-B Indian Penal Code (IPC)

Details: On credible intelligence received from field informant, an inspection of a suspect White SUV on Pune-Solapur Highway revealed counterfeit number plates and forged registration certificates. Interrogation established links to an interstate vehicle theft syndicate. Vehicle impounded for digital forensics and cross-state investigation.`,
    fields: [
      { label: 'FIR Number', value: '241/2026', confidence: 98.9, key: 'firNumber', isEditable: true },
      { label: 'Police Station', value: 'Cantonment PS, Pune', confidence: 97.8, key: 'policeStation', isEditable: true },
      { label: 'District', value: 'Pune', confidence: 99.1, key: 'district', isEditable: true },
      { label: 'Date', value: '09/09/2026', confidence: 98.5, key: 'date', isEditable: true },
      { label: 'Accused', value: 'Rahul Sharma & 3 Associates', confidence: 95.2, key: 'accused', isEditable: true },
      { label: 'Sections', value: '379, 468, 471, 120B IPC', confidence: 98.4, key: 'sections', isEditable: true }
    ],
    entities: [
      { id: 'm-1', type: 'accused', value: 'Rahul Sharma', confidence: 96, context: 'Interstate Syndicate Lead', highlight: true },
      { id: 'm-2', type: 'vehicle', value: 'Counterfeit Plated White SUV', confidence: 94, context: 'Intercepted Transport' },
      { id: 'm-3', type: 'location', value: 'Pune-Solapur Highway', confidence: 97, context: 'Interception Point' },
      { id: 'm-4', type: 'section', value: '379, 468, 471, 120B IPC', confidence: 98, context: 'Forgery & Theft' }
    ]
  },
  {
    id: 'fir-preset-english',
    title: 'Civil Lines — Armed Hijacking Syndicate',
    language: 'English',
    policeStation: 'Civil Lines Police Station',
    firNumber: '219/2025',
    previewSnippet: 'First Information Report: Highway interception of commercial vehicle with mobile tower link...',
    filename: 'FIR_219_2025_CivilLines_English.pdf',
    fileSize: '2.8 MB',
    originalText: `FIRST INFORMATION REPORT (Under Section 154 Cr.P.C.)
Police Station: Civil Lines
District: Bilaspur (C.G.)
FIR Number: 219/2025
Date & Time: 22/11/2025 at 21:45 IST
Complainant: Anand Swaroop, Logistics Manager
Accused: Unidentified gang of 3-4 persons (Associates identified as Vikram Singh & Rahul Sharma)
Sections: 392, 397, 120B IPC (Armed Robbery & Criminal Conspiracy)

Summary: Logistics transport vehicle intercepted near Ring Road Toll Plaza by individuals arriving in a black motorcycle and grey sedan. Electronic tracking unit severed. Cellular intercept records flagged calls to numbers +91 98271-40291 and +91 97520-88123 during the incident.`,
    translatedText: `FIRST INFORMATION REPORT (Original English Document)
Police Station: Civil Lines, Bilaspur
FIR Number: 219/2025
Date: 22/11/2025
Complainant: Anand Swaroop, Logistics Manager
Accused: Syndicate led by Vikram Singh & Rahul Sharma
Sections: 392, 397, 120B IPC

Summary: Armed robbery and highway hijacking of cargo transport vehicle. Direct cellular telemetry tie to suspect numbers +91 98271-40291 and +91 97520-88123, establishing prior criminal network collaboration.`,
    fields: [
      { label: 'FIR Number', value: '219/2025', confidence: 99.5, key: 'firNumber', isEditable: true },
      { label: 'Police Station', value: 'Civil Lines', confidence: 99.0, key: 'policeStation', isEditable: true },
      { label: 'Date', value: '22/11/2025', confidence: 99.2, key: 'date', isEditable: true },
      { label: 'Accused', value: 'Vikram Singh, Rahul Sharma', confidence: 94.0, key: 'accused', isEditable: true },
      { label: 'Sections', value: '392, 397, 120B IPC', confidence: 99.1, key: 'sections', isEditable: true }
    ],
    entities: [
      { id: 'en-1', type: 'person', value: 'Anand Swaroop', confidence: 98, context: 'Complainant' },
      { id: 'en-2', type: 'accused', value: 'Vikram Singh', confidence: 94, context: 'Named Associate', highlight: true },
      { id: 'en-3', type: 'phone', value: '+91 98271-40291', confidence: 97, context: 'Tower Intercept Number', highlight: true },
      { id: 'en-4', type: 'location', value: 'Ring Road Toll Plaza', confidence: 96, context: 'Incident Location' }
    ]
  }
];

/**
 * Service abstraction for OCR scanning, Language detection & Field Extraction.
 * When a real backend is connected, this class will make HTTP requests to the FastAPI / Tesseract / LLM microservice.
 */
export class FirOcrService {
  /**
   * Simulate step-by-step OCR extraction with progress callbacks
   */
  static async processDocument(
    presetId: string,
    onStepChange: (stepIndex: number, stepLabel: string) => void
  ): Promise<FirSamplePreset> {
    const preset = SAMPLE_FIR_PRESETS.find((p) => p.id === presetId) || SAMPLE_FIR_PRESETS[0];

    const steps = [
      'Document uploaded & format validated',
      'Optical text extraction (OCR)',
      `Language detected: ${preset.language}`,
      'Legal field extraction & confidence scoring',
      'Entity identification (Persons, Vehicles, Phones)',
      'Case docket auto-population ready'
    ];

    for (let i = 0; i < steps.length; i++) {
      onStepChange(i, steps[i]);
      await new Promise((res) => setTimeout(res, 400));
    }

    return preset;
  }

  /**
   * Detect language from text snippet
   */
  static detectLanguage(text: string): SupportedLanguage {
    if (/[\u0900-\u097F]/.test(text)) {
      if (/आहे|झाले|केले|तपशील|पोलीस/i.test(text)) {
        return 'Marathi';
      }
      return 'Hindi';
    }
    if (/[\u0980-\u09FF]/.test(text)) return 'Bengali';
    if (/[\u0B80-\u0BFF]/.test(text)) return 'Tamil';
    if (/[\u0C00-\u0C7F]/.test(text)) return 'Telugu';
    if (/[\u0A80-\u0AFF]/.test(text)) return 'Gujarati';
    if (/[\u0A00-\u0A7F]/.test(text)) return 'Punjabi';
    if (/[\u0C80-\u0CFF]/.test(text)) return 'Kannada';
    if (/[\u0D00-\u0D7F]/.test(text)) return 'Malayalam';
    if (/[\u0B00-\u0B7F]/.test(text)) return 'Odia';
    return 'English';
  }
}
