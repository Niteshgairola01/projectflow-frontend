import { CheckCircle2, LayoutGrid, List, Search, X } from "lucide-react";
import { Input } from "../../../shared/components/ui/Input/Input";
import { Select } from "../../../shared/components/ui/Input/Select";
import {
  taskAssigStatusOptions,
  isTaskPriority,
  isTaskStatus,
  taskPriorityOptions,
  taskStatusOptions,
} from "../constants/taskOptions";
import type { TaskFilters } from "../types/task.types";
import { useProjectMembers } from "../../projects/hooks/useProjecMembers";

type TaskView = "list" | "kanban";

interface TasksToolbarProps {
  filters: TaskFilters;
  view: TaskView;
  onViewChange: (view: TaskView) => void;
  updateFilter: <K extends keyof TaskFilters>(
    key: K,
    value: TaskFilters[K]
  ) => void;
  clearFilters: () => void;
}

const TasksToolbar = ({
  filters,
  view,
  onViewChange,
  updateFilter,
  clearFilters,
}: TasksToolbarProps) => {
  const { data: members = [] } = useProjectMembers();
  const assigneeOptions = [
    ...taskAssigStatusOptions,
    ...members.filter((member) => member.user).map(({ user }) => ({
      value: user._id,
      label: `${user.name} (${user.email})`,
    })),
  ];
  const hasFilters =
    filters.search || filters.status || filters.priority || filters.assignee;

  return (
    <div className="flex min-w-0 flex-col gap-4 border-b px-4 pb-4 sm:px-6 2xl:flex-row 2xl:items-center 2xl:justify-between">
      {/* Left - Filters */}
      <div className="grid min-w-0 flex-1 grid-cols-1 items-center gap-2 sm:flex sm:flex-wrap">
        {/* Search */}
        <div className="relative min-w-0 sm:min-w-48 sm:flex-1 sm:basis-full xl:basis-auto xl:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            aria-label="Search tasks"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search tasks..."
            className="pl-9 pr-3"
          />
        </div>

        {/* Status */}
        <div className="relative">
          <CheckCircle2
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Select
            aria-label="Filter by status"
            value={filters.status}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || isTaskStatus(value)) {
                updateFilter("status", value);
              }
            }}
            placeholder="All Status"
            icon={<CheckCircle2 size={14} />}
            options={taskStatusOptions}
            className="h-10 w-full sm:w-36"
          />{" "}
        </div>

        {/* Priority */}
        <Select
          aria-label="Filter by priority"
          value={filters.priority}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || isTaskPriority(value)) {
              updateFilter("priority", value);
            }
          }}
          placeholder="All Priority"
          options={taskPriorityOptions}
          className="h-10 w-full sm:w-36"
        />
        {/* Assignee */}
        <Select
          aria-label="Filter by assignee"
          value={filters.assignee}
          onChange={(e) => updateFilter("assignee", e.target.value)}
          placeholder="Anyone"
          options={assigneeOptions}
          className="h-10 w-full sm:w-48"
        />

        {/* Filter indicator */}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Right - View switcher */}
      <div className="flex shrink-0 items-center self-start rounded-lg border bg-muted/40 p-1">
        <button
          type="button"
          aria-label="List"
          aria-pressed={view === "list"}
          onClick={() => onViewChange("list")}
          className={`inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition
            ${
              view === "list"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
        >
          <List size={16} />
          <span className="hidden sm:inline">List</span>
        </button>

        <button
          type="button"
          aria-label="Board"
          aria-pressed={view === "kanban"}
          onClick={() => onViewChange("kanban")}
          className={`inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium transition
            ${
              view === "kanban"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }
          `}
        >
          <LayoutGrid size={16} />
          <span className="hidden sm:inline">Board</span>
        </button>
      </div>
    </div>
  );
};

export default TasksToolbar;
