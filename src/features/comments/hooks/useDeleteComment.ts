import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { commentApis } from "../api/comment.api";
import { commentKeys } from "../contants/comment.keys";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import { usePermissions } from "../../../shared/hooks/usePermissions";

interface DeleteCommentVariables {
  commentId: string;
}

export const useDeleteComment = () => {
  const { workspaceId, projectId, taskId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: ({ commentId }: DeleteCommentVariables) => {
      if (!can(PERMISSIONS.COMMENT_DELETE)) throw new Error("Access denied");

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

      return commentApis.deleteComment(
        workspaceId,
        projectId,
        taskId,
        commentId,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(
          workspaceId ?? "",
          projectId ?? "",
          taskId ?? "",
        ),
      });
    },
  });
};
