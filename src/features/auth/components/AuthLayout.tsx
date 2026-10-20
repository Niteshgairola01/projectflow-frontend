import type { ReactNode } from "react";
import { AuthBackground } from "./AuthBackground";
import { AuthShowcase } from "./AuthShowcase";
import { Logo } from "../../../shared/components/ui/Logo/Logo";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: Props) {
  return (
    <div className="relative isolate flex min-h-dvh bg-slate-50">
      <div className="relative isolate flex min-w-0 flex-1 items-center justify-center px-4 py-8 sm:p-10">
        <AuthBackground />
        <div className="relative w-full max-w-md rounded-3xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-violet-900/5 backdrop-blur-xl sm:p-8">
          <Logo />

          <div className="mt-8">
            <h1 className="text-3xl font-bold">{title}</h1>

            <p className="mt-2 text-gray-500">{subtitle}</p>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
      <AuthShowcase />
    </div>
  );
}
