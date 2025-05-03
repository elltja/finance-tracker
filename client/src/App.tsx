import React, { Suspense } from "react";
import Loading from "@/components/Loading";

const Auth = React.lazy(() => import("@/pages/Auth"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));

export default function App() {
  const isAuthenticated = false;
  return (
    <>
      <Suspense fallback={<Loading />}>
        {isAuthenticated ? <Dashboard /> : <Auth />}
      </Suspense>
    </>
  );
}
