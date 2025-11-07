export default function Dashboard() {
  const cards = [
    { title: "Today's Prompts", value: "1,245", sub: "Yesterday 1,110" },
    { title: "Active Users", value: "342", sub: "Avg. Session 4m12s" },
    { title: "Response Accuracy", value: "94.3%", sub: "↑ Stable" },
    { title: "Token Usage", value: "920,400", sub: "Yesterday 865,100" },
  ];
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {cards.map(c => (
        <div key={c.title} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="text-slate-500 text-sm">{c.title}</div>
          <div className="text-2xl font-semibold">{c.value}</div>
          <div className="text-xs text-slate-500">{c.sub}</div>
        </div>
      ))}
      <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="font-semibold mb-2">AI Requests (Last 30 days)</div>
        <div className="h-40 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400">
          (Biểu đồ placeholder)
        </div>
      </div>
    </div>
  );
}
