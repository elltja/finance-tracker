import ReactSelect, {
  components,
  type OptionProps,
  type SingleValueProps,
} from "react-select";
import { ComponentProps } from "react";
import { LucideProps } from "lucide-react";

type OptionType = {
  label: string;
  value: string;
  icon: React.ComponentType<LucideProps>;
};

const CustomSingleValue = (props: SingleValueProps<OptionType, false>) => {
  const { data } = props;
  const Icon = data.icon;

  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} />}
        {data.label}
      </div>
    </components.SingleValue>
  );
};

const CustomOption = (props: OptionProps<OptionType, false>) => {
  const { data, innerRef, innerProps } = props;
  const Icon = data.icon;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-2 px-3 py-2 hover:bg-bg-hover cursor-pointer"
    >
      {Icon && <Icon size={16} />}
      <span>{data.label}</span>
    </div>
  );
};

export default function Select(
  props: ComponentProps<typeof ReactSelect<OptionType, false>>
) {
  return (
    <ReactSelect<OptionType, false>
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue,
      }}
      className="w-64 outline-none"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "var(--color-border)",
          boxShadow: "none",
          backgroundColor: "var(--color-bg)",
          "&:hover": {
            borderColor: "var(--color-border)",
          },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "var(--color-bg)",
        }),
        singleValue: (base) => ({
          ...base,
          color: "var(--color-foreground)",
        }),
      }}
      {...props}
    />
  );
}
