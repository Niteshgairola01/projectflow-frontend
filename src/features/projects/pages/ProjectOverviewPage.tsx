import { useProjectContext } from "../../tasks/hooks/useProjectContext";
import ProjectInfoCard from "../components/ProjectInfoCard";
import ProjectStatsCard from "../components/ProjectStatsCard";

const ProjectOverviewPage = () => {
  const { project } = useProjectContext();

  return (
    <div className="space-y-6">
      <div className="grid min-w-0 gap-4 xl:grid-cols-3 sm:gap-6">
        <ProjectInfoCard project={project} />

        <ProjectStatsCard />
      </div>
    </div>
  );
};

export default ProjectOverviewPage;
