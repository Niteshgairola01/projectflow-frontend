export type ProjectStatus = "ACTIVE" | "ARCHIVED";

export interface Project {
  _id: string;
  name: string;
  description?: string;
  workspace: string;
  createdBy: string;
  status: ProjectStatus;
  color?: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
