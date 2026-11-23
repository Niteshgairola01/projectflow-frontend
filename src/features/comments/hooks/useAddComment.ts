import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { commentApis } from "../api/comment.api";
import type { AddCommentPayload } from "../schemas/addCommentSchema";
import { commentKeys } from "../contants/comment.keys";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

export const useAddComment = () => {
  const { workspaceId, projectId, taskId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: (payload: AddCommentPayload) => {
      // Authorize
      if (!can(PERMISSIONS.COMMENT_ADD)) throw new Error("Access denied");

      if (!workspaceId) {
        throw new Error("Workspace not found");
      }
      if (!projectId) {
        throw new Error("projectId not found");
      }
      if (!taskId) {
        throw new Error("Workspace not found");
      }

      return commentApis.addComment(workspaceId, projectId, taskId, payload);
    },

    onSuccess: () => {
      if (!workspaceId || !projectId || !taskId) return;

      return queryClient.invalidateQueries({
        queryKey: commentKeys.list(workspaceId, projectId, taskId),
      });
    },
  });
};
