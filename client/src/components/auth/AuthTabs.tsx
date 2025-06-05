import usePersistentState from "@/hooks/usePersistentState";
import OAuth from "./OAuth";
import Separator from "./Separator";
import TabButton from "./TabButton";
import React, { startTransition, Suspense } from "react";
import { useTranslation } from "react-i18next";

const SignInForm = React.lazy(() => import("./SignInForm"));
const SignUpForm = React.lazy(() => import("./SignUpForm"));

const TAB_STORAGE_KEY = "tab";

export default function AuthTabs() {
  const [tab, setTab] = usePersistentState<"signin" | "signup">(
    "signin",
    TAB_STORAGE_KEY
  );
  const { t } = useTranslation();
  return (
    <main className="w-full max-w-[500px] h-fit flex flex-col gap-3">
      <header className="w-full flex text-lg">
        <TabButton
          isActive={tab === "signin"}
          onClick={() => startTransition(() => setTab("signin"))}
        >
          {t("auth.signIn")}
        </TabButton>
        <TabButton
          isActive={tab === "signup"}
          onClick={() => startTransition(() => setTab("signup"))}
        >
          {t("auth.signUp")}
        </TabButton>
      </header>
      <section className="h-fit">
        <Suspense
          fallback={
            <div className="text-sm text-gray-500">Loading form...</div>
          }
        >
          {tab === "signin" ? <SignInForm /> : <SignUpForm />}
        </Suspense>
      </section>
      <Separator />
      <section>
        <OAuth />
      </section>
    </main>
  );
}
