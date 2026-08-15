export const projectKeys = {
  all: ["projects"] as const,

  lists: () => [...projectKeys.all, "list"] as const,

  list: (workspaceId: string) => [...projectKeys.lists(), workspaceId] as const,

  details: () => [...projectKeys.all, "detail"] as const,

  detail: (workspaceId: string, projectId: string) =>
    [...projectKeys.details(), workspaceId, projectId] as const,
};
