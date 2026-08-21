import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { taskApi } from "../api/task.api";
import { taskKeys } from "../constants/task.keys";

export const useProjectTasks = () => {
  const { workspaceId, projectId } = useParams();

  return useQuery({
    queryFn: () => {
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      if (!projectId) {
        throw new Error("Project not found");
      }

      return taskApi.getTasksByProject(workspaceId, projectId);
    },
    queryKey: taskKeys.list(workspaceId ?? "", projectId ?? ""),

    enabled: !!workspaceId && !!projectId,
  });
};
