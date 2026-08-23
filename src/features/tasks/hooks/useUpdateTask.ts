import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { taskApi } from "../api/task.api";
import type { UpdateTaskPayload } from "../schema/createTaskSchema";
import { taskKeys } from "../constants/task.keys";

interface UpdateTaskVairables {
  taskId: string;
  payload: UpdateTaskPayload;
}

export const useUpdateTask = () => {
  const { workspaceId, projectId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, taskId }: UpdateTaskVairables) => {
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

    onSuccess: (updatedTask, variables) => {
      queryClient.setQueryData(
        taskKeys.detail(workspaceId, projectId, variables.taskId),
        updatedTask,
      );

      queryClient.invalidateQueries({
        queryKey: taskKeys.list(workspaceId, projectId),
      });
    },
  });
};
