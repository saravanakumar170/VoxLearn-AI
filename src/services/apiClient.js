// VoxLearn AI API Client for FastAPI Backend Communication with Client Fallbacks
import { memoryStore } from './memoryStore';

const BASE_URL = typeof window !== 'undefined' && window.location.origin.includes('localhost') ? 'http://127.0.0.1:8000/api' : '/api';

export class ApiClient {
  static async fetchApi(endpoint, options = {}) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        ...options
      });
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn(`API call failed for ${endpoint}, using state store fallback:`, err.message);
      return null;
    }
  }

  // Auth & Profile
  static async login(email, password) {
    const res = await this.fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res && res.user) {
      memoryStore.updateStudentProfile(res.user);
      return res.user;
    }
    return memoryStore.getState().student;
  }

  static async register(name, email, password, role = 'student', targetGoal = '') {
    const res = await this.fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role, targetGoal })
    });
    if (res && res.user) {
      memoryStore.updateStudentProfile(res.user);
      return res.user;
    }
    return memoryStore.getState().student;
  }

  static async getProfile() {
    const res = await this.fetchApi('/auth/me');
    if (res) {
      memoryStore.updateStudentProfile(res);
      return res;
    }
    return memoryStore.getState().student;
  }

  static async updateProfile(profileData) {
    const res = await this.fetchApi('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
    if (res && res.user) {
      memoryStore.updateStudentProfile(res.user);
    } else {
      memoryStore.updateStudentProfile(profileData);
    }
    return memoryStore.getState().student;
  }

  // Dashboard Stats
  static async getDashboardStats() {
    const res = await this.fetchApi('/dashboard/stats');
    if (res && res.student) {
      memoryStore.updateStudentProfile(res.student);
    }
    return res;
  }

  // Tutor Chat
  static async askTutor(query, concept = 'DBMS & SQL', socraticMode = true, history = []) {
    const res = await this.fetchApi('/tutor/chat', {
      method: 'POST',
      body: JSON.stringify({ query, concept, socraticMode, history })
    });
    if (res && res.reply) return res.reply;
    return null;
  }

  // RAG Documents
  static async getDocuments() {
    const res = await this.fetchApi('/rag/documents');
    if (res && Array.isArray(res)) return res;
    return null;
  }

  static async uploadDocument(doc) {
    const res = await this.fetchApi('/rag/documents', {
      method: 'POST',
      body: JSON.stringify(doc)
    });
    return res;
  }

  static async queryRAG(query, courseFilter = 'All') {
    const res = await this.fetchApi('/rag/query', {
      method: 'POST',
      body: JSON.stringify({ query, courseFilter })
    });
    return res;
  }

  // Course Generation
  static async generateCourse(topic, level = 'Beginner', targetGoal = '') {
    const res = await this.fetchApi('/courses/generate', {
      method: 'POST',
      body: JSON.stringify({ topic, level, targetGoal })
    });
    return res;
  }

  // Assessment Evaluation & Remediation
  static async evaluateAssessment(concept, questions, studentAnswers) {
    const res = await this.fetchApi('/assessments/evaluate', {
      method: 'POST',
      body: JSON.stringify({ concept, questions, studentAnswers })
    });
    if (res && res.score !== undefined) {
      memoryStore.updateNodeMastery(concept, res.score);
    }
    return res;
  }

  static async generateRemedialSprint(weakConcept, specificWeakness) {
    const res = await this.fetchApi('/assessments/remedial', {
      method: 'POST',
      body: JSON.stringify({ weakConcept, specificWeakness })
    });
    return res;
  }

  // Knowledge Graph
  static async getKnowledgeGraph() {
    const res = await this.fetchApi('/knowledge/graph');
    return res;
  }

  static async updateNodeMastery(conceptName, newMastery) {
    const res = await this.fetchApi('/knowledge/update', {
      method: 'PUT',
      body: JSON.stringify({ conceptName, newMastery })
    });
    memoryStore.updateNodeMastery(conceptName, newMastery);
    return res;
  }

  // Gamification & XP
  static async addXP(amount, reason = '') {
    const res = await this.fetchApi('/gamification/xp', {
      method: 'POST',
      body: JSON.stringify({ amount, reason })
    });
    memoryStore.addXP(amount, reason);
    return res;
  }

  // Projects
  static async submitProject(projectTitle, submissionText) {
    const res = await this.fetchApi('/roadmaps/projects/submit', {
      method: 'POST',
      body: JSON.stringify({ projectTitle, submissionText })
    });
    if (res && res.xpEarned) {
      memoryStore.addXP(res.xpEarned, `Submitted Project: ${projectTitle}`);
    }
    return res;
  }
}

export const apiClient = ApiClient;
