import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import UpdateTaskModal from "./UpdateTaskModal";
import type { Task } from "../types/task.types";

const { mutateAsync } = vi.hoisted(() => ({
  mutateAsync: vi.fn().mockResolvedValue({}),
}));

vi.mock("../hooks/useUpdateTask", () => ({
  useUpdateTask: () => ({ mutateAsync, isPending: false }),
}));

vi.mock("../../projects/hooks/useProjecMembers", () => ({
  useProjectMembers: () => ({ data: [] }),
}));

vi.mock("../../../shared/utils/toast", () => ({
  notify: { success: vi.fn(), error: vi.fn() },
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

it.each([null, undefined])(
  "saves a task whose end date is %s without requiring a date",
  async (dueDate) => {
    const task: Task = {
      _id: "task-1",
      title: "Task without a deadline",
      workspace: "workspace-1",
      project: "project-1",
      createdBy: "user-1",
      status: "TODO",
      priority: "LOW",
      createdAt: "2026-10-24",
      updatedAt: "2026-10-24",
      dueDate,
    };
    const onClose = vi.fn();
    render(<UpdateTaskModal open task={task} onClose={onClose} />);
    expect(screen.getByPlaceholderText("DD/MM/YYYY")).toHaveValue("");
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));
    await waitFor(() =>
      expect(mutateAsync).toHaveBeenCalledWith({
        taskId: "task-1",
        payload: expect.objectContaining({ title: task.title, dueDate: "" }),
      }),
    );
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  },
);
