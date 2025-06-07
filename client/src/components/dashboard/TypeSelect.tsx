import { LucideProps } from "lucide-react";
import Select from "../shared/Select";
import { Controller, Control } from "react-hook-form";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

type OptionType = {
  value: "income" | "expense";
  label: string;
  icon: React.ComponentType<LucideProps>;
};

const options: OptionType[] = [
  { value: "income", label: "Income", icon: ArrowUpCircle },
  { value: "expense", label: "Expense", icon: ArrowDownCircle },
];

interface TypeSelectProps {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name?: string;
  defaultValue?: "income" | "expense";
}

export default function TypeSelect({
  id,
  control,
  name = "type",
  defaultValue,
}: TypeSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Select
          {...field}
          inputId={id}
          options={options}
          value={options.find((o) => o.value === field.value)}
          onChange={(val) => field.onChange(val?.value)}
          isSearchable={false}
          className="w-full"
          defaultValue={options.find(
            (o) => o.value === (defaultValue ?? "income")
          )}
        />
      )}
    />
  );
}
