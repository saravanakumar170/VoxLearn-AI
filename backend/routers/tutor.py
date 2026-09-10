from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Optional
import os
import requests

router = APIRouter(prefix="/api/tutor", tags=["tutor"])

class MessageSchema(BaseModel):
    role: str
    content: str

class ChatRequestSchema(BaseModel):
    query: str
    concept: Optional[str] = "Computer Science & DBMS"
    socraticMode: Optional[bool] = True
    history: Optional[List[dict]] = []

def get_groq_api_key():
    return os.getenv("VITE_GROQ_API_KEY", os.getenv("GROQ_API_KEY", ""))

@router.post("/chat")
def tutor_chat(req: ChatRequestSchema):
    api_key = get_groq_api_key()
    
    if api_key:
        try:
            system_prompt = (
                f"You are VoxLearn AI's Sharyx-powered Socratic AI Tutor.\n"
                f"Guide the student toward deep conceptual understanding.\n"
                f"Current concept: '{req.concept}'. Socratic mode: {req.socraticMode}.\n"
                f"Provide clear insights, code examples, or Socratic questions when appropriate."
            )
            messages = [{"role": "system", "content": system_prompt}]
            for h in req.history:
                sender = h.get("sender") or h.get("role") or "user"
                role = "user" if sender in ["student", "user"] else "assistant"
                text = h.get("text") or h.get("content") or ""
                if text:
                    messages.append({"role": role, "content": text})
            messages.append({"role": "user", "content": req.query})

            resp = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}"
                },
                json={
                    "model": "llama-3.3-70b-versatile",
                    "messages": messages,
                    "temperature": 0.7
                },
                timeout=12
            )
            if resp.status_code == 200:
                data = resp.json()
                content = data["choices"][0]["message"]["content"]
                return {"status": "success", "reply": content, "source": "groq_llm"}
        except Exception as e:
            print("Groq API call error in FastAPI tutor:", e)

    # High quality domain fallback generator
    q_lower = req.query.lower()
    if "diagram" in q_lower:
        reply = (
            "Here is how the data flow looks conceptually:\n\n"
            "[ Outer Query: SELECT ... WHERE column IN ]\n"
            "             │\n"
            "             ▼ (evaluates filter condition)\n"
            "[ Inner Query: (SELECT AVG(salary) FROM employees) ]\n"
            "             │\n"
            "             ▼ (returns scalar result 64,500)\n"
            "[ Outer Query filters only rows where salary > 64,500 ]\n\n"
            "The inner query runs first and feeds its result directly into the outer query's WHERE clause."
        )
    elif "subquery" in q_lower or "subqueries" in q_lower:
        reply = (
            "**SQL Subqueries** are queries nested inside an outer query.\n\n"
            "```sql\n"
            "SELECT name, salary\n"
            "FROM employees\n"
            "WHERE salary > (\n"
            "  SELECT AVG(salary)\n"
            "  FROM employees\n"
            ");\n"
            "```\n\n"
            "Here, the inner query calculates the company-wide average salary once, and the outer query filters all employees who earn more than that benchmark."
        )
    elif "join" in q_lower:
        reply = (
            "In relational databases, **JOINs** combine rows from two or more tables based on a related column.\n\n"
            "• **INNER JOIN**: Returns records that have matching values in both tables.\n"
            "• **LEFT JOIN**: Returns all records from the left table, and matched records from the right.\n"
            "• **FULL OUTER JOIN**: Returns all records when there is a match in either table."
        )
    else:
        reply = f"That's a vital question on {req.concept}! What do you think happens under the hood when the database optimizer determines whether to use an index scan versus a sequential scan for this query?"

    return {"status": "success", "reply": reply, "source": "socratic_fallback"}
