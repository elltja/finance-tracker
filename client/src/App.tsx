import React, { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router";
import Home from "@/pages/Home";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function Layout() {
  return (
    <>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}
