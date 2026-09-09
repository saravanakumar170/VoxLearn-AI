// College RAG Service for VoxLearn AI
// Ingests College Notes, PDFs, Syllabi, and Previous Question Papers for institution-specific doubt clearing

import { GroqService } from './groqService';

export const PRELOADED_COLLEGE_DOCS = [
  {
    id: 'doc-os-1',
    title: 'CS302: Operating Systems — Concurrency, Deadlocks & Memory Management',
    category: 'Lecture Notes',
    course: 'Operating Systems (CS302)',
    uploadDate: '2026-03-01',
    content: `OPERATING SYSTEMS LECTURE NOTES - UNIT III: DEADLOCKS & SYNCHRONIZATION
1. Deadlock Definition: A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.
2. Four Coffman Necessary Conditions for Deadlock:
   a. Mutual Exclusion: At least one non-shareable resource.
   b. Hold and Wait: Process holding at least one resource and requesting additional ones.
   c. No Preemption: Resources cannot be forcibly preempted from a process.
   d. Circular Wait: A closed chain of processes P0 -> P1 -> ... -> Pn -> P0 where each waits for a resource held by the next.
3. Deadlock Handling Strategies:
   - Deadlock Prevention: Invalidate at least one Coffman condition (e.g., impose resource ordering to break circular wait).
   - Deadlock Avoidance: Banker's Algorithm using safe state checking and Resource-Allocation Graph (RAG).
   - Deadlock Detection & Recovery: Wait-For Graph (WFG) cycle detection, process termination or resource preemption.
   - Ostrich Algorithm: Ignore the problem (common in general-purpose OS).
4. Memory Management: Paging vs Segmentation, Translation Lookaside Buffer (TLB) hit ratios, and Page Replacement Algorithms (LRU, FIFO, Optimal/Belady's Anomaly).`
  },
  {
    id: 'doc-dbms-1',
    title: 'CS304: Database Systems — ACID, Normalization & Query Execution',
    category: 'Textbook Extract',
    course: 'Database Management Systems (CS304)',
    uploadDate: '2026-02-15',
    content: `DATABASE SYSTEMS NOTES - UNIT IV: TRANSACTION PROCESSING & CONCURRENCY CONTROL
1. ACID Properties:
   - Atomicity: All or nothing execution (guaranteed by Write-Ahead Logging / Undo Logs).
   - Consistency: Preserves database integrity constraints.
   - Isolation: Concurrent transactions execute without mutual interference (Serializability, 2PL, MVCC).
   - Durability: Committed updates survive system crashes (Redo Logs, Checkpointing).
2. Two-Phase Locking (2PL):
   - Growing Phase: Locks acquired, no locks released.
   - Shrinking Phase: Locks released, no new locks acquired.
   - Strict 2PL: All Exclusive locks held until transaction commits, avoiding cascading rollbacks.
3. Normalization: 1NF (Atomic attributes), 2NF (No partial dependencies on candidate key), 3NF (No transitive dependencies), BCNF (Every determinant is a candidate key).`
  },
  {
    id: 'doc-ml-1',
    title: 'CS401: Machine Learning — Bias-Variance Tradeoff & Neural Architectures',
    category: 'Previous Question Paper Solutions',
    course: 'Machine Learning (CS401)',
    uploadDate: '2026-01-20',
    content: `PREVIOUS QUESTION PAPER SOLUTIONS (2025-2026) - CS401
Q1: Explain Overfitting and Regularization Techniques with derivations.
Ans: Overfitting occurs when a statistical model captures random noise along with the underlying data distribution, leading to low training error but high test error (High Variance).
Mitigation strategies:
- L1 Regularization (Lasso): Adds absolute penalty sum(|w|), drives weights to exact zero for feature selection.
- L2 Regularization (Ridge): Adds squared penalty sum(w^2), shrinks weights smoothly without zeroing.
- Dropout: Randomly deactivates neurons during forward pass with probability p to prevent co-adaptation.`
  }
];

class CollegeRAGService {
  constructor() {
    this.documents = this.loadStoredDocuments();
  }

  loadStoredDocuments() {
    try {
      const stored = localStorage.getItem('voxlearn_college_docs');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse stored college docs:', e);
    }
    return PRELOADED_COLLEGE_DOCS;
  }

  saveDocuments() {
    localStorage.setItem('voxlearn_college_docs', JSON.stringify(this.documents));
  }

  getDocuments() {
    return this.documents;
  }

  addDocument(doc) {
    const newDoc = {
      id: `doc-${Date.now()}`,
      title: doc.title,
      category: doc.category || 'Study Material',
      course: doc.course || 'General Curriculum',
      uploadDate: new Date().toISOString().split('T')[0],
      content: doc.content
    };
    this.documents.unshift(newDoc);
    this.saveDocuments();
    return newDoc;
  }

  deleteDocument(id) {
    this.documents = this.documents.filter(d => d.id !== id);
    this.saveDocuments();
  }

  // RAG Search & Context Retrieval
  searchContext(query, courseFilter = null) {
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    let candidateDocs = this.documents;
    
    if (courseFilter && courseFilter !== 'All') {
      candidateDocs = candidateDocs.filter(d => d.course.includes(courseFilter) || d.title.includes(courseFilter));
    }

    const scored = candidateDocs.map(doc => {
      let score = 0;
      const text = `${doc.title} ${doc.course} ${doc.content}`.toLowerCase();
      terms.forEach(term => {
        if (text.includes(term)) score += 1;
      });
      return { doc, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.filter(s => s.score > 0).slice(0, 3).map(s => s.doc);
  }

  async answerQuestion(query, courseFilter = null) {
    const relevantDocs = this.searchContext(query, courseFilter);
    const contextText = relevantDocs.length > 0 
      ? relevantDocs.map(d => `Source: [${d.title}] (${d.course})\n${d.content}`).join('\n\n---\n\n')
      : 'No exact institution document matched, providing general domain academic knowledge.';

    const systemPrompt = `You are VoxLearn AI's College AI Tutor.
Answer the student's question using the provided institution materials and curriculum notes.
Cite the relevant document title when referencing facts.
Provide a clear, accurate, high-scoring exam answer with key definitions, bullet points, and practical takeaways.
Context from student's college repository:
${contextText}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ];

    const groqResponse = await GroqService.callGroqAPI(messages, 0.4);
    if (groqResponse) {
      return {
        answer: groqResponse,
        sources: relevantDocs.map(d => ({ title: d.title, course: d.course, category: d.category }))
      };
    }

    // High quality contextual fallback
    if (query.toLowerCase().includes('deadlock')) {
      return {
        answer: `### Deadlock in Operating Systems (CS302)

A **Deadlock** is a state where two or more processes are permanently blocked because each is holding a resource and waiting for another resource acquired by another process.

#### 4 Necessary Coffman Conditions:
1. **Mutual Exclusion:** Resources cannot be shared simultaneously.
2. **Hold and Wait:** A process holds $\\ge 1$ resource while requesting others.
3. **No Preemption:** Resources can only be released voluntarily by the holding process.
4. **Circular Wait:** A closed loop where $P_0 \\rightarrow P_1 \\rightarrow \\dots \\rightarrow P_n \\rightarrow P_0$.

#### Primary Handling Strategies:
- **Prevention:** Break at least one Coffman condition (e.g. strict global resource ordering).
- **Avoidance:** **Banker's Algorithm** ensures the system never enters an *Unsafe State*.
- **Detection & Recovery:** Construct a **Wait-For Graph (WFG)** to detect cycles; recover via process termination or preemption.`,
        sources: relevantDocs.length > 0 ? relevantDocs.map(d => ({ title: d.title, course: d.course, category: d.category })) : [
          { title: 'CS302: Operating Systems — Concurrency, Deadlocks & Memory Management', course: 'Operating Systems (CS302)', category: 'Lecture Notes' }
        ]
      };
    }

    return {
      answer: `Based on your course materials for **${courseFilter || 'your curriculum'}**:

1. **Core Concept Definition:** This topic focuses on optimizing system invariants, concurrency guarantees, and resource efficiency.
2. **Key Theoretical Insights:** Ensure you distinguish between syntactic execution and semantic state guarantees in exam answers.
3. **Exam Tip:** Clearly state assumptions, provide time/space complexity, and illustrate with a quick state-transition diagram for full marks.`,
      sources: relevantDocs.map(d => ({ title: d.title, course: d.course, category: d.category }))
    };
  }
}

export const collegeRAG = new CollegeRAGService();
export const ragService = collegeRAG;
