import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUpdateProduct } from "../../repositories/ProductRepository";
import { useNavigate } from "react-router-dom";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); 

  const { mutate: createProduct, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateProduct,
    onSuccess: () => {
      toast.success("New product successfully created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/products"); // ⬅️ redirect to products index
    },
    onError: (err) => toast.error(err.message),
  });

  return { createProduct, isCreating };
}