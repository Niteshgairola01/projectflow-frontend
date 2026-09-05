export const PROJECT_ROLES = {
  PROJECT_ADMIN: "PROJECT_ADMIN",
  MEMBER: "MEMBER",
} as const;

export type ProjectRole = (typeof PROJECT_ROLES)[keyof typeof PROJECT_ROLES];
