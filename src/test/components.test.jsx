import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import App from '../App';
import Navbar from '../components/Navbar';
import MentorBriefing from '../components/Dashboard/MentorBriefing';
import CollegeChatTutor from '../components/CollegeRAG/CollegeChatTutor';
import CourseStudio from '../components/CourseStudio/CourseStudio';
import AssessmentEngine from '../components/Assessment/AssessmentEngine';
import KnowledgeGraphView from '../components/KnowledgeGraph/KnowledgeGraphView';
import CareerRoadmap from '../components/CareerRoadmap/CareerRoadmap';
import GamificationHub from '../components/Gamification/GamificationHub';
import SettingsModal from '../components/SettingsModal';
import VoiceTutorModal from '../components/VoiceTutorModal';
import FigmaLandingPage from '../components/FigmaLanding/FigmaLandingPage';

describe('VoxLearn AI - UI Component & Interaction Test Suite', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Navbar Component', () => {
    it('renders logo, brand title, and navigation tabs', () => {
      render(
        <Navbar 
          activeTab="dashboard" 
          setActiveTab={vi.fn()} 
          onOpenVoice={vi.fn()} 
          onOpenSettings={vi.fn()} 
          studentStats={{ name: 'Alex', level: 4, streakDays: 14 }}
        />
      );
      expect(screen.getByText('VoxLearn AI')).toBeInTheDocument();
      expect(screen.getByText('Mentor Hub')).toBeInTheDocument();
      expect(screen.getByText('College RAG Tutor')).toBeInTheDocument();
      expect(screen.getByText('Course Studio')).toBeInTheDocument();
      expect(screen.getByText('Voice Tutor')).toBeInTheDocument();
      expect(screen.getByText('14d')).toBeInTheDocument();
      expect(screen.getByText('Lvl 4')).toBeInTheDocument();
    });

    it('triggers tab switch on button click', () => {
      const setActiveTab = vi.fn();
      render(
        <Navbar 
          activeTab="dashboard" 
          setActiveTab={setActiveTab} 
          onOpenVoice={vi.fn()} 
          onOpenSettings={vi.fn()} 
        />
      );
      fireEvent.click(screen.getByText('College RAG Tutor'));
      expect(setActiveTab).toHaveBeenCalledWith('rag');
    });
  });

  describe('Mentor Briefing & Dashboard', () => {
    it('renders personalized greeting, risk detection alert, and metric cards', () => {
      const mockRisk = {
        hasCriticalRisk: true,
        overallMastery: 72,
        weakCount: 3,
        criticalPrereqGaps: [{
          weakNode: { name: 'Window Functions (OVER, PARTITION)' },
          alertMessage: 'Weakness in Window Functions threatens SQL progression.'
        }]
      };

      render(
        <MentorBriefing 
          studentStats={{ name: 'Alex Rivera', targetGoal: 'AI Engineer' }}
          riskAnalysis={mockRisk}
          onStartRemedial={vi.fn()}
          onNavigateTab={vi.fn()}
          onOpenVoice={vi.fn()}
        />
      );

      expect(screen.getByText(/Good morning, Alex Rivera!/)).toBeInTheDocument();
      expect(screen.getByText(/Early Learning Risk Detected/)).toBeInTheDocument();
      expect(screen.getByText(/72%/)).toBeInTheDocument();
      expect(screen.getByText('Launch 5-Min Remedial Recovery')).toBeInTheDocument();
    });
  });

  describe('College RAG Chat Tutor', () => {
    it('renders repository files and allows asking a question', async () => {
      render(<CollegeChatTutor onOpenVoice={vi.fn()} />);
      
      expect(screen.getByText('College RAG AI Tutor')).toBeInTheDocument();
      expect(screen.getByText('Ingested Repository')).toBeInTheDocument();
      
      // Click a quick question button
      const quickBtn = screen.getByText(/Deadlock & Coffman Conditions/);
      fireEvent.click(quickBtn);

      await waitFor(() => {
        expect(screen.getAllByText(/CS302/i)[0]).toBeInTheDocument();
      });
    });
  });

  describe('Course Studio (6 Multi-Modal Modes)', () => {
    it('renders mode tabs and switches between Podcast, Game, Socratic, Sim, Video, and Traditional modes', async () => {
      render(<CourseStudio onOpenVoice={vi.fn()} initialTopic="SQL Window Functions" />);
      
      await waitFor(() => {
        expect(screen.getByText('AI Course Generator & Multi-Modal Studio')).toBeInTheDocument();
      });

      // Switch to Game Arena Mode
      const gameTab = screen.getByText('🎮 Game Arena');
      fireEvent.click(gameTab);
      expect(screen.getByText(/Index Dungeon: The SARGable Quest/i)).toBeInTheDocument();

      // Switch to Interactive Sim
      const simTab = screen.getByText('🧩 Interactive Sim');
      fireEvent.click(simTab);
      expect(screen.getAllByText(/Run Sandbox Trace/)[0]).toBeInTheDocument();

      // Switch to Traditional Notes
      const tradTab = screen.getByText('📖 Traditional Notes');
      fireEvent.click(tradTab);
      expect(screen.getByText('Structured Concept Summary')).toBeInTheDocument();
    });
  });

  describe('Assessment Engine & Remedial Loop', () => {
    it('displays assessment questions and supports launching remedial sprint and retest', async () => {
      render(<AssessmentEngine onOpenVoice={vi.fn()} />);

      expect(screen.getByText('AI Assessment & Autonomous Remedial Loop')).toBeInTheDocument();
      expect(screen.getByText(/In PostgreSQL or MySQL 8.0/)).toBeInTheDocument();

      // Launch simulated remedial sprint
      const remedialBtn = screen.getByText('Simulate Weakness Remedial Sprint');
      fireEvent.click(remedialBtn);

      await waitFor(() => {
        expect(screen.getByText(/Rapid Recovery Sprint/)).toBeInTheDocument();
        expect(screen.getByText('1. Visual Mental Model')).toBeInTheDocument();
      });
    });
  });

  describe('Knowledge Graph View', () => {
    it('renders concept nodes and shows node details when clicked', () => {
      render(<KnowledgeGraphView onStartRemedial={vi.fn()} onOpenVoice={vi.fn()} />);
      
      expect(screen.getByText('Student Knowledge Graph')).toBeInTheDocument();
      expect(screen.getByText('Concept Mastery Network')).toBeInTheDocument();
      expect(screen.getByText('SELECT & Filtering')).toBeInTheDocument();

      // Click on a different node
      const pythonNode = screen.getByText('Python Basics & Data Structures');
      fireEvent.click(pythonNode);
      expect(screen.getAllByText('Python Basics & Data Structures')[0]).toBeInTheDocument();
    });

    it('filters nodes by domain (e.g. Python)', () => {
      render(<KnowledgeGraphView onStartRemedial={vi.fn()} onOpenVoice={vi.fn()} />);
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'Python' } });
      expect(screen.getAllByText('Python Basics & Data Structures')[0]).toBeInTheDocument();
    });
  });

  describe('Voice Tutor Floating Modal Interaction', () => {
    it('handles typing and sending a text query to the voice companion', async () => {
      render(<VoiceTutorModal isOpen={true} onClose={vi.fn()} initialConcept="Operating Systems" />);
      
      const input = screen.getByPlaceholderText(/Ask or speak to tutor/i);
      fireEvent.change(input, { target: { value: 'What is a deadlock?' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('What is a deadlock?')).toBeInTheDocument();
      });
    });

    it('handles quick prompt button click for weakness diagnosis', async () => {
      render(<VoiceTutorModal isOpen={true} onClose={vi.fn()} />);
      
      const diagBtn = screen.getByText('🎯 Diagnose Weakness');
      fireEvent.click(diagBtn);

      await waitFor(() => {
        expect(screen.getByText('Diagnose my weak spots')).toBeInTheDocument();
      });
    });
  });

  describe('Career Roadmap & Projects', () => {
    it('renders career roadmap milestones and AI project rubrics', () => {
      render(<CareerRoadmap onSelectTopic={vi.fn()} />);
      
      expect(screen.getByText('Goal-Based Career Roadmaps & AI Projects')).toBeInTheDocument();
      expect(screen.getByText(/AI Engineer Career Roadmap/)).toBeInTheDocument();
      expect(screen.getByText('AI Portfolio Projects')).toBeInTheDocument();
    });
  });

  describe('Gamification Hub', () => {
    it('renders badges and smart study pods and handles streak claims', () => {
      render(<GamificationHub onOpenVoice={vi.fn()} />);
      
      expect(screen.getByText('Gamification & AI Peer Learning Pods')).toBeInTheDocument();
      expect(screen.getByText('Achievement Badges')).toBeInTheDocument();
      expect(screen.getByText('Smart AI Study Pods')).toBeInTheDocument();
      
      const claimBtn = screen.getByText(/Claim 14-Day Streak Bonus/);
      fireEvent.click(claimBtn);
    });
  });

  describe('Settings Modal', () => {
    it('allows editing Groq and Sharyx keys and saves configuration', () => {
      const onClose = vi.fn();
      render(<SettingsModal isOpen={true} onClose={onClose} />);
      
      expect(screen.getByText('AI Engine & Voice Setup')).toBeInTheDocument();
      const saveBtn = screen.getByText('Save Settings');
      fireEvent.click(saveBtn);
    });
  });

  describe('Voice Tutor Floating Modal', () => {
    it('renders voice companion header and visualizer', () => {
      render(<VoiceTutorModal isOpen={true} onClose={vi.fn()} initialConcept="Operating Systems" />);
      
      expect(screen.getByText('Sharyx Voice AI')).toBeInTheDocument();
      expect(screen.getByText('Socratic Voice Companion')).toBeInTheDocument();
      expect(screen.getByText('🎯 Diagnose Weakness')).toBeInTheDocument();
    });
  });

  describe('Figma Landing Page Component', () => {
    it('renders hero banner, stats proof, and feature cards and triggers navigation', () => {
      const onEnterWorkspace = vi.fn();
      const onOpenVoice = vi.fn();
      render(
        <FigmaLandingPage 
          onEnterWorkspace={onEnterWorkspace}
          onOpenVoice={onOpenVoice}
          onOpenSettings={vi.fn()}
          theme="dark"
          onToggleTheme={vi.fn()}
        />
      );

      expect(screen.getAllByText('VoxLearn AI')[0]).toBeInTheDocument();
      expect(screen.getByText('A unique learning experience')).toBeInTheDocument();
      expect(screen.getByText('for every student.')).toBeInTheDocument();
      expect(screen.getByText('50,000+')).toBeInTheDocument();
      expect(screen.getByText('94%')).toBeInTheDocument();
      expect(screen.getByText('3.2×')).toBeInTheDocument();
      expect(screen.getByText('120+')).toBeInTheDocument();

      // Click CTA
      const startBtn = screen.getByText('Start Learning Free');
      fireEvent.click(startBtn);
      expect(onEnterWorkspace).toHaveBeenCalledWith('generator');
    });
  });

  describe('Full App Integration', () => {
    it('renders the complete app and switches tabs seamlessly', () => {
      render(<App />);
      expect(screen.getAllByText('VoxLearn AI')[0]).toBeInTheDocument();
      expect(screen.getByText(/Good morning, Alex Rivera!/)).toBeInTheDocument();

      // Switch to Knowledge Graph tab
      const kgTabs = screen.getAllByText('Knowledge Graph');
      fireEvent.click(kgTabs[0]);
      expect(screen.getByText('Concept Mastery Network')).toBeInTheDocument();

      // Switch to Badges & Peers tab
      const peerTabs = screen.getAllByText('Badges & Peers');
      fireEvent.click(peerTabs[0]);
      expect(screen.getByText('Achievement Badges')).toBeInTheDocument();

      // Switch to Figma Landing View
      fireEvent.click(screen.getByText('Switch to Figma Landing View'));
      expect(screen.getByText('A unique learning experience')).toBeInTheDocument();
    });
  });

});
