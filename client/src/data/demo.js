// ── Realistic demo data when backend is offline ──

export const demoStats = {
  totalFiles: 247,
  totalFunctions: 1832,
  totalDeps: 64,
  totalScans: 12,
};

export const demoRecentFiles = [
  { name: 'main.py', path: 'src/main.py', ext: 'py', size: '4.2 KB', modified: '2 min ago', status: 'analyzed' },
  { name: 'api_routes.py', path: 'src/api/routes.py', ext: 'py', size: '8.1 KB', modified: '5 min ago', status: 'analyzed' },
  { name: 'App.tsx', path: 'src/App.tsx', ext: 'tsx', size: '3.7 KB', modified: '12 min ago', status: 'analyzed' },
  { name: 'database.py', path: 'src/db/database.py', ext: 'py', size: '2.9 KB', modified: '18 min ago', status: 'pending' },
  { name: 'utils.js', path: 'src/utils/helpers.js', ext: 'js', size: '1.4 KB', modified: '25 min ago', status: 'analyzed' },
  { name: 'config.json', path: 'config.json', ext: 'json', size: '892 B', modified: '1 hr ago', status: 'analyzed' },
  { name: 'README.md', path: 'README.md', ext: 'md', size: '5.6 KB', modified: '2 hr ago', status: 'analyzed' },
  { name: 'package.json', path: 'package.json', ext: 'json', size: '1.1 KB', modified: '3 hr ago', status: 'analyzed' },
];

export const demoActivity = [
  { id: 1, type: 'scan', message: 'Full project scan completed', time: '2 min ago', status: 'success' },
  { id: 2, type: 'analyze', message: 'AI summaries generated for 47 files', time: '5 min ago', status: 'success' },
  { id: 3, type: 'graph', message: 'Dependency graph rebuilt (64 nodes)', time: '8 min ago', status: 'success' },
  { id: 4, type: 'memory', message: 'Memory snapshot saved to disk', time: '10 min ago', status: 'success' },
  { id: 5, type: 'scan', message: 'Incremental scan: 3 files changed', time: '1 hr ago', status: 'info' },
  { id: 6, type: 'error', message: 'Failed to parse binary: image.png', time: '1 hr ago', status: 'warning' },
  { id: 7, type: 'analyze', message: 'Gemini rate limit — retrying in 30s', time: '2 hr ago', status: 'warning' },
  { id: 8, type: 'scan', message: 'Initial project scan started', time: '3 hr ago', status: 'info' },
];

export const demoMemoryFiles = [
  {
    id: 'project_summary',
    name: 'project_summary.md',
    type: 'summary',
    size: '12.4 KB',
    description: 'Complete project overview with architecture, tech stack, and key patterns.',
    content: `# Project Summary: ArcMind AI\n\n## Architecture\nFastAPI backend with React frontend, MongoDB for persistence.\n\n## Key Patterns\n- Service layer architecture\n- Dependency injection via FastAPI\n- React hooks for state management\n\n## Tech Stack\n- Python 3.11, FastAPI, Pydantic\n- React 18, Tailwind CSS, Framer Motion\n- MongoDB, Redis for caching`,
  },
  {
    id: 'file_summaries',
    name: 'file_summaries.json',
    type: 'summaries',
    size: '48.2 KB',
    description: 'AI-generated summaries for every analyzed source file.',
    content: `{\n  "src/main.py": "FastAPI application entry point with CORS, routers, and lifecycle management.",\n  "src/api/routes.py": "REST API endpoints for scan, memory, graph, and project operations."\n}`,
  },
  {
    id: 'dependency_graph',
    name: 'dependency_graph.json',
    type: 'graph',
    size: '8.7 KB',
    description: 'Full dependency graph with nodes, edges, and relationship metadata.',
    content: `{\n  "nodes": 64,\n  "edges": 128,\n  "clusters": ["core", "api", "utils", "config"]\n}`,
  },
  {
    id: 'handoff_prompt',
    name: 'handoff_prompt.txt',
    type: 'prompt',
    size: '6.1 KB',
    description: 'AI handoff prompt ready for ChatGPT, Gemini, or Claude.',
    content: `You are an AI assistant helping with the ArcMind AI codebase.\n\nThe project is a FastAPI + React application that scans codebases, generates AI summaries, builds dependency graphs, and creates persistent memory for AI assistants.\n\nKey files:\n- src/main.py: Application entry\n- src/scanner.py: File scanning engine\n- src/analyzer.py: Gemini AI analysis\n- src/graph.py: Dependency graph builder`,
  },
];

export const demoGraphNodes = [
  { id: '1', type: 'custom', position: { x: 400, y: 50 }, data: { label: 'main.py', type: 'core', functions: 4, lines: 120 } },
  { id: '2', type: 'custom', position: { x: 150, y: 200 }, data: { label: 'scanner.py', type: 'module', functions: 8, lines: 245 } },
  { id: '3', type: 'custom', position: { x: 400, y: 200 }, data: { label: 'analyzer.py', type: 'module', functions: 6, lines: 189 } },
  { id: '4', type: 'custom', position: { x: 650, y: 200 }, data: { label: 'graph.py', type: 'module', functions: 5, lines: 156 } },
  { id: '5', type: 'custom', position: { x: 100, y: 380 }, data: { label: 'file_utils.py', type: 'util', functions: 12, lines: 87 } },
  { id: '6', type: 'custom', position: { x: 350, y: 380 }, data: { label: 'api_routes.py', type: 'core', functions: 10, lines: 312 } },
  { id: '7', type: 'custom', position: { x: 600, y: 380 }, data: { label: 'config.py', type: 'config', functions: 2, lines: 45 } },
  { id: '8', type: 'custom', position: { x: 200, y: 530 }, data: { label: 'models.py', type: 'module', functions: 7, lines: 134 } },
  { id: '9', type: 'custom', position: { x: 500, y: 530 }, data: { label: 'database.py', type: 'module', functions: 5, lines: 98 } },
  { id: '10', type: 'custom', position: { x: 750, y: 380 }, data: { label: 'gemini_client.py', type: 'external', functions: 3, lines: 67 } },
];

export const demoGraphEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e1-4', source: '1', target: '4', animated: true },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e3-10', source: '3', target: '10' },
  { id: 'e1-6', source: '1', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e6-9', source: '6', target: '9' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e3-7', source: '3', target: '7' },
  { id: 'e8-9', source: '8', target: '9' },
];

export const demoScanLogs = [
  { type: 'info', message: '[SCAN] Initializing project scanner...', time: '00:00.0' },
  { type: 'info', message: '[SCAN] Reading project structure from /src', time: '00:00.2' },
  { type: 'ok', message: '[SCAN] Found 247 scannable files', time: '00:01.1' },
  { type: 'info', message: '[FILTER] Skipping node_modules/ (12,847 files)', time: '00:01.3' },
  { type: 'info', message: '[FILTER] Skipping .git/ (342 files)', time: '00:01.4' },
  { type: 'ok', message: '[ANALYZE] Processing main.py (4.2 KB)', time: '00:02.8' },
  { type: 'ok', message: '[ANALYZE] Processing scanner.py (6.1 KB)', time: '00:04.2' },
  { type: 'ok', message: '[ANALYZE] Processing analyzer.py (5.3 KB)', time: '00:05.7' },
  { type: 'warn', message: '[WARN] Large file detected: bundle.min.js (2.1 MB) — skipping', time: '00:06.1' },
  { type: 'ok', message: '[GEMINI] Generating summary for main.py', time: '00:08.4' },
  { type: 'ok', message: '[GEMINI] Generating summary for scanner.py', time: '00:10.2' },
  { type: 'ok', message: '[GEMINI] Generating summary for analyzer.py', time: '00:12.1' },
  { type: 'info', message: '[GRAPH] Building dependency graph...', time: '00:14.0' },
  { type: 'ok', message: '[GRAPH] Mapped 64 nodes, 128 edges', time: '00:15.3' },
  { type: 'ok', message: '[MEMORY] Writing project_summary.md', time: '00:16.1' },
  { type: 'ok', message: '[MEMORY] Writing file_summaries.json', time: '00:16.4' },
  { type: 'ok', message: '[MEMORY] Writing dependency_graph.json', time: '00:16.7' },
  { type: 'ok', message: '[MEMORY] Writing handoff_prompt.txt', time: '00:17.0' },
  { type: 'ok', message: '[DONE] Scan complete — 247 files processed in 17.0s', time: '00:17.0' },
];
