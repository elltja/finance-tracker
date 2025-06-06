import { Transaction } from "@/types/transaction";
import { TableHead, TableRow } from "../shared/Table";
import { useTranslation } from "react-i18next";
import useTransactions from "@/hooks/useTransactions";

const COLUMNS: (keyof Transaction)[] = [
  "name",
  "description",
  "type",
  "date",
  "category",
  "amount",
];

export default function TransactionsTable() {
  const { t } = useTranslation();
  const data = useTransactions();

  return (
    <div className="overflow-x-auto">
      <table className="table-fixed w-full max-w-screen min-w-[600px]">
        <TableHead
          keys={COLUMNS.map((c) => t(`dashboard.table.columns.${c}`))}
        />
        <tbody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              items={COLUMNS.map((col) => item[col])}
              className="hover:bg-bg-hover"
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
