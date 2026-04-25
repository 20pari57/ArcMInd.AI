import { FileCode2 } from "lucide-react";

export default function FileSummaries({ files }) {
  const list = files?.file_summaries || [];

  if (!list.length) return null;

  return (
    <section className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
      <h2 className="mb-4 text-xl font-bold text-white">File Summaries</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((file, index) => (
          <div key={index} className="rounded-2xl border border-zinc-700 bg-zinc-950/70 p-4 transition hover:border-cyan-400/50">
            <div className="mb-3 flex items-center gap-2 text-cyan-300">
              <FileCode2 size={18} />
              <h3 className="break-all text-sm font-semibold">{file.path}</h3>
            </div>

            <p className="text-sm leading-6 text-zinc-300">{file.purpose}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {(file.main_functions || []).map((fn) => (
                <span key={fn} className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
                  fn: {fn}
                </span>
              ))}

              {(file.main_classes || []).map((cls) => (
                <span key={cls} className="rounded-full bg-purple-400/10 px-2 py-1 text-xs text-purple-300">
                  class: {cls}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}