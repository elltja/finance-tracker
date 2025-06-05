import React, { Suspense, useEffect } from "react";
import Loading from "@/components/Loading";
import { useAuth } from "./context/AuthContext";
import { getLocale } from "./utils/locale";
import { useTranslation } from "react-i18next";

const Auth = React.lazy(() => import("@/pages/Auth"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));

export default function App() {
  const user = useAuth();

  const { i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      console.log("lang", user?.preferred_language);

      i18n.changeLanguage(
        user?.preferred_language || (await getLocale()).language || "en"
      );
    })();
  }, [user, i18n]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {user ? <Dashboard /> : <Auth />}
      </Suspense>
    </>
  );
}
