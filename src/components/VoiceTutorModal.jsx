import React, { useState, useEffect, useRef } from 'react';
import { sharyxVoice } from '../services/sharyxVoiceService';
import { GroqService } from '../services/groqService';
import { memoryStore } from '../services/memoryStore';
import { 
  Mic, MicOff, Volume2, VolumeX, Sparkles, X, 
  Minimize2, Maximize2, Send, Bot, Play, HelpCircle
} from 'lucide-react';

export default function VoiceTutorModal({ isOpen, onClose, initialConcept = '' }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [micError, setMicError] = useState(null);
  const [conversation, setConversation] = useState([
    {
      sender: 'ai',
      text: initialConcept 
        ? `Hello! I'm your Sharyx-powered VoxLearn AI voice companion. Let's master ${initialConcept}. Speak or type your question!`
        : `Hey Alex! I'm your Sharyx Voice AI tutor. Speak, type, or click "Diagnose Weakness" below to begin!`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [waveHeights, setWaveHeights] = useState([10, 20, 14, 28, 18, 24, 12, 18]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsub = sharyxVoice.subscribe(({ isSpeaking }) => {
      setIsSpeaking(isSpeaking);
    });
    return () => unsub();
  }, []);

  // Waveform animation
  useEffect(() => {
    let interval;
    if (isSpeaking || isListening) {
      interval = setInterval(() => {
        setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 26) + 8));
      }, 100);
    } else {
      setWaveHeights([8, 12, 10, 14, 10, 12, 8, 10]);
    }
    return () => clearInterval(interval);
  }, [isSpeaking, isListening]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  if (!isOpen) return null;

  const handleSendMessage = async (userText) => {
    const textToSend = userText || inputText || transcript;
    if (!textToSend.trim()) return;

    setMicError(null);
    const newHistory = [...conversation, { sender: 'student', text: textToSend }];
    setConversation(newHistory);
    setInputText('');
    setTranscript('');
    setIsLoading(true);

    try {
      if (textToSend.toLowerCase().includes('weak') || textToSend.toLowerCase().includes('diagnos')) {
        const risk = memoryStore.getRiskAnalysis();
        const responseText = risk.weakCount > 0
          ? `I've diagnosed your knowledge graph. You currently have ${risk.weakCount} critical weak areas: ${risk.weakNodes.map(n => n.name).join(', ')}. I recommend taking the 5-minute remedial sprint for ${risk.weakNodes[0].name} right now!`
          : `Your knowledge graph is looking fantastic! Overall mastery is at ${risk.overallMastery}%. Let's challenge you with an advanced module.`;
        
        setConversation(prev => [...prev, { sender: 'ai', text: responseText }]);
        await sharyxVoice.speak(responseText);
      } else {
        const aiResponse = await GroqService.getSocraticResponse(newHistory, textToSend, initialConcept);
        setConversation(prev => [...prev, { sender: 'ai', text: aiResponse }]);
        await sharyxVoice.speak(aiResponse);
      }
    } catch (err) {
      console.error('Voice tutor response error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMic = () => {
    setMicError(null);
    if (isListening) {
      sharyxVoice.stopListening();
      setIsListening(false);
      if (transcript.trim()) {
        handleSendMessage(transcript);
      }
    } else {
      sharyxVoice.stopSpeaking();
      const started = sharyxVoice.startListening(
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal) {
            sharyxVoice.stopListening();
            setIsListening(false);
            handleSendMessage(text);
          }
        },
        () => setIsListening(false),
        (err) => {
          console.warn('Speech error:', err);
          setIsListening(false);
          setMicError('Microphone input is inactive or permission denied. You can type queries directly below!');
        }
      );
      if (started) {
        setIsListening(true);
      } else {
        setMicError('Speech recognition is unavailable in this browser. You can type freely in the chat box!');
      }
    }
  };

  const handleTestVoice = () => {
    sharyxVoice.speak("Hello! This is Sharyx Voice AI speaking. Your speech synthesizer is working perfectly.");
  };

  if (minimized) {
    return (
      <div 
        onClick={() => setMinimized(false)}
        className="glass-panel glass-panel-voice floating-card"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '0.8rem 1.25rem',
          borderRadius: '999px',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--bg-card)'
        }}
      >
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: isSpeaking ? 'var(--accent-cyan)' : 'var(--accent-primary)',
          boxShadow: isSpeaking ? '0 0 12px var(--accent-cyan)' : 'none'
        }} className={isSpeaking ? 'voice-pulsing' : ''} />
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sharyx Voice AI</span>
        <Maximize2 size={16} color="var(--text-secondary)" />
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '430px',
      maxWidth: 'calc(100vw - 32px)',
      height: '600px',
      maxHeight: 'calc(100vh - 48px)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="glass-panel glass-panel-voice" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-tertiary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'var(--gradient-voice)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }} className={isSpeaking || isListening ? 'voice-pulsing' : ''}>
              <Mic size={16} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Sharyx Voice AI</h4>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>Online</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Socratic Voice Companion</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button 
              onClick={handleTestVoice}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.7rem', padding: '0.3rem 0.55rem' }}
              title="Click to test speech synthesis"
            >
              <Volume2 size={13} /> Test
            </button>
            <button 
              onClick={() => setMinimized(true)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
            >
              <Minimize2 size={16} />
            </button>
            <button 
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Live Audio Visualizer Bar */}
        <div style={{
          padding: '0.65rem 1.25rem',
          background: 'var(--bg-input)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '32px' }}>
            {waveHeights.map((h, i) => (
              <div 
                key={i} 
                className="wave-bar" 
                style={{ 
                  height: `${h}px`,
                  background: isListening ? 'var(--gradient-weakness)' : 'var(--gradient-voice)'
                }} 
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            {isListening ? 'Listening' : (isSpeaking ? 'Speaking' : 'Idle')}
          </div>

          <button 
            onClick={() => isSpeaking ? sharyxVoice.stopSpeaking() : sharyxVoice.speak(conversation[conversation.length - 1]?.text || '')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            title="Toggle Audio playback"
          >
            {isSpeaking ? <Volume2 size={16} color="var(--accent-cyan)" /> : <VolumeX size={16} />}
          </button>
        </div>

        {/* Permission / Helper Warning if Mic is denied */}
        {micError && (
          <div style={{ padding: '0.5rem 0.85rem', background: 'rgba(245, 158, 11, 0.1)', borderBottom: '1px solid rgba(245, 158, 11, 0.25)', fontSize: '0.75rem', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <HelpCircle size={14} flexShrink={0} />
            <span>{micError}</span>
          </div>
        )}

        {/* Conversation Stream */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          {conversation.map((msg, idx) => (
            <div 
              key={idx}
              style={{
                alignSelf: msg.sender === 'student' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '0.75rem 1rem',
                borderRadius: msg.sender === 'student' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.sender === 'student' ? 'var(--gradient-brand)' : 'var(--bg-tertiary)',
                border: msg.sender === 'student' ? 'none' : '1px solid var(--border-subtle)',
                color: msg.sender === 'student' ? '#ffffff' : 'var(--text-primary)',
                fontSize: '0.86rem',
                lineHeight: 1.45
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem', fontSize: '0.7rem', color: msg.sender === 'student' ? 'rgba(255,255,255,0.8)' : 'var(--accent-cyan)', fontWeight: 700 }}>
                {msg.sender === 'student' ? 'You' : <><Bot size={12} /> Sharyx Tutor</>}
              </div>
              {msg.text}
            </div>
          ))}

          {isLoading && (
            <div style={{
              alignSelf: 'flex-start',
              padding: '0.6rem 1rem',
              borderRadius: '16px',
              background: 'var(--bg-tertiary)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Sparkles size={14} className="voice-pulsing" color="var(--accent-cyan)" />
              Formulating Socratic response...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Voice Prompts */}
        <div style={{
          padding: '0.5rem 0.75rem',
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-input)'
        }}>
          <button onClick={() => handleSendMessage("Diagnose my weak spots")} className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap', fontSize: '0.7rem' }}>
            Diagnose Weakness
          </button>
          <button onClick={() => handleSendMessage("Give me a Socratic drill on Window Functions")} className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap', fontSize: '0.7rem' }}>
            Socratic Drill
          </button>
          <button onClick={() => handleSendMessage("Explain Deadlocks in simple terms")} className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap', fontSize: '0.7rem' }}>
            Explain Concept
          </button>
        </div>

        {/* Input Controls & Mic Action */}
        <div style={{
          padding: '0.85rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'var(--bg-card)'
        }}>
          <button
            onClick={toggleMic}
            className="btn"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              padding: 0,
              background: isListening ? 'var(--gradient-weakness)' : 'var(--gradient-voice)',
              boxShadow: isListening ? 'var(--shadow-glow-cyan)' : 'none'
            }}
            title={isListening ? 'Stop Listening' : 'Click to Speak (Microphone)'}
          >
            {isListening ? <MicOff size={18} color="#fff" /> : <Mic size={18} color="#fff" />}
          </button>

          <input 
            type="text"
            className="input-text"
            placeholder={isListening ? "Listening... speak now" : "Ask or speak to tutor..."}
            value={transcript || inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{ flex: 1, padding: '0.6rem 0.9rem', fontSize: '0.85rem' }}
          />

          <button
            onClick={() => handleSendMessage()}
            className="btn btn-primary"
            style={{ width: '38px', height: '38px', borderRadius: '50%', padding: 0 }}
            disabled={isLoading || (!inputText.trim() && !transcript.trim())}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
