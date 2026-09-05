import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { UpdateProjectMemberRolePayload } from "../schema/updateProjectMemberRoleSchema";
import { projectMemberApis } from "../api/projectMember.api";
import { projectMemberKeys } from "../constants/projectMember..keys";

interface UpdateVariables {
  memberId: string;
  data: UpdateProjectMemberRolePayload;
}

export const useUpdateProjectMemberRole = () => {
  const { workspaceId, projectId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, data }: UpdateVariables) => {
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
