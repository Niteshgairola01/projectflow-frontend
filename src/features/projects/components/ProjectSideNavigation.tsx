import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

import type { Project } from "../types/project.types";

interface ProjectNavigationProps {
  project: Project;
}

const ProjectNavigation = ({ project }: ProjectNavigationProps) => {
  const { workspaceId, projectId } = useParams();

  if (!workspaceId || !projectId) {
    return null;
  }

  const projectBasePath = `/workspaces/${workspaceId}/projects/${projectId}`;

  const navigationItems = [
    {
      label: "Overview",
      path: projectBasePath,
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Tasks",
      path: `${projectBasePath}/tasks`,
      icon: CheckSquare,
    },

    // Future project modules
    {
      label: "Members",
      path: `${projectBasePath}/members`,
      icon: Users,
    },
    {
      label: "Calendar",
      path: `${projectBasePath}/calendar`,
      icon: CalendarDays,
    },
    {
      label: "Reports",
      path: `${projectBasePath}/reports`,
      icon: BarChart3,
    },
    {
      label: "Settings",
      path: `${projectBasePath}/settings`,
      icon: Settings,
    },
  ];

  return (
    <div className="mt-6 border-t pt-5">
      {/* Current Project */}
      <div className="mb-4 px-2">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Current Project
        </p>

        <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: project.color || "#6C63FF" }}
          >
            {project.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{project.name}</p>

            <p className="text-xs text-muted-foreground">Current project</p>
          </div>
        </div>
      </div>

      {/* Project Navigation */}
      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `
                flex w-full items-center gap-3 rounded-xl px-4 py-2.5
                text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
                `
              }
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default ProjectNavigation;
