import { Suspense } from "react";
import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <Suspense fallback={<h1>...Loading</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
}
