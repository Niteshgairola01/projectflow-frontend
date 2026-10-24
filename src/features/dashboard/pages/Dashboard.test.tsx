import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Dashboard from "./Dashboard";

const mocks = vi.hoisted(() => ({ workspaces: vi.fn(), projects: vi.fn(), tasks: vi.fn() }));
vi.mock("../../workspace/hooks/useWorkspaces", () => ({ useWorkspaces: mocks.workspaces }));
vi.mock("@tanstack/react-query", async (importOriginal) => ({
  ...await importOriginal<typeof import("@tanstack/react-query")>(),
  useQuery: mocks.projects,
  useQueries: mocks.tasks,
}));
vi.mock("../../../shared/hooks/useAppSelector", () => ({ useAppSelector: (select: (state: unknown) => unknown) => select({ auth: { user: { _id: "me", name: "Alex Kim" } }, workspace: { currentWorkspace: null } }) }));
const result = (data: unknown) => ({ data, isPending: false, isError: false, refetch: vi.fn() });
const workspace = { _id: "w1", name: "Design team", members: [{ user: { _id: "me" } }] };
const project = { _id: "p1", name: "Website", status: "ACTIVE", updatedAt: "2026-01-01" };
const task = { _id: "t1", project: "p1", title: "Review designs", status: "TODO", priority: "HIGH", dueDate: "2020-01-01", assignedTo: { _id: "me", name: "Alex" } };
const renderDashboard = () => render(<MemoryRouter><Dashboard /></MemoryRouter>);

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.workspaces.mockReturnValue(result([workspace]));
    mocks.projects.mockReturnValue(result([project]));
    mocks.tasks.mockReturnValue([result([task, { ...task, _id: "t2", title: "Finished work", status: "DONE" }, { ...task, _id: "t3", title: "Team task", assignedTo: null, dueDate: undefined }])]);
  });
  it("summarizes real tasks, excludes completed work from the agenda, and filters personal assignments", () => {
    renderDashboard();
    expect(screen.getByRole("img")).toHaveAccessibleName("33% complete, 3 total tasks");
    expect(screen.getByText("1 overdue task needs attention. A little focus today can make a big difference.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Review designs/ })).toHaveAttribute("href", "/workspaces/w1/projects/p1/tasks/t1");
    expect(screen.queryByText("Finished work")).not.toBeInTheDocument();
    expect(screen.queryByText("Team task")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "All tasks" }));
    expect(screen.getByText("Team task")).toBeInTheDocument();
  });
  it("switches the workspace used for project queries", () => {
    mocks.workspaces.mockReturnValue(result([workspace, { ...workspace, _id: "w2", name: "Engineering" }]));
    renderDashboard();
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "w2" } });
    expect(mocks.projects.mock.lastCall?.[0].queryKey).toEqual(["projects", "list", "w2"]);
    expect(screen.getByRole("link", { name: "Explore projects" })).toHaveAttribute("href", "/workspaces/w2/projects");
  });
  it("guides users with no workspaces", () => {
    mocks.workspaces.mockReturnValue(result([]));
    mocks.projects.mockReturnValue(result(undefined));
    mocks.tasks.mockReturnValue([]);
    renderDashboard();
    expect(screen.getByText("Great work starts with a workspace")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go to workspaces/ })).toHaveAttribute("href", "/workspaces");
  });
  it("flags incomplete summaries and retries failed task requests", () => {
    const refetch = vi.fn();
    mocks.tasks.mockReturnValue([{ ...result(undefined), isError: true, refetch }]);
    renderDashboard();
    expect(screen.getByRole("alert")).toHaveTextContent("Summaries may be incomplete");
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(refetch).toHaveBeenCalledOnce();
  });
});
