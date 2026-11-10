export const commentKeys = {
  all: ["comments"] as const,

  lists: () => [...commentKeys.all, "list"] as const,

  list: (workspaceId: string, projectId: string, taskId: string) =>
    [...commentKeys.lists(), workspaceId, projectId, taskId] as const,

  details: () => [...commentKeys.all, "detail"] as const,

  detail: (
    workspaceId: string,
    projectId: string,
    taskId: string,
    commentId: string,
  ) =>
    [
      ...commentKeys.details(),
      workspaceId,
      projectId,
      taskId,
      commentId,
    ] as const,
};
