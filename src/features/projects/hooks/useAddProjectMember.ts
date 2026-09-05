import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddProjectMemberPayload } from "../types/projectMember.types";
import { projectMemberApis } from "../api/projectMember.api";
import { projectMemberKeys } from "../constants/projectMember..keys";
import { useParams } from "react-router-dom";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

export const useAddProjectMember = () => {
  const { workspaceId, projectId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: (payload: AddProjectMemberPayload) => {
      if (!can(PERMISSIONS.ADD_MEMBER_TO_PROJECT)) throw new Error("Access denied");
      if (!workspaceId || !projectId) throw new Error("Project not found");
      return projectMemberApis.addProjectMember(workspaceId, projectId, payload);
    },

    onSuccess: () => {
      if (!workspaceId || !projectId) return;
      queryClient.invalidateQueries({
        queryKey: projectMemberKeys.list(workspaceId, projectId),
      });
    },
  });
};
