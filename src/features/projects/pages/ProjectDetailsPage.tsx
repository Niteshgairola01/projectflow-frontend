import AppLoader from "../../../shared/components/ui/Loader/AppLoader";
import ProjectHeader from "../components/ProjectHeader";
import ProjectInfoCard from "../components/ProjectInfoCard";
import ProjectStatsCard from "../components/ProjectStatsCard";
import ProjectTasksSection from "../components/ProjectTasksSection";
import { useProject } from "../hooks/uesProject";

const ProjectDetailsPage = () => {
  const { data: project, isLoading, isError } = useProject();

  if (isLoading) {
    return <AppLoader message="Loading project..." />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center">
        <p className="font-medium">Failed to load project</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while loading this project.
        </p>
      </div>
    );
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
      <ProjectHeader project={project} />

      <div className="grid gap-6 lg:grid-cols-3">
        <ProjectInfoCard project={project} />

        <ProjectStatsCard />
      </div>

      <ProjectTasksSection />
    </div>
  );
};

export default ProjectDetailsPage;
