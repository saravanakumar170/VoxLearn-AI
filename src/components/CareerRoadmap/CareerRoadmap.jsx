import React, { useState } from 'react';
import { Compass, Target, Code, CheckCircle, ArrowRight, Sparkles, Layers, Cpu, Database, Terminal } from 'lucide-react';

const PRELOADED_ROADMAPS = {
  'AI Engineer': {
    title: 'Autonomous AI Engineer Career Roadmap',
    role: 'AI Engineer',
    timeframe: '6 Months (Fast-Track)',
    milestones: [
      { step: 1, title: 'Python & Vector Mathematics', skills: ['NumPy', 'Linear Algebra', 'Calculus', 'Memory Optimization'], status: 'Completed' },
      { step: 2, title: 'Classical ML & Optimization', skills: ['Scikit-Learn', 'Gradient Descent', 'Bias-Variance', 'Feature Stores'], status: 'Completed' },
      { step: 3, title: 'Deep Learning & Transformer Foundations', skills: ['PyTorch', 'Self-Attention', 'Positional Encodings', 'CUDA Basics'], status: 'In Progress' },
      { step: 4, title: 'LLM Systems & Retrieval-Augmented Generation (RAG)', skills: ['Vector DBs (Pinecone, Chroma)', 'Hybrid Search', 'Reranking', 'Semantic Caching'], status: 'Upcoming' },
      { step: 5, title: 'Multi-Agent Autonomous Orchestration', skills: ['Tool Calling', 'Planning Loops', 'LangGraph / AutoGen', 'Evals & Guardrails'], status: 'Upcoming' },
      { step: 6, title: 'Production Deployment & Fast Inference', skills: ['vLLM', 'Groq LPU Acceleration', 'Quantization (AWQ/GGUF)', 'Triton Server'], status: 'Upcoming' },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'High-Throughput Hybrid RAG Engine with Groq Acceleration',
        level: 'Intermediate',
        skills: ['RAG', 'Vector Embeddings', 'Groq API', 'Python'],
        description: 'Design and benchmark a sub-100ms multi-document question-answering service with BM25 + Dense Vector hybrid reranking.',
        rubric: ['Vector search recall > 92%', 'P99 Latency < 250ms', 'Accurate source citation mapping']
      },
      {
        id: 'proj-2',
        title: 'Autonomous Multi-Agent Code Review & Debugging Pipeline',
        level: 'Advanced',
        skills: ['Multi-Agent Architecture', 'Tool Calling', 'Llama 3.3', 'Static Analysis'],
        description: 'Build a coordinated multi-agent team where a Planner agent creates test cases, a Debugger agent refactors AST nodes, and a Critic agent verifies invariance.',
        rubric: ['Zero hallucination in diff generation', 'Deterministic test execution sandbox', 'Structured JSON output']
      }
    ]
  }
};

export default function CareerRoadmap({ onSelectTopic }) {
  const [selectedRole, setSelectedRole] = useState('AI Engineer');
  const [customGoal, setCustomGoal] = useState('');
  const roadmap = PRELOADED_ROADMAPS[selectedRole] || PRELOADED_ROADMAPS['AI Engineer'];

  const handleGenerateRoadmap = (e) => {
    e.preventDefault();
    if (!customGoal.trim()) return;
    // Adapt current roadmap title
    roadmap.title = `${customGoal} Autonomous Learning Roadmap`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Compass size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.3rem' }}>Goal-Based Career Roadmaps & AI Projects</h2>
                <span className="badge badge-brand">Reverse-Engineered Pathways</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Target your dream career goal. AI dynamically generates milestones, curriculum sprints, and portfolio projects.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleGenerateRoadmap} style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text"
            className="input-text"
            placeholder="e.g. Cybersecurity Specialist, Quant Trader..."
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            style={{ width: '260px' }}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            <Sparkles size={14} /> Roadmap
          </button>
        </form>
      </div>

      {/* Main Roadmap Milestones Stream */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
        
        {/* Left: Milestone Timeline */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>{roadmap.title}</h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Target Timeframe: {roadmap.timeframe}</span>
            </div>
            <span className="badge badge-cyan">{roadmap.milestones.filter(m => m.status === 'Completed').length} / {roadmap.milestones.length} Completed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
            {roadmap.milestones.map((m, idx) => {
              const isDone = m.status === 'Completed';
              const isInProg = m.status === 'In Progress';

              return (
                <div 
                  key={idx}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '16px',
                    background: isInProg ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: isInProg ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isDone ? 'var(--gradient-mastered)' : isInProg ? 'var(--gradient-brand)' : 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0
                  }}>
                    {isDone ? <CheckCircle size={16} /> : m.step}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <h4 style={{ fontSize: '0.95rem', color: '#f8fafc' }}>{m.title}</h4>
                      <span className={`badge ${isDone ? 'badge-mastered' : isInProg ? 'badge-brand' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
                        {m.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                      {m.skills.map((s, i) => (
                        <span key={i} className="badge badge-secondary" style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.04)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelectTopic(m.title)}
                    className="btn btn-secondary btn-sm"
                    style={{ alignSelf: 'center' }}
                  >
                    <span>Launch</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI-Generated Portfolio Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Code size={18} color="var(--accent-primary)" />
              <h4 style={{ fontSize: '1rem' }}>AI Portfolio Projects</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {roadmap.projects.map((p) => (
                <div 
                  key={p.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span className="badge badge-brand" style={{ fontSize: '0.65rem' }}>{p.level}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI-Evaluated</span>
                  </div>
                  <h5 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.4rem' }}>{p.title}</h5>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.75rem' }}>
                    {p.description}
                  </p>

                  <div style={{ padding: '0.65rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>Evaluation Rubric:</span>
                    <ul style={{ paddingLeft: '1rem', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      {p.rubric.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>

                  <button 
                    onClick={() => onSelectTopic(p.title)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <span>Start Project Sandbox</span>
                    <Terminal size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
