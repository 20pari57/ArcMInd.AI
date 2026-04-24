from fastapi import APIRouter, HTTPException
from app.models.api_models import ScanRequest
from app.db.repositories import (
    get_project,
    update_project_scan,
    save_scan_run,
    save_file_summaries,
    save_graph_metadata,
    save_handoff_prompt,
)
from app.services.scanner_service import scan_project, detect_language_stack
from app.services.analyzer_service import analyze_files
from app.services.gemini_service import summarize_file, summarize_project
from app.services.graph_service import build_dependency_graph, graph_to_reactflow
from app.services.memory_service import generate_memory_files

router = APIRouter()


@router.post("/start")
def start_scan(payload: ScanRequest):
    project = get_project(payload.project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    try:
        scanned_files = scan_project(project["root_path"])
        analyzed_files = analyze_files(scanned_files)
        language_stack = detect_language_stack(scanned_files)

        file_summaries = []
        for item in analyzed_files:
            summary = summarize_file(
                path=item["path"],
                extension=item["extension"],
                content=item["content"],
                imports=item["imports"],
                functions=item["functions"],
                classes=item["classes"],
            )
            file_summaries.append(summary)

        project_summary = summarize_project(project["name"], file_summaries)

        graph = build_dependency_graph(analyzed_files)
        graph_data = graph_to_reactflow(graph)

        memory_files = generate_memory_files(
            project_id=payload.project_id,
            project_name=project["name"],
            project_summary=project_summary,
            file_summaries=file_summaries,
            graph_data=graph_data,
        )

        update_project_scan(payload.project_id, language_stack, "completed")
        save_scan_run(payload.project_id, len(scanned_files), "success", [])
        save_file_summaries(payload.project_id, file_summaries)
        save_graph_metadata(
            payload.project_id,
            node_count=len(graph_data["nodes"]),
            edge_count=len(graph_data["edges"]),
            graph_file=memory_files["dependency_graph_file"],
        )
        save_handoff_prompt(payload.project_id, memory_files["handoff_prompt"])

        return {
            "project_id": payload.project_id,
            "files_scanned": len(scanned_files),
            "language_stack": language_stack,
            "project_summary": project_summary,
            "memory_files": memory_files,
            "status": "success",
        }

    except FileNotFoundError as exc:
        save_scan_run(payload.project_id, 0, "failed", [str(exc)])
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:
        save_scan_run(payload.project_id, 0, "failed", [str(exc)])
        raise HTTPException(status_code=500, detail=f"Scan failed: {exc}")


@router.get("/status/{project_id}")
def scan_status(project_id: str):
    project = get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return {
        "project_id": project_id,
        "status": project["status"],
        "last_scanned_at": project.get("last_scanned_at"),
    }