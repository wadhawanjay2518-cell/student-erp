import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  UserCheck, 
  FileText, 
  Upload, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck,
  Send,
  Award,
  ExternalLink
} from 'lucide-react';

const StudentView = () => {
  const { students, setSelectedStudent, setIsExplainRiskOpen, setExplainStudentTarget, addToast } = useApp();
  
  // Default active student persona: Rahul Sharma (STU-101)
  const student = students.find(s => s.id === 'STU-101') || students[0];

  const [appointmentReason, setAppointmentReason] = useState('Attendance Recovery & Make-up Labs');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleRequestMeeting = (e) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Mentor Request Dispatched',
      message: `Your check-in request was sent to Dr. Sarah Chen. Meeting link will appear in your Google Calendar.`
    });
    setAppointmentNotes('');
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
      addToast({
        type: 'info',
        title: 'Document Uploaded to Locker',
        message: `${e.target.files[0].name} submitted for Dean Academic verification.`
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Student Welcome & Academic Vitality Score Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.08))',
        border: '1px solid var(--primary-200)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img 
            src={student.avatar} 
            alt={student.name} 
            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-500)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Welcome back, {student.name}
              </h1>
              <span className="risk-pill risk-pill-ai">
                Semester 5 • CSE
              </span>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Roll Number: <b>{student.rollNo}</b> • Assigned Mentor: <b>{student.mentorName}</b>
            </p>
          </div>
        </div>

        {/* Vitality Score Dial */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'var(--card-bg)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'conic-gradient(var(--rose-500) 0% 62%, var(--bg-tertiary) 62% 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--card-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: 'var(--rose-600)'
            }}>
              {student.healthGrowthScore}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Academic Vitality Score
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--rose-600)' }}>
              ⚠️ Moderate Risk (Debarment Threat)
            </div>
          </div>
        </div>
      </div>

      {/* Transparent "Why is this flagged?" Explainability Hero Card */}
      <div className="glass-card" style={{ borderColor: 'var(--rose-300)', background: 'var(--rose-50)' }}>
        <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '280px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--rose-600)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--rose-800)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Why is my academic profile flagged?</span>
                <span className="risk-pill risk-pill-ai" style={{ fontSize: '0.65rem' }}>
                  AI Explainability
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--rose-700)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                Your aggregate attendance is <b>{student.attendance.current}%</b> (below the required 75%). 
                Our AI identified that missing 3 consecutive Monday morning DBMS laboratories is the primary factor. 
                You only need to attend <b>7 more continuous classes</b> to restore safe standing.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setExplainStudentTarget(student);
                setIsExplainRiskOpen(true);
              }}
              style={{ background: 'var(--rose-600)', borderColor: 'var(--rose-700)' }}
            >
              <Sparkles size={16} />
              <span>Launch Recovery Roadmap Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars Breakdown Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.15rem' }}>
        
        {/* Attendance Pillar */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>OVERALL ATTENDANCE</span>
            <span className="risk-pill risk-pill-critical" style={{ fontSize: '0.7rem' }}>Needs 7 Classes</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--rose-600)', marginBottom: '0.5rem' }}>
            {student.attendance.current}%
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.5rem' }}>
            <div style={{ width: `${student.attendance.current}%`, height: '100%', background: 'var(--rose-500)', borderRadius: '10px' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            91 attended of 144 classes held
          </div>
        </div>

        {/* CGPA Pillar */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>CUMULATIVE GPA</span>
            <span className="risk-pill risk-pill-normal" style={{ fontSize: '0.7rem' }}>Good Standing</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {student.academic.cgpa}
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.5rem' }}>
            <div style={{ width: `${(student.academic.cgpa / 10) * 100}%`, height: '100%', background: 'var(--primary-500)', borderRadius: '10px' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Cohort Average: 7.82 GPA
          </div>
        </div>

        {/* Hall Ticket Clearance */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>HALL TICKET STATUS</span>
            <span className="risk-pill risk-pill-moderate" style={{ fontSize: '0.7rem' }}>Conditional</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--amber-600)', marginBottom: '0.5rem' }}>
            Conditional
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Unlocks automatically once attendance reaches <b>75.0%</b> before Nov 15.
          </p>
        </div>

        {/* Assigned Mentor Quick Connect */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            FACULTY MENTOR
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {student.mentorName}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Cabin 304 • CSE Department
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--primary-600)', fontWeight: 600, marginTop: '0.35rem' }}>
            Next Available Slot: Tomorrow 3:00 PM
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Coursework Breakdown & Mentor Support Request Form */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.5rem' }}>
        
        {/* Left: Course-wise Status Table */}
        <div className="glass-card">
          <div className="card-header">
            <div className="card-title">
              <BookOpen size={18} />
              <span>Current Semester Coursework Status</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {student.academic.courses.map((c, i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--card-bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--card-border)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    [{c.code}] {c.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Internal Marks: <b>{c.internalMark} / {c.maxInternal}</b>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`risk-pill ${c.attendance < 75 ? 'risk-pill-critical' : 'risk-pill-normal'}`}>
                    {c.attendance}% Attendance
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Request Check-in & Upload Medical Proof */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Request 1-on-1 Meeting Form */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <UserCheck size={16} color="var(--primary-500)" />
              <span>Request Mentor Check-in Session</span>
            </div>

            <form onSubmit={handleRequestMeeting} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Purpose</label>
                <select
                  value={appointmentReason}
                  onChange={e => setAppointmentReason(e.target.value)}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', background: 'var(--card-bg)', fontSize: '0.8rem' }}
                >
                  <option value="Attendance Recovery & Make-up Labs">Attendance Recovery & Make-up Labs</option>
                  <option value="Concept Clarification in DBMS">Concept Clarification in DBMS</option>
                  <option value="Medical Leave Exemption Request">Medical Leave Exemption Request</option>
                  <option value="Personal Well-being & Guidance">Personal Well-being & Guidance</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Brief Note to Dr. Sarah Chen</label>
                <textarea
                  rows={2}
                  placeholder="e.g. I had viral fever in week 5 and have my medical slip ready..."
                  value={appointmentNotes}
                  onChange={e => setAppointmentNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', background: 'var(--card-bg)', fontSize: '0.8rem' }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '0.25rem' }}>
                <Send size={14} />
                <span>Submit Request to Mentor</span>
              </button>
            </form>
          </div>

          {/* Document Locker & Proof Upload */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={16} color="var(--emerald-600)" />
              <span>Digital Locker & Exemption Proof</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Upload hospital medical certificates or sports duty permits for Dean verification.
            </p>

            <label style={{
              border: '2px dashed var(--card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: 'var(--card-bg-subtle)'
            }}>
              <Upload size={20} color="var(--primary-500)" />
              <span style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--primary-600)', marginTop: '0.35rem' }}>
                {uploadedFile ? uploadedFile : 'Click to Upload PDF / Image'}
              </span>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-dim)' }}>
                Max 5MB (Medical Certificate / Sports Duty)
              </span>
              <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>

        </div>
      </div>

    </div>
  );
};

export default StudentView;
