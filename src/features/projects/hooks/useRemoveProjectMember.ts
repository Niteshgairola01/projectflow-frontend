import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectMemberApis } from "../api/projectMember.api";
import { useParams } from "react-router-dom";
import { projectMemberKeys } from "../constants/projectMember..keys";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

interface RemoveProjectMemberVariables {
  projectId: string;
  memberId: string;
}

export const useRemoveProjectMember = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: ({ projectId, memberId }: RemoveProjectMemberVariables) => {
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

      return projectMemberApis.removeProjectMember(
        workspaceId,
        projectId,
        memberId,
      );
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectMemberKeys.list(
          workspaceId ?? "",
          variables.projectId ?? "",
        ),
      });
    },
  });
};
