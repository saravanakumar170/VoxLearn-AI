// Sharyx Voice AI Service & Speech Engine for VoxLearn AI
// Robust Browser Speech Synthesis (TTS) & Recognition (STT)

class SharyxVoiceService {
  constructor() {
    this.isListening = false;
    this.recognition = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.audioContext = null;
    this.listeners = new Set();
    this.currentUtterance = null;
    this.voices = [];
    
    this.initVoices();
    this.initSpeechRecognition();
  }

  initVoices() {
    if (!this.synth) return;
    
    const loadVoices = () => {
      this.voices = this.synth.getVoices() || [];
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  initSpeechRecognition() {
    if (typeof window === 'undefined') return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      } catch (e) {
        console.warn('SpeechRecognition initialization error:', e);
      }
    }
  }

  // Play synthetic tone using Web Audio API for interactive audio feedback
  playAudioChime(type = 'start') {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      if (type === 'start') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      } else {
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
      }
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // AudioContext policy suppression fallback
    }
  }

  speakText(text, options = {}) {
    return this.speak(text, options);
  }

  // Text-to-Speech (Sharyx Neural Voice or Browser Fallback)
  speak(text, options = {}) {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      // Cancel any ongoing utterance
      this.synth.cancel();

      const cleanText = (text || '')
        .replace(/[*_#`\$\\]/g, '')
        .replace(/http\S+/g, '')
        .trim();

      if (!cleanText) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      this.currentUtterance = utterance; // Prevent GC cancellation in Chromium

      utterance.rate = options.rate || 1.05;
      utterance.pitch = options.pitch || 1.0;

      // Select best voice available
      const voices = this.voices.length > 0 ? this.voices : this.synth.getVoices();
      if (voices && voices.length > 0) {
        const preferredVoice = voices.find(v => 
          (options.voice && v.name.toLowerCase().includes(options.voice.toLowerCase())) ||
          v.name.includes('Google UK English Female') || 
          v.name.includes('Google US English') || 
          v.name.includes('Natural') || 
          v.name.includes('Samantha') || 
          (v.lang && v.lang.startsWith('en'))
        );
        if (preferredVoice) utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        this.notifySpeakingState(false);
        resolve();
      };

      utterance.onerror = (err) => {
        console.warn('SpeechSynthesis error:', err);
        this.currentUtterance = null;
        this.notifySpeakingState(false);
        resolve();
      };

      this.notifySpeakingState(true, cleanText);
      try {
        this.synth.speak(utterance);
      } catch (e) {
        console.warn('SpeechSynthesis speak call failed:', e);
        this.notifySpeakingState(false);
        resolve();
      }
    });
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
      this.notifySpeakingState(false);
    }
  }

  // Speech-to-Text (STT) with graceful fallback
  startListening(onResult, onEnd, onError) {
    if (!this.recognition) {
      this.initSpeechRecognition();
    }

    if (!this.recognition) {
      if (onError) onError(new Error('Speech recognition not supported in this browser. You can type queries directly!'));
      return false;
    }

    try {
      this.stopSpeaking();
      this.isListening = true;
      this.playAudioChime('start');
      
      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        const isFinal = event.results[event.results.length - 1].isFinal;
        if (onResult) onResult(transcript, isFinal);
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition event error:', event.error);
        this.isListening = false;
        this.playAudioChime('stop');
        if (onError) onError(event);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.playAudioChime('stop');
        if (onEnd) onEnd();
      };

      this.recognition.start();
      return true;
    } catch (e) {
      this.isListening = false;
      if (onError) onError(e);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Recognition already stopped
      }
      this.isListening = false;
      this.playAudioChime('stop');
    }
  }

  // Subscribe to voice state events
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifySpeakingState(isSpeaking, text = '') {
    this.listeners.forEach(fn => fn({ isSpeaking, text }));
  }

  // Generate Dual-Voice Podcast Sequence
  async playPodcastDialogue(script, onProgress) {
    for (let i = 0; i < script.length; i++) {
      const line = script[i];
      if (onProgress) onProgress(i, line);
      
      const pitch = line.speaker === 'Nova' ? 1.15 : 0.88;
      await this.speak(`${line.speaker} says: ${line.text}`, { pitch, rate: 1.08 });
      await new Promise(r => setTimeout(r, 400));
    }
    if (onProgress) onProgress(script.length, null);
  }
}

export const sharyxVoice = new SharyxVoiceService();
export const sharyxVoiceService = sharyxVoice;
