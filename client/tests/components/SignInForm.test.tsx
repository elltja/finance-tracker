import { afterEach, beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SignInForm from "@/components/auth/SignInForm";

function renderForm() {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <SignInForm />
    </QueryClientProvider>
  );
}

describe("SignInForm", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("submits form and calls API", async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ message: "Successfully logged in" }),
    });

    renderForm();

    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/login"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "user@example.com",
          password: "password123",
        }),
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("submits form and displays error", async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ message: "Invalid password" }),
    });

    renderForm();
    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    const errorMessage = screen.getByText("Invalid password");

    expect(errorMessage).toBeInTheDocument();
  });
});
