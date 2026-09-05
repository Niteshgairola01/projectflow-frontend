import { Plus } from "lucide-react";
import { useState } from "react";

import CreateWorkspaceModal from "./CreateWorkspaceModal";
import { Button } from "../../../shared/components/ui/Button/Button";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";

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

        <Can permission={PERMISSIONS.WORKSPACE_CREATE}>
          <Button
              className="inline-flex items-center justify-center gap-2 sm:w-auto"
              onClick={() => setOpen(true)}
            >
              <Plus size={18} />
              Create Workspace
            </Button>
          </Can>
      </div>

      <CreateWorkspaceModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default WorkspaceHeader;
