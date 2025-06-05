import { Transaction } from "@/types/transaction";
import FormInput from "../shared/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { Badge, Coins, DollarSign, Text } from "lucide-react";
import { useId } from "react";
import Button from "../shared/Button";
import CategorySelect from "./CategorySelect";
import TypeSelect from "./TypeSelect";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";

type FormFields = Omit<Transaction, "date">;

interface TransactionFormProps {
  onClose: () => void;
}

export default function TransactionForm({ onClose }: TransactionFormProps) {
  const id = useId();
  const { t } = useTranslation();
  const { user } = useAuth();
  const currency = user?.preferred_currency || "USD";
  const { register, handleSubmit, control } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log({ ...data, currency });
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
          {...register("description")}
        />
      </div>
      <div>
        <label htmlFor={`type-select-${id}`}>
          {t("dashboard.table.columns.type")}
        </label>
        <TypeSelect id={`type-select-${id}`} control={control} />
      </div>
      <div>
        <label htmlFor={`category-select-${id}`}>
          {t("dashboard.table.columns.category")}
        </label>
        <CategorySelect id={`category-select-${id}`} control={control} />
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
          {...register("amount", { valueAsNumber: true })}
        />
      </div>
      <div className="flex gap-2 w-full justify-end mt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button type="submit" className="px-3">
          {t("submit")}
        </Button>
      </div>
    </form>
  );
}
