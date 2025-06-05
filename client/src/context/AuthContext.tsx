import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, createContext } from "react";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/me`;

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isError: false,
  refetch: () => {},
});

async function fetchUser(): Promise<User | null> {
  const res = await fetch(API_URL, { credentials: "include" });

  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`Failed to fetch user: ${res.statusText}`);

  return res.json();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, isLoading, isError, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
