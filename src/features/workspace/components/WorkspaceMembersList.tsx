import type { WorkspaceMember, WorkspaceProps } from "../types/workspace.types";

const WorkspaceMembersList = ({ workspace }: WorkspaceProps) => {
  return (
    <div className="rounded-2xl border bg-card">
      <div className="border-b px-6 py-4">
        <h2 className="font-semibold text-primary">Members</h2>
      </div>

      <div className="divide-y">
        {workspace.members?.map((member: WorkspaceMember) => (
          <div
            key={member?.user?._id}
            className="flex items-center justify-between px-6 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-medium uppercase">
                {member?.user?.name?.slice(0, 1)}
              </div>

              <div>
                <p className="font-medium">{member?.user?.name}</p>

                <p className="text-sm text-muted-foreground">
                  {member?.user?.email}
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm">
              {member?.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceMembersList;
