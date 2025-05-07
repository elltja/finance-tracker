import { User } from "@/types/user";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

const AuthContext = React.createContext<User | undefined>(undefined);

async function fetchUser() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
    credentials: "include",
  });
  return res.json() as Promise<User>;
}

export default function AuthProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
