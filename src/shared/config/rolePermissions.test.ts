import { describe, expect, it } from "vitest";
import { PROJECT_ROLES } from "../../features/projects/constants/projectRoles";
import { PERMISSIONS } from "../constants/permissions";
import { WORKSPACE_ROLES } from "../constants/workSpaceRoles";
import { PROJECT_ROLE_PERMISSIONS } from "./projectrolePermissions";
import { WORKSPACE_ROLE_PERMISSIONS } from "./rolePermissions";

describe("workspace RBAC policy", () => {
  it("gives owners every workspace-scoped permission", () => {
    expect(WORKSPACE_ROLE_PERMISSIONS[WORKSPACE_ROLES.OWNER]).toEqual(
      expect.arrayContaining([
        PERMISSIONS.INVITATION_CREATE,
        PERMISSIONS.MANAGE_WORKSPACE_MEMBER,
        PERMISSIONS.PROJECT_DELETE,
        PERMISSIONS.TASK_DELETE,
      ]),
    );
  });

  it("keeps workspace members read-only until project membership is applied", () => {
    expect(WORKSPACE_ROLE_PERMISSIONS[WORKSPACE_ROLES.MEMBER]).toEqual([
      PERMISSIONS.PROJECT_READ,
      PERMISSIONS.TASK_READ,
    ]);
  });
});

describe("project RBAC policy", () => {
  it("allows project admins to manage members and tasks", () => {
    expect(PROJECT_ROLE_PERMISSIONS[PROJECT_ROLES.PROJECT_ADMIN]).toEqual(
      expect.arrayContaining([
        PERMISSIONS.MANAGE_PROJECT_MEMBER,
        PERMISSIONS.TASK_CREATE,
        PERMISSIONS.TASK_UPDATE,
        PERMISSIONS.TASK_DELETE,
      ]),
    );
  });

  it("does not allow project members to administer the project", () => {
    const permissions = PROJECT_ROLE_PERMISSIONS[PROJECT_ROLES.MEMBER];

    expect(permissions).toContain(PERMISSIONS.TASK_UPDATE);
    expect(permissions).not.toContain(PERMISSIONS.PROJECT_UPDATE);
    expect(permissions).not.toContain(PERMISSIONS.PROJECT_DELETE);
    expect(permissions).not.toContain(PERMISSIONS.MANAGE_PROJECT_MEMBER);
    expect(permissions).not.toContain(PERMISSIONS.TASK_DELETE);
  });
});
