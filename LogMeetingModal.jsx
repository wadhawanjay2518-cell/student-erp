import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, CheckCircle2, AlertCircle, X, Plus, Calendar, Clock, Sparkles } from 'lucide-react';

const LogMeetingModal = () => {
  const { isLogMeetingOpen, setIsLogMeetingOpen, meetingStudentTarget, addMentorNote, resolveIntervention } = useApp();
  
  const [rootCause, setRootCause] = useState('Transport & Hostel Timings');
  const [notes, setNotes] = useState('');
  const [actionItems, setActionItems] = useState([
    'Attend 7 continuous lecture slots without absence',
    'Submit DBMS make-up practical journal to Lab in-charge by Friday'
  ]);
  const [newAction, setNewAction] = useState('');
  const [markResolved, setMarkResolved] = useState(true);

  if (!isLogMeetingOpen || !meetingStudentTarget) return null;

  const handleAddAction = (e) => {
    e.preventDefault();
    if (newAction.trim()) {
      setActionItems([...actionItems, newAction.trim()]);
      setNewAction('');
    }
  };

  const handleRemoveAction = (index) => {
    setActionItems(actionItems.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalNote = `Root Cause: ${rootCause}. Notes: ${notes || 'Conducted standard diagnostic check-in.'}`;
    addMentorNote(meetingStudentTarget.id, finalNote, actionItems);
    
    if (markResolved) {
      resolveIntervention(meetingStudentTarget.id, `Resolved by Dr. Sarah Chen: ${rootCause} addressed.`);
    }

    setIsLogMeetingOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsLogMeetingOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon-box" style={{ width: '32px', height: '32px', background: 'var(--emerald-600)' }}>
              <UserCheck size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Log 1-on-1 Mentor Counseling Session
              </h3>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                Meeting with <b>{meetingStudentTarget.name}</b> ({meetingStudentTarget.rollNo})
              </p>
            </div>
          </div>
          <button onClick={() => setIsLogMeetingOpen(false)} style={{ color: 'var(--text-dim)', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* AI Pre-brief Alert */}
          <div style={{
            background: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem'
          }}>
            <Sparkles size={16} color="var(--primary-600)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-900)' }}>
              <b>AI Diagnostic Recommendation:</b> {meetingStudentTarget.aiDiagnosis?.primaryFactor || 'Diagnose core attendance drop'}
            </div>
          </div>

          {/* Root Cause Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Identified Primary Root Cause
            </label>
            <select
              value={rootCause}
              onChange={e => setRootCause(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            >
              <option value="Transport & Hostel Timings">Transport & Hostel Gate Logistics</option>
              <option value="Health & Medical Issues">Health / Medical Leave (Documented)</option>
              <option value="Academic Difficulty in Core Course">Academic Difficulty & Concept Gap</option>
              <option value="Extracurricular / Sports Duty">Varsity Sports / Cultural Duty Conflict</option>
              <option value="Financial / Fee Stress">Financial / Fee Stress Concern</option>
              <option value="Personal / Mental Wellbeing">Personal Wellbeing & Counseling Need</option>
            </select>
          </div>

          {/* Discussion Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Counseling Discussion Notes & Observations
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Student explained viral fever in week 5 caused Monday absences. Reviewed lab backlog and scheduled make-up slot..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Action Items List */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Agreed Student Recovery Action Items
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.5rem' }}>
              {actionItems.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.45rem 0.75rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem'
                  }}
                >
                  <span>✓ {item}</span>
                  <button type="button" onClick={() => handleRemoveAction(idx)} style={{ color: 'var(--rose-500)', fontSize: '0.75rem' }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Add action item input */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Add another action item (e.g. Attend peer tutoring)..."
                value={newAction}
                onChange={e => setNewAction(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--card-border)',
                  background: 'var(--card-bg)',
                  fontSize: '0.8rem'
                }}
              />
              <button 
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleAddAction}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Resolution checkbox */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.75rem',
            background: 'var(--emerald-50)',
            border: '1px solid var(--emerald-200)',
            borderRadius: 'var(--radius-md)',
            marginTop: '0.25rem'
          }}>
            <input
              type="checkbox"
              id="resolveCheck"
              checked={markResolved}
              onChange={e => setMarkResolved(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--emerald-600)', cursor: 'pointer' }}
            />
            <label htmlFor="resolveCheck" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--emerald-800)', cursor: 'pointer' }}>
              Mark this risk intervention as <b>Successfully Resolved</b> & stop the 72h escalation watchdog timer.
            </label>
          </div>

          {/* Footer buttons */}
          <div className="modal-footer" style={{ padding: '0.75rem 0 0', background: 'transparent' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsLogMeetingOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>Save & Log Session</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogMeetingModal;
