import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Workflow,
} from "lucide-react";
import { ROUTES } from "./routes";

export const sidebarItems = [
  {
    label: "Overview",
    path: ROUTES.DASHOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Workspaces",
    path: ROUTES.WORKSPACES,
    icon: Workflow,
  },
  {
    label: "Projects",
    path: ROUTES.PROJECTS,
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    path: ROUTES.TASKS,
    icon: CheckSquare,
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: Calendar,
  },
  {
    label: "Team",
    path: "/team",
    icon: Users,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
