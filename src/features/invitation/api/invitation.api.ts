import { api } from "../../../shared/services/api/axios";
import type { CreateInvitationPayload } from "../schema/invitationSchema";
import type { Invitation } from "../types/invitation.types";
import type { ApiResponse } from "../../../shared/types/api.types";

const base = "/workspaces";

export const invitaitonApis = {
  createInvitaion: async (
    workspaceId: string,
    data: CreateInvitationPayload,
  ): Promise<Invitation> => {
    const response = await api.post<ApiResponse<Invitation>>(`${base}/${workspaceId}/invitations`, data);

    return response.data.data;
  },

  getWorkspaceInvitations: async (
    workspaceId: string,
  ): Promise<Invitation[]> => {
    const response = await api.get<ApiResponse<Invitation[]>>(`${base}/${workspaceId}/invitations`);

    return response.data.data;
  },

  getInvitationByToken: async (token: string): Promise<Invitation> => {
    const response = await api.get<ApiResponse<Invitation>>(`${base}/invitations/${token}`);

    return response.data.data;
  },

  acceptInvitation: async (
    workspaceId: string,
    token: string,
  ): Promise<Invitation> => {
    const response = await api.post<ApiResponse<Invitation>>(
      `${base}/${workspaceId}/invitations/${token}/accept`,
    );

    return response.data.data;
  },

  getMyPendingInvitations: async (): Promise<Invitation[]> => {
    const response = await api.get<ApiResponse<Invitation[]>>(`${base}/invitations/my-pending`);

    return response.data.data;
  },

  cancelInvitation: async (
    workspaceId: string,
    invitationId: string,
  ): Promise<void> => {
    await api.delete(
      `${base}/${workspaceId}/invitations/${invitationId}`,
    );

  },
};
