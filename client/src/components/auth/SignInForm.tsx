import { Lock, Mail } from "lucide-react";
import { useId } from "react";
import FormInput from "../form/FormInput";
import SubmitButton from "../form/SubmitButton";

export default function SignInForm() {
  const id = useId();
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor={`email-${id}`} className="">
          Email
        </label>
        <FormInput
          Icon={Mail}
          type="email"
          name="email"
          id={`email-${id}`}
          placeholder="you@example.com"
          className="py-2 px-3 outline-none border border-gray-300 rounded-sm"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor={`password-${id}`}>Password</label>
        <FormInput
          Icon={Lock}
          type="password"
          name="password"
          id={`password-${id}`}
          placeholder="••••••••"
          className="py-2 px-3 outline-none border border-gray-300 rounded-sm"
        />
      </div>
      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
}
