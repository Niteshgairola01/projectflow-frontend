import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { UpdateProjectMemberRolePayload } from "../schema/updateProjectMemberRoleSchema";
import { projectMemberApis } from "../api/projectMember.api";
import { projectMemberKeys } from "../constants/projectMember..keys";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

interface UpdateVariables {
  memberId: string;
  data: UpdateProjectMemberRolePayload;
}

export const useUpdateProjectMemberRole = () => {
  const { workspaceId, projectId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: ({ memberId, data }: UpdateVariables) => {
      if (!can(PERMISSIONS.MANAGE_PROJECT_MEMBER)) throw new Error("Access denied");
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      if (!projectId) {
        throw new Error("Project not found");
      }

      if (!memberId) {
        throw new Error("Member not found");
      }

      return projectMemberApis.updateProjectMemberRole(
        workspaceId,
        projectId,
        memberId,
        data,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectMemberKeys.list(workspaceId ?? "", projectId ?? ""),
      });
    },
  });
};
