import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../repositories/ProductRepository";

export function useProducts() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getProducts,
  });

  return { isLoading, error, products };
}