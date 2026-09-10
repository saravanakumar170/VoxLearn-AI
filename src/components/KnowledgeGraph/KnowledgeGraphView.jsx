import React, { useState, useEffect } from 'react';
import { memoryStore } from '../../services/memoryStore';
import { BrainCircuit, Zap, CheckCircle, AlertTriangle, ArrowRight, Filter, Info, ShieldAlert } from 'lucide-react';

export default function KnowledgeGraphView({ onStartRemedial, onOpenVoice }) {
  const [nodes, setNodes] = useState(memoryStore.getState().knowledgeNodes);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [activeNode, setActiveNode] = useState(nodes.find(n => n.status === 'Weak') || nodes[0]);

  useEffect(() => {
    const unsub = memoryStore.subscribe((state) => {
      setNodes(state.knowledgeNodes);
      if (activeNode) {
        const updated = state.knowledgeNodes.find(n => n.id === activeNode.id);
        if (updated) setActiveNode(updated);
      }
    });
    return () => unsub();
  }, [activeNode]);

  const domains = ['All', 'Database', 'Python', 'Machine Learning'];
  const filteredNodes = selectedDomain === 'All' ? nodes : nodes.filter(n => n.domain === selectedDomain);

  const getStatusBadge = (status) => {
    if (status === 'Mastered') return <span className="badge badge-mastered"><CheckCircle size={12} className="inline mr-1" /> Mastered</span>;
    if (status === 'Medium') return <span className="badge badge-warning"><AlertTriangle size={12} className="inline mr-1" /> In Progress</span>;
    return <span className="badge badge-weak"><ShieldAlert size={12} className="inline mr-1" /> Critical Weakness</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BrainCircuit size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.3rem' }}>Student Knowledge Graph</h2>
                <span className="badge badge-cyan">Real-Time Concept Mastery</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Visual network tracking concept-level understanding, prerequisite dependencies, and learning risks.
              </p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-secondary)" />
          <select 
            className="select-input" 
            style={{ width: 'auto', padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            {domains.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Main Two-Column View: Interactive Visual Grid & Node Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
        
        {/* Left: Concept Nodes Matrix */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h4 style={{ fontSize: '0.95rem' }}>Concept Mastery Network</h4>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span>High (&gt;=80%)</span>
              <span>Medium (60-79%)</span>
              <span>Weak (&lt;60%)</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
            {filteredNodes.map((n) => {
              const isSelected = activeNode?.id === n.id;
              const isWeak = n.status === 'Weak';
              const isMastered = n.status === 'Mastered';

              let borderColor = 'var(--border-subtle)';
              let glow = 'none';
              if (isSelected) {
                borderColor = 'var(--accent-primary)';
                glow = 'var(--glow-primary)';
              } else if (isWeak) {
                borderColor = 'rgba(244, 63, 94, 0.4)';
              } else if (isMastered) {
                borderColor = 'rgba(16, 185, 129, 0.3)';
              }

              return (
                <div
                  key={n.id}
                  onClick={() => setActiveNode(n)}
                  style={{
                    padding: '1rem',
                    borderRadius: '14px',
                    background: isSelected 
                      ? 'rgba(99, 102, 241, 0.15)' 
                      : isWeak 
                      ? 'rgba(244, 63, 94, 0.05)' 
                      : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${borderColor}`,
                    boxShadow: glow,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {n.domain}
                      </span>
                      {getStatusBadge(n.status)}
                    </div>
                    <h5 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc', lineHeight: 1.3 }}>
                      {n.name}
                    </h5>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Mastery</span>
                      <strong style={{ color: isWeak ? 'var(--accent-rose)' : isMastered ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                        {n.mastery}%
                      </strong>
                    </div>
                    <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${n.mastery}%`,
                        height: '100%',
                        background: isWeak ? 'var(--gradient-weakness)' : isMastered ? 'var(--gradient-mastered)' : 'var(--accent-amber)'
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Node Detail Inspector */}
        {activeNode && (
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'fit-content' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-brand">{activeNode.domain}</span>
                {getStatusBadge(activeNode.status)}
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>{activeNode.name}</h3>
            </div>

            <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Concept Score</span>
                <strong>{activeNode.mastery}%</strong>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {activeNode.status === 'Weak' 
                  ? 'Identified as a critical bottleneck. Prerequisite for advanced analytical querying.'
                  : activeNode.status === 'Mastered'
                  ? 'Strong conceptual intuition. Verified across multiple assessments.'
                  : 'Intermediate proficiency. Ready for edge case drills.'}
              </p>
            </div>

            {/* Prerequisite Chain */}
            <div>
              <h5 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Prerequisites
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {activeNode.prerequisites.length > 0 ? (
                  activeNode.prerequisites.map(p => (
                    <span key={p} className="badge badge-cyan" style={{ fontSize: '0.68rem', textTransform: 'none' }}>
                      {nodes.find(n => n.id === p)?.name || p}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>None (Fundamental Root Node)</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
              {activeNode.status === 'Weak' ? (
                <button 
                  onClick={() => onStartRemedial(activeNode.name)}
                  className="btn btn-danger"
                  style={{ width: '100%' }}
                >
                  <Zap size={16} />
                  <span>Start 5-Min Remedial Sprint</span>
                </button>
              ) : (
                <button 
                  onClick={() => onStartRemedial(activeNode.name)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <ArrowRight size={16} />
                  <span>Practice Concept Drill</span>
                </button>
              )}

              <button 
                onClick={onOpenVoice}
                className="btn btn-voice btn-sm"
                style={{ width: '100%' }}
              >
                <span>Socratic Voice Drill</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
