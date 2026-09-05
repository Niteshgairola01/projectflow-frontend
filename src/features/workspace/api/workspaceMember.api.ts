import { api } from "../../../shared/services/api/axios";
import type { UpdateWorkspaceMemberRolePayload } from "../schema/updateWorkspaceMemberRoleSchema";
import type { WorkspaceMember } from "../types/workspace.types";

const base = "workspaces";

export const workspaceMemberApi = {
  updateWorkspaceMemberRole: async (
    workspceId: string,
    memberId: string,
    data: UpdateWorkspaceMemberRolePayload,
  ): Promise<WorkspaceMember> => {
    const response = await api.patch(
      `${base}/${workspceId}/members/${memberId}`,
      data,
    );

    return response.data?.data;
  },

  removeWorkspaceMemberRole: async (workspceId: string, memberId: string) => {
    const response = await api.delete(
      `${base}/${workspceId}/members/${memberId}`,
    );

    return response.data?.data;
  },
};
