import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toggleFavorite } from "../repositories/FavoriteRepository";

export function useToggleFavorite() {
  const mutation = useMutation({
    mutationFn: ({ productId }) => toggleFavorite(productId),
    onError: (err) => toast.error(err.message),
  });

  return {
    ToggleFavorite: mutation.mutateAsync,
    isLoadingFav: mutation.isPending, // Changed from isLoading to isPending
  };
}