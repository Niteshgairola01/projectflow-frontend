import { formatDistanceToNow } from "date-fns";
import type { CommentResponse } from "../types/comment.types";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
  setEditingComment: Dispatch<SetStateAction<CommentResponse | null>>;
}

const Comment = ({
  comment,
  setOpenMenuId,
  openMenuId,
  setEditingComment,
}: CommentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const { mutateAsync, isPending: isDeletingComment } = useDeleteComment();

  const user = useAppSelector((state) => state?.auth?.user);
  const { can, isLoading } = usePermissions();

  const isAuthor = Boolean(user?._id) && comment.author._id === user?._id;
  const isAvailable = !isLoading && !comment.isDeleted;

  const canEdit = isAvailable && isAuthor && can(PERMISSIONS.COMMENT_EDIT);
  const canDelete = isAvailable && isAuthor && can(PERMISSIONS.COMMENT_DELETE);

  const handleOpenMenu = () => {
    setIsMenuOpen((prev) => !prev);

    if (isMenuOpen) {
      setOpenMenuId(null);
      return;
    }

    setOpenMenuId(comment._id);
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
    <div className="mb-5 flex justify-start items-start gap-3">
      {/* Profile */}
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
      >
        {comment.author.name?.trim()?.charAt(0)?.toUpperCase() ?? ""}
      </span>

      {/* Comment Section */}
      <div className="w-full">
        <div className="flex justify-start items-end gap-3">
          <span className="text-sm font-semibold">{comment.author?.name}</span>

          <span className="text-sm text-muted-foreground">
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

        <div className="text-sm mt-1">{comment.content}</div>
      </div>

      {/* Options */}
      {(canEdit || canDelete) && (
        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center justify-center transition-colors p-1 border border-transparent hover:border-muted-foreground rounded-2xl"
            onClick={handleOpenMenu}
            aria-label="Comment actions"
          >
            <MoreHorizontal size={18} />
          </button>

          {isMenuOpen && comment._id === openMenuId && (
            <div className="absolute  bottom-1 right-12 z-50 w-44 rounded-xl border bg-background p-1 shadow-lg">
              <Can permission={PERMISSIONS.COMMENT_EDIT}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setEditingComment(comment);
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
                    setIsMenuOpen(false);
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
            description={`Are you sure you want to delete the comment ?`}
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
