# from typing import Dict, List
# from google import genai
# from app.config import settings

# client = genai.Client(api_key=settings.GEMINI_API_KEY)


# def summarize_file(path: str, extension: str, content: str, imports: List[str], functions: List[str], classes: List[str]) -> Dict:
#     if not settings.GEMINI_API_KEY:
#         return {
#             "path": path,
#             "purpose": "Gemini API key not configured. Local fallback summary used.",
#             "main_functions": functions,
#             "main_classes": classes,
#             "depends_on": imports,
#             "risk_notes": [],
#         }

#     shortened = content[:12000]

#     prompt = f"""
# You are analyzing a source file for a codebase memory system.

# Return valid JSON with keys:
# - path
# - purpose
# - main_functions
# - main_classes
# - depends_on
# - risk_notes

# File path: {path}
# Extension: {extension}
# Detected imports: {imports}
# Detected functions: {functions}
# Detected classes: {classes}

# File content:
# {shortened}
# """

#     try:
#         response = client.models.generate_content(
#             model=settings.GEMINI_MODEL,
#             contents=prompt,
#             config={
#                 "response_mime_type": "application/json",
#                 "response_json_schema": {
#                     "type": "object",
#                     "properties": {
#                         "path": {"type": "string"},
#                         "purpose": {"type": "string"},
#                         "main_functions": {"type": "array", "items": {"type": "string"}},
#                         "main_classes": {"type": "array", "items": {"type": "string"}},
#                         "depends_on": {"type": "array", "items": {"type": "string"}},
#                         "risk_notes": {"type": "array", "items": {"type": "string"}},
#                     },
#                     "required": ["path", "purpose", "main_functions", "main_classes", "depends_on", "risk_notes"],
#                 },
#             },
#         )
#         import json
#         return json.loads(response.text)
#     except Exception:
#         return {
#             "path": path,
#             "purpose": "Fallback summary generated after Gemini request failed.",
#             "main_functions": functions,
#             "main_classes": classes,
#             "depends_on": imports,
#             "risk_notes": [],
#         }


# def summarize_project(project_name: str, file_summaries: List[Dict]) -> Dict:
#     if not settings.GEMINI_API_KEY:
#         return {
#             "project_name": project_name,
#             "overview": f"{project_name} contains {len(file_summaries)} analyzed files.",
#             "architecture": "MVP summary without Gemini.",
#             "key_modules": [item["path"] for item in file_summaries[:10]],
#         }

#     prompt = f"""
# You are generating a high-level project summary for a reusable AI memory system.

# Return valid JSON with:
# - project_name
# - overview
# - architecture
# - key_modules

# Project name: {project_name}
# File summaries: {file_summaries[:20]}
# """

#     try:
#         response = client.models.generate_content(
#             model=settings.GEMINI_MODEL,
#             contents=prompt,
#             config={
#                 "response_mime_type": "application/json",
#                 "response_json_schema": {
#                     "type": "object",
#                     "properties": {
#                         "project_name": {"type": "string"},
#                         "overview": {"type": "string"},
#                         "architecture": {"type": "string"},
#                         "key_modules": {"type": "array", "items": {"type": "string"}},
#                     },
#                     "required": ["project_name", "overview", "architecture", "key_modules"],
#                 },
#             },
#         )
#         import json
#         return json.loads(response.text)
#     except Exception:
#         return {
#             "project_name": project_name,
#             "overview": f"{project_name} contains {len(file_summaries)} analyzed files.",
#             "architecture": "Fallback architecture summary.",
#             "key_modules": [item["path"] for item in file_summaries[:10]],
#         }




















from typing import Dict, List
from google import genai
from app.config import settings
import json
import re


client = genai.Client(api_key=settings.GEMINI_API_KEY)


def extract_json(text: str) -> Dict:
    """
    Safely extract JSON from Gemini response.
    Sometimes Gemini may return extra text or markdown.
    """
    try:
        return json.loads(text)
    except Exception:
        pass

    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(0))
        except Exception:
            pass

    raise ValueError("Could not parse Gemini JSON response")


def summarize_file(
    path: str,
    extension: str,
    content: str,
    imports: List[str],
    functions: List[str],
    classes: List[str],
) -> Dict:
    if not settings.GEMINI_API_KEY:
        return {
            "path": path,
            "purpose": "Gemini API key not configured. Local fallback summary used.",
            "main_functions": functions,
            "main_classes": classes,
            "depends_on": imports,
            "risk_notes": [],
        }

    shortened = content[:8000]

    prompt = f"""
You are ArcMind AI, a codebase memory analyzer.

Analyze this source file and return ONLY valid JSON.

Required JSON format:
{{
  "path": "{path}",
  "purpose": "short clear explanation of what this file does",
  "main_functions": [],
  "main_classes": [],
  "depends_on": [],
  "risk_notes": []
}}

Rules:
- Return JSON only.
- Do not use markdown.
- Do not explain outside JSON.
- Keep purpose concise.
- If no functions/classes exist, return empty arrays.

File path: {path}
Extension: {extension}
Detected imports: {imports}
Detected functions: {functions}
Detected classes: {classes}

File content:
{shortened}
"""

    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_json_schema": {
                    "type": "object",
                    "properties": {
                        "path": {"type": "string"},
                        "purpose": {"type": "string"},
                        "main_functions": {
                            "type": "array",
                            "items": {"type": "string"},
                        },
                        "main_classes": {
                            "type": "array",
                            "items": {"type": "string"},
                        },
                        "depends_on": {
                            "type": "array",
                            "items": {"type": "string"},
                        },
                        "risk_notes": {
                            "type": "array",
                            "items": {"type": "string"},
                        },
                    },
                    "required": [
                        "path",
                        "purpose",
                        "main_functions",
                        "main_classes",
                        "depends_on",
                        "risk_notes",
                    ],
                },
            },
        )

        data = extract_json(response.text)

        return {
            "path": data.get("path", path),
            "purpose": data.get("purpose", "No purpose returned."),
            "main_functions": data.get("main_functions", functions),
            "main_classes": data.get("main_classes", classes),
            "depends_on": data.get("depends_on", imports),
            "risk_notes": data.get("risk_notes", []),
        }

    except Exception as e:
        print(f"\nGemini file summary error in {path}: {e}\n")

        return {
            "path": path,
            "purpose": f"Fallback summary generated after Gemini request failed. Error: {str(e)}",
            "main_functions": functions,
            "main_classes": classes,
            "depends_on": imports,
            "risk_notes": [],
        }


def summarize_project(project_name: str, file_summaries: List[Dict]) -> Dict:
    if not settings.GEMINI_API_KEY:
        return {
            "project_name": project_name,
            "overview": f"{project_name} contains {len(file_summaries)} analyzed files.",
            "architecture": "MVP summary without Gemini.",
            "key_modules": [item["path"] for item in file_summaries[:10]],
        }

    clean_summaries = []

    for item in file_summaries[:20]:
        clean_summaries.append(
            {
                "path": item.get("path", ""),
                "purpose": item.get("purpose", ""),
                "depends_on": item.get("depends_on", []),
            }
        )

    prompt = f"""
You are ArcMind AI, a software architecture analyzer.

Generate a high-level project summary for this codebase memory system.

Return ONLY valid JSON.

Required JSON format:
{{
  "project_name": "{project_name}",
  "overview": "short overview of the project",
  "architecture": "clear explanation of project architecture",
  "key_modules": []
}}

Rules:
- Return JSON only.
- Do not use markdown.
- Do not write explanation outside JSON.
- key_modules must be a list of important file paths.

Project name: {project_name}

File summaries:
{json.dumps(clean_summaries, indent=2)}
"""

    try:
        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_json_schema": {
                    "type": "object",
                    "properties": {
                        "project_name": {"type": "string"},
                        "overview": {"type": "string"},
                        "architecture": {"type": "string"},
                        "key_modules": {
                            "type": "array",
                            "items": {"type": "string"},
                        },
                    },
                    "required": [
                        "project_name",
                        "overview",
                        "architecture",
                        "key_modules",
                    ],
                },
            },
        )

        data = extract_json(response.text)

        return {
            "project_name": data.get("project_name", project_name),
            "overview": data.get(
                "overview",
                f"{project_name} contains {len(file_summaries)} analyzed files.",
            ),
            "architecture": data.get("architecture", "Architecture summary unavailable."),
            "key_modules": data.get(
                "key_modules",
                [item["path"] for item in file_summaries[:10]],
            ),
        }

    except Exception as e:
        print(f"\nGemini project summary error: {e}\n")

        return {
            "project_name": project_name,
            "overview": f"{project_name} contains {len(file_summaries)} analyzed files.",
            "architecture": f"Fallback architecture summary. Error: {str(e)}",
            "key_modules": [item["path"] for item in file_summaries[:10]],
        }