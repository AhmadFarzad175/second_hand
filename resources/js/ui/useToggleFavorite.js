  // useUpdateUserStatus.js
  import { useMutation } from "@tanstack/react-query";
  import toast from "react-hot-toast";
  import { toggleFavorite } from "../repositories/ProductRepository";

  export function useToggleFavorite() {
      const { mutate: ToggleFavorite, isLoading: isLoadingFav } = useMutation({
          mutationFn: ({ productId }) => toggleFavorite(productId),
          onError: (err) => toast.error(err.message),

      });

      return { ToggleFavorite, isLoadingFav };
  }
