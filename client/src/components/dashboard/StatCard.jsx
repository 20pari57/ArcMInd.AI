export default function StatCard({ title, value, icon: Icon, color = "text-cyan-300" }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-5 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/40">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-zinc-400">{title}</p>
        {Icon && <Icon className={color} size={22} />}
      </div>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
  );
}