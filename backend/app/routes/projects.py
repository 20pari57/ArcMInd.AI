from fastapi import APIRouter, HTTPException
from app.models.project_models import ProjectCreate
from app.db.repositories import create_project, get_project, get_projects, delete_project

router = APIRouter()


@router.post("/create")
def create_new_project(payload: ProjectCreate):
    return create_project(payload.model_dump())


@router.get("")
def list_projects():
    return get_projects()


@router.get("/{project_id}")
def get_one_project(project_id: str):
    project = get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.delete("/{project_id}")
def remove_project(project_id: str):
    success = delete_project(project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found or delete failed")
    return {"message": "Project deleted successfully"}