import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../repositories/ProductRepository";
import toast from "react-hot-toast";

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deletePro } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            toast.success("Product successfully deleted");

            // Invalidate the products query to refresh the list
            queryClient.invalidateQueries(["products"]);
        },

        onError: (err) => toast.error(err.message),

    });

    return { isDeleting, deletePro };
}
