import { useId, useState, type ReactNode } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";

interface CommentThreadProps {
  comment: ReactNode;
  children?: ReactNode;
  replyCount: number;
  depth?: number;
}

// Each thread expands independently; composer state stays with the caller.
const CommentThread = ({ comment, children, replyCount, depth = 0 }: CommentThreadProps) => {
  const [expanded, setExpanded] = useState(false);
  const repliesId = useId();
  return (
  <li className={depth === 0 ? "min-w-0 border-b border-border/60 pb-4 last:border-b-0 last:pb-0" : "min-w-0"}>
    {comment}
    {replyCount > 0 && (
      <div className={depth < 2 ? "relative ml-3.5 mt-2.5 rounded-bl-xl border-l border-primary/25 pl-4 sm:pl-5" : "mt-2.5 border-l border-border/60 pl-0"}>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={repliesId}
          onClick={() => setExpanded((current) => !current)}
          className="mb-2 inline-flex min-h-7 items-center gap-1.5 rounded-full bg-primary/5 px-2 text-xs font-medium text-primary transition hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <MessageSquare aria-hidden="true" size={13} />
          {expanded ? "Hide" : "View"} {replyCount} {replyCount === 1 ? "reply" : "replies"}
          <ChevronDown aria-hidden="true" size={13} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
        <ul
          id={repliesId}
          hidden={!expanded}
          aria-label="Replies"
          className={depth < 2
            ? "space-y-3 [&>li]:relative [&>li]:before:absolute [&>li]:before:-left-4 [&>li]:before:top-3.5 [&>li]:before:h-px [&>li]:before:w-3 [&>li]:before:bg-primary/25 sm:[&>li]:before:-left-5 sm:[&>li]:before:w-4"
            : "space-y-3"}
        >{expanded ? children : null}</ul>
      </div>
    )}
  </li>
  );
};

export default CommentThread;
