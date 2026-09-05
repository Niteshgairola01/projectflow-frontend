import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { taskApi } from "../api/task.api";
import type { UpdateTaskPayload } from "../schema/createTaskSchema";
import { taskKeys } from "../constants/task.keys";
import type { Task, UpdateTask } from "../types/task.types";

interface UpdateTaskVariables {
  taskId: string;
  payload: UpdateTaskPayload;
}

export const useUpdateTask = () => {
  const { workspaceId, projectId } = useParams();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, taskId }: UpdateTaskVariables) => {
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
      const previousTasks = queryClient.getQueryData<UpdateTask[]>(listKey);

      // Optimistically update the task list.
      queryClient.setQueryData<UpdateTask[]>(listKey, (oldTasks) => {
        if (!oldTasks) {
          return oldTasks;
        }

        return oldTasks.map((task) =>
          task._id === taskId
            ? {
                ...task,
                ...payload,
              }
            : task,
        );
      });

      // Optimistically update task details cache too.
      let previousTask = queryClient.getQueryData<UpdateTask>(detailKey);

      // previousTask.assignedTo = previousTask.assignedTo?._id;
      queryClient.setQueryData<UpdateTask>(detailKey, (oldTask) => {
        if (!oldTask) {
          return oldTask;
        }

        return {
          ...oldTask,
          ...payload,
        };
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
    onSettled: (_data, _error, _variables) => {
      if (!workspaceId || !projectId) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: taskKeys.list(workspaceId, projectId),
      });
    },
  });
};
