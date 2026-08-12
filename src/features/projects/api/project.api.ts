import { api } from "../../../shared/services/api/axios";
import type { CreateProjectPayload } from "../shcema/createProjectSchema";
import type { Project } from "../types/project.types";

const base = "/workspaces";

export const projectApi = {
  createProject: async (
    workspaceId: string,
    data: CreateProjectPayload
  ): Promise<Project> => {
    const response = await api.post(`${base}/${workspaceId}/projects`, data);

    return response.data?.data;
  },

  getAllProjects: async (workspaceId: string): Promise<Project[]> => {
    const response = await api.get(`${base}/${workspaceId}/projects`);

    return response.data?.data;
  },

  getProjectById: async (
    workspaceId: string,
    projectId: string
  ): Promise<Project> => {
    const response = await api.get(
      `${base}/${workspaceId}/projects/${projectId}`
    );

    return response.data?.data;
  },
};
