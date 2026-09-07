import type { InvitationStatus } from "../constants/invitationStatuses";

export type { InvitationStatus } from "../constants/invitationStatuses";

export interface InvitationWorkspace {
  _id: string;
  name: string;
  color?: string;
}

export interface InvitationUser {
  _id: string;
  name: string;
  email: string;
}

export interface Invitation {
  _id: string;
  email: string;
  token?: string;
  workspace: InvitationWorkspace;
  invitedBy: InvitationUser;
  status: InvitationStatus;
  expiresAt: string;
  createdAt: string;
}
