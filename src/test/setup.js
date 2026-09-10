if (typeof globalThis.webidl === 'undefined') {
  globalThis.webidl = { util: { markAsUncloneable: () => {} } };
} else if (!globalThis.webidl.util) {
  globalThis.webidl.util = { markAsUncloneable: () => {} };
} else if (!globalThis.webidl.util.markAsUncloneable) {
  globalThis.webidl.util.markAsUncloneable = () => {};
}

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => {
  return {
    default: vi.fn(),
  };
});

// Mock HTMLElement.prototype.scrollIntoView safely
if (typeof window !== 'undefined' && window.HTMLElement) {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
}

// Mock SpeechSynthesis
if (typeof window !== 'undefined') {
  window.speechSynthesis = {
    speak: vi.fn((utterance) => {
      // Immediately invoke onend to simulate completion in test
      setTimeout(() => {
        if (utterance && utterance.onend) utterance.onend();
      }, 10);
    }),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn(() => [
      { name: 'Google UK English Female', lang: 'en-GB' },
      { name: 'Samantha', lang: 'en-US' },
    ]),
  };

  // Mock SpeechSynthesisUtterance
  window.SpeechSynthesisUtterance = class {
    constructor(text) {
      this.text = text;
      this.rate = 1;
      this.pitch = 1;
      this.voice = null;
      this.onend = null;
      this.onerror = null;
    }
  };

  // Mock SpeechRecognition
  window.SpeechRecognition = class {
    constructor() {
      this.continuous = false;
      this.interimResults = false;
      this.lang = 'en-US';
      this.onresult = null;
      this.onerror = null;
      this.onend = null;
    }
    start() {}
    stop() {}
  };
  window.webkitSpeechRecognition = window.SpeechRecognition;
}
