import { useParams } from "react-router-dom";
import { useProjectMembers } from "../../features/projects/hooks/useProjecMembers";
import type { ProjectRole } from "../../features/projects/constants/projectRoles";
import { PROJECT_ROLE_PERMISSIONS } from "../config/projectrolePermissions";
import { WORKSPACE_ROLE_PERMISSIONS } from "../config/rolePermissions";
import { PERMISSIONS, type Permission } from "../constants/permissions";
import { useAppSelector } from "./useAppSelector";

export const usePermissions = () => {
  const { projectId } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const workspace = useAppSelector((state) => state.workspace.currentWorkspace);
  const { data: projectMembers, isLoading: isProjectRoleLoading } =
    useProjectMembers();

  const workspaceRole = workspace?.members.find(
    (member) => member.user?._id === user?._id,
  )?.role;

  const projectRole = projectMembers?.find(
    (member) => member.user?._id === user?._id,
  )?.role as ProjectRole | undefined;

  const workspacePermissions: readonly Permission[] = workspaceRole
    ? WORKSPACE_ROLE_PERMISSIONS[workspaceRole]
    : [];
  const projectPermissions: readonly Permission[] = projectRole
    ? PROJECT_ROLE_PERMISSIONS[projectRole]
    : [];

  const can = (permission: Permission) => {
    // Workspace creation is an account-level ability, not tied to the currently
    // selected workspace.
    if (permission === PERMISSIONS.WORKSPACE_CREATE) {
      return Boolean(user);
    }

    // Owners and admins inherit authority over projects in their workspace.
    // Regular workspace members must also belong to the current project.
    const canUseWorkspaceRole = !projectId || workspaceRole !== "MEMBER";

    return (
      (canUseWorkspaceRole && workspacePermissions.includes(permission)) ||
      projectPermissions.includes(permission)
    );
  };

  return {
    can,
    workspaceRole,
    projectRole,
    isLoading: Boolean(projectId) && isProjectRoleLoading,
  };
};
