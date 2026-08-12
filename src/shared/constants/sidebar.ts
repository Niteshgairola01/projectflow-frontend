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
import type React from "react";

interface SidebarItem {
  label: String;
  key: String;
  icon: React.ElementType;
  requiresWorkspace?: boolean;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Overview",
    key: "overview",
    icon: LayoutDashboard,
  },
  {
    label: "Workspaces",
    key: "workspaces",
    icon: Workflow,
  },
  {
    label: "Projects",
    key: "projects",
    icon: FolderKanban,
    requiresWorkspace: true,
  },
  {
    label: "Tasks",
    key: "tasks",
    icon: CheckSquare,
    requiresWorkspace: true,
  },
  {
    label: "Calendar",
    key: "calendar",
    icon: Calendar,
    requiresWorkspace: true,
  },
  {
    label: "Team",
    key: "team",
    icon: Users,
    requiresWorkspace: true,
  },
  {
    label: "Reports",
    key: "reports",
    icon: BarChart3,
    requiresWorkspace: true,
  },
  {
    label: "Settings",
    key: "settings",
    icon: Settings,
    requiresWorkspace: true,
  },
];
