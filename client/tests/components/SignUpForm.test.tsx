import { afterEach, beforeEach, describe, expect, it, vi, Mock } from "vitest";
import SignUpForm from "@/components/auth/SignUpForm";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

function renderForm() {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <SignUpForm />
    </QueryClientProvider>
  );
}

describe("SignUpForm", () => {
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
      json: () => Promise.resolve({ message: "Account successfully created" }),
    });

    renderForm();

    const nameInput = screen.getByPlaceholderText("Your full name");
    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/register"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "John Doe",
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
      status: 409,
      json: () => Promise.resolve({ message: "User already exist" }),
    });

    renderForm();
    const nameInput = screen.getByPlaceholderText("Your full name");
    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    const errorMessage = screen.getByText("User already exist");

    expect(errorMessage).toBeInTheDocument();
  });
});
