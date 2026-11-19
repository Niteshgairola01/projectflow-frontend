import type { Dispatch, SetStateAction } from "react";
import { notify } from "../../../shared/utils/toast";
import { useEditComment } from "../hooks/useEditComment";
import type { EditCommentPayload } from "../schemas/editCommentSchema";
import type { CommentResponse } from "../types/comment.types";
import CommentForm from "./CommentForm";

interface EditCommentProps {
  initialData: CommentResponse;
  setEditingComment: Dispatch<SetStateAction<CommentResponse | null>>;
}

const EditComment = ({ initialData, setEditingComment }: EditCommentProps) => {
  const { mutateAsync, isPending } = useEditComment();

  const onSubmit = async (payload: EditCommentPayload) => {
    await mutateAsync({
      payload,
      commentId: initialData._id,
    });

    notify.success("Comment edited successfully");
  };

  return (
    <CommentForm
      title="Edit Comment"
      submitLabel="Edit Comment"
      defaultValues={{ content: initialData.content }}
      setEditingComment={setEditingComment}
      onSubmit={onSubmit}
      isSubmitting={isPending}
    />
  );
};

export default EditComment;
