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

export const sidebarItems = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Workspaces",
    path: "/workspaces",
    icon: Workflow,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    path: "/tasks",
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
