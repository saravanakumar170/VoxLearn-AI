# Database Models and Connection for VoxLearn AI FastAPI Backend
import os
import json
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(DB_DIR, "voxlearn.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ─── Models ───────────────────────────────────────────────────────────────────

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="student")
    target_goal = Column(String, default="AI Engineer & Distributed Systems Specialist")
    target_role = Column(String, default="AI Engineer")
    level = Column(Integer, default=7)
    xp = Column(Integer, default=2480)
    xp_to_next_level = Column(Integer, default=3500)
    streak_days = Column(Integer, default=12)
    preferred_mode = Column(String, default="Podcast & Interactive Simulation")
    created_at = Column(DateTime, default=datetime.utcnow)

class DocumentModel(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, default="Lecture Notes")
    course = Column(String, default="General")
    content = Column(Text, nullable=False)
    upload_date = Column(String, default=lambda: datetime.utcnow().strftime("%Y-%m-%d"))

class KnowledgeNodeModel(Base):
    __tablename__ = "knowledge_nodes"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, default="student_1")
    domain = Column(String, default="Database")
    name = Column(String, nullable=False)
    mastery = Column(Integer, default=50)
    status = Column(String, default="Medium") # Mastered, Medium, Weak
    prerequisites = Column(Text, default="[]") # JSON list of node IDs

class CourseModel(Base):
    __tablename__ = "courses"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    level = Column(String, default="Beginner")
    estimated_hours = Column(Integer, default=10)
    summary = Column(Text)
    modules_json = Column(Text) # JSON string of generated modules
    created_at = Column(DateTime, default=datetime.utcnow)

class AssessmentModel(Base):
    __tablename__ = "assessments"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, default="student_1")
    concept = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    mastery_status = Column(String)
    diagnostic_analysis = Column(Text)
    specific_weakness = Column(String)
    requires_remediation = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class RemedialSessionModel(Base):
    __tablename__ = "remedial_sessions"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, default="student_1")
    weak_concept = Column(String, nullable=False)
    specific_weakness = Column(String)
    remedial_json = Column(Text)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ProjectSubmissionModel(Base):
    __tablename__ = "project_submissions"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, default="student_1")
    project_title = Column(String, nullable=False)
    submission_text = Column(Text, nullable=False)
    score = Column(Integer, default=85)
    feedback = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

# ─── Init DB ──────────────────────────────────────────────────────────────────

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Populate default user if not exists
    if not db.query(UserModel).filter(UserModel.id == "student_1").first():
        default_user = UserModel(
            id="student_1",
            name="Aarav Sharma",
            email="aarav@learnosdemo.ai",
            hashed_password="demo_password_hash",
            role="student",
            target_goal="AI Engineer & Distributed Systems Specialist",
            target_role="AI Engineer",
            level=7,
            xp=2480,
            xp_to_next_level=3500,
            streak_days=12,
            preferred_mode="Podcast & Interactive Simulation"
        )
        db.add(default_user)

    # Populate default documents if empty
    if db.query(DocumentModel).count() == 0:
        docs = [
            DocumentModel(
                id="doc-os-1",
                title="CS302: Operating Systems — Concurrency & Deadlocks",
                category="Lecture Notes",
                course="Operating Systems (CS302)",
                content="Deadlock conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Prevention invalidates conditions. Avoidance uses Banker's algorithm."
            ),
            DocumentModel(
                id="doc-dbms-1",
                title="CS304: Database Systems — ACID, Normalization & Query Execution",
                category="Textbook Extract",
                course="Database Management Systems (CS304)",
                content="ACID properties guarantee reliability. Two-Phase Locking (2PL) manages concurrency. B-Tree indexes speed up logarithmic lookups."
            ),
            DocumentModel(
                id="doc-ml-1",
                title="CS401: Machine Learning — Bias-Variance & Neural Networks",
                category="Previous Question Paper Solutions",
                course="Machine Learning (CS401)",
                content="Overfitting occurs with high variance. L1 Lasso zeroes weights; L2 Ridge shrinks weights smoothly. Dropout prevents co-adaptation."
            )
        ]
        db.add_all(docs)

    # Populate default knowledge nodes if empty
    if db.query(KnowledgeNodeModel).count() == 0:
        nodes = [
            KnowledgeNodeModel(id="node-sql-select", user_id="student_1", domain="Database", name="SELECT & Filtering", mastery=92, status="Mastered", prerequisites="[]"),
            KnowledgeNodeModel(id="node-sql-joins", user_id="student_1", domain="Database", name="JOIN Operations (Inner, Outer)", mastery=85, status="Mastered", prerequisites='["node-sql-select"]'),
            KnowledgeNodeModel(id="node-sql-groupby", user_id="student_1", domain="Database", name="GROUP BY & Aggregations", mastery=78, status="Medium", prerequisites='["node-sql-select"]'),
            KnowledgeNodeModel(id="node-sql-subqueries", user_id="student_1", domain="Database", name="Correlated Subqueries", mastery=44, status="Weak", prerequisites='["node-sql-joins", "node-sql-groupby"]'),
            KnowledgeNodeModel(id="node-sql-window", user_id="student_1", domain="Database", name="Window Functions (OVER, PARTITION)", mastery=28, status="Weak", prerequisites='["node-sql-groupby"]'),
            KnowledgeNodeModel(id="node-py-syntax", user_id="student_1", domain="Python", name="Python Basics & Data Structures", mastery=92, status="Mastered", prerequisites="[]"),
            KnowledgeNodeModel(id="node-py-recursion", user_id="student_1", domain="Python", name="Recursion & Call Stack Dynamics", mastery=52, status="Weak", prerequisites='["node-py-syntax"]'),
            KnowledgeNodeModel(id="node-ml-math", user_id="student_1", domain="Machine Learning", name="Linear Algebra & Calculus Basics", mastery=82, status="Mastered", prerequisites="[]"),
        ]
        db.add_all(nodes)

    db.commit()
    db.close()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
