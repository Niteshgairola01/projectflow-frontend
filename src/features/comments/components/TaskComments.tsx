import { useRef, useState } from "react";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";
import type { CommentResponse } from "../types/comment.types";
import EditComment from "./EditComment";

type ComposerMode =
  | { type: "create" }
  | { type: "reply"; comment: CommentResponse }
  | { type: "edit"; comment: CommentResponse };

const TaskComments = () => {
  const [mode, setMode] = useState<ComposerMode>({ type: "create" });
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const composerRef = useRef<HTMLDivElement>(null);
  const composerKey = mode.type === "create" ? "create" : `${mode.type}:${mode.comment._id}`;

  const setSubmitting = (value: boolean) => {
    busyRef.current = value;
    setBusy(value);
  };
  const selectMode = (next: ComposerMode) => {
    if (busyRef.current) return;
    setMode(next);
    requestAnimationFrame(() => {
      composerRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
      composerRef.current?.querySelector("textarea")?.focus({ preventScroll: true });
    });
  };
  const finish = () => {
    setDrafts((current) => {
      const next = { ...current };
      delete next[composerKey];
      return next;
    });
    setMode({ type: "create" });
  };
  const formProps = {
    initialContent: drafts[composerKey],
    onDraftChange: (content: string) => setDrafts((current) => ({ ...current, [composerKey]: content })),
    onBusyChange: setSubmitting,
    onSuccess: finish,
  };

  return (
    <div>
      <CommentsList
        onEdit={(comment) => selectMode({ type: "edit", comment })}
        onReply={(comment) => selectMode({ type: "reply", comment })}
        selectedReplyId={mode.type === "reply" ? mode.comment._id : undefined}
        composerBusy={busy}
      />
      <div ref={composerRef} className="mt-5 scroll-mt-6 border-t pt-5">
        {mode.type === "edit" ? (
          <EditComment key={composerKey} initialData={mode.comment} onCancel={() => selectMode({ type: "create" })} {...formProps} />
        ) : (
          <AddComment
            key={composerKey}
            replyTo={mode.type === "reply" ? mode.comment : undefined}
            onCancel={mode.type === "reply" ? () => selectMode({ type: "create" }) : undefined}
            {...formProps}
          />
        )}
      </div>
    </div>
  );
};

export default TaskComments;
