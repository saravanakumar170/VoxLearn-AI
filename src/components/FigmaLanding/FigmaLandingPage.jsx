import React from 'react';
import { 
  Layers, Star, ArrowRight, BrainCircuit, MessageSquare, 
  Mic, Sparkles, CheckCircle2, Zap, Target, Award, Users,
  BookOpen, ChevronRight, PlayCircle
} from 'lucide-react';

export default function FigmaLandingPage({ 
  onEnterWorkspace, 
  onOpenVoice, 
  onOpenSettings,
  theme,
  onToggleTheme 
}) {
  const scrollToFeatures = () => {
    const el = document.getElementById('why-voxlearn-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      
      {/* ------------------------------------------------------------- */}
      {/* TOP FIGMA NAVIGATION HEADER */}
      {/* ------------------------------------------------------------- */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        padding: '1rem 0',
        backdropFilter: 'blur(12px)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          
          {/* Logo & Subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
              <span style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.28rem', 
                fontWeight: 800, 
                letterSpacing: '-0.03em', 
                color: 'var(--text-primary)' 
              }}>
                VoxLearn AI
              </span>
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

          {/* Figma Center Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hide-mobile">
            <button 
              onClick={scrollToFeatures} 
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 500, cursor: 'pointer' }}
            >
              Features
            </button>
            <button 
              onClick={() => onEnterWorkspace('rag')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 500, cursor: 'pointer' }}
            >
              For Students
            </button>
            <button 
              onClick={() => onEnterWorkspace('generator')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 500, cursor: 'pointer' }}
            >
              For Teachers
            </button>
          </nav>

          {/* Figma Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            
            {/* View Mode Toggle Indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-tertiary)',
              padding: '0.25rem',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              <span style={{
                padding: '0.25rem 0.6rem',
                borderRadius: '7px',
                background: 'var(--accent-primary)',
                color: '#fff'
              }}>
                Figma Prototype
              </span>
              <button
                onClick={() => onEnterWorkspace('dashboard')}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '7px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Live Workspace →
              </button>
            </div>

            {/* Log in Button */}
            <button
              onClick={() => onEnterWorkspace('dashboard')}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '10px',
                fontSize: '0.86rem',
                fontWeight: 600,
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              Log in
            </button>

            {/* Get Started Button */}
            <button
              onClick={() => onEnterWorkspace('generator')}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '10px',
                fontSize: '0.86rem',
                fontWeight: 700,
                background: 'var(--accent-primary)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(99, 91, 255, 0.35)',
                transition: 'all 0.15s'
              }}
            >
              Get Started
            </button>

          </div>

        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* FIGMA HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section style={{
        textAlign: 'center',
        padding: '5rem 1.5rem 3rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Glow ambient background effect */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '560px',
          height: '280px',
          background: 'radial-gradient(ellipse at center, rgba(99, 91, 255, 0.18), transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        {/* Figma Pill Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 1.25rem',
          borderRadius: '999px',
          background: 'var(--bg-pill)',
          border: '1px solid rgba(99, 91, 255, 0.3)',
          color: 'var(--accent-primary)',
          fontSize: '0.88rem',
          fontWeight: 600,
          marginBottom: '2rem',
          boxShadow: '0 2px 12px rgba(99, 91, 255, 0.1)',
          zIndex: 1
        }}>
          <Star size={14} fill="currentColor" />
          <span>Now with Multi-Agent AI — every learner gets a unique path</span>
        </div>

        {/* Figma Main Hero Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          color: 'var(--text-primary)',
          maxWidth: '960px',
          marginBottom: '1.5rem',
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
          fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
          color: 'var(--text-secondary)',
          maxWidth: '780px',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
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
          gap: '1.25rem',
          zIndex: 1
        }}>
          <button
            onClick={() => onEnterWorkspace('generator')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '1rem 2.25rem',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: 700,
              background: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 22px rgba(99, 91, 255, 0.45)',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>Start Learning Free</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => onEnterWorkspace('dashboard')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: 600,
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.15s'
            }}
          >
            <span>Log in to your account</span>
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FIGMA SOCIAL PROOF METRICS BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="container" style={{ margin: '1.5rem auto 4rem auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          padding: '2.5rem 2rem',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          textAlign: 'center'
        }}>
          <div style={{ padding: '0.5rem' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', letterSpacing: '-0.03em' }}>
              50,000+
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.3rem' }}>
              Active Learners
            </div>
          </div>

          <div style={{ padding: '0.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', letterSpacing: '-0.03em' }}>
              94%
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.3rem' }}>
              Goal Completion Rate
            </div>
          </div>

          <div style={{ padding: '0.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', letterSpacing: '-0.03em' }}>
              3.2×
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.3rem' }}>
              Faster Mastery
            </div>
          </div>

          <div style={{ padding: '0.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-primary)', letterSpacing: '-0.03em' }}>
              120+
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '0.3rem' }}>
              Institutions
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FIGMA FEATURE SECTION: "WHY VOXLEARN AI" */}
      {/* ------------------------------------------------------------- */}
      <section id="why-voxlearn-section" className="container" style={{ padding: '2rem 1rem 5rem 1rem', textAlign: 'center' }}>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent-primary)',
          display: 'block',
          marginBottom: '0.65rem'
        }}>
          WHY VOXLEARN AI
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '3rem'
        }}>
          Everything you need to master any subject
        </h2>

        {/* 3 Main Figma Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
          textAlign: 'left'
        }}>
          
          {/* Card 1: AI-Personalised Learning */}
          <div 
            onClick={() => onEnterWorkspace('generator')}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '24px',
              padding: '2.25rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'rgba(99, 91, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)'
            }}>
              <Star size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                AI-Personalised Learning
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Adaptive content that adjusts to your pace, learning style, and specific knowledge gaps in real-time.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-primary)', fontSize: '0.88rem', fontWeight: 600, marginTop: 'auto' }}>
              <span>Launch Course Studio</span>
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Card 2: Knowledge Graph */}
          <div 
            onClick={() => onEnterWorkspace('knowledge')}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '24px',
              padding: '2.25rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'rgba(99, 91, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)'
            }}>
              <BrainCircuit size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Knowledge Graph
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Visual map of what you know, what's missing, and what to study next with real-time prerequisite analysis.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-primary)', fontSize: '0.88rem', fontWeight: 600, marginTop: 'auto' }}>
              <span>Inspect Mastery Map</span>
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Card 3: College AI Tutor */}
          <div 
            onClick={() => onEnterWorkspace('rag')}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '24px',
              padding: '2.25rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'rgba(99, 91, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)'
            }}>
              <MessageSquare size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                College AI Tutor
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Chat with AI trained on your own lecture slides, textbooks, and university syllabus with direct citations.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-primary)', fontSize: '0.88rem', fontWeight: 600, marginTop: 'auto' }}>
              <span>Ask Syllabus Questions</span>
              <ChevronRight size={16} />
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE VOICE AI & MULTI-AGENT DEMO CALLOUT */}
      {/* ------------------------------------------------------------- */}
      <section className="container" style={{ padding: '0 1rem 5rem 1rem' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--accent-primary)',
          borderRadius: '28px',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '999px', background: 'rgba(99, 91, 255, 0.12)', color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem' }}>
              <Mic size={15} />
              <span>SHARYX VOICE AI ENGINE</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
              Experience Hands-Free Voice Learning
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Speak naturally with your AI mentor. Practice Socratic dialogues, generate dual-speaker podcasts, and receive instant spoken explanations for complex formulas.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                onClick={onOpenVoice}
                className="btn btn-voice"
                style={{ padding: '0.85rem 1.75rem', borderRadius: '12px', fontSize: '0.96rem', fontWeight: 700 }}
              >
                <Mic size={18} />
                <span>Talk with Voice Tutor</span>
              </button>
              <button
                onClick={() => onEnterWorkspace('dashboard')}
                className="btn btn-secondary"
                style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', fontSize: '0.96rem', fontWeight: 600 }}
              >
                <span>Enter Full Student Workspace</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            background: 'var(--bg-tertiary)',
            padding: '1.5rem',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)',
            minWidth: '280px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              <CheckCircle2 size={18} />
              <span>Real-time Speech Synthesis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              <CheckCircle2 size={18} />
              <span>Voice Activity Detection (STT)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              <CheckCircle2 size={18} />
              <span>Dual-Host AI Podcasts</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              <CheckCircle2 size={18} />
              <span>Socratic Question Prompts</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FIGMA FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '2.5rem 0',
        background: 'var(--bg-card)',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Layers size={18} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)' }}>
              VoxLearn AI
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <button onClick={() => onEnterWorkspace('dashboard')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Student Hub</button>
            <button onClick={() => onEnterWorkspace('rag')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>College RAG</button>
            <button onClick={() => onEnterWorkspace('generator')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Course Studio</button>
            <button onClick={() => onEnterWorkspace('knowledge')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Knowledge Graph</button>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2026 VoxLearn AI. Sharyx Voice AI & Groq Llama 3.3 Engine.
          </p>
        </div>
      </footer>

    </div>
  );
}
