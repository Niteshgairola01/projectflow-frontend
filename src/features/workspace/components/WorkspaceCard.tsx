import { MoreVertical } from "lucide-react";
import type { WorkspaceMember } from "../types/workspace.types";

interface WorkspaceCardProps {
  name: string;
  members: WorkspaceMember[];
  role?: string;
  color?: string;
}

const roleStyles = {
  Owner: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  Admin: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Member: "bg-slate-100 text-slate-700 dark:bg-muted dark:text-muted-foreground",
};

const WorkspaceCard = ({ name, members, role, color }: WorkspaceCardProps) => {
  const roleClass = role
    ? roleStyles[role as keyof typeof roleStyles]
    : roleStyles.Member;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-5 transition-colors hover:bg-muted/40 cursor-pointer sm:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <div
          className="h-12 w-12 shrink-0 rounded-xl flex items-center justify-center text-white font-semibold"
          style={{
            backgroundColor: color ?? "#6366F1",
          }}
        >
          {name.charAt(0)}
        </div>

        <div className="min-w-0">
          <h3 className="font-medium text-sm">{name}</h3>

          <p className="text-xs text-muted-foreground mt-1">
            {members.length} members
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`px-3 py-1 rounded-lg text-xs font-medium ${roleClass}`}
        >
          {role}
        </span>

        <button>
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default WorkspaceCard;
