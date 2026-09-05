import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { notify } from "../../../shared/utils/toast";
import { projectApi } from "../api/project.api";
import type { UpdateProjectPayload } from "../schema/createProjectSchema";
import { projectKeys } from "../constants/project.keys";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

interface UpdateProjectVariables {
  projectId: string;
  data: UpdateProjectPayload;
}

export const useUpdateProject = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: ({ projectId, data }: UpdateProjectVariables) => {
      if (!can(PERMISSIONS.PROJECT_UPDATE)) throw new Error("Access denied");
      if (!workspaceId) {
        notify.error("Workspace not found");
        throw new Error("Workspace not found");
      }

      return projectApi.updateProject(workspaceId, projectId, data);
    },

    onSuccess: (_data, variables) => {
      if (!workspaceId) return;

      // Project list
      queryClient.invalidateQueries({
        queryKey: projectKeys.list(workspaceId),
      });

      // Individual project
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(workspaceId, variables.projectId),
      });
    },
  });
};
