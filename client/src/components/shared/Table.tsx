interface TableRowProps {
  items: string[];
  className?: string;
}

export function TableRow({ items, className = "" }: TableRowProps) {
  return (
    <tr className={`border-b border-gray-300 hover:bg-gray-100 ${className}`}>
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
      <TableRow items={keys} className="font-bold" />
    </thead>
  );
}
