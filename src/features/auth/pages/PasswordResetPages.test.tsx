import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { AxiosError } from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";
import LoginPage from "./LoginPage";
import { authApi } from "../api/auth.api";
import { clearSession } from "../../../shared/services/auth/clearSession";
import { resetPasswordSchema } from "../schemas/passwordReset.schema";
import { loginSchema } from "../schemas/login.schema";

vi.mock("../components/AuthLayout", () => ({
  AuthLayout: ({ children, title }: { children: ReactNode; title: string }) => <main><h1>{title}</h1>{children}</main>,
}));
vi.mock("../components/LoginForm", () => ({ LoginForm: () => <div>Login form</div> }));
vi.mock("../../../shared/services/auth/clearSession", () => ({ clearSession: vi.fn() }));

const token = "a".repeat(64);
beforeEach(() => {
  vi.spyOn(authApi, "forgotPassword").mockResolvedValue();
  vi.spyOn(authApi, "resetPassword").mockResolvedValue();
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.clearAllMocks(); });

function renderPage(path: string) {
  const client = new QueryClient({ defaultOptions: { mutations: { gcTime: 0 } } });
  render(<QueryClientProvider client={client}><MemoryRouter initialEntries={[path]}><Routes>
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes></MemoryRouter></QueryClientProvider>);
}
function enterPasswords(password = "New password 123", confirmation = password) {
  fireEvent.change(screen.getByLabelText("New password"), { target: { value: password } });
  fireEvent.change(screen.getByLabelText("Confirm password"), { target: { value: confirmation } });
}

it("normalizes the email and shows a generic confirmation", async () => {
  renderPage("/forgot-password");
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "Person@Example.com" } });
  fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));
  await waitFor(() => expect(authApi.forgotPassword).toHaveBeenCalledWith({ email: "person@example.com" }, expect.anything()));
  expect(await screen.findByRole("status")).toHaveTextContent("If an account exists");
});

it("rejects invalid email locally", async () => {
  renderPage("/forgot-password");
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "invalid" } });
  fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));
  expect(await screen.findByText("Enter a valid email address")).toBeInTheDocument();
  expect(authApi.forgotPassword).not.toHaveBeenCalled();
});

it("lets the user retry after a reset-request network error", async () => {
  vi.mocked(authApi.forgotPassword).mockRejectedValueOnce(new Error("Unable to connect"));
  renderPage("/forgot-password");
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "person@example.com" } });
  fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Unable to connect");
  fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));
  expect(await screen.findByRole("status")).toBeInTheDocument();
});

it.each(["/reset-password", "/reset-password?token=bad"])("handles a missing or malformed token: %s", (path) => {
  renderPage(path);
  expect(screen.getByRole("alert")).toHaveTextContent("invalid or has expired");
  expect(screen.getByRole("link", { name: "Request another link" })).toHaveAttribute("href", "/forgot-password");
  expect(authApi.resetPassword).not.toHaveBeenCalled();
});

it("does not submit when password confirmation differs", async () => {
  renderPage(`/reset-password?token=${token}`);
  enterPasswords("New password 123", "Different password");
  fireEvent.click(screen.getByRole("button", { name: "Update password" }));
  expect(await screen.findByText("Passwords do not match")).toBeInTheDocument();
  expect(authApi.resetPassword).not.toHaveBeenCalled();
});

it("submits only the token and exact password, clears the session, and redirects to login", async () => {
  renderPage(`/reset-password?token=${token}`);
  const password = "  New password 123  ";
  enterPasswords(password);
  fireEvent.click(screen.getByRole("button", { name: "Update password" }));
  await waitFor(() => expect(authApi.resetPassword).toHaveBeenCalledWith({ token, password }, expect.anything()));
  expect(await screen.findByRole("status")).toHaveTextContent("Password updated successfully");
  expect(screen.getByText("Login form")).toBeInTheDocument();
  expect(clearSession).toHaveBeenCalledOnce();
});

it("offers a fresh link when the backend rejects an expired or used token", async () => {
  vi.mocked(authApi.resetPassword).mockRejectedValueOnce({
    isAxiosError: true, response: { status: 400, data: { message: "This reset link is invalid or has expired." } },
  });
  renderPage(`/reset-password?token=${token}`);
  enterPasswords();
  fireEvent.click(screen.getByRole("button", { name: "Update password" }));
  expect(await screen.findByRole("link", { name: "Request another link" })).toBeInTheDocument();
  expect(clearSession).not.toHaveBeenCalled();
});

it("preserves the form for retry on a network failure", async () => {
  vi.mocked(authApi.resetPassword).mockRejectedValueOnce(new AxiosError("Network error", "ERR_NETWORK"));
  renderPage(`/reset-password?token=${token}`);
  enterPasswords();
  fireEvent.click(screen.getByRole("button", { name: "Update password" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Network error");
  expect(screen.getByLabelText("New password")).toHaveValue("New password 123");
  expect(clearSession).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button", { name: "Update password" }));
  expect(await screen.findByRole("status")).toHaveTextContent("Password updated successfully");
});

it("matches the backend byte limit and preserves password spaces at login", () => {
  expect(resetPasswordSchema.safeParse({ password: "é".repeat(37), confirmPassword: "é".repeat(37) }).success).toBe(false);
  const password = "  exact password  ";
  expect(loginSchema.parse({ email: "user@example.com", password }).password).toBe(password);
});
