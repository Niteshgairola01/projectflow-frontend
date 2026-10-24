import { useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useWorkspaces } from "../../workspace/hooks/useWorkspaces";
import { projectApi } from "../../projects/api/project.api";
import { projectKeys } from "../../projects/constants/project.keys";
import { taskApi } from "../../tasks/api/task.api";
import { taskKeys } from "../../tasks/constants/task.keys";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { getDashboardSummary } from "../utils/dashboardUtils";

export const useDashboardData = () => {
  const user = useAppSelector((state) => state.auth.user);

  const currentWorkspace = useAppSelector(
    (state) => state.workspace.currentWorkspace,
  );

  const [selectedWorkspace, setSelectedWorkspace] = useState("");

  const workspacesQuery = useWorkspaces();
  const workspaces = workspacesQuery.data ?? [];

  const workspace =
    workspaces.find((item) => item._id === selectedWorkspace) ??
    workspaces.find((item) => item._id === currentWorkspace?._id) ??
    workspaces[0];

  const workspaceId = workspace?._id ?? "";

  const projectsQuery = useQuery({
    queryKey: projectKeys.list(workspaceId),
    queryFn: () => projectApi.getProjects(workspaceId),
    enabled: !!workspaceId,
  });

  const projects = projectsQuery.data ?? [];

  const taskQueries = useQueries({
    queries: projects.map((project) => ({
      queryKey: taskKeys.list(workspaceId, project._id),
      queryFn: () => taskApi.getTasksByProject(workspaceId, project._id),
    })),
  });

  const tasks = taskQueries.flatMap((query) => query.data ?? []);

  const loading =
    workspacesQuery.isPending ||
    (!!workspaceId && projectsQuery.isPending) ||
    taskQueries.some((query) => query.isPending);

  const hasError =
    workspacesQuery.isError ||
    (!!workspaceId && projectsQuery.isError) ||
    taskQueries.some((query) => query.isError);

  const retry = () => {
    void workspacesQuery.refetch();
    if (workspaceId) void projectsQuery.refetch();
    taskQueries.forEach((query) => {
      void query.refetch();
    });
  };

  return {
    user,
    workspaces,
    workspace,
    workspaceId,
    projects,
    tasks,
    loading,
    hasError,
    retry,
    setSelectedWorkspace,
    summary: getDashboardSummary(projects, tasks, user?._id),
  };
};
