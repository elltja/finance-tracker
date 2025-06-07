import { Transaction } from "@/types/transaction";

export function calculateTotal(data: Transaction[]) {
  const total = data.reduce((total, item) => {
    const value = item.type === "expense" ? -item.amount : item.amount;
    return total + value;
  }, 0);

  return Math.round(total * 100) / 100;
}
