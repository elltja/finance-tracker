import { capitalize } from "@/utils/capitalize";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface TableRowProps {
  items: (string | number)[];
  className?: string;
  onClick?: () => void;
}

export function TableRow({ items, className = "", onClick }: TableRowProps) {
  return (
    <tr className={clsx("border-b border-border", className)} onClick={onClick}>
      {items.map((item, index) => (
        <td
          key={index}
          className={`p-2 ${
            index === items.length - 1 ? "text-right" : "text-left"
          }`}
        >
          {item}
        </td>
      ))}
    </tr>
  );
}

interface TableHeadProps {
  keys: string[];
  className?: string;
}

export function TableHead({ keys, className }: TableHeadProps) {
  return (
    <thead className={className}>
      <TableRow items={keys.map((k) => capitalize(k))} className="font-bold" />
    </thead>
  );
}

interface TableTotalRowProps {
  colCount: number;
  totalAmount: number | string;
}

export default function TableTotalRow({
  colCount,
  totalAmount,
}: TableTotalRowProps) {
  const { t } = useTranslation();
  return (
    <tfoot>
      <tr className="w-full">
        {Array.from({ length: colCount }).map((_, idx) => (
          <td
            key={idx}
            className={clsx(
              "p-2",
              idx === 0 && "font-semibold text-left w-full",
              idx > 0 && idx < colCount - 1 && "text-center w-px",
              idx === colCount - 1 && "font-semibold text-right"
            )}
          >
            {idx === 0
              ? t("dashboard.table.total")
              : idx === colCount - 1
              ? totalAmount
              : ""}
          </td>
        ))}
      </tr>
    </tfoot>
  );
}
