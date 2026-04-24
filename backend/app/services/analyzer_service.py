from typing import Dict, List
from app.utils.parser_utils import extract_imports, extract_symbols


def analyze_files(scanned_files: List[Dict]) -> List[Dict]:
    analyzed = []

    for item in scanned_files:
        imports = extract_imports(item["content"], item["extension"])
        symbols = extract_symbols(item["content"], item["extension"])

        analyzed.append(
            {
                "path": item["path"],
                "extension": item["extension"],
                "size": item["size"],
                "hash": item["hash"],
                "imports": imports,
                "functions": symbols["functions"],
                "classes": symbols["classes"],
                "content": item["content"],
            }
        )

    return analyzed