import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTES } from "../../shared/constants/routes";
import AppLayout from "../layouts/AppLayout";
import WorkspacesPage from "../../features/workspace/pages/WorkspacesPage";
import { PublicRoute } from "./PublicRoute";
import ProjectsPage from "../../features/projects/pages/ProjectsPage";
import WorkspaceLayout from "../../features/workspace/layouts/WorkspaceLayout";
import TasksPage from "../../features/tasks/pages/TasksPage";
import ProjectLayout from "../../features/workspace/layouts/ProjectLayout";
import ProjectOverviewPage from "../../features/projects/pages/ProjectOverviewPage";
import TaskDetailsPage from "../../features/tasks/pages/TaskDetailsPage";
import InvitationPage from "../../features/invitation/pages/InvitationPage";
import WorkspaceDetailsPage from "../../features/workspace/pages/WorkspaceDetailsPage";
import WorkspacePendingInvitationsPage from "../../features/workspace/pages/WorkspacePendingInvitationsPage";
import ProjectMembersPage from "../../features/projects/pages/ProjectMembersPage";

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
    path: ROUTES.INVITATION,
    element: (
      <PublicRoute>
        <InvitationPage />
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
        element: <WorkspaceLayout />,
        children: [
          {
            index: true,
            element: <WorkspaceDetailsPage />,
          },
          {
            path: ROUTES.WORKSPACE_PENDING_INVITATIONS,
            element: <WorkspacePendingInvitationsPage />,
          },

          // project
          {
            path: ROUTES.PROJECTS,
            element: <ProjectsPage />,
          },
          {
            path: ROUTES.PROJECT_DETAILS,
            element: <ProjectLayout />,
            children: [
              {
                index: true,
                element: <ProjectOverviewPage />,
              },
              {
                path: ROUTES.TASKS,
                element: <TasksPage />,
              },
              {
                path: ROUTES.TASKS_DETAILS,
                element: <TaskDetailsPage />,
              },
              {
                path: ROUTES.PROJECT_MEMBERS,
                element: <ProjectMembersPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
