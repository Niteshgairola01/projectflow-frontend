import { api } from "../../../shared/services/api/axios";
import type {
  CreateProjectPayload,
  UpdateProjectPayload,
} from "../schema/createProjectSchema";
import type { Project } from "../types/project.types";
import type { ApiResponse } from "../../../shared/types/api.types";

const base = "/workspaces";

export const projectApi = {
  createProject: async (
    workspaceId: string,
    data: CreateProjectPayload
  ): Promise<Project> => {
    const response = await api.post<ApiResponse<Project>>(`${base}/${workspaceId}/projects`, data);

    return response.data.data;
  },

  getProjects: async (workspaceId: string): Promise<Project[]> => {
    const response = await api.get<ApiResponse<Project[]>>(`${base}/${workspaceId}/projects`);

    return response.data.data;
  },

  getProjectById: async (
    workspaceId: string,
    projectId: string
  ): Promise<Project> => {
    const response = await api.get<ApiResponse<Project>>(
      `${base}/${workspaceId}/projects/${projectId}`
    );

    return response.data.data;
  },

  updateProject: async (
    workspaceId: string,
    projectId: string,
    data: UpdateProjectPayload
  ): Promise<Project> => {
    const response = await api.patch<ApiResponse<Project>>(
      `${base}/${workspaceId}/projects/${projectId}`,
      data
    );

    return response.data.data;
  },

  deleteProject: async (
    workspaceId: string,
    projectId: string
  ): Promise<void> => {
    await api.delete(
      `${base}/${workspaceId}/projects/${projectId}`
    );

  },
};
