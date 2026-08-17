import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Sparkles, 
  Send, 
  Download, 
  FileSpreadsheet,
  Award,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

const DeanView = () => {
  const { deanMetrics, setIsDirectiveOpen, addToast } = useApp();

  const handleExport = () => {
    addToast({
      type: 'success',
      title: 'Institutional Audit Report Generated',
      message: 'EduFlow_Dean_Executive_Summary_Fall2026.csv downloaded.'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Strategic Executive KPI Summary */}
      <div className="stats-grid">
        <div className="stat-card" style={{ borderColor: 'var(--violet-200)' }}>
          <div>
            <div className="stat-label">University Student Retention Rate</div>
            <div className="stat-value" style={{ color: 'var(--violet-600)' }}>
              {deanMetrics.overallRetentionRate}%
            </div>
            <div className="stat-change" style={{ color: 'var(--emerald-600)' }}>
              <TrendingUp size={14} />
              <span>{deanMetrics.retentionChangeYoY} YoY Post-Autonomous ERP</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--violet-50)', color: 'var(--violet-600)' }}>
            <ShieldCheck size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Average Resolution Velocity</div>
            <div className="stat-value">
              {deanMetrics.avgInterventionResolutionDays} Days
            </div>
            <div className="stat-change" style={{ color: 'var(--emerald-600)' }}>
              <TrendingDown size={14} />
              <span>Down from 18.2 days before AI workflows</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--primary-50)', color: 'var(--primary-600)' }}>
            <Clock size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Debarment Reduction Rate</div>
            <div className="stat-value" style={{ color: 'var(--emerald-600)' }}>
              {deanMetrics.debarmentReductionRate}
            </div>
            <div className="stat-change" style={{ color: 'var(--emerald-600)' }}>
              <CheckCircle2 size={14} />
              <span>125 cases recovered early this term</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-600)' }}>
            <Award size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-label">Total Interventions Dispatched</div>
            <div className="stat-value">
              {deanMetrics.totalInterventionsThisSemester}
            </div>
            <div className="stat-change" style={{ color: 'var(--primary-600)' }}>
              <Sparkles size={14} />
              <span>84.4% Auto-Resolved by Mentors</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
            <Layers size={24} />
          </div>
        </div>
      </div>

      {/* Proactive Directive Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.15rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.05))',
        border: '1px solid var(--violet-200)',
        borderRadius: 'var(--radius-lg)',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="live-indicator" style={{ background: 'var(--violet-600)', boxShadow: '0 0 10px var(--violet-600)' }} />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--violet-900)' }}>
              Executive Early Warning Alerts & Directive Console
            </div>
            <div style={{ fontSize: '0.775rem', color: 'var(--violet-700)' }}>
              Dept of ECE: 3rd Semester Signal Processing failure risk spike +18% detected following Midterm 1.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleExport}>
            <Download size={14} />
            <span>Export CSV Audit</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setIsDirectiveOpen(true)} style={{ background: 'var(--violet-600)' }}>
            <Send size={14} />
            <span>Issue Academic Directive</span>
          </button>
        </div>
      </div>

      {/* Charts Grid: Department Risk Distribution & Resolution Velocity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* Department Risk Stacked Breakdown */}
        <div className="glass-card">
          <div className="card-header">
            <div>
              <div className="card-title">Department Early Warning Risk Heatmap</div>
              <div className="card-subtitle">Active risk tiers across institutional faculties</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deanMetrics.departmentRiskBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                  <XAxis dataKey="department" stroke="var(--text-muted)" fontSize={11} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', borderRadius: '8px' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="highRisk" name="Critical Risk (Debarment)" fill="var(--rose-500)" stackId="a" />
                  <Bar dataKey="moderateRisk" name="Moderate Risk (Watchlist)" fill="var(--amber-500)" stackId="a" />
                  <Bar dataKey="onTrack" name="On-Track Cohort" fill="var(--emerald-500)" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Resolution Velocity Trends */}
        <div className="glass-card">
          <div className="card-header">
            <div>
              <div className="card-title">Intervention Velocity & Recovery Trajectory</div>
              <div className="card-subtitle">Weekly autonomous dispatches vs mentor-logged resolutions</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={deanMetrics.resolutionVelocityTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                  <XAxis dataKey="week" stroke="var(--text-muted)" fontSize={11} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', borderRadius: '8px' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Line type="monotone" dataKey="autoTriggered" name="Auto-Dispatched Risks" stroke="var(--rose-500)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="mentorResolved" name="Resolved Interventions" stroke="var(--emerald-600)" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* Faculty Mentor Workload & Compliance Leaderboard */}
      <div className="glass-card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <Users size={18} />
              <span>Faculty Mentor Workload & Response Compliance</span>
            </div>
            <div className="card-subtitle">
              Audit of 72h watchdog SLA compliance and counseling resolution throughput
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ background: 'var(--card-bg-subtle)', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem 1.25rem' }}>FACULTY MENTOR</th>
                <th style={{ padding: '0.75rem 1rem' }}>DEPARTMENT</th>
                <th style={{ padding: '0.75rem 1rem' }}>ACTIVE MENTEES</th>
                <th style={{ padding: '0.75rem 1rem' }}>RESOLUTIONS THIS TERM</th>
                <th style={{ padding: '0.75rem 1rem' }}>RESPONSE COMPLIANCE</th>
                <th style={{ padding: '0.75rem 1rem' }}>AVG RESPONSE TIME</th>
                <th style={{ padding: '0.75rem 1.25rem', textAlign: 'right' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {deanMetrics.mentorLeaderboard.map((mentor, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <td style={{ padding: '0.85rem 1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {mentor.name}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                    {mentor.dept}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                    {mentor.mentees}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--emerald-600)', fontWeight: 700 }}>
                    {mentor.resolved}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                    {mentor.responseRate}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                    {mentor.avgTime}
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>
                    <span className={`risk-pill ${mentor.status === 'Exemplary' ? 'risk-pill-normal' : mentor.status === 'Good' ? 'risk-pill-ai' : 'risk-pill-moderate'}`}>
                      {mentor.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DeanView;
