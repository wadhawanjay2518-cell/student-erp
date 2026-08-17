import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  Clock, 
  Calendar, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  UserCheck, 
  Send, 
  Phone, 
  Mail, 
  FileText, 
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Award
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

const StudentDrawer = () => {
  const { selectedStudent, setSelectedStudent, setIsLogMeetingOpen, setMeetingStudentTarget, setIsExplainRiskOpen, setExplainStudentTarget, addToast, resolveIntervention } = useApp();
  const [activeDrawerTab, setActiveDrawerTab] = useState('overview'); // 'overview' | 'academic' | 'audit' | 'actions'
  const [customNudge, setCustomNudge] = useState('');
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');

  if (!selectedStudent) return null;

  const handleSendNudge = (e) => {
    e.preventDefault();
    if (!customNudge.trim()) return;
    addToast({
      type: 'success',
      title: 'WhatsApp Nudge Dispatched',
      message: `Message delivered to ${selectedStudent.name}'s verified WhatsApp.`
    });
    setCustomNudge('');
  };

  const handleOverride = (e) => {
    e.preventDefault();
    resolveIntervention(selectedStudent.id, `Faculty Risk Flag Override: ${overrideReason || 'Approved by Faculty Mentor'}`);
    setIsOverrideOpen(false);
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setSelectedStudent(null)} />
      <div className="drawer-container">
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'var(--card-bg)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src={selectedStudent.avatar} 
              alt={selectedStudent.name} 
              style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-400)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedStudent.name}
                </h2>
                <span className={`risk-pill risk-pill-${selectedStudent.riskTier === 'CRITICAL' ? 'critical' : selectedStudent.riskTier === 'MODERATE' ? 'moderate' : 'normal'}`}>
                  {selectedStudent.riskTier === 'CRITICAL' ? '🔴 Critical Intervention' : selectedStudent.riskTier === 'MODERATE' ? '🟡 Moderate Risk' : '🟢 On-Track'}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Roll #{selectedStudent.rollNo} • {selectedStudent.department} • {selectedStudent.semester} ({selectedStudent.batch})
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem', marginTop: '0.35rem' }}>
                <span>📞 {selectedStudent.phone}</span>
                <span>✉️ {selectedStudent.email}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setSelectedStudent(null)}
            style={{ color: 'var(--text-dim)', padding: '6px', borderRadius: 'var(--radius-md)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs inside Drawer */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--card-border)',
          background: 'var(--card-bg-subtle)',
          padding: '0 1rem'
        }}>
          {[
            { id: 'overview', label: 'AI Diagnosis & Overview' },
            { id: 'academic', label: 'Academic Trajectory' },
            { id: 'audit', label: `Audit Log (${selectedStudent.interventionHistory?.length || 0})` },
            { id: 'actions', label: 'Mentor Actions' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveDrawerTab(tab.id)}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.825rem',
                fontWeight: 700,
                color: activeDrawerTab === tab.id ? 'var(--primary-600)' : 'var(--text-muted)',
                borderBottom: `2px solid ${activeDrawerTab === tab.id ? 'var(--primary-600)' : 'transparent'}`,
                background: 'transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drawer Body Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* TAB 1: AI DIAGNOSIS & OVERVIEW */}
          {activeDrawerTab === 'overview' && (
            <>
              {/* Alert Reason Banner */}
              <div style={{
                background: selectedStudent.riskTier === 'CRITICAL' ? 'var(--rose-50)' : 'var(--amber-50)',
                border: `1px solid ${selectedStudent.riskTier === 'CRITICAL' ? 'var(--rose-200)' : 'var(--amber-200)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <AlertTriangle size={20} color={selectedStudent.riskTier === 'CRITICAL' ? 'var(--rose-600)' : 'var(--amber-600)'} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: selectedStudent.riskTier === 'CRITICAL' ? 'var(--rose-800)' : 'var(--amber-800)' }}>
                    Autonomous Risk Flag Justification
                  </div>
                  <div style={{ fontSize: '0.8rem', color: selectedStudent.riskTier === 'CRITICAL' ? 'var(--rose-700)' : 'var(--amber-700)', marginTop: '0.15rem' }}>
                    {selectedStudent.flagReason}
                  </div>
                </div>
              </div>

              {/* Quick Metrics KPI Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div style={{ background: 'var(--card-bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>ATTENDANCE</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: selectedStudent.attendance.current < 75 ? 'var(--rose-600)' : 'var(--emerald-600)' }}>
                    {selectedStudent.attendance.current}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>75% Required Threshold</div>
                </div>

                <div style={{ background: 'var(--card-bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>CUMULATIVE GPA</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {selectedStudent.academic.cgpa}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Cohort Avg: {selectedStudent.academic.cohortAvgCGPA}</div>
                </div>

                <div style={{ background: 'var(--card-bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>HALL TICKET STATUS</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: selectedStudent.hallTicketStatus === 'ELIGIBLE' ? 'var(--emerald-600)' : 'var(--amber-600)' }}>
                    {selectedStudent.hallTicketStatus}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Lab practical clearance</div>
                </div>
              </div>

              {/* AI Explainability & Feature Importance Card */}
              <div className="glass-card" style={{ padding: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <Sparkles size={16} color="var(--primary-500)" />
                    <span>AI Diagnosis & Risk Cascade Forecast</span>
                  </div>
                  <span className="risk-pill risk-pill-ai" style={{ fontSize: '0.7rem' }}>
                    {selectedStudent.aiDiagnosis?.confidence || 94.2}% Confidence
                  </span>
                </div>

                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                  {selectedStudent.aiDiagnosis?.riskCascadePrediction}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedStudent.aiDiagnosis?.featureWeights?.map((fw, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                        <span>{fw.factor}</span>
                        <b style={{ color: 'var(--primary-600)' }}>{fw.weight}%</b>
                      </div>
                      <div style={{ width: '100%', height: '5px', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                        <div style={{ width: `${fw.weight}%`, height: '100%', background: 'var(--primary-500)', borderRadius: '10px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course-Wise Attendance & Marks Grid */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                  Course-Wise Attendance & Internal Marks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedStudent.academic.courses.map((course, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        background: 'var(--card-bg-subtle)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--card-border)'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          [{course.code}] {course.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Internal Mark: <b>{course.internalMark}/{course.maxInternal}</b>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className={`risk-pill ${course.attendance < 75 ? 'risk-pill-critical' : 'risk-pill-normal'}`} style={{ fontSize: '0.75rem' }}>
                          {course.attendance}% Att.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biometric Turnstile Anomalies */}
              {selectedStudent.attendance.anomalies?.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                    Biometric Anomalies Log
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedStudent.attendance.anomalies.map((anom, idx) => (
                      <div 
                        key={idx}
                        style={{
                          padding: '0.6rem 0.85rem',
                          background: 'var(--card-bg)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--card-border)',
                          fontSize: '0.775rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--text-primary)' }}>
                          <span>{anom.date} ({anom.day})</span>
                          <span style={{ color: 'var(--rose-600)' }}>Turnstile Anomaly</span>
                        </div>
                        <div style={{ color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          {anom.reason} • <i>{anom.biometric}</i>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: ACADEMIC TRAJECTORY */}
          {activeDrawerTab === 'academic' && (
            <>
              <div className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Semester GPA vs Cohort Average Trajectory
                </div>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Continuous comparison against department batch baseline
                </p>

                <div style={{ width: '100%', height: '240px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedStudent.academic.gpaHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                      <XAxis dataKey="sem" stroke="var(--text-muted)" fontSize={11} />
                      <YAxis domain={[5, 10]} stroke="var(--text-muted)" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--card-bg)', 
                          borderColor: 'var(--card-border)', 
                          borderRadius: '8px',
                          color: 'var(--text-primary)' 
                        }} 
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                      <Line type="monotone" dataKey="gpa" name={`${selectedStudent.name} (GPA)`} stroke="var(--primary-600)" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="cohort" name="Cohort Average" stroke="var(--text-dim)" strokeDasharray="4 4" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Continuous Internal Assessment Breakdown */}
              <div className="glass-card" style={{ padding: '1.15rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  Continuous Assessment Breakdown
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0.4rem 0', borderBottom: '1px solid var(--card-border)' }}>
                    <span>Active Backlogs</span>
                    <b>{selectedStudent.academic.backlogs}</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0.4rem 0', borderBottom: '1px solid var(--card-border)' }}>
                    <span>Scholarship Standing</span>
                    <b>{selectedStudent.academic.scholarship}</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0.4rem 0' }}>
                    <span>Fee Clearance</span>
                    <b style={{ color: selectedStudent.feeStatus === 'PAID' ? 'var(--emerald-600)' : 'var(--rose-600)' }}>
                      {selectedStudent.feeStatus}
                    </b>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 3: AUDIT & COMMUNICATION HISTORY */}
          {activeDrawerTab === 'audit' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Intervention & Communication Audit Trail
              </div>

              {selectedStudent.interventionHistory?.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '0.85rem',
                    background: 'var(--card-bg-subtle)',
                    border: '1px solid var(--card-border)',
                    borderRadius: 'var(--radius-md)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.title}
                    </span>
                    <span className="risk-pill risk-pill-ai" style={{ fontSize: '0.65rem' }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {item.description}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.4rem' }}>
                    🕒 {item.timestamp}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: MENTOR ACTIONS */}
          {activeDrawerTab === 'actions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Primary Action: Log Meeting */}
              <div className="glass-card" style={{ padding: '1.15rem', background: 'var(--primary-50)', borderColor: 'var(--primary-200)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.35rem' }}>
                  Log 1-on-1 Mentoring Meeting
                </div>
                <p style={{ fontSize: '0.775rem', color: 'var(--primary-700)', marginBottom: '0.85rem' }}>
                  Record diagnostic discussion, agreed action items, and close the 72-hour escalation timer.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setMeetingStudentTarget(selectedStudent);
                    setIsLogMeetingOpen(true);
                  }}
                >
                  <UserCheck size={16} />
                  <span>Open Guided Session Logger</span>
                </button>
              </div>

              {/* Direct Custom WhatsApp Nudge */}
              <div className="glass-card" style={{ padding: '1.15rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Send Custom WhatsApp Nudge
                </div>
                <form onSubmit={handleSendNudge} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <textarea
                    rows={2}
                    placeholder="Type custom note to student's verified WhatsApp (e.g. Please meet me during office hours tomorrow at 11am)..."
                    value={customNudge}
                    onChange={e => setCustomNudge(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--card-border)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.8rem',
                      outline: 'none'
                    }}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
                    <Send size={14} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>

              {/* Override Risk Flag */}
              <div className="glass-card" style={{ padding: '1.15rem', border: '1px solid var(--rose-200)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--rose-700)', marginBottom: '0.35rem' }}>
                  Faculty Risk Flag Override
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Manually de-escalate this student's risk flag if verified genuine medical or sports exemption applies.
                </p>
                
                {isOverrideOpen ? (
                  <form onSubmit={handleOverride} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="Enter auditable faculty justification..."
                      value={overrideReason}
                      onChange={e => setOverrideReason(e.target.value)}
                      style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', fontSize: '0.775rem' }}
                      required
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="submit" className="btn btn-danger btn-sm">Confirm Override</button>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsOverrideOpen(false)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <button className="btn btn-secondary btn-sm" onClick={() => setIsOverrideOpen(true)}>
                    Override Flag with Justification
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Drawer Sticky Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--card-border)',
          background: 'var(--card-bg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setExplainStudentTarget(selectedStudent);
              setIsExplainRiskOpen(true);
            }}
          >
            <Sparkles size={14} color="var(--primary-500)" />
            <span>Open Explainability Hub</span>
          </button>
          
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              setMeetingStudentTarget(selectedStudent);
              setIsLogMeetingOpen(true);
            }}
          >
            <UserCheck size={14} />
            <span>Log Mentoring Session</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentDrawer;
