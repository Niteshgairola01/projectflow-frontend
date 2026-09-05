import { Plus } from "lucide-react";
import { useState } from "react";

import CreateWorkspaceModal from "./CreateWorkspaceModal";
import { Button } from "../../../shared/components/ui/Button/Button";

const WorkspaceHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Workspaces
          </h1>

          <p className="mt-1.5 text-sm text-muted-foreground">
            Manage your workspaces
          </p>
        </div>

          <Button
            className="inline-flex items-center justify-center gap-2 sm:w-auto"
            onClick={() => setOpen(true)}
          >
            <Plus size={18} />
            Create Workspace
          </Button>
      </div>

      <CreateWorkspaceModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default WorkspaceHeader;
