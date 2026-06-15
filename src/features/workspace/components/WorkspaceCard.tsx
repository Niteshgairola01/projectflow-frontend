import { MoreVertical } from "lucide-react";
import type { WorkspaceMember } from "../types/workspace.types";

interface WorkspaceCardProps {
  name: string;
  members: WorkspaceMember[];
  role?: string;
  color?: string;
}

const roleStyles = {
  Owner: "bg-indigo-100 text-indigo-700",
  Admin: "bg-emerald-100 text-emerald-700",
  Member: "bg-slate-100 text-slate-700",
};

const WorkspaceCard = ({ name, members, role, color }: WorkspaceCardProps) => {
  const roleClass = role
    ? roleStyles[role as keyof typeof roleStyles]
    : roleStyles.Member;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-6
        py-5
        border-b
        hover:bg-muted/40
        transition-colors
        cursor-pointer
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            h-12
            w-12
            rounded-xl
            flex
            items-center
            justify-center
            text-white
            font-semibold
          "
          style={{
            backgroundColor: color ?? "#6366F1",
          }}
        >
          {name.charAt(0)}
        </div>

        <div>
          <h3 className="font-medium text-sm">{name}</h3>

          <p className="text-xs text-muted-foreground mt-1">
            {members.length} members
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`
            px-3
            py-1
            rounded-lg
            text-xs
            font-medium
            ${roleClass}
          `}
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
