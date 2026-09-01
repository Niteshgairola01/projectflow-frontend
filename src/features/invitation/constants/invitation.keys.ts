export const invitationKeys = {
  all: ["invitations"] as const,

  lists: () => [...invitationKeys.all, "list"] as const,

  workspaceLists: (workspaceId: string) =>
    [...invitationKeys.lists(), "workspace", workspaceId] as const,

  myPending: () => [...invitationKeys.lists(), "my-pending"] as const,

  details: () => [...invitationKeys.all, "detail"] as const,

  byToken: (token: string) =>
    [...invitationKeys.details(), "token", token] as const,
};
