export type TransactionType = "fixed" | "recurring";

export type Transaction = {
  name: string;
  description: string;
  type: TransactionType;
  date: string;
  category: string;
  amount: number;
};
