import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Send, X, AlertCircle, CheckCircle2 } from 'lucide-react';

const DirectiveModal = () => {
  const { isDirectiveOpen, setIsDirectiveOpen, addToast } = useApp();
  const [targetDept, setTargetDept] = useState('CSE');
  const [directiveType, setDirectiveType] = useState('Remedial Practical Week');
  const [notes, setNotes] = useState('');

  if (!isDirectiveOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Executive Directive Dispatched',
      message: `Directive "${directiveType}" issued to Head of Department (${targetDept}).`
    });
    setIsDirectiveOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsDirectiveOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon-box" style={{ width: '32px', height: '32px', background: 'var(--violet-600)' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Issue Institutional Academic Directive
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Dean Office Proactive Intervention Directive
              </p>
            </div>
          </div>
          <button onClick={() => setIsDirectiveOpen(false)} style={{ color: 'var(--text-dim)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Target Academic Department
            </label>
            <select
              value={targetDept}
              onChange={e => setTargetDept(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="CSE">Department of Computer Science & Engineering (CSE)</option>
              <option value="ECE">Department of Electronics & Communication (ECE)</option>
              <option value="AI_DS">Department of AI & Data Science (AI&DS)</option>
              <option value="MECH">Department of Mechanical Engineering (MECH)</option>
              <option value="ALL">All University Engineering Departments</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Directive Action Protocol
            </label>
            <select
              value={directiveType}
              onChange={e => setDirectiveType(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="Remedial Practical Week">Mandate Department-Wide Make-Up Practical Slot</option>
              <option value="Faculty Mentor Check-in Audit">Execute 48h Mandatory Mentor Check-in Audit</option>
              <option value="Midterm Retest Waiver">Approve Remedial Continuous Assessment Retest</option>
              <option value="Peer Tutor Allocation Booster">Boost Peer Tutoring Credits Allocation</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Dean's Special Remarks / Guidelines
            </label>
            <textarea
              rows={3}
              placeholder="e.g. In response to the 18% failure risk spike in 3rd semester core courses, the department shall conduct 3 weekend revision laboratories..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div className="modal-footer" style={{ padding: '0.75rem 0 0', background: 'transparent' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsDirectiveOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ background: 'var(--violet-600)' }}>
              <Send size={16} />
              <span>Issue Directive</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DirectiveModal;
