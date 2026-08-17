import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, GraduationCap, Sparkles, BookOpen, AlertCircle, ArrowRight, X } from 'lucide-react';

const SpotlightSearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, students, setSelectedStudent, rules, setIsSimulatorOpen, setActiveScenario } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(query.toLowerCase()) ||
    s.department.toLowerCase().includes(query.toLowerCase()) ||
    s.flagReason.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRules = rules.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '620px', padding: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--card-border)'
        }}>
          <Search size={20} color="var(--primary-500)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search students, roll number, course, or autonomous rule..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--text-primary)'
            }}
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            style={{ color: 'var(--text-dim)', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '0.75rem' }}>
          {/* Quick Simulation Trigger shortcuts */}
          {!query && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0.5rem 0.5rem 0.25rem' }}>
                ⚡ Quick Actions
              </div>
              <div 
                onClick={() => {
                  setIsSearchOpen(false);
                  setIsSimulatorOpen(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  background: 'var(--primary-50)',
                  color: 'var(--primary-700)',
                  marginBottom: '0.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                  <Sparkles size={16} />
                  <span>Launch Autonomous Workflow Simulator</span>
                </div>
                <ArrowRight size={16} />
              </div>
            </div>
          )}

          {/* Students Section */}
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0.5rem 0.5rem 0.25rem' }}>
              🎓 Students ({filteredStudents.length})
            </div>
            {filteredStudents.length === 0 ? (
              <div style={{ padding: '0.75rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                No students matching "{query}"
              </div>
            ) : (
              filteredStudents.map(student => (
                <div
                  key={student.id}
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsSearchOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background 150ms'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {student.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {student.rollNo} • {student.department} • {student.semester}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={`risk-pill risk-pill-${student.riskTier === 'CRITICAL' ? 'critical' : student.riskTier === 'MODERATE' ? 'moderate' : 'normal'}`}>
                      {student.attendance.current}% Att.
                    </span>
                    <ArrowRight size={14} color="var(--text-dim)" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rules Section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0.5rem 0.5rem 0.25rem' }}>
              ⚙️ Automation Policies ({filteredRules.length})
            </div>
            {filteredRules.map(rule => (
              <div
                key={rule.id}
                onClick={() => {
                  setIsSearchOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    [{rule.code}] {rule.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {rule.category} • {rule.triggerCount} triggers this term
                  </div>
                </div>
                <span className="risk-pill risk-pill-ai">
                  {rule.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div style={{
          padding: '0.65rem 1.25rem',
          borderTop: '1px solid var(--card-border)',
          background: 'var(--card-bg-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span>Navigate with <b>↑</b> <b>↓</b></span>
          <span>Press <b>ESC</b> to close</span>
        </div>
      </div>
    </div>
  );
};

export default SpotlightSearchModal;
