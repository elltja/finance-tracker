import React from "react";

const AuthContext = React.createContext(null);

export default function AuthProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}
