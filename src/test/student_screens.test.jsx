import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  Dashboard,
  AITutor,
  CourseCatalog,
  CoursePlayer,
  KnowledgeGraph,
  Assessment,
  AssessmentResults,
  Gamification,
  GoalRoadmap,
  Projects,
  Mentor,
  PeerLearning,
  Profile,
  DesignSystem
} from '../screens/student';
import { COURSES } from '../lib';
import { GroqService } from '../services/groqService';
import { sharyxVoice } from '../services/sharyxVoiceService';

describe('Student Screens & Interactive Navigation Test Suite', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Dashboard Component', () => {
    it('renders greeting, risk nudge, XP stats, and today tasks', () => {
      const onNav = vi.fn();
      render(<Dashboard onNav={onNav} />);

      expect(screen.getByText(/Good morning, Aarav/)).toBeInTheDocument();
      expect(screen.getByText(/Let's get back on track/)).toBeInTheDocument();
      expect(screen.getByText('15-min catch-up')).toBeInTheDocument();
      expect(screen.getByText('Ask tutor')).toBeInTheDocument();
      expect(screen.getByText('Database Management Systems')).toBeInTheDocument();
    });

    it('navigates when clicking risk nudge buttons and task items', () => {
      const onNav = vi.fn();
      render(<Dashboard onNav={onNav} />);

      fireEvent.click(screen.getByText('15-min catch-up'));
      expect(onNav).toHaveBeenCalledWith('assessment');

      fireEvent.click(screen.getByText('Ask tutor'));
      expect(onNav).toHaveBeenCalledWith('tutor');

      fireEvent.click(screen.getByText('Resume →'));
      expect(onNav).toHaveBeenCalledWith('course-player');
    });
  });

  describe('AITutor Component', () => {
    it('renders conversation history, active context panel, and input box', () => {
      render(<AITutor />);
      expect(screen.getByText(/Ask me anything about your DBMS course/)).toBeInTheDocument();
      expect(screen.getByText(/Explain SQL subqueries with an example/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Ask about SQL subqueries/i)).toBeInTheDocument();
    });

    it('submits a question via input textarea and displays AI reply', async () => {
      render(<AITutor />);
      const textarea = screen.getByPlaceholderText(/Ask about SQL subqueries/i);
      
      fireEvent.change(textarea, { target: { value: 'What is a database transaction?' } });
      fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('What is a database transaction?')).toBeInTheDocument();
      });
    });

    it('handles quick prompt pill clicks like "Show as diagram"', async () => {
      render(<AITutor />);
      const diagramBtn = screen.getByText('Show as diagram');
      fireEvent.click(diagramBtn);

      await waitFor(() => {
        expect(screen.getAllByText('Show as diagram').length).toBeGreaterThanOrEqual(1);
      });
    });

    it('handles voice mode launch and stop', () => {
      render(<AITutor />);
      const micBtn = screen.getByTitle('Speak with Voice');
      fireEvent.click(micBtn);

      expect(screen.getByText('Listening with Sharyx Voice…')).toBeInTheDocument();
      const endBtn = screen.getByText('End Session');
      fireEvent.click(endBtn);
    });
  });

  describe('Course Catalog & Course Player', () => {
    it('renders course list and filters between active and not started', () => {
      const onEnter = vi.fn();
      render(<CourseCatalog onEnter={onEnter} />);

      expect(screen.getByText('My Courses')).toBeInTheDocument();
      expect(screen.getByText('Continue Learning')).toBeInTheDocument();
      
      const filterBtn = screen.getByText('Not Started');
      fireEvent.click(filterBtn);
      expect(screen.getByText('DSA for Placements')).toBeInTheDocument();
    });

    it('CoursePlayer executes SQL query in sandbox and toggles complete', () => {
      const onBack = vi.fn();
      render(<CoursePlayer course={COURSES[0]} onBack={onBack} />);

      expect(screen.getByText('SQL Subqueries')).toBeInTheDocument();
      expect(screen.getByText('Try it — SQL Sandbox')).toBeInTheDocument();

      const runBtn = screen.getByText('Run');
      fireEvent.click(runBtn);
      expect(screen.getByText(/Query executed in 1.4ms/)).toBeInTheDocument();

      const markBtn = screen.getByText('Mark Complete →');
      fireEvent.click(markBtn);
      expect(screen.getByText('✓ Completed')).toBeInTheDocument();
    });
  });

  describe('Knowledge Graph Component', () => {
    it('renders topic nodes and responds to node selection and auto-remediate', () => {
      const onNav = vi.fn();
      render(<KnowledgeGraph onNav={onNav} />);

      expect(screen.getByText('DBMS · SQL')).toBeInTheDocument();
      expect(screen.getByText('Weakness Detected')).toBeInTheDocument();

      const remediateBtn = screen.getByText('Auto-remediate →');
      fireEvent.click(remediateBtn);
      expect(onNav).toHaveBeenCalledWith('assessment-results');

      const startCourseBtn = screen.getByText('Start Remedial Course');
      fireEvent.click(startCourseBtn);
      expect(onNav).toHaveBeenCalledWith('course-player');
    });
  });

  describe('Assessment & Results Components', () => {
    it('Assessment allows selecting MCQ options and stepping through questions', () => {
      const onNav = vi.fn();
      render(<Assessment onNav={onNav} />);

      expect(screen.getByText(/Assessment · SQL Subqueries/)).toBeInTheDocument();
      expect(screen.getByText('Q1 of 5')).toBeInTheDocument();

      // Show Socratic hint
      const hintBtn = screen.getByText(/Need a hint/);
      fireEvent.click(hintBtn);
      expect(screen.getByText('🔮 Socratic Hint')).toBeInTheDocument();

      // Step next
      const nextBtn = screen.getByText('Next →');
      fireEvent.click(nextBtn);
      expect(screen.getByText('Q2 of 5')).toBeInTheDocument();
    });

    it('AssessmentResults toggles question review and navigates to recovery course', () => {
      const onNav = vi.fn();
      render(<AssessmentResults onNav={onNav} />);

      expect(screen.getByText(/Good — let's close the gaps/)).toBeInTheDocument();
      expect(screen.getByText('Concept Breakdown')).toBeInTheDocument();

      const reviewBtn = screen.getByText('Review Answers');
      fireEvent.click(reviewBtn);
      expect(screen.getByText('Question Review')).toBeInTheDocument();

      const startRemedialBtn = screen.getByText('Start Remedial Course →');
      fireEvent.click(startRemedialBtn);
      expect(onNav).toHaveBeenCalledWith('course-player');
    });
  });

  describe('Goal Roadmap, Projects, Mentor & Peer Learning', () => {
    it('GoalRoadmap expands phase milestones and navigates', () => {
      const onNav = vi.fn();
      render(<GoalRoadmap onNav={onNav} />);

      expect(screen.getByText('Become an AI Engineer')).toBeInTheDocument();
      expect(screen.getByText('Continue Learning →')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Continue Learning →'));
      expect(onNav).toHaveBeenCalledWith('course-player');
    });

    it('Projects supports requesting AI Review and updating rubric score', async () => {
      render(<Projects />);
      expect(screen.getByText('Build a Movie Recommender')).toBeInTheDocument();
      expect(screen.getByText('Current score: 47 / 100')).toBeInTheDocument();

      const reviewBtn = screen.getByText('Request AI Review');
      fireEvent.click(reviewBtn);

      await waitFor(() => {
        expect(screen.getByText(/AI Review Complete/)).toBeInTheDocument();
        expect(screen.getByText('Current score: 88 / 100')).toBeInTheDocument();
      });
    });

    it('Mentor renders weekly insights and starts recommended session', () => {
      const onNav = vi.fn();
      render(<Mentor onNav={onNav} />);

      expect(screen.getByText("This Week's Insights")).toBeInTheDocument();
      const startBtn = screen.getByText("Start Tonight's Recommended Session →");
      fireEvent.click(startBtn);
      expect(onNav).toHaveBeenCalledWith('course-player');
    });

    it('PeerLearning supports toggling active challenge session', () => {
      render(<PeerLearning />);
      expect(screen.getByText('AI Builders — Coimbatore')).toBeInTheDocument();
      
      const joinBtn = screen.getByText('Join Session →');
      fireEvent.click(joinBtn);
      expect(screen.getByText('✓ In Active Session (Leave)')).toBeInTheDocument();
    });

    it('Profile and DesignSystem render without error', () => {
      render(<Profile />);
      expect(screen.getByText('Aarav Sharma')).toBeInTheDocument();
      expect(screen.getByText('Learning Profile')).toBeInTheDocument();

      render(<DesignSystem />);
      expect(screen.getByText('Design System · Foundations')).toBeInTheDocument();
    });
  });

  describe('GroqService & Sharyx Voice Integration', () => {
    it('generates adaptive assessment questions', async () => {
      const questions = await GroqService.generateQuestions('DBMS & SQL', 5, 'Intermediate');
      expect(questions.length).toBe(5);
      expect(questions[0].question).toBeDefined();
      expect(questions[0].options.length).toBe(4);
      expect(questions[0].correctIndex).toBeDefined();
    });

    it('generates rich domain-specific Socratic responses for various queries', async () => {
      const diagramReply = await GroqService.getSocraticResponse([], 'Show as diagram for subqueries');
      expect(diagramReply).toContain('Outer Query');

      const simplerReply = await GroqService.getSocraticResponse([], 'Explain simpler with analogy');
      expect(simplerReply).toContain('Imagine');

      const joinReply = await GroqService.getSocraticResponse([], 'Explain SQL JOIN types');
      expect(joinReply).toContain('INNER JOIN');
    });

    it('speaks text via speakText alias', () => {
      const speakSpy = vi.spyOn(sharyxVoice, 'speak').mockReturnValue(Promise.resolve());
      sharyxVoice.speakText('Testing speech synthesis output');
      expect(speakSpy).toHaveBeenCalledWith('Testing speech synthesis output', {});
    });
  });

});
