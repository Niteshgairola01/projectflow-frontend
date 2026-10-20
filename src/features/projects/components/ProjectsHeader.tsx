import { Plus } from "lucide-react";
import { Button } from "../../../shared/components/ui/Button/Button";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";

const ProjectsHeader = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="mt-2 text-muted-foreground">
            Manage projects in this workspace
          </p>
        </div>

        <Can permission={PERMISSIONS.PROJECT_CREATE}>
          <Button
            className="inline-flex shrink-0 items-center justify-center gap-2"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus size={18} />
            Create Project
          </Button>
        </Can>
      </div>

      {isCreateOpen && (
        <CreateProjectModal
          open={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectsHeader;
