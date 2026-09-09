import React, { useState, useEffect } from 'react';
import { collegeRAG } from '../../services/ragService';
import { sharyxVoice } from '../../services/sharyxVoiceService';
import { 
  GraduationCap, Upload, BookOpen, Send, Mic, Volume2, 
  FileText, CheckCircle2, Sparkles, Trash2, Tag, ArrowRight
} from 'lucide-react';

export default function CollegeChatTutor({ onOpenVoice }) {
  const [documents, setDocuments] = useState(collegeRAG.getDocuments());
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello Alex! I am your College RAG AI Tutor. I answer questions strictly from your institution's syllabus, lecture slides, uploaded textbooks, and previous question papers.`,
      sources: []
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: '', course: 'Operating Systems (CS302)', category: 'Lecture Notes', content: '' });

  const courses = ['All', 'Operating Systems (CS302)', 'Database Management Systems (CS304)', 'Machine Learning (CS401)'];

  const handleAsk = async (textToAsk) => {
    const prompt = textToAsk || query;
    if (!prompt.trim()) return;

    const newMsgs = [...messages, { sender: 'student', text: prompt }];
    setMessages(newMsgs);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await collegeRAG.answerQuestion(prompt, selectedCourse);
      setMessages([...newMsgs, { sender: 'ai', text: response.answer, sources: response.sources }]);
    } catch (e) {
      console.error('RAG QA Error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDocument = (e) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.content) return;
    collegeRAG.addDocument(newDoc);
    setDocuments([...collegeRAG.getDocuments()]);
    setShowUploadModal(false);
    setNewDoc({ title: '', course: 'Operating Systems (CS302)', category: 'Lecture Notes', content: '' });
  };

  const handleDeleteDoc = (id) => {
    collegeRAG.deleteDocument(id);
    setDocuments([...collegeRAG.getDocuments()]);
  };

  const handleSpeakAnswer = (text) => {
    sharyxVoice.speak(text);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header & Course Filter Bar */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} color="var(--accent-primary)" />
            </div>
            <h2 style={{ fontSize: '1.3rem' }}>College RAG AI Tutor</h2>
            <span className="badge badge-brand">Institution Grounded</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Doubt solver strictly indexed over your university course syllabi, lecture slides, and past papers.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select 
            className="select-input" 
            style={{ width: 'auto', padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button 
            onClick={() => setShowUploadModal(true)}
            className="btn btn-primary btn-sm"
          >
            <Upload size={14} />
            <span>Upload Notes / QP</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout: Knowledge Base Documents & Chat Tutor */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Repository Documents */}
        <div className="glass-panel" style={{ padding: '1.25rem', height: '620px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={16} color="var(--accent-primary)" />
              <span>Ingested Repository</span>
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{documents.length} files</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {documents.map((doc) => (
              <div 
                key={doc.id}
                style={{
                  padding: '0.85rem',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>{doc.category}</span>
                  <button 
                    onClick={() => handleDeleteDoc(doc.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.25rem' }}>
                  {doc.title}
                </h5>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {doc.course}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Q&A Chat Panel */}
        <div className="glass-panel" style={{ height: '620px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Message Stream */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((m, idx) => (
              <div 
                key={idx}
                style={{
                  alignSelf: m.sender === 'student' ? 'flex-end' : 'flex-start',
                  maxWidth: '90%',
                  padding: '1rem 1.25rem',
                  borderRadius: m.sender === 'student' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.sender === 'student' ? 'var(--gradient-brand)' : 'rgba(255,255,255,0.04)',
                  border: m.sender === 'student' ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: '0.88rem',
                  lineHeight: 1.55
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: m.sender === 'student' ? 'rgba(255,255,255,0.8)' : 'var(--accent-primary)' }}>
                    {m.sender === 'student' ? 'Student Doubt' : '🎓 College RAG Tutor Response'}
                  </span>
                  {m.sender === 'ai' && (
                    <button 
                      onClick={() => handleSpeakAnswer(m.text)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}
                    >
                      <Volume2 size={14} /> Listen
                    </button>
                  )}
                </div>

                <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>

                {/* Sources & Citations */}
                {m.sources && m.sources.length > 0 && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      📚 Citations & Verified Sources:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.35rem' }}>
                      {m.sources.map((s, i) => (
                        <span key={i} className="badge badge-brand" style={{ fontSize: '0.68rem', textTransform: 'none' }}>
                          {s.title} ({s.course})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <Sparkles size={16} className="voice-pulsing" color="var(--accent-primary)" />
                Retrieving college document chunks & generating answer...
              </div>
            )}
          </div>

          {/* Quick Exam Questions */}
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '0.5rem', overflowX: 'auto', borderTop: '1px solid var(--border-subtle)' }}>
            <button onClick={() => handleAsk("Explain deadlock and the 4 Coffman conditions in Operating Systems")} className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap', fontSize: '0.72rem' }}>
              ❓ Deadlock & Coffman Conditions
            </button>
            <button onClick={() => handleAsk("Explain Strict 2-Phase Locking (2PL) and cascading aborts")} className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap', fontSize: '0.72rem' }}>
              ❓ Strict 2PL & Concurrency
            </button>
            <button onClick={() => handleAsk("What is the Bias-Variance tradeoff and L1/L2 Regularization?")} className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap', fontSize: '0.72rem' }}>
              ❓ Bias-Variance & Regularization
            </button>
          </div>

          {/* Chat Input Bar */}
          <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-card)', display: 'flex', gap: '0.65rem' }}>
            <input 
              type="text"
              className="input-text"
              placeholder={`Ask any doubt regarding ${selectedCourse}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button 
              onClick={() => handleAsk()} 
              className="btn btn-primary"
              disabled={isLoading || !query.trim()}
            >
              <Send size={16} />
            </button>
          </div>

        </div>

      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{ maxWidth: '540px', width: '100%', padding: '1.75rem', borderRadius: '20px', background: 'var(--bg-card)', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Upload College Course Material</h3>
            
            <form onSubmit={handleAddDocument} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Document Title / Unit</label>
                <input 
                  type="text"
                  className="input-text"
                  placeholder="e.g. CS302 Unit 4 Memory Management & Paging Notes"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Course</label>
                  <select 
                    className="select-input"
                    value={newDoc.course}
                    onChange={(e) => setNewDoc({ ...newDoc, course: e.target.value })}
                  >
                    <option value="Operating Systems (CS302)">Operating Systems (CS302)</option>
                    <option value="Database Management Systems (CS304)">Database Management Systems (CS304)</option>
                    <option value="Machine Learning (CS401)">Machine Learning (CS401)</option>
                    <option value="Computer Networks (CS305)">Computer Networks (CS305)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category</label>
                  <select 
                    className="select-input"
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                  >
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Textbook Extract">Textbook Extract</option>
                    <option value="Previous Question Papers">Previous Question Papers</option>
                    <option value="Syllabus & Rubric">Syllabus & Rubric</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Content Text / OCR Extracted Text</label>
                <textarea 
                  className="textarea-input"
                  rows={6}
                  placeholder="Paste lecture text, syllabus objectives, or previous question paper solutions here..."
                  value={newDoc.content}
                  onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowUploadModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Index Into RAG
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
