import { useState, type ReactNode } from "react";
import { useGetTaskComments } from "../hooks/useGetTaskComments";
import type { CommentResponse, CommentThreadResponse } from "../types/comment.types";
import Comment from "./Comment";
import CommentThread from "./CommentThread";

interface CommentListProps {
  onEdit: (comment: CommentResponse) => void;
  onReply: (comment: CommentResponse) => void;
  selectedReplyId?: string;
  composerBusy: boolean;
}

const CommentsList = ({ onEdit, onReply, selectedReplyId, composerBusy }: CommentListProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { data: comments = [], isLoading, isError } = useGetTaskComments();

  const mainComments = comments.filter((comment) => !comment.parentComment);
  const repliesByParent = new Map<string, CommentThreadResponse[]>();
  for (const comment of comments) {
    if (!comment.parentComment) continue;
    const replies = repliesByParent.get(comment.parentComment) ?? [];
    replies.push(comment);
    repliesByParent.set(comment.parentComment, replies);
  }

  // Fallback for genuinely missing records; deleted ancestors arrive as placeholders.
  const commentIds = new Set(comments.map((comment) => comment._id));
  const missingParentIds = [...repliesByParent.keys()].filter((id) => !commentIds.has(id));

  const renderThread = (comment: CommentThreadResponse, depth = 0): ReactNode => {
    const replies = repliesByParent.get(comment._id) ?? [];
    return (
      <CommentThread
        key={comment._id}
        depth={depth}
        replyCount={replies.length}
        comment={comment.isDeleted ? (
          <p className="flex min-h-7 items-center gap-2 text-sm italic text-muted-foreground">
            <span aria-hidden="true" className="h-7 w-7 shrink-0 rounded-full bg-muted" />
            Comment deleted
          </p>
        ) : (
          <Comment
            comment={comment}
            setOpenMenuId={setOpenMenuId}
            openMenuId={openMenuId}
            onEdit={onEdit}
            onReply={onReply}
            selectedReplyId={selectedReplyId}
            composerBusy={composerBusy}
          />
        )}
      >
        {replies.map((reply) => renderThread(reply, depth + 1))}
      </CommentThread>
    );
  };

  if (isLoading) {
    return (
      <div>
        <h6 className="mb-2">All Comments</h6>
        <div className="w-full ps-2 text-gray-500">Loading comments...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h6 className="mb-2">All Comments</h6>
        <div className="w-full ps-2 text-gray-500">Unable to load comments</div>
      </div>
    );
  }

  const activeCommentCount = comments.filter((comment) => !comment.isDeleted).length;

  if (activeCommentCount === 0) {
    return (
      <div>
        <h6 className="mb-2">All Comments</h6>
        <div className="w-full ps-2 text-gray-500">No comment found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex justify-start items-center">
        <h5 className="font-bold">All Comments</h5>

        {comments?.length > 0 && (
          <span className="ms-3 py-1 px-2 bg-muted flex shrink-0 items-center justify-center text-xs font-semibold border border-primary rounded-full">
            {activeCommentCount}
          </span>
        )}
      </div>

      <hr className="mb-4" />

      <ul className="space-y-4">
        {mainComments.map((comment) => renderThread(comment))}
        {missingParentIds.map((parentId) => (
          <CommentThread
            key={`missing:${parentId}`}
            replyCount={repliesByParent.get(parentId)?.length ?? 0}
            comment={<p className="text-sm italic text-muted-foreground">Original comment is no longer available.</p>}
          >
            {repliesByParent.get(parentId)?.map((reply) => renderThread(reply, 1))}
          </CommentThread>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
