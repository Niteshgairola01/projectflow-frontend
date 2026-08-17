import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { projectApi } from "../api/project.api";
import type { CreateProjectPayload } from "../schema/createProjectSchema";
import { projectKeys } from "../constants/project.keys";
import { notify } from "../../../shared/utils/toast";

export const useCreateProject = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectPayload) => {
      if (!workspaceId) {
        notify.error("Workspace not found");
        return;
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
