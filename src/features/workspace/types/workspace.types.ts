export interface WorkspaceMember {
  user: string;
  role: string;
}

export interface CreateWorkspacePayload {
  name: String
}

export interface Workspace {
  _id: string;
  name: string;
  owner: string;
  members: WorkspaceMember[];

  craetedAt: string;
  updateat: string;
}
