import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
