import React, { Suspense, useEffect } from "react";
import Loading from "@/components/Loading";
import { useAuth } from "./context/AuthContext";
import { getLocale } from "./utils/locale";
import { useTranslation } from "react-i18next";

const Auth = React.lazy(() => import("@/pages/Auth"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));

export default function App() {
  const { user, isLoading } = useAuth();

  const { i18n } = useTranslation();

  useEffect(() => {
    if (isLoading) return;

    const setLanguage = async () => {
      const lang =
        user?.preferred_language ?? (await getLocale())?.language ?? "en";
      if (i18n.language !== lang) {
        await i18n.changeLanguage(lang);
      }
    };

    setLanguage();
  }, [user, isLoading, i18n]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {user ? <Dashboard /> : <Auth />}
      </Suspense>
    </>
  );
}
