import type { ReactNode } from "react";
import { AuthShowcase } from "./AuthShowcase";
import { Logo } from "../../../shared/components/ui/Logo/Logo";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-md">
          <Logo />

          <div className="mt-10">
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
