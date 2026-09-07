import { api } from "../../../shared/services/api/axios";
import type { UpdateProjectMemberRolePayload } from "../schema/updateProjectMemberRoleSchema";
import type {
  AddProjectMemberPayload,
  ProjectMember,
} from "../types/projectMember.types";
import type { ApiResponse } from "../../../shared/types/api.types";

const base = "workspaces";

export const projectMemberApis = {
  addProjectMember: async (
    workspaceId: string,
    projectId: string,
    data: AddProjectMemberPayload,
  ): Promise<ProjectMember> => {
    const response = await api.post<ApiResponse<ProjectMember>>(
      `/${base}/${workspaceId}/projects/${projectId}/members`,
      data,
    );

    return response.data.data;
  },

  getProjectMembers: async (
    workspaceId: string,
    projectId: string,
  ): Promise<ProjectMember[]> => {
    const response = await api.get<ApiResponse<ProjectMember[]>>(
      `/${base}/${workspaceId}/projects/${projectId}/members`,
    );

    return response.data.data;
  },

  removeProjectMember: async (
    workspaceId: string,
    projectId: string,
    memberId: string,
  ): Promise<void> => {
    await api.delete(
      `/${base}/${workspaceId}/projects/${projectId}/members/${memberId}`,
    );

  },

  updateProjectMemberRole: async (
    workspaceId: string,
    projectId: string,
    memberId: string,
    data: UpdateProjectMemberRolePayload,
  ): Promise<ProjectMember> => {
    const response = await api.patch<ApiResponse<ProjectMember>>(
      `/${base}/${workspaceId}/projects/${projectId}/members/${memberId}`,
      data,
    );

    return response.data.data;
  },
};
