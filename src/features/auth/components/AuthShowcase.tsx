import { ArrowUpRight, Check, Circle, Layers3, MoreHorizontal, Plus } from "lucide-react";

const columns = [
  {
    name: "To do", dot: "bg-slate-300", count: "03",
    tasks: [{ title: "Map the next big idea", label: "Planning", color: "bg-violet-50 text-violet-600", initials: "AK", avatar: "bg-violet-100 text-violet-700" }],
  },
  {
    name: "In progress", dot: "bg-amber-400", count: "02",
    tasks: [{ title: "Bring the details to life", label: "Design", color: "bg-amber-50 text-amber-700", initials: "JD", avatar: "bg-orange-100 text-orange-700" }],
  },
  {
    name: "Done", dot: "bg-emerald-400", count: "05",
    tasks: [{ title: "Make something great", label: "Milestone", color: "bg-emerald-50 text-emerald-700", initials: "MS", avatar: "bg-emerald-100 text-emerald-700" }],
  },
];

export function AuthShowcase() {
  return (
    <aside className="relative hidden flex-1 overflow-hidden bg-[#191735] lg:flex lg:items-center lg:justify-center">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-32 size-[580px] rounded-full bg-violet-500/20 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 size-[520px] rounded-full bg-indigo-500/15 blur-[100px]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 w-full max-w-[720px] px-10 py-14 xl:px-14">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] text-violet-200 uppercase">
          <Layers3 size={13} /> A little structure. A lot of possibility.
        </div>
        <h2 className="max-w-lg text-[clamp(2.5rem,3.5vw,3.75rem)] font-semibold leading-[1.1] tracking-tight text-white">
          Big ideas.<br />
          <span className="text-violet-300">Beautifully in sync.</span>
        </h2>
        <p className="mt-5 max-w-sm text-base leading-7 text-slate-300">
          Give your team a place to plan, find their flow, and turn the next big idea into a job well done.
        </p>

        <div aria-hidden="true" className="relative mt-10 mb-10 select-none">
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#f7f8fc] shadow-[0_24px_70px_-18px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600"><Layers3 size={18} /></div>
                <div><p className="text-sm font-semibold text-slate-800">The next chapter</p><p className="mt-0.5 text-[10px] text-slate-400">Team workspace / Projects</p></div>
              </div>
              <MoreHorizontal size={18} className="text-slate-400" />
            </div>
            <div className="px-5 pt-4 pb-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-violet-600"><span className="size-1.5 rounded-full bg-violet-500" /> Project board</div>
                <div className="flex -space-x-1.5">{["bg-violet-200", "bg-orange-200", "bg-emerald-200"].map((color, i) => <span key={color} className={`flex size-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-semibold text-slate-700 ${color}`}>{["AK", "JD", "MS"][i]}</span>)}</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {columns.map((column, index) => (
                  <div key={column.name} className="min-w-0">
                    <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold text-slate-600"><span className={`size-1.5 shrink-0 rounded-full ${column.dot}`} />{column.name}<span className="ml-auto text-[9px] font-normal text-slate-400">{column.count}</span></div>
                    {column.tasks.map(task => (
                      <div key={task.title} className="rounded-xl border border-slate-200/70 bg-white p-3 shadow-sm">
                        <span className={`inline-block rounded-md px-1.5 py-1 text-[8px] font-medium ${task.color}`}>{task.label}</span>
                        <p className="mt-2.5 min-h-10 text-[11px] font-semibold leading-4 text-slate-700">{task.title}</p>
                        {index === 1 && <div className="mt-2 flex gap-1"><span className="h-1 flex-1 rounded-full bg-violet-400" /><span className="h-1 flex-1 rounded-full bg-violet-400" /><span className="h-1 flex-1 rounded-full bg-slate-100" /></div>}
                        <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-2"><span className={`flex size-5 items-center justify-center rounded-full text-[7px] font-semibold ${task.avatar}`}>{task.initials}</span>{index === 2 ? <Check size={12} className="text-emerald-500" /> : <Circle size={11} className="text-slate-300" />}</div>
                      </div>
                    ))}
                    <div className="mt-2.5 flex items-center gap-1 px-1 text-[9px] text-slate-400"><Plus size={11} /> Add task</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -right-3 -bottom-5 flex items-center gap-3 rounded-xl border border-white/70 bg-white px-4 py-3 shadow-xl xl:-right-5">
            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check size={16} /></span>
            <div><p className="text-xs font-semibold text-slate-800">One step closer.</p><p className="mt-0.5 text-[10px] text-slate-400">Small wins. Shared momentum.</p></div>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2 text-xs text-slate-400"><span className="h-px w-8 bg-violet-300/30" />Your people. Your projects. One place.<ArrowUpRight size={14} className="text-violet-300" /></div>
      </div>
    </aside>
  );
}
