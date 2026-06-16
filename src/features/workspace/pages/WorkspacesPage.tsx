import WorkspaceCard from "../components/WorkspaceCard";
import { useWorkspaces } from "../hooks/useWorkspaces";
import WorkspaceHeader from "../components/WorkspaceHeader";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";

const WorkspacesPage = () => {
  const { data: workspaces, isLoading, isError } = useWorkspaces();

  const user = useAppSelector((state) => state.auth.user);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-24 animate-pulse rounded-xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border p-8">Failed to load workspaces.</div>
    );
  }

  if (!workspaces?.length) {
    return (
      <div className="">
        {/* header */}
        <WorkspaceHeader />

        <div className="flex flex-col items-center justify-center rounded-2xl border bg-card py-20">
          <h3 className="text-lg font-semibold">No workspaces yet</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first workspace
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* header */}
      <WorkspaceHeader />

      {/* card */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        {workspaces?.map((workspace) => {
          const member = workspace.members.find(
            (member) => member.user === user?._id
          );

          return (
            <WorkspaceCard
              name={workspace.name}
              members={workspace.members}
              role={member?.role}
              color={workspace?.color}
              key={workspace._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkspacesPage;
