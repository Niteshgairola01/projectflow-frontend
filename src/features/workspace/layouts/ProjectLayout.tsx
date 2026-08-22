import { Outlet, useParams } from "react-router-dom";
import { useProject } from "../../projects/hooks/useProject";
import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import ProjectNavigation from "../../projects/components/ProjectNavigation";

const ProjectLayout = () => {
  const { projectId } = useParams();

  const { data: project, isLoading, isError } = useProject();

  if (!projectId) {
    return <div>Invalid project</div>;
  }

  if (isLoading) {
    return <AppLoader message="Loading Project...." />;
  }

  if (isError) {
    <div className="rounded-2xl border bg-card p-8 text-center">
      <p className="font-medium">Failed to load project</p>

      <p className="mt-1 text-sm text-muted-foreground">
        Something went wrong while loading this project.
      </p>
    </div>;
  }

  if (!project) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center">
        <p className="font-medium">Project not found</p>

        <p className="mt-1 text-sm text-muted-foreground">
          The project you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Project specific content */}
      <ProjectNavigation project={project} />

      <Outlet context={{ project }} />
    </div>
  );
};

export default ProjectLayout;
