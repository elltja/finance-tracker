import { TableRow } from "../shared/Table";

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

export default function TransactionsTable() {
  return (
    <table className="table-fixed w-1/2">
      <thead>
        <TableRow items={Object.keys(data[0])} className="font-bold" />
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} items={Object.values(item)} />
        ))}
      </tbody>
    </table>
  );
}
