import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { focus } from "../constants/dashboardStyles";
import type { Workspace } from "../../workspace/types/workspace.types";

interface Props {
  workspace: Workspace;
  overdueCount: number;
  openTaskCount: number;
  projectCount: number;
}

const DashboardWorkspaceSummary = (props: Props) => {
  const { workspace, overdueCount, openTaskCount, projectCount } = props;
  const workspaceId = workspace._id;
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white sm:p-8">
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-24 size-72 rounded-full border-[36px] border-white/5"
      />
      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            <span className="size-1.5 rounded-full bg-emerald-300" />
            Workspace snapshot
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {workspace.name}
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-indigo-100">
            {overdueCount
              ? `${overdueCount} overdue ${overdueCount === 1 ? "task needs" : "tasks need"} attention. A little focus today can make a big difference.`
              : openTaskCount
                ? `${openTaskCount} open tasks across ${projectCount} projects. Your next step is right below.`
                : "A clear view. A fresh start. Bring your next project to life."}
          </p>
        </div>
        <Link
          to={`/workspaces/${workspaceId}/projects`}
          className={`inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-3 text-sm font-semibold text-indigo-700 sm:self-auto ${focus}`}
        >
          Explore projects <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default DashboardWorkspaceSummary;
