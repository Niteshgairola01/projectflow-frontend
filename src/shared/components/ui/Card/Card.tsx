import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: Props) {
  return (
    <div className={clsx("min-w-0 rounded-2xl bg-card text-card-foreground shadow-sm", className)}>
      {children}
    </div>
  );
}
