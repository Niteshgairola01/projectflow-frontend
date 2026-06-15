import { Plus } from "lucide-react";

const WorkspaceHeader = () => {
  return (
    <div className="m-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Workspaces</h1>

        <p className="mt-2 text-muted-foreground">Manage your workspaces</p>
      </div>

      <button
        className="inline-flex items-center
            gap-2
            rounded-xl
            bg-primary
            px-5
            py-3
            text-sm
            font-medium
            text-white"
      >
        <Plus size={18} />
        Create Workspace
      </button>
    </div>
  );
};

export default WorkspaceHeader;
