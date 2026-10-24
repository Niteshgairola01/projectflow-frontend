import { useDashboardData } from "../hooks/useDashboardData";
import DashboardHeader from "../components/DashboardHeader";
import DashboardError from "../components/DashboardError";
import DashboardSkeleton from "../components/DashboardSkeleton";
import DashboardEmptyState from "../components/DashboardEmptyState";
import DashboardWorkspaceSummary from "../components/DashboardWorkspaceSummary";
import DashboardStats from "../components/DashboardStats";
import DashboardTaskAgenda from "../components/DashboardTaskAgenda";
import DashboardTaskBreakdown from "../components/DashboardTaskBreakdown";
import DashboardProjectPulse from "../components/DashboardProjectPulse";

const Dashboard = () => {
  
  const {
    user,
    workspaces,
    workspace,
    workspaceId,
    projects,
    tasks,
    loading,
    hasError,
    retry,
    setSelectedWorkspace,
    summary,
  } = useDashboardData();

  return (
    <div className="w-full min-w-0 space-y-6 pb-6">
      <DashboardHeader
        userName={user?.name}
        workspaces={workspaces}
        workspaceId={workspaceId}
        onWorkspaceChange={setSelectedWorkspace}
      />
      {hasError && <DashboardError onRetry={retry} />}
      {loading ? (
        <DashboardSkeleton />
      ) : !workspace ? (
        <DashboardEmptyState />
      ) : (
        <>
          <DashboardWorkspaceSummary
            workspace={workspace}
            overdueCount={summary.overdueCount}
            openTaskCount={summary.openTaskCount}
            projectCount={summary.projectCount}
          />
          <DashboardStats summary={summary} />
          <div className="grid gap-6 xl:grid-cols-3">
            <DashboardTaskAgenda
              tasks={tasks}
              projects={projects}
              workspaceId={workspaceId}
              userId={user?._id}
            />
            <DashboardTaskBreakdown
              summary={summary}
              memberCount={workspace.members.length}
            />
          </div>
          <DashboardProjectPulse
            workspaceId={workspaceId}
            projectSummaries={summary.projectSummaries}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
