import { capitalize } from "@/utils/capitalize";
import {
  Car,
  Heart,
  List,
  LucideProps,
  Pizza,
  Shirt,
  Star,
} from "lucide-react";
import React from "react";
import Select from "../shared/Select";
import { Control, Controller } from "react-hook-form";

const categories: string[] = [
  "clothes",
  "food",
  "transportation",
  "health",
  "entertainment",
  "other",
];

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
      case "transportation":
        return Car;
      case "health":
        return Heart;
      case "entertainment":
        return Star;
      default:
        return List;
    }
  })(),
}));

interface CategorySelectProps {
  id?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  defaultValue?: string;
}

export default function CategorySelect({
  id,
  control,
  name = "category",
  defaultValue,
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
          defaultValue={options.find((o) => o.value === defaultValue) ?? null}
        />
      )}
    />
  );
}
