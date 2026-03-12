import { supabase } from "@/lib/supabase";

export const revalidate = 60;

async function getTalent() {
  const { data } = await supabase.from("mind_studio_talent").select("*").order("name");
  return data || [];
}
async function getDeals() {
  const { data } = await supabase.from("mind_studio_deals").select("*, mind_studio_talent(name, stage_name)").order("created_at", { ascending: false }).limit(10);
  return data || [];
}
async function getContracts() {
  const { data } = await supabase.from("mind_studio_contracts").select("*, mind_studio_talent(name, stage_name)").order("created_at", { ascending: false }).limit(10);
  return data || [];
}
async function getOutreachCount() {
  const { count } = await supabase.from("mind_studio_outreach").select("*", { count: "exact", head: true });
  return count || 0;
}

const statusColors: Record<string, string> = {
  active: "text-emerald-400 border-emerald-400/30",
  signed: "text-blue-400 border-blue-400/30",
  prospect: "text-amber-400 border-amber-400/30",
  inactive: "text-white/30 border-white/10",
  draft: "text-white/40 border-white/10",
  review: "text-yellow-400 border-yellow-400/30",
  negotiating: "text-orange-400 border-orange-400/30",
  completed: "text-emerald-400 border-emerald-400/30",
};

export default async function Home() {
  const talent = await getTalent();
  const deals = await getDeals();
  const contracts = await getContracts();
  const outreachCount = await getOutreachCount();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end pb-16 px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#080808] to-[#0d0808]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <p className="font-mono text-xs tracking-[0.3em] text-violet-400/60 uppercase mb-4">Myia B — The Kollective</p>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-light">
            Mind<br/><span className="italic text-violet-400">Studio</span>
          </h1>
          <p className="mt-4 font-mono text-sm text-white/35 max-w-md">Talent management. Contract intelligence. Deal pipeline.</p>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Talent Roster", value: talent.length },
            { label: "Active Deals", value: deals.filter((d: any) => d.status !== "completed" && d.status !== "lost").length },
            { label: "Contracts", value: contracts.length },
            { label: "Outreach Contacts", value: outreachCount.toLocaleString() },
          ].map((s) => (
            <div key={s.label} className="border border-white/5 p-6">
              <p className="font-display text-3xl text-violet-400">{s.value}</p>
              <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Talent Roster */}
      <section className="px-8 py-12 max-w-6xl mx-auto border-t border-white/5">
        <h2 className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase mb-8">Talent Roster</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {talent.map((t: any) => (
            <div key={t.id} className="border border-white/5 hover:border-violet-500/20 p-6 transition-all group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-xl text-white/90 group-hover:text-violet-400 transition-colors">{t.stage_name || t.name}</h3>
                  {t.stage_name && <p className="text-xs text-white/30">{t.name}</p>}
                </div>
                <span className={`font-mono text-[9px] tracking-widest uppercase border px-2 py-1 ${statusColors[t.status] || "text-white/30 border-white/10"}`}>
                  {t.status}
                </span>
              </div>
              <p className="font-mono text-[10px] text-white/40 uppercase mt-2">{t.category}</p>
              {t.bio && <p className="text-xs text-white/30 mt-3 line-clamp-2">{t.bio}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Deals Pipeline */}
      {deals.length > 0 && (
        <section className="px-8 py-12 max-w-6xl mx-auto border-t border-white/5">
          <h2 className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase mb-8">Deal Pipeline</h2>
          <div className="space-y-3">
            {deals.map((d: any) => (
              <div key={d.id} className="border border-white/5 p-5 flex justify-between items-center hover:border-violet-500/20 transition-all">
                <div>
                  <p className="font-display text-lg text-white/80">{d.deal_name}</p>
                  <p className="font-mono text-[10px] text-white/30">{d.mind_studio_talent?.stage_name || d.mind_studio_talent?.name} · {d.deal_type}</p>
                </div>
                <div className="text-right">
                  {d.value && <p className="font-display text-lg text-violet-400">${Number(d.value).toLocaleString()}</p>}
                  <span className={`font-mono text-[9px] tracking-widest uppercase ${statusColors[d.status] || ""}`}>{d.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="px-8 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="font-mono text-[10px] text-white/20">© 2026 THE KOLLECTIVE HOSPITALITY GROUP</p>
          <p className="font-mono text-[10px] text-white/20">MIND STUDIO + LEGAL</p>
        </div>
      </footer>
    </main>
  );
}
