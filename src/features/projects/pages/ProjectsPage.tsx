import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks/useProjects";

const ProjectsPage = () => {
  const workspaceId = "6a317c9baa20a40f266df4a5";

  if (!workspaceId) {
    return <div>Invalid workspace</div>;
  }

  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (isError) {
    return <div>Failed to load projects.</div>;
  }

  if (!projects?.length) {
    return <div>No projects yet.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>

        <p className="mt-2 text-muted-foreground">
          Manage projects in this workspace
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard project={project} key={project?._id} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
