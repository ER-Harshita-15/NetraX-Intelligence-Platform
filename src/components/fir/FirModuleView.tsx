import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  Languages,
  Eye,
  Edit3,
  Save,
  Check,
  RotateCcw,
  AlertCircle,
  FileCheck,
  Shield,
  Layers,
  Search,
  ArrowRight,
  Clock,
  MapPin,
  Car,
  Phone,
  User,
  Hash
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { FIRRecord, FIRExtractedField, ExtractedEntity, SupportedLanguage } from '../../types';
import { SAMPLE_FIR_PRESETS, FirOcrService, FirSamplePreset } from '../../services/firOcrService';
import { CASE_NX_1024_FIR } from '../../data/unifiedCaseData';

export interface FirModuleViewProps {
  initialFir?: FIRRecord;
  onSaveToCase?: (fir: FIRRecord) => void;
  onNavigateTab?: (tabName: string) => void;
  onSelectEntity?: (entity: ExtractedEntity) => void;
}

export const FirModuleView: React.FC<FirModuleViewProps> = ({
  initialFir = CASE_NX_1024_FIR,
  onSaveToCase,
  onNavigateTab,
  onSelectEntity
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ocr' | 'manual' | 'archive'>('ocr');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('fir-preset-hindi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<number>(-1);
  const [processingLabel, setProcessingLabel] = useState<string>('');
  const [currentFir, setCurrentFir] = useState<FIRRecord>(initialFir);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'original' | 'translated'>('side-by-side');
  const [isEditingFields, setIsEditingFields] = useState(false);
  const [savedSuccessBanner, setSavedSuccessBanner] = useState(false);

  // Manual Form State
  const [manualForm, setManualForm] = useState({
    firNumber: '102/2026',
    policeStation: 'City Kotwali',
    district: 'Bilaspur',
    state: 'Chhattisgarh',
    date: '2026-09-14',
    time: '20:15',
    incidentType: 'Vehicle Theft / Criminal Conspiracy',
    sectionsActs: 'Section 379, 120B, 411 IPC',
    complainant: 'Rajesh Kumar',
    victim: 'Rajesh Kumar',
    accused: 'Rahul Sharma (alias Raju) & Associates',
    witnesses: 'Sunil Verma (Security Guard), Deepak Sahu (Shopkeeper)',
    incidentLocation: 'Commercial North Plaza Parking, Sector 12',
    incidentDescription:
      'Complainant parked White SUV (CG 10 AB 1234) in North Plaza parking at 19:30. Returned at 20:10 to find vehicle missing. Suspect seen fleeing towards Market Road.',
    investigatingOfficer: 'Inspector A. K. Sharma (Badge #7492)',
    additionalNotes: 'Vehicle equipped with Fastag RFID. Correlates with prior vehicle thefts in Sector 12.'
  });

  // Run simulated OCR pipeline
  const handleRunOcrScan = async (presetId: string = selectedPresetId) => {
    setIsProcessing(true);
    setProcessingStep(0);
    setSavedSuccessBanner(false);

    try {
      const preset = await FirOcrService.processDocument(presetId, (stepIndex, label) => {
        setProcessingStep(stepIndex);
        setProcessingLabel(label);
      });

      // Update current FIR record with extracted data
      const updatedRecord: FIRRecord = {
        ...currentFir,
        firNumber: preset.firNumber,
        policeStation: preset.policeStation,
        district: preset.fields.find((f) => f.key === 'district')?.value || 'Bilaspur',
        languageDetected: preset.language,
        scannedDocumentName: preset.filename,
        scannedDocumentSize: preset.fileSize,
        originalText: preset.originalText,
        translatedText: preset.translatedText,
        extractedFields: preset.fields,
        extractedEntities: preset.entities,
        ocrConfidence: 98.4,
        status: 'verified'
      };

      setCurrentFir(updatedRecord);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFieldChange = (key: string, newValue: string) => {
    setCurrentFir((prev) => ({
      ...prev,
      extractedFields: prev.extractedFields.map((f) =>
        f.key === key ? { ...f, value: newValue } : f
      )
    }));
  };

  const handleSaveToCase = () => {
    if (onSaveToCase) {
      onSaveToCase(currentFir);
    }
    setSavedSuccessBanner(true);
    setTimeout(() => setSavedSuccessBanner(false), 4500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FIRRecord = {
      ...currentFir,
      firNumber: manualForm.firNumber,
      policeStation: manualForm.policeStation,
      district: manualForm.district,
      state: manualForm.state,
      date: manualForm.date,
      time: manualForm.time,
      incidentType: manualForm.incidentType,
      sectionsActs: manualForm.sectionsActs.split(',').map((s) => s.trim()),
      complainant: manualForm.complainant,
      victim: manualForm.victim,
      accused: manualForm.accused,
      witnesses: manualForm.witnesses.split(',').map((w) => w.trim()),
      incidentLocation: manualForm.incidentLocation,
      incidentDescription: manualForm.incidentDescription,
      investigatingOfficer: manualForm.investigatingOfficer,
      additionalNotes: manualForm.additionalNotes,
      status: 'verified'
    };
    setCurrentFir(updated);
    if (onSaveToCase) {
      onSaveToCase(updated);
    }
    setSavedSuccessBanner(true);
    setTimeout(() => setSavedSuccessBanner(false), 4500);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans select-none">
      {/* Module Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-[6px] bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#2DD4FF] tracking-wider block">
              LEGAL DOCUMENT INGESTION PIPELINE
            </span>
            <h2 className="text-[18px] font-bold text-[#F8FAFC]">
              FIR & Case Documents Processing
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-[6px] bg-[#151D26] border border-[#26313D]">
          <button
            onClick={() => setActiveSubTab('ocr')}
            className={`px-3 py-1.5 rounded-[4px] text-[12px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSubTab === 'ocr'
                ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            OCR Document Scanner
          </button>
          <button
            onClick={() => setActiveSubTab('manual')}
            className={`px-3 py-1.5 rounded-[4px] text-[12px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSubTab === 'manual'
                ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Manual FIR Entry
          </button>
          <button
            onClick={() => setActiveSubTab('archive')}
            className={`px-3 py-1.5 rounded-[4px] text-[12px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSubTab === 'archive'
                ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            FIR Records Archive
          </button>
        </div>
      </div>

      {/* Save Success Banner */}
      {savedSuccessBanner && (
        <div className="p-3.5 rounded-[8px] bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2 text-[13px] font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            FIR record successfully linked to Case #NX-1024. Entities and IPC sections updated.
          </div>
          <span className="text-[11px] font-mono text-[#22C55E]">CASE DOSSIER SYNCED</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 1: OCR DOCUMENT SCANNER */}
      {/* ======================================================== */}
      {activeSubTab === 'ocr' && (
        <div className="space-y-6">
          {/* Top Ingestion Zone */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Drag & Drop Card (2 cols) */}
            <div className="lg:col-span-2 p-6 rounded-[8px] bg-[#111820] border border-[#26313D] flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#2DD4FF]" />
                  <h3 className="text-[14px] font-semibold text-[#F8FAFC]">
                    Upload Scanned FIR (PDF, JPG, PNG)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#64748B]">
                  SUPPORTED: HINDI, MARATHI, BENGALI, TAMIL, TELUGU, ENGLISH
                </span>
              </div>

              {/* Upload Drop Area */}
              <div className="border-2 border-dashed border-[#26313D] hover:border-[#2DD4FF]/60 rounded-[8px] p-6 text-center transition-colors bg-[#0F151C]/60 flex flex-col items-center justify-center space-y-2.5">
                <div className="w-12 h-12 rounded-full bg-[#151D26] border border-[#26313D] flex items-center justify-center text-[#2DD4FF]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[13px] font-medium text-[#F8FAFC] block">
                    Drop FIR scanned document here, or browse files
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    Current loaded file: <strong className="text-[#2DD4FF]">{currentFir.scannedDocumentName || 'FIR_102_2026_Kotwali.pdf'}</strong> ({currentFir.scannedDocumentSize || '3.4 MB'})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#94A3B8]">
                  <Shield className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>OCR Engine: NetraX Multi-Lingual Vision v2.4</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                    onClick={() => handleRunOcrScan(selectedPresetId)}
                    disabled={isProcessing}
                    className="shadow-[0_0_15px_rgba(45,212,255,0.2)]"
                  >
                    {isProcessing ? 'Processing OCR...' : 'Scan FIR with OCR'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Demo Presets (1 col) */}
            <div className="p-5 rounded-[8px] bg-[#111820] border border-[#26313D] space-y-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#26313D] pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#F59E0B]" />
                    <h3 className="text-[13px] font-semibold text-[#F8FAFC]">
                      Demo Presets
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B]">1-CLICK SCAN</span>
                </div>

                <div className="space-y-2">
                  {SAMPLE_FIR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPresetId(preset.id);
                        handleRunOcrScan(preset.id);
                      }}
                      className={`w-full text-left p-2.5 rounded-[6px] border text-[11px] transition-all cursor-pointer ${
                        selectedPresetId === preset.id
                          ? 'bg-[#151D26] border-[#2DD4FF] text-[#F8FAFC] shadow-[0_0_10px_rgba(45,212,255,0.1)]'
                          : 'bg-[#0F151C] border-[#26313D] text-[#94A3B8] hover:text-[#F8FAFC]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-[#F8FAFC] line-clamp-1">{preset.title}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-[#2DD4FF]/10 text-[#2DD4FF]">
                          {preset.language}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#64748B] block line-clamp-1">
                        {preset.previewSnippet}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] font-mono text-[#64748B] border-t border-[#26313D]">
                Pre-configured dockets for testing instant optical entity extraction and translation.
              </div>
            </div>
          </div>

          {/* Animated 6-Step Processing Pipeline */}
          {isProcessing && (
            <div className="p-5 rounded-[8px] bg-[#151D26] border border-[#2DD4FF]/40 space-y-3 shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4FF] animate-pulse" />
                  <span className="text-[13px] font-mono font-bold text-[#F8FAFC]">
                    OCR Pipeline In Progress: {processingLabel}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#2DD4FF]">STEP {processingStep + 1} / 6</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#0F151C] h-2 rounded-full overflow-hidden border border-[#26313D]">
                <div
                  className="bg-[#2DD4FF] h-full transition-all duration-300"
                  style={{ width: `${((processingStep + 1) / 6) * 100}%` }}
                />
              </div>

              {/* 6 Steps Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1 text-[10px] font-mono">
                {[
                  '1. Doc Uploaded',
                  '2. OCR Extraction',
                  '3. Lang Detection',
                  '4. Field Parsing',
                  '5. Entity ID',
                  '6. Case Sync'
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded border text-center transition-colors ${
                      idx < processingStep
                        ? 'bg-[#22C55E]/10 border-[#22C55E]/40 text-[#22C55E]'
                        : idx === processingStep
                        ? 'bg-[#2DD4FF]/10 border-[#2DD4FF] text-[#2DD4FF] font-bold'
                        : 'bg-[#0F151C] border-[#26313D] text-[#64748B]'
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BILINGUAL VIEW: ORIGINAL FIR vs TRANSLATED FIR */}
          <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#26313D] pb-3">
              <div className="flex items-center gap-2.5">
                <Languages className="w-4 h-4 text-[#2DD4FF]" />
                <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
                  Bilingual Text Analysis
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2DD4FF]/10 text-[#2DD4FF] border border-[#2DD4FF]/30">
                  Detected: {currentFir.languageDetected} (Confidence: {currentFir.ocrConfidence}%)
                </span>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-[#0F151C] p-1 rounded-[6px] border border-[#26313D]">
                <button
                  onClick={() => setViewMode('side-by-side')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded cursor-pointer ${
                    viewMode === 'side-by-side' ? 'bg-[#151D26] text-[#2DD4FF] font-bold' : 'text-[#94A3B8]'
                  }`}
                >
                  Side-by-Side
                </button>
                <button
                  onClick={() => setViewMode('original')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded cursor-pointer ${
                    viewMode === 'original' ? 'bg-[#151D26] text-[#2DD4FF] font-bold' : 'text-[#94A3B8]'
                  }`}
                >
                  Original ({currentFir.languageDetected})
                </button>
                <button
                  onClick={() => setViewMode('translated')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded cursor-pointer ${
                    viewMode === 'translated' ? 'bg-[#151D26] text-[#2DD4FF] font-bold' : 'text-[#94A3B8]'
                  }`}
                >
                  Translated (English)
                </button>
              </div>
            </div>

            {/* Document Content Grids */}
            <div className={`grid gap-4 ${viewMode === 'side-by-side' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {/* ORIGINAL DOCUMENT TEXT */}
              {(viewMode === 'side-by-side' || viewMode === 'original') && (
                <div className="p-4 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#26313D] pb-2">
                    <span className="text-[11px] font-mono font-bold text-[#F59E0B] uppercase">
                      ORIGINAL DOCUMENT ({currentFir.languageDetected})
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">VERBATIM SCAN</span>
                  </div>
                  <pre className="font-sans text-[12px] text-[#CBD5E1] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto pr-2">
                    {currentFir.originalText}
                  </pre>
                </div>
              )}

              {/* TRANSLATED TEXT */}
              {(viewMode === 'side-by-side' || viewMode === 'translated') && (
                <div className="p-4 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#26313D] pb-2">
                    <span className="text-[11px] font-mono font-bold text-[#2DD4FF] uppercase">
                      STANDARDIZED TRANSLATION (LEGAL ENGLISH)
                    </span>
                    <span className="text-[10px] font-mono text-[#22C55E]">CRPC SECTION 154 COMPLIANT</span>
                  </div>
                  <pre className="font-sans text-[12px] text-[#CBD5E1] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto pr-2">
                    {currentFir.translatedText}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* EXTRACTED FIELDS & ENTITIES SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Auto-Extracted Form Fields (2 cols) */}
            <div className="lg:col-span-2 rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
                    Extracted Legal Fields & Confidence Scores
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditingFields(!isEditingFields)}
                    className="text-[11px] font-mono text-[#2DD4FF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    {isEditingFields ? 'Done Editing' : 'Edit Fields'}
                  </button>
                </div>
              </div>

              {/* Field Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentFir.extractedFields.map((field) => (
                  <div
                    key={field.key}
                    className="p-2.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#64748B]">
                        {field.label}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                          field.confidence >= 95
                            ? 'text-[#22C55E] bg-[#22C55E]/10'
                            : 'text-[#F59E0B] bg-[#F59E0B]/10'
                        }`}
                      >
                        {field.confidence}% match
                      </span>
                    </div>

                    {isEditingFields ? (
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full bg-[#151D26] border border-[#26313D] rounded px-2 py-1 text-[12px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                      />
                    ) : (
                      <span className="text-[13px] font-medium text-[#F8FAFC] block truncate">
                        {field.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Save / Accept Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#26313D]">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Check className="w-3.5 h-3.5" />}
                  onClick={handleSaveToCase}
                >
                  Accept All Values
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Save className="w-3.5 h-3.5" />}
                  onClick={handleSaveToCase}
                  className="shadow-[0_0_15px_rgba(45,212,255,0.2)]"
                >
                  Save to Case #NX-1024
                </Button>
              </div>
            </div>

            {/* Structured Extracted Entities (1 col) */}
            <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2DD4FF]" />
                  <h3 className="text-[14px] font-semibold text-[#F8FAFC]">
                    Extracted Entities ({currentFir.extractedEntities.length})
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#64748B]">TAGGED</span>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {currentFir.extractedEntities.map((ent) => (
                  <div
                    key={ent.id}
                    onClick={() => onSelectEntity && onSelectEntity(ent)}
                    className={`p-2.5 rounded-[6px] border text-[11px] font-mono transition-colors cursor-pointer ${
                      ent.highlight
                        ? 'bg-[#151D26] border-[#2DD4FF]/50 text-[#F8FAFC] hover:border-[#2DD4FF]'
                        : 'bg-[#0F151C] border-[#26313D] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#2DD4FF]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#F8FAFC] line-clamp-1">{ent.value}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] uppercase bg-[#1C2633] text-[#2DD4FF]">
                        {ent.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                      <span>{ent.context}</span>
                      <span className="text-[#22C55E]">{ent.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[10px] font-mono text-[#64748B] border-t border-[#26313D]">
                Click an entity to cross-reference with Surveillance, CDR, and Criminal Network.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 2: MANUAL FIR ENTRY */}
      {/* ======================================================== */}
      {activeSubTab === 'manual' && (
        <form onSubmit={handleManualSubmit} className="space-y-6">
          <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-6">
            <div className="border-b border-[#26313D] pb-3">
              <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
                Manual First Information Report (FIR) Entry
              </h3>
              <p className="text-[12px] text-[#94A3B8]">
                Submit official police station records directly into the active case docket.
              </p>
            </div>

            {/* Row 1: FIR No, PS, District, State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">FIR NUMBER *</label>
                <input
                  type="text"
                  required
                  value={manualForm.firNumber}
                  onChange={(e) => setManualForm({ ...manualForm, firNumber: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">POLICE STATION *</label>
                <input
                  type="text"
                  required
                  value={manualForm.policeStation}
                  onChange={(e) => setManualForm({ ...manualForm, policeStation: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">DISTRICT *</label>
                <input
                  type="text"
                  required
                  value={manualForm.district}
                  onChange={(e) => setManualForm({ ...manualForm, district: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">STATE</label>
                <input
                  type="text"
                  value={manualForm.state}
                  onChange={(e) => setManualForm({ ...manualForm, state: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>
            </div>

            {/* Row 2: Date, Time, Incident Type, Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">INCIDENT DATE *</label>
                <input
                  type="date"
                  required
                  value={manualForm.date}
                  onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">INCIDENT TIME</label>
                <input
                  type="text"
                  value={manualForm.time}
                  onChange={(e) => setManualForm({ ...manualForm, time: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">INCIDENT TYPE *</label>
                <input
                  type="text"
                  required
                  value={manualForm.incidentType}
                  onChange={(e) => setManualForm({ ...manualForm, incidentType: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">SECTIONS / ACTS *</label>
                <input
                  type="text"
                  required
                  value={manualForm.sectionsActs}
                  onChange={(e) => setManualForm({ ...manualForm, sectionsActs: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                  placeholder="e.g. 379, 120B IPC"
                />
              </div>
            </div>

            {/* Row 3: Complainant, Victim, Accused, Witnesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">COMPLAINANT *</label>
                <input
                  type="text"
                  required
                  value={manualForm.complainant}
                  onChange={(e) => setManualForm({ ...manualForm, complainant: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">VICTIM</label>
                <input
                  type="text"
                  value={manualForm.victim}
                  onChange={(e) => setManualForm({ ...manualForm, victim: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">ACCUSED / SUSPECTS</label>
                <input
                  type="text"
                  value={manualForm.accused}
                  onChange={(e) => setManualForm({ ...manualForm, accused: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">WITNESSES</label>
                <input
                  type="text"
                  value={manualForm.witnesses}
                  onChange={(e) => setManualForm({ ...manualForm, witnesses: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>
            </div>

            {/* Row 4: Location & Officer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">INCIDENT LOCATION</label>
                <input
                  type="text"
                  value={manualForm.incidentLocation}
                  onChange={(e) => setManualForm({ ...manualForm, incidentLocation: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#94A3B8]">INVESTIGATING OFFICER</label>
                <input
                  type="text"
                  value={manualForm.investigatingOfficer}
                  onChange={(e) => setManualForm({ ...manualForm, investigatingOfficer: e.target.value })}
                  className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] px-3 py-2 text-[13px] text-[#F8FAFC] outline-none focus:border-[#2DD4FF]"
                />
              </div>
            </div>

            {/* Row 5: Narrative Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#94A3B8]">INCIDENT DESCRIPTION</label>
              <textarea
                rows={4}
                value={manualForm.incidentDescription}
                onChange={(e) => setManualForm({ ...manualForm, incidentDescription: e.target.value })}
                className="w-full bg-[#0F151C] border border-[#26313D] rounded-[6px] p-3 text-[13px] text-[#CBD5E1] outline-none focus:border-[#2DD4FF] leading-relaxed"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#26313D]">
              <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
                Record Manual FIR & Link to Case
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 3: FIR ARCHIVE */}
      {/* ======================================================== */}
      {activeSubTab === 'archive' && (
        <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
            <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
              Historical FIR Repository (48 Records)
            </h3>
            <span className="text-[11px] font-mono text-[#64748B]">JURISDICTION: BILASPUR RANGE</span>
          </div>

          <div className="space-y-2.5">
            {[
              { fir: '102/2026', ps: 'City Kotwali', type: 'Vehicle Theft (White SUV)', date: '14/09/2026', status: 'Active In Case NX-1024', sec: '379, 120B IPC' },
              { fir: '219/2025', ps: 'Civil Lines', type: 'Armed Hijacking & Robbery', date: '22/11/2025', status: 'Cross-Matched Docket', sec: '392, 120B IPC' },
              { fir: '084/2024', ps: 'City Kotwali', type: 'Vehicle Lifting Syndicate', date: '18/03/2024', status: 'Convicted / Closed', sec: '379, 411 IPC' },
              { fir: '052/2024', ps: 'Sarkanda', type: 'Motorcycle Theft Gang', date: '04/02/2024', status: 'Disposed', sec: '379 IPC' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-[6px] bg-[#0F151C] border border-[#26313D] hover:border-[#2DD4FF]/40 transition-colors flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-mono font-bold text-[#F8FAFC]">FIR #{item.fir}</span>
                    <span className="text-[11px] text-[#64748B]">• {item.ps}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#151D26] text-[#2DD4FF] border border-[#26313D]">
                      {item.sec}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#94A3B8] block">{item.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono font-bold text-[#22C55E] block">{item.status}</span>
                  <span className="text-[10px] font-mono text-[#64748B]">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
