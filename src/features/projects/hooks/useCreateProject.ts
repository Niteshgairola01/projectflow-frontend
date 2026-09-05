import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { projectApi } from "../api/project.api";
import type { CreateProjectPayload } from "../schema/createProjectSchema";
import { projectKeys } from "../constants/project.keys";
import { notify } from "../../../shared/utils/toast";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

export const useCreateProject = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: (data: CreateProjectPayload) => {
      if (!can(PERMISSIONS.PROJECT_CREATE)) throw new Error("Access denied");
      if (!workspaceId) {
        notify.error("Workspace not found");
        throw new Error("Workspace not found");
      }

      return projectApi.createProject(workspaceId, data);
    },

    onSuccess: () => {
      if (!workspaceId) return;

      queryClient.invalidateQueries({
        queryKey: projectKeys.list(workspaceId),
      });
    },
  });
};
