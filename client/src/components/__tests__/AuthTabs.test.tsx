import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AuthTabs from "../auth/AuthTabs";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

vi.doMock("../auth/SignInForm", () => ({
  default: () => <div>Mock SignInForm</div>,
}));

vi.doMock("../auth/SignUpForm", () => ({
  default: () => <div>Mock SignUpForm</div>,
}));

describe("AuthTabs", () => {
  it("shows SignInForm by default", async () => {
    render(<AuthTabs />);

    await waitFor(() => {
      expect(screen.getByText("Mock SignInForm")).toBeInTheDocument();
    });
  });
  it("switches to SignUpForm when tab is clicked", async () => {
    render(<AuthTabs />);
    const tabBtn = screen.getByRole("button", { name: /sign up/i });
    await userEvent.click(tabBtn);
    await waitFor(() => {
      expect(screen.getByText("Mock SignUpForm")).toBeInTheDocument();
    });
  });
});
