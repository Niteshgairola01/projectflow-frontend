import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { taskApi } from "../api/task.api";
import { taskKeys } from "../constants/task.keys";

export const useTask = () => {
  const { workspaceId, projectId, taskId } = useParams();

  return useQuery({
    queryFn: () => {
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      if (!projectId) {
        throw new Error("Project not found");
      }

      if (!taskId) {
        throw new Error("Task not found");
      }

      return taskApi.getTaskById(workspaceId, projectId, taskId);
    },

    queryKey: taskKeys.detail(workspaceId ?? "", projectId ?? "", taskId ?? ""),

    enabled: !!workspaceId && !!projectId && !!taskId,
  });
};
