import { Reply } from "lucide-react";
import type { PreviewComment } from "../data/dummyComments";

interface CommentItemProps {
  comment: PreviewComment;
  onReply: (comment: PreviewComment) => void;
}

const CommentItem = ({ comment, onReply }: CommentItemProps) => (
  <article className="flex min-w-0 gap-3">
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${comment.isOwn ? "bg-primary text-white" : "bg-primary/15 text-primary"}`}
    >
      {comment.author
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")}
    </span>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <h3 className="text-sm font-semibold">{comment.author}</h3>
        {comment.isOwn && (
          <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
            You
          </span>
        )}
        <time
          dateTime={comment.createdAt}
          className="text-xs text-muted-foreground"
        >
          {new Date(comment.createdAt).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </time>
        {comment.isEdited && (
          <span className="text-xs text-muted-foreground">· Edited</span>
        )}
      </div>
      <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-6 text-foreground/90">
        {comment.content}
      </p>
      <button
        type="button"
        onClick={() => onReply(comment)}
        className="mt-2 inline-flex items-center gap-1.5 rounded text-xs font-medium text-muted-foreground transition hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Reply aria-hidden="true" size={14} /> Reply
      </button>
    </div>
  </article>
);

export default CommentItem;
