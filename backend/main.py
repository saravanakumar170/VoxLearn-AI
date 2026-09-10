# VoxLearn AI — FastAPI Backend Application
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import init_db
from backend.routers import auth, dashboard, tutor, rag, courses, assessments, knowledge, roadmaps, gamification

app = FastAPI(
    title="VoxLearn AI Backend API",
    description="Autonomous AI-Powered Adaptive Learning Ecosystem REST API",
    version="1.0.0"
)

# Enable CORS for local Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def root():
    return {
        "status": "online",
        "app": "VoxLearn AI Backend",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Include API Routers
app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(tutor.router)
app.include_router(rag.router)
app.include_router(courses.router)
app.include_router(assessments.router)
app.include_router(knowledge.router)
app.include_router(roadmaps.router)
app.include_router(gamification.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
