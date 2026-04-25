# ArcMind AI — Dashboard Client

> AI-powered codebase memory engine. Scan, analyze, and understand any codebase with persistent AI memory.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard runs at **http://localhost:5173**

## Environment Variables

Create a `.env` file in the client root:

```env
VITE_API_URL=http://127.0.0.1:8000
```

## Tech Stack

- **React 18** + Vite
- **Tailwind CSS v4** (CSS-based theme config)
- **Framer Motion** (animations)
- **React Flow** (dependency graph)
- **Recharts** (charts)
- **Zustand** (global state)
- **Axios** (API client)
- **React Hot Toast** (notifications)
- **Lucide React** (icons)

## Pages

| Route       | Page             | Description                                |
|-------------|------------------|--------------------------------------------|
| `/`         | Overview         | Stats, recent files, activity, graph mini  |
| `/scan`     | Scan Project     | Path input, config, pipeline, terminal log |
| `/memory`   | Memory Files     | View/download graphify_out files           |
| `/graph`    | Dependency Graph | Interactive React Flow canvas              |
| `/settings` | Settings         | API config, connection test, clear memory  |

## Demo Mode

If the FastAPI backend is unreachable, the dashboard automatically switches to **demo mode** with realistic placeholder data. A yellow "DEMO MODE" badge appears in the topbar.

## Backend

The FastAPI backend should run at `http://127.0.0.1:8000`. See the `backend/` directory for setup.

## Brand Colors

- Cyan: `#00cfff`
- Purple/Magenta: `#c44dff`
- Mid Gradient: `#7b6fff`
- Deep Navy: `#04091a`