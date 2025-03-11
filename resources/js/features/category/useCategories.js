import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../repositories/CategoryRepository";

export function useCategories() {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { isLoading, error, categories };
}