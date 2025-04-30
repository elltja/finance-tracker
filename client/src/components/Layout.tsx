import { Suspense } from "react";
import { Outlet } from "react-router";
import Loading from "./Loading";

export default function Layout() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}
