export function AuthBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-violet-100 via-slate-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />
      <div className="absolute -left-32 -top-24 size-96 rounded-full bg-violet-300/35 blur-3xl dark:bg-violet-500/15" />
      <div className="absolute -bottom-24 -right-32 size-96 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/15" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#a5a0da_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_45%,black)]" />

      <svg className="absolute -right-12 top-8 h-56 w-64 text-violet-400/35 sm:right-8 sm:top-12" viewBox="0 0 256 224" fill="none">
        <circle cx="160" cy="96" r="78" stroke="currentColor" strokeWidth="1" />
        <circle cx="160" cy="96" r="100" stroke="currentColor" strokeDasharray="4 8" />
        <g transform="rotate(12 128 112)">
          <rect x="40" y="76" width="160" height="100" rx="16" fill="white" fillOpacity="0.5" stroke="currentColor" />
          <rect x="56" y="94" width="24" height="24" rx="7" fill="currentColor" fillOpacity="0.2" />
          <path d="m63 106 4 4 7-8M94 100h76M94 112h48M56 136h112M56 150h80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <circle cx="64" cy="44" r="6" fill="currentColor" />
        <path d="M218 178v16m-8-8h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <svg className="absolute -bottom-6 -left-16 h-64 w-72 text-indigo-400/30 sm:bottom-8 sm:left-4" viewBox="0 0 288 256" fill="none">
        <path d="M-20 200C44 200 32 80 112 80s56 112 144 112" stroke="currentColor" strokeDasharray="5 8" strokeWidth="2" />
        <g transform="rotate(-14 144 128)">
          <rect x="64" y="72" width="156" height="112" rx="18" fill="white" fillOpacity="0.5" stroke="currentColor" />
          <rect x="82" y="90" width="48" height="7" rx="3.5" fill="currentColor" />
          <rect x="82" y="112" width="32" height="50" rx="7" fill="currentColor" fillOpacity="0.12" />
          <rect x="126" y="112" width="32" height="50" rx="7" fill="currentColor" fillOpacity="0.2" />
          <rect x="170" y="112" width="32" height="50" rx="7" fill="currentColor" fillOpacity="0.3" />
        </g>
        <circle cx="244" cy="64" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M48 48v16m-8-8h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
