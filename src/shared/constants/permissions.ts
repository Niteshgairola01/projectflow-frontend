export const PERMISSIONS = {
  INVITATION_CREATE: "invitation:create",
  INVITATION_CANCEL: "invitation:cancel",

  PROJECT_CREATE: "project:create",
  PROJECT_READ: "project:read",
  PROJECT_UPDATE: "project:update",
  PROJECT_DELETE: "project:delete",
  ADD_MEMBER_TO_PROJECT: "project:add-member",
  MANAGE_PROJECT_MEMBER: "project:manage-member",

  TASK_CREATE: "task:create",
  TASK_READ: "task:read",
  TASK_UPDATE: "task:update",
  TASK_DELETE: "task:delete",

  COMMENT_ADD: "comment:add",
  COMMENT_EDIT: "comment:edit",
  COMMENT_READ: "comment:read",
  COMMENT_DELETE: "comment:delete",

  WORKSPACE_CREATE: "workspace:create",
  MANAGE_WORKSPACE_MEMBER: "workspace:manage-member",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
