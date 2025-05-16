import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../repositories/FavoriteRepository";

export function useFavorite(search = "") {
  const {
    isLoading,
    data: favorites,
    error,
  } = useQuery({
    queryKey: ["favorites", search],
    queryFn: () => getFavorites(search),
  });

  return { isLoading, error, favorites };
} 