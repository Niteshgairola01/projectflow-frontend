import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Card({ children }: Props) {
  return <div className="rounded-2xl bg-white shadow-sm">{children}</div>;
}
