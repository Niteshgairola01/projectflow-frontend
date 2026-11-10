import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentApis } from "../api/comment.api";
import { useParams } from "react-router-dom";
import type { EditCommentPayload } from "../schemas/editCommentSchema";
import { commentKeys } from "../contants/comment.keys";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import { usePermissions } from "../../../shared/hooks/usePermissions";

interface EditCommentVariables {
  payload: EditCommentPayload;
  commentId: string;
}

export const useEditComment = () => {
  const { workspaceId, projectId, taskId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: ({ payload, commentId }: EditCommentVariables) => {
      if (!can(PERMISSIONS.COMMENT_EDIT)) throw new Error("Access denied");

      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      if (!projectId) {
        throw new Error("Project not found");
      }

      if (!taskId) {
        throw new Error("Task not found");
      }

      if (!commentId) {
        throw new Error("Comment not found");
      }

      return commentApis.editComment(
        workspaceId,
        projectId,
        taskId,
        commentId,
        payload,
      );
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.detail(
          workspaceId ?? "",
          projectId ?? "",
          taskId ?? "",
          variables?.commentId ?? "",
        ),
      });
    },
  });
};
