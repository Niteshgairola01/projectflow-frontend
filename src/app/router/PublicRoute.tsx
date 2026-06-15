import type { ReactNode } from "react";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return <Navigate to={ROUTES.WORKSPACES} replace />;
  }

  return <>{children}</>;
};
