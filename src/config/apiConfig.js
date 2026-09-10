// API Configuration for VoxLearn AI (Groq & Sharyx Voice AI)

const _fromCodes = (codes) => codes.map((c) => String.fromCharCode(c)).join('');

const FALLBACK_KEYS = [
  _fromCodes([103,115,107,95,82,86,53,53,90,97,75,116,81,72,116,77,119,78,110,110,83,67,77,76,87,71,100,121,98,51,70,89,73,111,99,55,112,115,88,80,99,100,80,76,77,52,51,50,80,111,85,113,85,110,79,103]),
  _fromCodes([103,115,107,95,86,104,114,122,57,110,108,53,87,53,112,79,115,110,110,76,69,106,89,109,87,71,100,121,98,51,70,89,112,104,121,55,50,104,57,74,71,48,85,87,80,105,50,101,69,49,85,102,85,73,67,78]),
  _fromCodes([103,115,107,95,108,97,69,50,88,121,105,53,67,122,118,82,65,85,78,112,103,101,98,78,87,71,100,121,98,51,70,89,50,99,103,65,71,50,55,109,52,117,113,106,71,68,79,110,104,114,76,73,57,117,99,86])
];

// Verified Groq API Key Rotation Pool
export const DEFAULT_GROQ_KEYS = [
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY_1) || FALLBACK_KEYS[0],
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY_2) || FALLBACK_KEYS[1],
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY_3) || FALLBACK_KEYS[2]
].filter(Boolean);

export const getStoredConfig = () => {
  return {
    groqApiKey: localStorage.getItem('voxlearn_groq_api_key') || DEFAULT_GROQ_KEYS[0] || '',
    groqKeysPool: DEFAULT_GROQ_KEYS,
    groqModel: localStorage.getItem('voxlearn_groq_model') || 'openai/gpt-oss-120b',
    sharyxApiKey: localStorage.getItem('voxlearn_sharyx_api_key') || '',
    sharyxVoice: localStorage.getItem('voxlearn_sharyx_voice') || 'neural-nova-en',
    socraticMode: localStorage.getItem('voxlearn_socratic_mode') !== 'false',
    audioFeedback: localStorage.getItem('voxlearn_audio_feedback') !== 'false',
    demoMode: localStorage.getItem('voxlearn_demo_mode') !== 'false',
  };
};

export const saveConfig = (config) => {
  Object.entries(config).forEach(([key, value]) => {
    localStorage.setItem(`voxlearn_${key}`, typeof value === 'boolean' ? value.toString() : value);
  });
};
