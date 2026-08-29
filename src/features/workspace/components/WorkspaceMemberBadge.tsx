const WorkspaceMemberBadge = ({ role }: { role: string }) => {
  const roleStyles: Record<string, string> = {
    OWNER: "bg-violet-50 text-violet-700 ring-violet-600/10",
    ADMIN: "bg-blue-50 text-blue-700 ring-blue-600/10",
    MEMBER: "bg-slate-100 text-slate-700 ring-slate-600/10",
    VIEWER: "bg-amber-50 text-amber-700 ring-amber-600/10",
  };

  const roleLabels: Record<string, string> = {
    OWNER: "Owner",
    ADMIN: "Admin",
    MEMBER: "Member",
    VIEWER: "Viewer",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        roleStyles[role] ?? "bg-slate-100 text-slate-700 ring-slate-600/10"
      }`}
    >
      {roleLabels[role] ?? role}
    </span>
  );
};

export default WorkspaceMemberBadge;
