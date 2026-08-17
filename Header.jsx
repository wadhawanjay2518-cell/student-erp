import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Search, 
  UserCheck, 
  GraduationCap, 
  ShieldCheck, 
  PlayCircle,
  Activity,
  Layers,
  Sliders,
  BarChart3,
  Bell
} from 'lucide-react';

const Header = () => {
  const { 
    theme, 
    toggleTheme, 
    persona, 
    setPersona, 
    activeTab, 
    setActiveTab, 
    setIsSimulatorOpen, 
    setIsSearchOpen,
    students 
  } = useApp();

  // Count active critical risks
  const criticalCount = students.filter(s => s.riskTier === 'CRITICAL').length;

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Left: Brand Logo & Autonomous status */}
        <div className="brand-section">
          <div className="brand-logo">
            <div className="logo-icon-box">
              <Sparkles size={20} />
              <div className="ai-pulse-dot" />
            </div>
            <div>
              <span>EduFlow</span>
            </div>
          </div>
          <span className="brand-badge">
            Autonomous ERP v2.4
          </span>
        </div>

        {/* Center: Persona Switcher */}
        <div className="persona-switcher">
          <button
            className={`persona-tab-btn ${persona === 'mentor' ? 'active' : ''}`}
            onClick={() => setPersona('mentor')}
            title="Faculty & Academic Mentor Workspace"
          >
            <UserCheck size={16} />
            <span>Faculty / Mentor</span>
            {criticalCount > 0 && (
              <span style={{
                background: 'var(--rose-500)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '0.1rem 0.4rem',
                borderRadius: '10px'
              }}>
                {criticalCount}
              </span>
            )}
          </button>

          <button
            className={`persona-tab-btn ${persona === 'student' ? 'active' : ''}`}
            onClick={() => setPersona('student')}
            title="Student Growth & Explainability Hub"
          >
            <GraduationCap size={16} />
            <span>Student Portal</span>
          </button>

          <button
            className={`persona-tab-btn ${persona === 'dean' ? 'active' : ''}`}
            onClick={() => setPersona('dean')}
            title="Dean & Executive Strategic Overview"
          >
            <ShieldCheck size={16} />
            <span>Dean / Executive</span>
          </button>
        </div>

        {/* Right: Actions & Tools */}
        <div className="header-actions">
          {/* Spotlight Search (Ctrl+K) */}
          <button 
            className="search-trigger-btn"
            onClick={() => setIsSearchOpen(true)}
            title="Global Spotlight Search (Ctrl + K)"
          >
            <Search size={15} />
            <span style={{ display: 'inline-block', minWidth: '100px', textAlign: 'left' }}>
              Search students...
            </span>
            <span className="kbd-shortcut">⌘K</span>
          </button>

          {/* Hero Autonomous Simulator Launch Button */}
          <button
            className="btn btn-simulator-glow"
            onClick={() => setIsSimulatorOpen(true)}
            title="Launch Interactive Workflow Simulator"
          >
            <PlayCircle size={17} />
            <span>Workflow Simulator</span>
          </button>

          {/* Theme Toggle */}
          <button 
            className="header-action-btn btn-icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
