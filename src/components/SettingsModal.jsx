import React, { useState } from 'react';
import { getStoredConfig, saveConfig } from '../config/apiConfig';
import { X, Key, Mic, Cpu, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(getStoredConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveConfig(config);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 7, 12, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '1.75rem',
        borderRadius: '20px',
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>AI Engine & Voice Setup</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Configure Groq API & Sharyx Voice AI Integrations</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          
          {/* Groq API Config */}
          <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Cpu size={16} color="var(--accent-primary)" />
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Groq API Key (Fast LLM Inference)</label>
            </div>
            <input 
              type="password"
              className="input-text"
              placeholder="gsk_..."
              value={config.groqApiKey}
              onChange={(e) => setConfig({ ...config, groqApiKey: e.target.value })}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Model:</span>
              <select 
                className="select-input" 
                style={{ width: 'auto', padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                value={config.groqModel}
                onChange={(e) => setConfig({ ...config, groqModel: e.target.value })}
              >
                <option value="openai/gpt-oss-120b">OpenAI GPT-OSS 120B (High Intelligence)</option>
                <option value="qwen/qwen3.8-27b">Qwen 3.8 27B (Fast & Coding)</option>
                <option value="openai/gpt-oss-20b">OpenAI GPT-OSS 20B (Sub-100ms)</option>
              </select>
            </div>
          </div>

          {/* Sharyx Voice AI Config */}
          <div style={{ padding: '1rem', background: 'rgba(6,182,212,0.03)', borderRadius: '12px', border: '1px solid rgba(6,182,212,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Mic size={16} color="var(--accent-cyan)" />
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Sharyx Voice AI Key & Persona</label>
            </div>
            <input 
              type="password"
              className="input-text"
              placeholder="shx_voice_key_..."
              value={config.sharyxApiKey}
              onChange={(e) => setConfig({ ...config, sharyxApiKey: e.target.value })}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tutor Voice:</span>
              <select 
                className="select-input" 
                style={{ width: 'auto', padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                value={config.sharyxVoice}
                onChange={(e) => setConfig({ ...config, sharyxVoice: e.target.value })}
              >
                <option value="neural-nova-en">Sharyx Nova (Empathetic & Clear)</option>
                <option value="neural-orion-en">Sharyx Orion (Authoritative & Crisp)</option>
                <option value="neural-aria-en">Sharyx Aria (Energetic & Dynamic)</option>
              </select>
            </div>
          </div>

          {/* Socratic & Autonomous Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={config.socraticMode}
                onChange={(e) => setConfig({ ...config, socraticMode: e.target.checked })}
              />
              <span>Enable <strong>Socratic Guided Tutoring</strong> (Inquiry over answers)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input 
                type="checkbox"
                checked={config.audioFeedback}
                onChange={(e) => setConfig({ ...config, audioFeedback: e.target.checked })}
              />
              <span>Auto-play Sharyx Voice speech responses</span>
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.08)', padding: '0.6rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
            <ShieldCheck size={16} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Zero-friction Fallback Engine is active. VoxLearn AI functions fully with live or built-in hackathon autonomous generators.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '130px' }}>
              {savedSuccess ? (
                <>
                  <CheckCircle2 size={16} /> Saved!
                </>
              ) : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
