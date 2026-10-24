import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DateSelector from "./DateSelector";

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", class {
    observe() {}
    disconnect() {}
  });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe.each([false, true])("calendar focus (modal portal: %s)", (inModal) => {
  function renderPicker() {
    return render(
      <div {...(inModal ? { "data-modal-card": true } : {})}>
        <button>Before picker</button>
        <DateSelector value={null} onChange={vi.fn()} />
        <button>After picker</button>
      </div>,
    );
  }

  it("closes when Shift+Tab moves to the preceding control", async () => {
    const user = userEvent.setup();
    renderPicker();
    await user.tab();
    await user.tab();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Before picker" })).toHaveFocus();
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("closes when Tab leaves the picker while preserving internal keyboard navigation", async () => {
    const user = userEvent.setup();
    renderPicker();
    await user.tab();
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Open calendar" })).toHaveFocus();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    for (let i = 0; i < 12 && screen.queryByRole("grid"); i++) {
      await user.tab();
    }
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "After picker" })).toHaveFocus();
  });

  it("stays open when focus moves into the calendar and closes when it leaves", async () => {
    const user = userEvent.setup();
    renderPicker();
    await user.tab();
    await user.tab();
    const calendarButton = screen.getByRole("button", { name: /next month/i });
    act(() => calendarButton.focus());
    expect(calendarButton).toHaveFocus();
    expect(screen.getByRole("grid")).toBeInTheDocument();
    act(() => screen.getByRole("button", { name: "After picker" }).focus());
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });
});
