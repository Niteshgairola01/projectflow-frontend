import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTES } from "../../shared/constants/routes";
import AppLayout from "../layouts/AppLayout";
import WorkspacesPage from "../../features/workspace/pages/WorkspacesPage";
import { PublicRoute } from "./PublicRoute";
import WorkspaceDetailsPage from "../../features/workspace/pages/WorkspaceDetailsPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.WORKSPACES,
        element: <WorkspacesPage />,
      },
      {
        path: ROUTES.WORKSPACE_DETAILS,
        element: <WorkspaceDetailsPage />,
      },
    ],
  },
]);
