import { Lock, Mail } from "lucide-react";
import { useId } from "react";
import FormInput from "../shared/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../shared/Button";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

type FormFields = {
  email: string;
  password: string;
};

type FormResult = { message: string; isError: boolean };

export default function SignInForm() {
  const id = useId();
  const { register, handleSubmit } = useForm<FormFields>();
  const queryClient = useQueryClient();
  const { mutate, data } = useMutation<FormResult, unknown, FormFields>({
    mutationFn: async (data: FormFields): Promise<FormResult> => {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = (await res.json()) as { message: string };
      return { ...result, isError: !res.ok };
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
      {data?.isError && (
        <p aria-live="polite" className="text-red-600">
          {data.message}
        </p>
      )}
      <Button>Sign In</Button>
    </form>
  );
}
