export const PERMISSIONS = {
  INVITATION_CREATE: "invitation:create",
  PROJECT_CREATE: "project:create",
  PROJECT_READ: "project:read",
  PROJECT_UPDATE: "project:update",
  PROJECT_DELETE: "project:delete",

  TASK_CREATE: "task:create",
  TASK_READ: "task:read",
  TASK_UPDATE: "task:update",
  TASK_DELETE: "task:delete",

  WORKSPACE_CREATE: "workspace:create",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
