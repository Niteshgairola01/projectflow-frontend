import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Search, Users } from "lucide-react";
import { Input } from "../../../shared/components/ui/Input/Input";
import { Button } from "../../../shared/components/ui/Button/Button";
import AddProjectMemberForm from "./AddMemberForm";
import type { WorkspaceMember } from "../../workspace/types/workspace.types";
import type { ProjectMember } from "../types/projectMember.types";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";

interface ProjectMembersHeaderProps {
  workspaceMembers: WorkspaceMember[];
  projectMembers: ProjectMember[];
}

const ProjectMembersHeader = ({
  workspaceMembers,
  projectMembers,
}: ProjectMembersHeaderProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { workspaceId, projectId } = useParams();

  return (
    <div className="flex flex-col gap-4 border-b px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />

          <h2 className="font-semibold text-foreground">Project Members</h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage members who can access and work on this project.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input className="w-full pl-9" placeholder="Search members..." />
        </div>

        <Can permission={PERMISSIONS.ADD_MEMBER_TO_PROJECT}>
          <Button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </Can>
      </div>

      <AddProjectMemberForm
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        workspaceId={workspaceId}
        projectId={projectId}
        workspaceMembers={workspaceMembers}
        projectMembers={projectMembers}
      />
    </div>
  );
};

export default ProjectMembersHeader;
