import { useId } from "react";
import Button from "../shared/Button";
import { Badge, DollarSign, Plus, Text } from "lucide-react";
import FormInput from "../shared/FormInput";
import TypeSelect from "./TypeSelect";
import usePersistentState from "@/hooks/usePersistentState";
import CategorySelect from "./CategorySelect";
import { SubmitHandler, useForm } from "react-hook-form";
import { Transaction } from "@/types/transaction";

export function TransactionDialogTrigger() {
  const [isOpen, setIsOpen] = usePersistentState(
    false,
    "transaction-dialog-state"
  );
  return (
    <>
      <Button
        aria-haspopup="dialog"
        className="w-fit px-4 flex items-center gap-1"
        aria-label="Open transaction dialog"
        onClick={() => setIsOpen(true)}
      >
        Add Transaction <Plus className="size-5" />
      </Button>
      <TransactionDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

type FormFields = Omit<Transaction, "date">;

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDialog({ isOpen, onClose }: TransactionDialogProps) {
  const id = useId();
  const { register, handleSubmit, control } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black opacity-20"
        aria-hidden="true"
        onMouseDown={onClose}
      ></div>
      <div
        aria-modal="true"
        role="dialog"
        className="relative z-50 mx-auto mt-40 w-full sm:w-2/3 lg:w-1/2 m-2 bg-white p-6 rounded shadow"
      >
        <header className="mb-2">
          <h2 className="font-semibold text-lg">Add transsaction</h2>
          <p>Add an expense or income</p>
        </header>
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
            Icon={DollarSign}
            label="Amount"
            type="number"
            inputMode="decimal"
            autoComplete="off"
            placeholder="$0.00"
            {...register("amount", { valueAsNumber: true })}
          />
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="px-3">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
