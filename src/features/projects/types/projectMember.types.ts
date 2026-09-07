import type { ProjectRole } from "../constants/projectRoles";

export type ProjectMemberRole = ProjectRole;

export interface ProjectMemberUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ProjectMember {
  _id: string;
  user: ProjectMemberUser;
  role: ProjectMemberRole;
}

export interface AddProjectMemberPayload {
  userId: string;
  role: ProjectMemberRole;
}

export interface ProjectMembersResponse {
  members: ProjectMember[];
}
