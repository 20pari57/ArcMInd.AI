import { Database } from "lucide-react";

export default function MemoryFiles({ scanResult }) {
  const files = scanResult?.memory_files;

  if (!files) return null;

  const rows = [
    files.project_summary_file,
    files.file_summaries_file,
    files.dependency_graph_file,
    files.handoff_prompt_file,
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Database className="text-emerald-300" />
        <h2 className="text-xl font-bold text-white">Generated Memory Files</h2>
      </div>

      <div className="grid gap-3">
        {rows.map((file) => (
          <div key={file} className="rounded-2xl border border-zinc-700 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-300">
            {file}
          </div>
        ))}
      </div>
    </section>
  );
}