import { useProjectContext } from "../../tasks/hooks/useProjectContext";
import ProjectInfoCard from "../components/ProjectInfoCard";
import ProjectStatsCard from "../components/ProjectStatsCard";
import ProjectTasksSection from "../components/ProjectTasksSection";

const ProjectOverviewPage = () => {
  const { project } = useProjectContext();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <ProjectInfoCard project={project} />

        <ProjectStatsCard />
      </div>

      <ProjectTasksSection />
    </div>
  );
};

export default ProjectOverviewPage;
