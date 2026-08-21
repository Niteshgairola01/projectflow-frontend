import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { notify } from "../../../shared/utils/toast";
import { projectApi } from "../api/project.api";
import type { UpdateProjectPayload } from "../schema/createProjectSchema";
import { projectKeys } from "../constants/project.keys";

interface UpdateProjectVariables {
  projectId: string;
  data: UpdateProjectPayload;
}

export const useUpdateProject = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: UpdateProjectVariables) => {
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
