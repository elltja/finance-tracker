import { Transaction } from "@/types/transaction";
import { TableHead, TableRow } from "../shared/Table";

const data = [
  {
    name: "Hello 1",
    description: "Lorem ipsum",
    type: "Abc",
    date: "123",
    category: "idk",
    amount: "123.123",
  },
  {
    name: "Hello 1",
    description: "Lorem ipsum",
    type: "Abc",
    date: "123",
    category: "idk",
    amount: "123.123",
  },
  {
    name: "Hello 1",
    description: "Lorem ipsum",
    type: "Abc",
    date: "123",
    category: "idk",
    amount: "123.123",
  },
];

const COLUMNS: (keyof Transaction)[] = [
  "name",
  "description",
  "type",
  "date",
  "category",
  "amount",
];

export default function TransactionsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed w-full max-w-screen min-w-[600px]">
        <TableHead keys={COLUMNS} />
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
