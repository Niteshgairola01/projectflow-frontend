import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { taskApi } from "../api/task.api";
import type { UpdateTaskPayload } from "../schema/createTaskSchema";
import { taskKeys } from "../constants/task.keys";
// import { queryClient } from "../../../shared/services/api/queryClient";

export const useUpdateTask = () => {
  const { workspaceId, projectId, taskId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTaskPayload) => {
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      if (!projectId) {
        throw new Error("Project not found");
      }

      if (!taskId) {
        throw new Error("Task not found");
      }

      return taskApi.updateTask(workspaceId, projectId, taskId, payload);
    },

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        taskKeys.detail(workspaceId, projectId, taskId),
        updatedTask
      );

      queryClient.invalidateQueries({
        queryKey: taskKeys.list(workspaceId, projectId),
      });
    },
  });
};
