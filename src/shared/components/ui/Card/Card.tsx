import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: Props) {
  return (
    <div className={clsx("rounded-2xl bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}
