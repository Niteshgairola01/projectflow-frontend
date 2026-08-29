import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({
  children,
  loading,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        "h-11 rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50",
        className,
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
