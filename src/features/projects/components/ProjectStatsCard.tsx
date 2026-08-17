import { CheckSquare, Clock3, ListTodo } from "lucide-react";

const ProjectStatsCard = () => {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="mb-6 text-lg font-semibold text-primary">Quick Stats</h2>

      <div className="space-y-5">
        {/* Total Tasks */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-muted p-2">
              <ListTodo size={18} />
            </div>

            <span className="text-sm">Total Tasks</span>
          </div>

          <span className="font-semibold">0</span>
        </div>

        {/* In Progress */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-muted p-2">
              <Clock3 size={18} />
            </div>

            <span className="text-sm">In Progress</span>
          </div>

          <span className="font-semibold">0</span>
        </div>

        {/* Completed */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-muted p-2">
              <CheckSquare size={18} />
            </div>

            <span className="text-sm">Completed</span>
          </div>

          <span className="font-semibold">0</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatsCard;
