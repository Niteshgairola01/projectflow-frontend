import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { notify } from "../../../shared/utils/toast";
import { taskApi } from "../api/task.api";
import { taskKeys } from "../constants/task.keys";

interface DeleteTaskVariables {
  taskId: string;
}

export const useDeleteTask = () => {
  const { workspaceId, projectId } = useParams();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId }: DeleteTaskVariables) => {
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      if (!projectId) {
        throw new Error("Project not found");
      }

      return taskApi.deleteTask(workspaceId, projectId, taskId);
    },

    onSuccess: (_, variables) => {
      if (!workspaceId || !projectId) {
        return;
      }

      // Refresh project task list
      queryClient.invalidateQueries({
        queryKey: taskKeys.list(workspaceId, projectId),
      });

      // Remove deleted task from cache
      queryClient.removeQueries({
        queryKey: taskKeys.detail(workspaceId, projectId, variables.taskId),
      });

      notify.success("Task deleted successfully");
    },

    onError: (error) => {
      notify.error(error.message ?? "Failed to delete task");
    },
  });
};
