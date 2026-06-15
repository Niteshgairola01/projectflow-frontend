import { api } from "../../../shared/services/api/axios";
import type { CreateWorkspacePayload, Workspace } from "../types/workspace.types";

const base = "/workspaces";

export const workspaceApi = {
  createWorkspace: async (data: CreateWorkspacePayload): Promise<Workspace> => {
    const response = await api.post(`${base}`, data);
    return response.data?.data;
  },

  getWorkspaces: async (): Promise<Workspace[]> => {
    const response = await api.get(`${base}`);
    return response.data?.data;
  },

  getWorkspaceById: async (id: string): Promise<Workspace> => {
    const response = await api.get(`${base}/${id}`);
    return response.data?.data;
  },
};
