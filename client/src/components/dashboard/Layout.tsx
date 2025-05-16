import React from "react";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: Readonly<React.ReactNode>;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
