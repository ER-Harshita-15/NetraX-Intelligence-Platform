import React, { useState } from 'react';
import { LoginView } from './components/auth/LoginView';
import { AppShell } from './components/layout/AppShell';
import { InvestigatorDashboard } from './components/dashboard/InvestigatorDashboard';
import { CreateCaseView } from './components/cases/CreateCaseView';
import { CaseOverviewView } from './components/cases/CaseOverviewView';
import { CasesListView } from './components/cases/CasesListView';
import { SurveillanceView } from './components/placeholders/SurveillanceView';
import { GenericPhasePlaceholder } from './components/placeholders/GenericPhasePlaceholder';
import { DesignSystemSpecimen } from './components/specimen/DesignSystemSpecimen';
import { NavItemId } from './components/navigation/Sidebar';
import { EvidenceUploadView } from './components/flow/EvidenceUploadView';
import { AiProcessingView } from './components/flow/AiProcessingView';
import { CctvAnalysisView } from './components/flow/CctvAnalysisView';
import { CrossCameraTrackingView } from './components/flow/CrossCameraTrackingView';
import { InvestigationMapView } from './components/flow/InvestigationMapView';
import { EvidenceTimelineView } from './components/flow/EvidenceTimelineView';
import { AiAssistantView } from './components/flow/AiAssistantView';
import { FinalReportView } from './components/flow/FinalReportView';
import { DemoFlowStep } from './components/flow/DemoProgressBar';

type ActiveView =
  | 'dashboard'
  | 'cases'
  | 'fir'
  | 'calls'
  | 'network'
  | 'create-case'
  | 'case-overview'
  | 'evidence-upload'
  | 'ai-processing'
  | 'cctv-analysis'
  | 'cross-camera-tracking'
  | 'investigation-map'
  | 'evidence-timeline'
  | 'ai-assistant'
  | 'final-report'
  | 'surveillance'
  | 'evidence'
  | 'map'
  | 'reports'
  | 'settings'
  | 'help';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [officerName, setOfficerName] = useState('Officer Sharma');
  const [officerBadge, setOfficerBadge] = useState('Badge #7492');
  const [currentView, setCurrentView] = useState<ActiveView>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1024');
  const [caseOverviewTab, setCaseOverviewTab] = useState<string>('overview');
  const [isSpecimenMode, setIsSpecimenMode] = useState<boolean>(false);

  // Handle successful login
  const handleLoginSuccess = (name: string, badgeId: string) => {
    setOfficerName(name || 'Officer Sharma');
    setOfficerBadge(`Badge #${badgeId.replace(/[^\d]/g, '') || '7492'}`);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    setIsSpecimenMode(false);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
    setIsSpecimenMode(false);
  };

  // If not logged in, render the secure NetraX Login Screen
  if (!isLoggedIn) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  // Derive title for the header
  const getViewTitle = () => {
    if (isSpecimenMode) return 'Phase 1 Component Library Specimen';
    switch (currentView) {
      case 'dashboard':
        return 'Investigator Dashboard';
      case 'cases':
        return 'Cases Directory';
      case 'fir':
        return 'FIR & Legal Documents Pipeline';
      case 'calls':
        return 'Call Detail Records (CDR) Analysis';
      case 'network':
        return 'Criminal Network & Link Analysis';
      case 'create-case':
        return 'Create New Investigation';
      case 'case-overview':
        return 'Case #NX-1024 Dossier Overview';
      case 'evidence-upload':
        return 'Evidence Ingestion & Verification';
      case 'ai-processing':
        return 'NetraX AI Analysis Pipeline';
      case 'cctv-analysis':
        return 'CCTV Optical Surveillance Analysis';
      case 'cross-camera-tracking':
        return 'Cross-Camera Vehicle Tracking';
      case 'investigation-map':
        return 'Geospatial Investigation Map';
      case 'evidence-timeline':
        return 'Chronological Evidence Timeline';
      case 'ai-assistant':
        return 'NetraX AI Assistant';
      case 'final-report':
        return 'Case #NX-1024 Investigation Report';
      case 'surveillance':
        return 'Surveillance Grid Operations';
      case 'evidence':
        return 'Evidence Repository';
      case 'map':
        return 'Investigation Map';
      case 'reports':
        return 'Reports & Dossiers';
      case 'settings':
        return 'System Configuration';
      case 'help':
        return 'Help & Documentation';
      default:
        return 'NetraX Intelligence Platform';
    }
  };

  // Map activeView to Sidebar NavItemId
  const getActiveNavId = (): NavItemId => {
    if (currentView === 'create-case' || currentView === 'case-overview') {
      return 'cases';
    }
    if (currentView === 'fir') {
      return 'fir';
    }
    if (currentView === 'calls') {
      return 'calls';
    }
    if (currentView === 'network') {
      return 'network';
    }
    if (currentView === 'evidence-upload' || currentView === 'evidence-timeline' || currentView === 'evidence') {
      return 'evidence';
    }
    if (
      currentView === 'ai-processing' ||
      currentView === 'cctv-analysis' ||
      currentView === 'cross-camera-tracking' ||
      currentView === 'surveillance'
    ) {
      return 'surveillance';
    }
    if (currentView === 'investigation-map' || currentView === 'map') {
      return 'map';
    }
    if (currentView === 'ai-assistant') {
      return 'ai-assistant';
    }
    if (currentView === 'final-report' || currentView === 'reports') {
      return 'reports';
    }
    return currentView as NavItemId;
  };

  const handleSelectNav = (id: NavItemId) => {
    setIsSpecimenMode(false);
    if (id === 'fir') {
      setCaseOverviewTab('fir');
      setCurrentView('fir');
    } else if (id === 'calls') {
      setCaseOverviewTab('calls');
      setCurrentView('calls');
    } else if (id === 'network') {
      setCaseOverviewTab('network');
      setCurrentView('network');
    } else if (id === 'evidence') {
      setCurrentView('evidence-upload');
    } else if (id === 'surveillance') {
      setCurrentView('cctv-analysis');
    } else if (id === 'map') {
      setCurrentView('investigation-map');
    } else if (id === 'ai-assistant') {
      setCurrentView('ai-assistant');
    } else if (id === 'reports') {
      setCurrentView('final-report');
    } else {
      setCurrentView(id as ActiveView);
    }
  };

  const handleNavigateSearchResult = (category: string, id: string) => {
    setIsSpecimenMode(false);
    if (category === 'fir') {
      setCaseOverviewTab('fir');
      setCurrentView('case-overview');
    } else if (category === 'cdr') {
      setCaseOverviewTab('calls');
      setCurrentView('case-overview');
    } else if (category === 'network' || category === 'person') {
      setCaseOverviewTab('network');
      setCurrentView('case-overview');
    } else if (category === 'cctv' || category === 'vehicle') {
      setCurrentView('cctv-analysis');
    } else if (category === 'case') {
      setCaseOverviewTab('overview');
      setCurrentView('case-overview');
    }
  };

  const handleStepNavigation = (step: DemoFlowStep) => {
    setIsSpecimenMode(false);
    setCurrentView(step as ActiveView);
  };

  return (
    <AppShell
      activeNavId={getActiveNavId()}
      onSelectNav={handleSelectNav}
      currentViewTitle={getViewTitle()}
      officerName={officerName}
      officerBadge={officerBadge}
      onLogout={handleLogout}
      onCreateNewCase={() => {
        setIsSpecimenMode(false);
        setCurrentView('create-case');
      }}
      isSpecimenMode={isSpecimenMode}
      onToggleSpecimenMode={() => setIsSpecimenMode(!isSpecimenMode)}
      onNavigateSearchResult={handleNavigateSearchResult}
    >
      {/* Specimen Mode (Phase 1 design library) */}
      {isSpecimenMode ? (
        <DesignSystemSpecimen
          onReturnToDashboard={() => {
            setIsSpecimenMode(false);
            setCurrentView('dashboard');
          }}
        />
      ) : (
        <>
          {/* 1. Dashboard View */}
          {currentView === 'dashboard' && (
            <InvestigatorDashboard
              onOpenCase={(caseId) => {
                setSelectedCaseId(caseId);
                setCaseOverviewTab('overview');
                setCurrentView('case-overview');
              }}
              onCreateNewCase={() => setCurrentView('create-case')}
              onViewSurveillance={() => setCurrentView('surveillance')}
              onOpenFir={() => {
                setCaseOverviewTab('fir');
                setCurrentView('case-overview');
              }}
              onOpenCdr={() => {
                setCaseOverviewTab('calls');
                setCurrentView('case-overview');
              }}
              onOpenNetwork={() => {
                setCaseOverviewTab('network');
                setCurrentView('case-overview');
              }}
            />
          )}

          {/* 2. Cases Directory */}
          {currentView === 'cases' && (
            <CasesListView
              onOpenCase={(caseId) => {
                setSelectedCaseId(caseId);
                setCaseOverviewTab('overview');
                setCurrentView('case-overview');
              }}
              onCreateNewCase={() => setCurrentView('create-case')}
            />
          )}

          {/* 3. Create Case View */}
          {currentView === 'create-case' && (
            <CreateCaseView
              onCancel={() => setCurrentView('dashboard')}
              onCaseCreated={(caseData) => {
                setSelectedCaseId(caseData.id);
                setCaseOverviewTab('overview');
                setCurrentView('case-overview');
              }}
            />
          )}

          {/* 4. Unified Case Overview / FIR / CDR / Network Views */}
          {(currentView === 'case-overview' ||
            currentView === 'fir' ||
            currentView === 'calls' ||
            currentView === 'network') && (
            <CaseOverviewView
              caseId={selectedCaseId}
              initialTab={
                currentView === 'fir'
                  ? 'fir'
                  : currentView === 'calls'
                  ? 'calls'
                  : currentView === 'network'
                  ? 'network'
                  : caseOverviewTab
              }
              onBack={() => setCurrentView('dashboard')}
              onViewSurveillance={() => setCurrentView('cctv-analysis')}
              onViewMap={() => setCurrentView('investigation-map')}
              onOpenEvidenceUpload={() => setCurrentView('evidence-upload')}
              onStartAnalysisFlow={() => setCurrentView('ai-processing')}
              onOpenReport={() => setCurrentView('final-report')}
              onAskAi={() => setCurrentView('ai-assistant')}
            />
          )}

          {/* DEMO FLOW STEP 1: Evidence Upload */}
          {(currentView === 'evidence-upload' || currentView === 'evidence') && (
            <EvidenceUploadView
              onRunAiAnalysis={() => setCurrentView('ai-processing')}
              onNavigateStep={handleStepNavigation}
            />
          )}

          {/* DEMO FLOW STEP 2: AI Processing */}
          {currentView === 'ai-processing' && (
            <AiProcessingView
              onViewAnalysis={() => setCurrentView('cctv-analysis')}
              onNavigateStep={handleStepNavigation}
            />
          )}

          {/* DEMO FLOW STEP 3: CCTV Optical Detection */}
          {currentView === 'cctv-analysis' && (
            <CctvAnalysisView
              onTrackAcrossCameras={() => setCurrentView('cross-camera-tracking')}
              onNavigateStep={handleStepNavigation}
            />
          )}

          {/* DEMO FLOW STEP 4: Cross-Camera Tracking */}
          {currentView === 'cross-camera-tracking' && (
            <CrossCameraTrackingView
              onViewMap={() => setCurrentView('investigation-map')}
              onNavigateStep={handleStepNavigation}
            />
          )}

          {/* DEMO FLOW STEP 5: Investigation Map & Geospatial Trajectory */}
          {(currentView === 'investigation-map' || currentView === 'map') && (
            <InvestigationMapView
              onViewTimeline={() => setCurrentView('evidence-timeline')}
              onNavigateStep={handleStepNavigation}
            />
          )}

          {/* DEMO FLOW STEP 6: Evidence Timeline */}
          {currentView === 'evidence-timeline' && (
            <EvidenceTimelineView
              onOpenAiAssistant={() => setCurrentView('ai-assistant')}
              onNavigateStep={handleStepNavigation}
            />
          )}

          {/* DEMO FLOW STEP 7: NetraX AI Assistant */}
          {currentView === 'ai-assistant' && (
            <AiAssistantView
              onGenerateReport={() => setCurrentView('final-report')}
              onNavigateStep={handleStepNavigation}
            />
          )}

          {/* DEMO FLOW STEP 8: Final Investigation Dossier */}
          {(currentView === 'final-report' || currentView === 'reports') && (
            <FinalReportView
              onBackToCase={() => setCurrentView('case-overview')}
              onNavigateStep={handleStepNavigation}
            />
          )}

          {/* Grid Surveillance Feed View */}
          {currentView === 'surveillance' && (
            <SurveillanceView
              onBackToDashboard={() => setCurrentView('dashboard')}
            />
          )}

          {/* 10. Settings & Help */}
          {(currentView === 'settings' || currentView === 'help') && (
            <GenericPhasePlaceholder
              title="System Configuration & Protocols"
              phaseNumber="Admin"
              description="Surveillance camera node management, AES-256 encryption keys, audit trails, and precinct officer permissions."
              icon="settings"
              onNavigateToDashboard={() => setCurrentView('dashboard')}
            />
          )}
        </>
      )}
    </AppShell>
  );
}
