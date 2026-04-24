from datetime import datetime
from typing import Any, Dict, List, Optional
from bson import ObjectId
from app.db.mongo import db


def _serialize_id(document: Dict[str, Any]) -> Dict[str, Any]:
    if not document:
        return document
    document["id"] = str(document["_id"])
    del document["_id"]
    return document


def create_project(data: Dict[str, Any]) -> Dict[str, Any]:
    payload = {
        "name": data["name"],
        "root_path": data["root_path"],
        "language_stack": [],
        "created_at": datetime.utcnow(),
        "last_scanned_at": None,
        "status": "created",
    }
    inserted = db.projects.insert_one(payload)
    project = db.projects.find_one({"_id": inserted.inserted_id})
    return _serialize_id(project)


def get_projects() -> List[Dict[str, Any]]:
    return [_serialize_id(doc) for doc in db.projects.find().sort("created_at", -1)]


def get_project(project_id: str) -> Optional[Dict[str, Any]]:
    try:
        doc = db.projects.find_one({"_id": ObjectId(project_id)})
    except Exception:
        return None
    return _serialize_id(doc) if doc else None


def delete_project(project_id: str) -> bool:
    try:
        result = db.projects.delete_one({"_id": ObjectId(project_id)})
    except Exception:
        return False
    return result.deleted_count > 0


def update_project_scan(project_id: str, language_stack: List[str], status: str) -> None:
    db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {
            "$set": {
                "language_stack": language_stack,
                "last_scanned_at": datetime.utcnow(),
                "status": status,
            }
        },
    )


def save_scan_run(project_id: str, files_scanned: int, status: str, errors: List[str]) -> Dict[str, Any]:
    payload = {
        "project_id": project_id,
        "files_scanned": files_scanned,
        "status": status,
        "errors": errors,
        "created_at": datetime.utcnow(),
    }
    inserted = db.scan_runs.insert_one(payload)
    doc = db.scan_runs.find_one({"_id": inserted.inserted_id})
    return _serialize_id(doc)


def save_file_summaries(project_id: str, summaries: List[Dict[str, Any]]) -> None:
    if not summaries:
        return
    for item in summaries:
        item["project_id"] = project_id
    db.file_summaries.delete_many({"project_id": project_id})
    db.file_summaries.insert_many(summaries)


def get_file_summaries(project_id: str) -> List[Dict[str, Any]]:
    return [_serialize_id(doc) for doc in db.file_summaries.find({"project_id": project_id})]


def save_graph_metadata(project_id: str, node_count: int, edge_count: int, graph_file: str) -> None:
    db.graphs.delete_many({"project_id": project_id})
    db.graphs.insert_one(
        {
            "project_id": project_id,
            "node_count": node_count,
            "edge_count": edge_count,
            "graph_file": graph_file,
            "created_at": datetime.utcnow(),
        }
    )


def get_graph_metadata(project_id: str) -> Optional[Dict[str, Any]]:
    doc = db.graphs.find_one({"project_id": project_id})
    return _serialize_id(doc) if doc else None


def save_handoff_prompt(project_id: str, content: str) -> None:
    db.handoff_prompts.delete_many({"project_id": project_id})
    db.handoff_prompts.insert_one(
        {
            "project_id": project_id,
            "title": "ArcMind AI handoff prompt",
            "content": content,
            "created_at": datetime.utcnow(),
        }
    )


def get_handoff_prompt(project_id: str) -> Optional[Dict[str, Any]]:
    doc = db.handoff_prompts.find_one({"project_id": project_id})
    return _serialize_id(doc) if doc else None