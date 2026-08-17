import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SIMULATION_SCENARIOS } from '../../data/mockData';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Cpu, 
  Sparkles, 
  X, 
  Check, 
  ExternalLink, 
  FileText,
  Sliders,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const WorkflowSimulatorModal = () => {
  const { 
    isSimulatorOpen, 
    setIsSimulatorOpen, 
    activeScenario, 
    setActiveScenario,
    simStep, 
    setSimStep, 
    isSimRunning, 
    simLogs, 
    runScenario,
    resolveIntervention 
  } = useApp();

  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'payload' | 'whatsapp' | 'calendar'
  const [customAttendance, setCustomAttendance] = useState(63);
  const [customMidterm, setCustomMidterm] = useState(32);
  const [customAssignments, setCustomAssignments] = useState(2);

  if (!isSimulatorOpen) return null;

  const handleStartCustom = () => {
    const customScen = {
      id: 'CUSTOM_01',
      title: 'Custom Live Anomaly Simulation',
      subtitle: `Attendance: ${customAttendance}% | Midterm: ${customMidterm}% | Defaults: ${customAssignments}`,
      studentId: 'STU-101',
      studentName: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      description: `Custom scenario evaluating cascade risks with ${customAttendance}% attendance and ${customMidterm}% internal marks.`,
      triggerPayload: {
        event: 'CUSTOM_RISK_INJECTION',
        attendance: `${customAttendance}%`,
        internalMark: `${customMidterm}%`,
        assignmentDefaults: customAssignments
      },
      aiDiagnosisSummary: `Multi-factor risk: Attendance below university statutory 75% limit combined with ${customMidterm}% marks creates an estimated 86% failure velocity.`,
      whatsappMessagePreview: `👋 Hi Rahul, EduFlow detected a combined risk profile (Attendance: ${customAttendance}%, Midterm: ${customMidterm}%). Your mentor Dr. Sarah Chen is ready to assist with a personalized recovery pathway.`,
      mentorTask: `Conduct diagnostic check-in and formulate custom recovery roadmap for Rahul Sharma.`,
      escalationDeadlineHours: 72
    };
    runScenario(customScen);
  };

  const steps = [
    {
      num: 1,
      title: 'Trigger Event Ingestion',
      subtitle: 'Biometric turnstile / LMS sync anomaly detected',
      icon: <Cpu size={18} />
    },
    {
      num: 2,
      title: 'AI Root-Cause Diagnosis',
      subtitle: 'Multi-factor neural explainability & risk cascade prediction',
      icon: <Sparkles size={18} />
    },
    {
      num: 3,
      title: 'Multi-Channel Alert Dispatch',
      subtitle: 'Empathetic WhatsApp & Email nudge with recovery roadmap link',
      icon: <MessageSquare size={18} />
    },
    {
      num: 4,
      title: 'Mentor Task Auto-Scheduled',
      subtitle: '1-on-1 counseling slot reserved in Dr. Sarah Chen\'s calendar',
      icon: <Calendar size={18} />
    },
    {
      num: 5,
      title: '72h Escalation Watchdog Timer',
      subtitle: 'Automated Tier-2 escalation countdown initiated',
      icon: <Clock size={18} />
    }
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsSimulatorOpen(false)}>
      <div 
        className="modal-content modal-content-xl"
        onClick={e => e.stopPropagation()}
        style={{ padding: 0 }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon-box" style={{ width: '32px', height: '32px' }}>
              <Play size={16} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Autonomous Workflow Simulator
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Live sandbox to trigger real-time student anomalies & inspect the 5-step autonomous action chain
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsSimulatorOpen(false)}
            style={{ color: 'var(--text-dim)', padding: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Main Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: '520px' }}>
          {/* Left Column: Preset Scenarios & Custom Builder */}
          <div style={{
            borderRight: '1px solid var(--card-border)',
            background: 'var(--card-bg-subtle)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            overflowY: 'auto'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🎯 Select Simulation Scenario
            </div>

            {/* Scenario Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {SIMULATION_SCENARIOS.map(scen => (
                <div
                  key={scen.id}
                  onClick={() => {
                    setActiveScenario(scen);
                    runScenario(scen);
                  }}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: activeScenario.id === scen.id ? 'var(--primary-500)' : 'var(--card-border)',
                    background: activeScenario.id === scen.id ? 'var(--primary-50)' : 'var(--card-bg)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <img 
                      src={scen.avatar} 
                      alt={scen.studentName} 
                      style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ fontWeight: 700, fontSize: '0.825rem', color: 'var(--text-primary)' }}>
                      {scen.studentName}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: activeScenario.id === scen.id ? 'var(--primary-700)' : 'var(--text-secondary)' }}>
                    {scen.subtitle}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.3 }}>
                    {scen.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Scenario Drawer / Sliders */}
            <div style={{
              marginTop: '0.5rem',
              padding: '0.85rem',
              background: 'var(--card-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--card-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                <Sliders size={14} color="var(--primary-500)" />
                <span>Custom Anomaly Injector</span>
              </div>
              
              <div style={{ marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                  <span>Attendance:</span>
                  <b style={{ color: customAttendance < 75 ? 'var(--rose-600)' : 'var(--emerald-600)' }}>{customAttendance}%</b>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="95" 
                  value={customAttendance}
                  onChange={e => setCustomAttendance(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                  <span>Midterm Score:</span>
                  <b style={{ color: customMidterm < 40 ? 'var(--rose-600)' : 'var(--emerald-600)' }}>{customMidterm}%</b>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={customMidterm}
                  onChange={e => setCustomMidterm(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <button 
                className="btn btn-primary"
                onClick={handleStartCustom}
                disabled={isSimRunning}
                style={{ width: '100%', marginTop: '0.35rem', fontSize: '0.75rem', padding: '0.4rem' }}
              >
                <Play size={12} />
                <span>Inject Custom Anomaly</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Visual Action Chain */}
          <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
            {/* Simulation Controller Top Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.15rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--card-border)'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  ACTIVE SIMULATION TARGET
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {activeScenario.title}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => runScenario(activeScenario)}
                  disabled={isSimRunning}
                >
                  <RotateCcw size={14} />
                  <span>Re-Run Flow</span>
                </button>
                {simStep >= 5 && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => resolveIntervention(activeScenario.studentId, 'Resolved via Simulator Action')}
                  >
                    <CheckCircle2 size={14} />
                    <span>Simulate Mentor Resolution</span>
                  </button>
                )}
              </div>
            </div>

            {/* Step-by-Step Visual Pipeline */}
            <div className="sim-pipeline">
              {steps.map((step) => {
                const isCompleted = simStep > step.num;
                const isActive = simStep === step.num;
                const isPending = simStep < step.num;

                return (
                  <div 
                    key={step.num}
                    className={`sim-step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  >
                    <div className="sim-step-number">
                      {isCompleted ? <Check size={16} /> : step.num}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: isActive ? 'var(--primary-600)' : 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                            {step.title}
                          </span>
                          {isActive && (
                            <span className="risk-pill risk-pill-ai" style={{ fontSize: '0.65rem' }}>
                              ⚡ Executing...
                            </span>
                          )}
                          {isCompleted && (
                            <span className="risk-pill risk-pill-normal" style={{ fontSize: '0.65rem' }}>
                              ✓ Dispatched
                            </span>
                          )}
                        </div>

                        {/* Interactive inspection tab buttons */}
                        {step.num === 1 && simStep >= 1 && (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => setActiveTab('payload')}
                            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                          >
                            Inspect JSON
                          </button>
                        )}
                        {step.num === 3 && simStep >= 3 && (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => setActiveTab('whatsapp')}
                            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                          >
                            View WhatsApp Payload
                          </button>
                        )}
                        {step.num === 4 && simStep >= 4 && (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => setActiveTab('calendar')}
                            style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                          >
                            View Calendar Invite
                          </button>
                        )}
                      </div>

                      <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {step.subtitle}
                      </div>

                      {/* Step 2 AI diagnosis card */}
                      {step.num === 2 && simStep >= 2 && (
                        <div style={{
                          marginTop: '0.65rem',
                          padding: '0.75rem',
                          background: 'var(--card-bg)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--primary-200)',
                          fontSize: '0.775rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-600)', fontWeight: 700, marginBottom: '0.25rem' }}>
                            <Sparkles size={14} />
                            <span>XAI Diagnostic Summary (Confidence: 94.2%)</span>
                          </div>
                          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                            {activeScenario.aiDiagnosisSummary}
                          </p>
                        </div>
                      )}

                      {/* Step 5 Escalation countdown banner */}
                      {step.num === 5 && simStep >= 5 && (
                        <div style={{
                          marginTop: '0.65rem',
                          padding: '0.75rem',
                          background: 'var(--rose-50)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--rose-200)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldAlert size={16} color="var(--rose-600)" />
                            <div>
                              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--rose-700)' }}>
                                Tier-2 HOD Escalation Watchdog Active
                              </div>
                              <div style={{ fontSize: '0.725rem', color: 'var(--rose-600)' }}>
                                Automated escalation will notify Dept Head if Dr. Sarah Chen has not logged meeting in 72:00:00.
                              </div>
                            </div>
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            color: 'var(--rose-700)',
                            background: 'white',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px solid var(--rose-200)'
                          }}>
                            71:59:42
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Live Inspection Drawers / Modals */}
            {activeTab === 'whatsapp' && (
              <div style={{
                background: '#075E54',
                color: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem',
                boxShadow: 'var(--shadow-md)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem' }}>
                    <MessageSquare size={16} />
                    <span>WhatsApp Enterprise Payload (Simulated Dispatch)</span>
                  </div>
                  <button onClick={() => setActiveTab('pipeline')} style={{ color: 'white', opacity: 0.8 }}>
                    <X size={16} />
                  </button>
                </div>
                <div style={{
                  background: '#ECE5DD',
                  color: '#111B21',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  position: 'relative'
                }}>
                  {activeScenario.whatsappMessagePreview}
                  <div style={{ textAlign: 'right', fontSize: '0.65rem', color: '#667781', marginTop: '0.4rem' }}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓✓ Delivered
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payload' && (
              <div style={{
                background: '#0F172A',
                color: '#38BDF8',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.775rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#94A3B8', fontWeight: 700 }}>EVENT_INGESTION_PAYLOAD.JSON</span>
                  <button onClick={() => setActiveTab('pipeline')} style={{ color: '#94A3B8' }}>
                    <X size={14} />
                  </button>
                </div>
                <pre style={{ overflowX: 'auto', margin: 0 }}>
                  {JSON.stringify(activeScenario.triggerPayload, null, 2)}
                </pre>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    <Calendar size={16} color="var(--primary-500)" />
                    <span>Auto-Generated Google Workspace Calendar Invite</span>
                  </div>
                  <button onClick={() => setActiveTab('pipeline')} style={{ color: 'var(--text-dim)' }}>
                    <X size={16} />
                  </button>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <b>Event:</b> 1-on-1 Academic Risk Intervention Check-in<br />
                  <b>Host:</b> Dr. Sarah Chen (Dept of CSE)<br />
                  <b>Invitee:</b> {activeScenario.studentName} ({activeScenario.studentId})<br />
                  <b>Brief:</b> {activeScenario.mentorTask}<br />
                  <b>Location:</b> Cabin 304 / Google Meet (Auto-generated link)
                </div>
              </div>
            )}

            {/* Live Terminal Log */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
                <span className="live-indicator" />
                <span>Autonomous Event Log Stream</span>
              </div>
              {simLogs.map((log, index) => (
                <div key={index} style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  <span style={{ color: 'var(--text-dim)' }}>[{log.time}]</span> {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={() => setIsSimulatorOpen(false)}
          >
            Close Sandbox
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsSimulatorOpen(false);
              // also open student drawer to view changes
              const stu = useApp ? null : null;
            }}
          >
            View Live Cohort
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSimulatorModal;
