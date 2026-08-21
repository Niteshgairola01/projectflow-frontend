export type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  workspace: string;
  project: string;
  createdBy: string;
  assignedTo?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
