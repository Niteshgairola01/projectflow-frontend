import { api } from "../../../shared/services/api/axios";
import type { CreateInvitationPayload } from "../schema/invitationSchema";
import type { Invitation } from "../types/invitation.types";

const base = "/workspaces";

export const invitaitonApis = {
  createInvitaion: async (
    workspaceId: string,
    data: CreateInvitationPayload,
  ): Promise<Invitation> => {
    const response = await api.post(`${base}/${workspaceId}/invitations`, data);

    return response.data?.data;
  },

  getWorkspaceInvitations: async (
    workspaceId: string,
  ): Promise<Invitation[]> => {
    const response = await api.get(`${base}/${workspaceId}/invitations`);

    return response.data?.data;
  },

  getInvitationByToken: async (token: string): Promise<Invitation> => {
    const response = await api.get(`${base}/invitations/${token}`);

    return response.data?.data;
  },

  acceptInvitation: async (
    workspaceId: string,
    token: string,
  ): Promise<Invitation> => {
    const response = await api.post(
      `${base}/${workspaceId}/invitations/${token}/accept`,
    );

    return response.data?.data;
  },

  getMyPendingInvitations: async (): Promise<Invitation[]> => {
    const response = await api.get(`${base}/invitations/my-pending`);

    return response.data?.data;
  },

  cancelInvitation: async (
    workspaceId: string,
    invitationId: string,
  ): Promise<Invitation[]> => {
    const response = await api.delete(
      `${base}/${workspaceId}/invitations/${invitationId}`,
    );

    return response.data?.data;
  },
};
