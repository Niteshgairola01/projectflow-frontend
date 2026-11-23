import { formatDistanceToNow } from "date-fns";
import type { CommentResponse } from "../types/comment.types";
import { MoreHorizontal, Pencil, Reply, Trash2 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import ConfirmModal from "../../../shared/components/ui/Modal/ConfirmModal";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";

interface CommentProps {
  comment: CommentResponse;
  setOpenMenuId: Dispatch<SetStateAction<string | null>>;
  openMenuId: string | null;
  onEdit: (comment: CommentResponse) => void;
  onReply: (comment: CommentResponse) => void;
  selectedReplyId?: string;
  composerBusy: boolean;
}

const Comment = ({
  comment,
  setOpenMenuId,
  openMenuId,
  onEdit,
  onReply,
  selectedReplyId,
  composerBusy,
}: CommentProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const { mutateAsync, isPending: isDeletingComment } = useDeleteComment();

  const user = useAppSelector((state) => state?.auth?.user);
  const { can, isLoading } = usePermissions();

  const isAuthor = Boolean(user?._id) && comment.author._id === user?._id;
  const isAvailable = !isLoading && !comment.isDeleted;

  const canEdit = isAvailable && isAuthor && can(PERMISSIONS.COMMENT_EDIT);
  const canDelete = isAvailable && isAuthor && can(PERMISSIONS.COMMENT_DELETE);

  const handleOpenMenu = () => {
    setOpenMenuId((current) => current === comment._id ? null : comment._id);
  };

  const handleDeleteComment = async () => {
    try {
      await mutateAsync({ commentId: comment._id });
      setIsDeleteOpen(false);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
    }
  };

  return (
    <div className={`flex min-w-0 items-start gap-2.5 rounded-lg transition-colors ${selectedReplyId === comment._id ? "bg-primary/5 ring-1 ring-primary/15" : ""}`}>
      {/* Profile */}
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white"
      >
        {comment.author.name?.trim()?.charAt(0)?.toUpperCase() ?? ""}
      </span>

      {/* Comment Section */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap justify-start items-center gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold">{comment.author?.name}</span>

          <span className="text-xs text-muted-foreground">
            <time dateTime={comment.createdAt}>
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </time>
          </span>

          {comment.isEdited && (
            <div className="flex gap-2 justify-start items-center">
              <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
              <span className="text-xs text-muted-foreground font-semibold">
                Edited
              </span>
            </div>
          )}
        </div>

        <div className="mt-0.5 whitespace-pre-wrap wrap-break-word text-sm leading-5">
          {comment.content}
        </div>

        {!comment.isDeleted && (
          <Can permission={PERMISSIONS.COMMENT_ADD}>
            <button
              type="button"
              disabled={composerBusy}
              aria-pressed={selectedReplyId === comment._id}
              onClick={() => { setOpenMenuId(null); onReply(comment); }}
              className={`mt-0.5 inline-flex min-h-7 items-center gap-1 rounded-md px-1.5 text-xs font-medium transition hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 ${selectedReplyId === comment._id ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}
            >
              <Reply aria-hidden="true" size={14} />
              Reply
            </button>
          </Can>
        )}
      </div>

      {/* Options */}
      {(canEdit || canDelete) && (
        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center justify-center transition-colors p-1 border border-transparent hover:border-muted-foreground rounded-2xl"
            onClick={handleOpenMenu}
            aria-label="Comment actions"
            aria-expanded={comment._id === openMenuId}
            disabled={composerBusy}
          >
            <MoreHorizontal size={18} />
          </button>

          {comment._id === openMenuId && (
            <div className="absolute  bottom-1 right-12 z-50 w-44 rounded-xl border bg-background p-1 shadow-lg">
              <Can permission={PERMISSIONS.COMMENT_EDIT}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenuId(null);
                    onEdit(comment);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                >
                  <Pencil size={16} />
                  Edit Comment
                </button>
              </Can>

              <Can permission={PERMISSIONS.COMMENT_DELETE}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenuId(null);
                    setIsDeleteOpen(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </Can>
            </div>
          )}

          {/* Delet Modal */}
          <ConfirmModal
            open={isDeleteOpen}
            title="Delete Comment"
            cancelText="Cancel"
            confirmText="Delete Comment"
            description="Delete this comment? Its replies will remain visible."
            key={`delete-${comment._id}`}
            onCancel={() => setIsDeleteOpen(!isDeleteOpen)}
            onConfirm={handleDeleteComment}
            loading={isDeletingComment}
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
