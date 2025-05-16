import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../repositories/ProductRepository";

export function useWebsiteProducts(search = "") {
    const {
        isLoading,
        data: products,
        error,
    } = useQuery({
        queryKey: ["products", { search, website: true }],
        queryFn: ({ queryKey }) => {
            const [, { search, website }] = queryKey;
            return getProducts(search, website);
        },
    });

    return { isLoading, error, products };
}
