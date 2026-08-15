import ProjectCard from "../components/ProjectCard";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectListSkeleton from "../components/skeletons/ProjectListSkeleton";
import { useProjects } from "../hooks/useProjects";

const ProjectsPage = () => {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="mt-2 text-muted-foreground">
            Manage projects in this workspace
          </p>
        </div>

        <ProjectListSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <p className="font-medium">Failed to load projects.</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectsHeader />

      {!projects?.length ? (
        <div className="rounded-2xl border bg-card py-16 text-center">
          <h3 className="text-lg font-semibold">No projects yet</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first project to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard project={project} key={project._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
