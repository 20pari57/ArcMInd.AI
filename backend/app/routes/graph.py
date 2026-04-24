from pathlib import Path
from fastapi import APIRouter, HTTPException
from app.config import settings
from app.db.repositories import get_project, get_graph_metadata
from app.utils.file_utils import read_json

router = APIRouter()


@router.get("/{project_id}")
def get_graph(project_id: str):
    project = get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    graph_file = Path(settings.MEMORY_DIR) / project_id / "dependency_graph.json"
    if not graph_file.exists():
        raise HTTPException(status_code=404, detail="Dependency graph not found")

    return read_json(str(graph_file))


@router.get("/meta/{project_id}")
def get_graph_meta(project_id: str):
    project = get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    meta = get_graph_metadata(project_id)
    if not meta:
        raise HTTPException(status_code=404, detail="Graph metadata not found")

    return meta