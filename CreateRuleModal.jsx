import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, Plus, Trash2, CheckCircle2, X, Sparkles, MessageSquare, Calendar, Clock, ArrowRight } from 'lucide-react';

const CreateRuleModal = () => {
  const { isCreateRuleOpen, setIsCreateRuleOpen, addRule } = useApp();

  const [ruleName, setRuleName] = useState('');
  const [category, setCategory] = useState('Attendance & Compliance');
  const [metric, setMetric] = useState('Attendance Rate');
  const [operator, setOperator] = useState('<');
  const [threshold, setThreshold] = useState('70%');
  const [duration, setDuration] = useState('2 Consecutive Weeks');
  const [actions, setActions] = useState([
    'Send Empathetic WhatsApp to Student & Parent',
    'Auto-Schedule 1-on-1 Mentor Counseling Session',
    'Start 72-Hour Escalation Watchdog Timer'
  ]);

  if (!isCreateRuleOpen) return null;

  const handleToggleAction = (actionText) => {
    if (actions.includes(actionText)) {
      setActions(actions.filter(a => a !== actionText));
    } else {
      setActions([...actions, actionText]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRule = {
      id: `RULE-${Date.now()}`,
      code: `POL_${Math.floor(100 + Math.random() * 900)}`,
      name: ruleName || `${metric} ${operator} ${threshold} Policy`,
      description: `Autonomous trigger activated when ${metric} ${operator} ${threshold} over ${duration}.`,
      category: category,
      status: 'ACTIVE',
      triggerCount: 0,
      successRate: 100,
      conditions: [
        { field: metric, operator: operator, value: threshold },
        { field: 'Duration Window', operator: '>=', value: duration }
      ],
      actionChain: actions.map((act, idx) => ({
        step: idx + 1,
        action: act,
        delay: `+${idx * 300}ms`
      }))
    };

    addRule(newRule);
    setIsCreateRuleOpen(false);
  };

  const availableActions = [
    { title: 'Send Empathetic WhatsApp to Student & Parent', desc: 'Dispatches non-punitive alert with dynamic recovery roadmap link', icon: <MessageSquare size={16} /> },
    { title: 'Auto-Schedule 1-on-1 Mentor Counseling Session', desc: 'Reserves 20-min slot in Faculty Mentor Google Calendar', icon: <Calendar size={16} /> },
    { title: 'Start 72-Hour Escalation Watchdog Timer', desc: 'Triggers automated HOD escalation if mentor does not log session', icon: <Clock size={16} /> },
    { title: 'Auto-Match with Peer Tutor Leader', desc: 'Assigns top student tutor for weekend booster sessions', icon: <Sparkles size={16} /> },
    { title: 'Emergency Financial Aid Officer Alert', desc: 'Transfers case to student welfare fund coordinator', icon: <Sliders size={16} /> },
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsCreateRuleOpen(false)}>
      <div className="modal-content modal-content-lg" onClick={e => e.stopPropagation()} style={{ padding: 0 }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-icon-box" style={{ width: '32px', height: '32px' }}>
              <Sliders size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Configure New Autonomous Intervention Policy
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Visual "If-This-Then-Act" Workflow Builder
              </p>
            </div>
          </div>
          <button onClick={() => setIsCreateRuleOpen(false)} style={{ color: 'var(--text-dim)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Policy Title & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Policy Name
              </label>
              <input
                type="text"
                placeholder="e.g. 2-Week Lab Absence Debarment Safeguard"
                value={ruleName}
                onChange={e => setRuleName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--card-border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--card-border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="Attendance & Compliance">Attendance & Compliance</option>
                <option value="Academic Performance">Academic Performance</option>
                <option value="Financial & Equity">Financial & Equity</option>
                <option value="Lab & Practicals">Lab & Practicals</option>
              </select>
            </div>
          </div>

          {/* IF Conditions Block */}
          <div style={{
            background: 'var(--card-bg-subtle)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.15rem'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="risk-pill risk-pill-ai" style={{ fontSize: '0.7rem' }}>IF CONDITION</span>
              <span>Trigger Criteria</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Metric</label>
                <select
                  value={metric}
                  onChange={e => setMetric(e.target.value)}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
                >
                  <option value="Attendance Rate">Attendance Rate</option>
                  <option value="Midterm Mark">Midterm Mark</option>
                  <option value="Lab Sessions Missed">Lab Sessions Missed</option>
                  <option value="CGPA Margin">CGPA Margin to Cutoff</option>
                  <option value="Assignment Defaults">Assignment Defaults</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Operator</label>
                <select
                  value={operator}
                  onChange={e => setOperator(e.target.value)}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
                >
                  <option value="<">Less than (&lt;)</option>
                  <option value="<=">Less than or equal (&lt;=)</option>
                  <option value=">">Greater than (&gt;)</option>
                  <option value="==">Equals (==)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Threshold</label>
                <input
                  type="text"
                  value={threshold}
                  onChange={e => setThreshold(e.target.value)}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Duration Window</label>
                <select
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}
                >
                  <option value="Instant">Instant (Single Event)</option>
                  <option value="2 Consecutive Weeks">2 Consecutive Weeks</option>
                  <option value="3 Consecutive Classes">3 Consecutive Classes</option>
                  <option value="Semester to Date">Semester to Date</option>
                </select>
              </div>
            </div>
          </div>

          {/* THEN Actions Block */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="risk-pill risk-pill-normal" style={{ fontSize: '0.7rem' }}>THEN ACTIONS</span>
              <span>Select Autonomous Action Chain</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {availableActions.map((act, idx) => {
                const isSelected = actions.includes(act.title);
                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleAction(act.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${isSelected ? 'var(--primary-400)' : 'var(--card-border)'}`,
                      background: isSelected ? 'var(--primary-50)' : 'var(--card-bg)',
                      cursor: 'pointer',
                      transition: 'all 150ms'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--primary-600)' }}
                    />
                    <div style={{ color: isSelected ? 'var(--primary-600)' : 'var(--text-muted)' }}>
                      {act.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.825rem', fontWeight: 700, color: isSelected ? 'var(--primary-900)' : 'var(--text-primary)' }}>
                        {act.title}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                        {act.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer" style={{ padding: '0.75rem 0 0', background: 'transparent' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreateRuleOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>Publish & Activate Policy</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRuleModal;
