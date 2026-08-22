export const taskKeys = {
  all: ["tasks"] as const,

  lists: () => [...taskKeys.all, "list"] as const,

  list: (workspaceId: string, projectId: string) =>
    [...taskKeys.lists(), workspaceId, projectId] as const,

  details: () => [...taskKeys.all, "detail"] as const,

  detail: (workspaceId: string, projectId: string, taskId: string) =>
    [...taskKeys.details(), workspaceId, projectId, taskId] as const,
};
