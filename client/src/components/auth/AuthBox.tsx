import usePersistentState from "@/hooks/usePersistentState";
import OAuth from "./OAuth";
import Separator from "./Separator";
import TabButton from "./TabButton";
import React, { startTransition, Suspense } from "react";

const SignInForm = React.lazy(() => import("./SignInForm"));
const SignUpForm = React.lazy(() => import("./SignUpForm"));

const TAB_STORAGE_KEY = "tab";

export default function AuthBox() {
  const [tab, setTab] = usePersistentState<"signin" | "signup">(
    "signin",
    TAB_STORAGE_KEY
  );
  return (
    <main className="w-full max-w-[500px] h-fit flex flex-col gap-3">
      <header className="w-full flex text-lg">
        <TabButton
          isActive={tab === "signin"}
          onClick={() => startTransition(() => setTab("signin"))}
        >
          Sign In
        </TabButton>
        <TabButton
          isActive={tab === "signup"}
          onClick={() => startTransition(() => setTab("signup"))}
        >
          Sign Up
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
