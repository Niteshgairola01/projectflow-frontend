import type { WorkspaceRole } from "../../../shared/constants/workSpaceRoles";

export const canManageWorkspaceMember = ({
  targetWorkspaceRole,
  loggedInUserRole,
}: {
  targetWorkspaceRole: WorkspaceRole;
  loggedInUserRole?: WorkspaceRole | null | undefined;
}) => {
  if (targetWorkspaceRole === "MEMBER") {
    return true;
  }

  if (targetWorkspaceRole === "ADMIN") {
    return loggedInUserRole === "OWNER";
  }

  return false;
};
