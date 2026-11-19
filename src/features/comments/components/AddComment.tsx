import { notify } from "../../../shared/utils/toast";
import { useAddComment } from "../hooks/useAddComment";
import type { AddCommentPayload } from "../schemas/addCommentSchema";
import CommentForm from "./CommentForm";

const AddComment = () => {
  const { mutateAsync, isPending } = useAddComment();

  const onSubmit = async (data: AddCommentPayload) => {
    await mutateAsync(data);
    notify.success("Comment added successfully");
  };

  return (
    <div>
      <CommentForm
        title="Add Comment"
        submitLabel="Post Comment"
        onSubmit={onSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
};

export default AddComment;
