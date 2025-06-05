import React, { Suspense, useEffect } from "react";
import Loading from "@/components/Loading";
import { useAuth } from "./context/AuthContext";
import { initI18n } from "./utils/i18n/i18n";

const Auth = React.lazy(() => import("@/pages/Auth"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));

export default function App() {
  const user = useAuth();

  useEffect(() => {
    initI18n(
      /* 
          TODO
          user.preferredLanguage
        */
      "en"
    );
  }, [user]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {user ? <Dashboard /> : <Auth />}
      </Suspense>
    </>
  );
}
