import type { WorkspaceRole } from "../../../shared/constants/workSpaceRoles";

export type WorkspaceMemberRole = WorkspaceRole;

export interface WorkspaceMember {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  role: WorkspaceMemberRole;
}

export interface Workspace {
  _id: string;
  description?: string;
  name: string;
  owner: string;
  color?: string;
  members: WorkspaceMember[];
  projectsCount?: number;

  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceProps {
  workspace: Workspace;
}
