import { notify } from "../../../shared/utils/toast";
import { useEditComment } from "../hooks/useEditComment";
import type { EditCommentPayload } from "../schemas/editCommentSchema";
import type { CommentResponse } from "../types/comment.types";
import CommentForm, { type ComposerLifecycleProps } from "./CommentForm";

interface EditCommentProps extends ComposerLifecycleProps {
  initialData: CommentResponse;
}

const EditComment = ({ initialData, initialContent, ...formProps }: EditCommentProps) => {
  const { mutateAsync, isPending } = useEditComment();
  const onSubmit = async ({ content }: EditCommentPayload) => {
    await mutateAsync({ payload: { content }, commentId: initialData._id });
    notify.success("Comment edited successfully");
  };

  return (
    <CommentForm
      {...formProps}
      title="Edit comment"
      submitLabel="Save changes"
      pendingLabel="Saving…"
      initialContent={initialContent ?? initialData.content}
      onSubmit={onSubmit}
      isSubmitting={isPending}
    />
  );
};

export default EditComment;
