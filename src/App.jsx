import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SettingsModal from './components/SettingsModal';
import VoiceTutorModal from './components/VoiceTutorModal';
import FigmaLandingPage from './components/FigmaLanding/FigmaLandingPage';
import MentorBriefing from './components/Dashboard/MentorBriefing';
import CollegeChatTutor from './components/CollegeRAG/CollegeChatTutor';
import CourseStudio from './components/CourseStudio/CourseStudio';
import AssessmentEngine from './components/Assessment/AssessmentEngine';
import CareerRoadmap from './components/CareerRoadmap/CareerRoadmap';
import KnowledgeGraphView from './components/KnowledgeGraph/KnowledgeGraphView';
import GamificationHub from './components/Gamification/GamificationHub';
import { memoryStore } from './services/memoryStore';
import { Sparkles, ArrowLeft, Layers } from 'lucide-react';

export default function App() {
  // View mode: 'landing' (Exact Figma prototype) or 'workspace' (Interactive multi-agent app)
  const [viewMode, setViewMode] = useState('workspace');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [storeState, setStoreState] = useState(memoryStore.getState());
  const [activeVoiceConcept, setActiveVoiceConcept] = useState('');
  const [targetStudioTopic, setTargetStudioTopic] = useState('');
  
  // Theme State: 'dark' or 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('voxlearn_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('voxlearn_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const unsub = memoryStore.subscribe((newState) => {
      setStoreState({ ...newState });
    });
    return () => unsub();
  }, []);

  const riskAnalysis = memoryStore.getRiskAnalysis();

  const handleStartRemedialFromAnywhere = (conceptName) => {
    setViewMode('workspace');
    setActiveTab('assessment');
  };

  const handleLaunchTopicInStudio = (topic) => {
    setTargetStudioTopic(topic);
    setViewMode('workspace');
    setActiveTab('generator');
  };

  const handleOpenVoiceWithConcept = (concept) => {
    setActiveVoiceConcept(concept || '');
    setIsVoiceOpen(true);
  };

  const handleEnterWorkspaceWithTab = (tab) => {
    setActiveTab(tab || 'dashboard');
    setViewMode('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is on Figma Landing Prototype view
  if (viewMode === 'landing') {
    return (
      <>
        <FigmaLandingPage 
          onEnterWorkspace={handleEnterWorkspaceWithTab}
          onOpenVoice={() => handleOpenVoiceWithConcept('Introduction to Voice-Enabled Learning')}
          onOpenSettings={() => setIsSettingsOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Floating Sharyx Voice Companion Modal */}
        <VoiceTutorModal 
          isOpen={isVoiceOpen}
          onClose={() => setIsVoiceOpen(false)}
          initialConcept={activeVoiceConcept}
        />

        {/* API & Configuration Modal */}
        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </>
    );
  }

  // Otherwise, live multi-agent workspace
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      
      {/* Top Banner with Figma Prototype Switcher */}
      <div style={{
        background: 'rgba(99, 91, 255, 0.08)',
        borderBottom: '1px solid rgba(99, 91, 255, 0.15)',
        padding: '0.4rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-brand" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
            Interactive Workspace Mode
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>
            All 20 multi-agent AI features active
          </span>
        </div>

        <button
          onClick={() => setViewMode('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '999px',
            padding: '0.25rem 0.75rem',
            fontSize: '0.74rem',
            fontWeight: 700,
            color: 'var(--accent-primary)',
            cursor: 'pointer'
          }}
        >
          <Layers size={13} />
          <span>Switch to Figma Landing View</span>
        </button>
      </div>

      {/* Top Navigation Bar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenVoice={() => handleOpenVoiceWithConcept('')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        studentStats={storeState.student}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <div className="container">
          
          {activeTab === 'dashboard' && (
            <MentorBriefing 
              studentStats={storeState.student}
              riskAnalysis={riskAnalysis}
              onStartRemedial={handleStartRemedialFromAnywhere}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenVoice={() => handleOpenVoiceWithConcept('Morning Review & Risk Assessment')}
            />
          )}

          {activeTab === 'rag' && (
            <CollegeChatTutor 
              onOpenVoice={() => handleOpenVoiceWithConcept('College Operating Systems Doubt')}
            />
          )}

          {activeTab === 'generator' && (
            <CourseStudio 
              initialTopic={targetStudioTopic}
              onOpenVoice={() => handleOpenVoiceWithConcept('Current Course Concept')}
            />
          )}

          {activeTab === 'assessment' && (
            <AssessmentEngine 
              onOpenVoice={() => handleOpenVoiceWithConcept('Assessment Review & Socratic Drill')}
            />
          )}

          {activeTab === 'roadmap' && (
            <CareerRoadmap 
              onSelectTopic={handleLaunchTopicInStudio}
            />
          )}

          {activeTab === 'knowledge' && (
            <KnowledgeGraphView 
              onStartRemedial={handleStartRemedialFromAnywhere}
              onOpenVoice={() => handleOpenVoiceWithConcept('Knowledge Graph Exploration')}
            />
          )}

          {activeTab === 'gamification' && (
            <GamificationHub 
              onOpenVoice={() => handleOpenVoiceWithConcept('Study Pod Collaboration')}
            />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '1.25rem 0',
        background: 'var(--bg-card)',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <Sparkles size={16} color="var(--accent-primary)" />
            <span><strong>VoxLearn AI</strong> — Autonomous Voice-Enabled Learning Ecosystem</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Sharyx Voice AI & Groq Inference Engine • 20 Unified Hackathon Innovations
          </p>
        </div>
      </footer>

      {/* Floating Sharyx Voice Companion Modal */}
      <VoiceTutorModal 
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        initialConcept={activeVoiceConcept}
      />

      {/* API & Configuration Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

    </div>
  );
}
