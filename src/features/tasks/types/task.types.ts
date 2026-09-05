export type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export interface TaskAssignee {
  _id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  workspace: string;
  project: string;
  createdBy: string;
  assignedTo?: TaskAssignee | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTask {
  _id: string;
  title: string;
  description?: string;
  workspace: string;
  project: string;
  createdBy: string;
  assignedTo?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  search: string;
  status: TaskStatus | "";
  priority: TaskPriority | "";
  assignee: string;
}
