import { useProjectContext } from "../../tasks/hooks/useProjectContext";
import ProjectInfoCard from "../components/ProjectInfoCard";
import ProjectStatsCard from "../components/ProjectStatsCard";

const ProjectOverviewPage = () => {
  const { project } = useProjectContext();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3 h-100">
        <ProjectInfoCard project={project} />

        <ProjectStatsCard />
      </div>
    </div>
  );
};

export default ProjectOverviewPage;
