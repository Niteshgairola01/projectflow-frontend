import { api } from "../../../shared/services/api/axios";
import type { UpdateWorkspaceMemberRolePayload } from "../schema/updateWorkspaceMemberRoleSchema";
import type { WorkspaceMember } from "../types/workspace.types";
import type { ApiResponse } from "../../../shared/types/api.types";

const base = "workspaces";

export const workspaceMemberApi = {
  updateWorkspaceMemberRole: async (
    workspceId: string,
    memberId: string,
    data: UpdateWorkspaceMemberRolePayload,
  ): Promise<WorkspaceMember> => {
    const response = await api.patch<ApiResponse<WorkspaceMember>>(
      `${base}/${workspceId}/members/${memberId}`,
      data,
    );

    return response.data.data;
  },

  removeWorkspaceMember: async (workspceId: string, memberId: string): Promise<void> => {
    await api.delete(
      `${base}/${workspceId}/members/${memberId}`,
    );

  },
};
