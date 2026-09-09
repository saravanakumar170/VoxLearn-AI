import React from 'react';
import { 
  Bot, AlertTriangle, ArrowRight, Zap, Target, 
  Sparkles, CheckCircle2, TrendingUp, Mic, PlayCircle, ShieldAlert, Award,
  BrainCircuit, GraduationCap, Compass, BookOpen, Layers, Users, Star, MessageSquare
} from 'lucide-react';

export default function MentorBriefing({ 
  studentStats, 
  riskAnalysis, 
  onStartRemedial, 
  onNavigateTab, 
  onOpenVoice 
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* ------------------------------------------------------------- */}
      {/* EXACT FIGMA HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section style={{
        textAlign: 'center',
        padding: '3rem 1rem 1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Glow ambient background effect */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '480px',
          height: '240px',
          background: 'radial-gradient(ellipse at center, rgba(99, 91, 255, 0.15), transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        {/* Figma Pill Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1.1rem',
          borderRadius: '999px',
          background: 'var(--bg-pill)',
          border: '1px solid rgba(99, 91, 255, 0.3)',
          color: 'var(--accent-primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.75rem',
          boxShadow: '0 2px 10px rgba(99, 91, 255, 0.08)',
          zIndex: 1
        }}>
          <Star size={14} fill="currentColor" />
          <span>Now with Multi-Agent AI — every learner gets a unique path</span>
        </div>

        {/* Figma Main Hero Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          color: 'var(--text-primary)',
          maxWidth: '920px',
          marginBottom: '1.25rem',
          zIndex: 1
        }}>
          A unique learning experience <br />
          <span style={{
            background: 'var(--gradient-text)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            for every student.
          </span>
        </h1>

        {/* Figma Hero Subtitle */}
        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          lineHeight: 1.6,
          marginBottom: '2.25rem',
          zIndex: 1
        }}>
          VoxLearn AI combines your lecture notes, textbooks, and goals into a fully adaptive learning ecosystem — with an AI tutor that knows your curriculum inside out.
        </p>

        {/* Figma Hero CTA Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          zIndex: 1
        }}>
          <button
            onClick={() => onNavigateTab('generator')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 2rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              background: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(99, 91, 255, 0.4)',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>Start Learning Free</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onOpenVoice}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 1.75rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.15s'
            }}
          >
            <Mic size={17} color="var(--accent-primary)" />
            <span>Launch Voice Tutor</span>
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FIGMA PROOF METRICS BAR */}
      {/* ------------------------------------------------------------- */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        padding: '2rem 1.5rem',
        background: 'var(--bg-card)',
        borderRadius: '20px',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        textAlign: 'center'
      }}>
        <div style={{ padding: '0.5rem' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', letterSpacing: '-0.03em' }}>
            50,000+
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.2rem' }}>
            Active Learners
          </div>
        </div>

        <div style={{ padding: '0.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', letterSpacing: '-0.03em' }}>
            94%
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.2rem' }}>
            Goal Completion Rate
          </div>
        </div>

        <div style={{ padding: '0.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', letterSpacing: '-0.03em' }}>
            3.2×
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.2rem' }}>
            Faster Mastery
          </div>
        </div>

        <div style={{ padding: '0.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', letterSpacing: '-0.03em' }}>
            120+
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.2rem' }}>
            Institutions
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FIGMA FEATURE SECTION: "WHY VOXLEARN AI" */}
      {/* ------------------------------------------------------------- */}
      <section style={{ textAlign: 'center' }}>
        <span style={{
          fontSize: '0.78rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--accent-primary)',
          display: 'block',
          marginBottom: '0.5rem'
        }}>
          WHY VOXLEARN AI
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '2rem'
        }}>
          Everything you need to master any subject
        </h2>

        {/* 3 Figma Main Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          textAlign: 'left'
        }}>
          {/* Card 1: AI-Personalised Learning */}
          <div 
            onClick={() => onNavigateTab('generator')}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '2rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(99, 91, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)'
            }}>
              <Star size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              AI-Personalised Learning
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Adaptive content that adjusts to your pace, learning style, and specific knowledge gaps in real-time.
            </p>
          </div>

          {/* Card 2: Knowledge Graph */}
          <div 
            onClick={() => onNavigateTab('knowledge')}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '2rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(99, 91, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)'
            }}>
              <BrainCircuit size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Knowledge Graph
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Visual map of what you know, what's missing, and what to study next with live prerequisite tracking.
            </p>
          </div>

          {/* Card 3: College AI Tutor */}
          <div 
            onClick={() => onNavigateTab('rag')}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '2rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(99, 91, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)'
            }}>
              <MessageSquare size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              College AI Tutor
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Chat with AI trained on your own lecture slides, textbooks, and university syllabus with direct citations.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* STUDENT DASHBOARD & AI PROACTIVE MENTOR BRIEFING */}
      {/* ------------------------------------------------------------- */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Student Learning Control Center
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Session Active • Llama 3.3 70B & Sharyx Voice
          </span>
        </div>

        {/* AI Mentor Daily Proactive Briefing Banner */}
        <div className="glass-panel glass-panel-glow" style={{
          padding: '1.75rem',
          borderRadius: '24px',
          background: 'var(--bg-card)',
          border: '1px solid var(--accent-primary)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', maxWidth: '680px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(99, 91, 255, 0.35)'
            }}>
              <Bot size={28} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-brand">AI Mentor Morning Briefing</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated 5m ago</span>
              </div>
              <h2 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Good morning, {studentStats?.name || 'Alex'}! 🚀
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                "You completed 3 modules this week with an 18% improvement in SQL JOINs. Your target goal is 
                <strong style={{ color: 'var(--text-primary)' }}> {studentStats?.targetGoal || 'AI Systems Engineer'}</strong>. Today, let's address your identified weakness in 
                <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}> Window Functions</span> to unblock advanced database architecture."
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '220px' }}>
            <button 
              onClick={onOpenVoice}
              className="btn btn-voice"
              style={{ width: '100%', padding: '0.75rem 1rem' }}
            >
              <Mic size={16} />
              <span>Voice Tutor Briefing</span>
            </button>
            
            <button 
              onClick={() => onNavigateTab('generator')}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.82rem' }}
            >
              <span>Resume Course Studio</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Early Learning-Risk Detection Alert Banner */}
        {riskAnalysis?.hasCriticalRisk && (
          <div className="glass-panel" style={{
            padding: '1.25rem 1.5rem',
            borderRadius: '18px',
            background: 'var(--bg-card)',
            border: '1px solid var(--accent-rose)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '750px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'var(--gradient-weakness)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldAlert size={22} color="#fff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span className="badge badge-weak">🚨 Early Learning Risk Detected</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', fontWeight: 600 }}>High Priority Remediation</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  {riskAnalysis.criticalPrereqGaps[0]?.alertMessage || `Weakness detected in prerequisite concepts affecting upcoming assessments.`}
                </p>
              </div>
            </div>

            <button 
              onClick={() => onStartRemedial(riskAnalysis.criticalPrereqGaps[0]?.weakNode?.name || 'Window Functions (OVER, PARTITION)')}
              className="btn btn-danger"
              style={{ borderRadius: '10px', padding: '0.65rem 1.15rem' }}
            >
              <Zap size={16} />
              <span>Launch 5-Min Remedial Recovery</span>
            </button>
          </div>
        )}

        {/* Quick Metrics Grid */}
        <div className="grid-cols-auto">
          
          {/* Metric 1: Overall Mastery */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Knowledge Graph Mastery</span>
              <TrendingUp size={18} color="var(--accent-emerald)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{riskAnalysis?.overallMastery || 72}%</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>+8% this week</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--border-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: `${riskAnalysis?.overallMastery || 72}%`, height: '100%', background: 'var(--gradient-mastered)' }} />
            </div>
          </div>

          {/* Metric 2: XP Progression */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Level Progression</span>
              <Award size={18} color="var(--accent-primary)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Level {studentStats?.level || 4}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{studentStats?.xp || 1450} / {studentStats?.xpToNextLevel || 2000} XP</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--border-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ width: `${((studentStats?.xp || 1450) / (studentStats?.xpToNextLevel || 2000)) * 100}%`, height: '100%', background: 'var(--gradient-brand)' }} />
            </div>
          </div>

          {/* Metric 3: Weak Topics Status */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Weak Topics Status</span>
              <AlertTriangle size={18} color="var(--accent-rose)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-rose)' }}>{riskAnalysis?.weakCount || 3}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Critical gaps to resolve</span>
            </div>
            <button 
              onClick={() => onNavigateTab('knowledge')}
              style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
            >
              Inspect Knowledge Graph <ArrowRight size={12} />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
