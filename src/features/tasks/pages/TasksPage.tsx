import { useState } from "react";
import EmptyTasksState from "../components/EmptyTasksState";
import TaskKanban from "../components/TaskKanban";
import TaskList from "../components/TaskList";
import TasksHeader from "../components/TasksHeader";
import TasksToolbar from "../components/TasksToolbar";
import { useFilteredProjectTasks } from "../hooks/useProjectTasks";
import type { TaskFilters } from "../types/task.types";

const TasksPage = () => {
  const [view, setView] = useState<"list" | "kanban">("kanban");
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    status: "",
    priority: "",
    assignee: "",
  });

  const { data, isLoading, isError } = useFilteredProjectTasks(filters);
  const tasks = data?.tasks ?? [];
  const total = data?.total ?? 0;

  const updateFilter = <K extends keyof TaskFilters>(
    key: K,
    value: TaskFilters[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      assignee: "",
    });
  };

  return (
    <div className="rounded-2xl border bg-card space-y-6">
      {/* Header */}
      <TasksHeader taskCount={total} />
      <TasksToolbar
        filters={filters}
        view={view}
        onViewChange={setView}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
      />

      {!isLoading && !isError && (
        <p aria-live="polite" className="px-6 text-sm text-muted-foreground">
          Showing {tasks.length} of {total} tasks
        </p>
      )}
      {/* Empty state */}
      {!isLoading && !isError && !total ? (
        <EmptyTasksState />
      ) : !isLoading && !isError && !tasks.length ? (
        <div className="px-6 py-12 text-center text-muted-foreground">
          <p>No tasks match your filters.</p>
          <button type="button" onClick={clearFilters} className="mt-3 text-primary">Clear filters</button>
        </div>
      ) : (
        <>
          {view === "list" ? (
            <TaskList
              tasks={tasks}
              isLoading={isLoading}
              isError={isError}
            />
          ) : (
            // <TaskList />
            <TaskKanban
              tasks={tasks}
              isLoading={isLoading}
              isError={isError}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TasksPage;
