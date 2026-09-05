import type { WorkspaceRole } from "../../../shared/constants/workSpaceRoles";
import type { ProjectMemberRole } from "../types/projectMember.types";

export const canRemoveProjectMember = ({
  targetProjectRole,
  loggedInUserRole,
}: {
  targetProjectRole: ProjectMemberRole;
  loggedInUserRole?: WorkspaceRole | null | undefined;
}) => {
  if (targetProjectRole === "MEMBER") {
    return true;
  }

  if (targetProjectRole === "PROJECT_ADMIN") {
    return loggedInUserRole === "OWNER" || loggedInUserRole === "ADMIN";
  }

  return false;
};
