export const PERMISSIONS = {
  PROJECT_CREATE: "project:create",
  PROJECT_READ: "project:read",
  PROJECT_UPDATE: "project:update",
  PROJECT_DELETE: "project:delete",

  WORKSPACE_CREATE: "workspace:create",
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];