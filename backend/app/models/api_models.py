from pydantic import BaseModel, Field
from typing import Any, Dict, List, Optional


class ScanRequest(BaseModel):
    project_id: str


class MessageResponse(BaseModel):
    message: str


class GraphResponse(BaseModel):
    project_id: str
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


class MemoryResponse(BaseModel):
    project_id: str
    project_summary: Optional[Dict[str, Any]] = None
    file_summaries: List[Dict[str, Any]] = []
    handoff_prompt: Optional[str] = None