export const ROUTES = {
  HOME: "/",

  LOGIN: "/login",
  REGISTER: "/register",
  INVITATION: "/invitations/:token",

  DASHBOARD: "/dashboard",

  WORKSPACES: "/workspaces",
  WORKSPACE_DETAILS: "/workspaces/:workspaceId",
  WORKSPACE_PENDING_INVITATIONS: "/workspaces/:workspaceId/invitations/pending",

  PROJECTS: "projects",
  PROJECT_DETAILS: "projects/:projectId",

  TASKS: "tasks",
  TASKS_DETAILS: "tasks/:taskId",

  SETTINGS: "settings",
};
