import type React from "react";
import { useWorkspacePermissions } from "../../hooks/useWorkspacePermissions";
import type { Permission } from "../../constants/permissions";

interface CanProps {
  permission: Permission;
  children: React.ReactNode;
}

const Can = ({ permission, children }: CanProps) => {
  const { can } = useWorkspacePermissions();

  if (!can(permission)) {
    return null;
  }

  return <>{children}</>;
};

export default Can;
