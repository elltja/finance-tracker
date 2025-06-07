export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  name: string;
  description: string;
  type: TransactionType;
  date: string;
  category: string;
  amount: number;
};
