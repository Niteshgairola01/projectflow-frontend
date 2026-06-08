import type { ReactNode } from "react";
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

      <div className=" hidden lg:flex flex-1 items-center justify-center bg-linear-to-br from-[#6C63FF] to-[#4F46E5] p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-5xl font-bold leading-tight">
            Plan.
            <br />
            Collaborate.
            <br />
            Deliver.
          </h2>

          <p className="mt-6 text-lg text-white/80">
            The all-in-one project management platform for modern teams.
          </p>

          <div className="mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur">
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 rounded bg-white/20" />
              <div className="h-16 rounded bg-white/20" />
              <div className="h-16 rounded bg-white/20" />
              <div className="h-16 rounded bg-white/20" />
              <div className="h-16 rounded bg-white/20" />
              <div className="h-16 rounded bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
