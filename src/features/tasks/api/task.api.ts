import { api } from "../../../shared/services/api/axios";
import type {
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../schema/createTaskSchema";
import type { Task } from "../types/task.types";
import type { ApiResponse } from "../../../shared/types/api.types";

const base = "/workspaces";

export const taskApi = {
  createTask: async (
    workspaceId: string,
    projectId: string,
    payload: CreateTaskPayload,
  ): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>(
      `${base}/${workspaceId}/projects/${projectId}/tasks`,
      payload,
    );

    return response.data.data;
  },

  getTasksByProject: async (
    workspaceId: string,
    projectId: string,
  ): Promise<Task[]> => {
    const response = await api.get<ApiResponse<Task[]>>(
      `${base}/${workspaceId}/projects/${projectId}/tasks`,
    );

    return response.data.data;
  },

  getTaskById: async (
    workspaceId: string,
    projectId: string,
    taskId: string,
  ): Promise<Task> => {
    const response = await api.get<ApiResponse<Task>>(
      `${base}/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
    );

    return response.data.data;
  },

  updateTask: async (
    workspaceId: string,
    projectId: string,
    taskId: string,
    payload: UpdateTaskPayload,
  ): Promise<Task> => {
    const response = await api.patch<ApiResponse<Task>>(
      `${base}/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
      payload,
    );

    return response.data.data;
  },

  deleteTask: async (
    workspaceId: string,
    projectId: string,
    taskId: string,
  ): Promise<void> => {
    await api.delete(
      `${base}/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
    );
  },
};
