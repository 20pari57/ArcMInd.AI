from pathlib import Path
from typing import Dict, List, Set
from app.utils.file_utils import read_text_file, file_hash

SUPPORTED_EXTENSIONS = {
    ".py", ".js", ".jsx", ".ts", ".tsx", ".json", ".md", ".html", ".css"
}

IGNORE_DIRS = {
    ".git", "node_modules", "venv", ".venv", "__pycache__", "dist", "build", ".next"
}


def detect_language_stack(files: List[Dict]) -> List[str]:
    found: Set[str] = set()

    for file in files:
        ext = file["extension"]
        if ext == ".py":
            found.add("python")
        elif ext in {".js", ".jsx"}:
            found.add("javascript")
        elif ext in {".ts", ".tsx"}:
            found.add("typescript")
        elif ext in {".html", ".css"}:
            found.add("frontend")
        elif ext == ".json":
            found.add("config")

    return sorted(list(found))


def scan_project(root_path: str) -> List[Dict]:
    root = Path(root_path)
    if not root.exists() or not root.is_dir():
        raise FileNotFoundError(f"Project folder not found: {root_path}")

    files = []

    for path in root.rglob("*"):
        if not path.is_file():
            continue

        if any(part in IGNORE_DIRS for part in path.parts):
            continue

        if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue

        content = read_text_file(str(path))
        relative_path = str(path.relative_to(root)).replace("\\", "/")

        files.append(
            {
                "path": relative_path,
                "absolute_path": str(path),
                "extension": path.suffix.lower(),
                "size": path.stat().st_size,
                "hash": file_hash(content),
                "content": content,
            }
        )

    return files