import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import TaskKanbanCard from "./TaskKanbanCard";
import { PERMISSIONS } from "../../../shared/constants/permissions";
import type { Task } from "../types/task.types";

const { allowed, mutateAsync, dragStart } = vi.hoisted(() => ({
  allowed: new Set<string>(),
  mutateAsync: vi.fn(),
  dragStart: vi.fn(),
}));

vi.mock("../../../shared/hooks/usePermissions", () => ({
  usePermissions: () => ({
    can: (permission: string) => allowed.has(permission),
    isLoading: false,
  }),
}));

vi.mock("../hooks/useDeleteTasks", () => ({
  useDeleteTask: () => ({ mutateAsync, isPending: false }),
}));

vi.mock("./UpdateTaskModal", () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div>Edit task dialog</div> : null,
}));

vi.mock("@dnd-kit/core", () => ({
  useDraggable: () => ({
    attributes: {},
    listeners: { onPointerDown: dragStart },
    setNodeRef: vi.fn(),
    transform: null,
  }),
}));
const task: Task = {
  _id: "task-1",
  title: "Board task",
  workspace: "w",
  project: "p",
  createdBy: "u",
  status: "TODO",
  priority: "LOW",
  createdAt: "2026-10-24",
  updatedAt: "2026-10-24",
};
afterEach(() => {
  cleanup();
  allowed.clear();
  vi.clearAllMocks();
});

it("opens edit without navigating to or dragging the card", () => {
  allowed.add(PERMISSIONS.TASK_UPDATE);
  const navigate = vi.fn();
  render(<TaskKanbanCard task={task} onClick={navigate} canDrag />);
  const trigger = screen.getByRole("button", {
    name: "Actions for Board task",
  });
  fireEvent.pointerDown(trigger);
  fireEvent.click(trigger);
  expect(
    screen.queryByRole("button", { name: "Delete" }),
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Edit Task" }));
  expect(screen.getByText("Edit task dialog")).toBeInTheDocument();
  expect(navigate).not.toHaveBeenCalled();
  expect(dragStart).not.toHaveBeenCalled();
});

it("requires confirmation and awaits successful deletion", async () => {
  allowed.add(PERMISSIONS.TASK_DELETE);
  mutateAsync.mockResolvedValueOnce({});
  render(<TaskKanbanCard task={task} />);
  fireEvent.click(
    screen.getByRole("button", { name: "Actions for Board task" }),
  );
  expect(
    screen.queryByRole("button", { name: "Edit Task" }),
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Delete" }));
  expect(mutateAsync).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Delete Task" }));
  await waitFor(() =>
    expect(mutateAsync).toHaveBeenCalledWith({ taskId: task._id }),
  );
  await waitFor(() =>
    expect(
      screen.queryByRole("button", { name: "Delete Task" }),
    ).not.toBeInTheDocument(),
  );
});

it("keeps the confirmation open if deletion fails", async () => {
  allowed.add(PERMISSIONS.TASK_DELETE);
  mutateAsync.mockRejectedValueOnce(new Error("Failed"));
  render(<TaskKanbanCard task={task} />);
  fireEvent.click(
    screen.getByRole("button", { name: "Actions for Board task" }),
  );
  fireEvent.click(screen.getByRole("button", { name: "Delete" }));
  fireEvent.click(screen.getByRole("button", { name: "Delete Task" }));
  await waitFor(() => expect(mutateAsync).toHaveBeenCalled());
  expect(
    screen.getByRole("button", { name: "Delete Task" }),
  ).toBeInTheDocument();
});

it("hides actions when neither permission is granted", () => {
  render(<TaskKanbanCard task={task} />);
  expect(
    screen.queryByRole("button", { name: "Actions for Board task" }),
  ).not.toBeInTheDocument();
});

it("dismisses the menu on outside clicks and Escape", () => {
  allowed.add(PERMISSIONS.TASK_UPDATE);
  render(<TaskKanbanCard task={task} />);
  const trigger = screen.getByRole("button", {
    name: "Actions for Board task",
  });
  fireEvent.click(trigger);
  fireEvent.pointerDown(document.body);
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(trigger);
  fireEvent.keyDown(trigger, { key: "Escape" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});

it.each([{ isPlaceholder: true }, { isDragging: true }])(
  "hides actions on drag previews: %o",
  (props) => {
    allowed.add(PERMISSIONS.TASK_UPDATE);
    render(<TaskKanbanCard task={task} {...props} />);
    expect(
      screen.queryByRole("button", { name: "Actions for Board task" }),
    ).not.toBeInTheDocument();
  },
);
