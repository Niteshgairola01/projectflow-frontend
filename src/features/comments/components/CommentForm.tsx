import { useId, useRef } from "react";
import { useForm } from "react-hook-form";
import { Send, X } from "lucide-react";
import { Button } from "../../../shared/components/ui/Button/Button";
import { Textarea } from "../../../shared/components/ui/Input/TextArea";
import { addCommentSchema, type AddCommentPayload } from "../schemas/addCommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";

export interface ComposerLifecycleProps {
  initialContent?: string;
  onDraftChange?: (content: string) => void;
  onBusyChange?: (busy: boolean) => void;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface CommentFormProps extends ComposerLifecycleProps {
  title: string;
  submitLabel: string;
  pendingLabel: string;
  contextLabel?: string;
  onSubmit: (data: AddCommentPayload) => Promise<void>;
  isSubmitting: boolean;
}

const CommentForm = ({ title, submitLabel, pendingLabel, contextLabel, onSubmit, isSubmitting, initialContent = "", onDraftChange, onBusyChange, onSuccess, onCancel }: CommentFormProps) => {
  const id = useId();
  const submittingRef = useRef(false);
  const { register, handleSubmit, formState: { errors, isSubmitting: formBusy }, reset } = useForm<AddCommentPayload>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: { content: initialContent },
  });
  const busy = isSubmitting || formBusy;
  const handleFormSubmit = async (data: AddCommentPayload) => {
    if (submittingRef.current || isSubmitting) return;
    submittingRef.current = true;
    onBusyChange?.(true);
    try {
      await onSubmit(data);
      reset({ content: "" });
      onDraftChange?.("");
      onSuccess?.();
    } catch (err) {
      notify.error(getErrorMessage(err));
    } finally {
      submittingRef.current = false;
      onBusyChange?.(false);
    }
  };

  return (
    <form onSubmit={(event) => { void handleSubmit(handleFormSubmit)(event); }} aria-busy={busy}>
      {contextLabel && (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-lg bg-primary/15 px-3 py-2 text-sm text-primary" role="status">
          <span>{contextLabel}</span>
          <button type="button" onClick={onCancel} disabled={busy} aria-label="Cancel reply" className="rounded p-1 hover:bg-primary/10 disabled:opacity-50"><X aria-hidden="true" size={16} /></button>
        </div>
      )}
      <label htmlFor={id} className={contextLabel ? "sr-only" : "mb-2 block text-sm font-medium"}>{title}</label>
      <Textarea
        id={id}
        {...register("content", { onChange: (event) => onDraftChange?.(event.target.value) })}
        error={errors.content?.message}
        aria-invalid={Boolean(errors.content)}
        placeholder={contextLabel ? "Write a reply…" : "Write a comment…"}
        rows={3}
        disabled={busy}
        onKeyDown={(event) => {
          if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">Ctrl / ⌘ + Enter to post</span>
        <div className="flex items-center gap-3">
          {onCancel && <button type="button" disabled={busy} className="rounded-xl border px-4 py-2 text-sm disabled:opacity-50" onClick={onCancel}>Cancel</button>}
          <Button type="submit" disabled={busy} className="inline-flex items-center gap-2"><Send aria-hidden="true" size={15} />{busy ? pendingLabel : submitLabel}</Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
