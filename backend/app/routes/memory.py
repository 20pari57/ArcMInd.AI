from pathlib import Path
from fastapi import APIRouter, HTTPException
from app.config import settings
from app.db.repositories import get_project, get_file_summaries, get_handoff_prompt
from app.utils.file_utils import read_json

router = APIRouter()


@router.get("/project/{project_id}")
def get_project_memory(project_id: str):
    project = get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    path = Path(settings.MEMORY_DIR) / project_id / "project_summary.json"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Project summary not found")

    return read_json(str(path))


@router.get("/files/{project_id}")
def get_files_memory(project_id: str):
    project = get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    summaries = get_file_summaries(project_id)
    return {"project_id": project_id, "file_summaries": summaries}


@router.get("/handoff/{project_id}")
def get_handoff(project_id: str):
    project = get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    prompt = get_handoff_prompt(project_id)
    if not prompt:
        raise HTTPException(status_code=404, detail="Handoff prompt not found")

    return prompt