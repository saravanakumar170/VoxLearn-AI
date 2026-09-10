// College RAG Service for VoxLearn AI
// Ingests College Notes, PDFs, Syllabi, and Previous Question Papers for institution-specific doubt clearing

import { GroqService } from './groqService';

export const PRELOADED_COLLEGE_DOCS = [
  {
    id: 'doc-dsa-1',
    title: 'CS201: Data Structures & Algorithms — Arrays, Trees, Graphs & Dynamic Programming',
    category: 'Placement Master Notes',
    course: 'DSA for Placements (CS201)',
    uploadDate: '2026-03-05',
    content: `DSA FOR PLACEMENTS - HIGH PRIORITY TOPICS:
1. Two Pointers & Sliding Window:
   - Contiguous subarray optimization, Shrinking windows on target constraints (e.g. Longest Substring Without Repeating Characters).
2. Binary Trees & BSTs:
   - In-order traversal of BST yields sorted sequence.
   - Lowest Common Ancestor (LCA) in O(H) time.
3. Graphs:
   - BFS for shortest path in unweighted graphs (Queue-based).
   - DFS for topological sorting and cycle detection (3-color state: Unvisited, Visiting, Visited).
   - Dijkstra's algorithm with Min-Heap Priority Queue for weighted graphs in O((V + E) log V).
4. Dynamic Programming:
   - 0/1 Knapsack: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]]).
   - Longest Common Subsequence (LCS) and Edit Distance.`
  },
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
    id: 'doc-py-1',
    title: 'CS208: Python for Data Science — NumPy, Pandas, Vectorization & ML Pipelines',
    category: 'Lab Manual & Cheat Sheet',
    course: 'Python for Data Science (CS208)',
    uploadDate: '2026-02-28',
    content: `PYTHON FOR DATA SCIENCE - CORE MODULES:
1. NumPy Array Internals:
   - Contiguous C memory buffers, SIMD vectorization, Broadcasting rules (dimensions match or are 1).
   - Avoid Python for-loops on raw arrays; use np.vectorize or array operations.
2. Pandas Data Wrangling:
   - loc (label-based) vs iloc (0-indexed integer position).
   - GroupBy split-apply-combine paradigm, handling missing values via imputation or forward-fill.
3. Feature Engineering:
   - StandardScaler (z-score normalization), OneHotEncoder for nominal categoricals.`
  },
  {
    id: 'doc-sys-1',
    title: 'CS405: System Design & Distributed Systems — Scalability, Caching & Consensus',
    category: 'Architecture Case Studies',
    course: 'System Design Fundamentals (CS405)',
    uploadDate: '2026-02-20',
    content: `SYSTEM DESIGN FUNDAMENTALS:
1. Scalability: Horizontal scaling vs Vertical scaling, Stateless microservices behind Reverse Proxies (Nginx, Envoy).
2. Data Partitioning & Sharding:
   - Consistent Hashing (Virtual nodes on a hash ring) to minimize remapping during node additions/failures.
3. Caching Strategies:
   - Cache-Aside (Lazy loading), Write-Through, Write-Back.
   - Eviction policies: LRU, LFU, TTL expiration.
4. Distributed Consensus: CAP Theorem (Consistency, Availability, Partition tolerance), PACELC theorem, Raft & Paxos consensus protocols.`
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
    const terms = (query || '').toLowerCase().split(/\s+/).filter(t => t.length > 2);
    let candidateDocs = this.documents;
    
    if (courseFilter && courseFilter !== 'All') {
      const filterStr = courseFilter.toLowerCase();
      const filtered = candidateDocs.filter(d => d.course.toLowerCase().includes(filterStr) || d.title.toLowerCase().includes(filterStr));
      if (filtered.length > 0) candidateDocs = filtered;
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

  searchDocuments(query, courseFilter = null) {
    const results = this.searchContext(query, courseFilter);
    return results.map((d, idx) => ({
      courseId: d.course,
      sourceFile: d.title,
      category: d.category,
      pageNumber: idx + 1,
      excerpt: d.content.slice(0, 150) + '...'
    }));
  }

  async answerQuestion(query, courseFilter = null) {
    const relevantDocs = this.searchContext(query, courseFilter);
    const contextText = relevantDocs.length > 0 
      ? relevantDocs.map(d => `Source: [${d.title}] (${d.course})\n${d.content}`).join('\n\n---\n\n')
      : 'No exact institution document matched, providing general domain academic knowledge.';

    const systemPrompt = `You are VoxLearn AI's College AI Tutor.
Answer the student's question directly, accurately, and thoroughly using the provided institution materials and curriculum notes.
Cite the relevant document title when referencing facts.
Include key definitions, bullet points, and code/diagrams when appropriate.
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

    // Contextual fallback response
    if (query.toLowerCase().includes('deadlock')) {
      return {
        answer: `### Deadlock in Operating Systems (CS302)\n\nA **Deadlock** is a state where two or more processes are permanently blocked because each is holding a resource and waiting for another resource acquired by another process.\n\n#### 4 Necessary Coffman Conditions:\n1. **Mutual Exclusion:** Resources cannot be shared simultaneously.\n2. **Hold and Wait:** A process holds resources while requesting others.\n3. **No Preemption:** Resources can only be released voluntarily.\n4. **Circular Wait:** A closed loop of waiting processes.\n\n#### Primary Handling Strategies:\n- **Prevention:** Break at least one Coffman condition.\n- **Avoidance:** **Banker's Algorithm** ensures the system never enters an Unsafe State.\n- **Detection & Recovery:** Construct a Wait-For Graph (WFG) to detect cycles.`,
        sources: relevantDocs.length > 0 ? relevantDocs.map(d => ({ title: d.title, course: d.course, category: d.category })) : [
          { title: 'CS302: Operating Systems — Concurrency, Deadlocks & Memory Management', course: 'Operating Systems (CS302)', category: 'Lecture Notes' }
        ]
      };
    }

    return {
      answer: GroqService.getFallbackTutorResponse(query, courseFilter || "Computer Science Curriculum"),
      sources: relevantDocs.length > 0 
        ? relevantDocs.map(d => ({ title: d.title, course: d.course, category: d.category }))
        : [{ title: 'College Engineering Curriculum Reference Notes', course: courseFilter || 'General CS', category: 'Lecture Notes' }]
    };

  }
}

export const collegeRAG = new CollegeRAGService();
export const ragService = collegeRAG;
