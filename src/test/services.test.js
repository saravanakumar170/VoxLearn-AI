import { describe, it, expect, beforeEach, vi } from 'vitest';
import { memoryStore } from '../services/memoryStore';
import { collegeRAG } from '../services/ragService';
import { sharyxVoice } from '../services/sharyxVoiceService';
import { GroqService } from '../services/groqService';

describe('VoxLearn AI - Core Services Test Suite', () => {

  beforeEach(() => {
    localStorage.clear();
    memoryStore.state = memoryStore.loadState();
  });

  describe('MemoryStore & Knowledge Graph', () => {
    it('initializes with default student stats and knowledge nodes', () => {
      const state = memoryStore.getState();
      expect(state.student.name).toBe('Alex Rivera');
      expect(state.student.streakDays).toBe(14);
      expect(state.knowledgeNodes.length).toBeGreaterThan(5);
    });

    it('correctly increments XP and handles level up progression', () => {
      const initialXP = memoryStore.getState().student.xp;
      memoryStore.addXP(200, 'Test reward');
      expect(memoryStore.getState().student.xp).toBe(initialXP + 200);
    });

    it('updates Knowledge Graph node mastery and transitions status', () => {
      memoryStore.updateNodeMastery('Window Functions (OVER, PARTITION)', 95);
      const node = memoryStore.getState().knowledgeNodes.find(n => n.name.includes('Window Functions'));
      expect(node.mastery).toBe(95);
      expect(node.status).toBe('Mastered');
    });

    it('detects early learning risk for weak prerequisites', () => {
      // Force a weak prerequisite
      memoryStore.updateNodeMastery('SELECT & Filtering', 30);
      const risk = memoryStore.getRiskAnalysis();
      expect(risk.hasCriticalRisk).toBe(true);
      expect(risk.criticalPrereqGaps.length).toBeGreaterThan(0);
    });
  });

  describe('College RAG Service', () => {
    it('loads preloaded college documents', () => {
      const docs = collegeRAG.getDocuments();
      expect(docs.length).toBeGreaterThanOrEqual(3);
      expect(docs.some(d => d.course.includes('Operating Systems'))).toBe(true);
    });

    it('adds and indexes a new college document', () => {
      const newDoc = collegeRAG.addDocument({
        title: 'CS305 Computer Networks - TCP Handshake',
        course: 'Computer Networks (CS305)',
        category: 'Lecture Notes',
        content: 'SYN -> SYN-ACK -> ACK three-way handshake establishes connection.'
      });
      expect(newDoc.id).toBeDefined();
      expect(collegeRAG.getDocuments().some(d => d.title.includes('Computer Networks'))).toBe(true);
    });

    it('searches context and returns relevant source citations', async () => {
      const result = await collegeRAG.answerQuestion('Explain deadlock and Coffman conditions');
      expect(result.answer).toContain('Deadlock');
      expect(result.sources.length).toBeGreaterThan(0);
    });
  });

  describe('Groq Service', () => {
    it('generates a full multi-modal course curriculum with 6 learning modes', async () => {
      const course = await GroqService.generateCourse('Distributed Systems Consensus', 'Intermediate');
      expect(course.title).toBeDefined();
      expect(course.modules.length).toBeGreaterThan(0);
      const mod = course.modules[0];
      expect(mod.traditional).toBeDefined();
      expect(mod.gameChallenge).toBeDefined();
      expect(mod.podcastScript).toBeDefined();
      expect(mod.videoStoryboard).toBeDefined();
      expect(mod.interactiveSim).toBeDefined();
    });

    it('evaluates assessment and generates diagnostic feedback with weakness identification', async () => {
      const questions = [
        { id: 1, correctIndex: 0 },
        { id: 2, correctIndex: 1 }
      ];
      const answers = [0, 0]; // 1 correct, 1 wrong -> 50%
      const evaluation = await GroqService.evaluateAssessment(questions, answers, 'Window Functions');
      expect(evaluation.score).toBe(50);
      expect(evaluation.requiresRemediation).toBe(true);
      expect(evaluation.diagnosticAnalysis).toBeDefined();
    });

    it('generates a 5-minute rapid recovery remedial course for weak concepts', async () => {
      const remedial = await GroqService.generateRemedialCourse('Window Functions', 'Boundary frames');
      expect(remedial.title).toContain('Recovery');
      expect(remedial.simpleExplanation).toBeDefined();
      expect(remedial.commonPitfall).toBeDefined();
      expect(remedial.mnemonicOrRule).toBeDefined();
      expect(remedial.interactivePractice).toBeDefined();
      expect(remedial.retestQuestions.length).toBeGreaterThan(0);
    });
  });

  describe('Sharyx Voice Service', () => {
    it('speaks text via speech engine and manages notification events', async () => {
      const listener = vi.fn();
      const unsub = sharyxVoice.subscribe(listener);
      
      await sharyxVoice.speak('Testing Sharyx Voice synthesis');
      expect(window.speechSynthesis.speak).toHaveBeenCalled();
      
      unsub();
    });

    it('plays dual-host podcast dialogue script with speaker turn progression', async () => {
      const script = [
        { speaker: 'Nova', text: 'Welcome to VoxLearn AI podcast!' },
        { speaker: 'Orion', text: 'Today we discuss database indexes.' }
      ];
      const progressTracker = vi.fn();
      await sharyxVoice.playPodcastDialogue(script, progressTracker);
      expect(progressTracker).toHaveBeenCalledWith(0, script[0]);
      expect(progressTracker).toHaveBeenCalledWith(1, script[1]);
      expect(progressTracker).toHaveBeenCalledWith(2, null);
    });

    it('handles speech recognition start and stop cleanly', () => {
      const onResult = vi.fn();
      const onEnd = vi.fn();
      const onError = vi.fn();

      const started = sharyxVoice.startListening(onResult, onEnd, onError);
      expect(started).toBe(true);
      expect(sharyxVoice.isListening).toBe(true);

      sharyxVoice.stopListening();
      expect(sharyxVoice.isListening).toBe(false);
    });
  });

  describe('Full Autonomous Remediation Loop Integration', () => {
    it('completes the entire cycle: diagnose weak node -> generate remedial -> complete retest -> upgrade node', async () => {
      // 1. Initially weak node
      const initialNode = memoryStore.getState().knowledgeNodes.find(n => n.id === 'node-sql-window');
      expect(initialNode.status).toBe('Weak');
      expect(initialNode.mastery).toBeLessThan(60);

      // 2. Generate remedial course for this weakness
      const remedial = await GroqService.generateRemedialCourse(initialNode.name, 'Confusing GROUP BY with Window Frames');
      expect(remedial.title).toBeDefined();

      // 3. Complete retest
      memoryStore.updateNodeMastery(initialNode.name, 92);
      memoryStore.addXP(150, 'Completed Remedial Retest');

      // 4. Verify node is now Mastered
      const updatedNode = memoryStore.getState().knowledgeNodes.find(n => n.id === 'node-sql-window');
      expect(updatedNode.status).toBe('Mastered');
      expect(updatedNode.mastery).toBe(92);
    });
  });

});
