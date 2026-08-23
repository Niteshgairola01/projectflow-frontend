import type { Task, TaskStatus } from "../types/task.types";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

import TaskKanbanColumn from "./TaskKanbanColumn";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { notify } from "../../../shared/utils/toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

const columns: {
  id: TaskStatus;
  title: string;
}[] = [
  {
    id: "TODO",
    title: "To Do",
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
  },
  {
    id: "IN_REVIEW",
    title: "In Review",
  },
  {
    id: "DONE",
    title: "Done",
  },
];

interface TaskKanbanProps {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
}

const TaskKanban = ({ tasks, isLoading, isError }: TaskKanbanProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const { mutateAsync } = useUpdateTask();

  if (isLoading) {
    return (
      <div className="grid gap-4 overflow-x-auto p-6 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="min-h-125 min-w-70 rounded-xl bg-muted/40 p-3"
          >
            <div className="mb-4 h-5 w-24 animate-pulse rounded bg-muted" />

            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="font-medium">Failed to load tasks</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while loading the tasks.
        </p>
      </div>
    );
  }

  const groupedTasks = columns.reduce<Record<TaskStatus, Task[]>>(
    (accumulator, column) => {
      accumulator[column.id] =
        tasks?.filter((task) => task.status === column.id) ?? [];

      return accumulator;
    },
    {
      TODO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      DONE: [],
    },
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    const isSameColumn = active?.data?.current?.status === over?.id;

    if (isSameColumn) return;

    try {
      await mutateAsync({
        payload: {
          status: over?.id,
        },
        taskId: active?.id,
      });

      notify.success("Task status updated successfully");
    } catch (error) {
      const errorMemssage = getErrorMessage(error);
      notify.error(errorMemssage);
    }
  };

  return (
    <div className="overflow-x-auto">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid min-w-287.5 grid-cols-4 gap-4 p-6">
          {columns.map((column) => (
            <TaskKanbanColumn
              key={column.id}
              title={column.title}
              status={column.id}
              tasks={groupedTasks[column.id]}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default TaskKanban;
