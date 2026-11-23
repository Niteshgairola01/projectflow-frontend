import { notify } from "../../../shared/utils/toast";
import { useAddComment } from "../hooks/useAddComment";
import type { AddCommentPayload } from "../schemas/addCommentSchema";
import type { CommentResponse } from "../types/comment.types";
import CommentForm, { type ComposerLifecycleProps } from "./CommentForm";

interface AddCommentProps extends ComposerLifecycleProps {
  replyTo?: CommentResponse;
}

const AddComment = ({ replyTo, ...formProps }: AddCommentProps) => {
  const { mutateAsync, isPending } = useAddComment();
  const onSubmit = async ({ content }: AddCommentPayload) => {
    await mutateAsync({
      content,
      ...(replyTo ? { parentComment: replyTo._id } : {}),
    });
    notify.success(
      replyTo ? "Reply posted successfully" : "Comment added successfully",
    );
  };

  return (
    <CommentForm
      {...formProps}
      title={replyTo ? "Your reply" : "Add a comment"}
      contextLabel={replyTo ? `Replying to: ${replyTo.author.name}` : undefined}
      submitLabel={replyTo ? "Post reply" : "Post comment"}
      pendingLabel="Posting…"
      onSubmit={onSubmit}
      isSubmitting={isPending}
    />
  );
};

export default AddComment;
