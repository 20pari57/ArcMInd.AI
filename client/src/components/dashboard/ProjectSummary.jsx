export default function ProjectSummary({ summary }) {
  if (!summary) return null;

  return (
    <section className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
      <h2 className="mb-4 text-xl font-bold text-white">Project Summary</h2>

      <div className="space-y-4 text-sm">
        <div>
          <p className="text-zinc-500">Project</p>
          <p className="text-lg font-semibold text-cyan-300">{summary.project_name}</p>
        </div>

        <div>
          <p className="text-zinc-500">Overview</p>
          <p className="mt-1 leading-7 text-zinc-300">{summary.overview}</p>
        </div>

        <div>
          <p className="text-zinc-500">Architecture</p>
          <p className="mt-1 leading-7 text-zinc-300">{summary.architecture}</p>
        </div>

        <div>
          <p className="text-zinc-500">Key Modules</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {summary.key_modules?.map((item) => (
              <span key={item} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}