import { Lock, Mail, User } from "lucide-react";
import { useId } from "react";
import FormInput from "../form/FormInput";
import SubmitButton from "../form/SubmitButton";

export default function SignUpForm() {
  const id = useId();
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor={`name-${id}`}>Name</label>
        <FormInput
          Icon={User}
          type="text"
          name="name"
          id={`name-${id}`}
          placeholder="Your full name"
        />
      </div>
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
        />
      </div>
      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
}
