import { Navigate } from "react-router";

export default function Dashboard() {
  const user = null;
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return <div>Dashboard</div>;
}
