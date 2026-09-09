# VoxLearn AI 🎙️🧠

> **Autonomous AI-Powered Adaptive Learning & Socratic Voice Tutoring Platform**

VoxLearn AI is a next-generation personalized education and intelligent tutoring system designed to transform college and vocational curricula into interactive multi-modal experiences. Powered by **Sharyx Voice AI** and **Groq Llama 3.3 70B**, VoxLearn AI dynamically diagnoses student knowledge gaps, generates custom learning paths, and guides students step-by-step using Socratic questioning.

---

## ✨ Key Features

- **🎙️ Sharyx Socratic Voice Tutor**: Real-time spoken dialogue, voice waveform visualizer, intelligent STT/TTS with speech rate & pitch modulation.
- **⚡ Groq Llama 3.3 70B Fast Inference**: Instant concept explanations, SQL code sandboxes, and multi-turn conversational memory.
- **📄 College RAG Knowledge Indexer**: Live semantic search across lecture notes, syllabi, past exam papers, and textbooks with page-accurate citations.
- **🕸️ Interactive Knowledge Graph**: Visual mastery network across computer science topics with automated weakness remediation triggers.
- **📝 Adaptive AI Assessments**: Dynamic diagnostic quizzes with conceptual misconception analysis and automated 5-minute recovery sprints.
- **🎮 Multi-Modal Learning Studio**: 6 distinct learning modes per concept (Lesson Notes, Socratic Dialogue, Game Arena, Dual-Host Podcast, Video Storyboard, Interactive Sim).
- **🚀 Goal-Based Career Roadmaps**: Milestone tracking from foundations to advanced AI engineering.
- **👥 Peer Learning & Study Pods**: Collaborative challenges, study partner matching, and group leaderboards.
- **🌓 Light & Dark Theme Support**: Sleek, glassmorphic UI adhering to Figma design specifications.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v4, Lucide Icons
- **Build Tool**: Vite 8
- **AI & LLM Engine**: Groq API (`llama-3.3-70b-versatile`)
- **Voice AI**: Sharyx Web Speech API Engine & Speech Synthesis
- **Testing**: Vitest, React Testing Library (49/49 Unit & Integration Tests Passing)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/saravanakumar170/VoxLearn-AI.git
cd VoxLearn-AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run tests & build
```bash
# Run unit & integration test suite
npm test

# Build for production
npm run build
```

---

## ⚙️ Configuration

You can configure your Groq API Key and voice preferences via the in-app **⚙️ Settings** modal or by creating a `.env` file:

```env
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here
```

---

## 📄 License

MIT License. Built for advanced agentic learning and education innovation.
