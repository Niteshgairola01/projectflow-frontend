import { useForm } from "react-hook-form";
import { Button } from "../../../shared/components/ui/Button/Button";
import { Textarea } from "../../../shared/components/ui/Input/TextArea";
import {
  addCommentSchema,
  type AddCommentPayload,
} from "../schemas/addCommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { notify } from "../../../shared/utils/toast";
import type { EditCommentPayload } from "../schemas/editCommentSchema";
import type { Dispatch, SetStateAction } from "react";
import type { CommentResponse } from "../types/comment.types";

interface CommentFormProps {
  defaultValues?: EditCommentPayload;
  title: string;
  submitLabel: string;
  setEditingComment?: Dispatch<SetStateAction<CommentResponse | null>>;
  onSubmit: (data: AddCommentPayload) => Promise<void>;
  isSubmitting: boolean;
}

const CommentForm = ({
  title,
  submitLabel,
  setEditingComment,
  onSubmit,
  isSubmitting,
  defaultValues,
}: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetDefaultValues,
  } = useForm<AddCommentPayload>({
    resolver: zodResolver(addCommentSchema),
    defaultValues,
  });

  const handleFormSubmit = async (data: AddCommentPayload) => {
    if (isSubmitting) return;

    try {
      await onSubmit(data);
      resetDefaultValues({ content: "" });
      setEditingComment && setEditingComment(null);
      reset();
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      notify.error(errorMessage);
    }
  };

  return (
    <div>
      <h6 className="mb-2">{title}</h6>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Textarea
          {...register("content")}
          error={errors.content?.message}
          placeholder="Comment"
          rows={5}
          autoFocus
        />

        <div className="flex justify-end items-center gap-3 mt-3">
          {defaultValues && (
            <button
              type="button"
              className="rounded-xl border px-4 py-2"
              onClick={() => setEditingComment && setEditingComment(null)}
            >
              Cancel
            </button>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
