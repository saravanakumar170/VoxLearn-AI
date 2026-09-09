// Student Learning Memory & Knowledge Graph State Store for VoxLearn AI

const DEFAULT_KNOWLEDGE_NODES = [
  { id: 'node-sql-select', domain: 'Database', name: 'SELECT & Filtering', mastery: 94, status: 'Mastered', prerequisites: [] },
  { id: 'node-sql-joins', domain: 'Database', name: 'JOIN Operations (Inner, Outer)', mastery: 86, status: 'Mastered', prerequisites: ['node-sql-select'] },
  { id: 'node-sql-groupby', domain: 'Database', name: 'GROUP BY & Aggregations', mastery: 78, status: 'Medium', prerequisites: ['node-sql-select'] },
  { id: 'node-sql-subqueries', domain: 'Database', name: 'Correlated Subqueries', mastery: 44, status: 'Weak', prerequisites: ['node-sql-joins', 'node-sql-groupby'] },
  { id: 'node-sql-window', domain: 'Database', name: 'Window Functions (OVER, PARTITION)', mastery: 28, status: 'Weak', prerequisites: ['node-sql-groupby'] },
  { id: 'node-py-syntax', domain: 'Python', name: 'Python Basics & Data Structures', mastery: 92, status: 'Mastered', prerequisites: [] },
  { id: 'node-py-recursion', domain: 'Python', name: 'Recursion & Call Stack Dynamics', mastery: 52, status: 'Weak', prerequisites: ['node-py-syntax'] },
  { id: 'node-py-oop', domain: 'Python', name: 'Object-Oriented Design & Dunder', mastery: 74, status: 'Medium', prerequisites: ['node-py-syntax'] },
  { id: 'node-ml-math', domain: 'Machine Learning', name: 'Linear Algebra & Calculus Basics', mastery: 82, status: 'Mastered', prerequisites: [] },
  { id: 'node-ml-regression', domain: 'Machine Learning', name: 'Linear & Logistic Regression', mastery: 76, status: 'Medium', prerequisites: ['node-ml-math', 'node-py-syntax'] },
  { id: 'node-ml-eval', domain: 'Machine Learning', name: 'Bias-Variance & Overfitting', mastery: 68, status: 'Medium', prerequisites: ['node-ml-regression'] },
  { id: 'node-ml-nn', domain: 'Machine Learning', name: 'Neural Networks & Backprop', mastery: 35, status: 'Weak', prerequisites: ['node-ml-eval'] },
];

const DEFAULT_BADGES = [
  { id: 'b1', name: 'Voice Explorer', desc: 'Completed 5 voice tutoring sessions with Sharyx Voice AI', icon: '🎙️', unlocked: true, unlockedAt: '2026-03-05' },
  { id: 'b2', name: 'Autonomous Learner', desc: 'Generated and completed an AI-custom course', icon: '⚡', unlocked: true, unlockedAt: '2026-03-07' },
  { id: 'b3', name: 'Weakness Conqueror', desc: 'Converted a Red Weakness node into Green Mastery via Remedial Sprint', icon: '🛡️', unlocked: false },
  { id: 'b4', name: 'Socratic Thinker', desc: 'Answered 10 guided reasoning questions without direct hints', icon: '🦉', unlocked: true, unlockedAt: '2026-03-08' },
  { id: 'b5', name: 'Polymath Champion', desc: 'Achieved >80% mastery across 3 distinct domains', icon: '👑', unlocked: false },
];

const DEFAULT_PEER_GROUPS = [
  { id: 'peer-1', name: 'AI Engineering Sprint Pod', members: 4, goal: 'Mastering LLMs & RAG', avgMastery: '78%', activeChallenge: 'Build a Vector Memory Search Engine', myRank: 2 },
  { id: 'peer-2', name: 'Database Architecture Guild', members: 5, goal: 'SQL Query Plan Mastery', avgMastery: '69%', activeChallenge: 'Optimize Window Function Queries', myRank: 4 },
];

class MemoryStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem('voxlearn_memory_store');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse memory store:', e);
    }
    return {
      student: {
        name: 'Alex Rivera',
        targetGoal: 'AI Engineer & Distributed Systems Specialist',
        targetRole: 'AI Engineer',
        level: 4,
        xp: 1450,
        xpToNextLevel: 2000,
        streakDays: 14,
        preferredMode: 'Podcast & Interactive Simulation'
      },
      knowledgeNodes: JSON.parse(JSON.stringify(DEFAULT_KNOWLEDGE_NODES)),
      badges: JSON.parse(JSON.stringify(DEFAULT_BADGES)),
      peerGroups: JSON.parse(JSON.stringify(DEFAULT_PEER_GROUPS)),
      activeRemedial: null,
      history: [
        { date: '2026-03-08', action: 'Took Assessment: SQL Analytics', score: '38%', flaggedConcept: 'Window Functions (OVER, PARTITION)', severity: 'Critical' },
        { date: '2026-03-07', action: 'Socratic Voice Session with Sharyx Voice AI', score: '88%', flaggedConcept: 'JOIN Operations', severity: 'Low' }
      ]
    };
  }

  saveState() {
    localStorage.setItem('voxlearn_memory_store', JSON.stringify(this.state));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  getState() {
    return this.state;
  }

  // Add XP and handle level up
  addXP(amount, reason = '') {
    this.state.student.xp += amount;
    if (this.state.student.xp >= this.state.student.xpToNextLevel) {
      this.state.student.level += 1;
      this.state.student.xpToNextLevel = Math.round(this.state.student.xpToNextLevel * 1.5);
    }
    this.saveState();
  }

  // Update a Concept Node Mastery in Knowledge Graph
  updateNodeMastery(conceptName, newMastery) {
    const node = this.state.knowledgeNodes.find(n => 
      n.name.toLowerCase().includes(conceptName.toLowerCase()) || 
      conceptName.toLowerCase().includes(n.name.toLowerCase())
    );

    if (node) {
      node.mastery = Math.min(100, Math.max(0, newMastery));
      node.status = node.mastery >= 80 ? 'Mastered' : node.mastery >= 60 ? 'Medium' : 'Weak';
      
      // If upgraded to mastered, unlock badge
      if (node.status === 'Mastered') {
        const badge = this.state.badges.find(b => b.id === 'b3');
        if (badge && !badge.unlocked) {
          badge.unlocked = true;
          badge.unlockedAt = new Date().toISOString().split('T')[0];
        }
      }
      this.saveState();
    }
  }

  // Early Learning Risk Detection Engine
  getRiskAnalysis() {
    const weakNodes = this.state.knowledgeNodes.filter(n => n.status === 'Weak');
    const criticalPrereqGaps = [];

    // Check if any weak node is a prerequisite for advanced topics
    weakNodes.forEach(weak => {
      const dependents = this.state.knowledgeNodes.filter(n => n.prerequisites.includes(weak.id));
      if (dependents.length > 0) {
        criticalPrereqGaps.push({
          weakNode: weak,
          blockedNodes: dependents,
          riskScore: 'High',
          alertMessage: `Weakness in "${weak.name}" (${weak.mastery}%) threatens progression in ${dependents.map(d => d.name).join(', ')}.`
        });
      }
    });

    return {
      weakCount: weakNodes.length,
      weakNodes,
      criticalPrereqGaps,
      overallMastery: Math.round(
        this.state.knowledgeNodes.reduce((acc, curr) => acc + curr.mastery, 0) / this.state.knowledgeNodes.length
      ),
      hasCriticalRisk: criticalPrereqGaps.length > 0
    };
  }

  // Set Active Remedial Recovery Course
  setActiveRemedial(remedialData) {
    this.state.activeRemedial = remedialData;
    this.saveState();
  }

  clearActiveRemedial() {
    this.state.activeRemedial = null;
    this.saveState();
  }
}

export const memoryStore = new MemoryStore();
