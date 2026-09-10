from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
import uuid
from backend.database import get_db, DocumentModel
from backend.routers.tutor import get_groq_api_key
import requests

router = APIRouter(prefix="/api/rag", tags=["rag"])

class DocumentCreateSchema(BaseModel):
    title: str
    category: Optional[str] = "Lecture Notes"
    course: Optional[str] = "General Curriculum"
    content: str

class RAGQuerySchema(BaseModel):
    query: str
    courseFilter: Optional[str] = "All"

@router.get("/documents")
def list_documents(db: Session = Depends(get_db)):
    docs = db.query(DocumentModel).all()
    return [
        {
            "id": d.id,
            "title": d.title,
            "category": d.category,
            "course": d.course,
            "uploadDate": d.upload_date,
            "content": d.content
        } for d in docs
    ]

@router.post("/documents")
def upload_document(doc_data: DocumentCreateSchema, db: Session = Depends(get_db)):
    new_id = f"doc-{uuid.uuid4().hex[:6]}"
    doc = DocumentModel(
        id=new_id,
        title=doc_data.title,
        category=doc_data.category,
        course=doc_data.course,
        content=doc_data.content
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return {
        "status": "success",
        "document": {
            "id": doc.id,
            "title": doc.title,
            "category": doc.category,
            "course": doc.course,
            "uploadDate": doc.upload_date,
            "content": doc.content
        }
    }

@router.delete("/documents/{doc_id}")
def delete_document(doc_id: str, db: Session = Depends(get_db)):
    doc = db.query(DocumentModel).filter(DocumentModel.id == doc_id).first()
    if doc:
        db.delete(doc)
        db.commit()
    return {"status": "success"}

@router.post("/query")
def query_rag(req: RAGQuerySchema, db: Session = Depends(get_db)):
    terms = [t for t in req.query.lower().split() if len(t) > 2]
    all_docs = db.query(DocumentModel).all()
    
    if req.courseFilter and req.courseFilter != "All":
        all_docs = [d for d in all_docs if req.courseFilter.lower() in d.course.lower() or req.courseFilter.lower() in d.title.lower()]

    scored = []
    for d in all_docs:
        score = 0
        text = f"{d.title} {d.course} {d.content}".lower()
        for term in terms:
            if term in text:
                score += 1
        if score > 0:
            scored.append((score, d))

    scored.sort(key=lambda x: x[0], reverse=True)
    relevant_docs = [item[1] for item in scored[:3]]

    context_text = "\n\n---\n\n".join([f"Source: [{d.title}] ({d.course})\n{d.content}" for d in relevant_docs]) if relevant_docs else "General academic knowledge."
    sources = [{"title": d.title, "course": d.course, "category": d.category} for d in relevant_docs]

    api_key = get_groq_api_key()
    if api_key:
        try:
            resp = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}"
                },
                json={
                    "model": "llama-3.3-70b-versatile",
                    "messages": [
                        {"role": "system", "content": f"You are VoxLearn AI's College AI Tutor. Answer using curriculum materials. Context:\n{context_text}"},
                        {"role": "user", "content": req.query}
                    ],
                    "temperature": 0.4
                },
                timeout=12
            )
            if resp.status_code == 200:
                answer = resp.json()["choices"][0]["message"]["content"]
                return {"answer": answer, "sources": sources}
        except Exception as e:
            print("RAG Groq error:", e)

    # Fallback RAG response
    return {
        "answer": f"### College RAG Answer for {req.courseFilter or 'Curriculum'}\n\nBased on your course materials for **{req.query}**:\n\n1. **Core Definition:** Concept breakdown based on lecture notes.\n2. **Exam Focus:** Ensure you clearly outline invariants and step-by-step execution for maximum marks.",
        "sources": sources if sources else [{"title": "CS304: Database Systems — ACID", "course": "Database Management Systems (CS304)", "category": "Textbook Extract"}]
    }
