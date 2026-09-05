import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceMemberApi } from "../api/workspaceMember.api";
import { useParams } from "react-router-dom";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

export const useRemoveWorkspaceMember = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: (memberId: string) => {
      if (!can(PERMISSIONS.MANAGE_WORKSPACE_MEMBER)) throw new Error("Access denied");
      if (!workspaceId) throw new Error("Workspace not found");
      return workspaceMemberApi.removeWorkspaceMemberRole(
        workspaceId,
        memberId,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces", workspaceId],
      });
    },
  });
};
