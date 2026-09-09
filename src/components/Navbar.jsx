import React from 'react';
import { 
  Layers, Mic, Award, BookOpen, 
  BrainCircuit, Compass, Users, Settings, Activity, GraduationCap,
  Sun, Moon, ArrowRight, Flame
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenVoice, 
  onOpenSettings, 
  studentStats,
  theme,
  onToggleTheme 
}) {
  const primaryNavItems = [
    { id: 'dashboard', label: 'Mentor Hub', icon: <Activity size={15} /> },
    { id: 'rag', label: 'College RAG Tutor', icon: <GraduationCap size={15} /> },
    { id: 'generator', label: 'Course Studio', icon: <BookOpen size={15} /> },
    { id: 'assessment', label: 'Assess & Remediate', icon: <Layers size={15} /> },
    { id: 'roadmap', label: 'Career Roadmaps', icon: <Compass size={15} /> },
    { id: 'knowledge', label: 'Knowledge Graph', icon: <BrainCircuit size={15} /> },
    { id: 'gamification', label: 'Badges & Peers', icon: <Users size={15} /> },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
      padding: '0.85rem 0',
      backdropFilter: 'blur(12px)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        {/* Figma Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(99, 91, 255, 0.35)',
            color: '#fff'
          }}>
            <Layers size={22} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.28rem', 
                fontWeight: 800, 
                letterSpacing: '-0.03em', 
                color: 'var(--text-primary)' 
              }}>
                VoxLearn AI
              </span>
            </div>
            <p style={{ 
              fontSize: '0.62rem', 
              color: 'var(--text-muted)', 
              fontWeight: 700, 
              letterSpacing: '0.08em', 
              textTransform: 'uppercase', 
              marginTop: '-1px' 
            }}>
              Personalized Learning
            </p>
          </div>
        </div>

        {/* Figma Top Navigation Links / Module Tabs */}
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.25rem', 
          overflowX: 'auto', 
          padding: '0.2rem',
          scrollbarWidth: 'none'
        }}>
          {primaryNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.8rem',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: 'var(--font-display)',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(99, 91, 255, 0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 91, 255, 0.25)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action HUD */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
          
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {theme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#635bff" />}
          </button>

          {/* Quick Voice Tutor Launch Button */}
          <button
            onClick={onOpenVoice}
            className="btn btn-voice"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.45rem', 
              padding: '0.48rem 0.9rem', 
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
            title="Launch Spoken Voice AI Companion"
          >
            <Mic size={15} />
            <span>Voice Tutor</span>
          </button>

          {/* Streak Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: 'var(--bg-tertiary)',
            padding: '0.35rem 0.65rem',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            <Flame size={14} color="var(--accent-amber)" />
            <span>{studentStats?.streakDays || 14}d</span>
          </div>

          {/* XP & Level Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: 'var(--bg-tertiary)',
            padding: '0.35rem 0.65rem',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--accent-primary)'
          }}>
            <Award size={14} />
            <span>Lvl {studentStats?.level || 4}</span>
          </div>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Configure Groq / Sharyx API Keys"
          >
            <Settings size={16} />
          </button>

        </div>

      </div>
    </header>
  );
}
