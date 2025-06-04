import { Transaction } from "@/types/transaction";
import FormInput from "../shared/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { Badge, Coins, DollarSign, Text } from "lucide-react";
import { useId } from "react";
import Button from "../shared/Button";
import CategorySelect from "./CategorySelect";
import TypeSelect from "./TypeSelect";
import useCurrency from "@/hooks/useCurrency";

type FormFields = Omit<Transaction, "date">;

interface TransactionFormProps {
  onClose: () => void;
}

export default function TransactionForm({ onClose }: TransactionFormProps) {
  const id = useId();
  const currency = useCurrency();
  const { register, handleSubmit, control } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log({ ...data, currency });
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id={`name-${id}`}
        Icon={Badge}
        placeholder="T-shirt"
        label="Name"
        autoComplete="off"
        aria-required
        {...register("name")}
      />
      <FormInput
        id={`description-${id}`}
        Icon={Text}
        label="Description"
        placeholder="Buy t-shirt for summer"
        autoComplete="off"
        {...register("description")}
      />
      <div>
        <label htmlFor={`type-select-${id}`}>Type</label>
        <TypeSelect id={`type-select-${id}`} control={control} />
      </div>
      <div>
        <label htmlFor={`category-select-${id}`}>Category</label>
        <CategorySelect id={`category-select-${id}`} control={control} />
      </div>
      <FormInput
        id={`amount-${id}`}
        Icon={currency === "USD" ? DollarSign : Coins}
        label={`Amount in ${currency}`}
        type="number"
        inputMode="decimal"
        autoComplete="off"
        placeholder="$0.00"
        {...register("amount", { valueAsNumber: true })}
      />
      <div className="flex gap-2 w-full justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="px-3">
          Submit
        </Button>
      </div>
    </form>
  );
}
