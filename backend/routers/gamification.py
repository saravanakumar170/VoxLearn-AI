from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend.database import get_db, UserModel

router = APIRouter(prefix="/api/gamification", tags=["gamification"])

class XPAddSchema(BaseModel):
    amount: int
    reason: str

@router.post("/xp")
def add_xp(data: XPAddSchema, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == "student_1").first()
    if user:
        user.xp += data.amount
        if user.xp >= user.xp_to_next_level:
            user.level += 1
            user.xp_to_next_level = round(user.xp_to_next_level * 1.5)
        db.commit()
        db.refresh(user)
        return {
            "status": "success",
            "xp": user.xp,
            "level": user.level,
            "xpToNextLevel": user.xp_to_next_level
        }
    return {"status": "error"}

@router.get("/badges")
def get_badges():
    return [
        {"id": "b1", "name": "Voice Explorer", "desc": "Completed 5 voice tutoring sessions with Sharyx Voice AI", "icon": "🎙️", "unlocked": True, "unlockedAt": "2026-03-05"},
        {"id": "b2", "name": "Autonomous Learner", "desc": "Generated and completed an AI-custom course", "icon": "⚡", "unlocked": True, "unlockedAt": "2026-03-07"},
        {"id": "b3", "name": "Weakness Conqueror", "desc": "Converted a Red Weakness node into Green Mastery via Remedial Sprint", "icon": "🛡️", "unlocked": True, "unlockedAt": "2026-03-09"},
        {"id": "b4", "name": "Socratic Thinker", "desc": "Answered 10 guided reasoning questions without direct hints", "icon": "🦉", "unlocked": True, "unlockedAt": "2026-03-08"},
        {"id": "b5", "name": "Polymath Champion", "desc": "Achieved >80% mastery across 3 distinct domains", "icon": "👑", "unlocked": False}
    ]

@router.get("/peers")
def get_peer_groups():
    return [
        {"id": "peer-1", "name": "AI Engineering Sprint Pod", "members": 4, "goal": "Mastering LLMs & RAG", "avgMastery": "78%", "activeChallenge": "Build a Vector Memory Search Engine", "myRank": 2},
        {"id": "peer-2", "name": "Database Architecture Guild", "members": 5, "goal": "SQL Query Plan Mastery", "avgMastery": "69%", "activeChallenge": "Optimize Window Function Queries", "myRank": 4}
    ]
