import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

const AuthContext = React.createContext<User | null>(null);

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/me`;

async function fetchUser(): Promise<User | null> {
  const res = await fetch(API_URL, {
    credentials: "include",
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.statusText}`);
  }

  return res.json();
}

export default function AuthProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const { data } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return (
    <AuthContext.Provider value={data ?? null}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
