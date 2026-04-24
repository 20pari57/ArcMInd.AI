from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.projects import router as projects_router
from app.routes.scan import router as scan_router
from app.routes.memory import router as memory_router
from app.routes.graph import router as graph_router

app = FastAPI(
    title="ArcMind AI Backend",
    description="Persistent codebase memory backend for ArcMind AI",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects_router, prefix="/projects", tags=["Projects"])
app.include_router(scan_router, prefix="/scan", tags=["Scan"])
app.include_router(memory_router, prefix="/memory", tags=["Memory"])
app.include_router(graph_router, prefix="/graph", tags=["Graph"])


@app.get("/")
def root():
    return {"message": "ArcMind backend running"}


@app.get("/health")
def health():
    return {"status": "ok"}