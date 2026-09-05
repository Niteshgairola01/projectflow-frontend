import type { Task, TaskStatus } from "../types/task.types";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

import TaskKanbanColumn from "./TaskKanbanColumn";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { notify } from "../../../shared/utils/toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { useState } from "react";
import TaskKanbanCard from "./TaskKanbanCard";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

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
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const { mutateAsync } = useUpdateTask();
  const { can } = usePermissions();
  const canUpdateTasks = can(PERMISSIONS.TASK_UPDATE);

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

  const handleDragStart = (event: DragStartEvent) => {
    if (!canUpdateTasks) return;
    const task = tasks.find((task) => task._id === event.active.id);

    if (!task) return;

    setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!canUpdateTasks) return;
    const { active, over } = event;

    setActiveTask(null);

    if (!over) {
      return;
    }

    const currentStatus = active.data.current?.status;
    const newStatus = over.id as TaskStatus;

    if (currentStatus === newStatus) {
      return;
    }

    try {
      await mutateAsync({
        taskId: String(active.id),
        payload: {
          status: newStatus,
        },
      });
    } catch (error) {
      notify.error(getErrorMessage(error));
    }
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <div className="overflow-x-auto">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="grid min-w-287.5 grid-cols-4 gap-4 p-6">
          {columns.map((column) => (
            <TaskKanbanColumn
              key={column.id}
              title={column.title}
              status={column.id}
              tasks={groupedTasks[column.id]}
              activeTaskId={activeTask?._id}
              canCreate={can(PERMISSIONS.TASK_CREATE)}
              canDrag={canUpdateTasks}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <TaskKanbanCard task={activeTask} isDragging canDrag />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TaskKanban;
