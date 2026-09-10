import React, { useState } from 'react';
import { memoryStore } from '../../services/memoryStore';
import { Award, Users, Flame, Shield, Trophy, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GamificationHub({ onOpenVoice }) {
  const [store, setStore] = useState(memoryStore.getState());
  const { student, badges, peerGroups } = store;

  const handleClaimReward = () => {
    memoryStore.addXP(50, 'Daily Streak Claimed');
    confetti({ particleCount: 60, spread: 60 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.3rem' }}>Gamification & AI Peer Learning Pods</h2>
                <span className="badge badge-brand">Adaptive Social Hub</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Earn XP, level up, unlock mastery badges, and collaborate in AI-matched peer learning groups.
              </p>
            </div>
          </div>
        </div>

        <button onClick={handleClaimReward} className="btn btn-primary btn-sm">
          <Flame size={14} fill="#fff" />
          <span>Claim 14-Day Streak Bonus (+50 XP)</span>
        </button>
      </div>

      {/* Two Column Layout: Badges & Peer Pods */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Left: Mastery & Achievement Badges */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Award size={18} color="var(--accent-primary)" />
              <span>Achievement Badges</span>
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {badges.filter(b => b.unlocked).length} / {badges.length} Unlocked
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {badges.map((b) => (
              <div
                key={b.id}
                style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  background: b.unlocked ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                  border: b.unlocked ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  opacity: b.unlocked ? 1 : 0.65
                }}
              >
                <div style={{
                  fontSize: '1.8rem',
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {b.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <h4 style={{ fontSize: '0.92rem', color: b.unlocked ? '#fff' : 'var(--text-secondary)' }}>{b.name}</h4>
                    {b.unlocked ? (
                      <span className="badge badge-mastered" style={{ fontSize: '0.62rem' }}>Unlocked</span>
                    ) : (
                      <span className="badge badge-warning" style={{ fontSize: '0.62rem' }}>Locked</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Peer Learning Pods */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Users size={18} color="var(--accent-cyan)" />
              <span>Smart AI Study Pods</span>
            </h3>
            <span className="badge badge-cyan">Matched by Goal</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {peerGroups.map((pod) => (
              <div
                key={pod.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: '16px',
                  background: 'rgba(6, 182, 212, 0.04)',
                  border: '1px solid rgba(6, 182, 212, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#fff' }}>{pod.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {pod.members} Peers • Target: {pod.goal}
                    </span>
                  </div>
                  <span className="badge badge-brand">Rank #{pod.myRank}</span>
                </div>

                <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <strong>Current Challenge:</strong> {pod.activeChallenge}
                </div>

                <button
                  onClick={onOpenVoice}
                  className="btn btn-voice btn-sm"
                  style={{ alignSelf: 'flex-end' }}
                >
                  <span>Join Pod Voice Huddle</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
