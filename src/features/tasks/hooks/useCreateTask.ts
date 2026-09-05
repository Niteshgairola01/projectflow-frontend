import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { taskApi } from "../api/task.api";
import type { CreateTaskPayload } from "../schema/createTaskSchema";
import { taskKeys } from "../constants/task.keys";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

export const useCreateTask = () => {
  const { workspaceId, projectId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => {
      if (!can(PERMISSIONS.TASK_CREATE)) throw new Error("Access denied");
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
