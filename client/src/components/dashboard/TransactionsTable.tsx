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

export function TransactionsTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed w-full max-w-screen min-w-[600px]">
        <thead>
          <tr>
            {COLUMNS.map((_, idx) => (
              <th key={idx} className="px-4 py-2 bg-gray-100" />
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, rowIdx) => (
            <tr key={rowIdx} className="animate-pulse">
              {COLUMNS.map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
