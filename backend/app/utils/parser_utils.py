import re
from typing import List


PY_IMPORT_RE = re.compile(r"^\s*(?:from\s+([a-zA-Z0-9_\.]+)\s+import|import\s+([a-zA-Z0-9_\. ,]+))", re.MULTILINE)
JS_IMPORT_RE = re.compile(r"""import\s+.*?\s+from\s+['"](.+?)['"]|require\(['"](.+?)['"]\)""")
PY_FUNC_RE = re.compile(r"^\s*def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(", re.MULTILINE)
PY_CLASS_RE = re.compile(r"^\s*class\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*[\(:]", re.MULTILINE)
JS_FUNC_RE = re.compile(r"(?:function\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(|const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*\(|export\s+default\s+function\s+([A-Za-z_][A-Za-z0-9_]*)\s*\()")


def extract_imports(content: str, extension: str) -> List[str]:
    imports = []

    if extension == ".py":
        for match in PY_IMPORT_RE.findall(content):
            left, right = match
            if left:
                imports.append(left)
            if right:
                imports.extend([part.strip() for part in right.split(",") if part.strip()])

    elif extension in {".js", ".jsx", ".ts", ".tsx"}:
        for match in JS_IMPORT_RE.findall(content):
            left, right = match
            if left:
                imports.append(left)
            if right:
                imports.append(right)

    return sorted(list(set(imports)))


def extract_symbols(content: str, extension: str) -> dict:
    if extension == ".py":
        return {
            "functions": PY_FUNC_RE.findall(content),
            "classes": PY_CLASS_RE.findall(content),
        }

    if extension in {".js", ".jsx", ".ts", ".tsx"}:
        matches = JS_FUNC_RE.findall(content)
        functions = []
        for a, b, c in matches:
            name = a or b or c
            if name:
                functions.append(name)
        return {
            "functions": functions,
            "classes": [],
        }

    return {"functions": [], "classes": []}