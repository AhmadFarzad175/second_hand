import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../repositories/ProductRepository";

export function useWebsiteProducts(filters = {}) {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", { ...filters, website: true }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getProducts(params);
    },
  });

  return { isLoading, error, products };
}