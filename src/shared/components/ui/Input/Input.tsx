import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="min-w-0 space-y-1">
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}

        <input
          ref={ref}
          {...props}
          className={clsx(
            "h-11 w-full min-w-0 max-w-full rounded-lg border bg-background px-3 text-foreground placeholder:text-muted-foreground outline-none focus:focus:ring-2 focus:ring-primary/20",
            className
          )}
        />
        
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
