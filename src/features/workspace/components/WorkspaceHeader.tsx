import { Plus } from "lucide-react";
import { useState } from "react";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import { Button } from "../../../shared/components/ui/Button/Button";
import Can from "../../../shared/components/auth/Can";
import { PERMISSIONS } from "../../../shared/constants/permissions";

const WorkspaceHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="m-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Workspaces</h1>

        <p className="mt-2 text-muted-foreground">Manage your workspaces</p>
      </div>

      <Can permission={PERMISSIONS.WORKSPACE_CREATE}>
        <Button
          className="inline-flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <Plus size={18} />
          Create Workspace
        </Button>
      </Can>

      <CreateWorkspaceModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default WorkspaceHeader;
