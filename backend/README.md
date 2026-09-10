# VoxLearn AI — FastAPI Backend Service ⚡🐍

This directory contains the production-grade **FastAPI** REST backend for VoxLearn AI.

## 🚀 Quick Setup & Execution

### 1. Install Dependencies
```bash
pip install fastapi uvicorn sqlalchemy pydantic
```

### 2. Database Initialization
The SQLite database (`backend/voxlearn.db`) is automatically created and populated with sample courses, knowledge nodes, RAG documents, and initial users on server startup.

### 3. Run the Server
```bash
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

Server URL: `http://127.0.0.1:8000`
Swagger OpenAPI Docs: `http://127.0.0.1:8000/docs`

## 📁 Directory Structure

- `main.py`: Main FastAPI entrypoint with CORS middleware and API router initialization.
- `database.py`: SQLAlchemy engine, SessionLocal instance, and base model declaration.
- `models.py`: Database models (`User`, `Course`, `KnowledgeNode`, `RagDocument`, `AssessmentQuestion`, `CareerRoadmap`, `GamificationState`).
- `schemas.py`: Pydantic input/output validation models.
- `seed_data.py`: Initial database seeding script.
- `routers/`: 9 modular API route modules for Auth, Courses, Knowledge Graph, RAG, Assessments, Career Roadmaps, Gamification, Voice AI, and Admin.
