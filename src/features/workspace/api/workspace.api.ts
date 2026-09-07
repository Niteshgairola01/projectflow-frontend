import { api } from "../../../shared/services/api/axios";
import type { Workspace } from "../types/workspace.types";
import type { CreateWorkspacePayload } from "../schema/createWorkspaceSchema";
import type { ApiResponse } from "../../../shared/types/api.types";

const base = "/workspaces";

export const workspaceApi = {
  createWorkspace: async (data: CreateWorkspacePayload): Promise<Workspace> => {
    const response = await api.post<ApiResponse<Workspace>>(`${base}`, data);
    return response.data.data;
  },

  getWorkspaces: async (): Promise<Workspace[]> => {
    const response = await api.get<ApiResponse<Workspace[]>>(`${base}`);
    return response.data.data;
  },

  getWorkspaceById: async (id: string): Promise<Workspace> => {
    const response = await api.get<ApiResponse<Workspace>>(`${base}/${id}`);
    return response.data.data;
  },
};
