import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import ThemeToggle from "../../shared/components/ui/ThemeToggle/ThemeToggle";
import { THEME_STORAGE_KEY } from "../../shared/context/ThemeContext";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

const renderTheme = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

it("defaults to light and treats an invalid saved preference as light", () => {
  renderTheme();
  expect(document.documentElement).not.toHaveClass("dark");
  expect(
    screen.getByRole("button", { name: "Switch to dark theme" }),
  ).toHaveAttribute("aria-pressed", "false");
  cleanup();
  localStorage.setItem(THEME_STORAGE_KEY, "invalid");
  renderTheme();
  expect(document.documentElement).not.toHaveClass("dark");
});

it("switches both ways and restores the saved theme after remounting", () => {
  const { unmount } = renderTheme();
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
  expect(document.documentElement).toHaveClass("dark");
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  unmount();
  renderTheme();
  const toggle = screen.getByRole("button", { name: "Switch to light theme" });
  expect(toggle).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(toggle);
  expect(document.documentElement).not.toHaveClass("dark");
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
});

it("synchronizes theme changes and cleared preferences from another tab", () => {
  renderTheme();
  fireEvent(
    window,
    new StorageEvent("storage", { key: THEME_STORAGE_KEY, newValue: "dark" }),
  );
  expect(document.documentElement).toHaveClass("dark");
  fireEvent(window, new StorageEvent("storage", { key: null }));
  expect(document.documentElement).not.toHaveClass("dark");
});

it("still switches themes when local storage is unavailable", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("Storage unavailable");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("Storage unavailable");
  });
  renderTheme();
  expect(document.documentElement).not.toHaveClass("dark");
  fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
  expect(document.documentElement).toHaveClass("dark");
});
