import { panel } from "../constants/dashboardStyles";
import { getStatusGradient, type DashboardSummary } from "../utils/dashboardUtils";

interface Props {
  summary: DashboardSummary;
  memberCount: number;
}

const DashboardTaskBreakdown = (props: Props) => {
  const { memberCount } = props;
  const { completion, totalTasks, statusCounts } = props.summary;
  const gradient = getStatusGradient(statusCounts, totalTasks);
  return (
    <section className={panel}>
      <h2 className="font-semibold">Task breakdown</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Progress across this workspace
      </p>
      <div
        className="relative mx-auto my-7 flex size-40 items-center justify-center rounded-full"
        role="img"
        aria-label={`${completion}% complete, ${totalTasks} total tasks`}
        style={{
          background: totalTasks
            ? `conic-gradient(${gradient})`
            : "var(--muted)",
        }}
      >
        <div className="flex size-32 flex-col items-center justify-center rounded-full bg-card">
          <span className="text-3xl font-bold">{completion}%</span>
          <span className="mt-1 text-xs text-muted-foreground">
            complete
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {statusCounts.map((status) => (
          <div
            key={status.value}
            className="flex items-center gap-2 text-sm"
          >
            <span
              className="size-2.5 rounded-full"
              style={{ background: status.color }}
            />
            <span className="flex-1 text-muted-foreground">
              {status.label}
            </span>
            <span className="font-semibold tabular-nums">
              {status.count}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-border pt-4 text-center text-xs text-muted-foreground">
        {totalTasks} total tasks · {memberCount}{" "}
        workspace members
      </p>
    </section>
  );
};

export default DashboardTaskBreakdown;
