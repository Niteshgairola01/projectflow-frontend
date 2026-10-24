import type { Workspace } from "../../workspace/types/workspace.types";
import { focus } from "../constants/dashboardStyles";

interface Props {
  userName?: string;
  workspaces: Workspace[];
  workspaceId: string;
  onWorkspaceChange: (id: string) => void;
}

const DashboardHeader = (props: Props) => {
  const { userName, workspaces, workspaceId, onWorkspaceChange } = props;
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Your work, at a glance
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Overview
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back{userName ? `, ${userName.split(" ")[0]}` : ""}. Let’s
          keep things moving.
        </p>
      </div>
      {workspaces.length > 0 && (
        <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
          Workspace
          <select
            value={workspaceId}
            onChange={(event) => onWorkspaceChange(event.target.value)}
            className={`h-11 max-w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground sm:w-56 ${focus}`}
          >
            {workspaces.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default DashboardHeader;
