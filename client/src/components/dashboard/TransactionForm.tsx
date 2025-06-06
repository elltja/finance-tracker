import { Transaction } from "@/types/transaction";
import FormInput from "../shared/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { Badge, Coins, DollarSign, Text } from "lucide-react";
import { useId } from "react";
import Button from "../shared/Button";
import CategorySelect from "./CategorySelect";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TypeSelect from "./TypeSelect";
import DeleteTransactionButton from "./DeleteTransactionButton";

type FormFields = Omit<Transaction, "date">;

type FormResult = { isError: boolean; message: string };

interface TransactionFormProps {
  onClose: () => void;
  initialData?: Transaction;
}

export default function TransactionForm({
  onClose,
  initialData,
}: TransactionFormProps) {
  const id = useId();
  const { t } = useTranslation();
  const { user } = useAuth();
  const currency = user?.preferred_currency || "USD";
  const { register, handleSubmit, control } = useForm<FormFields>();

  const queryClient = useQueryClient();

  const { mutate, data } = useMutation({
    mutationFn: async (data: FormFields): Promise<FormResult> => {
      const apiUrl =
        initialData == null
          ? `${import.meta.env.VITE_BACKEND_URL}/transactions/create`
          : `${import.meta.env.VITE_BACKEND_URL}/transactions/update`;

      const method = initialData == null ? "POST" : "PUT";

      if (initialData != null) {
        data = { ...data, id: initialData.id };
      }

      const res = await fetch(apiUrl, {
        method,
        body: JSON.stringify({ ...data, id: initialData?.id }),
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
      queryClient.refetchQueries({ queryKey: ["transactions"] });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    mutate(data);
    onClose();
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor={`name-${id}`}>
          {t("dashboard.table.columns.name")}
        </label>
        <FormInput
          id={`name-${id}`}
          Icon={Badge}
          placeholder="T-shirt"
          autoComplete="off"
          aria-required
          defaultValue={initialData?.name ?? ""}
          {...register("name")}
        />
      </div>

      <div>
        <label htmlFor={`description-${id}`}>
          {t("dashboard.table.columns.description")}
        </label>
        <FormInput
          id={`description-${id}`}
          Icon={Text}
          placeholder="Buy t-shirt for summer"
          autoComplete="off"
          defaultValue={initialData?.description ?? ""}
          {...register("description")}
        />
      </div>
      <div>
        <label htmlFor={`category-select-${id}`}>
          {t("dashboard.table.columns.category")}
        </label>
        <CategorySelect
          id={`category-select-${id}`}
          control={control}
          defaultValue={initialData?.category}
        />
      </div>
      <div>
        <label htmlFor={`type-select-${id}`}>
          {t("dashboard.table.columns.type")}
        </label>
        <TypeSelect id={`type-select-${id}`} control={control} />
      </div>
      <div>
        <label htmlFor={`amount-${id}`}>
          <p className="w-full flex justify-between">
            {t("dashboard.addTransactionDialog.amountInCurrency", { currency })}
            <span className="cursor-pointer text-sm my-1 hover:underline">
              {t("dashboard.addTransactionDialog.changeCurrency")}
            </span>
          </p>
        </label>
        <FormInput
          id={`amount-${id}`}
          Icon={currency === "USD" ? DollarSign : Coins}
          type="number"
          inputMode="decimal"
          autoComplete="off"
          placeholder="$0.00"
          defaultValue={initialData?.amount}
          {...register("amount", { valueAsNumber: true })}
        />
      </div>
      {data?.isError && <p aria-live="polite">{data.message}</p>}
      <div className="flex gap-2 w-full justify-end mt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          {t("cancel")}
        </Button>
        {initialData?.id && (
          <DeleteTransactionButton
            transactionId={initialData.id}
            onClose={onClose}
          />
        )}
        <Button type="submit" className="px-3">
          {t("submit")}
        </Button>
      </div>
    </form>
  );
}
