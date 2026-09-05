import { NavLink, useParams } from "react-router-dom";
import type { Project } from "../types/project.types";
import { ArrowLeft, CheckSquare, LayoutDashboard, Users } from "lucide-react";
import ProjectNavigationItem from "./ProjectNavigationItem";
import ProjectHeader from "./ProjectHeader";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";

interface ProjectNavigationProps {
  project: Project;
}

const ProjectNavigation = ({ project }: ProjectNavigationProps) => {
  const { workspaceId, projectId } = useParams();

  if (!workspaceId || !projectId) return null;

  const overviewPath = `/workspaces/${workspaceId}/projects/${projectId}`;
  const tasksPath = `${overviewPath}/tasks`;
  const membersPath = `${overviewPath}/members`;

  return (
    <div className="space-y-4">
      <NavLink
        to={`/workspaces/${workspaceId}/projects`}
        className="inline-flex items-center gap-2 text-md text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={16} />

        <span>Back to Projects</span>
      </NavLink>

      {/* Project Header */}
      <div className="rounded-2xl border bg-card">
        <div className="px-6 pt-6">
          <ProjectHeader project={project} />
        </div>

        {/* Project Navigation */}
        <nav className="mt-6 flex gap-6 border-t px-6">
          <Can permission={PERMISSIONS.PROJECT_READ}>
            <ProjectNavigationItem title="Overview" path={overviewPath}>
              <LayoutDashboard size={17} />
            </ProjectNavigationItem>
          </Can>

          <Can permission={PERMISSIONS.TASK_READ}>
            <ProjectNavigationItem title="Tasks" path={tasksPath}>
              <CheckSquare size={17} />
            </ProjectNavigationItem>
          </Can>

          <Can permission={PERMISSIONS.PROJECT_READ}>
            <ProjectNavigationItem title="Members" path={membersPath}>
              <Users size={17} />
            </ProjectNavigationItem>
          </Can>
        </nav>
      </div>
    </div>
  );
};

export default ProjectNavigation;
