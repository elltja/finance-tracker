import { Lock, Mail, User } from "lucide-react";
import { useId } from "react";
import FormInput from "../shared/FormInput";
import SubmitButton from "../shared/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { getLocale } from "@/utils/locale";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/register`;

type FormFields = {
  name: string;
  email: string;
  password: string;
};

type FormResult = { message: string; isError: boolean };

export default function SignUpForm() {
  const id = useId();
  const { register, handleSubmit } = useForm<FormFields>();
  const queryClient = useQueryClient();
  const { mutate, data } = useMutation<FormResult, unknown, FormFields>({
    mutationFn: async (data: FormFields): Promise<FormResult> => {
      const { currency, language } = await getLocale();
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ ...data, language, currency }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = (await res.json()) as { message: string };

      if (!res.ok) return { ...result, isError: true };
      return { ...result, isError: false };
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
        <label htmlFor={`name-${id}`}>Name</label>
        <FormInput
          Icon={User}
          type="text"
          id={`name-${id}`}
          placeholder="Your full name"
          {...register("name")}
        />
      </div>
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
          {data?.message}
        </p>
      )}
      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
}
