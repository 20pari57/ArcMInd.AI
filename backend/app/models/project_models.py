from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=1)
    root_path: str = Field(..., min_length=1)


class ProjectResponse(BaseModel):
    id: str
    name: str
    root_path: str
    language_stack: List[str] = []
    created_at: datetime
    last_scanned_at: Optional[datetime] = None
    status: str = "created"


class FileMeta(BaseModel):
    path: str
    extension: str
    size: int
    hash: str


class ScanRunResponse(BaseModel):
    project_id: str
    files_scanned: int
    status: str
    message: str