import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sliders, 
  Plus, 
  Play, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  ArrowRight, 
  ShieldCheck,
  Cpu,
  Layers
} from 'lucide-react';
import { SIMULATION_SCENARIOS } from '../../data/mockData';

const RulesEngineView = () => {
  const { rules, toggleRule, setIsCreateRuleOpen, setIsSimulatorOpen, setActiveScenario, runScenario } = useApp();

  const handleTestRule = (ruleCode) => {
    let scenario = SIMULATION_SCENARIOS[0];
    if (ruleCode === 'ACAD_DIP_02') scenario = SIMULATION_SCENARIOS[1];
    else if (ruleCode === 'SCHOLAR_RISK_03') scenario = SIMULATION_SCENARIOS[2];
    
    setActiveScenario(scenario);
    setIsSimulatorOpen(true);
    runScenario(scenario);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Engine Overview Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.05))',
        border: '1px solid var(--primary-200)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="logo-icon-box" style={{ width: '48px', height: '48px' }}>
            <Cpu size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Proactive Automation Rules Engine
              </h2>
              <span className="risk-pill risk-pill-ai">
                {rules.filter(r => r.status === 'ACTIVE').length} Policies Active
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Self-executing academic safety nets: Ingests real-time biometric turnstile records, LMS grade gateway events, and fee statuses.
            </p>
          </div>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setIsCreateRuleOpen(true)}
        >
          <Plus size={16} />
          <span>Configure New Automation Rule</span>
        </button>
      </div>

      {/* Rules Catalog Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1.25rem' }}>
        {rules.map((rule) => {
          const isActive = rule.status === 'ACTIVE';

          return (
            <div 
              key={rule.id}
              className="glass-card"
              style={{
                border: `1px solid ${isActive ? 'var(--card-border)' : 'var(--card-border-hover)'}`,
                opacity: isActive ? 1 : 0.75,
                transition: 'all var(--transition-normal)'
              }}
            >
              {/* Card Header */}
              <div className="card-header" style={{ background: 'var(--card-bg-subtle)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="risk-pill risk-pill-ai" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                      {rule.code}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {rule.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {rule.name}
                  </div>
                </div>

                {/* Status Toggle Switch */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isActive ? 'var(--emerald-600)' : 'var(--text-muted)' }}>
                    {rule.status}
                  </span>
                  <div
                    onClick={() => toggleRule(rule.id)}
                    style={{
                      width: '42px',
                      height: '22px',
                      borderRadius: '12px',
                      background: isActive ? 'var(--emerald-500)' : 'var(--bg-tertiary)',
                      padding: '2px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'white',
                      transform: isActive ? 'translateX(20px)' : 'translateX(0)',
                      transition: 'transform 200ms ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                    }} />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {rule.description}
                </p>

                {/* IF Conditions */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.775rem'
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary-600)', marginBottom: '0.35rem' }}>
                    ⚡ IF CONDITIONS (TRIGGERS):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {rule.conditions?.map((cond, idx) => (
                      <span key={idx} style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}>
                        {cond.field} {cond.operator} <b>{cond.value}</b>
                      </span>
                    ))}
                  </div>
                </div>

                {/* THEN Actions Chain */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.775rem'
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--emerald-700)', marginBottom: '0.35rem' }}>
                    🚀 THEN ACTIONS (AUTONOMOUS EXECUTION CHAIN):
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {rule.actionChain?.map((act, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                        <span style={{ fontWeight: 700, color: 'var(--emerald-600)' }}>Step {act.step}:</span>
                        <span>{act.action}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>{act.delay}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trigger stats & Test Action */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid var(--card-border)'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Triggered <b>{rule.triggerCount} times</b> this term • <b>{rule.successRate}%</b> resolution
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleTestRule(rule.code)}
                  >
                    <Play size={12} />
                    <span>Test in Sandbox</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default RulesEngineView;
