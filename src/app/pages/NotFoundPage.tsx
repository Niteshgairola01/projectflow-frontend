import { ArrowLeft, ArrowUpRight, FileQuestion, MoveUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../shared/components/ui/Logo/Logo";
import { ROUTES } from "../../shared/constants/routes";
import ThemeToggle from "../../shared/components/ui/ThemeToggle/ThemeToggle";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-background text-foreground selection:bg-violet-400/30 dark:bg-[#101020]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[18%] h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#b4abec_1px,transparent_1px),linear-gradient(90deg,#b4abec_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <svg className="absolute inset-0 h-full w-full text-violet-200" viewBox="0 0 1440 960" preserveAspectRatio="xMidYMid slice" fill="none">
          <g fill="currentColor" opacity="0.4">
            <circle cx="180" cy="230" r="1.5" /><circle cx="390" cy="150" r="1" />
            <circle cx="1110" cy="180" r="1.5" /><circle cx="1220" cy="390" r="1" />
            <circle cx="250" cy="650" r="1" /><circle cx="1050" cy="740" r="1.5" />
            <circle cx="500" cy="780" r="1" /><circle cx="920" cy="100" r="1" />
          </g>
          <path d="M296 358v10m-5-5h10M1174 626v14m-7-7h14M1000 270v8m-4-4h8" stroke="currentColor" strokeLinecap="round" opacity="0.4" />
          <ellipse cx="720" cy="1080" rx="760" ry="350" stroke="currentColor" strokeOpacity="0.08" />
          <ellipse cx="720" cy="1080" rx="890" ry="420" stroke="currentColor" strokeOpacity="0.04" />
        </svg>
      </div>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-5 py-6 sm:gap-4 sm:px-10 sm:py-8">
        <Link to={ROUTES.HOME} aria-label="ProjectFlow home" className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300">
          <Logo />
        </Link>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link to={ROUTES.HOME} aria-label="Back to app" className="inline-flex min-h-10 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-foreground sm:px-4 sm:text-sm">
            <span className="hidden sm:inline">Back to app</span><ArrowUpRight size={15} className="shrink-0" />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-8 sm:py-12">
        <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-violet-300/30 bg-violet-300/10 px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-violet-700 sm:text-xs dark:border-violet-300/15 dark:bg-violet-300/5 dark:text-violet-200">
          <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
          Error 404 · Page not found
        </p>

        <div aria-hidden="true" className="relative mb-10 flex w-full max-w-xl select-none items-center justify-center gap-2 sm:mb-12 sm:gap-4">
          <span className="bg-linear-to-b from-violet-700 via-violet-500 to-violet-300/60 bg-clip-text text-[clamp(7rem,22vw,14rem)] font-bold leading-none tracking-tighter text-transparent dark:from-white dark:via-violet-100 dark:to-violet-300/40">4</span>
          <div className="relative flex size-[clamp(6rem,20vw,12rem)] shrink-0 items-center justify-center rounded-full border border-violet-300/25 bg-radial-[at_30%_25%] from-violet-400/30 via-violet-800/20 to-[#151329] shadow-[inset_-12px_-12px_35px_rgba(0,0,0,0.5),0_0_70px_rgba(139,92,246,0.15)]">
            <div className="absolute -inset-x-6 inset-y-[30%] -rotate-35 rounded-[50%] border border-violet-300/35 shadow-[0_0_15px_rgba(167,139,250,0.08)] sm:-inset-x-10" />
            <div className="absolute inset-4 rounded-full border border-dashed border-violet-200/15 sm:inset-6" />
            <div className="relative flex size-12 rotate-12 items-center justify-center rounded-2xl border border-violet-200/25 bg-violet-200/10 text-violet-100 backdrop-blur-sm sm:size-16">
              <FileQuestion className="size-6 sm:size-8" strokeWidth={1.4} />
            </div>
            <span className="absolute -right-3 top-4 size-3 rounded-full bg-violet-200 shadow-[0_0_20px_rgba(196,181,253,0.6)] sm:-right-5 sm:top-8" />
          </div>
          <span className="bg-linear-to-b from-violet-700 via-violet-500 to-violet-300/60 bg-clip-text text-[clamp(7rem,22vw,14rem)] font-bold leading-none tracking-tighter text-transparent dark:from-white dark:via-violet-100 dark:to-violet-300/40">4</span>
        </div>

        <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">This page is out of orbit.</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          Looks like this link took a wrong turn. Let’s get you back to your people, projects, and next big idea.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <Link to={ROUTES.HOME} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300">
            Back to ProjectFlow <MoveUpRight size={17} />
          </Link>
          <button type="button" onClick={goBack} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border bg-card/50 px-6 py-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300">
            <ArrowLeft size={17} /> Go back
          </button>
        </div>
      </main>

      <footer className="relative px-5 pb-6 pt-4 text-center text-xs text-muted-foreground sm:pb-8">
        A small detour. A fresh way forward.
      </footer>
    </div>
  );
}
