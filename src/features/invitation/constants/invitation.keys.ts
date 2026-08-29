export const invitationKeys = {
  all: ["invitaitons"] as const,

  lists: () => [...invitationKeys.all, "lists"] as const,

  workspaceLists: (workspaceId: string) =>
    [...invitationKeys.lists(), workspaceId] as const,

  myLists: () => [...invitationKeys.lists(), "my"] as const,

  details: () => [...invitationKeys.all, "detail"] as const,

  detail: (workspaceId: string, invitationId: string) => [
    ...invitationKeys.details(),
    workspaceId,
    invitationId,
  ],
};
