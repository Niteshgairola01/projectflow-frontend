import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { projectApi } from "../api/project.api";
import type { CreateProjectPayload } from "../shcema/createProjectSchema";

export const useCreateProject = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectPayload) =>
      projectApi.createProject(workspaceId!, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", workspaceId],
      });
    },
  });
};
