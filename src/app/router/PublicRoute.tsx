import type { ReactNode } from "react";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
