import { LayoutDashboard, FolderKanban, Workflow } from "lucide-react";
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
];
