import { Lock, Mail } from "lucide-react";
import { useId } from "react";
import FormInput from "../form/FormInput";
import SubmitButton from "../form/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

type FormFields = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const id = useId();
  const { register, handleSubmit } = useForm<FormFields>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: FormFields) => {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      console.log(result);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["user"] });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    mutate(data);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor={`email-${id}`} className="">
          Email
        </label>
        <FormInput
          Icon={Mail}
          type="email"
          id={`email-${id}`}
          placeholder="you@example.com"
          {...register("email")}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor={`password-${id}`}>Password</label>
        <FormInput
          Icon={Lock}
          type="password"
          id={`password-${id}`}
          placeholder="••••••••"
          {...register("password")}
        />
      </div>
      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
}
