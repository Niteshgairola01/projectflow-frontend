import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import { AuthBackground } from "./AuthBackground";
import { AuthShowcase } from "./AuthShowcase";
import { Logo } from "../../../shared/components/ui/Logo/Logo";
import ThemeToggle from "../../../shared/components/ui/ThemeToggle/ThemeToggle";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: Props) {
  return (
    <div className="relative isolate flex min-h-dvh bg-background">
      <div className="relative isolate flex min-w-0 flex-1 items-center justify-center px-4 py-8 sm:p-10">
        <AuthBackground />
        <div className="relative w-full max-w-md rounded-3xl border border-white/80 bg-card/90 p-5 shadow-xl shadow-violet-900/5 backdrop-blur-xl sm:p-8 dark:border-border">
          <div className="flex items-center justify-between gap-3">
            <Logo />
            <ThemeToggle />
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-bold">{title}</h1>

            <p className="mt-2 text-muted-foreground">{subtitle}</p>

            <div className="mt-8">{children}</div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              <Link to={ROUTES.PRIVACY} className="underline underline-offset-4 hover:text-primary">Privacy policy</Link>
            </p>
          </div>
        </div>
      </div>
      <AuthShowcase />
    </div>
  );
}
