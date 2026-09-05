import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceMemberApi } from "../api/workspaceMember.api";
import { useParams } from "react-router-dom";
import type { UpdateWorkspaceMemberRolePayload } from "../schema/updateWorkspaceMemberRoleSchema";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

interface MemberVariables {
  memberId: string;
  data: UpdateWorkspaceMemberRolePayload;
}

export const useUpdateWorkspaceMemberRole = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: ({ memberId, data }: MemberVariables) => {
      if (!can(PERMISSIONS.MANAGE_WORKSPACE_MEMBER)) throw new Error("Access denied");
      if (!workspaceId) throw new Error("Workspace not found");
      return workspaceMemberApi.updateWorkspaceMemberRole(
        workspaceId,
        memberId,
        data,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces", workspaceId],
      });
    },
  });
};
