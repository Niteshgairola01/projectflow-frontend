import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../shared/utils/toast";
import { projectKeys } from "../constants/project.keys";

interface DeleteProjectVariables {
  projectId: string;
}

export const useDeleteProject = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ projectId }: DeleteProjectVariables) => {
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      return projectApi.deleteProject(workspaceId, projectId);
    },

    onSuccess: (_, variables) => {
      if (!workspaceId) return;

      // refresh project list
      queryClient.invalidateQueries({
        queryKey: projectKeys.list(workspaceId),
      });

      // Remove deleted project from cache
      queryClient.removeQueries({
        queryKey: projectKeys.detail(workspaceId, variables.projectId),
      });

      navigate(`/workspaces/${workspaceId}/projects`);

      notify.success("Project deleted successfully");
    },

    onError: (error) => {
      console.log("Error", error);
      notify.error(
        error.message ?? "Failed to delete project"
      );
    },
  });
};
