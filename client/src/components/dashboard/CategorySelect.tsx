import { capitalize } from "@/utils/capitalize";
import { LucideProps, Pizza, Shirt, Star } from "lucide-react";
import React from "react";
import Select from "../shared/Select";
import { Control, Controller } from "react-hook-form";

const categories: string[] = ["clothes", "food", "custom"];

type OptionType = {
  value: string;
  label: string;
  icon: React.ComponentType<LucideProps>;
};

const options: OptionType[] = categories.map((category) => ({
  value: category,
  label: capitalize(category),
  icon: (() => {
    switch (category) {
      case "clothes":
        return Shirt;
      case "food":
        return Pizza;
      default:
        return Star;
    }
  })(),
}));

interface CategorySelectProps {
  id?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export default function CategorySelect({
  id,
  control,
  name = "category",
}: CategorySelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          className="w-full"
          inputId={id}
          value={options.find((o) => o.value === field.value)}
          onChange={(val) => field.onChange(val?.value)}
        />
      )}
    />
  );
}
