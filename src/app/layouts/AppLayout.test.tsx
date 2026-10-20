import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";

vi.mock("../../shared/components/ui/Navbar/Navbar", () => ({
  default: ({ onToggleSidebar, sidebarOpen }: { onToggleSidebar: () => void; sidebarOpen: boolean }) => (
    <button onClick={onToggleSidebar} aria-expanded={sidebarOpen}>Open navigation menu</button>
  ),
}));
vi.mock("../../shared/components/ui/Sidebar/Sidebar", () => ({
  default: () => <nav><Link to="/projects">Projects</Link><button disabled>Unavailable</button></nav>,
}));

let desktop = false;
let resize: (() => void) | undefined;

beforeEach(() => {
  desktop = false;
  vi.stubGlobal("matchMedia", () => ({
    get matches() { return desktop; },
    addEventListener: (_: string, listener: () => void) => { resize = listener; },
    removeEventListener: vi.fn(),
  }));
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: function (this: HTMLDialogElement) { this.setAttribute("open", ""); },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: function (this: HTMLDialogElement) { this.removeAttribute("open"); },
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
  Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
});

function renderLayout() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<p>Home content</p>} />
          <Route path="/projects" element={<p>Project content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

it("opens the mobile navigation and dismisses it with its close button, Escape, or backdrop", () => {
  renderLayout();
  const toggle = screen.getByRole("button", { name: "Open navigation menu" });
  for (const dismissal of ["close", "escape", "backdrop"]) {
    fireEvent.click(toggle);
    const dialog = screen.getByRole("dialog", { name: "Navigation menu" });
    expect(dialog).toHaveAttribute("open");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    if (dismissal === "close") fireEvent.click(screen.getByRole("button", { name: "Close navigation menu" }));
    else if (dismissal === "escape") fireEvent(dialog, new Event("cancel", { bubbles: false }));
    else fireEvent.click(dialog);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  }
});

it("closes the drawer when a navigation destination is selected", () => {
  renderLayout();
  fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
  const dialog = screen.getByRole("dialog");
  fireEvent.click(dialog.querySelector("a")!);
  expect(screen.getByText("Project content")).toBeInTheDocument();
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

it("dismisses the drawer when the viewport reaches the desktop breakpoint", () => {
  renderLayout();
  fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
  act(() => {
    desktop = true;
    resize?.();
  });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
