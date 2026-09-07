import type { WorkspaceMemberRole } from "../types/workspace.types";

const WorkspaceMemberBadge = ({ role }: { role: WorkspaceMemberRole }) => {
  const roleStyles: Record<WorkspaceMemberRole, string> = {
    OWNER: "bg-violet-50 text-violet-700 ring-violet-600/10",
    ADMIN: "bg-blue-50 text-blue-700 ring-blue-600/10",
    MEMBER: "bg-slate-100 text-slate-700 ring-slate-600/10",
  };

  const roleLabels: Record<WorkspaceMemberRole, string> = {
    OWNER: "Owner",
    ADMIN: "Admin",
    MEMBER: "Member",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        roleStyles[role]
      }`}
    >
      {roleLabels[role]}
    </span>
  );
};

export default WorkspaceMemberBadge;
