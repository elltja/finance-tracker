import React from "react";

const Auth = React.lazy(() => import("@/pages/Auth"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));

export default function App() {
  const isAuthenticated = false;
  return isAuthenticated ? <Dashboard /> : <Auth />;
}
