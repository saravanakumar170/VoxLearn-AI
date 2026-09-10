from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import json
from backend.database import get_db, KnowledgeNodeModel, UserModel

router = APIRouter(prefix="/api/knowledge", tags=["knowledge"])

class NodeUpdateSchema(BaseModel):
    conceptName: str
    newMastery: int

@router.get("/graph")
def get_knowledge_graph(db: Session = Depends(get_db)):
    nodes = db.query(KnowledgeNodeModel).filter(KnowledgeNodeModel.user_id == "student_1").all()
    return [
        {
            "id": n.id,
            "domain": n.domain,
            "name": n.name,
            "mastery": n.mastery,
            "status": n.status,
            "prerequisites": json.loads(n.prerequisites) if n.prerequisites else []
        } for n in nodes
    ]

@router.put("/update")
def update_node_mastery(data: NodeUpdateSchema, db: Session = Depends(get_db)):
    node = db.query(KnowledgeNodeModel).filter(KnowledgeNodeModel.name.ilike(f"%{data.conceptName}%")).first()
    if node:
        node.mastery = min(100, max(0, data.newMastery))
        node.status = "Mastered" if node.mastery >= 80 else "Medium" if node.mastery >= 60 else "Weak"
        db.commit()
        db.refresh(node)
        
        # Award XP for mastering
        if node.status == "Mastered":
            user = db.query(UserModel).filter(UserModel.id == "student_1").first()
            if user:
                user.xp += 150
                db.commit()

        return {
            "status": "success",
            "node": {
                "id": node.id,
                "name": node.name,
                "mastery": node.mastery,
                "status": node.status
            }
        }
    return {"status": "error", "message": "Node not found"}
