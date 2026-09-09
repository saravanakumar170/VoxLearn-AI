// API Configuration for VoxLearn AI (Groq & Sharyx Voice AI)

export const getStoredConfig = () => {
  return {
    groqApiKey: localStorage.getItem('voxlearn_groq_api_key') || '',
    groqModel: localStorage.getItem('voxlearn_groq_model') || 'llama-3.3-70b-versatile',
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
