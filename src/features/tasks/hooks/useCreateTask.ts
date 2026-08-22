import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { taskApi } from "../api/task.api";
import type { CreateTaskPayload } from "../schema/createTaskSchema";
import { taskKeys } from "../constants/task.keys";

export const useCreateTask = () => {
  const { workspaceId, projectId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => {
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      if (!projectId) {
        throw new Error("Project not found");
      }

      return taskApi.createTask(workspaceId, projectId, payload);
    },

    onSuccess: () => {
      if (!workspaceId || !projectId) return;

      queryClient.invalidateQueries({
        queryKey: taskKeys.list(workspaceId, projectId),
      });
    },
  });
};
