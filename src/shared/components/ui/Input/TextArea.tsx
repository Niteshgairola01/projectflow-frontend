import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

import clsx from "clsx";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        <textarea
          ref={ref}
          {...props}
          className={clsx(
            "min-h-24 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20",
            className
          )}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
