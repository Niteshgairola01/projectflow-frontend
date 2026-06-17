import { CheckSquare, FolderKanban, Users } from "lucide-react";
import type { WorkspaceProps } from "../types/workspace.types";

const WorkspaceStatsCard = ({ workspace }: WorkspaceProps) => {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-6 text-lg font-semibold text-primary">Quick Stats</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={18} />

            <span>Members</span>
          </div>

          <span className="font-semibold">
            {workspace.members.length || "N/A"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderKanban size={18} />

            <span>works</span>
          </div>

          <span className="font-semibold">8</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare size={18} />

            <span>Tasks</span>
          </div>

          <span className="font-semibold">46</span>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceStatsCard;
