from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json
from backend.database import get_db, UserModel, KnowledgeNodeModel, AssessmentModel

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == "student_1").first()
    nodes = db.query(KnowledgeNodeModel).filter(KnowledgeNodeModel.user_id == "student_1").all()

    weak_nodes = [n for n in nodes if n.status == "Weak"]
    total_mastery = sum([n.mastery for n in nodes]) / max(len(nodes), 1)

    return {
        "student": {
            "name": user.name if user else "Aarav Sharma",
            "targetGoal": user.target_goal if user else "AI Engineer",
            "level": user.level if user else 7,
            "xp": user.xp if user else 2480,
            "xpToNextLevel": user.xp_to_next_level if user else 3500,
            "streakDays": user.streak_days if user else 12,
        },
        "overallMastery": round(total_mastery),
        "weakCount": len(weak_nodes),
        "knowledgeNodes": [
            {
                "id": n.id,
                "name": n.name,
                "mastery": n.mastery,
                "status": n.status,
                "domain": n.domain
            } for n in nodes
        ],
        "hasRisk": len(weak_nodes) > 0,
        "primaryRiskMessage": f"Weakness detected in '{weak_nodes[0].name}' ({weak_nodes[0].mastery}%). Take 5-min Remedial Recovery Sprint." if weak_nodes else "Knowledge graph health optimal!"
    }
