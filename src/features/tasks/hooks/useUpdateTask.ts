import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { taskApi } from "../api/task.api";
import type { UpdateTaskPayload } from "../schema/createTaskSchema";
import { taskKeys } from "../constants/task.keys";
import type { Task } from "../types/task.types";
import { usePermissions } from "../../../shared/hooks/usePermissions";
import { PERMISSIONS } from "../../../shared/constants/permissions";

interface UpdateTaskVariables {
  taskId: string;
  payload: UpdateTaskPayload;
}

const applyOptimisticUpdate = (
  task: Task,
  payload: UpdateTaskPayload,
): Task => {
  const { assignedTo, ...changes } = payload;

  if (assignedTo === undefined) return { ...task, ...changes };
  if (assignedTo === null || assignedTo === "") {
    return { ...task, ...changes, assignedTo: null };
  }

  return {
    ...task,
    ...changes,
    // The mutation only contains an assignee ID, while cached tasks contain
    // the full user. Keep the current user until the server response arrives.
    assignedTo: task.assignedTo,
  };
};

export const useUpdateTask = () => {
  const { workspaceId, projectId } = useParams();

  const queryClient = useQueryClient();
  const { can } = usePermissions();

  return useMutation({
    mutationFn: ({ payload, taskId }: UpdateTaskVariables) => {
      if (!can(PERMISSIONS.TASK_UPDATE)) throw new Error("Access denied");
      if (!workspaceId) {
        throw new Error("Workspace not found");
      }

      if (!projectId) {
        throw new Error("Project not found");
      }

      if (!taskId) {
        throw new Error("Task not found");
      }

      return taskApi.updateTask(workspaceId, projectId, taskId, payload);
    },

    /*
     * Optimistic update
     */
    onMutate: async ({ taskId, payload }) => {
      if (!workspaceId || !projectId) {
        return;
      }

      const listKey = taskKeys.list(workspaceId, projectId);

      const detailKey = taskKeys.detail(workspaceId, projectId, taskId);

      // Cancel any currently running task-list request.
      await queryClient.cancelQueries({
        queryKey: listKey,
      });

      // Save the current list so we can rollback if the API fails.
      const previousTasks = queryClient.getQueryData<Task[]>(listKey);

      // Optimistically update the task list.
      queryClient.setQueryData<Task[]>(listKey, (oldTasks) => {
        if (!oldTasks) {
          return oldTasks;
        }

        return oldTasks.map((task) =>
          task._id === taskId
            ? applyOptimisticUpdate(task, payload)
            : task,
        );
      });

      // Optimistically update task details cache too.
      const previousTask = queryClient.getQueryData<Task>(detailKey);

      queryClient.setQueryData<Task>(detailKey, (oldTask) => {
        if (!oldTask) {
          return oldTask;
        }

        return applyOptimisticUpdate(oldTask, payload);
      });

      //  Return everything required for rollback.
      return {
        previousTasks,
        previousTask,
        listKey,
        detailKey,
      };
    },

    onError: (_error, _variables, context) => {
      if (!context) {
        return;
      }

      // Restore task list
      queryClient.setQueryData(context.listKey, context.previousTasks);

      // Restore task details
      queryClient.setQueryData(context.detailKey, context.previousTask);
    },

    onSuccess: (updatedTask, variables) => {
      if (!workspaceId || !projectId) {
        return;
      }

      // Replace optimistic task with the actual server response.
      queryClient.setQueryData(
        taskKeys.detail(workspaceId, projectId, variables.taskId),
        updatedTask,
      );

      queryClient.setQueryData<Task[]>(
        taskKeys.list(workspaceId, projectId),
        (oldTasks) => {
          if (!oldTasks) {
            return oldTasks;
          }

          return oldTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task,
          );
        },
      );
    },

    // Always synchronize with server eventually.
    onSettled: () => {
      if (!workspaceId || !projectId) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: taskKeys.list(workspaceId, projectId),
      });
    },
  });
};
