import type React from "react";
import { usePermissions } from "../../hooks/usePermissions";
import type { Permission } from "../../constants/permissions";

interface CanProps {
  permission: Permission;
  children: React.ReactNode;
}

const Can = ({ permission, children }: CanProps) => {
  const { can, isLoading } = usePermissions();

  if (isLoading || !can(permission)) {
    return null;
  }

  return <>{children}</>;
};

export default Can;
