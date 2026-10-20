import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ title, description, open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-6">
      <div data-modal-card className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl border bg-white shadow-xl sm:max-h-[calc(100dvh-3rem)]">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b p-4 sm:p-6">
          <div className="min-w-0 [overflow-wrap:anywhere]">
            <h2 className="text-xl font-semibold">{title}</h2>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <button type="button" aria-label="Close dialog" className="shrink-0 rounded-lg p-1 hover:bg-muted" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 min-w-0 overflow-y-auto overscroll-contain p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
