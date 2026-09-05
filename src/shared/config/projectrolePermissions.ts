import { PROJECT_ROLES } from "../../features/projects/constants/projectRoles";
import { PERMISSIONS, type Permission } from "../constants/permissions";
import type { ProjectRole } from "../../features/projects/constants/projectRoles";

export const PROJECT_ROLE_PERMISSIONS = {
  // Project Roles Permissions
  [PROJECT_ROLES.PROJECT_ADMIN]: [
    PERMISSIONS.PROJECT_READ,
    PERMISSIONS.PROJECT_UPDATE,

    PERMISSIONS.ADD_MEMBER_TO_PROJECT,
    PERMISSIONS.MANAGE_PROJECT_MEMBER,

    PERMISSIONS.TASK_CREATE,
    PERMISSIONS.TASK_READ,
    PERMISSIONS.TASK_UPDATE,
    PERMISSIONS.TASK_DELETE,
  ],

  [PROJECT_ROLES.MEMBER]: [
    PERMISSIONS.PROJECT_READ,

    PERMISSIONS.TASK_CREATE,
    PERMISSIONS.TASK_READ,
    PERMISSIONS.TASK_UPDATE,
  ],
} satisfies Record<ProjectRole, readonly Permission[]>;
