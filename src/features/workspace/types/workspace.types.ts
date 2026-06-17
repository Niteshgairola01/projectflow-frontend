export interface WorkspaceMember {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  role: string;
}

export interface CreateWorkspacePayload {
  name: String;
  color?: String;
}

export interface Workspace {
  _id: string;
  name: string;
  owner: string;
  color?: string;
  members: WorkspaceMember[];

  createdAt: string;
  updateat: string;
}

export interface WorkspaceProps {
  workspace: Workspace;
}
