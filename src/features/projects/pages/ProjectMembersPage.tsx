import { useParams } from "react-router-dom";
import { useWorkspace } from "../../workspace/hooks/useWorkspace";
import ProjectMembersList from "../components/ProjectMembersList";

const ProjectMembersPage = () => {
  const { workspaceId } = useParams();

  const { data: workspace } = useWorkspace(workspaceId);

  return <ProjectMembersList workspaceMembers={workspace?.members || []} />;
};

export default ProjectMembersPage;
