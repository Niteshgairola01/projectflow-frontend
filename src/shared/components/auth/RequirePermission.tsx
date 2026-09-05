import type { ReactNode } from "react";
import type { Permission } from "../../constants/permissions";
import { usePermissions } from "../../hooks/usePermissions";
import AppLoader from "../ui/Loader/AppLoader";
import AccessDenied from "./AccessDenied";

interface RequirePermissionProps {
  anyOf: readonly Permission[];
  children: ReactNode;
}

const RequirePermission = ({ anyOf, children }: RequirePermissionProps) => {
  const { can, isLoading } = usePermissions();

  if (isLoading) {
    return <AppLoader message="Checking permissions..." />;
  }

  if (!anyOf.some(can)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export default RequirePermission;
