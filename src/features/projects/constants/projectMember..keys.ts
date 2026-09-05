export const projectMemberKeys = {
  all: ["project-members"] as const,

  lists: () => [...projectMemberKeys.all, "list"] as const,

  list: (workspaceId: string, projectId: string) =>
    [...projectMemberKeys.lists(), workspaceId, projectId] as const,
};
