# VoxLearn AI 🎓⚡

> **Startup-Grade Personal AI Learning Ecosystem & Socratic Voice Tutor**

VoxLearn AI is an end-to-end multi-agent AI learning platform designed to convert complex curricula into personalized, adaptive multi-modal experiences. Featuring a complete **FastAPI backend**, **SQLite database**, **Groq Llama 3.3 70B inference engine**, and **Sharyx Voice AI**, VoxLearn AI dynamically analyzes learner progress, remediates knowledge gaps, and provides real-time Socratic voice tutoring.

---

## 🌟 Key Platform Features

- **🎙️ Sharyx Socratic Voice Tutor**: Real-time voice interaction with Socratic guidance, speech rate control, and dynamic audio visualizer.
- **⚡ Fast AI Inference Engine**: Powered by Groq Llama 3.3 70B for instant concept breakdown, SQL execution sandboxes, and multi-turn chat.
- **⚡ FastAPI Production Backend**: Modular REST API with SQLite persistence, SQLAlchemy ORM, and automated seed data (`http://127.0.0.1:8000`).
- **📄 College RAG Knowledge Indexer**: Contextual retrieval across uploaded lecture slides, textbooks, and syllabi with page-level citations.
- **🕸️ Visual Knowledge Graph**: Interactive mastery node network with automated prerequisite weakness remediation.
- **📝 Autonomous Remedial Engine**: Diagnostic quizzes with instant misconception analysis and 5-minute recovery sprints.
- **🎮 Multi-Modal Learning Studio**: 6 interactive modes (Traditional Notes, Socratic Drill, Game Arena, Dual-Host Podcast, Video Storyboard, Interactive Sim).
- **🚀 Career Roadmaps & AI Rubrics**: Structured learning paths with automated rubric-based AI portfolio project scoring.
- **👥 Smart AI Study Pods**: Peer collaboration, streak bonuses, and community leaderboards.
- **✨ Icon-Driven Glassmorphic Design**: Clean Lucide SVG iconography, custom SVG favicon, and dark/light glassmorphic styling based on Figma designs.

---

## 🏗️ Architecture Overview

```
VoxLearn-AI/
├── backend/                  # FastAPI Python Backend
│   ├── main.py               # Application entry point & CORS configuration
│   ├── database.py           # SQLite engine & session setup
│   ├── models.py             # SQLAlchemy ORM database models
│   ├── schemas.py            # Pydantic request/response schemas
│   ├── seed_data.py          # Database initializer script
│   ├── routers/              # API Route Handlers
│   │   ├── auth.py           # Authentication API
│   │   ├── courses.py        # Course catalog & management API
│   │   ├── knowledge_graph.py# Knowledge graph node & progress API
│   │   ├── rag.py            # College RAG document querying API
│   │   ├── assessment.py     # Quiz & remedial sprint API
│   │   ├── career.py         # Roadmaps & project rubrics API
│   │   ├── gamification.py   # Badges, study pods, & streak API
│   │   ├── voice.py          # Sharyx voice configuration API
│   │   └── admin.py          # Admin platform statistics API
├── src/                      # React 18 + Vite 8 Frontend
│   ├── components/           # UI Component Library (Dashboard, Studio, RAG, etc.)
│   ├── screens/              # Role-based Portal Views (Student, Teacher, Admin)
│   ├── services/             # API Client & Groq AI / Sharyx Voice Integration
│   ├── test/                 # Vitest Unit & Integration Test Suite (49/49 Passing)
│   └── lib.tsx               # Icon system & mock datasets
```

---

## ⚡ API Endpoints Summary (`http://127.0.0.1:8000/api`)

| Category | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Register new student or teacher |
| **Auth** | `POST` | `/api/auth/login` | Authenticate user & receive session token |
| **Courses** | `GET` | `/api/courses/` | List available courses & enrolment state |
| **Knowledge Graph** | `GET` | `/api/knowledge-graph/` | Fetch user knowledge nodes & overall mastery |
| **Knowledge Graph** | `POST` | `/api/knowledge-graph/remediate` | Trigger prerequisite weakness recovery sprint |
| **RAG** | `POST` | `/api/rag/query` | Perform RAG search on uploaded college documents |
| **Assessment** | `GET` | `/api/assessment/questions` | Generate adaptive diagnostic questions |
| **Career** | `GET` | `/api/career/roadmaps` | Fetch goal roadmaps & project rubrics |
| **Gamification** | `GET` | `/api/gamification/badges` | Fetch badges, streaks, and active study pods |
| **Voice** | `GET` | `/api/voice/config` | Retrieve Sharyx voice tutor configuration |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher

### 1. Clone & Install Frontend Dependencies
```bash
git clone https://github.com/saravanakumar170/VoxLearn-AI.git
cd VoxLearn-AI
npm install
```

### 2. Set Up & Launch FastAPI Backend
```bash
# Navigate to project root
cd VoxLearn-AI

# Create Python virtual environment (optional but recommended)
python -m venv venv
# Activate virtual environment:
# Windows: venv\Scripts\activate
# Unix/macOS: source venv/bin/activate

# Install backend dependencies
pip install fastapi uvicorn sqlalchemy pydantic

# Start FastAPI dev server (runs on port 8000)
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
*FastAPI interactive Swagger documentation is available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).*

### 3. Launch Frontend Development Server
```bash
# In a separate terminal tab
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing & Production Build

### Run Unit & Integration Test Suite
```bash
npm test
```
*Guaranteed 100% test pass rate across 49 unit and integration tests.*

### Production Build
```bash
npm run build
```
*Generates optimized production bundle in `dist/`.*

---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file in the root directory:

```env
# Frontend Groq AI Key
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here

# Backend Configuration
FASTAPI_HOST=127.0.0.1
FASTAPI_PORT=8000
DATABASE_URL=sqlite:///./backend/voxlearn.db
```

---

## 📄 License

MIT License. Designed & built for state-of-the-art AI education innovation.
