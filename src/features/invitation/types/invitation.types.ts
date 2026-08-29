export type InvitationStatus = "PENDING" | "ACCEPTED" | "EXPIRED" | "CANCELLED";

export interface Invitation {
  _id: string;
  workspace: string;
  email: string;
  invitedBy: {
    _id: string;
    name: string;
    email: string;
  };
  status: InvitationStatus;
  expiresAt: string;
  createdAt: string;
}
