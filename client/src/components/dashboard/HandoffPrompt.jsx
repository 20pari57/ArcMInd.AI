import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function HandoffPrompt({ handoff }) {
  const [copied, setCopied] = useState(false);

  if (!handoff?.content) return null;

  const copyText = async () => {
    await navigator.clipboard.writeText(handoff.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">AI Handoff Prompt</h2>
          <p className="text-sm text-zinc-400">Copy this and give it to ChatGPT, Gemini, or Claude.</p>
        </div>

        <button
          onClick={copyText}
          className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-300"
        >
          {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="max-h-[420px] overflow-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-sm leading-7 text-zinc-300">
        {handoff.content}
      </pre>
    </section>
  );
}