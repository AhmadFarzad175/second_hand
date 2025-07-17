import { useQuery } from "@tanstack/react-query";
import { getCategoryProducts } from "../repositories/ProductRepository";

export function useCategoryProducts(categoryId) {
  return useQuery({
    queryKey: ["categoryProducts", categoryId],
    queryFn: () => getCategoryProducts(categoryId),
    enabled: !!categoryId,
  });
}
