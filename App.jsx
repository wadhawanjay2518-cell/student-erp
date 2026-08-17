import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import ToastContainer from './components/ToastContainer';
import SpotlightSearchModal from './components/SpotlightSearchModal';
import WorkflowSimulatorModal from './components/simulator/WorkflowSimulatorModal';
import LogMeetingModal from './components/modals/LogMeetingModal';
import ExplainRiskModal from './components/modals/ExplainRiskModal';
import DirectiveModal from './components/modals/DirectiveModal';
import CreateRuleModal from './components/modals/CreateRuleModal';
import StudentDrawer from './components/drawer/StudentDrawer';
import MentorView from './components/views/MentorView';
import StudentView from './components/views/StudentView';
import DeanView from './components/views/DeanView';
import RulesEngineView from './components/views/RulesEngineView';
import { 
  Users, 
  Cpu, 
  Sparkles, 
  Layers, 
  BarChart3, 
  PlayCircle,
  Clock,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

const AppContent = () => {
  const { persona, activeTab, setActiveTab, setIsSimulatorOpen, students } = useApp();

  const criticalCount = students.filter(s => s.riskTier === 'CRITICAL').length;

  return (
    <div className="app-container">
      {/* Top Application Header */}
      <Header />

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Module Sub-Navigation Bar */}
        <div className="module-nav-bar">
          <div className="module-tabs">
            {persona === 'mentor' && (
              <>
                <button 
                  className={`module-tab-link ${activeTab === 'matrix' ? 'active' : ''}`}
                  onClick={() => setActiveTab('matrix')}
                >
                  <Users size={16} />
                  <span>Cohort Risk Matrix</span>
                  {criticalCount > 0 && (
                    <span style={{ background: 'var(--rose-500)', color: 'white', fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '10px', marginLeft: '4px' }}>
                      {criticalCount}
                    </span>
                  )}
                </button>

                <button 
                  className={`module-tab-link ${activeTab === 'rules' ? 'active' : ''}`}
                  onClick={() => setActiveTab('rules')}
                >
                  <Cpu size={16} />
                  <span>Automation Policies</span>
                </button>
              </>
            )}

            {persona === 'student' && (
              <>
                <button 
                  className={`module-tab-link ${activeTab === 'matrix' ? 'active' : ''}`}
                  onClick={() => setActiveTab('matrix')}
                >
                  <GraduationCap size={16} />
                  <span>Academic Health & Growth</span>
                </button>

                <button 
                  className={`module-tab-link ${activeTab === 'rules' ? 'active' : ''}`}
                  onClick={() => setActiveTab('rules')}
                >
                  <Cpu size={16} />
                  <span>Institutional Policies</span>
                </button>
              </>
            )}

            {persona === 'dean' && (
              <>
                <button 
                  className={`module-tab-link ${activeTab === 'matrix' ? 'active' : ''}`}
                  onClick={() => setActiveTab('matrix')}
                >
                  <BarChart3 size={16} />
                  <span>Strategic Executive Overview</span>
                </button>

                <button 
                  className={`module-tab-link ${activeTab === 'rules' ? 'active' : ''}`}
                  onClick={() => setActiveTab('rules')}
                >
                  <Cpu size={16} />
                  <span>Rules Engine Configurator</span>
                </button>
              </>
            )}

            {/* Quick Sandbox Link */}
            <button 
              className="module-tab-link"
              onClick={() => setIsSimulatorOpen(true)}
              style={{ color: 'var(--primary-600)' }}
            >
              <PlayCircle size={16} />
              <span>Launch Simulator Sandbox</span>
            </button>
          </div>

          <div className="module-nav-meta">
            <span className="live-indicator" />
            <span>Real-Time Biometric & Grade Feeds Live</span>
          </div>
        </div>

        {/* Dynamic Persona & Tab Views */}
        {activeTab === 'rules' ? (
          <RulesEngineView />
        ) : (
          <>
            {persona === 'mentor' && <MentorView />}
            {persona === 'student' && <StudentView />}
            {persona === 'dean' && <DeanView />}
          </>
        )}

      </main>

      {/* Slide-Out 360° Student Profile Drawer */}
      <StudentDrawer />

      {/* Interactive Modals */}
      <WorkflowSimulatorModal />
      <SpotlightSearchModal />
      <LogMeetingModal />
      <ExplainRiskModal />
      <DirectiveModal />
      <CreateRuleModal />

      {/* Real-Time Toast Alerts Container */}
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
