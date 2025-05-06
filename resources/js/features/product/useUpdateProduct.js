import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUpdateProduct } from "../../repositories/ProductRepository";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isLoading: isUpdating } = useMutation({
    mutationFn: ({ formData, id }) => {
                return createUpdateProduct(formData, id);
            },
    onSuccess: () => {
      toast.success("product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateProduct, isUpdating };
}