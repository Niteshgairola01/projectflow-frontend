import type { SelectOption } from "../../../shared/types/common.types";

export const TASK_STATUSES = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

export const TASK_PRIORITIES = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
} as const;

export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES];
export type TaskPriority = (typeof TASK_PRIORITIES)[keyof typeof TASK_PRIORITIES];

export const isTaskStatus = (value: string): value is TaskStatus =>
  Object.values(TASK_STATUSES).some((status) => status === value);

export const isTaskPriority = (value: string): value is TaskPriority =>
  Object.values(TASK_PRIORITIES).some((priority) => priority === value);

export const taskStatusOptions = [
  {
    label: "To Do",
    value: "TODO",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "In Review",
    value: "IN_REVIEW",
  },
  {
    label: "Done",
    value: "DONE",
  },
] as const satisfies readonly SelectOption<TaskStatus>[];

export const taskPriorityOptions = [
  {
    label: "High",
    value: "HIGH",
  },
  {
    label: "Medium",
    value: "MEDIUM",
  },
  {
    label: "Low",
    value: "LOW",
  },
] as const satisfies readonly SelectOption<TaskPriority>[];

export const taskAssigStatusOptions = [
  {
    label: "Unassigned",
    value: "unassigned",
  },
] as const satisfies readonly SelectOption[];
