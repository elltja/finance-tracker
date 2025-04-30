import React from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import usePersistentState from "@/hooks/usePersistentState";
import OAuth from "./OAuth";

const TAB_STORAGE_KEY = "tab";

export default function AuthBox() {
  const [tab, setTab] = usePersistentState<"signin" | "signup">(
    "signin",
    TAB_STORAGE_KEY
  );
  return (
    <div className="w-full max-w-[500px] h-fit flex flex-col gap-3">
      <div className="w-full flex text-lg">
        <TabButton isActive={tab === "signin"} onClick={() => setTab("signin")}>
          Sign In
        </TabButton>
        <TabButton isActive={tab === "signup"} onClick={() => setTab("signup")}>
          Sign Up
        </TabButton>
      </div>
      <div className="h-fit">
        {tab === "signin" ? <SignInForm /> : <SignUpForm />}
      </div>
      <div className="flex items-center gap-5">
        <hr className="border-gray-300 flex-1" />
        <p className="text-lg text-gray-700">or</p>
        <hr className="border-gray-300 flex-1" />
      </div>
      <OAuth />
    </div>
  );
}

function TabButton({
  onClick,
  isActive,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  children: Readonly<React.ReactNode>;
}) {
  return (
    <button
      className={`flex-1 px-4 py-2 cursor-pointer hover:bg-gray-50 border-b ${
        isActive ? "border-gray-700" : "border-gray-300"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
