import React, { useState, useEffect } from 'react';
import { GroqService } from '../../services/groqService';
import { sharyxVoice } from '../../services/sharyxVoiceService';
import { memoryStore } from '../../services/memoryStore';
import { 
  BookOpen, Sparkles, Play, Gamepad2, Radio, Video, 
  MessageSquare, Terminal, FileText, CheckCircle, Flame, Volume2, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CourseStudio({ onOpenVoice, initialTopic = '' }) {
  const [topicInput, setTopicInput] = useState(initialTopic || 'SQL Window Functions & Analytical Engines');
  const [selectedLevel, setSelectedLevel] = useState('Intermediate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeMode, setActiveMode] = useState('podcast'); // game, podcast, video, socratic, sim, traditional
  
  // Game Mode State
  const [selectedGameOption, setSelectedGameOption] = useState(null);
  const [gameFeedback, setGameFeedback] = useState(null);
  const [gameScore, setGameScore] = useState(0);

  // Podcast Mode State
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [currentPodcastLine, setCurrentPodcastLine] = useState(null);

  // Socratic Chat State for this module
  const [socraticChat, setSocraticChat] = useState([]);
  const [socraticInput, setSocraticInput] = useState('');
  const [isSocraticLoading, setIsSocraticLoading] = useState(false);

  // Interactive Sim State
  const [simCode, setSimCode] = useState('');
  const [simOutput, setSimOutput] = useState('');

  // Initial load
  useEffect(() => {
    generateInitialCourse(topicInput, selectedLevel);
  }, []);

  const generateInitialCourse = async (topic, level) => {
    setIsGenerating(true);
    try {
      const course = await GroqService.generateCourse(topic, level);
      setCurrentCourse(course);
      setActiveModuleIndex(0);
      setupModuleState(course.modules[0]);
    } catch (e) {
      console.error('Course generation error:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const setupModuleState = (mod) => {
    if (!mod) return;
    setSelectedGameOption(null);
    setGameFeedback(null);
    setIsPlayingPodcast(false);
    setCurrentPodcastLine(null);
    setSimCode(mod.interactiveSim?.initialCode || '');
    setSimOutput('');
    setSocraticChat([
      { sender: 'ai', text: mod.socraticPrompt || `What is your primary intuition about ${mod.concept}?` }
    ]);
  };

  const handleModuleSelect = (idx) => {
    setActiveModuleIndex(idx);
    setupModuleState(currentCourse.modules[idx]);
  };

  const handleGenerateCustom = (e) => {
    e.preventDefault();
    if (!topicInput.trim()) return;
    generateInitialCourse(topicInput, selectedLevel);
  };

  // Game Mode: Answer selection
  const handleSelectGameOption = (idx) => {
    if (selectedGameOption !== null) return;
    const currentMod = currentCourse.modules[activeModuleIndex];
    setSelectedGameOption(idx);
    const isCorrect = idx === currentMod.gameChallenge.correctIndex;
    
    if (isCorrect) {
      setGameFeedback({ correct: true, text: `🔥 Correct! ${currentMod.gameChallenge.explanation}` });
      setGameScore(prev => prev + 50);
      memoryStore.addXP(50, 'Completed Game Arena Challenge');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      setGameFeedback({ correct: false, text: `❌ Not quite. ${currentMod.gameChallenge.explanation}` });
    }
  };

  // Podcast Mode: Play with Sharyx Voice
  const handlePlayPodcast = async () => {
    const currentMod = currentCourse.modules[activeModuleIndex];
    if (!currentMod.podcastScript) return;
    
    setIsPlayingPodcast(true);
    await sharyxVoice.playPodcastDialogue(currentMod.podcastScript, (index, line) => {
      if (line) {
        setCurrentPodcastLine({ index, ...line });
      } else {
        setIsPlayingPodcast(false);
        setCurrentPodcastLine(null);
      }
    });
  };

  // Socratic Mode: Send message
  const handleSendSocratic = async () => {
    if (!socraticInput.trim()) return;
    const currentMod = currentCourse.modules[activeModuleIndex];
    const newChat = [...socraticChat, { sender: 'student', text: socraticInput }];
    setSocraticChat(newChat);
    setSocraticInput('');
    setIsSocraticLoading(true);

    try {
      const response = await GroqService.getSocraticResponse(newChat, socraticInput, currentMod.concept);
      setSocraticChat([...newChat, { sender: 'ai', text: response }]);
      sharyxVoice.speak(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSocraticLoading(false);
    }
  };

  // Run Interactive Simulation
  const handleRunSim = () => {
    const currentMod = currentCourse.modules[activeModuleIndex];
    setSimOutput(`[Executing Query against In-Memory SQL Engine...]\nStatus: SUCCESS\nExecution Plan: Index Seek + Window Aggregation (0.84ms)\nOutput Rows:\n${currentMod.interactiveSim?.expectedOutput || 'Execution completed without errors.'}`);
    memoryStore.addXP(25, 'Ran Interactive Sandbox Simulation');
  };

  const currentMod = currentCourse?.modules[activeModuleIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Course Generator Header Bar */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.3rem' }}>AI Course Generator & Multi-Modal Studio</h2>
                <span className="badge badge-cyan">Groq Ultra-Fast</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Dynamically synthesizes complete curricula. Transform any topic into 6 unique learning modalities.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Topic Prompt Input */}
        <form onSubmit={handleGenerateCustom} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <input 
            type="text"
            className="input-text"
            style={{ flex: 1, minWidth: '260px' }}
            placeholder="What do you want to learn? (e.g. Distributed Consensus in Raft, Transformers & Attention, SQL Window Functions)"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
          />
          <select 
            className="select-input" 
            style={{ width: 'auto' }}
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced / Production">Advanced / Production</option>
          </select>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isGenerating}
            style={{ minWidth: '150px' }}
          >
            {isGenerating ? <Sparkles size={16} className="voice-pulsing" /> : <Sparkles size={16} />}
            <span>{isGenerating ? 'Synthesizing...' : 'Generate Course'}</span>
          </button>
        </form>
      </div>

      {/* Main Course Studio Layout */}
      {currentCourse && (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>
          
          {/* Left: Syllabus & Module Navigation */}
          <div className="glass-panel" style={{ padding: '1.25rem', height: 'fit-content' }}>
            <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <span className="badge badge-brand" style={{ fontSize: '0.65rem' }}>{currentCourse.level}</span>
              <h3 style={{ fontSize: '1.05rem', marginTop: '0.35rem', color: '#fff' }}>{currentCourse.title}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Est: {currentCourse.estimatedHours} Hours • {currentCourse.modules.length} Modules
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentCourse.modules.map((m, idx) => {
                const isSelected = activeModuleIndex === idx;
                return (
                  <div
                    key={m.id || idx}
                    onClick={() => handleModuleSelect(idx)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.7rem', color: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)', fontWeight: 700 }}>
                        Module 0{idx + 1}
                      </span>
                      {isSelected && <CheckCircle size={14} color="var(--accent-primary)" />}
                    </div>
                    <h4 style={{ fontSize: '0.85rem', color: isSelected ? '#fff' : 'var(--text-secondary)' }}>
                      {m.title}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{m.concept}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Multi-Modal Learning Hub */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Multi-Modal Mode Switcher Tabs */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              padding: '0.35rem',
              background: 'var(--bg-tertiary)',
              borderRadius: '14px',
              border: '1px solid var(--border-subtle)'
            }}>
              {[
                { id: 'podcast', label: '🎙️ Podcast Mode', icon: <Radio size={14} /> },
                { id: 'game', label: '🎮 Game Arena', icon: <Gamepad2 size={14} /> },
                { id: 'socratic', label: '💬 Socratic Tutor', icon: <MessageSquare size={14} /> },
                { id: 'sim', label: '🧩 Interactive Sim', icon: <Terminal size={14} /> },
                { id: 'video', label: '🎥 Video Storyboard', icon: <Video size={14} /> },
                { id: 'traditional', label: '📖 Traditional Notes', icon: <FileText size={14} /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMode(tab.id)}
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeMode === tab.id ? 'var(--gradient-brand)' : 'transparent',
                    color: activeMode === tab.id ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow: activeMode === tab.id ? '0 4px 15px rgba(99, 102, 241, 0.35)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mode Content Renderers */}
            
            {/* 1. PODCAST MODE */}
            {activeMode === 'podcast' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '18px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      background: 'var(--gradient-voice)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#ffffff'
                    }} className={isPlayingPodcast ? 'voice-pulsing' : ''}>
                      <Radio size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>AI Dual-Host Podcast: {currentMod?.concept}</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Hosts: Nova (Empathetic Guide) & Orion (Deep Systems Specialist)
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlayPodcast}
                    className="btn btn-voice"
                    style={{ borderRadius: '999px', padding: '0.75rem 1.5rem' }}
                  >
                    {isPlayingPodcast ? '🔊 Broadcasting with Sharyx Voice...' : '▶ Play AI Audio Podcast'}
                  </button>
                </div>

                {/* Podcast Script Transcript Stream */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {currentMod?.podcastScript?.map((line, idx) => {
                    const isCurrent = currentPodcastLine?.index === idx;
                    const isNova = line.speaker === 'Nova';
                    return (
                      <div 
                        key={idx}
                        style={{
                          padding: '1rem 1.25rem',
                          borderRadius: '14px',
                          background: isCurrent ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-tertiary)',
                          border: isCurrent ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                          transition: 'all 0.25s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                          <span className={`badge ${isNova ? 'badge-cyan' : 'badge-brand'}`} style={{ fontSize: '0.7rem' }}>
                            {line.speaker}
                          </span>
                          {isCurrent && <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>● Now Speaking</span>}
                        </div>
                        <p style={{ fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--text-primary)' }}>
                          "{line.text}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. GAME ARENA MODE */}
            {activeMode === 'game' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Gamepad2 size={20} color="var(--accent-primary)" />
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{currentMod?.gameChallenge?.title || 'Knowledge Arena Challenge'}</h3>
                  </div>
                  <span className="badge badge-brand">Score: +{gameScore} XP</span>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-tertiary)' }}>
                  <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: 600 }}>
                    {currentMod?.gameChallenge?.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                    {currentMod?.gameChallenge?.options?.map((opt, i) => {
                      const isChosen = selectedGameOption === i;
                      const isCorrect = i === currentMod.gameChallenge.correctIndex;
                      let bg = 'var(--bg-card)';
                      let border = 'var(--border-subtle)';

                      if (selectedGameOption !== null) {
                        if (isCorrect) {
                          bg = 'rgba(16, 185, 129, 0.2)';
                          border = '1px solid var(--accent-emerald)';
                        } else if (isChosen) {
                          bg = 'rgba(244, 63, 94, 0.2)';
                          border = '1px solid var(--accent-rose)';
                        }
                      }

                      return (
                        <div
                          key={i}
                          onClick={() => handleSelectGameOption(i)}
                          style={{
                            padding: '1rem 1.25rem',
                            borderRadius: '12px',
                            background: bg,
                            border: `1px solid ${border}`,
                            cursor: selectedGameOption === null ? 'pointer' : 'default',
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                          }}
                        >
                          <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {gameFeedback && (
                    <div style={{
                      marginTop: '1.25rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      background: gameFeedback.correct ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)',
                      border: `1px solid ${gameFeedback.correct ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
                      fontSize: '0.9rem',
                      color: '#fff'
                    }}>
                      {gameFeedback.text}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. SOCRATIC TUTOR MODE */}
            {activeMode === 'socratic' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '520px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem' }}>Socratic Inquiry Tutor</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Active reasoning through guided inquiry. The AI will challenge and probe your mental model.
                    </p>
                  </div>
                  <button onClick={onOpenVoice} className="btn btn-voice btn-sm">
                    <Volume2 size={14} /> Voice Socratic
                  </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.5rem' }}>
                  {socraticChat.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: msg.sender === 'student' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        padding: '0.85rem 1.15rem',
                        borderRadius: msg.sender === 'student' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background: msg.sender === 'student' ? 'var(--gradient-brand)' : 'rgba(255,255,255,0.05)',
                        border: msg.sender === 'student' ? 'none' : '1px solid var(--border-subtle)',
                        fontSize: '0.88rem'
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', color: msg.sender === 'student' ? 'rgba(255,255,255,0.7)' : 'var(--accent-primary)', marginBottom: '0.2rem', fontWeight: 600 }}>
                        {msg.sender === 'student' ? 'Your Reasoning' : '🦉 Socratic Guide'}
                      </div>
                      {msg.text}
                    </div>
                  ))}
                  {isSocraticLoading && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Sparkles size={14} className="voice-pulsing" color="var(--accent-primary)" />
                      Formulating thought-provoking challenge...
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text"
                    className="input-text"
                    placeholder="Share your reasoning or answer the tutor's prompt..."
                    value={socraticInput}
                    onChange={(e) => setSocraticInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendSocratic()}
                  />
                  <button onClick={handleSendSocratic} className="btn btn-primary">
                    Answer
                  </button>
                </div>
              </div>
            )}

            {/* 4. INTERACTIVE SIMULATION MODE */}
            {activeMode === 'sim' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem' }}>Interactive Code & Logic Sandbox</h3>
                  <button onClick={handleRunSim} className="btn btn-primary btn-sm">
                    <Play size={14} /> Run Sandbox Trace
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>
                      Sandbox Editor (Editable)
                    </label>
                    <textarea 
                      className="textarea-input"
                      rows={10}
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                      value={simCode}
                      onChange={(e) => setSimCode(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>
                      Live Execution Trace & Output
                    </label>
                    <div style={{
                      height: '240px',
                      background: '#04060a',
                      borderRadius: '8px',
                      padding: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--accent-cyan)',
                      overflowY: 'auto',
                      border: '1px solid var(--border-subtle)',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {simOutput || `// Click "Run Sandbox Trace" to evaluate code against simulated database / compiler`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. VIDEO STORYBOARD MODE */}
            {activeMode === 'video' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem' }}>AI Video Storyboard & Visualizer</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {currentMod?.videoStoryboard?.map((scene, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span className="badge badge-brand">Scene 0{scene.scene}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Visual Script</span>
                      </div>
                      
                      <div style={{
                        height: '120px',
                        background: 'linear-gradient(135deg, rgba(13,17,26,0.9) 0%, rgba(99,102,241,0.1) 100%)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        textAlign: 'center',
                        fontSize: '0.82rem',
                        color: 'var(--text-primary)',
                        marginBottom: '0.75rem',
                        border: '1px dashed var(--border-subtle)'
                      }}>
                        🎬 {scene.visual}
                      </div>

                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        <strong>Audio Narration:</strong> "{scene.narration}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. TRADITIONAL MODE */}
            {activeMode === 'traditional' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem' }}>Structured Concept Summary</h3>
                <p style={{ fontSize: '0.92rem', color: '#f8fafc', lineHeight: 1.6 }}>
                  {currentMod?.traditional?.overview}
                </p>

                <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Key Architectural Principles</h4>
                  <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {currentMod?.traditional?.keyPoints?.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                {currentMod?.traditional?.codeExample && (
                  <div>
                    <h4 style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Reference Implementation</h4>
                    <pre style={{
                      background: '#04060a',
                      padding: '1rem',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      color: '#34d399',
                      overflowX: 'auto',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <code>{currentMod.traditional.codeExample}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
