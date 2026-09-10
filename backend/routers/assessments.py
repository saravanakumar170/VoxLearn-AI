from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import json
import uuid
from backend.database import get_db, AssessmentModel, RemedialSessionModel, KnowledgeNodeModel, UserModel
from backend.routers.tutor import get_groq_api_key
import requests

router = APIRouter(prefix="/api/assessments", tags=["assessments"])

class EvaluateAssessmentSchema(BaseModel):
    concept: str
    questions: List[dict]
    studentAnswers: List[int]

class RemedialRequestSchema(BaseModel):
    weakConcept: str
    specificWeakness: Optional[str] = "Conceptual ambiguity in execution order"

@router.post("/evaluate")
def evaluate_assessment(data: EvaluateAssessmentSchema, db: Session = Depends(get_db)):
    correct_count = 0
    total = max(len(data.questions), 1)
    
    for idx, q in enumerate(data.questions):
        ans = data.studentAnswers[idx] if idx < len(data.studentAnswers) else -1
        correct_idx = q.get("correctIndex", 0)
        if ans == correct_idx:
            correct_count += 1

    score = round((correct_count / total) * 100)
    requires_remediation = score < 75

    # Update knowledge node mastery in DB
    node = db.query(KnowledgeNodeModel).filter(KnowledgeNodeModel.name.ilike(f"%{data.concept}%")).first()
    if node:
        node.mastery = score
        node.status = "Mastered" if score >= 80 else "Medium" if score >= 60 else "Weak"
        db.commit()

    # Update user XP
    user = db.query(UserModel).filter(UserModel.id == "student_1").first()
    if user:
        user.xp += 100 if score >= 75 else 30
        db.commit()

    # Save assessment record
    assessment_rec = AssessmentModel(
        id=f"assess-{uuid.uuid4().hex[:6]}",
        user_id="student_1",
        concept=data.concept,
        score=score,
        mastery_status="Mastered" if score >= 80 else "Medium" if score >= 60 else "Weak",
        diagnostic_analysis=f"Score: {score}%. " + ("Great mastery!" if score >= 75 else f"Detected misconception in {data.concept}. Remedial sprint recommended."),
        specific_weakness=f"Boundary execution order in {data.concept}" if requires_remediation else None,
        requires_remediation=requires_remediation
    )
    db.add(assessment_rec)
    db.commit()

    return {
        "score": score,
        "concept": data.concept,
        "masteryStatus": assessment_rec.mastery_status,
        "diagnosticAnalysis": assessment_rec.diagnostic_analysis,
        "specificWeakness": assessment_rec.specific_weakness,
        "requiresRemediation": requires_remediation,
        "remediationPlan": "1. Visual diagram walkthrough 2. Step-by-step interactive debug sandbox 3. Re-assessment quiz" if requires_remediation else None
    }

@router.post("/remedial")
def generate_remedial(data: RemedialRequestSchema, db: Session = Depends(get_db)):
    api_key = get_groq_api_key()
    if api_key:
        try:
            prompt = (
                f"Generate a 5-minute Rapid Recovery Course for weak concept '{data.weakConcept}'. "
                f"Misconception: '{data.specificWeakness}'. "
                f"Return JSON: {{ 'title': '...', 'weakness': '...', 'simpleExplanation': '...', 'commonPitfall': '...', 'mnemonicOrRule': '...', 'interactivePractice': {{ 'problem': '...', 'starterCode': '...', 'solution': '...', 'hint': '...' }}, 'retestQuestions': [...] }}"
            )
            resp = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}"
                },
                json={
                    "model": "openai/gpt-oss-120b",
                    "messages": [
                        {"role": "system", "content": "You are VoxLearn AI Remediation Engine. Output valid JSON object."},
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.5,
                    "response_format": {"type": "json_object"}
                },
                timeout=12
            )
            if resp.status_code == 200:
                parsed = json.loads(resp.json()["choices"][0]["message"]["content"])
                return parsed
        except Exception as e:
            print("Remedial Groq error:", e)

    # Fallback Remedial Sprint
    return {
        "title": f"{data.weakConcept} — Rapid Recovery Sprint",
        "weakness": data.specificWeakness,
        "simpleExplanation": f"Think of {data.weakConcept} as an individual row lens. Instead of collapsing rows like GROUP BY, it keeps every single row while evaluating cumulative aggregates alongside it.",
        "commonPitfall": "Confusing execution order: people try to filter results with WHERE before the window calculation happens!",
        "mnemonicOrRule": "Remember: 'PARTITION divides the room, ORDER sorts the line, FRAME picks who you see.'",
        "interactivePractice": {
            "problem": f"Fix the query so each employee's salary is compared against their department's average:",
            "starterCode": "SELECT emp_id, salary, AVG(salary) OVER (/* Add partition here */) as dept_avg FROM employees;",
            "solution": "SELECT emp_id, salary, AVG(salary) OVER (PARTITION BY department_id) as dept_avg FROM employees;",
            "hint": "Use PARTITION BY department_id inside the OVER() clause!"
        },
        "retestQuestions": [
            {
                "question": f"Which clause defines partition boundaries in a window function?",
                "options": ["PARTITION BY", "GROUP BY", "ORDER BY", "HAVING"],
                "correctIndex": 0,
                "explanation": "PARTITION BY creates distinct calculation windows without collapsing rows."
            }
        ]
    }
