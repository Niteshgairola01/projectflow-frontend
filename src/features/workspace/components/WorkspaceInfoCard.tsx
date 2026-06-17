import { formatDate } from "../../../shared/utils/formateDate";
import type { Workspace } from "../types/workspace.types";

interface WorkspaceInfoCardProps {
  workspace: Workspace;
  role: string;
}

const WorkspaceInfoCard = ({ workspace, role }: WorkspaceInfoCardProps) => {
  return (
    <div className="lg:col-span-2 rounded-2xl border bg-card p-6">
      <h2 className="mb-6 text-lg font-semibold text-primary">
        Workspace Information
      </h2>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Name</p>

          <p className="mt-1 font-medium">{workspace.name}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Your Role</p>

          <span className="mt-1 inline-flex rounded-lg bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            {role}
          </span>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Created At</p>

          <p className="mt-1 font-medium">{formatDate(workspace.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceInfoCard;
