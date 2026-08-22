import { useMemo, useState } from "react";
import EmptyTasksState from "../components/EmptyTasksState";
import TaskKanban from "../components/TaskKanban";
import TaskList from "../components/TaskList";
import TasksHeader from "../components/TasksHeader";
import TasksToolbar from "../components/TasksToolbar";
import { useProjectTasks } from "../hooks/useProjectTasks";
import type { TaskFilters } from "../types/task.types";

const TasksPage = () => {
  const [view, setView] = useState<"list" | "kanban">("kanban");
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    status: "",
    priority: "",
    assignee: "",
  });

  const { data: tasks, isLoading, isError } = useProjectTasks();

  const filteredTasks = useMemo(() => {
    const isObjectEmpty = Object.keys(filters)
      .map((key) => filters[key])
      .every((value) => value?.trim() === "");

    if (isObjectEmpty) return tasks;

    return tasks.filter((task) => {
      // Search
      const search = filters.search.trim().toLowerCase();

      const matchesSearch =
        !search ||
        task.title.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search);

      // Status
      const matchesStatus = !filters.status || task.status === filters.status;

      // Priority
      const matchesPriority =
        !filters.priority || task.priority === filters.priority;

      // Assignee
      const matchesAssignee = !filters.assignee || !task.assignedTo;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesAssignee
      );
    });
  }, [tasks, filters]);

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
      <TasksHeader taskCount={tasks?.length || 0} />
      <TasksToolbar
        filters={filters}
        view={view}
        onViewChange={setView}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
      />

      {/* Empty state */}
      {!tasks?.length ? (
        <EmptyTasksState />
      ) : (
        <>
          {view === "list" ? (
            <TaskList
              tasks={filteredTasks}
              isLoading={isLoading}
              isError={isError}
            />
          ) : (
            // <TaskList />
            <TaskKanban
              tasks={filteredTasks}
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
