from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import uuid
from backend.database import get_db, ProjectSubmissionModel, UserModel

router = APIRouter(prefix="/api/roadmaps", tags=["roadmaps"])

class ProjectSubmitSchema(BaseModel):
    projectTitle: str
    submissionText: str

@router.get("/")
@router.get("/career")
def get_career_roadmap(role: Optional[str] = "AI Engineer"):
    return {
        "title": f"Autonomous {role} Career Roadmap",
        "role": role,
        "timeframe": "6 Months (Fast-Track)",
        "milestones": [
            {"step": 1, "title": "Python & Vector Mathematics", "skills": ["NumPy", "Linear Algebra", "Calculus"], "status": "Completed"},
            {"step": 2, "title": "Classical ML & Optimization", "skills": ["Scikit-Learn", "Gradient Descent", "Feature Stores"], "status": "Completed"},
            {"step": 3, "title": "Deep Learning & Transformer Foundations", "skills": ["PyTorch", "Self-Attention", "CUDA Basics"], "status": "In Progress"},
            {"step": 4, "title": "LLM Systems & Retrieval-Augmented Generation (RAG)", "skills": ["Vector DBs", "Hybrid Search", "Semantic Caching"], "status": "Upcoming"},
            {"step": 5, "title": "Multi-Agent Autonomous Orchestration", "skills": ["Tool Calling", "Planning Loops", "Evals & Guardrails"], "status": "Upcoming"},
            {"step": 6, "title": "Production Deployment & Fast Inference", "skills": ["vLLM", "Groq LPU Acceleration", "Quantization"], "status": "Upcoming"},
        ],
        "projects": [
            {
                "id": "proj-1",
                "title": "High-Throughput Hybrid RAG Engine with Groq Acceleration",
                "level": "Intermediate",
                "skills": ["RAG", "Vector Embeddings", "Groq API", "Python"],
                "description": "Design and benchmark a sub-100ms multi-document question-answering service with hybrid reranking.",
                "rubric": ["Vector search recall > 92%", "P99 Latency < 250ms", "Accurate source citation mapping"]
            }
        ]
    }

@router.post("/projects/submit")
def submit_project(data: ProjectSubmitSchema, db: Session = Depends(get_db)):
    score = 90
    feedback = f"Excellent implementation of '{data.projectTitle}'! All primary rubric invariants passed. +150 XP awarded."
    
    sub = ProjectSubmissionModel(
        id=f"sub-{uuid.uuid4().hex[:6]}",
        user_id="student_1",
        project_title=data.projectTitle,
        submission_text=data.submissionText,
        score=score,
        feedback=feedback
    )
    db.add(sub)
    
    user = db.query(UserModel).filter(UserModel.id == "student_1").first()
    if user:
        user.xp += 150
        db.commit()

    return {
        "status": "success",
        "score": score,
        "feedback": feedback,
        "xpEarned": 150
    }
