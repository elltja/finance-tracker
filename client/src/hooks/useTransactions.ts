import { Transaction } from "@/types/transaction";
import { useSuspenseQuery } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/transactions/all`;

async function fetchTransactions(): Promise<
  (Omit<Transaction, "data"> & { created_at: Date })[]
> {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return (await res.json()) ?? [];
}

export default function useTransactions() {
  const { data } = useSuspenseQuery({
    queryFn: fetchTransactions,
    queryKey: ["transactions"],
  });

  console.log(data);

  return data.map((t) => {
    const { created_at, ...d } = t;
    const readableDate = new Date(created_at).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return { ...d, date: readableDate };
  });
}
