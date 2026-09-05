import { api } from "../../../shared/services/api/axios";
import type { UpdateProjectMemberRolePayload } from "../schema/updateProjectMemberRoleSchema";
import type {
  AddProjectMemberPayload,
  ProjectMember,
} from "../types/projectMember.types";

const base = "workspaces";

export const projectMemberApis = {
  addProjectMember: async (
    workspaceId: string,
    projectId: string,
    data: AddProjectMemberPayload,
  ): Promise<ProjectMember> => {
    const response = await api.post(
      `/${base}/${workspaceId}/projects/${projectId}/members`,
      data,
    );

    return response.data?.data;
  },

  getProjectMembers: async (
    workspaceId: string,
    projectId: string,
  ): Promise<ProjectMember[]> => {
    const response = await api.get(
      `/${base}/${workspaceId}/projects/${projectId}/members`,
    );

    return response.data?.data;
  },

  removeProjectMember: async (
    workspaceId: string,
    projectId: string,
    memberId: string,
  ) => {
    const response = await api.delete(
      `/${base}/${workspaceId}/projects/${projectId}/members/${memberId}`,
    );

    return response.data?.data;
  },

  updateProjectMemberRole: async (
    workspaceId: string,
    projectId: string,
    memberId: string,
    data: UpdateProjectMemberRolePayload,
  ): Promise<ProjectMember> => {
    const response = await api.patch(
      `/${base}/${workspaceId}/projects/${projectId}/members/${memberId}`,
      data,
    );

    return response.data?.data;
  },
};
