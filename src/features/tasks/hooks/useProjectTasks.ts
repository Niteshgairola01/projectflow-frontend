import { useEffect, useState } from "react";
import { api } from "../../../shared/services/api/axios";
import type { ApiResponse } from "../../../shared/types/api.types";
import type { Task } from "../types/task.types";
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


export const useFilteredProjectTasks = (filters: import("../types/task.types").TaskFilters) => {
  const { workspaceId, projectId } = useParams();
  const [search, setSearch] = useState(filters.search);
  useEffect(() => {
    const timer = setTimeout(() => setSearch(filters.search), 300);
    return () => clearTimeout(timer);
  }, [filters.search]);
  const params = { ...filters, search: search.trim() };
  return useQuery({
    queryKey: [...taskKeys.list(workspaceId ?? "", projectId ?? ""), "filtered", params],
    queryFn: async ({ signal }) => {
      const response = await api.get<ApiResponse<{ tasks: Task[]; total: number; matching: number }>>(
        `/workspaces/${workspaceId}/projects/${projectId}/tasks`,
        { params: { ...params, filtered: "true" }, signal },
      );
      return response.data.data;
    },
    enabled: !!workspaceId && !!projectId,
  });
};
