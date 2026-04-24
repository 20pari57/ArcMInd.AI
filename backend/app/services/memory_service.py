from pathlib import Path
from typing import Dict, List
from app.config import settings
from app.utils.file_utils import ensure_dir, write_json, write_text


def build_handoff_prompt(project_summary: Dict, file_summaries: List[Dict]) -> str:
    important_files = "\n".join([f"- {item['path']}: {item.get('purpose', '')}" for item in file_summaries[:15]])

    return f"""You are continuing work on the following codebase.

Project: {project_summary.get('project_name', 'Unknown')}
Overview: {project_summary.get('overview', '')}
Architecture: {project_summary.get('architecture', '')}

Important files:
{important_files}

Use this memory to continue the project without asking the user to re-explain the codebase.
"""


def generate_memory_files(project_id: str, project_name: str, project_summary: Dict, file_summaries: List[Dict], graph_data: Dict) -> Dict:
    base_dir = Path(settings.MEMORY_DIR) / project_id
    ensure_dir(str(base_dir))

    project_summary_path = base_dir / "project_summary.json"
    file_summaries_path = base_dir / "file_summaries.json"
    dependency_graph_path = base_dir / "dependency_graph.json"
    handoff_prompt_path = base_dir / "ai_handoff_prompt.md"

    write_json(str(project_summary_path), project_summary)
    write_json(str(file_summaries_path), file_summaries)
    write_json(str(dependency_graph_path), graph_data)

    handoff_prompt = build_handoff_prompt(project_summary, file_summaries)
    write_text(str(handoff_prompt_path), handoff_prompt)

    return {
        "project_summary_file": str(project_summary_path).replace("\\", "/"),
        "file_summaries_file": str(file_summaries_path).replace("\\", "/"),
        "dependency_graph_file": str(dependency_graph_path).replace("\\", "/"),
        "handoff_prompt_file": str(handoff_prompt_path).replace("\\", "/"),
        "handoff_prompt": handoff_prompt,
    }