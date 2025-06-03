import { CalendarCheck, LucideProps, Repeat } from "lucide-react";
import Select from "../shared/Select";
import { Controller, Control } from "react-hook-form";

type OptionType = {
  value: "fixed" | "recurring";
  label: string;
  icon: React.ComponentType<LucideProps>;
};

const options: OptionType[] = [
  { value: "fixed", label: "Fixed", icon: CalendarCheck },
  { value: "recurring", label: "Recurring", icon: Repeat },
];

interface TypeSelectProps {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name?: string;
}

export default function TypeSelect({
  id,
  control,
  name = "type",
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
        />
      )}
    />
  );
}
