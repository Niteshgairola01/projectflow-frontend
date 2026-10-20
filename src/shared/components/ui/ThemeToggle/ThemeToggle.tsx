import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = `Switch to ${theme === "light" ? "dark" : "light"} theme`;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={theme === "dark"}
      title={label}
      className="group relative inline-flex h-10 w-16 shrink-0 items-center rounded-full border border-slate-200 bg-slate-100 shadow-inner shadow-slate-200/50 transition-colors duration-300 hover:border-violet-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950/60 dark:shadow-black/20 dark:hover:border-violet-400/60"
    >
      <span aria-hidden="true" className="absolute left-[3px] top-[5px] size-7 rounded-full bg-white shadow-sm shadow-slate-400/30 ring-1 ring-black/5 transition-[transform,background-color,box-shadow] duration-300 ease-in-out motion-reduce:transition-none dark:translate-x-7 dark:bg-violet-500 dark:shadow-violet-500/25 dark:ring-violet-400/30" />
      <span aria-hidden="true" className="relative grid w-full grid-cols-2 place-items-center px-[3px]">
        <Sun size={15} strokeWidth={2} className="text-amber-600 transition-colors duration-300 motion-reduce:transition-none dark:text-slate-500" />
        <Moon size={14} strokeWidth={2} className="text-slate-400 transition-colors duration-300 motion-reduce:transition-none dark:fill-violet-100/15 dark:text-white" />
      </span>
    </button>
  );
}
