import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, X, HeartHandshake, BookOpen, Clock, ShieldCheck } from 'lucide-react';

const ExplainRiskModal = () => {
  const { isExplainRiskOpen, setIsExplainRiskOpen, explainStudentTarget, setSelectedStudent } = useApp();
  
  // Recovery roadmap slider state
  const [extraClasses, setExtraClasses] = useState(7);

  if (!isExplainRiskOpen || !explainStudentTarget) return null;

  const currentAtt = explainStudentTarget.attendance.current;
  const totalClasses = explainStudentTarget.attendance.totalClassesHeld || 144;
  const attendedClasses = explainStudentTarget.attendance.classesAttended || 91;

  // Formula: (attended + extra) / (total + extra) * 100
  const projectedAttendance = Math.min(100, (((attendedClasses + extraClasses) / (totalClasses + extraClasses)) * 100)).toFixed(1);
  const isSafe = Number(projectedAttendance) >= 75.0;

  return (
    <div className="modal-overlay" onClick={() => setIsExplainRiskOpen(false)}>
      <div className="modal-content modal-content-lg" onClick={e => e.stopPropagation()} style={{ padding: 0 }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon-box" style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Academic Health Diagnostic & Explainability Hub
              </h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Transparent, empathetic root-cause analysis for <b>{explainStudentTarget.name}</b> ({explainStudentTarget.rollNo})
              </p>
            </div>
          </div>
          <button onClick={() => setIsExplainRiskOpen(false)} style={{ color: 'var(--text-dim)', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Empathetic Overview Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.05))',
            border: '1px solid var(--primary-200)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <HeartHandshake size={28} color="var(--primary-600)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.25rem' }}>
                We're here to help you stay on track, not punish you.
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                EduFlow flagged this alert because your aggregate attendance (<b>{currentAtt}%</b>) is currently below the mandatory statutory university threshold of <b>75%</b>. Our AI diagnostic indicates this is fully recoverable within <b>10 days</b>.
              </p>
            </div>
          </div>

          {/* Root Cause Feature Weights Breakdown */}
          <div className="glass-card" style={{ padding: '1.15rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="var(--primary-500)" />
              <span>Multi-Factor AI Weight Attribution (Why was this flagged?)</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {explainStudentTarget.aiDiagnosis?.featureWeights?.map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.factor}</span>
                    <span style={{ color: 'var(--primary-600)', fontWeight: 800 }}>{item.weight}% Impact</span>
                  </div>
                  <div style={{ width: '100%', height: '7px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${item.weight}%`, 
                        height: '100%', 
                        background: idx === 0 ? 'var(--rose-500)' : idx === 1 ? 'var(--amber-500)' : 'var(--primary-500)', 
                        borderRadius: '10px' 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Interactive Recovery Roadmap Simulator */}
          <div className="glass-card" style={{ padding: '1.25rem', background: 'var(--card-bg-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={18} color="var(--emerald-600)" />
                <span>Interactive Attendance Recovery Calculator</span>
              </div>
              <span className={`risk-pill ${isSafe ? 'risk-pill-normal' : 'risk-pill-critical'}`}>
                {isSafe ? '✓ Clearance Achieved' : '⚠️ Below 75% Cutoff'}
              </span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Slide to forecast how attending consecutive upcoming lecture and laboratory hours will restore your academic standing and ensure <b>Hall Ticket Clearance</b>.
            </p>

            {/* Slider Control */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                <span>If I attend the next: <span style={{ color: 'var(--primary-600)', fontSize: '1rem' }}>{extraClasses} consecutive classes</span></span>
                <span>Projected Attendance: <b style={{ color: isSafe ? 'var(--emerald-600)' : 'var(--rose-600)', fontSize: '1.1rem' }}>{projectedAttendance}%</b></span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={extraClasses}
                onChange={e => setExtraClasses(Number(e.target.value))}
                style={{ width: '100%', height: '8px', accentColor: isSafe ? 'var(--emerald-600)' : 'var(--primary-600)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                <span>1 Class</span>
                <span style={{ color: 'var(--amber-700)', fontWeight: 600 }}>7 Classes (Recovery Target)</span>
                <span>20 Classes</span>
              </div>
            </div>

            {/* Projected Milestone Result Box */}
            <div style={{
              background: isSafe ? 'var(--emerald-50)' : 'var(--amber-50)',
              border: `1px solid ${isSafe ? 'var(--emerald-200)' : 'var(--amber-200)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {isSafe ? <ShieldCheck size={22} color="var(--emerald-600)" /> : <AlertTriangle size={22} color="var(--amber-600)" />}
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isSafe ? 'var(--emerald-800)' : 'var(--amber-800)' }}>
                    {isSafe 
                      ? `Target Reached: Hall Ticket will be Unlocked!` 
                      : `Needs ${Math.max(0, 7 - extraClasses)} more continuous classes to achieve 75% clearance`}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: isSafe ? 'var(--emerald-700)' : 'var(--amber-700)' }}>
                    End-Semester Practical eligibility automatically verified upon reaching 75.0%.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Recovery Checklist */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              🚀 Recommended Recovery Action Steps
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {explainStudentTarget.aiDiagnosis?.recommendedPlan?.map((plan, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.6rem 0.85rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  <CheckCircle2 size={16} color="var(--emerald-600)" />
                  <span>{plan}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setIsExplainRiskOpen(false)}>
            Close
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setIsExplainRiskOpen(false);
              setSelectedStudent(explainStudentTarget);
            }}
          >
            View Full 360° Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplainRiskModal;
