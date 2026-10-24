import { FolderKanban, Layers3, CircleCheck, Clock3 } from "lucide-react";
import { panel } from "../constants/dashboardStyles";
import type { DashboardSummary } from "../utils/dashboardUtils";

interface Props {
  summary: DashboardSummary;
}

const DashboardStats = (props: Props) => {
  const { projectCount, activeProjectCount, openTaskCount, assignedTaskCount, completed, completion, overdueCount } = props.summary;
  return (
    <section
      aria-label="Workspace statistics"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {[
        {
          label: "Total projects",
          value: projectCount,
          detail: `${activeProjectCount} active projects`,
          icon: FolderKanban,
          color: "bg-violet-500/10 text-violet-500",
        },
        {
          label: "Open tasks",
          value: openTaskCount,
          detail: `${assignedTaskCount} assigned to you`,
          icon: Layers3,
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          label: "Completed",
          value: completed,
          detail: `${completion}% of all tasks`,
          icon: CircleCheck,
          color: "bg-emerald-500/10 text-emerald-500",
        },
        {
          label: "Overdue",
          value: overdueCount,
          detail: overdueCount
            ? "Needs your team's attention"
            : "No overdue tasks",
          icon: Clock3,
          color: "bg-amber-500/10 text-amber-500",
        },
      ].map(({ label, value, detail, icon: Icon, color }) => (
        <div key={label} className={panel}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            <span className={`rounded-xl p-2.5 ${color}`}>
              <Icon size={19} />
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight">
            {value}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
        </div>
      ))}
    </section>
  );
};

export default DashboardStats;
