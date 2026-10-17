import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import type { Task } from "../types/task.types";
import TasksPage from "./TasksPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { api } from "../../../shared/services/api/axios";
vi.mock("../../../shared/services/api/axios", () => ({
  api: { get: vi.fn() },
}));
vi.mock("../../projects/hooks/useProjecMembers", () => ({
  useProjectMembers: () => ({
    data: [
      { user: { _id: "alice", name: "Alice", email: "alice@example.com" } },
    ],
  }),
}));
vi.mock("../components/TasksHeader", () => ({ default: () => null }));
vi.mock("../components/TaskKanban", () => ({
  default: ({ tasks }: { tasks: Task[] }) => (
    <div data-testid="board">{tasks.map((task) => task.title).join(",")}</div>
  ),
}));
vi.mock("../components/TaskList", () => ({
  default: ({ tasks }: { tasks: Task[] }) => (
    <div data-testid="list">{tasks.map((task) => task.title).join(",")}</div>
  ),
}));
afterEach(cleanup);

it("sends combined filters to the server and displays its results in either view", async () => {
  vi.mocked(api.get).mockResolvedValue({
    data: {
      data: {
        tasks: [{ _id: "1", title: "Server task" }],
        total: 3,
        matching: 1,
      },
    },
  });
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <MemoryRouter initialEntries={["/workspaces/w/projects/p"]}>
        <Routes>
          <Route
            path="/workspaces/:workspaceId/projects/:projectId"
            element={<TasksPage />}
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
  await screen.findByText("Showing 1 of 3 tasks");
  fireEvent.change(screen.getByLabelText("Search tasks"), {
    target: { value: " LOGIN " },
  });
  fireEvent.change(screen.getByLabelText("Filter by status"), {
    target: { value: "TODO" },
  });
  fireEvent.change(screen.getByLabelText("Filter by priority"), {
    target: { value: "HIGH" },
  });
  fireEvent.change(screen.getByLabelText("Filter by assignee"), {
    target: { value: "alice" },
  });
  await waitFor(() =>
    expect(api.get).toHaveBeenLastCalledWith(
      "/workspaces/w/projects/p/tasks",
      expect.objectContaining({
        params: {
          filtered: "true",
          search: "LOGIN",
          status: "TODO",
          priority: "HIGH",
          assignee: "alice",
        },
      }),
    ),
  );
  // The title deliberately does not match the search: the client displays server results without refiltering.
  expect(await screen.findByTestId("board")).toHaveTextContent("Server task");
  fireEvent.click(screen.getByRole("button", { name: "List" }));
  expect(screen.getByTestId("list")).toHaveTextContent("Server task");
});
