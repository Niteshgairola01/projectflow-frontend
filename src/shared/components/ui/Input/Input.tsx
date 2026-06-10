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
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        <input
          ref={ref}
          {...props}
          className={clsx(
            "h-11 w-full rounded-lg border border-gray-200 px-3 outline-none focus:border-primary",
            className
          )}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
