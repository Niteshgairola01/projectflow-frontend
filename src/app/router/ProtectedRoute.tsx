import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import type { ReactNode } from "react";

interface ProtecteRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtecteRouteProps) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
