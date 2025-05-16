import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import usePersistentState from "@/hooks/usePersistentState";

describe("usePersistentState", () => {
  const STORAGE_KEY = "test-key";

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should use the value from localStorage if available", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify("stored value"));

    const { result } = renderHook(() =>
      usePersistentState("default", STORAGE_KEY)
    );

    expect(result.current[0]).toBe("stored value");
  });

  it("should use the default value if localStorage is empty", () => {
    const { result } = renderHook(() =>
      usePersistentState("default", STORAGE_KEY)
    );

    expect(result.current[0]).toBe("default");
  });

  it("should update the state and localStorage", () => {
    const { result } = renderHook(() =>
      usePersistentState("initial", STORAGE_KEY)
    );

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify("updated"));
  });
});
