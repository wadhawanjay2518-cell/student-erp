import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search, 
  Filter, 
  ArrowUpRight, 
  UserCheck, 
  MessageSquare, 
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Download,
  Send
} from 'lucide-react';

const MentorView = () => {
  const { students, setSelectedStudent, setIsLogMeetingOpen, setMeetingStudentTarget, setIsExplainRiskOpen, setExplainStudentTarget, resolveIntervention, addToast } = useApp();
  
  const [filterTier, setFilterTier] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'MODERATE' | 'ON_TRACK'
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);

  // Filtered students
  const filteredStudents = students.filter(student => {
    const matchesTier = filterTier === 'ALL' || student.riskTier === filterTier;
    const matchesDept = deptFilter === 'ALL' || student.department === deptFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.flagReason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesDept && matchesSearch;
  });

  // Priority Queue: Students needing immediate 1-on-1 check-in (Critical & Moderate)
  const priorityQueue = students.filter(s => s.riskTier === 'CRITICAL' || s.riskTier === 'MODERATE');

  const handleToggleSelectAll = () => {
    if (selectedBatchIds.length === filteredStudents.length) {
      setSelectedBatchIds([]);
    } else {
      setSelectedBatchIds(filteredStudents.map(s => s.id));
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedBatchIds.includes(id)) {
      setSelectedBatchIds(selectedBatchIds.filter(i => i !== id));
    } else {
      setSelectedBatchIds([...selectedBatchIds, id]);
    }
  };

  const handleBatchNudge = () => {
    if (selectedBatchIds.length === 0) return;
    addToast({
      type: 'success',
      title: 'Batch WhatsApp Nudge Dispatched',
      message: `Automated recovery notices sent to ${selectedBatchIds.length} selected students & guardians.`
    });
    setSelectedBatchIds([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Metrics KPI Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-label">Assigned Mentee Cohort</div>
            <div className="stat-value">{students.length}</div>
            <div className="stat-change" style={{ color: 'var(--emerald-600)' }}>
              <TrendingUp size={14} />
              <span>100% Biometrics Synced</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--primary-50)', color: 'var(--primary-600)' }}>
            <Users size={22} />
          </div>
        </div>

        <div className="stat-card" style={{ borderColor: 'var(--rose-200)' }}>
          <div>
            <div className="stat-label">Critical Interventions Pending</div>
            <div className="stat-value" style={{ color: 'var(--rose-600)' }}>
              {students.filter(s => s.riskTier === 'CRITICAL').length}
            </div>
            <div className="stat-change" style={{ color: 'var(--rose-600)' }}>
              <AlertCircle size={14} />
              <span>72h Escalation Watchdogs Active</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--rose-50)', color: 'var(--rose-600)' }}>
            <AlertCircle size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Active Automated Follow-ups</div>
            <div className="stat-value">7</div>
            <div className="stat-change" style={{ color: 'var(--primary-600)' }}>
              <Clock size={14} />
              <span>Peer Tutors & Labs Scheduled</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--violet-50)', color: 'var(--violet-600)' }}>
            <Sparkles size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">14-Day Resolution Rate</div>
            <div className="stat-value" style={{ color: 'var(--emerald-600)' }}>94.2%</div>
            <div className="stat-change" style={{ color: 'var(--emerald-600)' }}>
              <CheckCircle2 size={14} />
              <span>+6.4% vs Previous Term</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-600)' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* SMART INTERVENTION QUEUE (Top Priority Action Center) */}
      <div className="glass-card" style={{ borderColor: 'var(--primary-300)' }}>
        <div className="card-header" style={{ background: 'var(--card-bg-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="live-indicator" />
            <div>
              <div className="card-title" style={{ fontSize: '0.95rem' }}>
                Smart Intervention Queue
                <span className="risk-pill risk-pill-ai" style={{ fontSize: '0.7rem' }}>
                  Auto-Prioritized by AI Velocity
                </span>
              </div>
              <div className="card-subtitle">
                High-priority students requiring immediate 1-on-1 counseling or action plan resolution
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <b>{priorityQueue.length}</b> Action Items Pending
          </div>
        </div>

        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {priorityQueue.map((student) => (
            <div
              key={student.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.15rem',
                background: student.riskTier === 'CRITICAL' ? 'var(--rose-50)' : 'var(--card-bg)',
                border: `1px solid ${student.riskTier === 'CRITICAL' ? 'var(--rose-200)' : 'var(--card-border)'}`,
                borderRadius: 'var(--radius-lg)',
                gap: '1rem',
                flexWrap: 'wrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {/* Student info */}
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', minWidth: '240px' }}
                onClick={() => setSelectedStudent(student)}
              >
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                      {student.name}
                    </span>
                    <span className={`risk-pill risk-pill-${student.riskTier === 'CRITICAL' ? 'critical' : 'moderate'}`} style={{ fontSize: '0.65rem' }}>
                      {student.riskTier}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {student.rollNo} • {student.department} • Att: <b style={{ color: student.attendance.current < 75 ? 'var(--rose-600)' : 'var(--text-primary)' }}>{student.attendance.current}%</b>
                  </div>
                </div>
              </div>

              {/* Diagnosis snippet */}
              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {student.flagReason}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--primary-600)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={12} />
                  <span>{student.aiDiagnosis?.recommendedPlan?.[0] || 'Schedule diagnostic session'}</span>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setExplainStudentTarget(student);
                    setIsExplainRiskOpen(true);
                  }}
                  title="View AI explainability breakdown"
                >
                  <Sparkles size={14} color="var(--primary-600)" />
                  <span>Explain Risk</span>
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setMeetingStudentTarget(student);
                    setIsLogMeetingOpen(true);
                  }}
                  title="Log 1-on-1 counseling session"
                >
                  <UserCheck size={14} />
                  <span>Log Meeting</span>
                </button>

                <button
                  className="btn btn-success btn-sm"
                  onClick={() => resolveIntervention(student.id, 'Quick resolution logged by Dr. Sarah Chen')}
                  title="Mark intervention as resolved"
                >
                  <CheckCircle2 size={14} />
                  <span>Resolve</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COHORT RISK MATRIX & DATA GRID */}
      <div className="glass-card">
        {/* Controls & Filter Header */}
        <div className="card-header" style={{ flexWrap: 'wrap' }}>
          <div>
            <div className="card-title">
              Cohort Risk Matrix & Performance Ledger
            </div>
            <div className="card-subtitle">
              Live filterable biometric & academic indicators across assigned department batches
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {/* Search input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--bg-secondary)',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--card-border)'
            }}>
              <Search size={14} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Filter table..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '0.8rem', width: '120px' }}
              />
            </div>

            {/* Department Filter */}
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                fontSize: '0.8rem',
                color: 'var(--text-primary)'
              }}
            >
              <option value="ALL">All Departments</option>
              <option value="CSE">CSE Dept</option>
              <option value="AI_DS">AI&DS Dept</option>
              <option value="ECE">ECE Dept</option>
              <option value="MECH">MECH Dept</option>
            </select>

            {/* Tier Filter Pills */}
            <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.2rem', borderRadius: 'var(--radius-md)', gap: '0.2rem' }}>
              {['ALL', 'CRITICAL', 'MODERATE', 'ON_TRACK'].map(tier => (
                <button
                  key={tier}
                  onClick={() => setFilterTier(tier)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    color: filterTier === tier ? 'var(--text-primary)' : 'var(--text-muted)',
                    background: filterTier === tier ? 'var(--card-bg)' : 'transparent',
                    boxShadow: filterTier === tier ? 'var(--shadow-xs)' : 'none'
                  }}
                >
                  {tier === 'ALL' ? 'All' : tier === 'CRITICAL' ? '🔴 Critical' : tier === 'MODERATE' ? '🟡 Moderate' : '🟢 Normal'}
                </button>
              ))}
            </div>

            {/* Batch Action */}
            {selectedBatchIds.length > 0 && (
              <button className="btn btn-primary btn-sm" onClick={handleBatchNudge}>
                <Send size={14} />
                <span>Nudge ({selectedBatchIds.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ background: 'var(--card-bg-subtle)', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem 1rem', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectedBatchIds.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleToggleSelectAll}
                    style={{ cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '0.75rem 1rem' }}>STUDENT</th>
                <th style={{ padding: '0.75rem 1rem' }}>ATTENDANCE</th>
                <th style={{ padding: '0.75rem 1rem' }}>CGPA</th>
                <th style={{ padding: '0.75rem 1rem' }}>RISK STATUS & AI DIAGNOSIS</th>
                <th style={{ padding: '0.75rem 1rem' }}>HALL TICKET</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const isSelected = selectedBatchIds.includes(student.id);
                return (
                  <tr
                    key={student.id}
                    style={{
                      borderBottom: '1px solid var(--card-border)',
                      background: isSelected ? 'var(--primary-50)' : 'transparent',
                      transition: 'background 100ms'
                    }}
                    onMouseEnter={e => !isSelected && (e.currentTarget.style.background = 'var(--bg-secondary)')}
                    onMouseLeave={e => !isSelected && (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(student.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>

                    {/* Student Name & Avatar */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                        onClick={() => setSelectedStudent(student)}
                      >
                        <img 
                          src={student.avatar} 
                          alt={student.name} 
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                            {student.name}
                          </div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                            {student.rollNo} • {student.department}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Attendance Gauge */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ width: '70px', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              width: `${Math.min(100, student.attendance.current)}%`, 
                              height: '100%', 
                              background: student.attendance.current < 75 ? 'var(--rose-500)' : 'var(--emerald-500)',
                              borderRadius: '10px' 
                            }} 
                          />
                        </div>
                        <span style={{ fontWeight: 700, color: student.attendance.current < 75 ? 'var(--rose-600)' : 'var(--emerald-600)' }}>
                          {student.attendance.current}%
                        </span>
                      </div>
                    </td>

                    {/* CGPA */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {student.academic.cgpa}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        Backlogs: {student.academic.backlogs}
                      </div>
                    </td>

                    {/* Risk & Diagnosis */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                        <span className={`risk-pill risk-pill-${student.riskTier === 'CRITICAL' ? 'critical' : student.riskTier === 'MODERATE' ? 'moderate' : 'normal'}`}>
                          {student.riskTier}
                        </span>
                        {student.academic.scholarshipAtRisk && (
                          <span className="risk-pill risk-pill-violet" style={{ fontSize: '0.65rem' }}>
                            Scholarship Risk
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {student.flagReason}
                      </div>
                    </td>

                    {/* Hall Ticket */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className={`risk-pill ${student.hallTicketStatus === 'ELIGIBLE' ? 'risk-pill-normal' : 'risk-pill-moderate'}`} style={{ fontSize: '0.7rem' }}>
                        {student.hallTicketStatus}
                      </span>
                    </td>

                    {/* Quick Action Buttons */}
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => setSelectedStudent(student)}
                          title="Open 360° Profile Drawer"
                        >
                          View 360°
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setMeetingStudentTarget(student);
                            setIsLogMeetingOpen(true);
                          }}
                          title="Log 1-on-1 Session"
                        >
                          <UserCheck size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MentorView;
