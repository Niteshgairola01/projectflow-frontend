import { ROLE_PERMISSIONS } from "../config/rolePermissions";
import type { Permission } from "../constants/permissions";
import { useAppSelector } from "./useAppSelector";

export const useWorkspacePermissions = () => {
  const user = useAppSelector((state) => state.auth.user);
  const workspace = useAppSelector((state) => state.workspace.currentWorkspace);

  //   check currenr user's membership status for currnet workspace
  const membership = workspace?.members?.find(
    (member) => member?.user?._id === user?._id
  );

  const role = membership?.role;

  const permissions = ROLE_PERMISSIONS[role] ?? [];

  const can = (permission: Permission) => {
    return permissions.includes(permission);
  };

  return {
    role,
    can,
  };
};
