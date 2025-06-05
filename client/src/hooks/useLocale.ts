import { getLocale } from "@/utils/locale";
import { useQuery } from "@tanstack/react-query";

export default function useLocale() {
  const { data } = useQuery({
    queryFn: getLocale,
    queryKey: ["currency"],
    staleTime: 1000 * 60 * 5,
  });

  return data;
}
