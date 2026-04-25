import { FolderSearch, PlayCircle } from "lucide-react";

export default function ProjectForm({
  projectName,
  setProjectName,
  rootPath,
  setRootPath,
  onCreate,
  onScan,
  loading,
  projectId,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white">Start Codebase Scan</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Create a project, scan your codebase, and generate reusable AI memory.
        </p>
      </div>

      <div className="grid gap-4">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name e.g. EchoCare"
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
        />

        <input
          value={rootPath}
          onChange={(e) => setRootPath(e.target.value)}
          placeholder="C:/Users/misti/OneDrive/Desktop/projects By Arijita/Echocare"
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onCreate}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:opacity-50"
          >
            <FolderSearch size={20} />
            Create Project
          </button>

          <button
            onClick={onScan}
            disabled={loading || !projectId}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-black transition hover:bg-emerald-300 disabled:opacity-50"
          >
            <PlayCircle size={20} />
            Start Scan
          </button>
        </div>

        {projectId && (
          <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-300">
            Project ID: {projectId}
          </p>
        )}

        {loading && (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-sm text-cyan-300 animate-pulse">
            ArcMind is scanning and generating memory...
          </div>
        )}
      </div>
    </section>
  );
}