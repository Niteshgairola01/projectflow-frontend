import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import TaskComments from "./TaskComments";
import type { CommentResponse, CommentThreadResponse } from "../types/comment.types";

const { add, edit, errorToast, permissions } = vi.hoisted(() => ({
  add: vi.fn(), edit: vi.fn(), errorToast: vi.fn(), permissions: new Set<string>(),
}));
const comments: CommentThreadResponse[] = [
  { _id: "parent", author: { _id: "rahul", name: "Rahul Sharma" }, content: "Please review the layout.", taskId: "task", parentComment: null, isEdited: false, isDeleted: false, deletedAt: null, createdAt: "2026-11-22T09:00:00Z", updatedAt: "2026-11-22T09:00:00Z" },
  { _id: "reply", author: { _id: "me", name: "Nitesh" }, content: "The spacing looks good.", taskId: "task", parentComment: "parent", isEdited: false, isDeleted: false, deletedAt: null, createdAt: "2026-11-22T10:00:00Z", updatedAt: "2026-11-22T10:00:00Z" },
];
vi.mock("../hooks/useGetTaskComments", () => ({ useGetTaskComments: () => ({ data: comments, isLoading: false, isError: false }) }));
vi.mock("../hooks/useAddComment", () => ({ useAddComment: () => ({ mutateAsync: add, isPending: false }) }));
vi.mock("../hooks/useEditComment", () => ({ useEditComment: () => ({ mutateAsync: edit, isPending: false }) }));
vi.mock("../hooks/useDeleteComment", () => ({ useDeleteComment: () => ({ mutateAsync: vi.fn(), isPending: false }) }));
vi.mock("../../../shared/hooks/useAppSelector", () => ({ useAppSelector: () => ({ _id: "me", name: "Nitesh" }) }));
vi.mock("../../../shared/hooks/usePermissions", () => ({ usePermissions: () => ({ can: (permission: string) => permissions.has(permission), isLoading: false }) }));
vi.mock("../../../shared/utils/toast", () => ({ notify: { success: vi.fn(), error: errorToast } }));
vi.mock("../../../shared/components/ui/Modal/ConfirmModal", () => ({ default: () => null }));

beforeEach(() => {
  permissions.add("comment:add"); permissions.add("comment:edit"); permissions.add("comment:delete");
  add.mockResolvedValue({}); edit.mockResolvedValue({});
});
afterEach(() => { cleanup(); vi.resetAllMocks(); permissions.clear(); });

it("posts to the selected parent through the shared composer and returns to create mode", async () => {
  render(<TaskComments />);
  fireEvent.click(screen.getAllByRole("button", { name: "Reply" })[0]!);
  expect(screen.getByText("Replying to: Rahul Sharma")).toBeInTheDocument();
  expect(screen.getAllByRole("textbox")).toHaveLength(1);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "  Thanks for the update  " } });
  fireEvent.click(screen.getByRole("button", { name: "Post reply" }));
  await waitFor(() => expect(add).toHaveBeenCalledWith({ content: "Thanks for the update", parentComment: "parent" }));
  await waitFor(() => expect(screen.getByRole("button", { name: "Post comment" })).toBeInTheDocument());
});

it("replies to an existing reply using that reply’s own ID", async () => {
  render(<TaskComments />);
  fireEvent.click(screen.getByRole("button", { name: "View 1 reply" }));
  fireEvent.click(screen.getAllByRole("button", { name: "Reply" })[1]!);
  expect(screen.getByText("Replying to: Nitesh")).toBeInTheDocument();
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Thank you!" } });
  fireEvent.click(screen.getByRole("button", { name: "Post reply" }));
  await waitFor(() => expect(add).toHaveBeenCalledWith({ content: "Thank you!", parentComment: "reply" }));
});

it("preserves the main draft and reply draft when cancelling and switching modes", () => {
  render(<TaskComments />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Unfinished main comment" } });
  fireEvent.click(screen.getAllByRole("button", { name: "Reply" })[0]!);
  expect(screen.getByRole("textbox")).toHaveValue("");
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Unfinished reply" } });
  fireEvent.click(screen.getByRole("button", { name: "Cancel reply" }));
  expect(screen.getByRole("textbox")).toHaveValue("Unfinished main comment");
  fireEvent.click(screen.getAllByRole("button", { name: "Reply" })[0]!);
  expect(screen.getByRole("textbox")).toHaveValue("Unfinished reply");
});

it("keeps reply content on failure and prevents mode changes while saving", async () => {
  let rejectRequest!: (error: Error) => void;
  add.mockImplementation(() => new Promise((_, reject) => { rejectRequest = reject; }));
  render(<TaskComments />);
  fireEvent.click(screen.getAllByRole("button", { name: "Reply" })[0]!);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Keep my reply" } });
  fireEvent.click(screen.getByRole("button", { name: "Post reply" }));
  await waitFor(() => expect(add).toHaveBeenCalledTimes(1));
  expect(screen.getByRole("button", { name: "Cancel reply" })).toBeDisabled();
  expect(screen.getAllByRole("button", { name: "Reply" })[0]).toBeDisabled();
  rejectRequest(new Error("Network error"));
  await waitFor(() => expect(errorToast).toHaveBeenCalled());
  expect(screen.getByRole("textbox")).toHaveValue("Keep my reply");
  expect(screen.getByText("Replying to: Rahul Sharma")).toBeInTheDocument();
});

it("switches from reply to editing without submitting a parent ID in an edit", async () => {
  render(<TaskComments />);
  fireEvent.click(screen.getAllByRole("button", { name: "Reply" })[0]!);
  fireEvent.click(screen.getByRole("button", { name: "View 1 reply" }));
  fireEvent.click(screen.getByRole("button", { name: "Comment actions" }));
  fireEvent.click(screen.getByRole("button", { name: "Edit Comment" }));
  expect(screen.queryByText("Replying to: Rahul Sharma")).not.toBeInTheDocument();
  expect(screen.getByRole("textbox")).toHaveValue("The spacing looks good.");
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Updated reply" } });
  fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
  await waitFor(() => expect(edit).toHaveBeenCalledWith({ commentId: "reply", payload: { content: "Updated reply" } }));
});

it("omits parentComment for main comments and hides Reply without permission", async () => {
  permissions.delete("comment:add");
  render(<TaskComments />);
  expect(screen.queryByRole("button", { name: "Reply" })).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "A main comment" } });
  fireEvent.click(screen.getByRole("button", { name: "Post comment" }));
  await waitFor(() => expect(add).toHaveBeenCalledWith({ content: "A main comment" }));
});

it("renders multiple reply levels under their immediate parents", () => {
  const nested: CommentResponse = { ...(comments[1]! as CommentResponse), _id: "nested", parentComment: "reply", author: { _id: "amit", name: "Amit" }, content: "A deeply nested reply" };
  comments.push(nested);
  try {
    render(<TaskComments />);
    fireEvent.click(screen.getByRole("button", { name: "View 1 reply" }));
    fireEvent.click(screen.getByRole("button", { name: "View 1 reply" }));
    const parentThread = screen.getByText("Please review the layout.").closest("li")!;
    const replyThread = screen.getByText("The spacing looks good.").closest("li")!;
    const nestedThread = screen.getByText("A deeply nested reply").closest("li")!;
    expect(parentThread).toContainElement(replyThread);
    expect(replyThread).toContainElement(nestedThread);
    fireEvent.click(within(nestedThread).getByRole("button", { name: "Reply" }));
    expect(screen.getByText("Replying to: Amit")).toBeInTheDocument();
  } finally {
    comments.pop();
  }
});

it("keeps descendants visible when their immediate parent is missing", () => {
  const orphan: CommentResponse = { ...(comments[1]! as CommentResponse), _id: "orphan", parentComment: "deleted", content: "Reply to a deleted comment" };
  const child: CommentResponse = { ...(comments[1]! as CommentResponse), _id: "orphan-child", parentComment: "orphan", content: "Still part of this discussion" };
  comments.push(orphan, child);
  try {
    render(<TaskComments />);
    expect(screen.getByText("Original comment is no longer available.")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "View 1 reply" })[1]!);
    fireEvent.click(screen.getAllByRole("button", { name: "View 1 reply" })[1]!);
    const thread = screen.getByText("Reply to a deleted comment").closest("li")!;
    expect(within(thread).getByText("Still part of this discussion")).toBeInTheDocument();
  } finally {
    comments.splice(-2);
  }
});

it("collapses replies initially and toggles only the clicked thread", () => {
  const otherParent: CommentResponse = { ...(comments[0]! as CommentResponse), _id: "other-parent", content: "Another discussion" };
  const otherReply: CommentResponse = { ...(comments[1]! as CommentResponse), _id: "other-reply", parentComment: "other-parent", content: "Another reply" };
  comments.push(otherParent, otherReply);
  try {
    render(<TaskComments />);
    expect(screen.queryByText("The spacing looks good.")).not.toBeInTheDocument();
    expect(screen.queryByText("Another reply")).not.toBeInTheDocument();
    const toggle = screen.getAllByRole("button", { name: "View 1 reply" })[0]!;
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("The spacing looks good.")).toBeInTheDocument();
    expect(screen.queryByText("Another reply")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Hide 1 reply" }));
    expect(screen.queryByText("The spacing looks good.")).not.toBeInTheDocument();
  } finally {
    comments.splice(-2);
  }
});

it("preserves a deleted intermediate comment without author, content or actions", () => {
  const placeholder: CommentThreadResponse = {
    _id: "deleted-middle", taskId: "task", parentComment: "reply", isDeleted: true,
    isEdited: false, deletedAt: "2026-11-22T11:00:00Z", createdAt: "2026-11-22T10:30:00Z", updatedAt: "2026-11-22T11:00:00Z",
  };
  const survivor: CommentResponse = { ...(comments[1]! as CommentResponse), _id: "survivor", parentComment: "deleted-middle", content: "Surviving discussion" };
  comments.push(placeholder, survivor);
  try {
    render(<TaskComments />);
    fireEvent.click(screen.getByRole("button", { name: "View 1 reply" }));
    fireEvent.click(screen.getByRole("button", { name: "View 1 reply" }));
    const placeholderRow = screen.getByText("Comment deleted").closest("li")!;
    expect(within(placeholderRow).queryByRole("button", { name: "Reply" })).not.toBeInTheDocument();
    expect(within(placeholderRow).queryByRole("button", { name: "Comment actions" })).not.toBeInTheDocument();
    fireEvent.click(within(placeholderRow).getByRole("button", { name: "View 1 reply" }));
    expect(within(placeholderRow).getByText("Surviving discussion")).toBeInTheDocument();
    expect(within(placeholderRow).getByRole("button", { name: "Reply" })).toBeEnabled();
    expect(screen.queryByText("Original comment is no longer available.")).not.toBeInTheDocument();
  } finally {
    comments.splice(-2);
  }
});
