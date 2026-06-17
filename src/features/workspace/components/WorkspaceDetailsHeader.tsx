import type { WorkspaceProps } from "../types/workspace.types";

const WorkspaceDetailsHeader = ({ workspace }: WorkspaceProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{workspace.name}</h1>

      <p className="mt-2 text-muted-foreground">
        Manage workspace settings and members
      </p>
    </div>
  );
};

export default WorkspaceDetailsHeader;
