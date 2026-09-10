from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid
from backend.database import get_db, UserModel

router = APIRouter(prefix="/api/auth", tags=["auth"])

class UserRegisterSchema(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "student"
    targetGoal: Optional[str] = "AI Engineer & Distributed Systems Specialist"

class UserLoginSchema(BaseModel):
    email: str
    password: str

class ProfileUpdateSchema(BaseModel):
    name: Optional[str] = None
    targetGoal: Optional[str] = None
    targetRole: Optional[str] = None
    preferredMode: Optional[str] = None

@router.post("/register")
def register(user_data: UserRegisterSchema, db: Session = Depends(get_db)):
    existing = db.query(UserModel).filter(UserModel.email == user_data.email).first()
    if existing:
        return {
            "status": "success",
            "token": f"token_{existing.id}",
            "user": {
                "id": existing.id,
                "name": existing.name,
                "email": existing.email,
                "role": existing.role,
                "targetGoal": existing.target_goal,
                "level": existing.level,
                "xp": existing.xp,
                "streakDays": existing.streak_days
            }
        }
    
    new_id = f"user_{uuid.uuid4().hex[:8]}"
    new_user = UserModel(
        id=new_id,
        name=user_data.name,
        email=user_data.email,
        hashed_password=user_data.password, # Hash in production
        role=user_data.role,
        target_goal=user_data.targetGoal
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "status": "success",
        "token": f"token_{new_user.id}",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role,
            "targetGoal": new_user.target_goal,
            "level": new_user.level,
            "xp": new_user.xp,
            "streakDays": new_user.streak_days
        }
    }

@router.post("/login")
def login(login_data: UserLoginSchema, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == login_data.email).first()
    if not user:
        # Fallback for demo login
        user = db.query(UserModel).filter(UserModel.id == "student_1").first()

    return {
        "status": "success",
        "token": f"token_{user.id}",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "targetGoal": user.target_goal,
            "level": user.level,
            "xp": user.xp,
            "streakDays": user.streak_days
        }
    }

@router.get("/me")
def get_current_user(db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == "student_1").first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "targetGoal": user.target_goal,
        "targetRole": user.target_role,
        "level": user.level,
        "xp": user.xp,
        "xpToNextLevel": user.xp_to_next_level,
        "streakDays": user.streak_days,
        "preferredMode": user.preferred_mode
    }

@router.put("/profile")
def update_profile(profile_data: ProfileUpdateSchema, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == "student_1").first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if profile_data.name: user.name = profile_data.name
    if profile_data.targetGoal: user.target_goal = profile_data.targetGoal
    if profile_data.targetRole: user.target_role = profile_data.targetRole
    if profile_data.preferredMode: user.preferred_mode = profile_data.preferredMode

    db.commit()
    db.refresh(user)

    return {
        "status": "success",
        "user": {
            "id": user.id,
            "name": user.name,
            "targetGoal": user.target_goal,
            "targetRole": user.target_role,
            "preferredMode": user.preferred_mode
        }
    }
