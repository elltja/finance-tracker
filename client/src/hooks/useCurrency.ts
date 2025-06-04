import { getCurrency } from "@/utils/currency";
import { useQuery } from "@tanstack/react-query";

export default function useCurrency() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getCurrency,
    queryKey: ["currency"],
    staleTime: 1000 * 60 * 5,
  });
  if (isLoading || isError || data == null || typeof data !== "string")
    return "USD";
  return data as string;
}
