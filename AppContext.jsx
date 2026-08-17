import React, { createContext, useContext, useState, useEffect } from 'react';
import { STUDENTS, AUTOMATION_RULES, SIMULATION_SCENARIOS, DEAN_METRICS, MENTORS } from '../data/mockData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState('light');
  
  // Active Persona: 'mentor' (Faculty) | 'student' (Student Portal) | 'dean' (Dean / Admin)
  const [persona, setPersona] = useState('mentor');
  
  // Active Main Navigation Tab: 'matrix' | 'simulator' | 'rules' | 'analytics'
  const [activeTab, setActiveTab] = useState('matrix');
  
  // Data state
  const [students, setStudents] = useState(STUDENTS);
  const [rules, setRules] = useState(AUTOMATION_RULES);
  const [mentors] = useState(MENTORS);
  const [deanMetrics, setDeanMetrics] = useState(DEAN_METRICS);
  
  // Active selected student for 360 Drawer
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Modals state
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLogMeetingOpen, setIsLogMeetingOpen] = useState(false);
  const [isExplainRiskOpen, setIsExplainRiskOpen] = useState(false);
  const [isDirectiveOpen, setIsDirectiveOpen] = useState(false);
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const [meetingStudentTarget, setMeetingStudentTarget] = useState(null);
  const [explainStudentTarget, setExplainStudentTarget] = useState(null);
  
  // Live Simulation state
  const [activeScenario, setActiveScenario] = useState(SIMULATION_SCENARIOS[0]);
  const [simStep, setSimStep] = useState(0);
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  
  // Toast notifications stack
  const [toasts, setToasts] = useState([
    { id: 1, type: 'info', title: 'System Active', message: 'Autonomous Watchdog monitoring 1,370 active student biometrics & grade feeds.' }
  ]);

  // Sync theme with HTML data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addToast = (toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, ...toast }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Resolve an intervention for a student
  const resolveIntervention = (studentId, note = 'Resolved via 1-on-1 counseling') => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          riskTier: 'MODERATE',
          overallRiskScore: Math.max(25, s.overallRiskScore - 30),
          healthGrowthScore: Math.min(95, s.healthGrowthScore + 18),
          interventionHistory: [
            {
              id: `INT-${Date.now()}`,
              timestamp: new Date().toLocaleString(),
              type: 'RESOLVED',
              title: 'Mentor Resolution Logged',
              description: note,
              status: 'RESOLVED'
            },
            ...s.interventionHistory
          ]
        };
      }
      return s;
    }));

    // Trigger confetti celebration!
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // safe fallback
    }

    addToast({
      type: 'success',
      title: 'Intervention Resolved',
      message: `Risk level updated for student. Escalation timer closed.`
    });
  };

  // Add a new mentor note
  const addMentorNote = (studentId, noteText, actionItems = []) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          interventionHistory: [
            {
              id: `INT-${Date.now()}`,
              timestamp: new Date().toLocaleString(),
              type: 'MENTOR_NOTE',
              title: '1-on-1 Session Note Recorded',
              description: noteText + (actionItems.length > 0 ? ` | Agreed Actions: ${actionItems.join(', ')}` : ''),
              status: 'COMPLETED'
            },
            ...s.interventionHistory
          ]
        };
      }
      return s;
    }));

    addToast({
      type: 'info',
      title: 'Note Logged',
      message: 'Meeting summary saved to student audit ledger.'
    });
  };

  // Toggle rule status
  const toggleRule = (ruleId) => {
    setRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        const newStatus = r.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        addToast({
          type: newStatus === 'ACTIVE' ? 'success' : 'warning',
          title: `Rule ${r.code} ${newStatus === 'ACTIVE' ? 'Activated' : 'Paused'}`,
          message: `${r.name} is now ${newStatus.toLowerCase()}.`
        });
        return { ...r, status: newStatus };
      }
      return r;
    }));
  };

  // Add a new custom rule
  const addRule = (newRule) => {
    setRules(prev => [newRule, ...prev]);
    addToast({
      type: 'success',
      title: 'Policy Published',
      message: `Autonomous Rule ${newRule.code} is now live across all departments.`
    });
  };

  // Run a scenario in the simulator
  const runScenario = (scenario) => {
    setActiveScenario(scenario);
    setSimStep(1);
    setIsSimRunning(true);
    setSimLogs([{ time: new Date().toLocaleTimeString(), message: `Triggering event: ${scenario.triggerPayload.event}` }]);

    addToast({
      type: 'ai',
      title: 'Simulation Started',
      message: `Executing autonomous workflow for ${scenario.studentName}...`
    });

    // Step 1: Ingest
    setTimeout(() => {
      setSimStep(2);
      setSimLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message: 'Step 2: AI Root Cause Diagnostic generated with 94.2% confidence.' }]);
    }, 1200);

    // Step 2: Diagnostic & WhatsApp
    setTimeout(() => {
      setSimStep(3);
      setSimLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message: 'Step 3: Multi-channel WhatsApp & Email payload dispatched with recovery link.' }]);
    }, 2400);

    // Step 3: Mentor Auto Schedule
    setTimeout(() => {
      setSimStep(4);
      setSimLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message: 'Step 4: Calendar invite created & assigned to Dr. Sarah Chen.' }]);
    }, 3600);

    // Step 4: Escalation timer
    setTimeout(() => {
      setSimStep(5);
      setIsSimRunning(false);
      setSimLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message: 'Step 5: 72-Hour Escalation Watchdog started. Workflow Complete.' }]);
      addToast({
        type: 'success',
        title: 'Autonomous Flow Complete',
        message: 'All 5 intervention actions dispatched successfully.'
      });
    }, 4800);
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      persona,
      setPersona,
      activeTab,
      setActiveTab,
      students,
      setStudents,
      rules,
      mentors,
      deanMetrics,
      setDeanMetrics,
      selectedStudent,
      setSelectedStudent,
      isSimulatorOpen,
      setIsSimulatorOpen,
      isSearchOpen,
      setIsSearchOpen,
      isLogMeetingOpen,
      setIsLogMeetingOpen,
      isExplainRiskOpen,
      setIsExplainRiskOpen,
      isDirectiveOpen,
      setIsDirectiveOpen,
      isCreateRuleOpen,
      setIsCreateRuleOpen,
      meetingStudentTarget,
      setMeetingStudentTarget,
      explainStudentTarget,
      setExplainStudentTarget,
      activeScenario,
      setActiveScenario,
      simStep,
      setSimStep,
      isSimRunning,
      simLogs,
      runScenario,
      toasts,
      addToast,
      removeToast,
      resolveIntervention,
      addMentorNote,
      toggleRule,
      addRule
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
