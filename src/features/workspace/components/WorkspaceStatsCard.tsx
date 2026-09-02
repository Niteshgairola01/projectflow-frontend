import { FolderKanban, Users } from "lucide-react";
import type { WorkspaceProps } from "../types/workspace.types";
import { Card } from "../../../shared/components/ui/Card/Card";

const Stats = ({ title, value, children }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {children}
        <span>{title}</span>
      </div>

      <span className="font-semibold">{value ?? "N/A"}</span>
    </div>
  );
};

const WorkspaceStatsCard = ({ workspace }: WorkspaceProps) => {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold text-primary">Quick Stats</h2>

      <div className="space-y-4">
        <Stats title="Members" value={workspace.members.length}>
          <Users className="text-primary " size={20} />
        </Stats>
        <Stats title="Projects" value={workspace.projectsCount ?? 0}>
          <FolderKanban className="text-red-400 " size={20} />
        </Stats>
      </div>
    </Card>
  );
};

export default WorkspaceStatsCard;
