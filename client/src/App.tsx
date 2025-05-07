import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import { useAuth } from "./context/AuthContext";

const Auth = React.lazy(() => import("@/pages/Auth"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SuspendedApp />
      </Suspense>
    </>
  );
}

function SuspendedApp() {
  const user = useAuth();
  return user ? <Dashboard /> : <Auth />;
}
