import { Plus } from "lucide-react";
import { Button } from "../../../shared/components/ui/Button/Button";
import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";

const ProjectsHeader = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="mt-2 text-muted-foreground">
            Manage projects in this workspace
          </p>
        </div>

        <Button
          className="inline-flex items-center gap-2"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus size={18} />
          Create Project
        </Button>
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
