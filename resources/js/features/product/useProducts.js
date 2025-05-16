import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../repositories/ProductRepository";

export function useProducts(search = "") {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", search],
    queryFn: () => getProducts(search),
  });

  return { isLoading, error, products };
} 